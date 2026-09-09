/* Source-bound dashboard snapshots, 2026-09-08. */
const AP4_DASHBOARD = globalThis.AP4_DASHBOARD = {
  "activeCourse": "humgeo",
  "gates": [],
  "courses": [
    {
      "id": "humgeo",
      "label": "AP Human Geography",
      "short": "HumGeo",
      "color": "oklch(46% 0.11 170)",
      "status": "RE-EARN \u2014 FINAL CUT PENDING",
      "statusTone": "blue",
      "mapping": "ASAP edition \u00b7 re-earn",
      "observed": "Sep 8 \u00b7 04:11Z",
      "landed": "Publication preparation has advanced: Train Your Eye practice (#1034) and per-choice MCQ feedback (#1035) are merged. PP100 #1036 merged as 6c69a93e on 2026-09-08 at 04:02:35Z (GitHub merge timestamp). The final publication cut and exact dark-publication readback remain pending; no p3-p8 completion is credited.",
      "nextStep": "Complete the regenerated-item landing, then validate the final publication cut and QTI before authorized dark publication and exact readback.",
      "footprint": [
        {
          "value": "content",
          "label": "assigned work; completion unearned"
        }
      ],
      "phaseStates": [
        {
          "code": "content",
          "name": "RE-EARN \u2014 FINAL CUT PENDING",
          "state": "active",
          "status": "RE-EARN",
          "detail": "Publication preparation has advanced: Train Your Eye practice (#1034) and per-choice MCQ feedback (#1035) are merged. PP100 #1036 merged as 6c69a93e on 2026-09-08 at 04:02:35Z (GitHub merge timestamp). The final publication cut and exact dark-publication readback remain pending; no p3-p8 completion is credited."
        }
      ]
    },
    {
      "id": "apwh",
      "label": "AP World History",
      "short": "APWH",
      "color": "oklch(48% 0.12 75)",
      "status": "RE-EARN \u2014 BANK VALIDATION",
      "statusTone": "blue",
      "mapping": "ASAP edition \u00b7 re-earn",
      "observed": "Sep 8 \u00b7 03:43Z",
      "landed": "The s4 follow-up is merged in #992. Bank validation is the active step; its dated 2026-09-07 v1 receipt records failed key-balance and uniquely-longest-answer checks. Repaired final bytes and QTI validation must pass before dark publication; p3 and later completion remain unearned.",
      "nextStep": "Complete s5 repairs and re-judging, then pass final-byte bank validation and the s6 QTI checks before dark publication.",
      "footprint": [
        {
          "value": "p3",
          "label": "assigned work; completion unearned"
        }
      ],
      "phaseStates": [
        {
          "code": "p3",
          "name": "RE-EARN \u2014 BANK VALIDATION",
          "state": "active",
          "status": "RE-EARN",
          "detail": "The s4 follow-up is merged in #992. Bank validation is the active step; its dated 2026-09-07 v1 receipt records failed key-balance and uniquely-longest-answer checks. Repaired final bytes and QTI validation must pass before dark publication; p3 and later completion remain unearned."
        }
      ]
    },
    {
      "id": "apush",
      "label": "AP US History",
      "short": "APUSH",
      "color": "oklch(48% 0.17 28)",
      "status": "RE-EARN \u2014 FLEET-HELD",
      "statusTone": "blue",
      "mapping": "ASAP edition \u00b7 re-earn",
      "observed": "Sep 8 \u00b7 03:43Z",
      "landed": "The course remains in pre-publication preparation. Current main records publishing and post-publication review as not yet started; no sequence-adapter release or later phase credit has been re-earned.",
      "nextStep": "Obtain the fleet sequence-adapter release receipt, then measure content at current main before filling proven gaps.",
      "footprint": [
        {
          "value": "fleet-held",
          "label": "assigned work; completion unearned"
        }
      ],
      "phaseStates": [
        {
          "code": "fleet-held",
          "name": "RE-EARN \u2014 FLEET-HELD",
          "state": "locked",
          "status": "RE-EARN",
          "detail": "The course remains in pre-publication preparation. Current main records publishing and post-publication review as not yet started; no sequence-adapter release or later phase credit has been re-earned."
        }
      ]
    },
    {
      "id": "psych",
      "label": "AP Psychology",
      "short": "Psych",
      "color": "oklch(48% 0.16 305)",
      "status": "RE-EARN \u2014 PARTIAL PUBLICATION",
      "statusTone": "blue",
      "mapping": "ASAP edition \u00b7 re-earn",
      "observed": "Sep 8 \u00b7 04:44Z",
      "landed": "Current main carries partial publication/readback receipts for Units 0\u20131 and a failed dated course-QC report. Full-course dark readback, enrollment state, cold QC and learner acceptance remain UNMEASURED.",
      "nextStep": "Reconcile the partial publication receipts with current platform state, then close full-course readback, cold QC and learner acceptance through the fleet-owned route.",
      "footprint": [
        {
          "value": "p5",
          "label": "assigned work; completion unearned"
        }
      ],
      "phaseStates": [
        {
          "code": "p5",
          "name": "RE-EARN \u2014 PARTIAL PUBLICATION",
          "state": "active",
          "status": "RE-EARN",
          "detail": "Current main carries partial publication/readback receipts for Units 0\u20131 and a failed dated course-QC report. Full-course dark readback, enrollment state, cold QC and learner acceptance remain UNMEASURED."
        }
      ]
    }
  ],
  "evidenceMaps": {
    "humgeo": {
      "title": "ASAP position",
      "note": "Source readback: 2026-09-08. Assigned work is not phase completion.",
      "rows": [
        {
          "code": "content",
          "name": "RE-EARN \u2014 FINAL CUT PENDING",
          "label": "Re-earn",
          "state": "active",
          "status": "RE-EARN",
          "signal": "Current-source check \u00b7 2026-09-08",
          "copy": "Publication preparation has advanced: Train Your Eye practice (#1034) and per-choice MCQ feedback (#1035) are merged. PP100 #1036 merged as 6c69a93e on 2026-09-08 at 04:02:35Z (GitHub merge timestamp). The final publication cut and exact dark-publication readback remain pending; no p3-p8 completion is credited.",
          "href": "https://github.com/InceptTrilogy/ap-one/pull/1034"
        }
      ]
    },
    "apwh": {
      "title": "ASAP position",
      "note": "Source readback: 2026-09-08. Assigned work is not phase completion.",
      "rows": [
        {
          "code": "p3",
          "name": "RE-EARN \u2014 BANK VALIDATION",
          "label": "Re-earn",
          "state": "active",
          "status": "RE-EARN",
          "signal": "Current-source check \u00b7 2026-09-08",
          "copy": "The s4 follow-up is merged in #992. Bank validation is the active step; its dated 2026-09-07 v1 receipt records failed key-balance and uniquely-longest-answer checks. Repaired final bytes and QTI validation must pass before dark publication; p3 and later completion remain unearned.",
          "href": "https://github.com/InceptTrilogy/ap-one/pull/992"
        }
      ]
    },
    "apush": {
      "title": "ASAP position",
      "note": "Source readback: 2026-09-08. Assigned work is not phase completion.",
      "rows": [
        {
          "code": "fleet-held",
          "name": "RE-EARN \u2014 FLEET-HELD",
          "label": "Re-earn",
          "state": "locked",
          "status": "RE-EARN",
          "signal": "Current-source check \u00b7 2026-09-08",
          "copy": "The course remains in pre-publication preparation. Current main records publishing and post-publication review as not yet started; no sequence-adapter release or later phase credit has been re-earned.",
          "href": "https://github.com/ilmych/apush-course-build/blob/deeaf0c190d8905c7a5efe3cb612b899ca190f3c/PIPELINE.md#L21"
        }
      ]
    },
    "psych": {
      "title": "ASAP position",
      "note": "Source readback: 2026-09-08. Assigned work is not phase completion.",
      "rows": [
        {
          "code": "p5",
          "name": "RE-EARN \u2014 PARTIAL PUBLICATION",
          "label": "Re-earn",
          "state": "active",
          "status": "RE-EARN",
          "signal": "Current-source check \u00b7 2026-09-08",
          "copy": "Current main carries partial publication/readback receipts for Units 0\u20131 and a failed dated course-QC report. Full-course dark readback, enrollment state, cold QC and learner acceptance remain UNMEASURED.",
          "href": "https://github.com/InceptTrilogy/ap-psychology-fall-2025-v1/blob/9593745a175a91feaa64b51e87e97b20a6c10f67/out/publish/live_tree_all.json"
        }
      ]
    }
  }
};

