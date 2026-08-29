#!/usr/bin/env python3
"""Pure, fail-closed contract for a private receiver to call."""

from __future__ import annotations

import datetime as dt
import hashlib
import hmac
import json
import os
import re
import tempfile
import urllib.parse

ALLOWED_KEYS = {
    "schema", "delivery_id", "event", "repository", "source_sha", "sender",
    "occurred_at", "dashboard_head", "action", "number", "ref",
}
COURSES = {"humgeo", "apwh", "apush", "psych"}
EVENTS = {"push", "pull_request", "issues"}
POLL_EVENTS = EVENTS | {"release", "workflow_run"}
SHA = re.compile(r"[0-9a-f]{40}")
REPOSITORY = re.compile(r"[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+")
TOKEN = re.compile(r"[A-Za-z0-9._:-]{1,128}")


def _decision(status, reason, delivery_id="unknown", source_sha="unknown", now=None, **extra):
    return {
        "schema": "dashboard-decision/v1",
        "status": status,
        "reason": reason,
        "delivery_id": delivery_id,
        "source_sha": source_sha,
        "decided_at": (now or dt.datetime.now(dt.timezone.utc)).strftime("%Y-%m-%dT%H:%M:%SZ"),
        **extra,
    }


def verify_signature(secret: bytes, body: bytes, signature: str) -> bool:
    expected = "sha256=" + hmac.new(secret, body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature)


def validate_envelope(event):
    if not isinstance(event, dict) or set(event) - ALLOWED_KEYS:
        return "unexpected field"
    required = {"schema", "delivery_id", "event", "repository", "source_sha", "sender", "occurred_at", "dashboard_head"}
    if required - set(event) or event.get("schema") != "dashboard-event/v1":
        return "missing or unsupported contract field"
    if not TOKEN.fullmatch(str(event["delivery_id"])):
        return "invalid delivery_id"
    if event["event"] not in EVENTS or not REPOSITORY.fullmatch(str(event["repository"])):
        return "unsupported event or repository"
    if not SHA.fullmatch(str(event["source_sha"])) or not SHA.fullmatch(str(event["dashboard_head"])):
        return "invalid sha"
    if not isinstance(event["sender"], str) or not event["sender"].strip():
        return "invalid sender"
    try:
        dt.datetime.fromisoformat(str(event["occurred_at"]).replace("Z", "+00:00"))
    except ValueError:
        return "invalid occurred_at"
    if event["event"] != "push" and (not isinstance(event.get("number"), int) or event["number"] < 1):
        return "missing event number"
    if "action" in event and not TOKEN.fullmatch(str(event["action"])):
        return "invalid action"
    return None


def process_delivery(secret, body, signature, inventory, seen, current_head, now=None):
    if not verify_signature(secret, body, signature):
        return _decision("HOLD", "SIGNATURE_INVALID", now=now)
    try:
        event = json.loads(body)
    except (UnicodeDecodeError, json.JSONDecodeError):
        return _decision("HOLD", "ENVELOPE_INVALID", now=now)
    error = validate_envelope(event)
    if error:
        return _decision("HOLD", f"ENVELOPE_INVALID: {error}", now=now)

    base = {"delivery_id": event["delivery_id"], "source_sha": event["source_sha"], "now": now}
    if event["dashboard_head"] != current_head:
        return _decision("HOLD", "HEAD_DRIFT_REEVALUATION_REQUIRED", **base)
    key = f'{event["repository"]}:{event["delivery_id"]}:{event["source_sha"]}'
    if key in seen:
        return _decision("REDELIVERY", "DUPLICATE_DELIVERY_AND_SHA", **base)
    if event["repository"] == "joshuadurey-del/ap-four-course-dashboard" or event["sender"].endswith("[bot]"):
        return _decision("NOOP", "AUTOMATION_OR_SELF_EVENT", **base)

    course = inventory.get(event["repository"])
    if course not in COURSES:
        return _decision("NOOP", "REPOSITORY_NOT_MONITORED", **base)

    short = event["source_sha"][:8]
    root = f'https://github.com/{event["repository"]}'
    if event["event"] == "push":
        text = f"Repository push verified at {short}."
        evidence_url = f'{root}/commit/{event["source_sha"]}'
    else:
        noun = "pull request" if event["event"] == "pull_request" else "issue"
        action = event.get("action", "updated").replace("_", "-")
        text = f"Repository {noun} #{event['number']} {action}; source {short}."
        evidence_url = f"{root}/{'pull' if event['event'] == 'pull_request' else 'issues'}/{event['number']}"
    return _decision(
        "UPDATE", "VERIFIED_REPOSITORY_ACTIVITY", **base,
        update={
            "ts": event["occurred_at"][:16] + "Z", "course": course, "text": text,
            "event_type": event["event"], "evidence_url": evidence_url,
        },
    )


def poll_key(item):
    return f'{item["repository"]}:{item["event_id"]}:{item.get("source_sha") or "none"}'


