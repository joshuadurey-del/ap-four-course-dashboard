# AP Four-Course Dashboard
Live standings for the four AP courses (HumGeo, APWH, APUSH, Psych).
Hosted on GitHub Pages: every commit to main redeploys the site.

- `data.json` — claims manifest (same as the agent accounting file)
- `updates.json` — the "most recent updates" feed (append new entries at the TOP: `{"ts":"YYYY-MM-DDTHH:MMZ","course":"...","text":"..."}`)
- Course pages are static HTML; the overview and claims explorer render from the JSON.
- `timeline.js` — shared all-course status/landed/next-step cards and per-course evidence maps.

Display model: the Overview shows all four courses under `ASAP edition (2026-09-01)`. Each card names the re-earned position, landed or measured work, and the next governed step. Queued work never renders as phase credit.

Automation-grade overview: the needs-human projection is shown first, followed by a requirements-only automation frontier and compact course cards. Each course card reads its typed `next_step` from the course's `*.blueprint.audit` claim, keeps the in-script prose fallback, and visibly ages the status chip from that claim's timestamp. The claim-local `freshness_limit_hours` is 24; missing or older measurements render gray and `STALE`, never silently green. Rate tiles are derived only from `updates.json`; days in gate is `UNMEASURED` until an explicit `state-change` row exists.

Runbook alignment: `p0` and `p4` are cut; `p1-2` tree and pricing is done for all four; the active route is `content → p3 → p5 → p6 → p7 → p8`. `process.json` carries the parsed phase objects, while `crosswalk.json` alone preserves the original names as old-to-new mappings.

Preservation rule: accepted historical receipts are never promoted into the current model by wording alone. Historical feed rows keep their timestamp and bounded evidence; the crosswalk records translation, and each current course position is re-earned from its dated plan.

Authority rule: the lane-bound blueprint remains the course-design source, current factory service contracts govern content actions, and the publication runbook, ASAP edition, 2026-09-01 governs order. A historical or base-branch receipt does not clear newer course bytes.

Status rule: prepared, factory-accepted, merged, deployed, and released are separate claims. Historical or locked-gate evidence remains visible but does not change the gate state. Link recovery findings to the durable private packet in `joshuadurey-del/ap-ss-evidence`; do not cite machine-local audit paths as the only evidence.

Public-repo boundary: never paste machine-local paths, private handoffs, credential detail, or private receipt bodies into this repository. Keep operational handoffs inside the Alpha workspace; this site carries only the public-safe status view.

Update flow: `.github/workflows/dashboard-repo-poll.yml` polls the ten private
source repositories every ten minutes and on `repository_dispatch: course-event`.
It persists cursors and receipts in private `joshuadurey-del/ap-ss-evidence`, then
commits verified, public-safe activity rows and projects each course's newest
typed event and repository event into its primary `data.json` claim. `timeline.js`
and every course page render that projection, so the feed, overview card, and
course-page current section advance together. Formal lifecycle status and closure
credit remain manual and verifier-bound. The snapshot clock is the newest evidence
timestamp, never the later automation commit time. Setup and credential boundaries:
`automation/README.md`.

Needs-human transport: the existing signed `course-event` dispatch carries the exact `needs-human-public/v1` document after every add, resolve, or explicit project. The serialized dashboard receiver accepts only newer projections; older redeliveries no-op and equal-timestamp conflicts hold. Manual `fold-needs-human` remains the recovery path. The committed copy contains only the public schema, and the renderer holds on missing, stale, oversized, or unexpected input. This does not reopen event-source ingress or add a host, App, source workflow, daemon, or polling loop.