const NEEDS_KEYS = ['generated_ts', 'open', 'schema'];
const NEEDS_ITEM_KEYS = ['course', 'deadline', 'id', 'kind', 'title', 'ts'];
const NEEDS_COURSES = new Set(['humgeo', 'apwh', 'apush', 'psych', 'cross']);
const NEEDS_KINDS = new Set(['decision', 'approval', 'credential', 'scope', 'timing', 'other']);
const PRIVATE_TOKENS = ['/Users/', 'file://', '-----BEGIN', 'ghp_', 'github_pat_'];
const FRESHNESS_LIMIT_MS = 24 * 60 * 60 * 1000;

const sameKeys = (value, keys) => value && typeof value === 'object' && !Array.isArray(value) &&
  JSON.stringify(Object.keys(value).sort()) === JSON.stringify(keys);
const parsedTime = value => typeof value === 'string' ? Date.parse(value) : NaN;
const snapshotLabel = value => {
  const ms = parsedTime(value);
  if (!Number.isFinite(ms)) return 'measurement unavailable';
  const date = new Date(ms + 9 * 60 * 60 * 1000);
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getUTCMonth()];
  return `${month} ${date.getUTCDate()}, ${date.getUTCFullYear()} · ${String(date.getUTCHours()).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')} KST`;
};
const ageLabel = (ms, now = Date.now()) => {
  if (!Number.isFinite(ms)) return 'age unavailable';
  const minutes = Math.max(0, Math.floor((now - ms) / 60000));
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return hours < 48 ? `${hours}h ago` : `${Math.floor(hours / 24)}d ago`;
};