def process_polled_item(item, inventory, seen, now=None):
    allowed = {
        "repository", "event", "event_id", "source_sha", "occurred_at",
        "number", "action", "conclusion", "evidence_url",
    }
    if not isinstance(item, dict) or set(item) - allowed:
        return _decision("HOLD", "POLL_ITEM_INVALID: unexpected field", now=now)
    required = {"repository", "event", "event_id", "occurred_at", "evidence_url"}
    if required - set(item):
        return _decision("HOLD", "POLL_ITEM_INVALID: missing field", now=now)
    repo = str(item["repository"])
    event = item["event"]
    source_sha = item.get("source_sha") or "none"
    try:
        url = urllib.parse.urlparse(str(item["evidence_url"]))
        dt.datetime.fromisoformat(str(item["occurred_at"]).replace("Z", "+00:00"))
    except (TypeError, ValueError):
        return _decision("HOLD", "POLL_ITEM_INVALID: date or URL", now=now)
    if (not REPOSITORY.fullmatch(repo) or event not in POLL_EVENTS
            or not TOKEN.fullmatch(str(item["event_id"]))
            or (source_sha != "none" and not SHA.fullmatch(str(source_sha)))
            or url.scheme != "https" or url.hostname != "github.com" or not url.path.strip("/")):
        return _decision("HOLD", "POLL_ITEM_INVALID: authority field", now=now)
    if event in {"pull_request", "issues", "workflow_run"} and (
            not isinstance(item.get("number"), int) or item["number"] < 1):
        return _decision("HOLD", "POLL_ITEM_INVALID: event number", now=now)
    key = poll_key(item)
    base = {"delivery_id": key, "source_sha": source_sha, "now": now}
    if key in seen:
        return _decision("REDELIVERY", "DUPLICATE_REPO_EVENT_SHA", **base)
    course = inventory.get(repo)
    if course not in COURSES | {"cross"}:
        return _decision("NOOP", "REPOSITORY_NOT_MONITORED", **base)

    name = repo.split("/", 1)[1]
    short = source_sha[:8] if source_sha != "none" else "no-sha"
    if event == "push":
        text = f"{name} commit {short}."
    elif event == "pull_request":
        text = f"{name} pull request #{int(item['number'])} merged at {short}."
    elif event == "issues":
        text = f"{name} issue #{int(item['number'])} closed."
    elif event == "release":
        text = f"{name} release published at {short}."
    else:
        conclusion = str(item.get("conclusion") or "unknown")
        if not TOKEN.fullmatch(conclusion):
            return _decision("HOLD", "POLL_ITEM_INVALID: workflow conclusion", **base)
        text = f"{name} workflow run #{int(item['number'])} completed: {conclusion}."
    return _decision(
        "UPDATE", "VERIFIED_REPOSITORY_ACTIVITY", **base,
        update={
            "ts": str(item["occurred_at"])[:16] + "Z", "course": course,
            "text": text, "event_type": event, "evidence_url": str(item["evidence_url"]),
        },
    )


def claim_delivery(state_dir, delivery_id, source_sha):
    """Atomically claim one delivery/SHA in a caller-owned private directory."""
    os.makedirs(state_dir, mode=0o700, exist_ok=True)
    name = hashlib.sha256(f"{delivery_id}:{source_sha}".encode()).hexdigest()
    try:
        fd = os.open(os.path.join(state_dir, name), os.O_CREAT | os.O_EXCL | os.O_WRONLY, 0o600)
    except FileExistsError:
        return False
    os.close(fd)
    return True


def _self_test():
    now = dt.datetime(2026, 8, 29, 2, 30, tzinfo=dt.timezone.utc)
    sha = "a" * 40
    head = "b" * 40
    event = {
        "schema": "dashboard-event/v1", "delivery_id": "delivery-1", "event": "push",
        "repository": "example/course", "source_sha": sha, "sender": "human",
        "occurred_at": "2026-08-29T02:29:00Z", "dashboard_head": head,
    }
    secret = b"test-only"
    body = json.dumps(event, sort_keys=True).encode()
    signature = "sha256=" + hmac.new(secret, body, hashlib.sha256).hexdigest()
    run = lambda value=body, sig=signature, seen=(), current=head: process_delivery(
        secret, value, sig, {"example/course": "humgeo"}, set(seen), current, now,
    )
    assert run()["status"] == "UPDATE"
    assert run()["update"]["event_type"] == "push"
    assert run(seen={f"example/course:delivery-1:{sha}"})["status"] == "REDELIVERY"
    assert run(sig="sha256=bad")["reason"] == "SIGNATURE_INVALID"
    unsafe = json.dumps({**event, "phase": "10"}, sort_keys=True).encode()
    unsafe_sig = "sha256=" + hmac.new(secret, unsafe, hashlib.sha256).hexdigest()
    assert run(unsafe, unsafe_sig)["status"] == "HOLD"
    assert run(current="c" * 40)["reason"] == "HEAD_DRIFT_REEVALUATION_REQUIRED"
    with tempfile.TemporaryDirectory() as state:
        assert claim_delivery(state, "delivery-1", sha)
        assert not claim_delivery(state, "delivery-1", sha)
    polled = {
        "repository": "example/course", "event": "push", "event_id": "commit:a",
        "source_sha": sha, "occurred_at": "2026-08-29T02:29:00Z",
        "evidence_url": f"https://github.com/example/course/commit/{sha}",
    }
    decision = process_polled_item(polled, {"example/course": "humgeo"}, set(), now)
    assert decision["status"] == "UPDATE" and "commit aaaaaaaa" in decision["update"]["text"]
    assert process_polled_item(polled, {"example/course": "humgeo"}, {poll_key(polled)}, now)["status"] == "REDELIVERY"
    assert process_polled_item({**polled, "phase": "10"}, {"example/course": "humgeo"}, set(), now)["status"] == "HOLD"


if __name__ == "__main__":
    _self_test()
