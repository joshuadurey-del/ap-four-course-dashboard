#!/bin/sh
# Regenerate hashes.json over the served machine-readable files, then stage it.
# Runs from the pre-commit hook so the digests can never go stale.
cd "$(git rev-parse --show-toplevel)" || exit 1
python3 - <<'EOF'
import hashlib, json, os, subprocess
files = sorted(
    ['data.json', 'updates.json'] +
    ['agents/' + f for f in os.listdir('agents') if f.endswith('.md')]
)
out = {
    'generated_utc': subprocess.check_output(['date', '-u', '+%Y-%m-%dT%H:%M:%SZ']).decode().strip(),
    'note': 'sha256 over the raw bytes as served. Verify: curl -s <file url> | shasum -a 256. hashes.json cannot hash itself.',
    'files': [
        {'path': p,
         'sha256': hashlib.sha256(open(p, 'rb').read()).hexdigest(),
         'bytes': os.path.getsize(p)}
        for p in files
    ],
}
with open('hashes.json', 'w') as f:
    json.dump(out, f, indent=1)
    f.write('\n')
EOF
git add hashes.json

# Auto-refresh the homepage snapshot stamp at every commit (owner order
# 2026-08-28: the date must move at each update; the hand-set stamp went
# stale twice). Runs after hashes so both are staged together.
python3 - <<'PYEOF'
import datetime, re
now = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=9)))
kst = f"{now:%b} {now.day}, {now.year} \u00b7 {now:%H:%M} KST"
src = open('timeline.js').read()
new = re.sub(r"snapshot: '[^']*'", f"snapshot: '{kst}'", src, count=1)
if new != src:
    open('timeline.js', 'w').write(new)
PYEOF
git add timeline.js
