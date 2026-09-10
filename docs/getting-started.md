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

**Watch progress in your customized dashboard.** It updates as your agent saves coverage, completed work and its next action. The dashboard runs independently through macOS: closing Terminal or navigating away does not stop it. Reopen the same local address to see saved progress. Run `incept-course-builder build` to resume the agent; the dashboard itself stays available after that session ends.

The public Courses page is a shared reference, not your installed workspace. Local dashboard refreshes read saved progress only; they do not launch work or call paid services.

## When something is needed from you

Your agent resolves ordinary setup, retries and workflow choices. It reuses existing access and authorization. A missing-input request must give you one concrete action, such as a hidden-input Terminal command or the existing service's browser sign-in. If you do not have access, it provides the verified retrieval steps, access owner or request channel, and a prepared message. Never paste secrets into chat or the dashboard.

The request gate checks agent reports and what appears in the local dashboard. Local agent hosts must follow the bundled instruction to run it before speaking; the builder cannot intercept every host's conversation. Native spending limits, access checks and required release approvals still apply.

## Everyday commands

```bash
~/.local/bin/incept-course-builder          # Open your local dashboard
~/.local/bin/incept-course-builder build    # Start your selected agent
~/.local/bin/incept-course-builder onboard  # Change your course or agent
~/.local/bin/incept-course-builder scan     # Inspect tools offline
~/.local/bin/incept-course-builder connect  # Check native connections; no course work
~/.local/bin/incept-course-builder stop     # Stop only the dashboard; preserve course work
```

Choose **Claude Code**, **Codex**, **Hermes**, a custom local command, or a portable prompt during onboarding. Automated execution needs an agent with filesystem and terminal tools. Keep using your existing model credentials and subscription; the builder does not provide model access.

## Connect the native stack

Run `incept-course-builder connect` for read-only connection checks, or `incept-course-builder build` to check and continue with your agent. The agent resolves existing course repository, AWS profile, S3 prefix and native publish configuration; only references go in `workspace/connections.config.json`. Credentials stay with their existing providers. `CONNECTIONS.json` supplies a dated connection report to the local dashboard and agent. Source coverage and learner acceptance still require their native verifiers.

## From zero to a complete course

You can start with a brief: **“Build an AP Biology course from scratch for Grade 11, aligned to the current CED, through verified publication.”** Supply the audience, standards, source materials you have, intended outcome and operating budget. The agent identifies any missing inputs and existing authority before execution.

1. **Blueprint:** establish standards, learning outcomes, units, lessons, assessment coverage and source requirements. An empty workspace starts here; a missing blueprint is work to plan, not a reason to assume the course is nearly complete.
2. **Content:** use Content Factory’s native skills and services to generate and check the required teaching, practice and assessment content; prepare media through its owning tools. Prove one representative route before scaling independent work.
3. **Assembly:** continuously integrate accepted content in the course repository; build native assets and bind the S3 and TimeBack delivery configuration.
4. **Publication and proof:** run the current course-owned publication route, then verify the complete learner experience and required acceptance.

An existing course starts with a fresh inventory and reuses valid completed work. Both paths follow the [agent runbook](https://github.com/InceptTrilogy/ap-four-course-dashboard/blob/main/course-runbook/START.md) and update your customized dashboard after meaningful progress. Native evidence, not the refresh timer, establishes completion.

The complete course is the target. The builder is an agent workspace and runbook, not proof that any arbitrary course can already publish unattended. New courses still need a conforming native blueprint, validators and publication configuration. The agent resolves or plans those missing capabilities instead of reusing another course’s IDs. Current spend permissions, human walkthroughs and release decisions remain binding; setup does not grant them.

## Skills & factory tooling

The private release bundles the official [Content Factory skillpack](https://content-factory.inceptstore.com/#download) and workflow skills with their scripts and references. After download, bundled skill setup works offline: missing skills are copied, custom files are preserved, and version differences are reported.

Native repositories, service credentials and course configuration are resolved from current factory instructions. Installing the builder alone does not configure every course service.

## GitHub sign-in

The installer uses GitHub CLI’s browser OAuth flow. It requests `user:email` to check your verified work email; existing logins request this scope only when needed. Tokens and email lists are not saved in installer logs or settings.

If your work email is missing, add and verify it in [GitHub email settings](https://github.com/settings/emails), then rerun the installer. It does not need to be your primary email. A verified email and access to the private repository are separate requirements.

An environment token must already provide email-read and repository access. Browser consent cannot expand an externally supplied token. If GitHub sign-in succeeds but package download fails, check that the same account can open the private repository.

## Update or remove

**For maintainers:** skill changes ship in the private builder repository with their scripts, affected runtime consumers and rebuilt installation package. Validate both bundled resources and the installed code path; a dashboard-only edit is not a builder update. Public documentation follows the actual installable release.

**Update:** the installer reuses your saved course and agent settings, preserves course work and existing skills, and reopens the dashboard. Onboarding is only repeated when you explicitly request it. Changed managed release files are left for review rather than silently overwritten.

**Remove:** back up any course work, then run `incept-course-builder stop` to unregister its macOS dashboard service. Then remove the app directory at `~/.local/share/incept-course-builder` and the launcher at `~/.local/bin/incept-course-builder`. Runtime dependencies installed by this app are contained in its directory.

## Privacy

The public repository serves the dashboard, published observations, product documentation and install entry point. The private repository contains the builder package and agent resources. Course content, credentials and local checkpoints are not served by the public site. Agent and factory calls use the services configured for your authorized workflow.
