# Private-repository activity automation

Phase A polls the ten private source repositories every ten minutes and on
`repository_dispatch: course-event`. It reads with a classic owner PAT, keeps an
opaque hashed cursor in this repository, and appends only derived, public-safe
activity rows to `updates.json`. Titles, bodies, commit
messages, webhook bodies, tokens, and receipt paths never enter this repository.
The monitored private-repository inventory is an Actions secret.

Required Actions secrets:

- `SOURCE_REPO_READ_TOKEN` — owner-minted classic PAT with `repo` read access.
- `SOURCE_REPOSITORY_INVENTORY_JSON` — `dashboard-source-inventory/v1` JSON
  mapping private `owner/repo` names to `humgeo`, `apwh`, `apush`, `psych`, or
  `cross`.
- `LOCAL_EVENT_DISPATCH_SECRET` — HMAC secret shared only with the local INCEPT
  appender through macOS Keychain.

Set each secret interactively; never place its value on a command line:

```sh
gh secret set SOURCE_REPO_READ_TOKEN -R joshuadurey-del/ap-four-course-dashboard
gh secret set SOURCE_REPOSITORY_INVENTORY_JSON -R joshuadurey-del/ap-four-course-dashboard
```

After all three secrets exist, enable the workflow:

```sh
gh variable set DASHBOARD_AUTOMATION_ENABLED --body true -R joshuadurey-del/ap-four-course-dashboard
```

Set that variable to `false` for the kill switch. The workflow explicitly
requests a legacy Pages build after each verified dashboard push. Serving
completes asynchronously and is verified separately.

The first successful run publishes only the newest verified event per repository
and baselines all observed cursor keys. Later runs publish unseen events, capped at
40 rows per run; overflow remains unprocessed for the next run. Single-writer
workflow concurrency and evidence-URL dedup prevent duplicate commits. Actual
event-to-decision latency is recorded by each run; the ten-minute schedule is a
target, not a promise.

Local landings use authenticated `repository_dispatch: course-event`. The
receipt-free signed payload contract is fixed in `automation/ADR.md`; hashed row
IDs are persisted with the dashboard cursor. Local `backfill` rows baseline as NOOP, and the
course pages compute “Last local landing” from the newest projected row timestamp.

Phase B replaces `SOURCE_REPO_READ_TOKEN` repo by repo with short-lived,
read-only GitHub App installation tokens. External real-time webhook ingress is
not required and remains separately gated.