const validateNeedsHuman = (documentValue, now = Date.now()) => {
  const hold = reason => ({ status: 'hold', reason, items: [] });
  if (!sameKeys(documentValue, NEEDS_KEYS)) return hold('Projection missing or fields do not match needs-human-public/v1.');
  if (documentValue.schema !== 'needs-human-public/v1' || !Array.isArray(documentValue.open)) return hold('Projection schema is invalid.');
  const generated = parsedTime(documentValue.generated_ts);
  if (!Number.isFinite(generated)) return hold('Projection generated time is invalid.');
  if (generated > now + 5 * 60 * 1000) return hold('Projection generated time is in the future.');
  if (now - generated > FRESHNESS_LIMIT_MS) return hold(`Projection is stale; generated ${ageLabel(generated, now)}.`);
  for (const item of documentValue.open) {
    const title = item?.title;
    if (!sameKeys(item, NEEDS_ITEM_KEYS) || !/^[0-9a-f]{16}$/.test(String(item.id)) ||
        !NEEDS_COURSES.has(item.course) || !NEEDS_KINDS.has(item.kind) ||
        !Number.isFinite(parsedTime(item.ts)) || typeof title !== 'string' || !title.trim() ||
        title.length > 140 || /[\u0000-\u001f]/.test(title) || PRIVATE_TOKENS.some(token => title.includes(token)) ||
        typeof item.deadline !== 'string' || (item.deadline && !/^\d{4}-\d{2}-\d{2}$/.test(item.deadline))) {
      return hold('Projection contains an invalid or unexpected item.');
    }
  }
  return { status: 'ok', generated, items: documentValue.open };
};

