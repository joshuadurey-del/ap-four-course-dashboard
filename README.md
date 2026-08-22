# AP Four-Course Dashboard
Live standings for the four AP courses (HumGeo, APWH, APUSH, Psych).
Hosted on GitHub Pages: every commit to main redeploys the site.

- `data.json` — claims manifest (same as the agent accounting file)
- `updates.json` — the "most recent updates" feed (append new entries at the TOP: `{"ts":"YYYY-MM-DDTHH:MMZ","course":"...","text":"..."}`)
- Course pages are static HTML; the overview and claims explorer render from the JSON.
- `timeline.js` — shared active-course gate rail, course work-footprint cards, and per-course evidence maps.

Display model: the overview shows all four courses as quantified work footprints, then shows the seven-gate rail for the active course. Course pages map already-published work to the gate where it most likely belongs. Unlike units are never summed, empty gates are omitted, and mapped evidence earns no gate credit without a course-approved closure receipt.

HumGeo exception: owner direction on 2026-08-21 replaced that course's sprint routing with seven sequential completion gates: stabilize → scope → inventory → factory gap fill → land/assemble → learner proof → release. At most one gate may be active, and closing a gate does not automatically open its successor. The HumGeo page and `humgeo.completion.gates` claim govern its dashboard routing; percentages, 150-as-question-count, and retired W6/W7 labels do not.

APWH exception: owner direction on 2026-08-22 established six completion gates with optional Gate 0: scope → inventory → factory gap fill → land/assemble → learner proof → release. Gate 1 is closed locally on pinned exact-set evidence; Josh explicitly opened Gate 2 for read-only inventory. Its first exhaustive live-bank packet is fail-closed pending a sanctioned measurement corridor, and Gate 3 remains locked. Accepted-bank, projection, serving, and release claims remain separate.

Target rule: Learning Science has its own review process. The current handoff is earned when reviewers can access a pinned candidate and walk a representative course path, with any review-blocking defect disclosed and a feedback owner named. Course-specific blueprint measures, inherited QC provenance, and gap accounting remain internal build controls, not an LS intake packet. LS REVIEW READY is not LS approval, post-review revision, production release, or proof of canonical phase completion.

Authority rule: the lane-bound blueprint is the normative course-design source, while current factory service contracts govern sanctioned actions. A historical or base-branch blueprint receipt does not clear newer course bytes. Production delivery still requires a course-owned sealed package and action-bound authorization/readback/recovery, and release still requires a dated signed-in learner walk.

Status rule: prepared, factory-accepted, merged, deployed, and released are separate claims. Historical or locked-gate evidence remains visible but does not change the gate state. Link recovery findings to the durable private packet in `joshuadurey-del/ap-ss-evidence`; do not cite machine-local audit paths as the only evidence.

Public-repo boundary: never paste machine-local paths, private handoffs, credential detail, or private receipt bodies into this repository. Keep operational handoffs inside the Alpha workspace; this site carries only the public-safe status view.

Update flow: edit the JSON (and any page text), commit, push. Pages redeploys in about a minute.
