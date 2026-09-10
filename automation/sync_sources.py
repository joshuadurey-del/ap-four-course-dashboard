#!/usr/bin/env python3
"""Read live GitHub source metadata; never execute a course or publish its content."""
import copy
from concurrent.futures import ThreadPoolExecutor
from collections import Counter
from functools import lru_cache
import hashlib
import json
import os
from pathlib import Path
import re
import sys
from urllib.parse import quote

COURSE_REPOS = {
    'humgeo': ['InceptTrilogy/ap-one', 'ilmych/humgeo-rebuild'],
    'apwh': ['InceptTrilogy/ap-one', 'ilmych/apwh-blueprint-build', 'ilmych/apwh-build-outputs'],
    'apush': ['ilmych/apush-build-outputs', 'ilmych/apush-course-build'],
    'psych': ['InceptTrilogy/ap-psychology-fall-2025-v1'],
}
BLOB = re.compile(r'https://github\.com/([^/]+/[^/]+)/blob/([a-f0-9]{40})/([^?#]+)$')
SHA = re.compile(r'[a-f0-9]{40}$')
DIGEST = re.compile(r'[a-f0-9]{64}$')
POPULATIONS = {'Gate MCQs', 'Practice', 'PowerPath / PP100', 'Unit assessments', 'Mock / exam forms', 'Articles', 'Embedded checks', 'Videos / media', 'Writing activities', 'Writing scoring', 'Train Your Eye'}
WORKFLOW = 'https://github.com/InceptTrilogy/ap-four-course-dashboard/actions/workflows/dashboard-repo-poll.yml'


def claim_digest(claim):
    return hashlib.sha256(json.dumps(claim, sort_keys=True, separators=(',', ':')).encode()).hexdigest()


def measure(d, filename):
    """Only reviewed inventory schemas. Return numeric summaries, never item text."""
    if filename == 'demo_gate_snapshot.json':
        forms = [f for g in d['gates'] for f in g['forms']]
        members = [m for f in forms for m in f['members']]
        assert len({m['content_id'] for m in members}) == len(members)
        roles = Counter(m['student_view']['role'] for m in members)
        assert set(roles) <= {'mcq', 'extended_text'}
        return f"{roles['mcq']:,} MCQs · {len(forms):,} forms", f"{len(d['gates'])} gates; {roles['extended_text']} written responses excluded from MCQs. Committed snapshot, not live acceptance."
    if filename in ('demo_practice_keys.json', 'video_map.json', 'write_activities.json', 'demo_articles.json'):
        key, unit = {'demo_practice_keys.json': ('keys', 'keyed records'), 'video_map.json': ('lessons', 'lesson mappings'), 'write_activities.json': ('activities', 'activities'), 'demo_articles.json': ('articles', 'article overlays')}[filename]
        assert isinstance(d[key], (dict, list)) and len(d[key]) == d['count']
        return f"{len(d[key]):,} {unit}", 'Committed source inventory only. Effective admission, complete population scope and learner readback require native evidence.'
    if filename == 'mock_exam_bank.json':
        assert isinstance(d['forms'], list)
        return f"{len(d['forms'])} assembled exam form(s)", 'Committed mock-bank inventory; not exam acceptance.'
    if filename == 'pp100_items.json':
        assert len(d['items']) == len(d['enumerated']) == d['_meta']['total_ids']
        return f"{len(d['items']):,} ingest inventory entries", 'Base PP100 list; exclusions, replacements and final admission are separate inputs.'
    if filename == 'paired_sets_bank.json':
        assert isinstance(d['sets'], dict)
        n = sum(len(s['items']) for s in d['sets'].values())
        return f"{n:,} items · {len(d['sets'])} paired sets", 'Paired-stimulus bank used by native host-lesson practice; not a Know A / Know B sequence or live-acceptance verdict.'
    if filename == 'cumulative_gate_forms.json':
        forms = [f for u in d['units'].values() for f in u['forms']]
        assert all(isinstance(f['questions'], list) for f in forms)
        return f"{len(forms)} forms · {len(d['units'])} units", 'Stored source alternatives. The native publisher selects forms per unit separately; this is not a publication count.'
    if filename == 'sync_bank.json':
        assert isinstance(d['items'], dict)
        return f"{len(d['items']):,} sync-check records", 'Actual sync-bank records. Authored article checks and final video/article placement use additional native inputs; not combined acceptance.'
    if filename == 'report.json':
        assert d['verdict'] in ('PASS', 'FAIL')
        return 'Historical calibration: ' + d['verdict'], 'Committed report, not a fresh calibration. A newer governing receipt must be reconciled separately.'
    if filename == 'ledger.json':
        counts = Counter(r['acceptance_status'] for r in d['records'])
        assert len(d['records']) == d['counts']['records'] and counts['ACCEPTED'] == d['counts']['accepted'] and counts['PENDING'] == d['counts']['pending']
        assert d['write_policy']['build_only'] and not any(d['write_policy'][k] for k in ('platform_ingest', 'live_wiring', 'rendering'))
        return f"{counts['ACCEPTED']} / {len(d['records'])} positions accepted", f"{counts['PENDING']} pending in this named build-only ledger. Presence on current main does not establish it as the latest successor or prove publication."
    if filename == 'live_qc_unit_3.json':
        assert d['expected'] == d['fetched'] and not d['missing'] and not d['findings']
        return f"Unit 3: {int(d['fetched']['frqs'])} FRQs matched", 'Committed Unit 3 readback only; no fresh platform probe or full-course verdict.'
    raise ValueError('No reviewed extractor for this source')