const formatNextStep = (value, fallback) => {
  if (!sameKeys(value, ['args', 'gate', 'tool', 'verb']) || typeof value.verb !== 'string' ||
      typeof value.tool !== 'string' || !Array.isArray(value.args) || value.args.some(arg => typeof arg !== 'string') ||
      typeof value.gate !== 'string' || !value.verb.trim() || !value.tool.trim() || !value.gate.trim()) return fallback;
  const args = value.args.length ? ` (${value.args.join(', ')})` : '';
  return `${value.verb.trim().replace(/^./, char => char.toUpperCase())} via ${value.tool.trim()}${args} once ${value.gate.trim().replace(/[.]$/, '')}.`;
};

const processFrontier = value => {
  if (!value || !Array.isArray(value.stages) || !value.stages.length ||
      value.stages.some(stage => typeof stage?.automated !== 'boolean' || typeof stage.id !== 'string' ||
        typeof stage.name !== 'string' || typeof stage.contract_status !== 'string' ||
        !Array.isArray(stage.required_artifacts) || stage.required_artifacts.some(item => typeof item !== 'string'))) return null;
  return {
    automated: value.stages.filter(stage => stage.automated).length,
    total: value.stages.length,
    measured: parsedTime(value.generated_utc),
    stages: value.stages,
    label: value.label,
    route: value.route,
  };
};

const automationGap = stage => {
  if (stage.contract_status === 'CUT') return { tone: 'is-automated', label: 'Cut', next: 'No work remains in this phase.' };
  if (stage.contract_status === 'DONE_ALL_FOUR') return { tone: 'is-automated', label: 'Done · all four', next: 'The parsed runbook marks this phase done for all four courses.' };
  return { tone: 'needs-contract', label: 'Required', next: 'Advance only from the course’s re-earned position.' };
};

const make = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = globalThis.AP4_PUBLIC_TEXT ? globalThis.AP4_PUBLIC_TEXT(text) : text;
  return node;
};

const renderNeedsHuman = (root, result, now) => {
  root.className = `needs-human-strip ${result.status === 'hold' ? 'is-hold' : result.items.length ? 'has-items' : 'is-clear'}`;
  const head = make('div', 'needs-human-head');
  if (result.status === 'hold') {
    head.append(make('h2', '', 'Needs-human status unavailable'), make('p', '', result.reason));
    root.replaceChildren(head);
    return;
  }
  const title = make('h2', '', result.items.length ? `Needs a human: ${result.items.length}` : 'Nothing needs you');
  head.append(title, make('p', '', `Projection measured ${ageLabel(result.generated, now)}`));
  if (!result.items.length) {
    root.replaceChildren(head);
    return;
  }
  const list = make('div', 'needs-human-items');
  result.items.forEach(item => {
    const row = make('article', 'needs-human-item');
    const course = AP4_DASHBOARD.courses.find(candidate => candidate.id === item.course);
    const chip = make('span', 'needs-human-course', item.course);
    chip.style.setProperty('--course-color', course?.color || '#56647a');
    row.append(chip);
    const copy = make('div', 'needs-human-copy');
    copy.append(make('strong', '', item.title));
    const meta = make('span', '', `${ageLabel(parsedTime(item.ts), now)} · ${item.deadline ? `Deadline ${item.deadline}` : 'No deadline'}`);
    copy.append(meta);
    row.append(copy);
    list.append(row);
  });
  root.replaceChildren(head, list);
};

