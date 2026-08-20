# Four-course blueprint audit — 2026-08-20

## Verdict

The lane-bound blueprints are the normative course-design sources, but none of the four courses currently has a complete evidence chain from exact blueprint bytes through current implementation, course-specific acceptance, every required named human disposition, course-owned TimeBack/AP One delivery, served-byte readback, and release.

The onboarding packet points to a seven-phase factory playbook. A historical captured copy was examined, but a current factory-blessed copy or successor was not found in the accessible repositories. This audit therefore does not assign phase-completion credit. Dashboard markers report the **current recovery locus**, not proof that every earlier gate cleared.

## Authority split

- **Blueprint:** normative course design, scope, sequencing constraints, QC, and course-specific completion blockers.
- **Factory contracts:** sanctioned execution, API, publisher, authorization, and receipt behavior.
- **Dashboard:** derivative evidence report only.
- **Current authority gap:** obtain and pin the current factory-blessed production playbook or successor; do not let a generic lifecycle override course-specific blueprint gates.

The four lane-bound onboarding blueprints are pinned at [`d510f5b63b90`](https://github.com/ilmych/ap-social-studies-onboarding/tree/d510f5b63b90/data/blueprints). Hashes below match the active course lanes, which proves build-lane binding—not that no newer owner-sanctioned blueprint exists.

## Course crosswalk

| Course | Lane-bound blueprint SHA-256 | Evidence found | Honest classification | Work required next |
|---|---|---|---|---|
| HumGeo | `bea50d0d1e22c367b4f5a5c3eeec9c2eb08fb26d8a0caa9e354a76b2ffbbe9e4` | Base revision [`28684ec8`](https://github.com/ilmych/humgeo-rebuild/tree/28684ec8ba9829a58d5323b928b87b11fa8774a4) has a [40-pass / 0-fail / 0-warn receipt](https://github.com/ilmych/humgeo-rebuild/blob/28684ec8ba9829a58d5323b928b87b11fa8774a4/manifests/w6-staging/receipt-blueprint-diff.json). Current declared store: 2,513 items, 2,505 without fingerprint-matched QC receipts, 789 structural failures. Retained nightly serving oracle: 69/204 forms conform to 4/8/3, 135 fail. | `BASE_RECEIPT_PASS`; candidate, receipt-coverage, and served-composition proof red. | Land/read back [PR #43](https://github.com/ilmych/humgeo-rebuild/pull/43), rerun receipt coverage and the oracle, advance [intake #95](https://github.com/ilmych/incept-agent-intake/issues/95), and route served composition to existing [#659](https://github.com/InceptTrilogy/ap-one/issues/659). |
| APWH | `790a01f2487c8f47041c6100f9d1a4a53affe2ff80a7fa56e1233b67fe513cde` | Home repo [`8a6ebccb`](https://github.com/ilmych/apwh-blueprint-build/tree/8a6ebccbc72451217d1739791d89c14f492ccb60) contains a [235-ID oracle](https://github.com/ilmych/apwh-blueprint-build/blob/8a6ebccbc72451217d1739791d89c14f492ccb60/scripts/blueprint_diff.py). A local run emitted FAIL 1 / MISSING 79 / PASS 56, but also `course_dir_readable=false` and `spine_lessons=0`; A-197 is not proven by that receipt. [Issue #48](https://github.com/ilmych/apwh-blueprint-build/issues/48) attempt 1 is REWORK; attempt 2 has no disposition yet. | `ORACLE_PRESENT`; A-197 and current acceptance unmeasured. | Rerun the oracle against an exact readable current course directory. Separately generate the `adcc641` evidence envelope, rerun acceptance, repair genuine residue, and obtain missing human dispositions. |
| APUSH | `62e86c9c1fd053514fae9ff3a595e0b9650a8e2b0207f9e21f48f6cf3fa5b667` | [Reconciliation manifest](https://github.com/ilmych/apush-build-outputs/blob/44e4a09ab1eaaafb8aab927f224dbf1014bc8b4c/phase1/blueprint-reconciliation/reconciliation_manifest.json) is design-reconciled. The [canonical ledger](https://github.com/ilmych/apush-build-outputs/blob/44e4a09ab1eaaafb8aab927f224dbf1014bc8b4c/phase2/article-acceptance-ledger-v1/ledger.json) is 38/249: 36 legacy plus 2 server-strict. Eleven more records are receipted but uncommitted. | `DESIGN_RECONCILED`; implementation unproven; 11 admissions not canonical. | Fleet lands the 11 receipts through the committed ledger route, then the image/seating work and a current-byte implementation crosswalk. |
| Psychology | `4a30eff6e6869fa7585dda3b4dacfe32488c1c7381a52ee5ed6b25a710c39af6` | [Build seed](https://github.com/ilmych/ap-psychology-build/blob/25319b8051f4351b1629bc65df565eede153a812/BUILD_SEED.md) is blueprint-first. Current course [`af2f733b`](https://github.com/InceptTrilogy/ap-psychology-fall-2025-v1/tree/af2f733b501170cbd598d78ed5b9519f2c1c06aa/articles) has 221 passing QC sidecars: 204 covered and 17 partial-source-coverage. The 17 are not failed articles; three nonblocking self-findings remain. | `CONTENT_QC_PASS`; specialist and implementation gates open. | Clear three nonblocking article self-findings, resolve [#14](https://github.com/InceptTrilogy/ap-psychology-fall-2025-v1/issues/14) and [#2](https://github.com/InceptTrilogy/ap-psychology-fall-2025-v1/issues/2), then complete the bank, oracle, and specialist dispositions. |

## Human-review finding

The audit searched the current dashboard plus the declared HumGeo, APWH, APUSH, and Psychology build repositories and their cited current blocker threads. It found persona/model/task-level evidence, but no named whole-course human LS/SME completion disposition for the current revision of any course. This is a scoped absence finding, not a claim about inaccessible systems.

Psychology is stricter: its blueprint explicitly requires psychology-specialist content, ontology, and sequencing dispositions before completion. Those cannot be replaced by persona or model review.

## Honest work queue

1. Obtain and pin the current factory-blessed playbook or successor.
2. Preserve the four exact lane-bound blueprint hashes; confirm or supersede them through owner authority.
3. Produce a current-byte blueprint crosswalk and exit receipt per course—rerun an existing oracle where one exists; do not invent a competing validator.
4. Obtain every blueprint- or contract-required named human disposition and receipt revisions against the exact reviewed bytes.
5. Build a course-owned TimeBack/AP One delivery package and read back exact stored and served versions.
6. Claim release only after a dated signed-in end-to-end learner walk.

## Fable-assessment reconciliation

- **Accepted:** HumGeo PR #43 / intake #95 watch, 69-of-204 served-composition result, APUSH canonical 38 plus 11 uncommitted receipts, Psychology issue #14 hold, and the named-human review gap.
- **Corrected:** APWH A-197 is not buildable evidence yet because that oracle run could not read the course. Psychology's 17 `partial` labels are source-coverage taxonomy and all 17 sidecars pass; the real article cleanup is three nonblocking self-findings.
- **Tooling:** the exec gate already contains the router-named `ap-console/refresh.py` exemption. The freshness gate does reject the deliberately detached test-builder pin, but a safe fix needs an explicit declared-pin contract—not a blanket detached-HEAD exception.
- **Mutation accounting:** the assessment seat changed nothing. This dashboard window has a local dashboard commit and follow-up edits only; no course, factory, issue, PR, spend, or remote dashboard state was changed during this reconciliation.

## Filing guidance

Continue on the current owning issues when they already cover the blocker. A new filing should be drafted for review only when the missing current playbook/successor or a course-specific human-review contract has no existing owner thread. No issue was filed by this audit.
