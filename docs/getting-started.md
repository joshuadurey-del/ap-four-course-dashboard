# Setup & everyday use

[← Incept Course Builder](../README.md) · [About](https://joshuadurey-del.github.io/incept-course-builder/about.html) · [Agent runbook (team access)](https://github.com/InceptTrilogy/ap-four-course-dashboard/blob/main/course-runbook/START.md)

## Before you start

- A Mac and an internet connection for the first install.
- A GitHub account with a **verified `@alpha.school` email** and access to the [private InceptTrilogy package](https://github.com/InceptTrilogy/ap-four-course-dashboard).
- Your preferred agent and its model access. Setup can also produce a portable prompt for another host.

## Install

Paste this into Terminal:

```bash
curl -fsSL https://joshuadurey-del.github.io/incept-course-builder/install.sh | bash
```

The installer checks your machine, reuses installed tools, and downloads missing runtime components into the app directory. It requires no administrator password or shell-profile edit. Onboarding happens in Terminal: GitHub sign-in, course name, agent choice, then dashboard or agent launch.

Your dashboard runs locally while its Terminal command is open. **Ctrl+C** closes the server; your workspace remains saved.

## Everyday commands

```bash
~/.local/bin/incept-course-builder          # Open your local dashboard
~/.local/bin/incept-course-builder build    # Start your selected agent
~/.local/bin/incept-course-builder onboard  # Change your course or agent
~/.local/bin/incept-course-builder scan     # Inspect tools without an agent call
```

Choose **Claude Code**, **Codex**, **Hermes**, a custom local command, or a portable prompt during onboarding. Automated execution needs an agent with filesystem and terminal tools. Keep using your existing model credentials and subscription; the builder does not provide model access.

## What the agent does first

The [compact entry point](https://github.com/InceptTrilogy/ap-four-course-dashboard/blob/main/course-runbook/START.md) leads into fresh course discovery, a population coverage table, and a dependency plan. The agent reconciles current native evidence before selecting work. Missing measurements stay `UNMEASURED`.

The [operating context](https://github.com/InceptTrilogy/ap-four-course-dashboard/blob/main/course-runbook/operating-context.json) covers source access and existing authority. The [decision cards](https://github.com/InceptTrilogy/ap-four-course-dashboard/blob/main/course-runbook/decisions.json) guide dispatch, review, retries, integration, release readiness and reporting. Setup does not grant spend or publication authority. The current course runbook and native gates govern execution.

## Skills & factory tooling

The private release bundles the official [Content Factory skillpack](https://content-factory.inceptstore.com/#download) and workflow skills with their scripts and references. After download, bundled skill setup works offline: missing skills are copied, custom files are preserved, and version differences are reported.

Native repositories, service credentials and course configuration are resolved from current factory instructions. Installing the builder alone does not configure every course service.

## GitHub sign-in

The installer uses GitHub CLI’s browser OAuth flow. It requests `user:email` to check your verified work email; existing logins request this scope only when needed. Tokens and email lists are not saved in installer logs or settings.

If your work email is missing, add and verify it in [GitHub email settings](https://github.com/settings/emails), then rerun the installer. It does not need to be your primary email. A verified email and access to the private repository are separate requirements.

An environment token must already provide email-read and repository access. Browser consent cannot expand an externally supplied token. If GitHub sign-in succeeds but package download fails, check that the same account can open the private repository.

## Update or remove

**Update:** rerun the install command. Settings, course work and existing skills are preserved. Changed managed release files are left for review rather than silently overwritten.

**Remove:** back up any course work first. Then remove the app directory at `~/.local/share/incept-course-builder` and the launcher at `~/.local/bin/incept-course-builder`. Runtime dependencies installed by this app are contained in its directory.

## Privacy

The public repository serves the dashboard, published observations, product documentation and install entry point. The private repository contains the builder package and agent resources. Course content, credentials and local checkpoints are not served by the public site. Agent and factory calls use the services configured for your authorized workflow.
