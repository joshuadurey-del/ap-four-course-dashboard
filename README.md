# AP Four-Course Dashboard

[Open the dashboard](https://joshuadurey-del.github.io/ap-four-course-dashboard/) · [Open the private Alpha course-building runbook](https://github.com/InceptTrilogy/ap-four-course-dashboard/blob/main/course-runbook/START.md)

This repository serves the public dashboard at its original address. The private runbook and investigation remain in `InceptTrilogy/ap-four-course-dashboard`. Sign in to GitHub with an authorized Alpha/Incept account to open the runbook.

The restored dashboard retains its previously published data and observation dates. Restoring access does not refresh course status. This recovery does not install a recurring activity poller.

## Install Incept Course Builder on your Mac

```bash
curl -fsSL https://joshuadurey-del.github.io/ap-four-course-dashboard/install.sh | bash
```

Setup runs in Terminal, then opens a dashboard on your own Mac. Choose Claude Code, Codex, Hermes, another tool-capable local agent, or a portable prompt. Existing tools are reused. Sign in with an Alpha/Incept GitHub account that can read the private package.

Open it later with `~/.local/bin/incept-course-builder`. Re-run the command to update; settings and course work are preserved. No model subscription is included.

## GitHub sign-in

Use a GitHub account with a **verified `@alpha.school` email** and access to the private InceptTrilogy repository. The installer uses GitHub CLI’s browser OAuth flow and requests `user:email` to check verification. Existing logins request the extra permission only if needed. Email lists and tokens are not stored in installer logs or settings.

If your work email is not linked, add and verify it at [GitHub email settings](https://github.com/settings/emails), then rerun. It does not need to be your primary email. Environment tokens must independently include email-read and repository access; browser consent cannot expand an externally supplied token. Repository permissions remain the private-package access boundary.

The installer now uses a large Incept Terminal wordmark and warm colors, with a compact display for narrow windows and `NO_COLOR` support. The private local dashboard shows the tools actually installed on your Mac.