const renderFrontier = (root, processValue, now) => {
  const frontier = processFrontier(processValue);
  root.className = `automation-frontier ${frontier ? '' : 'is-hold'}`.trim();
  if (!frontier) {
    root.replaceChildren(make('strong', '', 'Automation frontier unavailable'), make('span', '', 'process.json is missing or untyped'));
    return;
  }
  const details = make('details', 'automation-frontier-details');
  const summary = make('summary', 'automation-frontier-summary');
  const complete = frontier.stages.filter(stage => ['CUT', 'DONE_ALL_FOUR'].includes(stage.contract_status));
  summary.append(
    make('strong', '', frontier.label || 'ASAP edition (2026-09-01)'),
    make('span', '', `Settled: ${complete.map(stage => `${stage.id} · ${stage.name}`).join(', ')} · measured ${ageLabel(frontier.measured, now)}`),
  );
  const rule = make('p', 'automation-frontier-rule', `Route: ${(frontier.route || []).join(' → ')}. Current course state is re-earned separately.`);
  const list = make('div', 'automation-step-list');
  frontier.stages.forEach(stage => {
    const gap = automationGap(stage);
    const row = make('article', `automation-step ${gap.tone}`);
    const head = make('div', 'automation-step-head');
    head.append(make('strong', '', `${stage.id} · ${stage.name}`), make('span', 'automation-step-status', gap.label));
    row.append(head, make('p', '', gap.next), make('small', '', `Requires: ${stage.required_artifacts.join(' · ')}`));
    list.append(row);
  });
  details.append(summary, rule, list);
  root.replaceChildren(details);
};

const renderCourseCards = (root, data, updates, now) => {
  const claims = Array.isArray(data?.claims) ? data.claims : [];
  const summary = globalThis.AP4_UPDATES?.summarizeCourse;
  const head = make('div', 'timeline-head');
  const intro = make('div');
  intro.append(make('span', 'badge b-blue', 'ASAP edition (2026-09-01)'), make('h2', '', 'All four courses'),
    make('p', 'timeline-sub', 'Re-earned state, freshness, machine-readable next step, and measured rates. Open a course for receipts and full detail.'));
  head.append(intro, make('span', 'timeline-snapshot', `Dashboard snapshot · ${snapshotLabel(data?.snapshot)}`));
  const grid = make('div', 'course-card-grid');
  grid.setAttribute('aria-label', 'Current TimeBack state and next step by course');
  AP4_DASHBOARD.courses.forEach(course => {
    const claim = claims.find(row => row?.claim_id === `${course.id}.blueprint.audit`);
    const claimMeasured = parsedTime(claim?.observed_at || claim?.status_at);
    const event = claim?.current_event;
    const eventMeasured = parsedTime(event?.ts);
    const validEvent = event && typeof event.phase === 'string' && typeof event.kind === 'string' && typeof event.text === 'string';
    const currentEvent = validEvent && Number.isFinite(eventMeasured) && (!Number.isFinite(claimMeasured) || eventMeasured >= claimMeasured) ? event : null;
    const measuredValues = [claimMeasured, eventMeasured].filter(Number.isFinite);
    const measured = measuredValues.length ? Math.max(...measuredValues) : NaN;
    const limit = Number(claim?.freshness_limit_hours);
    const stale = !Number.isFinite(measured) || !Number.isFinite(limit) || measured > now + 5 * 60 * 1000 || now - measured > limit * 60 * 60 * 1000;
    const rates = typeof summary === 'function' ? summary(updates, course.id, now) : null;
    const card = make('a', `course-summary-card${stale ? ' is-stale' : ''}`);
    card.href = `${course.id}.html`;
    card.style.setProperty('--course-color', course.color);
    const headline = make('div', 'course-card-headline');
    const eventPhase = currentEvent?.phase?.trim();
    const eventStatus = eventPhase && currentEvent.kind !== 'note' ? `${eventPhase.replace(/^phase\s*/i, 'Phase ')} · ${currentEvent.kind.replaceAll('-', ' ').toUpperCase()}` : course.status;
    const status = make('span', 'course-card-status', `${stale ? 'STALE · ' : ''}${eventStatus} · measured ${ageLabel(measured, now)}`);
    if (Number.isFinite(measured)) status.title = new Date(measured).toISOString();
    headline.append(status);
    card.append(headline, make('h3', '', course.label));
    const landed = make('p', 'course-card-landed');
    landed.append(make('strong', '', currentEvent ? 'Latest attested: ' : 'Landed: '), currentEvent?.text || course.landed);
    const next = make('p', 'course-card-next');
    next.append(make('strong', '', 'Next: '), formatNextStep(claim?.next_step, course.nextStep));
    const tiles = make('div', 'rate-tiles');
    [
      [rates?.landings7d, 'landings · 7d'],
      [rates?.openHolds, 'open typed holds'],
      [rates?.gateDays, 'days in current phase'],
    ].forEach(([value, label]) => {
      const tile = make('span');
      tile.append(make('strong', '', Number.isFinite(value) ? String(value) : 'UNMEASURED'), make('small', '', label));
      tiles.append(tile);
    });
    card.append(landed, next, tiles);
    grid.append(card);
  });
  root.replaceChildren(head, grid);
};

