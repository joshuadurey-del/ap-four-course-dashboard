# AP Four-Course Dashboard
Live standings for the four AP courses (HumGeo, APWH, APUSH, Psych).
Hosted on GitHub Pages: every commit to main redeploys the site.

- `data.json` — claims manifest (same as the agent accounting file)
- `updates.json` — the "most recent updates" feed (append new entries at the TOP: `{"ts":"YYYY-MM-DDTHH:MMZ","course":"...","text":"..."}`)
- Course pages are static HTML; the overview and claims explorer render from the JSON.
- `timeline.js` — shared active-course gate rail, simple status/next-step cards, and per-course evidence maps.

Display model: each overview card shows only the course's current TimeBack gate and next governed step, followed by the shared 12-gate rail for the active course. Detailed counts and receipts stay on course pages, where existing work maps to its exact credit home. Mapped evidence earns no gate credit without a course-approved closure receipt.

Runbook alignment: owner direction on 2026-08-23 establishes Ilma's AP One native TimeBack runbook as the publication source of truth for all four courses. Local Gates 0-3 stabilize work, lock source scope, inventory existing assets, and accept the source. Gates 4-11 then bind the course profile, seal the offline graph and all-absent plan, publish dark, enroll canaries, activate privately, run fresh-learner acceptance, and approve broader enrollment. Publication, enrollment, activation, learner acceptance, and release remain separate operators.

Preservation rule: accepted historical receipts are never renumbered or rewritten. Their exact byte/count claims move to a new credit home, stale evidence remains historical, and only changed inputs or contracts are re-verified. HumGeo Gates 0-3 and APWH Gate 1 keep closure credit; APWH Gate 2 keeps all read-only evidence but remains open on nine blueprint clauses. APUSH and Psychology keep their blueprint, inventory, QC, media, and assembly evidence while their current baselines are established.

Target rule: Learning Science has its own review process. The current handoff is earned when reviewers can access a pinned candidate and walk a representative course path, with any review-blocking defect disclosed and a feedback owner named. Course-specific blueprint measures, inherited QC provenance, and gap accounting remain internal build controls, not an LS intake packet. LS REVIEW READY is not LS approval, post-review revision, production release, or proof of canonical phase completion.

Authority rule: the lane-bound blueprint is the normative course-design source, current factory service contracts govern content actions, and Ilma's native TimeBack runbook governs publication order. A historical or base-branch receipt does not clear newer course bytes. Production delivery requires a sealed plan, exact authority, checkpoint, readback, and zero-write replay before a fresh signed-in learner walk.

Status rule: prepared, factory-accepted, merged, deployed, and released are separate claims. Historical or locked-gate evidence remains visible but does not change the gate state. Link recovery findings to the durable private packet in `joshuadurey-del/ap-ss-evidence`; do not cite machine-local audit paths as the only evidence.

Public-repo boundary: never paste machine-local paths, private handoffs, credential detail, or private receipt bodies into this repository. Keep operational handoffs inside the Alpha workspace; this site carries only the public-safe status view.

Update flow: edit the JSON (and any page text), commit, push. Pages redeploys in about a minute.
