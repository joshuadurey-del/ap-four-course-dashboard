#!/bin/sh
# Pre-commit gate for the dashboard: every claim must carry its own date, then
# refresh the published digests. Point .git/hooks/pre-commit at this file.
#
# Blocks on a claim with no parseable observed_at / status_at, because an undated
# row silently inherited the manifest snapshot and got rejuvenated by a republish
# (postmortem C11). It does NOT block on age: a claim can legitimately describe
# something old. Escape hatch: SKIP_CLAIMS_LINT=1 git commit ...
cd "$(git rev-parse --show-toplevel)" || exit 1
LINT="${INCEPT_ZONE:-$HOME/repos/social-studies/INCEPT}/tools/claims_staleness_lint.py"

if [ -n "$SKIP_CLAIMS_LINT" ]; then
  echo "pre-commit: claims lint SKIPPED by SKIP_CLAIMS_LINT"
elif [ ! -f "$LINT" ]; then
  echo "pre-commit: BLOCKED — claims linter not found at $LINT."
  echo "  Set INCEPT_ZONE, or commit with SKIP_CLAIMS_LINT=1 and say so in the message."
  exit 1
elif ! python3 "$LINT" data.json --hygiene; then
  echo "pre-commit: BLOCKED — every claim needs observed_at (OBSERVED) or status_at"
  echo "  (PLANNED/BLOCKED), in ISO form. Undated rows above."
  exit 1
fi

exec bin/update-hashes.sh
