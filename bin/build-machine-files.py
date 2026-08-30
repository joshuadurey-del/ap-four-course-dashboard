#!/usr/bin/env python3
"""Build process.json, crosswalk.json, training.json for the dashboard.
Sources: TIMEBACK-HANDBOOK-DRAFT v0.3 (2026-08-26), codex re-review
(out/handbook-replay-review-20260826/codex.md), the three process traces,
GATE-CANON-MAP, and the 2026-08-26 training-data census. Run from anywhere;
writes into the dashboard repo passed as argv[1], stamp as argv[2]."""
import json, sys
from pathlib import Path

DASH = Path(sys.argv[1]); STAMP = sys.argv[2]
GH = "https://github.com/"

HOLD_CLASSES = [
    {"id": 1, "name": "known-check-skipped", "rule": "A KNOWN check was skipped, then failed after a later gate closed. Reopen the earliest affected gate for exactly the failing records."},
    {"id": 2, "name": "upstream-bytes-moved", "rule": "Upstream bytes moved under a closure. Rebind on fresh digests."},
    {"id": 3, "name": "approval-gap", "rule": "Approval gap. HOLD naming the owner and the exact authority artifact the course profile and phase plan require. Owner prose satisfies only an explicitly named approval predicate."},
    {"id": 4, "name": "missing-factory-contract", "rule": "Missing factory contract. Classify, file through the filing gate, HOLD for the named approval predicate. Never adapt a runner locally."},
    {"id": 5, "name": "identity-fault-at-acceptance", "rule": "Identity or learner-state fault at acceptance. Record the no-go, repair, retry."},
    {"id": 6, "name": "uncorridored-timeback-write", "rule": "Any TimeBack write outside the named ap-one publisher (no plan digest, no zero-write replay) fails and earns no G-closure credit. Same-byte, same-contract creation-time artifacts stay reusable under the non-waste rule; the write itself never earns a gate."},
    {"id": 7, "name": "leaked-answer-content", "rule": "Leaked answer text or keys on any committed or served artifact. Stop the line, purge, re-verify."},
    {"id": 8, "name": "silent-pass-must-fail-closed", "rule": "Markup or format that must fail closed is passing silently. Make it fail closed, then repair what got through."},
    {"id": 9, "name": "pilot-failed", "rule": "A pilot fails. Suspend and replan. Never retry blind."},
    {"id": 10, "name": "landed-change-fails-own-suite", "rule": "A landed change fails its own suite. Same-day repair PR and reopen the affected receipt."},
    {"id": 11, "name": "evidence-integrity", "rule": "A claim or receipt overstates its bytes. Reopen the stage whose receipt was overstated; it closes again only on a corrected, byte-bound receipt."},
]
OUT_OF_CORRIDOR = "A REMOTE Platform3 mutation during a native-corridor run maps to no stage and takes a HOLD. Local preparation, committed producer envelopes, and zero-write verification carry no HOLD and route by their actual stage function."

def stage(id_, name, entry, artifacts, receipt, holds, reopen, resume, contract, proven, evidence):
    return {"id": id_, "name": name, "entry_predicate": entry, "required_artifacts": artifacts,
            "pass_receipt": receipt, "hold_classes": holds, "reopen_target": reopen,
            "resume_evidence": resume, "contract_status": contract,
            "proven": proven, "evidence": evidence}

