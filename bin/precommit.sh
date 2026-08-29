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

# The page's "Last updated" line reads the newest entry in updates.json, not the
# manifest snapshot. A claims change with no feed entry is therefore INVISIBLE on
# the surface agents read first (caught by Josh 2026-08-17, 46 minutes after a
# republish left the timestamp untouched).
STAGED=$(git diff --cached --name-only)

if ! python3 - <<'PY'
import datetime
import json
import re
import urllib.parse

with open('updates.json') as f:
    updates = json.load(f)

assert isinstance(updates, list), 'updates.json must contain a JSON array'
for index, update in enumerate(updates):
    assert isinstance(update, dict), f'update {index} must be an object'
    for field in ('ts', 'course', 'text'):
        assert isinstance(update.get(field), str) and update[field].strip(), \
            f'update {index} needs a non-empty {field}'
    assert re.fullmatch(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}Z', update['ts']), \
        f"update {index} has invalid ts: {update['ts']}"
    datetime.datetime.fromisoformat(update['ts'].replace('Z', '+00:00'))
    event_fields = {'event_type', 'evidence_url'} & update.keys()
    assert not event_fields or event_fields == {'event_type', 'evidence_url'}, \
        f'update {index} must carry event_type and evidence_url together'
    if event_fields:
        assert update['event_type'] in {'push', 'pull_request', 'issues'}, \
            f'update {index} has invalid event_type'
        url = urllib.parse.urlparse(update['evidence_url'])
        assert url.scheme == 'https' and url.hostname == 'github.com' and url.path.strip('/'), \
            f'update {index} has invalid evidence_url'

print(f'UPDATES OK: {len(updates)} schema-valid entries')
PY
then
  echo "pre-commit: BLOCKED — updates.json violates its published schema."
  exit 1
fi

if [ -z "$SKIP_CLAIMS_LINT" ] \
   && echo "$STAGED" | grep -qx 'data.json' \
   && ! echo "$STAGED" | grep -qx 'updates.json'; then
  echo "pre-commit: BLOCKED — data.json changed but updates.json has no new entry."
  echo "  The page's Last-updated line and the agent-facing feed both read updates.json."
  echo "  Add an entry describing the change, or commit with SKIP_CLAIMS_LINT=1."
  exit 1
fi

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
