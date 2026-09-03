#!/usr/bin/env python3
"""Build the dashboard's machine files from the ASAP-edition contract snapshot.

The phase objects below are the parsed `asap_runbook.phases` YAML from
RUNBOOK-ASAP.md at sha256 eb1a4e57c171d6a92f6d2f2da692a48e48abe44005d5cadb532d0c9afdb293d9.
Run from anywhere: build-machine-files.py DASHBOARD_DIR UTC_STAMP.
"""
import json
import sys
from pathlib import Path

DASH = Path(sys.argv[1])
STAMP = sys.argv[2]
EDITION = "ASAP edition (2026-09-01)"
SOURCE_SHA256 = "eb1a4e57c171d6a92f6d2f2da692a48e48abe44005d5cadb532d0c9afdb293d9"

# Parsed, not retyped: verified against the fenced YAML before publication.
ASAP_PHASES = [
    {"id": "p0"},
    {
        "id": "p12",
        "name": "tree-and-pricing",
        "state": "done-all-four",
        "verify": "blueprint predicates PROVEN in skills/factory-course-run/contracts/courses.json",
    },
    {
        "id": "p3",
        "name": "bank-gates",
        "verify": [
            "phase-bank-validation skill (answer-shape + key balance)",
            "QTI parse + assertions (original §3.6) — NOT skippable: LearnWith marks a failed embedded item COMPLETE",
        ],
    },
    {"id": "p4"},
    {
        "id": "p5",
        "name": "publish-dark",
        "steps": ["export-qti", "upload-cms", "push-timeback", "verify-live"],
        "verify": [
            "verify-live readback reconciles push bundle exactly (APES pub_stage7_verify_live.py pattern)",
            "publishStatus == testing",
            "enrollments == 0",
            "evidence bundle README in course repo (Bio/APES format)",
        ],
        "shape": "one course holds all units (APES: unit 1 mints, later units pin --course-id)",
    },
    {
        "id": "p6",
        "name": "live-qc-gauntlet",
        "instrument": "fleet course-QC harness (APES reports/step5_courseqc/ job pattern) — reuse, don't build",
        "loop": "judge -> remediate (1-repair/2-regenerate) -> re-push -> re-judge until bar",
        "repush_rules": [
            "denylist: every QC-dropped ID recorded at drop time; push tooling refuses denylisted IDs",
            "drift: never re-push a tree that mismatches last verified state (APES pub_preflight_drift.py)",
        ],
    },
    {
        "id": "p7",
        "name": "walk-and-accept",
        "verify": [
            "demo-walker PASS on serving paths (answers save; feedback choice-specific, non-leaking; keys unskewed)",
            "one human pass: start/middle/end + longest reading + each writing geometry",
            "XP spot-check: <80%=0, >=80%=base once, 100%=1.25x once, reload adds nothing",
        ],
        "account": "ONE owner test account, enrolled additively",
    },
    {
        "id": "p8",
        "name": "demo-and-flip",
        "verify": [
            "Ilma demo done from test account",
            "her word recorded",
            "then broader enrollment",
        ],
    },
]

DISPLAY_NAMES = {"p0": "CUT", "p4": "CUT"}


def required_artifacts(phase):
    items = []
    for key in ("steps", "verify", "repush_rules"):
        value = phase.get(key, [])
        items.extend(value if isinstance(value, list) else [value])
    for key in ("instrument", "loop", "shape", "account"):
        if phase.get(key):
            items.append(phase[key])
    return items


stages = []
for phase in ASAP_PHASES:
    cut = phase["id"] in DISPLAY_NAMES
    stages.append({
        "id": phase["id"],
        "name": DISPLAY_NAMES[phase["id"]] if cut else phase["name"],
        "state": "cut" if cut else phase.get("state", "required"),
        "contract_status": "CUT" if cut else ("DONE_ALL_FOUR" if phase.get("state") == "done-all-four" else "REQUIRED"),
        "required_artifacts": required_artifacts(phase),
        "automated": False,
    })

courses = {
    "humgeo": {
        "label": "AP Human Geography",
        "current_stage": "content",
        "state": "RE-EARN — ENRICH-FIRST",
        "as_of": "2026-09-01T04:47:40Z",
        "detail": "A 72-page enrichment campaign is live. The existing publication chain is queued to run once over final bytes.",
        "priority": 1,
    },
    "apwh": {
        "label": "AP World History",
        "current_stage": "content",
        "state": "RE-EARN — PRIORITY 2",
        "as_of": "2026-09-03T04:09:00Z",
        "detail": "The tier-2 gate repair is landed and read back: build 1f0fac27, serve 2b17b98e, staging at 2b17b98e; 143/143 repaired gate members are served, seating remains 1,988/1,988, and the gate manifest is unchanged. A fresh A2 measurement comes next, then the stimulus-kind campaign.",
        "priority": 2,
    },
    "apush": {
        "label": "AP US History",
        "current_stage": "fleet-held",
        "state": "RE-EARN — PRIORITY 3",
        "as_of": "2026-09-01T04:47:40Z",
        "detail": "Dashboard-side specification work is closed. The next course move waits for the fleet sequence-adapter release.",
        "priority": 3,
    },
    "psych": {
        "label": "AP Psychology",
        "current_stage": "p5",
        "state": "RE-EARN — FLEET-DRIVEN",
        "as_of": "2026-09-01T04:47:40Z",
        "detail": "The fleet owns dark publication through its existing pipeline; this dashboard records p5 without projecting p6 credit.",
        "priority": "parallel",
    },
}