def sync(data, api, stamp):
    result = copy.deepcopy(data)
    coverage = result['population_coverage']
    # ponytail: configured evidence paths, not a speculative whole-repository crawler.
    # A newly introduced population/schema needs its native reader mapped here.
    allowed = set(repo for repos in COURSE_REPOS.values() for repo in repos)
    refs = {}
    for repo in sorted(allowed):
        try:
            commit = api.request(f'/repos/{repo}/commits/main')
            assert SHA.fullmatch(commit['sha'])
            refs[repo] = {'sha': commit['sha'], 'checked_at': stamp, 'status': 'CHECKED'}
        except (RuntimeError, OSError, ValueError, AssertionError, KeyError):
            refs[repo] = {'checked_at': stamp, 'status': 'UNAVAILABLE'}

    @lru_cache(maxsize=None)
    def read(repo, path):
        sha = refs[repo]['sha']
        return api.request(f'/repos/{repo}/contents/{quote(path, safe="/")}?ref={sha}', raw=True)

    def project(job):
        course, label, old = job
        row = copy.deepcopy(old)
        row['source_repositories'] = COURSE_REPOS[course]
        row['sync_checked_at'] = stamp
        if old.get('reporting_status') == 'NOT_REPORTED':
            row['sync_status'] = 'MAPPING_REQUIRED'
            return course, label, row
        try:
            assert len(old['evidence']) == 1
            match = BLOB.fullmatch(old['evidence'][0]['url'])
            assert match and match[1] in COURSE_REPOS[course]
            repo, path = match[1], match[3]
            raw = read(repo, path)
            d = json.loads(raw)
            value, detail = measure(d, Path(path).name)
            if course == 'psych' and label == 'Videos / media':
                assert d['images']['checked'] and not d['images']['failures']
                value = f"Unit 3: {int(d['images']['unique_urls'])} image URLs checked"
                detail = 'Committed Unit 3 image check; neither current media availability nor video coverage.'
            row.update(value=value, detail=detail, observed_at=stamp, sync_status='CHECKED',
                       evidence=[{'url': f'https://github.com/{repo}/blob/{refs[repo]["sha"]}/{path}', 'sha256': hashlib.sha256(raw).hexdigest()}])
        except (RuntimeError, OSError, ValueError, AssertionError, KeyError, TypeError):
            row['sync_status'] = 'UNAVAILABLE_OR_SCHEMA_CHANGED'
            # Retain last evidence date/value visibly as historical, never freshen failure.
        return course, label, row

    jobs = [(c, label, row) for c, rows in coverage['courses'].items() for label, row in rows.items()]
    with ThreadPoolExecutor(max_workers=5) as pool:
        for course, label, row in pool.map(project, jobs):
            coverage['courses'][course][label] = row

    # Claims retain their original status and dates. Only compare exact bound files.
    claim_checks = {}
    for claim in result['claims']:
        checks = []
        for e in claim.get('evidence', []):
            match = BLOB.fullmatch(e.get('url', ''))
            if not match or match[1] not in allowed or not DIGEST.fullmatch(e.get('sha256', '')):
                continue
            try:
                raw = read(match[1], match[3])
                digest = hashlib.sha256(raw).hexdigest()
                checks.append({'status': 'UNCHANGED_BYTES' if digest == e['sha256'] else 'SOURCE_CHANGED',
                               'url': f'https://github.com/{match[1]}/blob/{refs[match[1]]["sha"]}/{match[3]}', 'sha256': digest})
            except (RuntimeError, OSError, ValueError, KeyError):
                checks.append({'status': 'UNAVAILABLE'})
        claim_checks[claim['claim_id']] = {'status': 'BOUND_FILES_CHECKED' if checks else 'NO_AUTOMATIC_VERIFIER', 'checks': checks, 'claim_sha256': claim_digest(claim)}

    for repo, ref in refs.items():
        if ref['status'] == 'CHECKED':
            try:
                if api.request(f'/repos/{repo}/commits/main')['sha'] != ref['sha']:
                    ref['status'] = 'HEAD_MOVED'
            except (RuntimeError, OSError, ValueError, KeyError):
                ref['status'] = 'UNAVAILABLE'
    for check in claim_checks.values():
        for e in check['checks']:
            m = BLOB.fullmatch(e.get('url', ''))
            if m and refs[m[1]]['status'] != 'CHECKED': e['status'] = 'UNAVAILABLE'
    for rows in coverage['courses'].values():
        for row in rows.values():
            if row['sync_status'] == 'CHECKED' and any(refs[r]['status'] != 'CHECKED' for r in row['source_repositories']):
                row['sync_status'] = 'HEAD_UNCONFIRMED'
    coverage['observed_at'] = stamp
    statuses = Counter(row['sync_status'] for rows in coverage['courses'].values() for row in rows.values())
    result['source_sync'] = {'schema': 'dashboard-source-sync/v1', 'checked_at': stamp,
        'status': 'PARTIAL' if any(k not in ('CHECKED', 'MAPPING_REQUIRED') for k in statuses) or any(r['status'] != 'CHECKED' for r in refs.values()) else 'CHECKED',
        'repositories': refs, 'populations': dict(statuses), 'claims': claim_checks,
        'workflow_url': WORKFLOW, 'run_url': f'https://github.com/InceptTrilogy/ap-four-course-dashboard/actions/runs/{os.environ["GITHUB_RUN_ID"]}' if os.environ.get('GITHUB_RUN_ID', '').isdigit() else WORKFLOW,
        'scope': 'Configured source files on remote main only. Unmapped populations and claims remain unverified; unchanged bytes do not renew QC or learner acceptance.'}
    validate_projection(result)
    return result


