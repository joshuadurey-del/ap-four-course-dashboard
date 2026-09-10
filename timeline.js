/* Course identity is static; every standing is loaded from current JSON. */
const COURSE_IDENTITIES = [
  { id: 'humgeo', label: 'AP Human Geography', short: 'HumGeo', color: 'oklch(46% 0.11 170)' },
  { id: 'apwh', label: 'AP World History', short: 'APWH', color: 'oklch(48% 0.12 75)' },
  { id: 'apush', label: 'AP US History', short: 'APUSH', color: 'oklch(48% 0.17 28)' },
  { id: 'psych', label: 'AP Psychology', short: 'Psych', color: 'oklch(48% 0.16 305)' },
];
const AP4_DASHBOARD = globalThis.AP4_DASHBOARD = { activeCourse: 'humgeo', activeStage: null, asapStages: [], courses: [], snapshot: 'UNMEASURED', errors: [] };

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

const bindCourseState = (data, processValue, now = Date.now()) => COURSE_IDENTITIES.map(identity => {
  const rows = Array.isArray(data?.claims) ? data.claims.filter(row => row?.claim_id === `${identity.id}.blueprint.audit`) : [];
  const claim = rows.length === 1 ? rows[0] : null;
  const position = processValue?.courses?.[identity.id];
  const text = value => typeof value === 'string' && value.trim();
  const missing = !claim || !['OBSERVED', 'PLANNED', 'BLOCKED', 'MISSING', 'DERIVED'].includes(claim.status) || !text(claim.value) ||
    !Number.isFinite(parsedTime(claim.observed_at || claim.status_at)) ||
    !claim.process_position || !['current_stage', 'state'].every(key => text(claim.process_position[key])) ||
    !position || !['current_stage', 'state', 'detail', 'as_of'].every(key => text(position[key]));
  const mismatch = !missing && (position.detail !== claim.value || position.as_of !== (claim.observed_at || claim.status_at) ||
    ['current_stage', 'state'].some(key => position[key] !== claim.process_position[key]));
  if (missing || mismatch) return { ...identity, available: false, stale: true, measured: NaN, status: 'MISSING · CURRENT STATE UNAVAILABLE',
    reason: mismatch ? 'data.json and process.json disagree on standing, date or position.' : 'Standing or process record is missing/invalid.',
    statusTone: 'red', mapping: 'Source unavailable', observed: 'UNMEASURED', processObserved: 'UNMEASURED',
    landed: 'Current standing is unavailable. Reconcile data.json and process.json; dated history is not a fallback.',
    nextStep: 'Restore and verify the current source records.', phaseStates: [], footprint: [] };
  const measured = parsedTime(claim.observed_at || claim.status_at);
  const processMeasured = parsedTime(position.as_of);
  const limit = claim.freshness_limit_hours;
  const stale = typeof limit !== 'number' || !Number.isFinite(limit) || limit <= 0 ||
    [measured, processMeasured].some(stamp => !Number.isFinite(stamp) || stamp > now + 300000 || now - stamp > limit * 3600000);
  return { ...identity, available: true, stale, measured, claimStatus: claim.status,
    status: `${claim.status} · ${position.state}`, statusTone: claim.status === 'MISSING' ? 'red' : claim.status === 'BLOCKED' ? 'amber' : 'blue',
    mapping: processValue.label || 'ASAP process', observed: snapshotLabel(claim.observed_at || claim.status_at), processObserved: snapshotLabel(position.as_of),
    landed: claim.value, nextStep: formatNextStep(claim.next_step, 'The governed next step is unavailable.'),
    claimHref: `claims.html#claim-${encodeURIComponent(claim.claim_id)}`,
    evidence: Array.isArray(claim.evidence) ? claim.evidence.filter(item => item && typeof item === 'object') : [],
    phaseStates: [{ code: position.current_stage, name: position.state, state: ['BLOCKED', 'MISSING'].includes(claim.status) ? 'locked' : 'active', status: claim.status, detail: claim.value }],
    footprint: [{ value: position.current_stage, label: 'declared position; receipts govern completion' }] };
});

