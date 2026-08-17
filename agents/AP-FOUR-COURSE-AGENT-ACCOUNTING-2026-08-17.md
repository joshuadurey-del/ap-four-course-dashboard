# AP Four-Course Agent Accounting — 2026-08-17

Companion to **AP Four-Course Standings — 2026-08-17**. That doc is for the human reader; this one is for the reader's agent. Every sentence in the standings doc maps to a claim here, and every claim carries its status label, its evidence, a verification path, and its measured scope. Snapshot time: **2026-08-17T13:25+09:00 (KST)** (machine clock). Live counters move after this time; see the Staleness section.

## Status vocabulary

| Label | Meaning |
| --- | --- |
| `OBSERVED` | A named check ran and its result is recorded here with a timestamp. |
| `DERIVED` | Computed from OBSERVED data (arithmetic or classification, no new measurement). |
| `PLANNED` | Queued work. A dry-run receipt may exist; execution has NOT happened. |
| `BLOCKED` | Waiting on a named other party; the blocker is the evidence. |
| `MISSING` | No evidence exists; the absence itself is the finding. |

## Access matrix

| Surface | Who can read | Note |
| --- | --- | --- |
| InceptTrilogy org repos (ap-one, ap-psychology-fall-2025-v1) | Ilma, Josh, org members | Issue links below |
| ilmych repos (apwh-build-outputs, apush-build-outputs, apush-course-build, humgeo-rebuild, incept-agent-intake) | Ilma owns them | Commit links below |
| joshuadurey-del/ap-ss-evidence | Ilma is a verified collaborator (checked 2026-08-17 via the GitHub collaborators API); her BOTS' tokens cannot read it | Branch links below |
| Langfuse project incept-durey ([us.cloud.langfuse.com](https://us.cloud.langfuse.com)) | Org invite sent to Ilma 2026-08-17 | Guide at the bottom |
| Drive evidence folder ([local-evidence-2026-08-17](https://drive.google.com/drive/folders/1gfqL4L9-hE0N32FIDu-E_qn8IQiQjXj7)) | Follows the INCEPT folder sharing | Sanitized copies of runner state, logs, intents, and lane-log excerpts |

Every claim also carries an `evidence_access` value. It exists so `OBSERVED` never hides "Josh saw it but you cannot". The labels:

| `evidence_access` | Meaning |
| --- | --- |
| `SHARED` | Live URL or org/ilmych repo. Check it directly. |
| `ILMA_HUMAN_ONLY` | ap-ss-evidence. Ilma in a browser: yes. Her bots: no. |
| `SHARED_AFTER_INVITE` | Langfuse, after the invite is accepted. |
| `SHARED_VIA_DRIVE` | In the Drive visuals folder beside the report; follows the folder's sharing. |
| `SHARED_VIA_DRIVE` | Sanitized copy in the Drive evidence folder; follows folder sharing. |
| `NONE_YET` | PLANNED work. No receipt can exist yet. |

## Claims manifest (machine-readable)

```json
{
  "snapshot": "2026-08-17T13:25:00+09:00",
  "claims": [
    {"claim_id": "humgeo.rebuild.passes", "section": "HumGeo", "status": "OBSERVED", "observed_at": "2026-08-17T13:20+09:00", "value": "432/474 slots hold current-byte official /v1/qc passes", "scope": "regeneration campaign slots only", "excluded": ["6 metadata rows", "759-line structural cohort"], "evidence": [{"type": "state-snapshot", "url": "https://drive.google.com/file/d/1gJayI66bbayK0GrfsCOocZhBBgmbnWzD/view", "note": "sanitized snapshot, 2026-08-17 15:00 KST"}, {"type": "git-branch", "url": "https://github.com/joshuadurey-del/ap-ss-evidence/tree/evidence/humgeo/20260816-004715__claude__humgeo--adoption-verifications/claude", "commit": "b6f5f1e8f585633f16f6733f8b9b315a9426d3ac"}], "evidence_access": "ILMA_HUMAN_ONLY+SHARED_VIA_DRIVE"},
    {"claim_id": "humgeo.residual.draining", "section": "HumGeo", "status": "OBSERVED", "observed_at": "2026-08-17T13:20+09:00", "value": "residual runner alive (13h45m up). 100/142 slots complete, zero corpus writes. Log quiet since 12:45 KST — retry backoff or a slot spin; the watchdog is armed on exit either way. 36 blocked-slot events so far, mostly untyped 502s, all covered by the amended relaunch", "scope": "runner log tail + process table", "excluded": [], "evidence": [{"type": "runner-log", "url": "https://drive.google.com/file/d/13LV3wLzRCz0m5YvkFQoIgpH16OwbkJoX/view", "note": "sanitized copy, 2026-08-17"}], "evidence_access": "SHARED_VIA_DRIVE"},
    {"claim_id": "humgeo.amendment.sealed", "section": "HumGeo", "status": "OBSERVED", "observed_at": "2026-08-17 (sha recomputed from bytes)", "value": "30-slot amendment sealed; plan sha256 91310a145f03358b03dadb7a7b9d48235b8bf628f15e3d9ef09508fe6896edbc (recomputed from bytes today); sandbox proof 425 prior passes intact / 49 slots selected", "scope": "plan + sandbox proof", "excluded": ["execution"], "evidence": [{"type": "git-branch", "url": "https://github.com/joshuadurey-del/ap-ss-evidence/tree/evidence/humgeo/20260817-000500__claude__humgeo--amend30-docs/claude", "commit": "d1f7902ddefa510b5e2dc970f96ecbf001b167c6"}, {"type": "langfuse-trace", "id": "c0b6a4f2b09a5b1494a87f474dcffd8e"}], "evidence_access": "ILMA_HUMAN_ONLY+SHARED_AFTER_INVITE"},
    {"claim_id": "humgeo.amendment.execution", "section": "HumGeo", "status": "PLANNED", "value": "amended pass fires at residual drain (state re-bind + relaunch)", "evidence": [], "evidence_access": "NONE_YET"},
    {"claim_id": "humgeo.metadata6.qc", "section": "HumGeo", "status": "PLANNED", "value": "6 metadata rows through official /v1/qc; pre-POST intents written", "evidence": [{"type": "qc-intents", "url": "https://drive.google.com/file/d/10b_AYqrqVbVgBh9NXodx2QoWGVTUm9lP/view", "note": "sanitized copy"}], "evidence_access": "SHARED_VIA_DRIVE"},
    {"claim_id": "humgeo.seal.manifest", "section": "HumGeo", "status": "PLANNED", "value": "sealed manifest of 482 records (480 active + 2 superseded), fingerprint per record", "evidence": [], "evidence_access": "NONE_YET"},
    {"claim_id": "humgeo.repair759.staged", "section": "HumGeo", "status": "OBSERVED", "observed_at": "2026-08-16T13:17+09:00", "value": "741 of 759 structural-repair candidates staged with receipts", "scope": "staging only; no official verdicts yet", "excluded": ["18 non-staged (multi-check or nonconverged, dispositioned to regenerate)"], "evidence": [{"type": "git-branch", "url": "https://github.com/joshuadurey-del/ap-ss-evidence/tree/evidence/humgeo/20260816-052500__claude__humgeo--repair-docs/claude", "commit": "b26d5a2ff43de8820e729c28c23e236abad3c370"}, {"type": "langfuse-trace", "id": "3403d1909af058139c970c8e304658b5", "dataset": "humgeo-structural-repair-20260816", "run": "final-1317kst"}], "evidence_access": "ILMA_HUMAN_ONLY+SHARED_AFTER_INVITE"},
    {"claim_id": "humgeo.repair759.rescreen", "section": "HumGeo", "status": "PLANNED", "value": "741 staged candidates through official /v1/qc after the APWH pool turn", "evidence": [], "evidence_access": "NONE_YET"},
    {"claim_id": "humgeo.gates.659", "section": "HumGeo", "status": "BLOCKED", "blocker": "fleet", "value": "all 68 HumGeo TimeBack components + 204 links MATERIALIZED with exact stored-version readback (fleet comment 2026-08-16T15:04Z); writer corridor RELEASED 2026-08-16 (sealed digest 79629e16a1b66fba08b4c07f42df7260a62e3afb0d3fd676457f9727126707a4). RE-CLAIMED 2026-08-17 for another course's full-catalog write (2,070 operations, plan digest c28b79c9327730a9d8e44cabf119d3626faa99bcfbed6f780a317f1477992b47). No other TimeBack writer until its completion comment. HumGeo's remaining work queues behind it. REMAINING: AP One gate-serving cutover, map reconciliation, deploy/readback, release_ready flip, released-tier traversal", "evidence": [{"type": "github-issue", "url": "https://github.com/InceptTrilogy/ap-one/issues/659"}], "evidence_access": "SHARED"},
    {"claim_id": "humgeo.contamination.642", "section": "HumGeo", "status": "BLOCKED", "blocker": "fleet", "value": "57 successor items carry duplicate choice text; 1,750 active children target them; containment landed 2026-08-14 (commit d589d94cc3b168fbd6bff457578795a7fbd8c407); corrective wave pending", "evidence": [{"type": "github-issue", "url": "https://github.com/InceptTrilogy/ap-one/issues/642"}], "evidence_access": "SHARED"},
    {"claim_id": "humgeo.platform.visibility", "section": "HumGeo", "status": "OBSERVED", "observed_at": "2026-08-17T13:21+09:00", "value": "THREE-SURFACE state: HAS a /demo card (static DEMO_CATALOG) and its tree serves HTTP 200 — Ilma can open and walk it on /demo today; ABSENT from the readiness-filtered chooser /api/courses (release_ready false, #659); registry entry present in feedback_courses.json", "scope": "deployed surface anchored to commit e4b03bc441e8a6870de86ca2368043016f03213e", "excluded": [], "evidence": [{"type": "github-file", "url": "https://github.com/InceptTrilogy/ap-one/blob/e4b03bc441e8a6870de86ca2368043016f03213e/apps/web/src/demo/demoCatalog.ts"}, {"type": "live-api", "url": "https://apone.inceptstore.com/api/courses"}, {"type": "live-api", "url": "https://apone.inceptstore.com/api/courses/ap-human-geography-fall-2026-v1/tree", "result": "HTTP 200"}], "evidence_access": "SHARED"},
    {"claim_id": "apwh.repairs.applied", "section": "APWH", "status": "OBSERVED", "observed_at": "2026-08-17T12:14+09:00", "value": "449/571 rationale repairs applied to the canonical bank, push-gate verified", "evidence": [{"type": "git-commit", "url": "https://github.com/ilmych/apwh-build-outputs/commit/5d6fe7e3a7f6d6aeb3b90e1e625763412f8622b2"}], "evidence_access": "SHARED"},
    {"claim_id": "apwh.skillcodes", "section": "APWH", "status": "OBSERVED", "observed_at": "2026-08-17T15:10+09:00", "value": "774/933 skill codes resolved (recomputed at staging). Redraw round 2 continuing. Repair wave consuming codes as they land", "evidence": [{"type": "cursor-snapshot", "url": "https://drive.google.com/file/d/1irC-LdBf4Oe6iZY2xyaCfbMz2GiU_XY2/view", "note": "recomputed live at staging"}], "evidence_access": "SHARED_VIA_DRIVE"},
    {"claim_id": "apwh.regen_tail", "section": "APWH", "status": "PLANNED", "value": "362-item regeneration tail (260 multi-check + 66 content-class + 36 S10); dry-run receipt 362/362 OBSERVED; execution parked on HumGeo pool release", "evidence": [{"type": "dry-run-receipt", "url": "https://drive.google.com/file/d/1zYWZyNCv_KK2HuTJJbcui3S34kqmCyXA/view", "note": "sanitized, 362/362"}], "evidence_access": "SHARED_VIA_DRIVE"},
    {"claim_id": "apwh.sweep", "section": "APWH", "status": "PLANNED", "value": "paid /v1/qc sweep, 0/933 verdicts spent (deliberate: repair first, judge once)", "evidence": [], "evidence_access": "NONE_YET"},
    {"claim_id": "apwh.local_done.walk", "section": "APWH", "status": "OBSERVED", "observed_at": "2026-08-12", "value": "full course proven by render walk, bytes-exact receipts; NO resident server (corrected 2026-08-17)", "scope": "render walk of all lesson pages", "excluded": ["persistent serving"], "evidence": [{"type": "git-commit", "url": "https://github.com/joshuadurey-del/ap-ss-evidence/commit/483efc1", "note": "walk receipts"}, {"type": "local-branch", "id": "apwh/study-skills-demo-serve @ aff550eabaaf4c5c71325f7cf0dd2b3b338684a2", "note": "local-only, retired: superseded by upstream ap-one main landed placement machinery (source pin ilmych/apwh-blueprint-build @ 2129eb94497c81f5521005baddbf23f7468d57f9, per ap-one STATUS.md); walk receipts remain the durable 08-12 proof"}], "evidence_access": "ILMA_HUMAN_ONLY+JOSH_MACHINE_ONLY"},
    {"claim_id": "apwh.demo.listed", "section": "APWH", "status": "OBSERVED", "observed_at": "2026-08-17T13:21+09:00", "value": "REGISTERED AND SERVING: present in the readiness-filtered chooser /api/courses and its tree serves HTTP 200; NOT on the static /demo card list (separate DEMO_CATALOG file)", "evidence": [{"type": "live-api", "url": "https://apone.inceptstore.com/api/courses"}, {"type": "live-api", "url": "https://apone.inceptstore.com/api/courses/ap-world-history-fall-2026-v1/tree", "result": "HTTP 200"}, {"type": "github-file", "url": "https://github.com/InceptTrilogy/ap-one/blob/e4b03bc441e8a6870de86ca2368043016f03213e/apps/web/src/demo/demoCatalog.ts"}], "evidence_access": "SHARED"},
    {"claim_id": "apwh.placement.591", "section": "APWH", "status": "BLOCKED", "blocker": "fleet", "value": "SCOPE CORRECTED 2026-08-17: #591 governs FOUR study-skill lessons (A-203/A-210 length leg), not overall registration — the course is registered and serving without them. The publisher-credential-absent-day-4 claim is a separate ap-status read (seat-reported) gating canonical placement; its issue thread sits on a repo outside the org. NEW 2026-08-17: after the credential lands, APWH platform writes still queue behind the TimeBack corridor phase (see humgeo.gates.659)", "evidence": [{"type": "github-issue", "url": "https://github.com/InceptTrilogy/ap-one/issues/591"}], "evidence_access": "SHARED"},
    {"claim_id": "apush.ledger", "section": "APUSH", "status": "OBSERVED", "observed_at": "2026-08-17T10:00+09:00 (seat-reported morning read)", "value": "49/249 article positions admitted; ap-status 36%", "evidence": [{"type": "github-file", "url": "https://github.com/ilmych/apush-course-build/blob/main/STATUS.md"}], "evidence_access": "SHARED"},
    {"claim_id": "apush.batch34", "section": "APUSH", "status": "OBSERVED", "observed_at": "2026-08-17", "value": "74 authored+gated wave-2 CONTRACTS (not articles — the factory writes articles at Stage 4); all 8 chunk manifests re-validated today", "scope": "contracts only", "excluded": ["article bytes, which do not exist yet"], "evidence": [{"type": "git-commit", "url": "https://github.com/ilmych/apush-build-outputs/commit/7846cd754bb2ab733afaa996155a45a52fc17a4a", "branch": "receipts/20260812-chunk1-fixround", "branch_head": "23b75c25bf8e27ab8769013eeb026cd83467293e"}], "evidence_access": "SHARED"},
    {"claim_id": "apush.posting", "section": "APUSH", "status": "PLANNED", "value": "74 contracts post on APUSH's factory-pool turn (third in the serial order)", "evidence": [], "evidence_access": "NONE_YET"},
    {"claim_id": "apush.intake90", "section": "APUSH", "status": "BLOCKED", "blocker": "factory owners", "value": "126 positions wait on factory visual-class capability; no reply yet (<48h)", "evidence": [{"type": "github-issue", "url": "https://github.com/ilmych/incept-agent-intake/issues/90"}], "evidence_access": "SHARED"},
    {"claim_id": "apush.intake89", "section": "APUSH", "status": "BLOCKED", "blocker": "factory owners", "value": "2 positions (170, 244) on defective source packets", "evidence": [{"type": "github-issue", "url": "https://github.com/ilmych/incept-agent-intake/issues/89"}], "evidence_access": "SHARED"},
    {"claim_id": "apush.sample_article", "section": "APUSH", "status": "OBSERVED", "observed_at": "2026-08-17", "value": "strongest ADMITTED article (position 232, KC-9.1.I, strict-QC PASS + manual image review PASS) published as a Google Doc beside the report; one presentation-only change noted in its provenance comment (S3 image URL swapped for local PNG)", "evidence": [{"type": "drive-doc", "url": "https://docs.google.com/document/d/1d0mvskgAcpLmyrUNNw_2385pXcDdr_1fIzXgSnHUZDo/edit"}], "evidence_access": "SHARED_VIA_DRIVE"},
    {"claim_id": "apush.platform.absent", "section": "APUSH", "status": "OBSERVED", "observed_at": "2026-08-17T13:21+09:00", "value": "nothing platform-side: no registry entry, no /demo card, absent from the chooser, tree HTTP 404 — build-only from the platform's perspective", "evidence": [{"type": "live-api", "url": "https://apone.inceptstore.com/api/courses/ap-us-history-fall-2026-v1/tree", "result": "HTTP 404"}], "evidence_access": "SHARED"},
    {"claim_id": "psych.articles", "section": "Psych", "status": "OBSERVED", "observed_at": "2026-08-17", "value": "221/221 articles complete, every EK covered (U5's 54 landed 2026-08-16)", "evidence": [{"type": "git-branch", "url": "https://github.com/joshuadurey-del/ap-ss-evidence/tree/evidence/psych/20260817-local-host/claude", "commit": "564d086", "note": "re-walked after the fleet repair train: 221/221 green at rebuilt bundle"}], "evidence_access": "ILMA_HUMAN_ONLY"},
    {"claim_id": "psych.topic33.empty", "section": "Psych", "status": "OBSERVED", "observed_at": "2026-08-17", "value": "topic 3.3 (Gender and Sexual Orientation) carries 0 lessons BY DESIGN: no EK record maps to 3.3 (coverage invariant, course repo DOWNSTREAM_NOTES section 1); an approved topic-3.3 lesson asset exists on the shelf; a 2026-08-09 ruling parked adding it as a separate curriculum-authoring decision; verified today: exactly one empty topic in the served tree", "scope": "served course tree", "excluded": [], "evidence": [{"type": "repo-doc", "url": "https://github.com/InceptTrilogy/ap-psychology-fall-2025-v1/blob/cfa166afe6345c28d331bb809a3ac26b3655bf6f/DOWNSTREAM_NOTES.md#L117-L118", "note": "sha-pinned coverage invariant"}], "evidence_access": "SHARED"},
    {"claim_id": "psych.local_serving", "section": "Psych", "status": "OBSERVED", "observed_at": "2026-08-17", "value": "boot-on-demand serving proven: the real BFF app booted in-process over the assembled bundle (262 components); 221/221 article student-views served; tree exact; zero key leaks; 246 receipts; reproducible on one documented command (WALK-SUMMARY.md in the evidence branch)", "scope": "article-serving paths only", "excluded": ["gate paths", "practice paths — bank-gated, unmeasured"], "evidence": [{"type": "git-branch", "url": "https://github.com/joshuadurey-del/ap-ss-evidence/tree/evidence/psych/20260817-local-host/claude", "commit": "564d086", "note": "re-walked after the fleet repair train: 221/221 green at rebuilt bundle"}], "evidence_access": "ILMA_HUMAN_ONLY"},
    {"claim_id": "psych.bank.shortfall", "section": "Psych", "status": "OBSERVED", "observed_at": "2026-08-17T09:00+09:00 (admin dry_run)", "value": "1,810 items short across 374 buckets (221 evidence-based-FRQ + 147 article-analysis + 6 MCQ)", "evidence": [{"type": "admin-dry-run", "url": "https://drive.google.com/file/d/1V6K5DdaPCfSH4vSeMhYqiWuS2r4dSVWa/view", "note": "headline + all 374 bucket rows, counts only"}], "evidence_access": "SHARED_VIA_DRIVE"},
    {"claim_id": "psych.fill", "section": "Psych", "status": "PLANNED", "value": "bank fill on Psych's pool turn (last in the serial order)", "evidence": [], "evidence_access": "NONE_YET"},
    {"claim_id": "psych.ebq.zero_yield", "section": "Psych", "status": "OBSERVED", "observed_at": "2026-08-11", "value": "evidence-based-FRQ generation produced 0 usable items in 10 passes; fresh measurement is PLANNED on the first two fill cycles; 221 of the 374 short buckets need this generator", "evidence": [{"type": "verify-summaries", "url": "https://drive.google.com/file/d/1ZzE3hohbc_mPQIx9-18vprBCkq8NYG6z/view", "note": "chunk summaries + standing low-yield flag"}], "evidence_access": "SHARED_VIA_DRIVE"},
    {"claim_id": "psych.u5gate", "section": "Psych", "status": "BLOCKED", "blocker": "fleet (repair assigned)", "value": "U5 acceptance gate: 26 findings, repair actively landing (fleet repair train merged mid-day, course repo PRs #3-#11; fresh gate run at HEAD cfa166af — per-article FK and both CED distribution classes fixed; remaining: skill-assignment + unit-median FK)", "evidence": [{"type": "github-issue", "url": "https://github.com/InceptTrilogy/ap-psychology-fall-2025-v1/issues/2"}], "evidence_access": "SHARED", "observed_at": "2026-08-17T15:20+09:00"},
    {"claim_id": "psych.registration", "section": "Psych", "status": "PLANNED", "value": "CORRECTED 2026-08-17T13:21+09:00: platform visibility needs a COMPLETE registration PR — registry entry + course bundle wiring, plus a DEMO_CATALOG entry if a /demo card is wanted — not merely the prepared one-line paste. Deployed factory state: no Psych registry entry, no /demo card, tree HTTP 404, no current registration PR in ap-one. The chooser additionally applies readiness/release checks (courses.py)", "evidence": [{"type": "github-file", "url": "https://github.com/InceptTrilogy/ap-one/blob/main/services/bff/data/feedback_courses.json"}, {"type": "live-api", "url": "https://apone.inceptstore.com/api/courses"}], "evidence_access": "SHARED"},
    {"claim_id": "cross.pool_chain", "section": "Cross-course", "status": "PLANNED", "value": "serial factory-pool order: HumGeo close-out, then APWH 362 + sweep, then APUSH 74, then Psych fill; each handoff writes a receipt the next lane fires on; Stage-4 prep receipts already OBSERVED", "evidence": [{"type": "git-branch", "url": "https://github.com/joshuadurey-del/ap-ss-evidence/tree/evidence/seat/20260817-apush-stage4-prep", "commit": "f05a665d52a31707a72c2d76d5271b2f5a02db60"}], "evidence_access": "ILMA_HUMAN_ONLY"},
    {"claim_id": "cross.judge.retired", "section": "Cross-course", "status": "OBSERVED", "observed_at": "2026-08-16 (measurement) / 2026-08-17T12:11+09:00 (retirement ruling)", "value": "local pre-check judge measured against official verdicts: 35 pairs x 3 votes, 105 calls, 0 errors; best fail-recall 80% strict / 70% majority; never gated anything; owner turned it off entirely on 2026-08-17. The follow-up attribution ask (which model served the 08-15 verdicts) was WITHDRAWN as moot on 2026-08-17: with the local judge retired, the question has no consumer, and the official verdict is the contract regardless of serving model", "scope": "35-pair sample", "excluded": [], "evidence": [{"type": "lane-log-excerpt", "url": "https://drive.google.com/file/d/195jOefAPOBzY6eQiljcCCNEHRk_NFScx/view", "note": "judge rulings excerpt, sanitized"}], "evidence_access": "SHARED_VIA_DRIVE"}
  ]
}
```

## Receipt detail per claim

Every entry below expands a manifest claim with its verification path. Verification commands assume the access matrix above.

### HumGeo

**humgeo.rebuild.passes — 432/474 official passes** · `OBSERVED` 2026-08-17T13:10+09:00
- Source: [campaign state snapshot](https://drive.google.com/file/d/1gJayI66bbayK0GrfsCOocZhBBgmbnWzD/view) (sanitized Drive copy, 15:00 KST); each accepted slot carries a QC receipt bound to the item's byte fingerprint.
- Verify now: recount the snapshot yourself (count rows with status accepted); the adoption-time verification of the then-425 passes is published at [adoption-verifications](https://github.com/joshuadurey-del/ap-ss-evidence/tree/evidence/humgeo/20260816-004715__claude__humgeo--adoption-verifications/claude) (`b6f5f1e8f585633f16f6733f8b9b315a9426d3ac`).
- Durable plan: the seal manifest (PLANNED) publishes every record's fingerprint + pass, making the final count mechanically checkable.
- Exclusions: the 6 metadata rows and the 759-line structural cohort are counted separately.

**humgeo.amendment.sealed** · `OBSERVED` 2026-08-17 (sha recomputed from bytes)
- Plan sha256 `91310a145f03358b03dadb7a7b9d48235b8bf628f15e3d9ef09508fe6896edbc` — recomputed from the plan bytes today (`shasum -a 256`), not quoted from memory.
- Sandbox proof: 425 prior passes intact, 49 slots selected. Ceremony, authority citation, and draft hashes: [amend30-docs](https://github.com/joshuadurey-del/ap-ss-evidence/tree/evidence/humgeo/20260817-000500__claude__humgeo--amend30-docs/claude) (`d1f7902ddefa510b5e2dc970f96ecbf001b167c6`); Langfuse trace `c0b6a4f2b09a5b1494a87f474dcffd8e`.
- The receipts' commit timestamps predate the blocker's clearance — the proof behind the standings doc's "built while its blocker still ran" lesson.

**humgeo.repair759.staged — 741/759** · `OBSERVED` 2026-08-16T13:17+09:00
- Receipts: [repair-docs](https://github.com/joshuadurey-del/ap-ss-evidence/tree/evidence/humgeo/20260816-052500__claude__humgeo--repair-docs/claude) (`b26d5a2ff43de8820e729c28c23e236abad3c370`).
- Langfuse: trace `3403d1909af058139c970c8e304658b5` (`humgeo-structural-repair/document`), dataset `humgeo-structural-repair-20260816`, run-id `final-1317kst` — one record per item: input fingerprint, check code, converged output hash.
- Scope: staging only. NO official verdicts exist for these yet; rescreens are `PLANNED` behind the APWH pool turn. The 18 non-staged items were dispositioned to regenerate per the factory contract (multi-check or nonconverged).

**humgeo.gates.659 / humgeo.contamination.642** · `BLOCKED` (fleet)
- Verify: `gh issue view 659 -R InceptTrilogy/ap-one` and `gh issue view 642 -R InceptTrilogy/ap-one` (or open the links in the manifest).
- #659 result at read time (2026-08-17T13:05+09:00): OPEN; writer corridor released with sealed digest `79629e16a1b66fba08b4c07f42df7260a62e3afb0d3fd676457f9727126707a4`; 68 gates owed.
- #642 result: OPEN; containment live at `d589d94cc3b168fbd6bff457578795a7fbd8c407`; corrective wave pending; 25 of the old identities need per-version handling for the exact gate graph.

**humgeo.platform.visibility** · `OBSERVED` 2026-08-17T13:21+09:00
- Verify: `curl -s https://apone.inceptstore.com/api/courses` — HumGeo absent from the returned list. Staleness: recheck before quoting; a fleet placement changes this without notice to us.

### APWH

**apwh.repairs.applied — 449/571** · `OBSERVED` 2026-08-17T12:14+09:00
- Verify: open [commit 5d6fe7e3](https://github.com/ilmych/apwh-build-outputs/commit/5d6fe7e3a7f6d6aeb3b90e1e625763412f8622b2) — full SHA `5d6fe7e3a7f6d6aeb3b90e1e625763412f8622b2`, push-gate verified. The remaining ~122 unlock as redraw codes land.

**apwh.local_done.walk** · `OBSERVED` 2026-08-12, corrected 2026-08-17
- The proof is a render walk with bytes-exact receipts, not a resident server. An earlier seat message said "server up 10d+". The live check on 2026-08-17 found no APWH server. The correction is recorded here deliberately.
- Pattern legitimacy: the demo_tree approach is CANON. ap-one's own ledger on main lists it as an accepted serving reason ("committed tree, not live P3"). The local work followed a sanctioned pattern, not a workaround.
- Durable evidence: walk receipts in ap-ss-evidence commit `483efc1` (short id as pushed; resolve inside the repo). The serving branch `apwh/study-skills-demo-serve @ aff550eabaaf4c5c71325f7cf0dd2b3b338684a2` is LOCAL-ONLY and now SUPERSEDED. ap-one origin/main landed the canonical version of this serving leg. Its source pin: `ilmych/apwh-blueprint-build @ 2129eb94497c81f5521005baddbf23f7468d57f9` (per ap-one STATUS.md). It carries deterministic component ids, a sealed handoff envelope, and a zero-write verifier. No platform write yet; it waits on release eligibility. The local branch is retired to history. No PR — it would duplicate merged machinery. The walk receipts remain the durable evidence of the 08-12 proof.
- Four lesson-page renders from this walk sit in the [Drive visuals folder](https://drive.google.com/drive/folders/1-05RBT72-K3CJzYD0AjaP_jzwggvVWC1) (provenance in the folder's manifest).

**apwh.demo.listed** · `OBSERVED` 2026-08-17T13:21+09:00
- Verify: `curl -s https://apone.inceptstore.com/api/courses` — expect `ap-world-history-fall-2026-v1`.

**apwh.regen_tail / apwh.sweep** · `PLANNED`
- The dry-run receipt (362/362) is OBSERVED; execution is not. Neither has receipts proving execution — by definition they cannot yet. Treat any future "done" claim as unproven until a dated receipt names counts and verdicts.

### APUSH

**apush.batch34 — 74 gated contracts** · `OBSERVED` 2026-08-17
- Full SHA `7846cd754bb2ab733afaa996155a45a52fc17a4a` in [ilmych/apush-build-outputs](https://github.com/ilmych/apush-build-outputs/commit/7846cd754bb2ab733afaa996155a45a52fc17a4a), branch `receipts/20260812-chunk1-fixround` (head `23b75c25bf8e27ab8769013eeb026cd83467293e`). Ilma owns the repo.
- Honesty boundary: these are CONTRACTS. No wave-2 article text exists anywhere; the factory writes articles at Stage 4. Any reading of "74 articles ready" as finished prose is wrong.

**apush.sample_article — position 232** · `OBSERVED` 2026-08-17
- Published beside the report ([Google Doc](https://docs.google.com/document/d/1d0mvskgAcpLmyrUNNw_2385pXcDdr_1fIzXgSnHUZDo/edit)): the strongest ADMITTED article (KC-9.1.I, unit 9), acceptance mode server_strict, strict-QC PASS, manual image review PASS, admitted in the successor chain. Provenance pointers ride in an HTML comment at the top of the embed. One presentation-only change is declared there: the S3 image URL was swapped for a local PNG so the doc renders. Body text untouched.

**apush.intake90 / apush.intake89** · `BLOCKED` (factory owners)
- Verify: the issue links in the manifest. At read time both were updated 2026-08-16 with zero factory replies. #90 walls 126 of 249 positions — the course's honest ceiling until answered.

### Psych

**psych.local_serving** · `OBSERVED` 2026-08-17
- Exact mechanism (wording matters): the walker boots ap-one's real serving app in-process over a merged registry. Real serving code, real router, test transport. Then it walks every page. 221/221 article student-views served, tree exact, zero key leaks, 246 receipts. Boot-on-demand: reproducible on one documented command (`WALK-SUMMARY.md` in the [evidence branch](https://github.com/joshuadurey-del/ap-ss-evidence/tree/evidence/psych/20260817-local-host/claude), commit `564d086` (rebuilt + re-walked after the fleet repair train)); it does not stay resident.
- Measured scope: article-serving paths ONLY. Gate and practice paths are unmeasured — they are bank-gated and the bank is 1,810 items short. Do not read "walks green" as whole-course-green.
- The Psych captures in the [Drive visuals folder](https://drive.google.com/drive/folders/1-05RBT72-K3CJzYD0AjaP_jzwggvVWC1) render the real served payloads under a neutral stylesheet (footer-labeled); they are not the production frontend.

**psych.topic33.empty** · `OBSERVED` 2026-08-17
- The [course tree capture](https://drive.google.com/file/d/19fHxlNmgZnGoB9TTG_yYDjkCKpRFLC2k/view) shows topic 3.3 with 0 lessons. This is deliberate, not a gap: no EK record maps to 3.3 (the 221-article coverage invariant, course repo `DOWNSTREAM_NOTES` section 1). An approved topic-3.3 lesson asset already exists on the shelf; a 2026-08-09 ruling parked adding it as a separate curriculum-authoring decision. Verified today: exactly one empty topic in the served tree.

**psych.ebq.zero_yield** · `OBSERVED` 2026-08-11 (risk), measurement `PLANNED`
- 0 usable items in 10 generation passes on 2026-08-11. 221 of the 374 short buckets need exactly this generator. The fresh measurement fires on the first two fill cycles; if yield is still zero, the disposition goes to Josh with the numbers. Until that measurement exists, any Psych completion date is soft — which is why the standings doc gives Psych "no date yet" in the conservative column.

### Cross-course

**cross.judge.retired** · `OBSERVED`
- Measurement 2026-08-16: 35 item pairs, 3 votes each, 105 calls, zero transport errors. Best fail-recall 80% under the strict any-one-fail rule; 70% under majority-of-3. Meaning: 1 in 5 items the official judge failed, the local judge passed. 10 of the 18 misses were unanimous local passes, concentrated in check D2 (all-distractors-plausible) on DOK-1 recall items.
- Consequence: the local judge never had accept authority; its rejection-only prescreen role was retired by owner ruling 2026-08-17T12:11+09:00. Everything now goes straight to the factory judge. The ruling entry lives in the orchestrator lane log (Josh's machine; quoted verbatim in the standings doc's lessons table).

## Langfuse — how the agent reads the progress record

**Where:** [us.cloud.langfuse.com](https://us.cloud.langfuse.com), project **incept-durey**. An org invite was sent to Ilma on 2026-08-17 — accept it first; without it the links 404.

**What is in it (and what never is):** traces, datasets, and scores for every campaign step — IDs, hashes, counts, verdicts, and timings only. No question text, no answer keys, no credentials, by standing rule. Records identify items by lane-prefixed dataset item IDs that match the GitHub evidence branches.

**How it is organized:**
- **Traces** are named `<course>-<campaign>/<step>`. The two cited here: `c0b6a4f2b09a5b1494a87f474dcffd8e` (`humgeo` 30-slot amendment ceremony) and `3403d1909af058139c970c8e304658b5` (`humgeo-structural-repair/document`).
- **Datasets** hold item-level records, named `<course>-<campaign>-<date>`. Cited: `humgeo-structural-repair-20260816`, run-id `final-1317kst` — one record per repaired item: input fingerprint, check code, converged output hash.
- **Scores** carry the QC story. `criterion.*` scores mirror the factory's check codes (D-codes = content checks, S-codes = structural). The **acceptance** score is 0 until the OFFICIAL factory verdict exists, then it flips. Acceptance in Langfuse always means a paid factory pass, never a local opinion.

**How to see the progress made:**
1. Filter traces by name prefix (`humgeo-`) and sort by time. The sequence reads as a story: discovery, then repair, then amendment, then seal — each trace linking its receipts.
2. Open the repair dataset and compare run-ids. Earlier run-ids list failures by check code; the final run-id shows convergence. The delta IS the improvement.
3. Read acceptance scores across a campaign: they start at 0 (nothing trusted) and flip only as official verdicts land — the honest progress curve.
4. Cross-check any Langfuse record against the matching GitHub evidence branch by its item ID or hash; the two systems are written from the same receipts.

## Staleness

This dossier is a snapshot at 2026-08-17T13:25+09:00 KST (all stamps machine-derived; an earlier draft carried narrative-clock stamps that ran fast — corrected before publication). Rules for reading it later:
- Live counters (accepted counts, redraw counts, demo course list) move without notice. Anything older than a day: re-check via the verification path before quoting.
- A `PLANNED` claim becomes `OBSERVED` only through a NEW dated receipt with counts and verdicts. A `PLANNED` row older than 48 hours with no successor receipt is a question to ask Josh, not a fact to assume either way.
- The seal manifest (humgeo.seal.manifest), once published, supersedes humgeo.rebuild.passes as the authoritative count.