STAGES = [
    stage("A", "Scaffold + source corpus",
          "One writer proven (Gate 0 STABILIZED or an explicit NOT_REQUIRED) plus course assignment.",
          ["Build repo", "Source pack", "Governance docs", "Locked official scope"],
          "Gate 1 closure packet (SCOPE_LOCKED) for gen-3; repo evidence for gen-2 history.",
          [9, 10, 11], "Per triggered HOLD class.", "Corrected byte-bound receipt.",
          "PARTIAL (codex finding 5)",
          {"level": "packet", "note": "Packet plus gen-2 worked examples; entry predicate worked example is HumGeo's issue-44 stabilization cycle (trace rows 36-46)."},
          [GH+"ilmych/humgeo-rebuild/pull/62", GH+"InceptTrilogy/ap-english-language-fall-2019-v1", GH+"InceptTrilogy/ap-english-literature-fall-2019-v1"]),
    stage("B", "Compile machinery + inventory",
          "Stage A closed (SCOPE_LOCKED).",
          ["Compilers, generators, calibration harness", "Full census of existing vs missing content with zero unknown rows"],
          "Gate 2 packet (INVENTORY_LOCKED, zero unknown).",
          [1], "Reopen Gate 2 for exactly the missed records.", "Amended inventory receipt, byte-stable.",
          "PARTIAL (codex finding 5)",
          {"level": "packet", "note": "HumGeo closed after two reopens."},
          [GH+"ilmych/humgeo-rebuild/pull/63", GH+"ilmych/humgeo-rebuild/pull/64", GH+"ilmych/humgeo-rebuild/pull/66"]),
    stage("C", "Content build",
          "Stage B closed (INVENTORY_LOCKED).",
          ["Articles, items, video built through the factory", "Every KNOWN bank-wide check run at generation (answer shape, balance, structure)"],
          "Gate 3 packet (SOURCE_ACCEPTED) with delivery digest.",
          [1, 7, 8], "Earliest affected gate for exactly the failing records.", "Repaired records re-accepted through both factory QC layers.",
          "PARTIAL (codex finding 5)",
          {"level": "packet", "note": "New checks invented later belong to D and do not retroactively convict C."},
          [GH+"ilmych/humgeo-rebuild/pull/67"]),
    stage("D", "QC waves + review lanes",
          "Content exists (runs with and after C).",
          ["Factory creation QC plus independent /v1/qc verdicts", "New sweeps", "Cross-model review; the agent that changes content never waives the gate that failed"],
          "Verdict receipts bound to exact bytes (Gate 3 + factory contracts).",
          [4, 11], "The stage whose receipt the failed verdict covers.", "Fresh factory verdicts on the exact bytes.",
          "PARTIAL (codex finding 5)",
          {"level": "proven", "note": "Lit's review lane caught placeholder rubrics; HumGeo re-earned 429 fingerprint-bound passes."},
          [GH+"ilmych/humgeo-rebuild/pull/43"]),
    stage("E", "Import + source/profile bind",
          "Stage D-accepted source; reviewed course profile.",
          ["Import receipt: named commit or PR + tree listing + layout under courses/<slug>/ (binds from the next course onward)", "Bind to exact accepted-source digests with reviewed profile"],
          "Gate 4 packet (PROFILE_AND_SOURCE_BOUND) containing the import receipt.",
          [2, 3], "Rebind on fresh digests.", "New bind packet on current digests.",
          "PARTIAL (codex finding 5): bind half proven, import half has no worked example anywhere",
          {"level": "split", "note": "Bind half has a packet (HumGeo). Import half is unreceipted in every course; the first receipted import defines it."},
          [GH+"InceptTrilogy/ap-one/pull/846", GH+"InceptTrilogy/ap-one/pull/847", GH+"InceptTrilogy/ap-one/pull/851"]),
    stage("F", "Offline preview seal",
          "Gate 4 bound.",
          ["Phase 1 — map the complete course tree", "Phase 2 — price activities", "Phase 3 — generate hosted assets and QTI; validate the student surface"],
          "OFFLINE_PREVIEW_SEALED packet (Gate 5; separate Phase 1, Phase 2, and Phase 3 evidence).",
          [1, 4], "Earliest affected gate.", "Sealed offline artifacts and deterministic rerun receipts.",
          "COMPLETE",
          {"level": "in_progress", "note": "HumGeo has current evidence in Phase 1 and Phase 3; Phase 2 is unmeasured. No course has sealed this stage."},
          []),
    stage("G", "Sealed plan + dark publish",
          "OFFLINE_PREVIEW_SEALED; profile/source/tree/asset/QTI digests unchanged; conforming plan compiler exists.",
          ["One immutable publication manifest and plan digest", "Live all-absent checkpoint AS A FILE", "Execute receipt under the global writer lock", "Terminal zero-write replay AS A FILE"],
          "PUBLICATION_PLAN_SEALED (Gate 6) then DARK_PUBLISHED_REPLAYED (Gate 7) — closure requires the three files.",
          [3, 6, 7, 8], "Defect returns to its earliest affected phase.", "Corrected file-backed receipts.",
          "PARTIAL (codex finding 5): checkpoint and replay never confirmed as files",
          {"level": "partial", "note": "Lang chain and Lit #811 are worked examples; the all-absent checkpoint and zero-write replay were asserted in prose, not confirmed as files."},
          [GH+"InceptTrilogy/ap-one/pull/697", GH+"InceptTrilogy/ap-one/pull/714", GH+"InceptTrilogy/ap-one/pull/716", GH+"InceptTrilogy/ap-one/pull/718", GH+"InceptTrilogy/ap-one/pull/722", GH+"InceptTrilogy/ap-one/pull/811"]),
    stage("H1", "Canary enrollment",
          "DARK_PUBLISHED_REPLAYED; exact owner-approved slots; distinct identity/auth states proved.",
          ["Separate enrollment plan, authority, and operator", "Additive writes only", "Exact readback", "Terminal zero-write replay"],
          "CANARIES_ENROLLED_REPLAYED (Gate 8, runbook Phase 7). Never combined with activation.",
          [3, 5], "Repair identity, re-run enrollment.", "Per-account packets with collision census.",
          "PARTIAL (codex finding 5)",
          {"level": "unproven", "note": "No complete forward worked example; the closest artifact is an enrollment repair."},
          [GH+"InceptTrilogy/ap-one/pull/784"]),
    stage("H2", "Private activation",
          "CANARIES_ENROLLED_REPLAYED at 2/2; enrollment digest set unchanged.",
          ["Distinct activation authority", "Production flags (publishStatus: published lives here, not stage J)", "Exact course projection", "Terminal zero-write replay"],
          "PRIVATELY_ACTIVATED_REPLAYED (Gate 9, runbook Phase 8).",
          [3, 5], "Rollback via separate Phase 10 authority.", "Activation packet with exact projection readback.",
          "PARTIAL (codex finding 5)",
          {"level": "worked_example", "note": "Behind production flags; no gen-3 packet yet."},
          [GH+"InceptTrilogy/ap-one/pull/816"]),
    stage("I", "Learner acceptance",
          "PRIVATELY_ACTIVATED_REPLAYED; fresh untouched learners; served bytes equal the activated digest set.",
          ["Start AND middle AND end paths", "Retries, grading, XP, persistence", "Identity isolation across accounts", "Exact logs/progress readbacks"],
          "Full Gate 10 packet (LEARNER_ACCEPTED). A settlement sub-receipt or start-only run does not close it.",
          [5, 9, 11], "Each defect returns to its earliest affected phase with a bounded Phase 10 plan.", "Re-run acceptance on repaired build.",
          "COMPLETE",
          {"level": "open", "note": "Lang: one no-go then a settlement sub-receipt. Lit: start-only. Neither closes the stage."},
          [GH+"InceptTrilogy/ap-one/pull/801", GH+"InceptTrilogy/ap-one/pull/810"]),
    stage("J", "Release",
          "LEARNER_ACCEPTED; complete release checklist; zero open known issues; separate reviewed broader-enrollment all-absent plan; owner release decision.",
          ["Sealed broader-enrollment plan and digest", "Fresh all-absent checkpoint", "Execute/exact-read chain", "Terminal zero-write replay", "merge_authority recorded independently"],
          "RELEASED packet (Gate 11, runbook Phase 9.6 + release checklist).",
          [3], "Any Gate 10 gap reopens I.", "First completed release becomes the fleet worked example.",
          "COMPLETE",
          {"level": "unproven", "note": "Nobody, anywhere. Canon rows P9-13, RLS-28, HO-16 are NOT_YET_MEASURED."},
          []),
]

