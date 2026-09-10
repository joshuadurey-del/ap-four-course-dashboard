# Incept Course Builder

A local workspace for Alpha course building, with native tools, selected agents, and visible evidence.

[Public dashboard](https://joshuadurey-del.github.io/ap-four-course-dashboard/) · [About and setup](https://joshuadurey-del.github.io/ap-four-course-dashboard/about.html) · [Private agent guide](https://github.com/InceptTrilogy/ap-four-course-dashboard/blob/main/course-runbook/START.md)

## Install on macOS

Run in Terminal:

```bash
curl -fsSL https://joshuadurey-del.github.io/ap-four-course-dashboard/install.sh | bash
```

Sign in with an authorized Alpha/Incept GitHub account, name your course, and select Codex, Claude Code, Hermes, another tool-capable local agent, or a portable prompt. Setup reuses existing tools. Model subscriptions, native service credentials, and course execution permissions remain separate.

```bash
~/.local/bin/incept-course-builder scan
~/.local/bin/incept-course-builder build
```

Open the local dashboard later with `~/.local/bin/incept-course-builder`. Re-run the installer to update; settings and course work are preserved.

## GitHub access

The installer requires a verified `@alpha.school` email and access to the private InceptTrilogy package. It uses GitHub CLI's browser OAuth flow and requests `user:email` to verify the email. Existing logins request the extra permission only when needed. Tokens and email lists are not stored in installer logs or settings.

If needed, add and verify your work email in [GitHub email settings](https://github.com/settings/emails). It does not need to be the primary email. An environment token must independently provide email-read and repository access; browser consent cannot expand that token's permissions.

## How the views work

**Align · Synthesize · Assemble · Prove** group the native course process for navigation. Each course keeps its own tools, acceptance requirements, source dates, and authority. A passing content bank proves only that population. Missing measurements remain `UNMEASURED`; activity and phase labels do not establish whole-course readiness.

The builder uses course-specific skills and native workflows. Required human acceptance and release decisions remain explicit.

## Public and private boundaries

This repository contains the read-only public dashboard, its published observations, and the installer entry point. The private package and course-building resources require authorized access. Course content, credentials, local checkpoints, and private runbook payloads are not served by this site.

| Resource | Purpose |
| --- | --- |
| [Overview](https://joshuadurey-del.github.io/ap-four-course-dashboard/) | Published course positions and their freshness |
| [Claims](https://joshuadurey-del.github.io/ap-four-course-dashboard/claims.html) | Source-bound evidence and scope |
| [Lessons](https://joshuadurey-del.github.io/ap-four-course-dashboard/lessons.html) | Operational lessons and their checks |
| [About](https://joshuadurey-del.github.io/ap-four-course-dashboard/about.html) | Installation, workflow, privacy, and authority |
| [Private agent guide](https://github.com/InceptTrilogy/ap-four-course-dashboard/blob/main/course-runbook/START.md) | Authorized workspace and agent entry point |

## Local UI checks

```bash
node --check timeline.js
node timeline.js
node updates.js
node test_asap_ui.cjs
```

With Playwright available in the existing local runtime, `node test_asap_ui.cjs --browser` also checks drawers, keyboard controls, filters, mobile layout, and unavailable inputs using synthetic data.
