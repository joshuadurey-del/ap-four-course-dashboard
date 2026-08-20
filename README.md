# AP Four-Course Dashboard
Live standings for the four AP courses (HumGeo, APWH, APUSH, Psych).
Hosted on GitHub Pages: every commit to main redeploys the site.

- `data.json` — claims manifest (same as the agent accounting file)
- `updates.json` — the "most recent updates" feed (append new entries at the TOP: `{"ts":"YYYY-MM-DDTHH:MMZ","course":"...","text":"..."}`)
- Course pages are static HTML; the overview and claims explorer render from the JSON.
- `timeline.js` — shared course stage and recovery-work ranges. A range starts only after its named unblock; it is never a release date.

Process model: the dashboard shows audit evidence gates — **bind blueprint → build current bytes → reconcile and accept → required named human dispositions → bind and deliver → serve and read back → release**. These are not asserted to be the factory's canonical phase names or a strictly serial production protocol. The onboarding packet points to a seven-phase playbook, but a current factory-blessed copy or successor is not pinned in the accessible repositories. Course markers are therefore labeled **current recovery locus** and never prove every earlier gate cleared.

Authority rule: the lane-bound blueprint is the normative course-design source, not a complete execution protocol. Current factory service contracts govern sanctioned actions. A historical or base-branch blueprint receipt does not clear newer course bytes. Persona/model review is not named human clearance; human-review timing follows the current factory contract once pinned. Delivery requires a course-owned sealed package and action-bound authorization/readback/recovery, and release still requires a dated signed-in learner walk.

Status rule: prepared, factory-accepted, merged, deployed, and released are separate claims. Link recovery findings to the durable private packet in `joshuadurey-del/ap-ss-evidence`; do not cite machine-local audit paths as the only evidence.

Public-repo boundary: never paste machine-local paths, private handoffs, credential detail, or private receipt bodies into this repository. Keep operational handoffs inside the Alpha workspace; this site carries only the public-safe status view.

Update flow: edit the JSON (and any page text), commit, push. Pages redeploys in about a minute.