process = {
    "schema_version": 1,
    "generated_utc": STAMP,
    "authority_note": "Requirements only, never permissions. The governing runbook, the gates document, and the per-course canon ledgers outrank this file. Live receipts win every current-state conflict.",
    "sources": [
        "TimeBack course handbook DRAFT v0.3 (2026-08-26, Alpha workspace)",
        "Codex re-review, out/handbook-replay-review-20260826 (8 findings; folded into v0.3)",
        "FOUR-COURSE-TIMEBACK-GATES.md; GATE-CANON-MAP.md",
        "Process traces, recon/process-traces-2026-08-26 (167 cited rows)"
    ],
    "generations": [
        {"gen": 1, "name": "direct push", "courses": ["AP Biology", "AP Chemistry", "AP Computer Science A", "AP Cybersecurity", "AP Environmental Science", "AP Lang (first publish)"], "status": "history, never precedent (HOLD class 6)"},
        {"gen": 2, "name": "native runbook corridor", "courses": ["AP Lang (proved)", "AP Lit (hardened)"], "status": "worked examples and named operators"},
        {"gen": 3, "name": "12-gate canon with closure packets", "courses": ["HumGeo", "APWH", "APUSH", "Psych"], "status": "current; HumGeo first walking it end to end"}
    ],
    "row_mapping_precedence_rule": "A trace row maps to the stage whose closing receipt it produces or repairs. A control, status, or approval row inherits the stage it affects. A row spanning stages splits by artifact. Stage 0 is A's entry predicate, so every row lands inside A-J.",
    "hold_classes": HOLD_CLASSES,
    "out_of_corridor_rule": OUT_OF_CORRIDOR,
    "stages": STAGES,
    "courses": {
        "humgeo": {"label": "AP Human Geography", "current_stage": "F", "state": "IN_PROGRESS — Gate 5 packets, mid-recovery", "as_of": "2026-08-26", "detail": "Stages A-E closed with packets; F is the fleet's live edge. Live counts and holds: humgeo.html and the feed."},
        "apwh": {"label": "AP World History", "current_stage": "A-D (accepted-source preparation)", "state": "HOLD", "as_of": "2026-08-25", "detail": "Scope sub-receipt retained; accepted source held; Phase 0 not started."},
        "apush": {"label": "AP US History", "current_stage": "A-D (accepted-source preparation)", "state": "IN_PROGRESS", "as_of": "2026-08-25", "detail": "Blueprint, inventory, and QC evidence mapped; Phase 0 not started."},
        "psych": {"label": "AP Psychology", "current_stage": "A-D (accepted-source preparation)", "state": "IN_PROGRESS", "as_of": "2026-08-25", "detail": "221 paired article/QC sidecars on main; Phase 0 not started."}
    }
}