const boardSelftest = () => {
  const now = Date.parse('2026-08-31T03:00:00Z');
  if (snapshotLabel('2026-08-31T07:22Z') !== 'Aug 31, 2026 · 16:22 KST') throw new Error('evidence snapshot clock failed');
  const item = { id: 'a'.repeat(16), ts: '2026-08-31T02:00:00Z', course: 'humgeo', kind: 'decision', title: 'Choose the bounded option.', deadline: '' };
  const good = { schema: 'needs-human-public/v1', generated_ts: '2026-08-31T02:30:00Z', open: [item] };
  if (validateNeedsHuman(good, now).status !== 'ok') throw new Error('needs-human valid fixture failed');
  if (validateNeedsHuman(null, now).status !== 'hold') throw new Error('missing projection did not hold');
  if (validateNeedsHuman({ ...good, generated_ts: '2026-08-29T00:00:00Z' }, now).status !== 'hold') throw new Error('stale projection did not hold');
  if (validateNeedsHuman({ ...good, open: [{ ...item, title: 'x'.repeat(141) }] }, now).status !== 'hold') throw new Error('oversized title did not hold');
  if (validateNeedsHuman({ ...good, extra: true }, now).status !== 'hold') throw new Error('unexpected field did not hold');
  if (formatNextStep({ verb: 'resume', tool: 'factory-course-run', args: ['humgeo'], gate: 'the picker is runnable' }, 'fallback') === 'fallback') throw new Error('typed next step failed');
  if (automationGap({ automated: false, contract_status: 'CUT' }).label !== 'Cut') throw new Error('ASAP phase self-test failed');
};

globalThis.AP4_BOARD = { ageLabel, automationGap, formatNextStep, processFrontier, renderCourseCards, renderNeedsHuman, validateNeedsHuman };

