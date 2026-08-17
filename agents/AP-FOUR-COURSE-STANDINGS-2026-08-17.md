# AP Four-Course Standings — 2026-08-17

**Agent companion:** [AP-FOUR-COURSE-AGENT-ACCOUNTING-2026-08-17.md](https://drive.google.com/file/d/15fXAispARin4QU40HFtcE5xsx8Xgs2SX/view) (raw markdown — download and hand it to your agent; the JSON claims manifest inside is machine-readable) — the claim-by-claim evidence dossier behind this doc. Every number here has a stable claim id, a status label (observed / planned / blocked / missing), full hashes and live links, a verification path, and a note on what was NOT measured. Point your agent at it; it includes a machine-readable claims manifest and a guide to reading our Langfuse project.

## TLDR — where the week landed

- **HumGeo**: bank rebuild at 432 of 474 items passed; the rest drain today. The sealed replacement package lands tonight. You can open it on the /demo page today; formal RELEASE waits on two fleet items ([#659](https://github.com/InceptTrilogy/ap-one/issues/659) serving cutover + release flip, [#642](https://github.com/InceptTrilogy/ap-one/issues/642) cleanup).
- **APWH**: the full course is proven end to end by a render walk with bytes-exact receipts. 449 of 571 rationale repairs are applied to the canonical bank ([commit](https://github.com/ilmych/apwh-build-outputs/commit/5d6fe7e3a7f6d6aeb3b90e1e625763412f8622b2)). The last regeneration batch and the paid QC sweep queue behind HumGeo's factory-pool turn.
- **APUSH**: 49 of 249 article positions admitted. The next 74 article CONTRACTS are validated and post today; the factory writes the article text at its next stage. Half the course waits on a factory capability answer ([intake #90](https://github.com/ilmych/incept-agent-intake/issues/90)).
- **Psych**: the surprise of the week. All 221 articles are done. The whole course assembles and serves locally on demand — the real serving app booted over the bundle, every article leg walked green ([evidence](https://github.com/joshuadurey-del/ap-ss-evidence/tree/evidence/psych/20260817-local-host/claude)). The item bank fill starts tonight and is the long pole.

## See each course today

All visuals below live in the [visuals folder](https://drive.google.com/drive/folders/1-05RBT72-K3CJzYD0AjaP_jzwggvVWC1) (full resolution). AP One has TWO visibility surfaces, and they differ: the [/demo page](https://apone.inceptstore.com/demo) renders a separately maintained static card list, while the ordinary course chooser ([/api/courses](https://apone.inceptstore.com/api/courses)) applies readiness and release checks over the registry. Registration, release, and /demo visibility are three separate operations. All rows verified live today at 13:21 KST.

| Course | Where to look | Honest note |
| --- | --- | --- |
| **HumGeo** | OPEN IT NOW: [apone.inceptstore.com/demo](https://apone.inceptstore.com/demo) → the AP Human Geography card. Its course tree serves (HTTP 200) | Visible and walkable on /demo today. Still absent from the released chooser: release_ready is false pending the AP One serving cutover and release flip ([#659](https://github.com/InceptTrilogy/ap-one/issues/659)). |
| **APWH** | In the live course chooser ([/api/courses](https://apone.inceptstore.com/api/courses)); its tree serves (HTTP 200). Four rendered lesson pages from the proof walk: [unit 1](https://drive.google.com/file/d/1gb0OGF13ar9dWhDph9GGVGmvvX3qsIaG/view), [unit 2](https://drive.google.com/file/d/1YSIEoYVrrqPMPMNWVMyrDHL5Ctqlf4Ps/view), [unit 5](https://drive.google.com/file/d/1q7eb3pln06P_WM-zWNCXidQJgNbKgAyY/view), [study skills](https://drive.google.com/file/d/1R-YGBHv7NS7F7wWjR4k94XCJ9A2oMoVI/view) | Registered and serving. NOT on the static /demo card list (separate catalog file). [#591](https://github.com/InceptTrilogy/ap-one/issues/591) covers four missing study-skill lessons, not overall registration. |
| **APUSH** | [Build ledger STATUS](https://github.com/ilmych/apush-course-build/blob/main/STATUS.md) + [one full admitted article](https://docs.google.com/document/d/1d0mvskgAcpLmyrUNNw_2385pXcDdr_1fIzXgSnHUZDo/edit) (position 232, strict-QC pass) | Nothing platform-side: no registry entry, no card, tree returns 404. Build-only. |
| **Psych** | Course captures rendered from the real served payloads (neutral stylesheet): [course tree](https://drive.google.com/file/d/19fHxlNmgZnGoB9TTG_yYDjkCKpRFLC2k/view), [article 1](https://drive.google.com/file/d/1Zlq_tlyaEtXpDGRZ-W5O9NsluIGhBQv2/view), [article 2](https://drive.google.com/file/d/1EM8afR722JKrzxkfBghlgWKK3HuO5kMn/view), [article 3](https://drive.google.com/file/d/154_8oGxnDuyOZI1nMhTJgoiDKQKTccBj/view), [walk summary](https://drive.google.com/file/d/1MFYhPL8lsPkSJdq931JSnc_sCnp63W3O/view); walk receipts [here](https://github.com/joshuadurey-del/ap-ss-evidence/tree/evidence/psych/20260817-local-host/claude) | Nothing platform-side yet: no registry entry, tree returns 404. Local serving is boot-on-demand. Platform visibility needs a complete registration PR (registry entry + bundle wiring, plus a /demo card entry if wanted) — more than the one-line paste we had prepared. |

## Where the four courses stand

| Course | Where it is | Blocking reality |
| --- | --- | --- |
| **AP Human Geography** | • Bank rebuild 432/474 passed; remainder draining today. • 30-slot amendment sealed and proven; fires at drain ([receipts](https://github.com/joshuadurey-del/ap-ss-evidence/tree/evidence/humgeo/20260817-000500__claude__humgeo--amend30-docs/claude)). • Then: 6 metadata rows, assembly, validation, sealed 482-record manifest. • 741/759 structural-repair candidates staged ([receipts](https://github.com/joshuadurey-del/ap-ss-evidence/tree/evidence/humgeo/20260816-052500__claude__humgeo--repair-docs/claude)). | • [#659](https://github.com/InceptTrilogy/ap-one/issues/659): all 68 components + 204 links MATERIALIZED 08-16; remaining = AP One serving cutover, deploy/readback, release_ready flip — fleet. Timing note: the shared TimeBack writer corridor was re-claimed 08-17 for another course's catalog write, and HumGeo's cutover queues behind its completion. • [#642](https://github.com/InceptTrilogy/ap-one/issues/642): 57 items with duplicate choice text, 1,750 children affected — fleet. • Corpus-apply go after seal — Josh. |
| **AP World History** | • Full course proven by render walk, bytes-exact receipts. • 449/571 rationale repairs applied, push-verified ([commit](https://github.com/ilmych/apwh-build-outputs/commit/5d6fe7e3a7f6d6aeb3b90e1e625763412f8622b2)). • Skill codes 760/933; redraw recovering the rest (61 of 207 done, ~56% rate). • 362-item regeneration batch proven and parked. | • Batch parked on HumGeo's pool release (today) — Josh. • Paid sweep fires after the batch (0/933 verdicts yet, by design). • [#591](https://github.com/InceptTrilogy/ap-one/issues/591): four study-skill lessons still un-ingested — fleet. • Publisher credential absent day 4 (per ap-status; gates canonical placement) — fleet. • Sunday bar slipped one day. • Even after the credential lands, platform writes queue behind the TimeBack corridor's current write phase. |
| **AP US History** | • 49/249 article positions admitted. • Next 74 article contracts authored, gated, validated; post on the pool turn (the factory writes the articles from them). • Nothing serves yet, build-only. | • Ceiling ~123/249 after the 74 land. • 126 positions wait on factory visual-class capability ([intake #90](https://github.com/ilmych/incept-agent-intake/issues/90), no reply) — factory. • 2 positions on defective packets ([intake #89](https://github.com/ilmych/incept-agent-intake/issues/89)) — factory. |
| **AP Psychology** | • Articles 221/221 done, every EK covered (Unit 5's 54 landed Saturday). • Topic 3.3 shows 0 lessons BY DESIGN: no EK maps to it; an approved lesson asset is parked pending a separate curriculum decision. • NEW: whole course serves locally boot-on-demand; walks green, 246 receipts, zero key leaks ([evidence](https://github.com/joshuadurey-del/ap-ss-evidence/tree/evidence/psych/20260817-local-host/claude)). • Bank fill queued for tonight's pool turn. | • Bank 1,810 items short across 374 buckets — Josh. • RISK: evidence-based-FRQ generator gave zero yield in 10 passes on 08-11; fresh measurement tonight. • U5 gate: 27 findings ([psych #2](https://github.com/InceptTrilogy/ap-psychology-fall-2025-v1/issues/2), unchanged since 08-12) — fleet. • Platform registration: needs a complete registration PR (registry entry + bundle wiring), not just the prepared one-line paste — Josh prepares, Ilma merges. |
| **Cross-course** | • One shared factory pool, strict series: HumGeo → APWH (362) → APUSH (74) → Psych fill. • Every handoff receipted; next lane fires automatically. | • One fleet question: which model/settings served official QC content checks on 08-15? Receipts omit the judging model. • That judge reads distractor plausibility (D2) far stricter on recall items than any replay of ours. • One line closes it. |

## ETA per course — our side done

Dates are KST. "Our side done" means content work complete, receipted, and handed to the fleet. Student-live also needs the fleet items in P0; I do not set dates for those.

| Course | Optimistic | Realistic | Conservative | What moves it between columns |
| --- | --- | --- | --- | --- |
| **HumGeo** | tonight 08-17 | 08-18 | 08-19 | The amended 30-slot pass and metadata QC are mechanical. Conservative covers a new fail-closed stop that needs a canon fix first. |
| **APWH** | 08-18 | 08-19 | 08-21 | The 362-item batch + paid sweep start on my pool release. Conservative covers a sweep-fail repair round and slow redraw stragglers. |
| **APUSH (to ~123/249 ceiling)** | 08-18 | 08-19 | 08-21 | The 74 articles post on the pool turn; admission pace sets the rest. Full 249 has NO honest date — 126 positions wait on the factory's [intake #90](https://github.com/ilmych/incept-agent-intake/issues/90) answer. |
| **Psych** | 08-21 | 08-24 | no date yet | Bank fill is 1,810 items. Optimistic assumes evidence-based-FRQ generation yields on tonight's measurement. If it is still at zero, the disposition decision resets the clock. |

## Priority order

### P0 · Fleet actions that gate students (days matter)

| # | Item | Owner |
| --- | --- | --- |
| 1 | HumGeo [#659](https://github.com/InceptTrilogy/ap-one/issues/659): serving cutover, deploy/readback, and the release_ready flip (the 68 components + 204 links materialized 08-16) | fleet |
| 2 | HumGeo [#642](https://github.com/InceptTrilogy/ap-one/issues/642): corrective wave for the 57 duplicate-choice-text items (1,750 active children) | fleet, Andy's thread |
| 3 | APWH: publisher credential (absent day 4; gates canonical placement) + [#591](https://github.com/InceptTrilogy/ap-one/issues/591)'s four study-skill lessons | fleet |

### P1 · Minutes of decision, weeks of motion

| # | Item | Owner |
| --- | --- | --- |
| 4 | Psych platform registration: merge the paste-ready psych entry into feedback_courses.json | Ilma |
| 5 | Psych U5 gate: the 27 findings ([psych #2](https://github.com/InceptTrilogy/ap-psychology-fall-2025-v1/issues/2)) — repair or reassign | fleet |
| 6 | HumGeo corpus-apply go once the sealed manifest lands (seal receipt comes to you first) | Josh |
| 7 | APUSH intakes [#90](https://github.com/ilmych/incept-agent-intake/issues/90) + [#89](https://github.com/ilmych/incept-agent-intake/issues/89): any factory reply unfreezes half the course | factory owners |

### P2 · Our volume work, already in motion

| # | Item | Owner |
| --- | --- | --- |
| 8 | Drive the pool chain end to end: HumGeo close-out → APWH 362 + sweep → APUSH 74 → Psych fill | Josh's lanes (automated, receipted) |
| 9 | Measure evidence-based-FRQ yield on Psych's first fill cycles; escalate with data if still zero | Josh's lanes |
| 10 | HumGeo 759-line structural rescreens (741 staged) after the APWH pool turn | Josh's lanes |

### P3 · To schedule, no clock

The QC judge attribution question (which model ruled on 08-15) · the D2 strictness finding it would explain · the APUSH visual-capability sizing conversation if [#90](https://github.com/ilmych/incept-agent-intake/issues/90) stays quiet past 48h.

## Lessons learned last week

An honest accounting. Left: what went wrong or what we tested. Right: how it is applied now, with receipts.

| Lesson learned | Applied going forward |
| --- | --- |
| **We generated a whole corpus without real QC.** The HumGeo bank was minted through the factory's generation route. Its inline checks looked like QC and were not. Half the bank failed when the real sweep ran. | The factory now judges every item inside generation. APWH holds a strict repair-first, judge-once order: 449 repairs applied, zero paid verdicts spent ([commit](https://github.com/ilmych/apwh-build-outputs/commit/5d6fe7e3a7f6d6aeb3b90e1e625763412f8622b2)). Every HumGeo rebuild pass binds to the item's exact bytes ([receipts](https://github.com/joshuadurey-del/ap-ss-evidence/tree/evidence/humgeo/20260816-004715__claude__humgeo--adoption-verifications/claude)). |
| **Sealed plans can go stale against their own sources.** 30 HumGeo slots were sealed against source copies missing already-committed skill tags. It cost a mid-campaign amendment. | Plans now take receipted amendments as first-class input, with a sandbox proof required before execution: 425 prior passes intact, 49 slots selected ([receipts](https://github.com/joshuadurey-del/ap-ss-evidence/tree/evidence/humgeo/20260817-000500__claude__humgeo--amend30-docs/claude)). |
| **We measured our shortcut before trusting it, and it failed.** A local pre-check judge was tested against official verdicts: 35 pairs, 3 votes each, 105 calls. It missed 1 in 5 real failures. | It never gated anything, and as of today it is off entirely — every item goes straight to the factory judge. Standing rule: nothing gets judging authority without measurement. |
| **Both deadlines slipped about a day, for a structural reason.** Four courses share one factory pool in strict series; upstream delay compounds downstream. | The chain is now automated: each lane's close writes a receipt and the next lane fires on it, no human in the handoff ([Stage-4 prep receipts](https://github.com/joshuadurey-del/ap-ss-evidence/tree/evidence/seat/20260817-apush-stage4-prep)). |
| **My agents parked executable work, twice.** Buildable work sat scheduled "after the blocker" when only one command needed the blocker. A lane also halted two hours for a decision the factory contract already answered. | Standing rules force the split: everything buildable builds now; only the truly gated command waits. Receipt: the 30-slot amendment was fully built and proven while its blocker still ran ([timestamps](https://github.com/joshuadurey-del/ap-ss-evidence/tree/evidence/humgeo/20260817-000500__claude__humgeo--amend30-docs/claude)). |
| **Corrective waves need semantic proof, not just structural success.** The fleet's 57-item replacement wave shipped structurally valid twins with contaminated prompts ([#642](https://github.com/InceptTrilogy/ap-one/issues/642)). | Our seal requires a byte-bound official pass per record plus a fingerprint manifest anyone can re-check. #642's own acceptance criteria now demand the same bar — worth making it the standard for every corrective wave. |

### The honest line

HumGeo is hours from sealed-from-our-side; what stands between it and students is fleet work ([#659](https://github.com/InceptTrilogy/ap-one/issues/659) gates, [#642](https://github.com/InceptTrilogy/ap-one/issues/642) cleanup), not authoring. APWH slipped my Sunday bar by a day: receipts land after tonight's batch and sweep, and fleet placement ([#591](https://github.com/InceptTrilogy/ap-one/issues/591)) is the student-facing gate. APUSH is capped near half the course until the factory answers two intakes. Psych jumped forward — all articles done, course hosts locally — but its bank fill carries the one genuine unknown of the week: evidence-based-FRQ yield. If that generator is still dead tonight, the decision comes to you with fresh numbers.
