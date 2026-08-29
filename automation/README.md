# Private-repository activity automation

Phase A polls the ten private source repositories every ten minutes and on
`repository_dispatch: course-event`. It reads with a classic owner PAT, writes
cursor/receipts only to private `joshuadurey-del/ap-ss-evidence`, and appends only
derived, public-safe activity rows to `updates.json`. Titles, bodies, commit
messages, webhook bodies, tokens, and receipt paths never enter this repository.
The monitored inventory is private at
`dashboard-automation/v1/inventory.json` in the evidence repo.

Required Actions secrets:

- `SOURCE_REPO_READ_TOKEN` — owner-minted classic PAT with `repo` read access.
- `EVIDENCE_REPO_WRITE_TOKEN` — separate fine-grained PAT scoped only to
  `joshuadurey-del/ap-ss-evidence`, Contents read-write.

Set each secret interactively; never place its value on a command line:

```sh
gh secret set SOURCE_REPO_READ_TOKEN -R joshuadurey-del/ap-four-course-dashboard
gh secret set EVIDENCE_REPO_WRITE_TOKEN -R joshuadurey-del/ap-four-course-dashboard
```

After both secrets exist, enable the workflow:

```sh
gh variable set DASHBOARD_AUTOMATION_ENABLED --body true -R joshuadurey-del/ap-four-course-dashboard
```

Set that variable to `false` for the kill switch. The workflow explicitly
requests a legacy Pages build after each verified dashboard push and stores the
returned build ID in its private receipt. Serving completes asynchronously, so
the receipt leaves event-to-served latency `UNMEASURED` until separately observed.

The first successful run publishes only the newest verified event per repository
and baselines all observed cursor keys. Later runs publish unseen events, capped at
40 rows per run. Single-writer workflow concurrency and evidence-URL dedup prevent
duplicate commits. Actual event-to-decision latency is recorded by each run; the
ten-minute schedule is a target, not a promise.

Phase B replaces `SOURCE_REPO_READ_TOKEN` repo by repo with short-lived,
read-only GitHub App installation tokens. External real-time webhook ingress is
not required and remains separately gated.