(() => {
  const courses = AP4_DASHBOARD.courses;
  if (courses.length !== 4 || courses.some(course => !course.phaseStates.length || course.phaseStates.some(phase => !phase.code || !phase.name || !phase.status))) {
    throw new Error('Dashboard lifecycle data is incomplete.');
  }

  if (typeof document === 'undefined') {
    boardSelftest();
    return;
  }

  const phaseMarkup = course => `
    <div class="phase-state-grid" aria-label="${course.label} current runbook position">
      ${course.phaseStates.map(phase => `
        <div class="phase-state phase-state-${phase.state}">
          <div><strong>${phase.code}</strong><span>${phase.status}</span></div>
          <h3>${phase.name}</h3>
          <p>${phase.detail}</p>
        </div>`).join('')}
    </div>`;

  document.querySelectorAll('[data-phase-summary]').forEach(root => {
    root.innerHTML = `
      <div class="section-head"><div><span class="badge b-blue">ASAP edition (2026-09-01)</span><h2>Current re-earned position</h2></div></div>
      <p>Each course shows only landed or measured state; queued work is not phase credit.</p>
      <div class="phase-course-list">
        ${courses.map(course => `<article><h3><a href="${course.id}.html">${course.label}</a></h3>${phaseMarkup(course)}</article>`).join('')}
      </div>`;
  });

  document.querySelectorAll('[data-course-eta]').forEach(section => {
    const course = courses.find(item => item.id === section.dataset.courseEta);
    if (!course) return;
    section.querySelector('[data-course-eta-days]').textContent = course.etaDays;
    section.querySelector('[data-course-eta-note]').textContent = course.etaNote;
  });

  document.querySelectorAll('[data-gate-evidence]').forEach(root => {
    const courseId = root.dataset.gateEvidence;
    const map = AP4_DASHBOARD.evidenceMaps[courseId];
    const course = courses.find(item => item.id === courseId);
    if (!map || !course) return;
    root.classList.add('gate-evidence-sec');
    root.innerHTML = `
      <div class="gate-evidence-head">
        <div><span class="badge b-${course.statusTone}">${course.mapping}</span><h2>Current ASAP edition state</h2></div>
        <span class="gate-observed">Re-earned · ${course.observed}</span>
      </div>
      <p class="gate-evidence-note">${map.note} Evidence counts retain their cited scope and are never summed into a completion percentage.</p>
      ${phaseMarkup(course)}
      <div class="work-footprint" aria-label="${course.label} observable work footprint">
        ${course.footprint.map(metric => `<div><strong>${metric.value}</strong><span>${metric.label}</span></div>`).join('')}
      </div>
      <div class="gate-evidence-list">
        ${map.rows.map(row => `
          <article class="gate-evidence-row gate-evidence-${row.state}">
            <div class="gate-evidence-id"><span title="${row.name}" aria-label="${row.name}">${row.code}</span><small aria-hidden="true">${row.label}</small></div>
            <div>
              <span class="gate-evidence-status">${row.status}</span>
              <h3>${row.signal}</h3>
              <p>${row.copy}</p>
              <a href="${row.href}"${row.href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>Open receipt →</a>
            </div>
          </article>`).join('')}
      </div>`;
  });

  const root = document.getElementById('course-release-timeline');
  if (!root) return;
  const needsRoot = document.getElementById('needs-human-strip');
  const frontierRoot = document.getElementById('automation-frontier');
  const load = async path => {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) throw new Error(`${path} unavailable`);
    return response.json();
  };
  let needsRefresh;
  const refreshNeedsHuman = () => needsRefresh || (needsRefresh = load('needs-human.json')
    .then(value => {
      const now = Date.now();
      if (needsRoot) renderNeedsHuman(needsRoot, validateNeedsHuman(value, now), now);
    })
    .catch(() => {
      const now = Date.now();
      if (needsRoot) renderNeedsHuman(needsRoot, validateNeedsHuman(null, now), now);
    })
    .finally(() => { needsRefresh = null; }));
  const refreshOnReturn = () => {
    if (!document.hidden) void refreshNeedsHuman();
  };
  void refreshNeedsHuman();
  window.addEventListener('focus', refreshOnReturn);
  window.addEventListener('pageshow', refreshOnReturn);
  document.addEventListener('visibilitychange', refreshOnReturn);
  Promise.allSettled([load('data.json'), load('process.json'), load('updates.json')]).then(results => {
    const now = Date.now();
    if (frontierRoot) renderFrontier(frontierRoot, results[1].status === 'fulfilled' ? results[1].value : null, now);
    renderCourseCards(root, results[0].status === 'fulfilled' ? results[0].value : null,
      results[2].status === 'fulfilled' && Array.isArray(results[2].value) ? results[2].value : [], now);
  });
})();