const processFrontier = value => {
  if (!value || typeof value.label !== 'string' || !Number.isFinite(parsedTime(value.generated_utc)) ||
      !Array.isArray(value.route) || value.route.some(stage => typeof stage !== 'string') ||
      !Array.isArray(value.stages) || !value.stages.length ||
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

const readASAPStages = value => {
  const stages = value?.asap_stages;
  const text = item => typeof item === 'string' && item.trim();
  if (!Array.isArray(stages) || stages.length !== 4 ||
      !Array.isArray(value.population_scope) || !value.population_scope.length || !value.population_scope.every(text) ||
      stages.some(stage => !stage || !/^[a-z]+$/.test(stage.id) ||
        !['label', 'letter', 'summary', 'scope', 'proof'].every(key => text(stage[key])) ||
        !['skills', 'tools'].every(key => Array.isArray(stage[key]) && stage[key].length && stage[key].every(text)) ||
        !Array.isArray(stage.native_phases) || !stage.native_phases.length ||
        stage.native_phases.some(phase => !text(phase) || ['p0', 'p4', 'fleet-held'].includes(phase)))) return [];
  const phases = stages.flatMap(stage => stage.native_phases);
  return new Set(stages.map(stage => stage.id)).size === 4 && new Set(phases).size === phases.length ? stages : [];
};

const asapPosition = (course, stages) => {
  const unassigned = reason => ({ stage: null, reason });
  if (!course.available) return unassigned(course.reason || 'Current source records are unavailable.');
  if (course.stale) return unassigned('Published position is stale; fresh source verification is required.');
  if (!['OBSERVED', 'BLOCKED'].includes(course.claimStatus)) return unassigned(`The published claim is ${course.claimStatus || 'unmeasured'}; no verified position is assigned.`);
  if (course.phaseStates?.length !== 1) return unassigned('Mixed or missing native positions need reconciliation.');
  if (!stages.length) return unassigned('The ASAP presentation crosswalk is unavailable.');
  const phase = course.phaseStates[0].code;
  const stage = stages.find(item => item.native_phases.includes(phase));
  return stage ? { stage: stage.id, reason: `Reported position: ${stage.label} (${phase}). Stage placement only; population evidence is shown below.` } :
    unassigned(`Native position ${phase || 'unknown'} is unassigned. ${course.phaseStates[0].name || 'Its scope needs verification.'}`);
};

const populationRows = (data, courseId, labels, now = Date.now()) => labels.map(label => {
  const row = data?.population_coverage?.schema === 'population-evidence/v1' ? data.population_coverage.courses?.[courseId]?.[label] : null;
  const valid = row && ['value', 'detail', 'next_step', 'level'].every(key => typeof row[key] === 'string' && row[key].trim()) &&
    Number.isFinite(parsedTime(row.observed_at)) && parsedTime(row.observed_at) <= now + 300000 &&
    Array.isArray(row.evidence) && row.evidence.length && row.evidence.every(e =>
      e && typeof e.url === 'string' && /^https:\/\/github\.com\/[^/]+\/[^/]+\/blob\/[a-f0-9]{40}\//.test(e.url) && /^[a-f0-9]{64}$/.test(e.sha256));
  return valid ? { ...row, label, measured: true, stale: now - parsedTime(row.observed_at) > FRESHNESS_LIMIT_MS } : { label, measured: false };
});

const renderPopulationCoverage = (processValue, now) => {
  const section = make('section', 'population-coverage');
  section.setAttribute('aria-labelledby', 'population-coverage-title');
  section.append(make('h3', '', 'Population coverage')); section.firstChild.id = 'population-coverage-title';
  const label = make('label', 'population-selector-label', 'Course'); label.htmlFor = 'population-course';
  const select = make('select', 'population-selector'); select.id = 'population-course';
  COURSE_IDENTITIES.forEach(course => { const option = make('option', '', course.label); option.value = course.id; select.append(option); });
  select.value = AP4_DASHBOARD.activeCourse;
  const summary = make('p', 'population-summary'); summary.setAttribute('role', 'status');
  const table = make('table', 'asap-coverage-table');
  const caption = make('caption'); const head = make('thead'); const headings = make('tr');
  ['Population', 'Recorded evidence', 'Remaining work'].forEach(text => { const cell = make('th', '', text); cell.scope = 'col'; headings.append(cell); });
  head.append(headings); const body = make('tbody'); table.append(caption, head, body);
  const scroll = make('div', 'asap-table-scroll'); scroll.append(table);
  const draw = () => {
    AP4_DASHBOARD.activeCourse = select.value;
    const rows = populationRows(AP4_DASHBOARD.data, select.value, processValue.population_scope, now);
    const measured = rows.filter(row => row.measured).length;
    caption.textContent = COURSE_IDENTITIES.find(course => course.id === select.value).label;
    summary.textContent = `${measured} of ${rows.length} populations have linked source evidence. Counts describe the named source or receipt, not whole-course acceptance or a fresh live check.`;
    body.replaceChildren();
    rows.forEach(row => {
      const tr = make('tr', row.measured ? 'population-recorded' : 'population-pending');
      const name = make('th', '', row.label); name.scope = 'row'; tr.append(name);
      if (!row.measured) {
        const pending = make('td', '', 'Audit pending · match the required population to its native inventory and acceptance receipt.');
        pending.colSpan = 2; tr.append(pending);
      } else {
        const value = make('td'); value.append(make('strong', '', row.value));
        value.append(make('span', 'population-evidence-kind', `${row.level}${row.stale ? ' · refresh needed' : ''}`));
        const details = make('details'); details.append(make('summary', '', 'Scope & source'), make('p', '', row.detail));
        details.append(make('p', '', `Source read: ${snapshotLabel(row.observed_at)}`));
        row.evidence.forEach((e, i) => { const link = make('a', 'population-source', `Evidence ${i + 1} ↗`); link.href = e.url; details.append(link); });
        value.append(details); tr.append(value, make('td', '', row.next_step));
      }
      body.append(tr);
    });
  };
  select.addEventListener('change', draw); draw();
  section.append(label, select, summary, scroll); return section;
};

const renderASAP = (root, processValue, now) => {
  const stages = AP4_DASHBOARD.asapStages;
  const focusedId = root.contains(document.activeElement) ? document.activeElement.id : null;
  root.setAttribute('aria-busy', 'false');
  if (!stages.length) {
    AP4_DASHBOARD.activeStage = null;
    root.replaceChildren(make('p', 'asap-unassigned', 'ASAP views unavailable: the generated presentation crosswalk is missing or invalid. All course records remain visible below.'));
    return;
  }
  const grid = make('div', 'asap-grid');
  const drawers = make('div', 'asap-drawers');
  const notice = make('p', 'asap-filter-status');
  notice.setAttribute('role', 'status');
  const reset = make('button', 'asap-reset', 'Show all courses');
  reset.type = 'button'; reset.id = 'asap-show-all';
  const controls = make('div', 'asap-filter-controls');
  controls.append(notice, reset);
  const select = id => {
    AP4_DASHBOARD.activeStage = id;
    grid.querySelectorAll('button').forEach(button => button.setAttribute('aria-expanded', String(button.dataset.stage === id)));
    drawers.querySelectorAll('[data-stage-panel]').forEach(panel => { panel.hidden = panel.dataset.stagePanel !== id; });
    document.querySelectorAll('[data-course-card]').forEach(card => {
      const course = AP4_DASHBOARD.courses.find(item => item.id === card.dataset.courseCard);
      const position = course && asapPosition(course, stages);
      card.hidden = !!(id && position?.stage && position.stage !== id);
    });
    const unassigned = AP4_DASHBOARD.courses.filter(course => !asapPosition(course, stages).stage).length;
    const matched = AP4_DASHBOARD.courses.filter(course => asapPosition(course, stages).stage === id).length;
    notice.textContent = id ? `${stages.find(stage => stage.id === id).label}: ${matched} matching published position${matched === 1 ? '' : 's'}. ${unassigned} unassigned course${unassigned === 1 ? '' : 's'} remain visible with the reason below.` :
      `All ${AP4_DASHBOARD.courses.length} courses shown. ${unassigned} awaiting stage reconciliation. Inspect population evidence below.`;
  };
  stages.forEach(stage => {
    const button = make('button', 'asap-card');
    button.type = 'button'; button.id = `asap-${stage.id}`; button.dataset.stage = stage.id;
    button.setAttribute('aria-controls', `asap-panel-${stage.id}`);
    const heading = make('span', 'asap-card-heading');
    const letter = make('span', 'asap-letter', stage.letter); letter.setAttribute('aria-hidden', 'true');
    heading.append(letter, make('span', 'asap-title', stage.label), make('span', 'asap-toggle', '+'));
    heading.lastChild.setAttribute('aria-hidden', 'true');
    const matching = AP4_DASHBOARD.courses.filter(course => asapPosition(course, stages).stage === stage.id);
    button.append(heading, make('span', 'asap-summary', stage.summary), make('span', 'asap-coverage', `${matching.length} course${matching.length === 1 ? '' : 's'} at this stage`));
    const positions = make('span', 'asap-positions');
    if (!matching.length) positions.append(make('span', '', 'No fresh matching position'));
    matching.forEach(course => positions.append(make('span', '', `${course.short} · checked ${ageLabel(course.measured, now)}`)));
    button.append(positions); grid.append(button);
    const panel = make('div', 'asap-drawer');
    panel.id = `asap-panel-${stage.id}`; panel.dataset.stagePanel = stage.id;
    panel.setAttribute('role', 'region'); panel.setAttribute('aria-labelledby', button.id);
    panel.append(make('h3', '', `${stage.label}: scope and evidence`), make('p', '', stage.scope), make('p', 'asap-proof', stage.proof));
    panel.append(make('p', 'asap-tools', `Load on demand: ${stage.skills.join(' · ')}.`), make('p', 'asap-tools', `Native tools: ${stage.tools.join(' · ')}. Resolve the current owning skill; these labels are not executable commands.`));
    panel.append(make('p', 'asap-native-scope', `Native scope: ${stage.native_phases.join(' · ')}. These views do not impose an execution order or change course authority.`));
    drawers.append(panel);
    button.addEventListener('click', () => select(AP4_DASHBOARD.activeStage === stage.id ? null : stage.id));
    const closeOnEscape = event => { if (event.key === 'Escape') { select(null); button.focus(); } };
    button.addEventListener('keydown', closeOnEscape); panel.addEventListener('keydown', closeOnEscape);
  });
  reset.addEventListener('click', () => select(null));
  root.replaceChildren(grid, controls, drawers);
  const unassignedCourses = AP4_DASHBOARD.courses.filter(course => !asapPosition(course, stages).stage);
  if (unassignedCourses.length) {
    const unassigned = make('aside', 'asap-unassigned');
    unassigned.append(make('strong', '', 'Stage needs reconciliation'));
    unassignedCourses.forEach(course => { const link = make('a', '', `${course.short}: ${asapPosition(course, stages).reason}`); link.href = `${course.id}.html`; unassigned.append(link); });
    root.append(unassigned);
  }
  root.append(renderPopulationCoverage(processValue, now));
  select(stages.some(stage => stage.id === AP4_DASHBOARD.activeStage) ? AP4_DASHBOARD.activeStage : null);
  if (focusedId) document.getElementById(focusedId)?.focus();
};

const renderNeedsHuman = (root, result, now) => {
  root.className = `needs-human-strip ${result.status === 'hold' ? 'is-hold' : result.items.length ? 'has-items' : 'is-clear'}`;
  const head = make('div', 'needs-human-head');
  if (result.status === 'hold') {
    head.append(make('h2', '', 'Request projection unavailable'), make('p', '', result.reason));
    root.replaceChildren(head);
    return;
  }
  const title = make('h2', '', result.items.length ? `Recorded requests: ${result.items.length}` : 'No requests in this projection');
  head.append(title, make('p', '', `Projection generated ${ageLabel(result.generated, now)}. Unresolved ledger entries retain their original dates; they do not prove a current blocker.`));
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
    const meta = make('span', '', `Recorded ${snapshotLabel(item.ts)} · ${item.deadline ? `Recorded deadline ${item.deadline}` : 'No recorded deadline'}`);
    copy.append(meta);
    row.append(copy);
    list.append(row);
  });
  if (result.items.every(item => /^(historical|optional historical) /i.test(item.title))) {
    const details = make('details');
    const summary = make('summary', 'needs-human-head');
    summary.append(...head.childNodes);
    details.append(summary, list);
    root.replaceChildren(details);
  } else root.replaceChildren(head, list);
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
  const summary = globalThis.AP4_UPDATES?.summarizeCourse;
  const head = make('div', 'timeline-head');
  const intro = make('div');
  intro.append(make('span', 'badge b-blue', 'ASAP edition (2026-09-01)'), make('h2', '', 'All four courses'),
    make('p', 'timeline-sub', 'Re-earned state, freshness, machine-readable next step, and measured rates. Open a course for receipts and full detail.'));
  head.append(intro, make('span', 'timeline-snapshot', `Dashboard snapshot · ${snapshotLabel(data?.snapshot)}`));
  const grid = make('div', 'course-card-grid');
  grid.setAttribute('aria-label', 'Current TimeBack state and next step by course');
  AP4_DASHBOARD.courses.forEach(course => {
    const { measured, stale } = course;
    const rates = Array.isArray(updates) && typeof summary === 'function' ? summary(updates, course.id, now) : null;
    const card = make('a', `course-summary-card${stale ? ' is-stale' : ''}`);
    card.dataset.courseCard = course.id;
    card.href = `${course.id}.html`;
    card.style.setProperty('--course-color', course.color);
    const headline = make('div', 'course-card-headline');
    const status = make('span', 'course-card-status', `${stale ? 'STALE · ' : ''}${course.status} · claim checked ${ageLabel(measured, now)}`);
    if (Number.isFinite(measured)) status.title = new Date(measured).toISOString();
    headline.append(status);
    card.append(headline, make('h3', '', course.label));
    const landed = make('p', 'course-card-landed');
    landed.append(make('strong', '', 'Standing: '), course.landed);
    const next = make('p', 'course-card-next');
    next.append(make('strong', '', 'Next: '), course.nextStep);
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
    const position = asapPosition(course, AP4_DASHBOARD.asapStages);
    card.append(make('p', 'course-asap-position', `${position.stage ? '' : 'Unassigned · '}${position.reason}`), landed, next, tiles);
    grid.append(card);
  });
  root.replaceChildren(head, grid);
};

const renderCourseDetails = () => {
  const appendState = (root, course) => {
    root.append(make('p', `gate-observed${course.stale ? ' is-stale' : ''}`, `${course.stale ? 'STALE · ' : ''}${course.status} · claim checked ${course.observed} · process position dated ${course.processObserved}`));
    const grid = make('div', 'phase-state-grid');
    course.phaseStates.forEach(phase => {
      const row = make('div', `phase-state phase-state-${phase.state}`);
      row.append(make('strong', '', phase.code), make('h3', '', phase.name));
      grid.append(row);
    });
    root.append(grid, make('p', '', course.landed), make('p', 'course-card-next', `Next: ${course.nextStep}`));
    if (course.reason) root.append(make('p', 'update-empty', course.reason));
    if (course.evidence?.length) {
      const sources = make('ul', 'course-source-evidence');
      course.evidence.forEach(item => {
        const row = make('li');
        const label = typeof item.type === 'string' ? item.type : 'Source reference';
        if (typeof item.url === 'string' && /^https?:\/\//i.test(item.url)) {
          const link = make('a', '', label); link.href = item.url; row.append(link);
        } else row.append(make('span', '', `${label}: ${typeof item.location === 'string' ? item.location : 'Link unavailable'}`));
        row.append(make('small', '', ` · reference checked ${snapshotLabel(item.observed_at)}`));
        if (typeof item.scope === 'string') row.append(make('span', '', ` · ${item.scope}`));
        sources.append(row);
      });
      root.append(make('h3', '', 'Referenced evidence'), sources);
    }
    if (course.claimHref) {
      const link = make('a', '', 'Open standing claim and source receipts →');
      link.href = course.claimHref; root.append(link);
    }
  };
  document.querySelectorAll('[data-phase-summary]').forEach(root => {
    root.replaceChildren(make('h2', '', 'Current source-bound position'), make('p', '', 'Standing claims and declared process positions; repository activity does not advance either.'));
    const list = make('div', 'phase-course-list');
    AP4_DASHBOARD.courses.forEach(course => {
      const row = make('article'); row.append(make('h3', '', course.label)); appendState(row, course); list.append(row);
    });
    root.append(list);
  });
  document.querySelectorAll('[data-gate-evidence]').forEach(root => {
    const course = AP4_DASHBOARD.courses.find(item => item.id === root.dataset.gateEvidence);
    if (!course) { root.replaceChildren(make('p', '', 'Unknown course; current state unavailable.')); return; }
    root.classList.add('gate-evidence-sec'); root.replaceChildren(make('h2', '', 'Current ASAP position')); appendState(root, course);
    const main = root.closest('main');
    const intro = main?.querySelector('h1 + .sub');
    if (intro) intro.textContent = `${course.stale ? 'STALE · ' : ''}Source check: ${course.observed}. ${course.landed}`;
    const next = main?.querySelector('[data-course-next]');
    if (next) next.textContent = course.nextStep;
  });
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
  const claim = { claim_id: 'humgeo.blueprint.audit', status: 'OBSERVED', value: 'Current checked source', observed_at: new Date(now - 3600000).toISOString(), freshness_limit_hours: 24, process_position: { current_stage: 'p3', state: 'VALIDATING' } };
  const processValue = { courses: { humgeo: { current_stage: 'p3', state: 'VALIDATING', detail: claim.value, as_of: claim.observed_at } } };
  const view = bindCourseState({ claims: [claim] }, processValue, now);
  if (view.length !== 4 || view[0].landed !== claim.value || view[0].stale || view[1].available) throw new Error('current source binding failed');
  const older = { ...claim, observed_at: new Date(now - 172800000).toISOString(), current_event: { ts: new Date(now).toISOString(), kind: 'landed', phase: 'p8', text: 'Recent activity' } };
  const olderProcess = { courses: { humgeo: { ...processValue.courses.humgeo, as_of: older.observed_at } } };
  const stale = bindCourseState({ claims: [older] }, olderProcess, now)[0];
  if (!stale.stale || stale.landed !== claim.value || stale.phaseStates[0].code !== 'p3') throw new Error('activity refreshed or advanced a standing claim');
  for (const field of ['detail', 'as_of', 'current_stage', 'state']) {
    const drift = { courses: { humgeo: { ...processValue.courses.humgeo, [field]: 'Different source value' } } };
    if (bindCourseState({ claims: [claim] }, drift, now)[0].available) throw new Error(`${field} drift accepted as current`);
  }
  const p5 = { ...claim, process_position: { current_stage: 'p5', state: 'PARTIAL' } };
  const p5View = bindCourseState({ claims: [p5] }, { courses: { humgeo: { ...processValue.courses.humgeo, ...p5.process_position } } }, now)[0];
  if (p5View.phaseStates.length !== 1 || p5View.phaseStates[0].code !== 'p5' || p5View.phaseStates[0].status !== 'OBSERVED') throw new Error('position inferred another phase or PASS');
  if (bindCourseState(null, processValue, now)[0].available || bindCourseState({ claims: [claim] }, null, now)[0].available || bindCourseState({ claims: [claim, claim] }, processValue, now)[0].available) throw new Error('missing/duplicate source used a fallback');

};

globalThis.AP4_BOARD = { ageLabel, asapPosition, automationGap, bindCourseState, formatNextStep, populationRows, processFrontier, readASAPStages, renderASAP, renderCourseCards, renderNeedsHuman, validateNeedsHuman };

(() => {
  if (typeof document === 'undefined') { boardSelftest(); return; }
  const root = document.getElementById('course-release-timeline');
  const needsRoot = document.getElementById('needs-human-strip');
  const frontierRoot = document.getElementById('automation-frontier');
  const asapRoot = document.getElementById('asap-stage-view');
  const load = async path => {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) throw new Error(`${path} returned ${response.status}`);
    const value = await response.json();
    if (path === 'data.json' && !Array.isArray(value?.claims)) throw new Error('data.json claims are invalid');
    if (path === 'process.json' && (!processFrontier(value) || !value.courses || Array.isArray(value.courses))) throw new Error('process.json is invalid');
    if (path === 'updates.json' && !Array.isArray(value)) throw new Error('updates.json is invalid');
    return value;
  };
  let stateRefresh, needsRefresh;
  const refreshState = () => stateRefresh || (stateRefresh = Promise.allSettled([
    load('data.json'), load('process.json'), globalThis.AP4_UPDATES?.load ? globalThis.AP4_UPDATES.load() : load('updates.json'),
  ]).then(results => {
    const [data, processValue, updates] = results.map(result => result.status === 'fulfilled' ? result.value : null);
    const now = Date.now();
    AP4_DASHBOARD.data = data; AP4_DASHBOARD.process = processValue; AP4_DASHBOARD.updates = updates;
    AP4_DASHBOARD.snapshot = typeof data?.snapshot === 'string' ? data.snapshot : 'UNMEASURED';
    AP4_DASHBOARD.errors = results.flatMap((result, index) => result.status === 'rejected' ? [`${['data.json', 'process.json', 'updates.json'][index]} unavailable: ${result.reason.message}`] : []);
    AP4_DASHBOARD.courses = bindCourseState(data, processValue, now);
    AP4_DASHBOARD.asapStages = readASAPStages(processValue);
    AP4_DASHBOARD.errors.push(...AP4_DASHBOARD.courses.filter(course => !course.available).map(course => `${course.short}: ${course.reason}`));
    renderCourseDetails();
    if (frontierRoot) renderFrontier(frontierRoot, processValue, now);
    if (root) renderCourseCards(root, data, updates, now);
    if (asapRoot) renderASAP(asapRoot, processValue, now);
    document.dispatchEvent(new CustomEvent('ap4-state-changed'));
    return AP4_DASHBOARD;
  }).finally(() => { stateRefresh = null; }));
  const refreshNeedsHuman = () => !needsRoot ? Promise.resolve() : needsRefresh || (needsRefresh = load('needs-human.json')
    .then(value => renderNeedsHuman(needsRoot, validateNeedsHuman(value), Date.now()))
    .catch(() => renderNeedsHuman(needsRoot, validateNeedsHuman(null), Date.now()))
    .finally(() => { needsRefresh = null; }));
  AP4_DASHBOARD.refresh = () => AP4_DASHBOARD.ready = refreshState();
  AP4_DASHBOARD.refresh(); void refreshNeedsHuman();
  const refreshOnReturn = () => {
    if (!document.hidden) { AP4_DASHBOARD.refresh(); void refreshNeedsHuman(); }
  };
  window.addEventListener('focus', refreshOnReturn);
  window.addEventListener('pageshow', refreshOnReturn);
  document.addEventListener('visibilitychange', refreshOnReturn);
})();
