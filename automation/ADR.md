# ADR: private repository activity trigger

Status: accepted by owner addendum, 2026-08-29.

Addendum, 2026-08-31: every semantic course update also projects the newest
typed event and newest verified repository event into that course's primary
`data.json` claim. `timeline.js` and the course-page renderer consume those exact
fields, so one transaction advances the feed, overview, and course page together.
The projection is display evidence only: it does not alter formal lifecycle
status or closure credit. The dashboard snapshot is derived from the newest
projected evidence timestamp; automation commit time never rejuvenates it.

Addendum, 2026-08-31: needs-human uses the existing signed local-dispatch
corridor. The same `course-event` repository dispatch accepts either the existing
event batch or an exact `needs-human-public/v1` document; both are signed with the
existing HMAC secret. The receiver rejects older or equal-timestamp conflicting
projections and stages `needs-human.json` in its serialized workflow. The browser
still rejects missing, older-than-24-hour, oversized-title, or unexpected-field
projections and constructs the strip with DOM text nodes. The existing
event-source permission HOLD remains closed; no new webhook host, App installation,
source-repository workflow, daemon, or polling loop is added.

Phase A uses one dashboard-owned GitHub Actions workflow. A ten-minute schedule
is the fallback trigger; `repository_dispatch` type `course-event` runs the same
workflow ahead of schedule. For the local log leg, `client_payload` contains
`document` and `signature`. The document schema is
`dashboard-local-event-batch/v1` with 1-80 events. Each event contains exactly
`schema`, `delivery_id`, `ts`, `course`, `phase`, `kind`, public-safe `text`,
`backfill`, and SHA-256 `ref_hashes`. The signature is HMAC-SHA256 over canonical
compact JSON using `LOCAL_EVENT_DISPATCH_SECRET`. Raw rows, actors, refs,
receipts, and paths never cross the boundary. Row IDs deduplicate deliveries;
hashed refs suppress a local projection when the same fact has current GitHub
evidence. The workflow always re-reads every inventory repository before deciding.

The monitored inventory is an Actions secret. Polling consumes GitHub's repository
event stream (pushes, pull-request actions and reviews, issue actions and comments,
releases, and other repository events) plus completed workflow runs. Shared-repo
events are classified privately from their metadata; titles, bodies, and messages
never enter the public projection. The stable cursor is committed here
as SHA-256 values only, so it discloses neither private repository names nor local
row IDs. Concurrent runs serialize under one workflow concurrency key. Public rows are derived only from validated
repository name, event type, number, SHA, timestamp, conclusion, and GitHub URL;
titles, bodies, messages, webhook payloads, tokens, and receipt paths are dropped.
After a verified push, the workflow explicitly requests the dashboard's legacy
Pages build; it does not infer asynchronous serving completion.

`tools/course_events.py append` sends the newly validated row. Its one-shot
`reconcile` command sends existing valid rows in bounded batches, allowing missed
deliveries to replay without a daemon or polling loop. Backfill rows baseline as
NOOP. A malformed local log is a typed
`DASHBOARD_AUTOMATION_EVENTS_LOG_INVALID` HOLD naming the line locally.

Phase B replaces the classic read PAT with short-lived read-only installation
tokens as repository owners install the public GitHub App. An external webhook
receiver is optional and remains separately gated.