# ---------------- crosswalk ----------------
# tuple: (row, stages, basis c=replay_clean r=precedence_rule, cite, hold|None, track|None, note|None)
LANG = [
 (1,["A"],"c","build-repo commits 3cd576a9/efad2a38/e7c89b8d (2026-06-04)",None,None,None),
 (2,["A"],"c","build-repo commits 3caa0ae5/ba0baea2",None,None,None),
 (3,["B"],"c","build-repo commits 2d284150..03997f3d (2026-06-05)",None,None,None),
 (4,["B","C"],"r","build-repo commits a7af5728..8efa9590",None,None,"calibration harness=B; calibrated MCQs with answer-balance at generation=C"),
 (5,["B","C"],"r","build-repo commit 0bd00a38",None,None,"first call into the shared incept-test-builder engine"),
 (6,["B","C"],"r","build-repo commits f8dc552b..42715b3b (2026-06-08)",None,None,"whole-course blueprint=B; 9-unit article set=C"),
 (7,["C","D"],"r","build-repo commits a44c3199..849cb56e",None,None,"question packages=C; PP100 smoke receipt=D"),
 (8,["B","C"],"r","build-repo commits de3b6de4..b30eb6bd",None,None,"video pipeline machinery=B; video assets=C"),
 (9,["D"],"c","build-repo commits b0c41720..f89c70f5",None,None,None),
 (10,[],"r","build-repo commit 272f0457 (2026-06-17)",6,None,"gen-1 direct TimeBack publish; out-of-corridor, no stage credit"),
 (11,[],"r","build-repo commits 963b0ec6..cbeb8599",6,None,"repairs on the gen-1 uncorridored write; rides HOLD 6 with row 10"),
 (12,["C","D"],"r","build-repo commits 6ab7b583/5e73bf5f/e57086f7",None,None,"content fixes=C; feedback-wave review=D"),
 (13,["D"],"c","build-repo commits a729aa49/4d603e9d",None,None,None),
 (14,["B","C"],"r","build-repo commits 566dc01e/f0237384",None,None,"parser guard=B; repaired bank=C"),
 (15,["C"],"c","build-repo commits f3f5e6ce/41eac9a8",None,None,None),
 (16,["C"],"c","build-repo PR #3 (b3326266)",None,None,"closes build-repo history at 101 commits"),
 (17,["E"],"c","ap-one live tree listing (26 files); import commit UNKNOWN",None,None,"E1 unreceipted import — the folklore finding"),
 (18,["F"],"r","ap-one#531",None,None,"production QTI import for the discrimination cohort"),
 (19,["F"],"c","ap-one#383; STATUS.md:5854",None,None,None),
 (20,["F"],"c","ap-one#413; STATUS.md:5646",None,None,None),
 (21,["F"],"c","ap-one#459",None,None,None),
 (22,["F"],"c","ap-one#472",None,None,None),
 (23,["F"],"c","ap-one#502, #518",None,None,None),
 (24,["F"],"c","ap-one#544..#625 (APLANG series); STATUS.md:2048-3555",None,None,None),
 (25,["F"],"c","ap-one#692; STATUS.md:766",None,None,None),
 (26,["G"],"c","ap-one#697 (d957a6fa)",None,None,"dry-run publisher"),
 (27,["F"],"c","ap-one#711; STATUS.md:613",None,None,None),
 (28,["G"],"c","ap-one#714 (ea5e834b)",None,None,"sealed 2,070-operation plan"),
 (29,["G"],"c","ap-one#716 (bc1b5bfd)",None,None,"executor sealed, offline-proven"),
 (30,["G"],"c","ap-one#718 (fe7f58a3)",None,None,"live undo canary"),
 (31,["G"],"c","ap-one#722 (8b774467)",None,None,"full 108-lesson catalog live"),
 (32,["G"],"c","ap-one#723",None,None,"deploy unblock; control row inherits G"),
 (33,["G","H1"],"r","ap-one#784, #787 (a859b14c)",None,None,"catalog consolidation=G; enrollment repair=H1"),
 (34,["G"],"c","ap-one@d5891e65; #795, #797",None,None,"launch-routing repairs on the published catalog"),
 (35,["H1"],"c","ap-one#798",None,None,"signed-in canary launch proof L001/L055/L098"),
 (36,["I"],"c","ap-one#801",5,None,"Phase 9 attempt 1 no-go: learner-identity fault"),
 (37,["I"],"c","ap-one#810 (deb5c02d)",None,None,"settlement sub-receipt; does not close I"),
 (38,["H2"],"c","ap-one#816 (ac224540)",None,None,"activation behind production flags, shared with Lit"),
 (39,["I"],"c","STATUS.md:10635",None,None,"learner-feedback repair checkpoint"),
 (40,["J"],"r","STATUS.md:1-41",None,None,"status row: combined tree green, live cutover NOT started; inherits the stage it gates"),
]
LIT = [
 (1,["A"],"c","build-repo commit c5c92590","build",None,None),
 (2,["A","C"],"r","build-repo commits 0d64fea8/6a53292d","build",None,"contracts=A; complete local course=C"),
 (3,["B","D"],"r","build-repo commits d8e7d4fb/a2a847de","build",None,"fail-closed release lanes=B; release gating=D"),
 (4,["C","D"],"r","build-repo PR #1 (a983d466)","build",None,None),
 (5,["A","D"],"r","build-repo PRs #2-#5","build",None,"governance replays=A; reviewer records=D"),
 (6,["C"],"r","build-repo PR #6 (26a86f76)","build",None,"control row inherits the compile it binds"),
 (7,["B"],"c","build-repo PR #7","build",None,None),
 (8,["D"],"c","build-repo PR #8","build",None,None),
 (9,["B","C"],"r","build-repo commits ba5150b2/076f3534/7057bfd8","build",None,"versioned build inputs=B; assessment bank=C"),
 (10,["D"],"c","build-repo commits f698e2eb..e4f44c75 (2026-08-04)","build",None,None),
 (11,["C"],"c","build-repo commits e4bd784c/b1f30ed1","build",None,None),
 (12,["C"],"c","build-repo PR #9 (4aef7e91)","build",None,"v1 go-live successor compile seal"),
 (13,["D"],"c","build-repo commits 85abd41f/3517535e","build",None,"cross-model review lane WITHHELD sign-off on placeholder rubrics — a real catch"),
 (14,["D"],"c","build-repo commits 1d29f0fe/141964db/3b3a61d9","build",None,"73/73 after recalibration"),
 (15,["C"],"c","build-repo PR #10 (f77476e1)","build",None,None),
 (16,["D"],"c","build-repo commits 0c9288c9..70218c4f","build",None,None),
 (17,["D"],"c","build-repo commits a5aaa5e8..4483bda1","build",None,"integrity checker BLOCKED an unsafe variant; variant reverted"),
 (18,["C"],"c","build-repo commits 751730dd/8970acc4","build",None,None),
 (19,["D"],"c","build-repo commits 35eb5c0b..d51aaf81","build",None,None),
 (20,["D"],"c","build-repo commits fa30d484..8d1a2ed3","build",None,None),
 (21,["C"],"c","build-repo PR #11 (7c5e4e1e)","build",None,"sealed_successor_20260808_d101"),
 (22,["B","G"],"r","build-repo commits 56804034/4b6f3c75/0f5292ed","build",None,"corpus parity test=B; publish plan machinery=G"),
 (23,["G"],"r","build-repo PRs #12, #14","build",None,None),
 (24,["G"],"r","build-repo PRs #15, #13, #16","build",None,None),
 (25,["G"],"r","build-repo PR #17 (5b4bb85a)","build",None,"final build-repo merge"),
 (26,["E"],"c","ap-one#97; flat aplit_*.json tree listing","p3",None,"import candidate; file-level correspondence unconfirmed"),
 (27,["E","F"],"r","ap-one#187/#192/#220","p3",None,None),
 (28,["E","F"],"r","ap-one STATUS.md:4314 (issue #345)","p3",None,"fail-closed ingest guard"),
 (29,["C","F"],"r","ap-one#354/#355/#353","p3",None,"verse re-lineation=C; serve layer=F"),
 (30,["H2"],"r","ap-one#276","p3",None,"identity groundwork, default OFF; local prep routes by function"),
 (31,["E","F"],"r","ap-one#476","p3",None,None),
 (32,["G"],"r","ap-one#483 (do-not-merge)","p3",None,"credential pathway scaffold, held"),
 (33,["G"],"r","services/ingest/RUNBOOK-aplit-p3-ingest.md","p3",None,"runbook doc row; its phase 5 publish_trust waits on platform3#2727 credentials"),
 (34,["F","H2"],"r","ap-one#814","p3",None,"single TimeBack XP payer"),
 (35,["E"],"r","ap-one#671","p3",None,"two-repo lockstep consumer"),
 (36,["B","G"],"r","ap-one@5c93a2c4/@e9595903","native",None,"early release-gate module"),
 (37,["G"],"r","ap-one#197 (6aaff64d)","native",None,None),
 (38,["E"],"c","ap-one#811 (93cf91d2); STATUS.md:10474","native",None,"Phase 0 authority + score census PASSED"),
 (39,["F"],"c","ap-one STATUS.md:10506","native",None,"deterministic offline plan"),
 (40,["F"],"c","ap-one STATUS.md:10535","native",None,"live contract proof"),
 (41,["G"],"c","ap-one STATUS.md:10565","native",None,"catalog executed at sealed plan digest; private launch stayed off"),
 (42,["G","H2"],"r","ap-one#811; STATUS.md:10596","native",None,"dark settlement=G; separate flag machinery=H2"),
 (43,["I"],"r","ap-one commits 584a105b..3b265585","native",None,"reversible acceptance + same-day repair chain"),
 (44,["H2"],"c","ap-one#816","native",None,"shared activation commit with Lang"),
 (45,["I"],"c","ap-one STATUS.md:43-71; deploy 32376176469","native",None,"START settled only; middle and final have zero attempts"),
 (46,["I"],"r","ap-one#823 (5c9c206d)","native",None,"Phase 10 score-precision repair inherits the stage it repairs"),
 (47,["D"],"r","ap-one#822","native",None,"test portability; repo-hygiene control row"),
 (48,["C"],"r","ap-one#844","native",None,"item-level KC authority dataset"),
 (49,["E"],"r","ap-one#860","p3",None,"zero-write producer envelope; local prep routes by function, no HOLD"),
]
HUMGEO = [
 (1,["E"],"c","ap-one@e3eaaea92d (2026-07-26)",None,None,"July demo ingest: evidence-class history, not forward import precedent"),
 (2,["F"],"c","ap-one#219",None,None,None),
 (3,["F"],"c","ap-one#233",None,None,None),
 (4,["F"],"c","ap-one#234",None,None,None),
 (5,["C","F"],"r","ap-one#235",None,None,"stem de-dup=C; class guard on serving=F"),
 (6,["F"],"c","ap-one#237",None,None,None),
 (7,["F"],"r","ap-one#243",None,None,"live hotfix on the served demo"),
 (8,["C"],"c","ap-one@a0adc1f5d1",None,None,"101 FRQ expectation checklists"),
 (9,["B","F"],"r","ap-one#288",None,None,"blueprint rebuild spans build machinery and platform tree"),
 (10,["F"],"c","ap-one#312",None,None,None),
 (11,["D"],"r","ap-one@02dec59d6e",11,None,"escalation walked back to measured evidence; the worked receipt behind HOLD 11"),
 (12,["F"],"r","ap-one#796 (+2 hotfixes, 2026-08-19)",7,None,"committed demo snapshot leaked answer-option echoes; purged"),
 (13,["C","F"],"r","ap-one@0ae3b8f2d7",8,None,"invalid TimeBack XHTML now fails closed"),
 (14,["F"],"c","ap-one#576/#578/#579/#580",None,None,None),
 (15,["G"],"r","ap-one@c4022785bf",None,None,"checkpointed TimeBack executor machinery"),
 (16,["F"],"c","ap-one@63a22fb1c8",None,None,"EOC FRQ sets staged dormant"),
 (17,["C"],"r","ap-one@bb17b21b85",None,None,"trust-authority binding; control row inherits source trust"),
 (18,["C"],"c","ap-one@c41254529e",None,None,"replacement test-spec authority"),
 (19,["B"],"c","humgeo-rebuild#2",None,None,None),
 (20,["C"],"c","humgeo-rebuild#5",None,None,None),
 (21,["C"],"c","humgeo-rebuild#6",None,None,None),
 (22,["B","C"],"r","humgeo-rebuild#9",None,None,"genfill machinery=B; minted slots=C"),
 (23,["D"],"c","humgeo-rebuild#12",None,None,None),
 (24,["B"],"c","humgeo-rebuild#13",None,None,None),
 (25,["C","D"],"r","humgeo-rebuild#14",None,None,"204/204 served-composition gate"),
 (26,["D"],"c","humgeo-rebuild#19",None,None,None),
 (27,["B"],"c","humgeo-rebuild#24",None,None,None),
 (28,["B"],"c","humgeo-rebuild#25",None,None,None),
 (29,["B"],"c","humgeo-rebuild#26",None,None,None),
 (30,["B","D"],"r","humgeo-rebuild#30",None,None,"repair machinery made stem-aware and fail-closed"),
 (31,["B"],"c","humgeo-rebuild#32/#33",None,None,None),
 (32,["B"],"c","humgeo-rebuild#34",None,None,None),
 (33,["D"],"c","humgeo-rebuild#35-#37",None,None,None),
 (34,["B","D"],"r","humgeo-rebuild#38-#41",None,None,None),
 (35,["B","D"],"r","humgeo-rebuild#42",None,None,"authority-gated plan"),
 (36,["A","D"],"r","humgeo-rebuild#43",None,None,"issue-44 arc; re-earned 429 fingerprint-bound passes"),
 (37,["A","D"],"r","humgeo-rebuild#45",None,None,"issue-44 arc; residual cohort plan"),
 (38,["A","B"],"r","humgeo-rebuild#46",None,None,"issue-44 arc; runner safeguards"),
 (39,["A"],"r","humgeo-rebuild#47",None,None,"pilot re-armed (detour start)"),
 (40,["A"],"r","humgeo-rebuild#48",9,None,"pilot failed: suspend, never blind-retry"),
 (41,["A"],"r","humgeo-rebuild#49",None,None,None),
 (42,["A"],"r","humgeo-rebuild#51/#52",None,None,None),
 (43,["A"],"r","humgeo-rebuild#53",None,None,None),
 (44,["A"],"r","humgeo-rebuild#54",None,None,None),
 (45,["A"],"r","humgeo-rebuild#55",None,None,"passing pilot candidate applied — detour recovered"),
 (46,["A"],"r","humgeo-rebuild#56",None,None,None),
 (47,["A","B"],"r","humgeo-rebuild#58",None,None,"CED universe fix; caused next-row regression"),
 (48,["A"],"c","humgeo-rebuild#59",10,None,"same-day regression repair of a landed change"),
 (49,["A"],"c","humgeo-rebuild#61",None,None,None),
 (50,["A"],"c","humgeo-rebuild#62",None,None,"Gate 1 CLOSED — SCOPE_LOCKED"),
 (51,["B"],"c","HUMGEO-COMPLETION-GATES.md:142-191",None,None,"8,377-row inventory, zero unknown"),
 (52,["B"],"c","folded into humgeo-rebuild#63",None,None,"Gate 2 CLOSED — INVENTORY_LOCKED"),
 (53,["B","C"],"r","humgeo-rebuild#63",None,None,"lands Gate 2 inventory and Gate 3 content closure together"),
 (54,["E"],"c","HUMGEO-COMPLETION-GATES.md:341-352",None,None,"Gate 4 opened"),
 (55,["B","C"],"r","gate5-hold receipt (2026-08-23)",1,None,"late answer-shape verifier: 203 records; reopened B for exactly those"),
 (56,["B"],"c","humgeo-rebuild#64",None,None,"203-record shortage sealed"),
 (57,["C"],"c","humgeo-rebuild#65",None,None,"195 accepted candidates cover all 203 placements"),
 (58,["B"],"c","gate2-rehearsal reopen receipt (2026-08-24)",1,None,"rehearsal bank omitted from the audit: 70 more records"),
 (59,["B"],"c","humgeo-rebuild#66",None,None,None),
 (60,["C"],"c","humgeo-rebuild#67",None,None,"Gate 3 CLOSED — SOURCE_ACCEPTED, zero residue"),
 (61,["E"],"c","gate4-closure-hold receipt; ap-one@a839651a2d",None,None,"dry-run bind; push waited on approval"),
 (62,["E"],"c","gate4-closure-hold verdict (2026-08-23)",3,None,"approval gap, not a content bug; resumed on the named go"),
 (63,["E"],"c","ap-one#846",None,None,None),
 (64,["E"],"c","ap-one#847",None,None,"Gate 4 CLOSED (first time)"),
 (65,["E"],"c","FOUR-COURSE-TIMEBACK-GATES.md:117-129",2,None,"rehearsal repair moved the bytes under the closure; rebind required"),
 (66,["E"],"c","ap-one#851; gate4-closure receipt",None,None,"Gate 4 CLOSED (current): 5,870/5,870 oracle"),
 (67,["E"],"r","dashboard commit 5bbd5fcc; Pages run 32802008792",None,None,"status row: dashboard folded the closure; inherits the stage it reports"),
 (68,["F"],"r","gate5-hold receipt",None,None,"Gate 5 first opening; its verifier triggered the row-55 reopen"),
 (69,["F"],"c","humgeo-timeback-live PLAN.md / WORKFLOW-SOP.md",None,None,"Gate 5 reopened as Packets 1-4"),
 (70,["F"],"r","packet1 authority-bundle receipt",None,None,None),
 (71,["D","F"],"r","packet2 hold receipt; execution-state article_checks",4,None,"article-check regeneration held on a missing factory recovery contract"),
 (72,["D","F"],"r","100-certify classification receipt (2026-08-26)",4,None,"classified MISSING recovery contract, not a factory defect; filed through the gates"),
 (73,["F"],"c","packet3 zero-write receipts",None,None,"dependency-independent zero-write prep while Packet 2 held"),
 (74,["F"],"r","ITERATION-NOTES.md v1-v6",None,None,"workflow design iterations; control rows inherit the stage the workflow serves"),
 (75,["F"],"r","certain-panel RUNLOG.md",None,None,"external 4-lane review of the workflow report"),
 (76,["J"],"r","ap-one issue #659 (open)",None,None,"open release_ready prerequisite; inherits the stage it gates"),
 (77,["D"],"r","ap-one PR #652 (open, unmerged)",None,None,"stale path-disjoint verifier PR; repo-hygiene row"),
 (78,["G","H1","H2","I","J"],"r","FOUR-COURSE-TIMEBACK-GATES.md control rule",None,None,"status row: Gates 6-11 locked, no step taken"),
]

