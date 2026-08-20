# AP Four-Course Dashboard
Live standings for the four AP courses (HumGeo, APWH, APUSH, Psych).
Hosted on GitHub Pages: every commit to main redeploys the site.

- `data.json` — claims manifest (same as the agent accounting file)
- `updates.json` — the "most recent updates" feed (append new entries at the TOP: `{"ts":"YYYY-MM-DDTHH:MMZ","course":"...","text":"..."}`)
- Course pages are static HTML; the overview and claims explorer render from the JSON.
- `timeline.js` — shared course stage and recovery-work ranges. A range starts only after its named unblock; it is never a release date.

Production model: the factory's seven phases — **CED → validated KG + videos → articles per concept → questions per CED type + point structure → video wiring → difficulty + metadata tagging → SME/persona review + fixes → publish/wire into AP One** — followed by separate **Human Learning Science review** and **Release** gates. Persona review is Phase 6; it does not count as whole-course human clearance. Phase 7 requires a course-owned sealed package and action-bound authorization/readback/recovery; another course's delivery receipt never transfers. Release still requires a dated signed-in learner walk.

Status rule: prepared, factory-accepted, merged, deployed, and released are separate claims. Link recovery findings to the durable private packet in `joshuadurey-del/ap-ss-evidence`; do not cite machine-local audit paths as the only evidence.

Public-repo boundary: never paste machine-local paths, private handoffs, credential detail, or private receipt bodies into this repository. Keep operational handoffs inside the Alpha workspace; this site carries only the public-safe status view.

Update flow: edit the JSON (and any page text), commit, push. Pages redeploys in about a minute.
