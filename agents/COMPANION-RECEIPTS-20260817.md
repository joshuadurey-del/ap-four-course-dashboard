# Companion receipts — AP Four-Course Standings 2026-08-17

For the reader's agent. Every claim in the standings doc maps to a receipt below: live links, IDs, hashes, and counts only — no question payloads, answer keys, credentials, or machine-local paths. Where a receipt lives on the orchestrator machine (runner state, lane logs), this doc names the artifact and its identifying hash; excerpts are available on request.

## HumGeo (Issue #21 regeneration campaign)

| Claim | Receipt |
| --- | --- |
| 451/474 slots hold current-byte official /v1/qc passes (463 accepted in state; 12 fail on pre-amendment pins) | Derived by run_issue21_bulk_qc._official_pass over the amended plan, 2026-08-18 04:2x KST, NOT by counting status=accepted; adopted-state verification published at [adoption-verifications](https://github.com/joshuadurey-del/ap-ss-evidence/tree/b6f5f1e8f585633f16f6733f8b9b315a9426d3ac/evidence/humgeo/20260816-004715__claude__humgeo--adoption-verifications/claude) |
| Residual runner draining live | Runner log line `{"completed": 100, "total": 142}`; single-writer lock held by the runner process; every log line carries `"corpus_writes": 0` |
| Sealed plan (474 rows) | Plan sha256 `f64820223aecb7745c7fa16a9ddf694294264a2dd51c1e6a65e50fa4c97b1734` |
| 30-slot amendment sealed + sandbox-proven | Amended plan sha256 `91310a145f03358b03dadb7a7b9d48235b8bf628f15e3d9ef09508fe6896edbc`; sandbox proof 425 prior passes intact / 49 selected; receipts + authority citation at [amend30-docs](https://github.com/joshuadurey-del/ap-ss-evidence/tree/d1f7902ddefa510b5e2dc970f96ecbf001b167c6/evidence/humgeo/20260817-000500__claude__humgeo--amend30-docs/claude); Langfuse trace `c0b6a4f2b09a5b1494a87f474dcffd8e` (project incept-durey) |
| 741/759 structural-repair candidates staged | Receipts at [repair-docs](https://github.com/joshuadurey-del/ap-ss-evidence/tree/b26d5a2ff43de8820e729c28c23e236abad3c370/evidence/humgeo/20260816-052500__claude__humgeo--repair-docs/claude); Langfuse trace `3403d190...`, dataset `humgeo-structural-repair-20260816`, run-id `final-1317kst` |
| Stale-source root cause | Canonical skill tags were already committed at humgeo-rebuild-shortfall commit `8346888a` (08-12 hydration); the sealed plan carried older copies of 30 sources |
| Writer corridor released; 68 gates still owed | [ap-one #659](https://github.com/InceptTrilogy/ap-one/issues/659) — ilmych 2026-08-16: "v5 writer corridor COMPLETE and RELEASED", sealed digest `79629e16a1b6...`; issue OPEN on production gate materialization |
| 57 contaminated successors, 1,750 children | [ap-one #642](https://github.com/InceptTrilogy/ap-one/issues/642) — audit: 57/57 successor prompts equal the polluted stem; containment landed 08-14 (PRs #685 + #698 @ `d589d94c`); corrective wave still pending |

## APWH

| Claim | Receipt |
| --- | --- |
| 449/571 rationale repairs applied to canonical bank | [apwh-build-outputs main @ 5d6fe7e3](https://github.com/ilmych/apwh-build-outputs/commit/5d6fe7e3a7f6d6aeb3b90e1e625763412f8622b2), push-gate verified (live read 12:14 KST) |
| Skill codes 726/933; 207 in redraw round 2 | APWH campaign cursor, live 12:14 KST (28 of 207 done, resolution rate holding) |
| 362-item regeneration batch proven, parked | Composition 260 multi-check + 66 content-class + 36 S10; executor dry-run 362/362; fires on the HumGeo pool-release receipt (coordination surface, not yet written) |
| 0/933 paid verdicts by design | Owner order repair-first, judge-once; the sweep is owned by the APWH QC-sweep seat and fires on its ready signal |
| Full course proven end to end | Render walk with bytes-exact receipts (branch `apwh/study-skills-demo-serve @ aff550ea`); corrected 08-17 — this was a walk proof, not a persistent server |
| Course visible in the live demo | [apone.inceptstore.com/api/courses](https://apone.inceptstore.com/api/courses) lists `ap-world-history-fall-2026-v1` (checked 2026-08-17 afternoon) |
| Placement not fleet-accepted; credential absent day 4 | [ap-one #591](https://github.com/InceptTrilogy/ap-one/issues/591) OPEN (ilmych 08-16: A-203/A-210 still MISSING); credential absent per ap-status live read 12:14 KST. The credential-request thread sits on a repo outside the org, not directly linkable |

## APUSH

| Claim | Receipt |
| --- | --- |
| 49/249 admitted; ap-status 36% | succ11 ledger + ap-status, verified live 2026-08-17 morning; progress view: [build STATUS](https://github.com/ilmych/apush-course-build/blob/main/STATUS.md) |
| 74 articles authored+gated, ready to post | batch-34 @ commit `7846cd75`, all 8 chunk manifests re-validated 08-17 |
| 126 positions walled on factory visual capability | [intake #90](https://github.com/ilmych/incept-agent-intake/issues/90) (updated 08-16, no factory reply yet) |
| 2 positions on defective packets (170, 244) | [intake #89](https://github.com/ilmych/incept-agent-intake/issues/89) (updated 08-16, no factory reply yet) |
| Reconciler ledger fix open, non-gating | [apush-course-build PR #6](https://github.com/ilmych/apush-course-build/pull/6) (opt-in --ledger for v2 successor chains) |

## Psych

| Claim | Receipt |
| --- | --- |
| ap-status 58%; articles 221/221 | ap-status live 08-17; U5's 54 articles landed 08-16 |
| Course serves locally (boot-on-demand), walks green | [local-host evidence branch](https://github.com/joshuadurey-del/ap-ss-evidence/tree/564d0866336d71bb467b28d02d1d123e4adf82ee/evidence/psych/20260817-local-host/claude) @ `054e5c2` — 262 components, 246 receipts, 221/221 article student-views served via the real BFF router booted over the bundle, zero key leaks; reproducible on one documented command (WALK-SUMMARY.md); gate/practice legs unmeasured (bank-gated) |
| Bank 1,810 items short across 374 buckets | Admin dry_run 08-17 morning: 221 evidence-based-FRQ + 147 article-analysis + 6 MCQ buckets |
| U5 gate 27 findings, unchanged since 08-12 | [ap-psychology-fall-2025-v1 #2](https://github.com/InceptTrilogy/ap-psychology-fall-2025-v1/issues/2) (fleet repair) |
| Evidence-based-FRQ zero-yield risk | 0 usable items in 10 passes on 08-11; fresh measurement on the first two Stage-5 fill cycles |
| Platform registration pending one merge | psych entry for ap-one `feedback_courses.json`, paste-ready |

## Cross-course

| Claim | Receipt |
| --- | --- |
| Serial pool order with receipted handoffs | Dispatch board order HumGeo → APWH (362) → APUSH (74) → Psych fill; Stage-4 prep receipts at [seat evidence](https://github.com/joshuadurey-del/ap-ss-evidence/tree/f05a665d52a31707a72c2d76d5271b2f5a02db60/evidence/seat/20260817-apush-stage4-prep) |
| Local judge measured, not gate-worthy, now off | Judge-agreement rerun 2026-08-16: 35 pairs × 3 votes, 105 calls, zero errors; best fail-recall 80% (strict any-one-fail), 70% majority-of-3; owner ruling 2026-08-17 12:11 KST turned the prescreen off (orchestrator lane log) |
| QC judge attribution question | 10 of 18 missed items were unanimous local passes, concentrated in D2 (distractor plausibility) on DOK-1 recall items; receipts omit the judging model — fleet attribution requested for the 08-15 verdicts |

## Lessons-learned receipts

| Lesson | Receipt |
| --- | --- |
| Corpus minted without full QC (half the bank failed) | The gap and its discovery are written up in the lane's own `service_qc.py` docstring; the structural fix (judge inside generation) landed at factory origin/main `6cf697d`+; APWH counter-evidence: 449 repairs applied at [5d6fe7e3](https://github.com/ilmych/apwh-build-outputs/commit/5d6fe7e3a7f6d6aeb3b90e1e625763412f8622b2) with 0 paid verdicts spent |
| Stale seal-time sources → 30-slot amendment | Canonical tags pre-existed at humgeo-rebuild-shortfall `8346888a`; amendment plan sha `91310a14...`; sandbox proof 425 intact / 49 selected; full ceremony at [amend30-docs](https://github.com/joshuadurey-del/ap-ss-evidence/tree/d1f7902ddefa510b5e2dc970f96ecbf001b167c6/evidence/humgeo/20260817-000500__claude__humgeo--amend30-docs/claude) |
| Local judge measured, then retired | Rerun 2026-08-16: 35 pairs × 3 votes, 105 calls, 0 errors; fail-recall 80% strict / 70% majority; prescreen-off ruling 2026-08-17 12:11 KST (orchestrator lane log) |
| Deadline slips → automated receipted handoffs | Pool order + Stage-4 prep at [seat evidence](https://github.com/joshuadurey-del/ap-ss-evidence/tree/f05a665d52a31707a72c2d76d5271b2f5a02db60/evidence/seat/20260817-apush-stage4-prep) |
| Parked-work correction | The amendment receipts at [amend30-docs](https://github.com/joshuadurey-del/ap-ss-evidence/tree/d1f7902ddefa510b5e2dc970f96ecbf001b167c6/evidence/humgeo/20260817-000500__claude__humgeo--amend30-docs/claude) are timestamped hours before the blocker (the residual drain) cleared — the proof the build-now rule holds |
| Semantic proof for corrective waves | [#642](https://github.com/InceptTrilogy/ap-one/issues/642) acceptance criteria (hash-proven prompt/choices/key/KC semantics per candidate) vs our seal's byte-bound pass + fingerprint manifest |

## Langfuse — how the agent reads the progress record

**Where:** [us.cloud.langfuse.com](https://us.cloud.langfuse.com), project **incept-durey**. An org invite was sent to Ilma on 2026-08-17 — accept it first; without it the links 404.

**What is in it (and what never is):** traces, datasets, and scores for every campaign step — IDs, hashes, counts, verdicts, and timings only. No question text, no answer keys, no credentials, by standing rule. Receipts identify items by lane-prefixed dataset item IDs that match the GitHub evidence branches.

**How it is organized:**
- **Traces** are named by lane and action (`humgeo--...`, `apwh--...`). Key traces cited in this report: `c0b6a4f2b09a5b1494a87f474dcffd8e` (the 30-slot amendment ceremony) and `3403d190...` (the 759-item structural repair pass).
- **Datasets** hold item-level records, named `<course>-<campaign>-<date>`. The one cited here is `humgeo-structural-repair-20260816` with run-id `final-1317kst` — one record per repaired item: input fingerprint, check code, converged output hash.
- **Scores** carry the QC story. `criterion.*` scores mirror the factory's check codes (D-codes = content checks, S-codes = structural). The **acceptance** score is 0 until the OFFICIAL factory verdict exists, then it flips — so acceptance in Langfuse always means a paid factory pass, never a local opinion.

**How to see the progress made:**
1. Filter traces by name prefix (`humgeo--`) and sort by time. The sequence reads as a story: discovery, then repair, then amendment, then seal — each trace linking its receipts.
2. Open the repair dataset and compare run-ids. Earlier run-ids list failures by check code; the final run-id shows convergence. The delta IS the improvement.
3. Read acceptance scores across the campaign: they start at 0 (nothing trusted) and flip only as official verdicts land — the honest progress curve.
4. Cross-check any Langfuse record against the matching GitHub evidence branch by its item ID or hash; the two systems are written from the same receipts.