def rows(course, data):
    out = []
    for t in data:
        row, stages_, basis, cite, hold, track, note = (t + (None,)*(7-len(t)))
        entry = {"course": course, "row": row, "stage": stages_,
                 "basis": "replay_clean" if basis == "c" else "precedence_rule",
                 "cite": cite}
        if course == "ap-lit":
            entry["track"] = cite and t[4] or None
        out.append(entry)
    return out

# lit tuples carry track in position 4 (after cite); rebuild cleanly:
def build(course, data, track_pos=None):
    out = []
    for t in data:
        if course == "ap-lit":
            row, stages_, basis, cite, track, _unused, note = t
            hold = None
            # lit holds are encoded in note text only; none typed in trace
        else:
            row, stages_, basis, cite, hold, _unused, note = t
            track = None
        entry = {"course": course, "row": row, "stage": stages_,
                 "basis": "replay_clean" if basis == "c" else "precedence_rule",
                 "cite": cite}
        if track: entry["track"] = track
        if hold: entry["hold_class"] = hold
        if note: entry["note"] = note
        out.append(entry)
    return out

crosswalk = {
    "schema_version": 1,
    "generated_utc": STAMP,
    "what_this_is": "Every row of the three 2026-08-26 process traces mapped to the handbook's A-J stages under the v0.3 row-mapping precedence rule. 91 rows mapped cleanly in the replay review; the 76 contested rows (8 none, 37 multiple, 31 strain — codex finding 3) are marked basis=precedence_rule: this build applied the rule to them, and those assignments are one seat's application of the rule, not replay-confirmed.",
    "precedence_rule": process["row_mapping_precedence_rule"],
    "stage_ids": [s["id"] for s in STAGES],
    "hold_classes": {str(h["id"]): h["name"] for h in HOLD_CLASSES},
    "counts": {"total": 167, "ap-lang": 40, "ap-lit": 49, "humgeo": 78,
               "replay_clean": None, "precedence_rule": None},
    "rows": build("ap-lang", LANG) + build("ap-lit", LIT) + build("humgeo", HUMGEO),
}
n_clean = sum(1 for r in crosswalk["rows"] if r["basis"] == "replay_clean")
crosswalk["counts"]["replay_clean"] = n_clean
crosswalk["counts"]["precedence_rule"] = len(crosswalk["rows"]) - n_clean
assert len(crosswalk["rows"]) == 167, len(crosswalk["rows"])

