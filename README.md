# AP Four-Course Dashboard
Live standings for the four AP courses (HumGeo, APWH, APUSH, Psych).
Hosted on GitHub Pages: every commit to main redeploys the site.

- `data.json` — claims manifest (same as the agent accounting file)
- `updates.json` — the "most recent updates" feed (append new entries at the TOP: `{"ts":"YYYY-MM-DDTHH:MMZ","course":"...","text":"..."}`)
- Course pages are static HTML; the overview and claims explorer render from the JSON.
- `timeline.js` — shared course stage and recovery-work ranges. A range starts only after its named unblock; it is never a release date.

Status rule: prepared, factory-accepted, merged, deployed, and released are separate claims. Link recovery findings to the durable private packet in `joshuadurey-del/ap-ss-evidence`; do not cite machine-local audit paths as the only evidence.

Update flow: edit the JSON (and any page text), commit, push. Pages redeploys in about a minute.
