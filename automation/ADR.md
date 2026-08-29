# ADR: private repository activity trigger

Status: accepted by owner addendum, 2026-08-29.

Phase A uses one dashboard-owned GitHub Actions workflow. A ten-minute schedule
is the fallback trigger; `repository_dispatch` type `course-event` runs the same
workflow ahead of schedule. The local `events.jsonl` sender may include only a
private correlation ID in `client_payload`; the workflow never trusts that
payload as source evidence and always re-reads all ten repositories through the
credentialed GitHub API.

The monitored inventory and stable cursor live in private `ap-ss-evidence`.
Every run writes a private RUNNING receipt before public projection and changes
the cursor only after an exact dashboard push readback. Concurrent runs serialize
under one workflow concurrency key. Public rows are derived only from validated
repository name, event type, number, SHA, timestamp, conclusion, and GitHub URL;
titles, bodies, messages, webhook payloads, tokens, and receipt paths are dropped.
After a verified push, the workflow explicitly requests the dashboard's legacy
Pages build and records the returned build ID; it does not infer asynchronous
serving completion.

Phase B replaces the classic read PAT with short-lived read-only installation
tokens as repository owners install the public GitHub App. An external webhook
receiver is optional and remains separately gated.
