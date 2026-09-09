#!/usr/bin/env python3
"""Poll private source repos and prepare/finalize one dashboard update transaction."""

from __future__ import annotations

import argparse
from concurrent.futures import ThreadPoolExecutor
import datetime as dt
import hashlib
import hmac
import json
import os
from pathlib import Path
import sys
import tempfile
import urllib.error
import urllib.request

from dashboard_event import COURSES, HEX64, REPOSITORY, poll_key, process_local_item, process_polled_item, verify_signature

STATE_PATH = Path("automation/poller-state.json")
MAX_PER_ENDPOINT = 100
MAX_PUBLIC_UPDATES = 40
MAX_LOCAL_BATCH = 80
NEEDS_HUMAN_PATH = Path("needs-human.json")
NEEDS_HUMAN_KEYS = {"schema", "generated_ts", "open"}
NEEDS_HUMAN_ITEM_KEYS = {"id", "ts", "course", "kind", "title", "deadline"}
NEEDS_HUMAN_KINDS = {"decision", "approval", "credential", "scope", "timing", "other"}
PRIVATE_TOKENS = ("/Users/", "file://", "-----BEGIN", "ghp_", "github_pat_")
COURSE_TOKENS = {
    "humgeo": ("humgeo", "human geography", "aphg"),
    "apwh": ("apwh", "world history"),
    "apush": ("apush", "u.s. history", "us history"),
    "psych": ("psych", "psychology"),
}


def now_utc():
    return dt.datetime.now(dt.timezone.utc)