def validate_projection(data):
    """Public trust boundary, also run on staged Git blobs by the existing gate."""
    s = data['source_sync']
    assert set(s) == {'schema', 'checked_at', 'status', 'repositories', 'populations', 'claims', 'workflow_url', 'run_url', 'scope'}
    assert s['schema'] == 'dashboard-source-sync/v1' and s['status'] in ('CHECKED', 'PARTIAL')
    assert s['workflow_url'] == WORKFLOW and s['run_url'].startswith('https://github.com/InceptTrilogy/ap-four-course-dashboard/actions/')
    from datetime import datetime, timezone
    stamp = datetime.fromisoformat(s['checked_at'].replace('Z', '+00:00'))
    assert stamp.tzinfo and (datetime.now(timezone.utc) - stamp).total_seconds() >= -300
    assert set(s['repositories']) == set(r for rs in COURSE_REPOS.values() for r in rs)
    for r in s['repositories'].values():
        assert set(r) <= {'sha', 'checked_at', 'status'} and r['checked_at'] == s['checked_at']
        assert r['status'] in ('CHECKED', 'HEAD_MOVED', 'UNAVAILABLE')
        if 'sha' in r: assert SHA.fullmatch(r['sha'])
    c = data['population_coverage']
    assert c['schema'] == 'population-evidence/v1' and set(c['courses']) == set(COURSE_REPOS)
    for course, rows in c['courses'].items():
        assert set(rows) == POPULATIONS
        for row in rows.values():
            assert set(row) <= {'reporting_status', 'course_status', 'value', 'detail', 'next_step', 'observed_at', 'level', 'evidence', 'source_repositories', 'sync_checked_at', 'sync_status'}
            assert row['sync_checked_at'] == s['checked_at']
            assert row['source_repositories'] == COURSE_REPOS[course]
            assert row['sync_status'] in ('CHECKED', 'MAPPING_REQUIRED', 'HEAD_UNCONFIRMED', 'UNAVAILABLE_OR_SCHEMA_CHANGED')
            for e in row.get('evidence', []):
                m = BLOB.fullmatch(e['url'])
                assert set(e) == {'url', 'sha256'}
                assert m and m[1] in COURSE_REPOS[course] and DIGEST.fullmatch(e['sha256'])
                if row['sync_status'] == 'CHECKED':
                    assert m[2] == s['repositories'][m[1]]['sha'] and row['observed_at'] == s['checked_at']
            for field in ('value', 'detail', 'next_step'):
                if field in row:
                    assert isinstance(row[field], str) and len(row[field]) < 1000
    assert s['populations'] == dict(Counter(row['sync_status'] for rows in c['courses'].values() for row in rows.values()))
    claims = {r['claim_id']: r for r in data['claims']}
    assert set(s['claims']) == set(claims)
    for key, check in s['claims'].items():
        assert set(check) == {'status', 'checks', 'claim_sha256'} and check['claim_sha256'] == claim_digest(claims[key])
        assert check['status'] in ('BOUND_FILES_CHECKED', 'NO_AUTOMATIC_VERIFIER')
        for e in check['checks']:
            assert set(e) <= {'status', 'url', 'sha256'} and e['status'] in ('UNCHANGED_BYTES', 'SOURCE_CHANGED', 'UNAVAILABLE')
            if 'url' in e: assert BLOB.fullmatch(e['url']) and DIGEST.fullmatch(e['sha256'])
    public = json.dumps({'source_sync': s, 'population_coverage': c})
    assert not any(token in public for token in ('/Users/', 'file://', 'ghp_', 'github_pat_', '-----BEGIN', 'correct_label', 'correct_answer', 'distractor_rationales'))