process = {
    "schema_version": 2,
    "generated_utc": STAMP,
    "label": EDITION,
    "runbook_version": "2026-09-01.2",
    "source_sha256": SOURCE_SHA256,
    "authority_note": "Publication runbook, ASAP edition, 2026-09-01. Requirements only; current course positions are re-earned from the per-course plans.",
    "route": ["content", "p3", "p5", "p6", "p7", "p8"],
    "phases": ASAP_PHASES,
    "stages": stages,
    "courses": courses,
}

# The only public home for retired phase names: historical label -> ASAP destination.
crosswalk_rows = [
    {"old_id": "p0", "old_name": "Establish authority", "new_ids": ["p0"], "disposition": "cut"},
    {"old_id": "p1", "old_name": "Map the complete course tree", "new_ids": ["p12"], "disposition": "combined"},
    {"old_id": "p2", "old_name": "Price activities", "new_ids": ["p12"], "disposition": "combined"},
    {"old_id": "p3", "old_name": "Generate hosted assets and QTI", "new_ids": ["content", "p3"], "disposition": "split; only bank/QTI gates remain in p3"},
    {"old_id": "p4", "old_name": "Seal the publication plan", "new_ids": ["p4"], "disposition": "cut"},
    {"old_id": "p5", "old_name": "Capture live all-absent state", "new_ids": ["p5"], "disposition": "folded"},
    {"old_id": "p6", "old_name": "Dark publication and exact replay", "new_ids": ["p5"], "disposition": "folded"},
    {"old_id": "p7", "old_name": "Owner-controlled canary enrollment", "new_ids": ["p7"], "disposition": "folded"},
    {"old_id": "p8", "old_name": "Private activation", "new_ids": ["p8"], "disposition": "folded"},
    {"old_id": "p9.1-9.5", "old_name": "Fresh-learner acceptance", "new_ids": ["p7"], "disposition": "folded"},
    {"old_id": "p9.6", "old_name": "Broader enrollment", "new_ids": ["p8"], "disposition": "folded"},
    {"old_id": "p10", "old_name": "Repair and rollback", "new_ids": ["p6"], "disposition": "folded into the gauntlet loop"},
]
crosswalk = {
    "schema_version": 2,
    "generated_utc": STAMP,
    "label": f"Original publication runbook -> {EDITION}",
    "rule": "Historical mappings preserve evidence scope and grant no current ASAP phase credit.",
    "stage_ids": [phase["id"] for phase in ASAP_PHASES],
    "counts": {"total": len(crosswalk_rows)},
    "rows": crosswalk_rows,
}

training = {
    "schema_version": 1,
    "generated_utc": STAMP,
    "what_this_is": "Register of training and eval corpora for the course-build model program: the catalog, never the data.",
    "boundary": "No corpus file is ever published to this site. A SHA-256 here lets a holder of the private bytes verify identity.",
    "assets": [
        {"id": "repair_pairs.v0", "purpose": "Repair model: failing item + structural repair + accepted retry, full content inline.", "rows": 431, "sha256": "6f60e664f94aee78d7ecbba20ebe09a05714077e282495999c37daea0efd963a", "snapshot": "2026-08-26", "status": "GO at pilot scale", "home": "Alpha workspace, training-data census 2026-08-26"},
        {"id": "prescreen_labels.v0", "purpose": "Verdict prediction: predict the factory verdict before spend.", "rows": 444, "sha256": "257a95ca64010f493000fd59ff7e28ebc146446c4984ebe14aeced9f5e885121", "snapshot": "2026-08-26", "status": "NOT trainable yet: 437 pass vs 7 fail — failures get repaired out of the bank", "home": "Alpha workspace, training-data census 2026-08-26"},
        {"id": "decision_events.v0", "purpose": "Content-free typed controller events, each source-traceable to its ledger line.", "rows": 161, "sha256": "efa01c2024cd99146b731340ab999f8b592546181665d2d294bfdc77d812ac22", "snapshot": "2026-08-27", "status": "GROWING with publication-route events", "home": "Alpha workspace, decision-log v0 2026-08-27"},
        {"id": "historical_fails.v0", "purpose": "Mine the fail class for verdict prediction.", "rows": None, "sha256": None, "snapshot": None, "status": "PLANNED, not started", "home": "Workspace receipts and git history"},
        {"id": "cross_course_verdicts.v0", "purpose": "Verdict evidence for APWH, APUSH, and Psychology.", "rows": None, "sha256": None, "snapshot": None, "status": "PLANNED, not started; historical assessment receipts are the named leads", "home": "Private evidence homes"},
    ],
    "observability": {"langfuse": "https://us.cloud.langfuse.com", "evidence_repo": "https://github.com/joshuadurey-del/ap-ss-evidence"},
}

assert [phase["id"] for phase in ASAP_PHASES] == ["p0", "p12", "p3", "p4", "p5", "p6", "p7", "p8"]
assert {stage["id"] for stage in stages if stage["state"] == "cut"} == {"p0", "p4"}
assert next(phase for phase in ASAP_PHASES if phase["id"] == "p12")["state"] == "done-all-four"

for name, document in (("process.json", process), ("crosswalk.json", crosswalk), ("training.json", training)):
    destination = DASH / name
    destination.write_text(json.dumps(document, indent=1) + "\n")
    json.load(destination.open())
    print(name, destination.stat().st_size, "bytes, valid")
print("crosswalk rows:", crosswalk["counts"]["total"])
