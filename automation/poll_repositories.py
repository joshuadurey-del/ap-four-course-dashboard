#!/usr/bin/env python3
"""Poll private source repos and prepare/finalize one dashboard update transaction."""

from __future__ import annotations

import argparse
import base64
from concurrent.futures import ThreadPoolExecutor
import datetime as dt
import hashlib
import hmac
import json
import os
from pathlib import Path
import tempfile
import urllib.error
import urllib.parse
import urllib.request

from dashboard_event import poll_key, process_local_item, process_polled_item, verify_signature

EVIDENCE_REPO = "joshuadurey-del/ap-ss-evidence"
INVENTORY_PATH = "dashboard-automation/v1/inventory.json"
STATE_PATH = "dashboard-automation/v1/state.json"
MAX_PER_ENDPOINT = 100
MAX_PUBLIC_UPDATES = 40
MAX_LOCAL_BATCH = 80


def now_utc():
    return dt.datetime.now(dt.timezone.utc)


def iso(value):
    return value.astimezone(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


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

    def content(self, repo, path):
        endpoint = f"/repos/{repo}/contents/{urllib.parse.quote(path)}?ref=main"
        try:
            data = self.request(endpoint)
        except RuntimeError as error:
            if str(error).endswith("HTTP 404"):
                return None, None
            raise
        return json.loads(base64.b64decode(data["content"])), data["sha"]

    def put_content(self, repo, path, value, message, sha=None):
        payload = {
            "message": message, "branch": "main",
            "content": base64.b64encode((json.dumps(value, indent=2, sort_keys=True) + "\n").encode()).decode(),
        }
        if sha:
            payload["sha"] = sha
        endpoint = f"/repos/{repo}/contents/{urllib.parse.quote(path)}"
        return self.request(endpoint, "PUT", payload)["content"]["sha"]


def _item(repo, event, event_id, occurred_at, evidence_url, source_sha=None, **extra):
    return {
        "repository": repo, "event": event, "event_id": event_id,
        "source_sha": source_sha, "occurred_at": occurred_at,
        "evidence_url": evidence_url, **extra,
    }


def collect_repo(api, repo):
    root = f"/repos/{repo}"
    commits = api.request(f"{root}/commits?per_page={MAX_PER_ENDPOINT}")
    pulls = api.request(f"{root}/pulls?state=closed&sort=updated&direction=desc&per_page={MAX_PER_ENDPOINT}")
    issues = api.request(f"{root}/issues?state=closed&sort=updated&direction=desc&per_page={MAX_PER_ENDPOINT}")
    releases = api.request(f"{root}/releases?per_page={MAX_PER_ENDPOINT}")
    runs = api.request(f"{root}/actions/runs?status=completed&per_page={MAX_PER_ENDPOINT}")["workflow_runs"]
    items = [
        _item(repo, "push", f"commit:{row['sha']}", row["commit"]["committer"]["date"], row["html_url"], row["sha"])
        for row in commits
    ]
    items += [
        _item(repo, "pull_request", f"pr:{row['number']}:{row['merge_commit_sha']}", row["merged_at"], row["html_url"], row["merge_commit_sha"], number=row["number"], action="merged")
        for row in pulls if row.get("merged_at") and row.get("merge_commit_sha")
    ]
    items += [
        _item(repo, "issues", f"issue:{row['number']}:{row['closed_at']}", row["closed_at"], row["html_url"], number=row["number"], action="closed")
        for row in issues if "pull_request" not in row and row.get("closed_at")
    ]
    items += [
        _item(repo, "release", f"release:{row['id']}", row["published_at"], row["html_url"], row.get("target_commitish") if len(row.get("target_commitish", "")) == 40 else None)
        for row in releases if row.get("published_at")
    ]
    items += [
        _item(repo, "workflow_run", f"run:{row['id']}:{row['run_attempt']}", row["updated_at"], row["html_url"], row.get("head_sha"), number=row["run_number"], conclusion=row.get("conclusion") or "unknown")
        for row in runs
    ]
    return items


def load_inventory(evidence):
    document, _ = evidence.content(EVIDENCE_REPO, INVENTORY_PATH)
    repos = document.get("repos") if isinstance(document, dict) else None
    if (not isinstance(repos, dict) or len(repos) != 10
            or any(not isinstance(repo, str) or course not in {"humgeo", "apwh", "apush", "psych", "cross"}
                   for repo, course in repos.items())):
        raise RuntimeError("private source inventory is missing or invalid")
    return repos


def collect_all(api, inventory):
    with ThreadPoolExecutor(max_workers=5) as pool:
        batches = pool.map(lambda repo: collect_repo(api, repo), inventory)
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
        return []
    try:
        event = json.loads(Path(os.environ["GITHUB_EVENT_PATH"]).read_text())
        payload = event["client_payload"]
        document = payload["document"]
        signature = payload["signature"]
        body = json.dumps(document, sort_keys=True, separators=(",", ":")).encode()
        secret = os.environ.get("LOCAL_EVENT_DISPATCH_SECRET", "").encode()
        if not secret or not verify_signature(secret, body, signature):
            raise ValueError("signature")
        if (set(document) != {"schema", "events"}
                or document["schema"] != "dashboard-local-event-batch/v1"
                or not isinstance(document["events"], list)
                or not 1 <= len(document["events"]) <= MAX_LOCAL_BATCH):
            raise ValueError("batch")
        return document["events"]
    except (KeyError, TypeError, ValueError, json.JSONDecodeError, OSError) as error:
        raise RuntimeError(f"DASHBOARD_AUTOMATION_EVENTS_LOG_INVALID: dispatch {error}") from None


def select_updates(items, state, existing_urls, observed_at, inventory, local_items=()):
    seen = set(state.get("seen", []))
    bootstrap = not state.get("initialized")
    if not bootstrap:
        for repo in inventory:
            for event in ("push", "pull_request", "issues", "release", "workflow_run"):
                page = [item for item in items if item["repository"] == repo and item["event"] == event]
                if len(page) == MAX_PER_ENDPOINT and all(poll_key(item) not in seen for item in page):
                    decision = {
                        "key": f"{repo}:{event}:page-limit", "repository": repo,
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
    else:
        eligible = [item for item in items if poll_key(item) not in seen]
    decisions, updates = [], []
    for item in sorted(eligible, key=lambda row: row["occurred_at"], reverse=True):
        decision = process_polled_item(item, inventory, seen, observed_at)
        if decision["status"] == "UPDATE" and decision["update"]["evidence_url"] in existing_urls:
            decision["status"], decision["reason"] = "REDELIVERY", "PUBLIC_EVIDENCE_ALREADY_PRESENT"
        if decision["status"] == "UPDATE" and len(updates) < MAX_PUBLIC_UPDATES:
            updates.append(decision["update"])
        decisions.append({
            "key": poll_key(item), "repository": item["repository"],
            "event": item["event"], "occurred_at": item["occurred_at"],
            "status": decision["status"], "reason": decision["reason"],
            "latency_seconds": max(0, int((observed_at - dt.datetime.fromisoformat(item["occurred_at"].replace("Z", "+00:00"))).total_seconds())),
        })
    local_seen = set(state.get("local_seen", []))
    github_refs = set().union(*(ref_hashes(item) for item in items)) if items else set()
    for item in local_items:
        decision = process_local_item(item, local_seen, github_refs, observed_at)
        safe_item = item if isinstance(item, dict) else {}
        occurred_at = str(safe_item.get("ts", iso(observed_at)))
        try:
            latency = max(0, int((observed_at - dt.datetime.fromisoformat(occurred_at.replace("Z", "+00:00"))).total_seconds()))
        except ValueError:
            latency = 0
        decisions.append({
            "key": str(safe_item.get("delivery_id", "invalid")), "repository": "LOCAL",
            "event": "local", "occurred_at": occurred_at,
            "status": decision["status"], "reason": decision["reason"],
            "latency_seconds": latency,
        })
        if decision["status"] == "UPDATE" and len(updates) < MAX_PUBLIC_UPDATES:
            updates.append(decision["update"])
        if decision["status"] != "HOLD" and isinstance(safe_item.get("delivery_id"), str):
            local_seen.add(safe_item["delivery_id"])
    current_keys = [poll_key(item) for item in items]
    current_set = set(current_keys)
    prior_keys = [key for key in state.get("seen", []) if key not in current_set]
    next_state = {
        "schema": "dashboard-poller-state/v1", "initialized": True,
        "updated_at": iso(observed_at),
        "seen": (current_keys + prior_keys)[:20000],
        "local_seen": sorted(local_seen)[-20000:],
    }
    return updates, decisions, next_state, bootstrap


def run_key(observed_at):
    run = os.environ.get("GITHUB_RUN_ID") or observed_at.strftime("%Y%m%dT%H%M%SZ")
    attempt = os.environ.get("GITHUB_RUN_ATTEMPT") or "local"
    return f"{run}-{attempt}"


def prepare(transaction_path):
    observed_at = now_utc()
    source = GitHub(os.environ.get("SOURCE_REPO_READ_TOKEN"))
    evidence = GitHub(os.environ.get("EVIDENCE_REPO_WRITE_TOKEN"))
    inventory = load_inventory(evidence)
    state, state_sha = evidence.content(EVIDENCE_REPO, STATE_PATH)
    state = state or {"schema": "dashboard-poller-state/v1", "initialized": False, "seen": []}
    key = run_key(observed_at)
    receipt_path = f"runs/{observed_at:%Y-%m-%d}/dashboard-automation/{key}.json"
    try:
        local_items = load_local_dispatch()
        items = collect_all(source, inventory)
    except RuntimeError as error:
        receipt = {
            "schema": "dashboard-poller-receipt/v1", "run_key": key,
            "status": "HOLD", "reason": str(error),
            "trigger": os.environ.get("GITHUB_EVENT_NAME", "local"),
            "observed_at": iso(observed_at), "repositories": list(inventory),
        }
        evidence.put_content(EVIDENCE_REPO, receipt_path, receipt, f"dashboard poll HOLD {key}")
        raise
    public_path = Path("updates.json")
    public = json.loads(public_path.read_text())
    existing_urls = {row.get("evidence_url") for row in public if row.get("evidence_url")}
    updates, decisions, next_state, bootstrap = select_updates(
        items, state, existing_urls, observed_at, inventory, local_items,
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
    }
    receipt_sha = evidence.put_content(EVIDENCE_REPO, receipt_path, receipt, f"dashboard poll RUNNING {key}")
    if holds:
        raise RuntimeError("one or more polled items returned HOLD")
    transaction = {
        "schema": "dashboard-poller-transaction/v1", "prepared_at": iso(observed_at),
        "receipt_path": receipt_path, "receipt_sha": receipt_sha, "receipt": receipt,
        "state": next_state, "state_sha": state_sha, "updates": updates,
    }
    Path(transaction_path).write_text(json.dumps(transaction, indent=2, sort_keys=True) + "\n")
    if updates:
        combined = sorted(updates + public, key=lambda row: row["ts"], reverse=True)
        public_path.write_text(json.dumps(combined, indent=2) + "\n")
    print(f"prepare: repositories={len(inventory)} candidates={len(items)} updates={len(updates)} bootstrap={bootstrap}")


def finalize(transaction_path, dashboard_commit, pages_build_id):
    evidence = GitHub(os.environ.get("EVIDENCE_REPO_WRITE_TOKEN"))
    transaction = json.loads(Path(transaction_path).read_text())
    state_sha = evidence.put_content(
        EVIDENCE_REPO, STATE_PATH, transaction["state"],
        f"dashboard poll cursor {transaction['receipt']['run_key']}", transaction.get("state_sha"),
    )
    finished = now_utc()
    receipt = transaction["receipt"]
    landed = [row for row in receipt["decisions"] if row["status"] == "UPDATE"]
    push_latencies = [
        max(0, int((finished - dt.datetime.fromisoformat(row["occurred_at"].replace("Z", "+00:00"))).total_seconds()))
        for row in landed
    ]
    receipt.update({
        "status": "COMPLETE", "completed_at": iso(finished),
        "dashboard_commit": dashboard_commit, "cursor_blob_sha": state_sha,
        "pages_build_id": pages_build_id,
        "pages_build_status": "REQUESTED" if pages_build_id != "NOT_REQUESTED" else "NOT_REQUESTED",
        "event_to_served_seconds": "UNMEASURED",
        "updates_landed": len(transaction["updates"]),
        "event_to_push_seconds_min": min(push_latencies) if push_latencies else "UNMEASURED",
        "event_to_push_seconds_max": max(push_latencies) if push_latencies else "UNMEASURED",
    })
    evidence.put_content(
        EVIDENCE_REPO, transaction["receipt_path"], receipt,
        f"dashboard poll COMPLETE {receipt['run_key']}", transaction["receipt_sha"],
    )
    print(f"finalize: updates={len(transaction['updates'])} dashboard_commit={dashboard_commit}")


def probe():
    evidence = GitHub(os.environ.get("EVIDENCE_REPO_WRITE_TOKEN"))
    inventory = load_inventory(evidence)
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
    updates, decisions, state, bootstrap = select_updates(items, {"initialized": False, "seen": []}, set(), observed, inventory)
    assert bootstrap and len(updates) == 2 and all(row["status"] == "UPDATE" for row in decisions)
    updates2, decisions2, _, bootstrap2 = select_updates(items, state, set(), observed, inventory)
    assert not bootstrap2 and not updates2 and not decisions2
    full_page = [
        _item("example/humgeo", "push", f"commit:{index}", "2026-08-29T02:00:00Z", f"https://github.com/example/humgeo/commit/{index:040x}", f"{index:040x}")
        for index in range(MAX_PER_ENDPOINT)
    ]
    _, page_decisions, _, _ = select_updates(full_page, {"initialized": True, "seen": []}, set(), observed, inventory)
    assert page_decisions[0]["reason"] == "PAGINATION_BOUNDARY_UNRESOLVED"
    local = {
        "schema": "incept-course-event-v1", "delivery_id": "1" * 16,
        "ts": "2026-08-29T02:00:00Z", "course": "humgeo", "phase": "P1",
        "kind": "landed", "text": "Local packet landed.", "backfill": False,
        "ref_hashes": [],
    }
    local_updates, local_decisions, local_state, _ = select_updates(
        [], {"initialized": True, "seen": []}, set(), observed, inventory, [local],
    )
    assert len(local_updates) == 1 and local_decisions[0]["status"] == "UPDATE"
    assert local["delivery_id"] in local_state["local_seen"]
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
        assert load_local_dispatch() == [local]
        for key, value in old.items():
            if value is None: os.environ.pop(key, None)
            else: os.environ[key] = value
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
    sub.add_parser("probe")
    sub.add_parser("selftest")
    args = parser.parse_args()
    if args.command == "prepare": prepare(args.transaction)
    elif args.command == "finalize": finalize(args.transaction, args.dashboard_commit, args.pages_build_id)
    elif args.command == "probe": probe()
    else: selftest()


if __name__ == "__main__":
    main()