def write(data, directory):
    directory = Path(directory)
    (directory / 'data.json').write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
    updates = json.loads((directory / 'updates.json').read_text())
    stamp = data['source_sync']['checked_at'][:16] + 'Z'
    text = 'Source sync checked remote main revisions and refreshed configured population evidence. Unmapped scope and formal course claims remain separate.'
    row = {'ts': stamp, 'course': 'All', 'writer': 'repository-event automation', 'text': text}
    if row not in updates: updates.insert(0, row)
    (directory / 'updates.json').write_text(json.dumps(updates, ensure_ascii=False, indent=2) + '\n')


def mirror(source, destination):
    current = json.loads((Path(destination) / 'data.json').read_text())
    incoming = json.loads((Path(source) / 'data.json').read_text())
    validate_projection(incoming)
    old = current.get('source_sync', {}).get('checked_at', '')
    assert incoming['source_sync']['checked_at'] >= old, 'Refuse older public projection'
    # Keep public formal claims, content, local updates and decisions independently owned.
    current['population_coverage'] = incoming['population_coverage']
    current['source_sync'] = incoming['source_sync']
    current['source_sync'] = copy.deepcopy(incoming['source_sync'])
    current['source_sync']['claims'] = {c['claim_id']: incoming['source_sync']['claims'].get(c['claim_id'])
        if incoming['source_sync']['claims'].get(c['claim_id'], {}).get('claim_sha256') == claim_digest(c)
        else {'status': 'NO_AUTOMATIC_VERIFIER', 'checks': [], 'claim_sha256': claim_digest(c)} for c in current['claims']}
    validate_projection(current)
    write(current, destination)


