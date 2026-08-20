# AP Four-Course Dashboard
Live standings for the four AP courses (HumGeo, APWH, APUSH, Psych).
Hosted on GitHub Pages: every commit to main redeploys the site.

- `data.json` — claims manifest (same as the agent accounting file)
- `updates.json` — the "most recent updates" feed (append new entries at the TOP: `{"ts":"YYYY-MM-DDTHH:MMZ","course":"...","text":"..."}`)
- Course pages are static HTML; the overview and claims explorer render from the JSON.
- `timeline.js` — shared current recovery loci and focused-work ranges to LS REVIEW READY. A range is active work under named assumptions; it is never a release date.

Sprint model: the dashboard uses four planning stages — **bind review target → build candidate → measure and preflight → make accessible to Learning Science → LS REVIEW READY**. These are dashboard terms, not asserted factory phase names. Course markers are labeled **current recovery locus** and never prove every earlier factory phase cleared.

Target rule: Learning Science has its own review process. The current handoff is earned when reviewers can access a pinned candidate and walk a representative course path, with any review-blocking defect disclosed and a feedback owner named. The roughly 80% blueprint measure, inherited QC provenance, and gap accounting remain internal build controls, not an LS intake packet. LS REVIEW READY is not LS approval, post-review revision, production release, or proof of canonical phase completion.

Authority rule: the lane-bound blueprint is the normative course-design source, while current factory service contracts govern sanctioned actions. A historical or base-branch blueprint receipt does not clear newer course bytes. Production delivery still requires a course-owned sealed package and action-bound authorization/readback/recovery, and release still requires a dated signed-in learner walk.

Status rule: prepared, factory-accepted, merged, deployed, and released are separate claims. Link recovery findings to the durable private packet in `joshuadurey-del/ap-ss-evidence`; do not cite machine-local audit paths as the only evidence.

Public-repo boundary: never paste machine-local paths, private handoffs, credential detail, or private receipt bodies into this repository. Keep operational handoffs inside the Alpha workspace; this site carries only the public-safe status view.

Update flow: edit the JSON (and any page text), commit, push. Pages redeploys in about a minute.
