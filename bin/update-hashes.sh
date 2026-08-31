#!/bin/sh
# Write hashes from staged Git blobs (the exact tree that becomes HEAD), or verify
# every published entry against committed HEAD. Working-tree bytes are never read.
set -eu
cd "$(git rev-parse --show-toplevel)"
mode=${1:-write}
ref=${HASH_REF:-HEAD}

python3 - "$mode" "$ref" <<'PY'
import datetime
import hashlib
import json
import subprocess
import sys

mode, ref = sys.argv[1:]

def git(*args):
    return subprocess.check_output(["git", *args])

def blob(path, source=ref):
    spec = f":{path}" if source == ":" else f"{source}:{path}"
    return git("show", spec)

if ref == ":":
    agents = git("ls-files", "agents/*.md").decode().splitlines()
else:
    agents = [path for path in git("ls-tree", "-r", "--name-only", ref, "--", "agents").decode().splitlines() if path.endswith(".md")]
files = sorted(["data.json", "needs-human.json", "process.json", "updates.json", *agents])

if mode == "verify":
    manifest = json.loads(blob("hashes.json", "HEAD"))
    entries = manifest.get("files", [])
    if [entry.get("path") for entry in entries] != files:
        raise SystemExit("HASHES HOLD: committed inventory differs from hashes.json")
    for entry in entries:
        content = blob(entry["path"], "HEAD")
        if entry.get("sha256") != hashlib.sha256(content).hexdigest() or entry.get("bytes") != len(content):
            raise SystemExit(f"HASHES HOLD: {entry['path']} differs from committed HEAD")
    print(f"HASHES OK: {len(entries)} committed HEAD entries")
    raise SystemExit(0)

if mode != "write":
    raise SystemExit("usage: update-hashes.sh [write|verify]")
out = {
    "generated_utc": datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
    "note": "sha256 over Git blobs committed at HEAD. Precommit reads the staged tree that becomes HEAD; bin/update-hashes.sh verify checks committed HEAD. Working-tree bytes are never hashed.",
    "files": [],
}
for path in files:
    content = blob(path)
    out["files"].append({"path": path, "sha256": hashlib.sha256(content).hexdigest(), "bytes": len(content)})
with open("hashes.json", "w", encoding="utf-8") as handle:
    json.dump(out, handle, indent=1)
    handle.write("\n")
PY
git add hashes.json

# The snapshot stamp is display metadata and is not part of hashes.json.
python3 - <<'PY'
import datetime
import re

now = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=9)))
kst = f"{now:%b} {now.day}, {now.year} \u00b7 {now:%H:%M} KST"
with open("timeline.js", encoding="utf-8") as handle:
    source = handle.read()
updated = re.sub(r"snapshot: '[^']*'", f"snapshot: '{kst}'", source, count=1)
if updated != source:
    with open("timeline.js", "w", encoding="utf-8") as handle:
        handle.write(updated)
PY
git add timeline.js
