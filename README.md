# AP Four-Course Dashboard
Live standings for the four AP courses (HumGeo, APWH, APUSH, Psych).
Hosted on GitHub Pages: every commit to main redeploys the site.

- `data.json` — claims manifest (same as the agent accounting file)
- `updates.json` — the "most recent updates" feed (append new entries at the TOP: `{"ts":"YYYY-MM-DDTHH:MMZ","course":"...","text":"..."}`)
- Course pages are static HTML; the overview and claims explorer render from the JSON.
- `timeline.js` — shared course stage and recovery-work ranges. A range starts only after its named unblock; it is never a release date.

Production model: four stages — **Define & scope → Build & assemble → Validate & seal → Publish & integrate** — followed by separate **Internal review** and **Release** gates. Specialist queueing and component sampling may start earlier, but the course-level Internal review gate follows serving-layer readiness; findings loop back into the relevant production stage. Partial, persona, and model reviews do not count as whole-course human clearance. Stage 4 requires a course-owned sealed package and action-bound authorization/readback/recovery; another course's delivery receipt never transfers. Release still requires a dated signed-in learner walk.

Status rule: prepared, factory-accepted, merged, deployed, and released are separate claims. Link recovery findings to the durable private packet in `joshuadurey-del/ap-ss-evidence`; do not cite machine-local audit paths as the only evidence.

Public-repo boundary: never paste machine-local paths, private handoffs, credential detail, or private receipt bodies into this repository. Keep operational handoffs inside the Alpha workspace; this site carries only the public-safe status view.

Update flow: edit the JSON (and any page text), commit, push. Pages redeploys in about a minute.