def selftest():
    assert measure({'items': {}}, 'sync_bank.json')[0] == '0 sync-check records'
    try: measure({'keys': {}, 'count': 2}, 'demo_practice_keys.json')
    except AssertionError: pass
    else: raise AssertionError('count mismatch accepted')
    assert measure({'verdict': 'FAIL'}, 'report.json')[0] == 'Historical calibration: FAIL'
    try: measure({'text': 'private'}, 'unknown.json')
    except ValueError: pass
    else: raise AssertionError('unmapped schema accepted')
    from datetime import datetime, timezone
    stamp = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
    url = 'https://github.com/InceptTrilogy/ap-one/blob/' + 'a'*40 + '/sync_bank.json'
    row = {'reporting_status': 'RECORDED', 'value': 'Old count', 'detail': 'Scope', 'next_step': 'Native acceptance', 'observed_at': '2026-01-01T00:00:00Z', 'level': 'Source inventory', 'evidence': [{'url': url, 'sha256': 'a'*64}]}
    data = {'claims': [{'claim_id': 'test', 'status': 'BLOCKED', 'evidence': row['evidence']}], 'population_coverage': {'schema': 'population-evidence/v1', 'courses': {c: {k: {'reporting_status': 'NOT_REPORTED', 'course_status': 'NOT_ASSESSED'} for k in POPULATIONS} for c in COURSE_REPOS}}}
    data['population_coverage']['courses']['humgeo']['Embedded checks'] = row
    class Fake:
        def __init__(self, fail=False, drift=False): self.fail, self.drift, self.reads = fail, drift, 0
        def request(self, path, raw=False):
            if raw:
                if self.fail: raise RuntimeError('permission denied')
                return b'{"items": {}}'
            self.reads += 1
            return {'sha': ('b' if self.drift and self.reads > len(set(r for rs in COURSE_REPOS.values() for r in rs)) else 'a')*40}
    good = sync(data, Fake(), stamp)
    assert good['claims'] == data['claims'] and good['source_sync']['populations']['CHECKED'] == 1
    assert good['population_coverage']['courses']['humgeo']['Embedded checks']['value'] == '0 sync-check records'
    bad = sync(data, Fake(fail=True), stamp)
    assert bad['source_sync']['status'] == 'PARTIAL'
    assert bad['population_coverage']['courses']['humgeo']['Embedded checks']['observed_at'] == row['observed_at']
    assert sync(data, Fake(drift=True), stamp)['population_coverage']['courses']['humgeo']['Embedded checks']['sync_status'] == 'HEAD_UNCONFIRMED'
    leaked = copy.deepcopy(good); leaked['population_coverage']['courses']['humgeo']['Embedded checks']['raw_item'] = 'private content'
    try: validate_projection(leaked)
    except AssertionError: pass
    else: raise AssertionError('unknown public field accepted')
    import tempfile
    with tempfile.TemporaryDirectory() as tmp:
        a, b = Path(tmp)/'a', Path(tmp)/'b'; a.mkdir(); b.mkdir()
        public = copy.deepcopy(data); public['claims'][0]['status'] = 'OBSERVED'
        (a/'data.json').write_text(json.dumps(good)); (b/'data.json').write_text(json.dumps(public)); (b/'updates.json').write_text('[]')
        mirror(a, b)
        mirrored = json.loads((b/'data.json').read_text())
        assert mirrored['claims'] == public['claims']
        assert mirrored['source_sync']['claims']['test']['status'] == 'NO_AUTOMATIC_VERIFIER'
    print('source-sync PASS: schema/count failures, zero vs unmeasured, denied read, head drift, unchanged claims, public field boundary')


if __name__ == '__main__':
    if sys.argv[1:] == ['selftest']: selftest()
    elif len(sys.argv) == 4 and sys.argv[1] == 'mirror': mirror(sys.argv[2], sys.argv[3])
    elif sys.argv[1:] == ['refresh']:
        from poll_repositories import GitHub, iso, now_utc
        data = json.loads(Path('data.json').read_text())
        write(sync(data, GitHub(os.environ.get('SOURCE_REPO_READ_TOKEN')), iso(now_utc())), '.')
    else: raise SystemExit('usage: sync_sources.py selftest|refresh|mirror SOURCE DESTINATION')