training = {
    "schema_version": 1,
    "generated_utc": STAMP,
    "what_this_is": "Register of training and eval corpora for the course-build model program: the catalog, never the data. Corpora hold course content and answer text, so the files stay in the private Alpha workspace and evidence homes; this register carries counts, digests, and status so 'what can we train on today' is a lookup.",
    "boundary": "No corpus file is ever published to this site. A SHA-256 here lets a holder of the private bytes verify identity.",
    "assets": [
        {"id": "repair_pairs.v0", "purpose": "Repair model: failing item + structural repair + accepted retry, full content inline.",
         "rows": 431, "sha256": "6f60e664f94aee78d7ecbba20ebe09a05714077e282495999c37daea0efd963a",
         "snapshot": "2026-08-26", "status": "GO at pilot scale",
         "home": "Alpha workspace, training-data census 2026-08-26"},
        {"id": "prescreen_labels.v0", "purpose": "Verdict prediction: predict the factory verdict before spend.",
         "rows": 444, "sha256": "257a95ca64010f493000fd59ff7e28ebc146446c4984ebe14aeced9f5e885121",
         "snapshot": "2026-08-26", "status": "NOT trainable yet: 437 pass vs 7 fail — failures get repaired out of the bank",
         "home": "Alpha workspace, training-data census 2026-08-26"},
        {"id": "decision_events.v0", "purpose": "Process corpus / agent-run eval log: content-free typed controller events (state, action, outcome, digests), each row source-traceable to its ledger line.",
         "rows": 161, "sha256": "efa01c2024cd99146b731340ab999f8b592546181665d2d294bfdc77d812ac22",
         "snapshot": "2026-08-27", "status": "GROWING: v0 covers the HumGeo Gate 5 controller ledgers; grows as courses walk F through J",
         "home": "Alpha workspace, decision-log v0 2026-08-27 (exporter: tools/decision_log_export.py)"},
        {"id": "historical_fails.v0", "purpose": "Fix the verdict-prediction class imbalance by mining the fail class from history.",
         "rows": None, "sha256": None, "snapshot": None,
         "status": "PLANNED, not started. A 2026-08-12 sweep receipt alone recorded 2,513 judged / 1,274 pass / 1,239 fail (snapshot, not yet reconciled to item identity).",
         "home": "To be mined from workspace receipts and git history"},
        {"id": "cross_course_verdicts.v0", "purpose": "Verdict evidence for APWH, APUSH, Psychology (all yielded zero item-level factory verdicts in the 2026-08-26 census pass).",
         "rows": None, "sha256": None, "snapshot": None,
         "status": "PLANNED, not started. Named leads: ilmych/incept-agent-intake and ap-psychology-build phase 7-8 receipts.",
         "home": "https://github.com/ilmych/incept-agent-intake (private, linkable per owner 2026-08-27)"},
    ],
    "observability": {"langfuse": "https://us.cloud.langfuse.com (project incept-durey; org invite required)",
                       "evidence_repo": "https://github.com/joshuadurey-del/ap-ss-evidence (private)"},
    "verdicts_2026_08_26": {
        "process_model": "Do not train: 167 process rows across three courses is a step table for a deterministic controller, not a corpus. Encode the process; grow decision_events for evals.",
        "repair_model": "Train at pilot scale now (431 pairs).",
        "verdict_prediction": "Wait for historical-fail mining; current labels are 437 pass / 7 fail."
    }
}

(DASH/"process.json").write_text(json.dumps(process, indent=1) + "\n")
(DASH/"crosswalk.json").write_text(json.dumps(crosswalk, indent=1) + "\n")
(DASH/"training.json").write_text(json.dumps(training, indent=1) + "\n")
for name in ("process.json", "crosswalk.json", "training.json"):
    p = DASH/name
    json.load(open(p))
    print(name, p.stat().st_size, "bytes, valid")
print("crosswalk basis counts:", crosswalk["counts"])
