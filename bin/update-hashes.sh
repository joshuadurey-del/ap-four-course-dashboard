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