def iso(value):
    return value.astimezone(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def validate_needs_human_document(document):
    if not isinstance(document, dict) or set(document) != NEEDS_HUMAN_KEYS:
        raise RuntimeError("NEEDS_HUMAN_PROJECTION_INVALID: top-level fields")
    if document.get("schema") != "needs-human-public/v1" or not isinstance(document.get("open"), list):
        raise RuntimeError("NEEDS_HUMAN_PROJECTION_INVALID: schema")
    try:
        dt.datetime.fromisoformat(str(document["generated_ts"]).replace("Z", "+00:00"))
    except (TypeError, ValueError):
        raise RuntimeError("NEEDS_HUMAN_PROJECTION_INVALID: generated_ts") from None
    for item in document["open"]:
        if not isinstance(item, dict) or set(item) != NEEDS_HUMAN_ITEM_KEYS:
            raise RuntimeError("NEEDS_HUMAN_PROJECTION_INVALID: item fields")
        title, deadline = item["title"], item["deadline"]
        try:
            dt.datetime.fromisoformat(str(item["ts"]).replace("Z", "+00:00"))
        except (TypeError, ValueError):
            raise RuntimeError("NEEDS_HUMAN_PROJECTION_INVALID: item timestamp") from None
        if (not isinstance(item["id"], str) or len(item["id"]) != 16
                or any(char not in "0123456789abcdef" for char in item["id"])
                or item["course"] not in COURSES | {"cross"}
                or item["kind"] not in NEEDS_HUMAN_KINDS
                or not isinstance(title, str) or not title.strip() or len(title) > 140
                or any(ord(char) < 32 for char in title) or any(token in title for token in PRIVATE_TOKENS)
                or not isinstance(deadline, str)
                or (deadline and (len(deadline) != 10 or deadline[4] != "-" or deadline[7] != "-"))):
            raise RuntimeError("NEEDS_HUMAN_PROJECTION_INVALID: public field")
    return document


def select_needs_human_document(incoming, current):
    validate_needs_human_document(current)
    if incoming is None:
        return current, "ABSENT", False
    validate_needs_human_document(incoming)
    incoming_ts = dt.datetime.fromisoformat(incoming["generated_ts"].replace("Z", "+00:00"))
    current_ts = dt.datetime.fromisoformat(current["generated_ts"].replace("Z", "+00:00"))
    if incoming_ts < current_ts:
        return current, "OLDER_IGNORED", False
    if incoming_ts == current_ts:
        if incoming != current:
            raise RuntimeError("NEEDS_HUMAN_PROJECTION_CONFLICT: equal timestamp, different document")
        return current, "REDELIVERY", False
    return incoming, "UPDATE", True


def fold_needs_human(source, destination=NEEDS_HUMAN_PATH):
    source = Path(source)
    if not source.is_file():
        raise RuntimeError("NEEDS_HUMAN_PROJECTION_MISSING")
    try:
        document = json.loads(source.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        raise RuntimeError("NEEDS_HUMAN_PROJECTION_INVALID: JSON") from None
    validate_needs_human_document(document)
    Path(destination).write_text(json.dumps(document, sort_keys=True, ensure_ascii=True, indent=1) + "\n", encoding="utf-8")
    print(f"needs-human: folded {len(document['open'])} open item(s)")


class GitHub:
    def __init__(self, token):
        if not token:
            raise RuntimeError("required token is missing")
        self.token = token

    def request(self, path, method="GET", payload=None):
        data = None if payload is None else json.dumps(payload).encode()
        request = urllib.request.Request(
            "https://api.github.com" + path, data=data, method=method,
            headers={
                "Authorization": f"Bearer {self.token}",
                "Accept": "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28",
                "User-Agent": "ap-four-course-dashboard-poller",
            },
        )
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                return json.load(response)
        except urllib.error.HTTPError as error:
            raise RuntimeError(f"GitHub API {path}: HTTP {error.code}") from None

def _item(repo, event, event_id, occurred_at, evidence_url, source_sha=None, **extra):
    return {
        "repository": repo, "event": event, "event_id": event_id,
        "source_sha": source_sha, "occurred_at": occurred_at,
        "evidence_url": evidence_url, **extra,
    }


def course_hint(default, *values):
    if default != "cross":
        return default
    text = " ".join(str(value or "").lower() for value in values)
    matches = [course for course, tokens in COURSE_TOKENS.items() if any(token in text for token in tokens)]
    return matches[0] if len(matches) == 1 else default


def repository_event_items(repo, default_course, rows):
    root = f"https://github.com/{repo}"
    items = []
    for row in rows:
        payload = row.get("payload") or {}
        kind = row.get("type") or "RepositoryEvent"
        action = payload.get("action") or kind.removesuffix("Event").lower()
        event, number, source_sha, evidence_url = "repository", None, None, root
        signals = []
        if kind == "PushEvent":
            event = "push"
            source_sha = payload.get("head")
            evidence_url = f"{root}/commit/{source_sha}" if isinstance(source_sha, str) and len(source_sha) == 40 else root
            signals = [payload.get("ref"), *(commit.get("message") for commit in payload.get("commits", []) if isinstance(commit, dict))]
        elif kind in {"PullRequestEvent", "PullRequestReviewEvent", "PullRequestReviewCommentEvent"}:
            pull = payload.get("pull_request") or {}
            event, number = "pull_request", payload.get("number") or pull.get("number")
            action = action if kind == "PullRequestEvent" else f"{kind.removesuffix('Event').lower()}_{action}"
            if kind == "PullRequestEvent" and pull.get("merged"):
                action = "merged"
            source_sha = pull.get("merge_commit_sha") if action == "merged" else (pull.get("head") or {}).get("sha")
            evidence_url = ((payload.get("review") or {}).get("html_url")
                            or (payload.get("comment") or {}).get("html_url")
                            or (f"{root}/pull/{number}" if isinstance(number, int) else root))
            signals = [pull.get("title"), pull.get("body"), (pull.get("head") or {}).get("ref")]
        elif kind in {"IssuesEvent", "IssueCommentEvent"}:
            issue = payload.get("issue") or {}
            event, number = "issues", issue.get("number")
            action = action if kind == "IssuesEvent" else f"comment_{action}"
            evidence_url = ((payload.get("comment") or {}).get("html_url")
                            or (f"{root}/issues/{number}" if isinstance(number, int) else root))
            signals = [issue.get("title"), issue.get("body")]
        elif kind == "ReleaseEvent":
            release = payload.get("release") or {}
            event = "release"
            evidence_url = release.get("html_url") or root
            source_sha = release.get("target_commitish")
            signals = [release.get("name"), release.get("tag_name")]
        else:
            signals = [payload.get("ref"), payload.get("ref_type")]
        if not isinstance(source_sha, str) or len(source_sha) != 40:
            source_sha = None
        extra = {"action": str(action).replace("/", "-")[:128], "course": course_hint(default_course, *signals)}
        if isinstance(number, int) and number > 0:
            extra["number"] = number
        items.append(_item(
            repo, event, f"activity:{row['id']}", row["created_at"], evidence_url,
            source_sha, **extra,
        ))
    return items


def collect_repo(api, repo, default_course):
    root = f"/repos/{repo}"
    events = api.request(f"{root}/events?per_page={MAX_PER_ENDPOINT}")
    runs = api.request(f"{root}/actions/runs?status=completed&per_page={MAX_PER_ENDPOINT}")["workflow_runs"]
    items = repository_event_items(repo, default_course, events)
    items += [
        _item(repo, "workflow_run", f"run:{row['id']}:{row['run_attempt']}", row["updated_at"], row["html_url"], row.get("head_sha"), number=row["run_number"], conclusion=row.get("conclusion") or "unknown", course=course_hint(default_course, row.get("name"), row.get("display_title"), row.get("head_branch")))
        for row in runs
    ]
    return items


def load_inventory():
    try:
        document = json.loads(os.environ.get("SOURCE_REPOSITORY_INVENTORY_JSON", ""))
    except json.JSONDecodeError:
        document = None
    repos = document.get("repos") if isinstance(document, dict) else None
    if (not isinstance(document, dict)
            or document.get("schema") != "dashboard-source-inventory/v1"
            or not isinstance(repos, dict) or len(repos) < 10
            or any(not isinstance(repo, str) or not REPOSITORY.fullmatch(repo)
                   or course not in {"humgeo", "apwh", "apush", "psych", "cross"}
                   for repo, course in repos.items())):
        raise RuntimeError("SOURCE_REPOSITORY_INVENTORY_INVALID")
    return repos


def cursor_hash(kind, value):
    return hashlib.sha256(f"{kind}:{value}".encode()).hexdigest()


def load_state():
    try:
        state = json.loads(STATE_PATH.read_text())
    except (OSError, json.JSONDecodeError):
        raise RuntimeError("DASHBOARD_CURSOR_INVALID") from None
    if (not isinstance(state, dict)
            or state.get("schema") not in {"dashboard-poller-state/v2", "dashboard-poller-state/v3"}
            or not isinstance(state.get("initialized"), bool)
            or (state.get("schema") == "dashboard-poller-state/v3" and not isinstance(state.get("activity_initialized"), bool))
            or any(not isinstance(state.get(field), list)
                   or len(state[field]) > 20000
                   or any(not isinstance(value, str) or not HEX64.fullmatch(value) for value in state[field])
                   for field in ("seen", "local_seen"))):
        raise RuntimeError("DASHBOARD_CURSOR_INVALID")
    return {**state, "activity_initialized": state.get("schema") == "dashboard-poller-state/v3" and state.get("activity_initialized") is True}


def collect_all(api, inventory):
    with ThreadPoolExecutor(max_workers=5) as pool:
        batches = pool.map(lambda repo: collect_repo(api, repo, inventory[repo]), inventory)
        items = [item for batch in batches for item in batch]
    unique = {poll_key(item): item for item in items}
    return sorted(unique.values(), key=lambda item: item["occurred_at"], reverse=True)


def ref_hashes(item):
    repo = item["repository"]
    name = repo.split("/", 1)[1]
    values = {item["evidence_url"]}
    sha = item.get("source_sha")
    if sha:
        values |= {sha, sha[:7], sha[:8], sha[:12], f"{name}@{sha}", f"{name}@{sha[:8]}"}
    if item.get("number"):
        values |= {f"{repo}#{item['number']}", f"{name}#{item['number']}", f"#{item['number']}"}
    return {hashlib.sha256(value.encode()).hexdigest() for value in values}


def load_local_dispatch():
    if os.environ.get("GITHUB_EVENT_NAME") != "repository_dispatch":
        return [], None
    try:
        event = json.loads(Path(os.environ["GITHUB_EVENT_PATH"]).read_text())
        payload = event["client_payload"]
        document = payload["document"]
        signature = payload["signature"]
        body = json.dumps(document, sort_keys=True, separators=(",", ":")).encode()
        secret = os.environ.get("LOCAL_EVENT_DISPATCH_SECRET", "").encode()
        if not secret or not verify_signature(secret, body, signature):
            raise ValueError("signature")
        if document.get("schema") == "dashboard-local-event-batch/v1":
            if (set(document) != {"schema", "events"}
                    or not isinstance(document["events"], list)
                    or not 1 <= len(document["events"]) <= MAX_LOCAL_BATCH):
                raise ValueError("batch")
            return document["events"], None
        if document.get("schema") == "needs-human-public/v1":
            validate_needs_human_document(document)
            return [], document
        raise ValueError("document schema")
    except (KeyError, TypeError, ValueError, json.JSONDecodeError, OSError) as error:
        raise RuntimeError(f"DASHBOARD_AUTOMATION_EVENTS_LOG_INVALID: dispatch {error}") from None


def select_updates(items, state, existing_updates, observed_at, inventory, local_items=()):
    seen = set(state["seen"])
    repo_cursor = lambda item: cursor_hash("repo", poll_key(item))
    bootstrap = not state.get("initialized")
    activity_bootstrap = not state.get("activity_initialized")
    if not bootstrap and not activity_bootstrap:
        for repo in inventory:
            for event in ("push", "pull_request", "issues", "release", "workflow_run"):
                page = [item for item in items if item["repository"] == repo and item["event"] == event]
                if len(page) == MAX_PER_ENDPOINT and all(repo_cursor(item) not in seen for item in page):
                    decision = {
                        "key": cursor_hash("hold", f"{repo}:{event}:page-limit"), "repository": repo,
                        "event": event, "occurred_at": iso(observed_at),
                        "status": "HOLD", "reason": "PAGINATION_BOUNDARY_UNRESOLVED",
                        "latency_seconds": 0,
                    }
                    return [], [decision], state, False
    eligible = []
    if bootstrap:
        for repo in inventory:
            candidates = [item for item in items if item["repository"] == repo]
            if candidates:
                eligible.append(max(candidates, key=lambda item: item["occurred_at"]))
    elif activity_bootstrap:
        activity = [item for item in items if str(item["event_id"]).startswith("activity:")]
        for course in COURSES:
            candidates = [item for item in activity if item.get("course", inventory.get(item["repository"])) == course]
            if candidates:
                eligible.append(max(candidates, key=lambda item: item["occurred_at"]))
    else:
        eligible = [item for item in items if repo_cursor(item) not in seen]
    decisions, updates, handled_repo = [], [], []
    local_seen = set(state["local_seen"])
    github_refs = set().union(*(ref_hashes(item) for item in items)) if items else set()
    for item in local_items:
        safe_item = item if isinstance(item, dict) else {}
        delivery_id = safe_item.get("delivery_id")
        prior = {delivery_id} if isinstance(delivery_id, str) and cursor_hash("local", delivery_id) in local_seen else set()
        decision = process_local_item(item, prior, github_refs, observed_at)
        if decision["status"] == "UPDATE" and len(updates) >= MAX_PUBLIC_UPDATES:
            continue
        occurred_at = str(safe_item.get("ts", iso(observed_at)))
        try:
            latency = max(0, int((observed_at - dt.datetime.fromisoformat(occurred_at.replace("Z", "+00:00"))).total_seconds()))
        except ValueError:
            latency = 0
        decisions.append({
            "key": cursor_hash("local", str(delivery_id or "invalid")), "repository": "LOCAL",
            "event": "local", "occurred_at": occurred_at,
            "status": decision["status"], "reason": decision["reason"],
            "latency_seconds": latency,
        })
        if decision["status"] == "UPDATE":
            updates.append(decision["update"])
        if decision["status"] != "HOLD" and isinstance(delivery_id, str):
            local_seen.add(cursor_hash("local", delivery_id))
    for item in sorted(eligible, key=lambda row: row["occurred_at"], reverse=True):
        decision = process_polled_item(item, inventory, set(), observed_at)
        public_key = lambda row: (row.get("event_type"), row.get("evidence_url"), row.get("ts"), row.get("text"))
        if decision["status"] == "UPDATE" and public_key(decision["update"]) in existing_updates:
            decision["status"], decision["reason"] = "REDELIVERY", "PUBLIC_EVIDENCE_ALREADY_PRESENT"
        if decision["status"] == "UPDATE" and len(updates) >= MAX_PUBLIC_UPDATES:
            continue
        if decision["status"] == "UPDATE":
            updates.append(decision["update"])
            existing_updates.add(public_key(decision["update"]))
        decisions.append({
            "key": repo_cursor(item), "repository": item["repository"],
            "event": item["event"], "occurred_at": item["occurred_at"],
            "status": decision["status"], "reason": decision["reason"],
            "latency_seconds": max(0, int((observed_at - dt.datetime.fromisoformat(item["occurred_at"].replace("Z", "+00:00"))).total_seconds())),
        })
        if decision["status"] != "HOLD":
            handled_repo.append(repo_cursor(item))
    if bootstrap:
        handled_repo = [repo_cursor(item) for item in items]
    elif activity_bootstrap:
        handled_repo.extend(repo_cursor(item) for item in items if str(item["event_id"]).startswith("activity:"))
    next_seen = list(dict.fromkeys(handled_repo + state["seen"]))[:20000]
    changed = (not state["initialized"] or activity_bootstrap or next_seen != state["seen"]
               or sorted(local_seen) != sorted(state["local_seen"]))
    next_state = {
        "schema": "dashboard-poller-state/v3", "initialized": True, "activity_initialized": True,
        "updated_at": iso(observed_at) if changed else state.get("updated_at", iso(observed_at)),
        "seen": next_seen, "local_seen": sorted(local_seen)[-20000:],
    }
    return updates, decisions, next_state, bootstrap


def sync_course_state(data, public_updates):
    """Project attested activity into display state without minting lifecycle credit."""
    claims = {row.get("claim_id"): row for row in data.get("claims", []) if isinstance(row, dict)}
    stamps = []
    for course in COURSES:
        claim = claims.get(f"{course}.blueprint.audit")
        if not isinstance(claim, dict):
            raise RuntimeError(f"DASHBOARD_PRIMARY_CLAIM_MISSING: {course}")
        rows = [row for row in public_updates if isinstance(row, dict)
                and str(row.get("course", "")).lower() == course]
        typed = [row for row in rows if isinstance(row.get("phase"), str)
                 and isinstance(row.get("kind"), str)]
        repository = [row for row in rows if isinstance(row.get("event_type"), str)
                      and isinstance(row.get("evidence_url"), str)]
        if typed:
            latest = max(typed, key=lambda row: row["ts"])
            claim["current_event"] = {
                field: latest[field] for field in ("ts", "phase", "kind", "text", "writer")
            }
        if repository:
            latest = max(repository, key=lambda row: row["ts"])
            claim["repository_event"] = {
                field: latest[field]
                for field in ("ts", "event_type", "text", "evidence_url", "writer")
            }
        for field in ("current_event", "repository_event"):
            if isinstance(claim.get(field), dict):
                stamps.append(claim[field].get("ts"))
        stamps.append(claim.get("observed_at") or claim.get("status_at"))
    parsed = [dt.datetime.fromisoformat(value.replace("Z", "+00:00"))
              for value in stamps if isinstance(value, str)]
    if not parsed:
        raise RuntimeError("DASHBOARD_SNAPSHOT_UNMEASURED")
    data["snapshot"] = max(parsed).strftime("%Y-%m-%dT%H:%MZ")


def run_key(observed_at):
    run = os.environ.get("GITHUB_RUN_ID") or observed_at.strftime("%Y%m%dT%H%M%SZ")
    attempt = os.environ.get("GITHUB_RUN_ATTEMPT") or "local"
    return f"{run}-{attempt}"


def prepare(transaction_path):
    observed_at = now_utc()
    source = GitHub(os.environ.get("SOURCE_REPO_READ_TOKEN"))
    inventory = load_inventory()
    state = load_state()
    key = run_key(observed_at)
    local_items, incoming_needs_human = load_local_dispatch()
    items = collect_all(source, inventory)
    public_path = Path("updates.json")
    public = json.loads(public_path.read_text())
    existing_updates = {
        (row.get("event_type"), row.get("evidence_url"), row.get("ts"), row.get("text"))
        for row in public if row.get("evidence_url")
    }
    updates, decisions, next_state, bootstrap = select_updates(
        items, state, existing_updates, observed_at, inventory, local_items,
    )
    data_path = Path("data.json")
    data = json.loads(data_path.read_text(encoding="utf-8"))
    current_needs_human = json.loads(NEEDS_HUMAN_PATH.read_text(encoding="utf-8"))
    needs_human, needs_human_status, needs_human_changed = select_needs_human_document(
        incoming_needs_human, current_needs_human,
    )
    holds = [decision for decision in decisions if decision["status"] == "HOLD"]
    receipt = {
        "schema": "dashboard-poller-receipt/v1", "run_key": key,
        "status": "HOLD" if holds else "RUNNING",
        "reason": "POLL_ITEM_HOLD" if holds else "VERIFIED_CANDIDATES",
        "trigger": os.environ.get("GITHUB_EVENT_NAME", "local"),
        "observed_at": iso(observed_at), "dashboard_base_sha": os.environ.get("DASHBOARD_BASE_SHA", "UNMEASURED"),
        "bootstrap": bootstrap, "repositories": list(inventory),
        "candidate_count": len(items), "updates_planned": len(updates), "decisions": decisions,
        "needs_human": {"status": needs_human_status, "generated_ts": needs_human["generated_ts"],
                        "open_count": len(needs_human["open"])},
    }
    if holds:
        raise RuntimeError("one or more polled items returned HOLD")
    transaction = {
        "schema": "dashboard-poller-transaction/v1", "prepared_at": iso(observed_at),
        "receipt": receipt, "state": next_state, "updates": updates,
    }
    Path(transaction_path).write_text(json.dumps(transaction, indent=2, sort_keys=True) + "\n")
    if updates:
        combined = sorted(updates + public, key=lambda row: row["ts"], reverse=True)
        public_path.write_text(json.dumps(combined, indent=2) + "\n")
        sync_course_state(data, combined)
        data_path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
    if needs_human_changed:
        NEEDS_HUMAN_PATH.write_text(
            json.dumps(needs_human, sort_keys=True, ensure_ascii=True, indent=1) + "\n",
            encoding="utf-8",
        )
    STATE_PATH.write_text(json.dumps(next_state, indent=2, sort_keys=True) + "\n")
    print(f"prepare: repositories={len(inventory)} candidates={len(items)} updates={len(updates)} "
          f"needs_human={needs_human_status} bootstrap={bootstrap}")


def finalize(transaction_path, dashboard_commit, pages_build_id):
    transaction = json.loads(Path(transaction_path).read_text())
    if transaction.get("schema") != "dashboard-poller-transaction/v1":
        raise RuntimeError("DASHBOARD_TRANSACTION_INVALID")
    print(f"finalize: updates={len(transaction['updates'])} dashboard_commit={dashboard_commit} pages_build_id={pages_build_id}")


def probe():
    inventory = load_inventory()
    items = collect_all(GitHub(os.environ.get("SOURCE_REPO_READ_TOKEN")), inventory)
    counts = {repo: len([item for item in items if item["repository"] == repo]) for repo in inventory}
    print(json.dumps({"repositories": len(inventory), "candidates": len(items), "counts": counts}, sort_keys=True))


def selftest():
    observed = dt.datetime(2026, 8, 29, 3, 0, tzinfo=dt.timezone.utc)
    sha = "a" * 40
    inventory = {"example/humgeo": "humgeo", "example/apwh": "apwh"}
    items = [
        _item(repo, "push", f"commit:{index}", f"2026-08-29T02:{index:02d}:00Z", f"https://github.com/{repo}/commit/{sha}", sha)
        for index, repo in enumerate(inventory)
    ]
    empty = {"schema": "dashboard-poller-state/v3", "initialized": False, "activity_initialized": True, "seen": [], "local_seen": []}
    updates, decisions, state, bootstrap = select_updates(items, empty, set(), observed, inventory)
    assert bootstrap and len(updates) == 2 and all(row["status"] == "UPDATE" for row in decisions)
    updates2, decisions2, _, bootstrap2 = select_updates(items, state, set(), observed, inventory)
    assert not bootstrap2 and not updates2 and not decisions2
    activity = repository_event_items("example/shared", "cross", [{
        "id": "123", "type": "PullRequestEvent", "created_at": "2026-08-29T02:30:00Z",
        "payload": {"action": "opened", "number": 7, "pull_request": {
            "number": 7, "title": "APWH source capture", "body": "", "html_url": "https://github.com/example/shared/pull/7",
            "head": {"sha": sha, "ref": "apwh/source-capture"}, "merge_commit_sha": None,
        }},
    }])
    assert activity[0]["course"] == "apwh" and activity[0]["action"] == "opened"
    legacy = {"schema": "dashboard-poller-state/v2", "initialized": True, "seen": [], "local_seen": []}
    migrated, _, migrated_state, _ = select_updates(activity, legacy, set(), observed, {"example/shared": "cross"})
    assert len(migrated) == 1 and migrated_state["schema"] == "dashboard-poller-state/v3" and migrated_state["activity_initialized"]
    full_page = [
        _item("example/humgeo", "push", f"commit:{index}", "2026-08-29T02:00:00Z", f"https://github.com/example/humgeo/commit/{index:040x}", f"{index:040x}")
        for index in range(MAX_PER_ENDPOINT)
    ]
    _, page_decisions, _, _ = select_updates(
        full_page, {**empty, "initialized": True}, set(), observed, inventory,
    )
    assert page_decisions[0]["reason"] == "PAGINATION_BOUNDARY_UNRESOLVED"
    local = {
        "schema": "incept-course-event-v1", "delivery_id": "1" * 16,
        "ts": "2026-08-29T02:00:00Z", "course": "humgeo", "phase": "P1",
        "kind": "landed", "text": "Local packet landed.", "backfill": False,
        "ref_hashes": [],
    }
    local_updates, local_decisions, local_state, _ = select_updates(
        [], {**empty, "initialized": True}, set(), observed, inventory, [local],
    )
    assert len(local_updates) == 1 and local_decisions[0]["status"] == "UPDATE"
    assert cursor_hash("local", local["delivery_id"]) in local_state["local_seen"]
    many_local = [{**local, "delivery_id": f"{index:016x}"} for index in range(MAX_PUBLIC_UPDATES + 1)]
    capped, _, capped_state, _ = select_updates(
        [], {**empty, "initialized": True}, set(), observed, inventory, many_local,
    )
    assert len(capped) == MAX_PUBLIC_UPDATES
    assert cursor_hash("local", many_local[-1]["delivery_id"]) not in capped_state["local_seen"]
    data = {"snapshot": "2026-08-29T00:00Z", "claims": [
        {"claim_id": f"{course}.blueprint.audit", "status_at": "2026-08-29T00:00Z"}
        for course in COURSES
    ]}
    public_rows = [
        {"ts": "2026-08-29T02:00Z", "course": "apwh", "phase": "Phase 2",
         "kind": "merged", "text": "Pricing landed.", "writer": "INCEPT event projection"},
        {"ts": "2026-08-29T02:01Z", "course": "apwh", "event_type": "pull_request",
         "text": "Pull request merged.", "evidence_url": "https://github.com/example/apwh/pull/1",
         "writer": "repository-event automation"},
    ]
    sync_course_state(data, public_rows)
    apwh = next(row for row in data["claims"] if row["claim_id"] == "apwh.blueprint.audit")
    assert apwh["current_event"]["phase"] == "Phase 2"
    assert apwh["repository_event"]["event_type"] == "pull_request"
    assert data["snapshot"] == "2026-08-29T02:01Z"
    projection = {
        "schema": "needs-human-public/v1", "generated_ts": "2026-08-29T02:30:00Z",
        "open": [{"id": "a" * 16, "ts": "2026-08-29T02:00:00Z", "course": "humgeo",
                  "kind": "decision", "title": "Choose the bounded option.", "deadline": ""}],
    }
    document = {"schema": "dashboard-local-event-batch/v1", "events": [local]}
    body = json.dumps(document, sort_keys=True, separators=(",", ":")).encode()
    with tempfile.TemporaryDirectory() as directory:
        event_path = Path(directory) / "event.json"
        event_path.write_text(json.dumps({"client_payload": {
            "document": document,
            "signature": "sha256=" + hmac.new(b"test", body, hashlib.sha256).hexdigest(),
        }}))
        old = {key: os.environ.get(key) for key in ("GITHUB_EVENT_NAME", "GITHUB_EVENT_PATH", "LOCAL_EVENT_DISPATCH_SECRET")}
        os.environ.update({"GITHUB_EVENT_NAME": "repository_dispatch", "GITHUB_EVENT_PATH": str(event_path), "LOCAL_EVENT_DISPATCH_SECRET": "test"})
        loaded_events, loaded_needs = load_local_dispatch()
        assert loaded_events == [local] and loaded_needs is None
        event_path.write_text(json.dumps({"client_payload": {
            "document": projection,
            "signature": "sha256=" + hmac.new(
                b"test", json.dumps(projection, sort_keys=True, separators=(",", ":")).encode(), hashlib.sha256
            ).hexdigest(),
        }}))
        loaded_events, loaded_needs = load_local_dispatch()
        assert loaded_events == [] and loaded_needs == projection
        for key, value in old.items():
            if value is None: os.environ.pop(key, None)
            else: os.environ[key] = value
        source = Path(directory) / "needs-human.public.json"
        destination = Path(directory) / "needs-human.json"
        source.write_text(json.dumps(projection))
        fold_needs_human(source, destination)
        assert json.loads(destination.read_text()) == projection
        try:
            validate_needs_human_document({**projection, "unexpected": True})
        except RuntimeError:
            pass
        else:
            raise AssertionError("unexpected needs-human field passed")
        current = {**projection, "generated_ts": "2026-08-29T02:00:00Z"}
        selected, status, changed = select_needs_human_document(projection, current)
        assert selected == projection and status == "UPDATE" and changed
        selected, status, changed = select_needs_human_document(current, projection)
        assert selected == projection and status == "OLDER_IGNORED" and not changed
        selected, status, changed = select_needs_human_document(projection, projection)
        assert selected == projection and status == "REDELIVERY" and not changed
        try:
            select_needs_human_document({**projection, "open": []}, projection)
        except RuntimeError as error:
            assert "CONFLICT" in str(error)
        else:
            raise AssertionError("equal-timestamp needs-human conflict passed")
    print("selftest: all checks passed")


def main():
    parser = argparse.ArgumentParser()
    sub = parser.add_subparsers(dest="command", required=True)
    prepare_parser = sub.add_parser("prepare")
    prepare_parser.add_argument("--transaction", required=True)
    finalize_parser = sub.add_parser("finalize")
    finalize_parser.add_argument("--transaction", required=True)
    finalize_parser.add_argument("--dashboard-commit", required=True)
    finalize_parser.add_argument("--pages-build-id", required=True)
    fold_parser = sub.add_parser("fold-needs-human")
    fold_parser.add_argument("--source", required=True)
    fold_parser.add_argument("--destination", default=str(NEEDS_HUMAN_PATH))
    validate_parser = sub.add_parser("validate-needs-human")
    validate_parser.add_argument("--source", default=str(NEEDS_HUMAN_PATH))
    sub.add_parser("probe")
    sub.add_parser("selftest")
    args = parser.parse_args()
    try:
        if args.command == "prepare": prepare(args.transaction)
        elif args.command == "finalize": finalize(args.transaction, args.dashboard_commit, args.pages_build_id)
        elif args.command == "fold-needs-human": fold_needs_human(args.source, args.destination)
        elif args.command == "validate-needs-human": validate_needs_human_document(json.loads(Path(args.source).read_text(encoding="utf-8")))
        elif args.command == "probe": probe()
        else: selftest()
    except RuntimeError as error:
        print(f"HOLD: {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
