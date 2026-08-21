/*
Dashboard display contract:
- Counts describe observable work units. They are never added into a completion score.
- Only HumGeo currently has an approved seven-gate sequence.
- Other course mappings are retrospective filing aids, not gate credit.
- Evidence on a locked gate stays evidence; it does not unlock that gate.
*/
const AP4_DASHBOARD = {
  snapshot: 'Aug 21, 2026 · 19:07 KST',
  activeCourse: 'humgeo',
  gates: [
    { id: 0, name: 'Stabilize', state: 'closed', status: 'Closed', detail: 'The six-slot pilot is fully measured: one passing replacement landed, five failures remain preserved, and residual execution is stopped.' },
    { id: 1, name: 'Lock scope', state: 'active', status: 'Active', detail: 'PR #59 repaired all eight PR #58 regressions and the full suite is green. Official-source authority, exact-set mutations, and zero-difference reconciliation still gate closure.' },
    { id: 2, name: 'Inventory', state: 'locked-evidence', status: 'Locked · evidence exists', detail: 'A sealed 332-row residual plan exists as inventory input. It must be reconciled against the corrected scope and current assets after Gate 1 closes.' },
    { id: 3, name: 'Fill gaps', state: 'locked-evidence', status: 'Locked · evidence exists', detail: 'Earlier work re-earned 429 of 455 records through fresh fingerprint-bound QC. Gate 2 must decide what remains reusable before any new generation.' },
    { id: 4, name: 'Assemble', state: 'locked-evidence', status: 'Locked · evidence exists', detail: 'Corpus reconciliation and one passing pilot replacement have landed. They are assembly inputs, not proof of a complete projected course.' },
    { id: 5, name: 'Learner proof', state: 'locked', status: 'Locked', detail: 'Historical local walks do not prove the current canonical course. Exact deployed-byte learner verification belongs here after assembly.' },
    { id: 6, name: 'Release', state: 'locked', status: 'Locked', detail: 'TimeBack, EOC, production readback, and final approval remain later release obligations.' }
  ],
  courses: [
    {
      id: 'humgeo', label: 'AP Human Geography', short: 'HumGeo', color: '#2558d8',
      status: 'Gate 1 active', statusTone: 'blue', mapping: 'Approved gate sequence', observed: 'Aug 21 · 10:07Z',
      summary: 'The regression repair is merged and verified; official-scope authority closure remains in flight.',
      footprint: [
        { value: '6', label: 'pilot slots measured' },
        { value: '332', label: 'sealed plan rows' },
        { value: '429/455', label: 'fresh QC passes' }
      ],
      etaDays: 'Gate 1 active',
      etaNote: 'Gate 0 is closed. Gate 1 verification is active; Gate 2 remains locked.'
    },
    {
      id: 'apwh', label: 'AP World History', short: 'APWH', color: '#4f46b8',
      status: 'Evidence mapped', statusTone: 'purple', mapping: 'Gate mapping provisional', observed: 'Aug 20 · 10:25Z',
      summary: 'The accepted item population is substantial and exact; current blueprint reconciliation and learner delivery remain separate.',
      footprint: [
        { value: '933', label: 'banked identities' },
        { value: '2×933', label: 'passing acceptance legs' },
        { value: '0', label: 'item disagreements' }
      ]
    },
    {
      id: 'apush', label: 'AP US History', short: 'APUSH', color: '#c2413a',
      status: 'Evidence mapped', statusTone: 'purple', mapping: 'Gate mapping provisional', observed: 'Aug 20 · 05:27Z',
      summary: 'A large generation-QC corpus and a smaller accepted ledger exist; admission, measurement, and assembly remain distinct.',
      footprint: [
        { value: '2,479', label: 'generation-QC candidates' },
        { value: '38', label: 'accepted positions' },
        { value: '+11', label: 'receipted successors' }
      ]
    },
    {
      id: 'psych', label: 'AP Psychology', short: 'Psych', color: '#7c3aed',
      status: 'Evidence mapped', statusTone: 'purple', mapping: 'Gate mapping provisional', observed: 'Aug 20 · 18:50Z',
      summary: 'Articles, QC sidecars, video assets, and image-stage artifacts are present; safe scope and learner wiring remain open.',
      footprint: [
        { value: '221', label: 'passing article sidecars' },
        { value: '15', label: 'video release assets' },
        { value: '34', label: 'image-stage sets' }
      ]
    }
  ],
  evidenceMaps: {
    humgeo: {
      title: 'Work footprint mapped to the completion gates',
      note: 'HumGeo uses the approved gate sequence. Only Gate 0 has closure credit; later rows show reusable evidence waiting behind the active gate.',
      rows: [
        { gate: 0, state: 'closed', status: 'Closed', signal: '6 pilot slots · 1 pass landed · 5 measured failures preserved', copy: 'The issue-44 writer was stopped and the residual retry was rescoped, closing the stabilization gate without hiding the five failures.', href: 'https://github.com/ilmych/humgeo-rebuild/issues/44#issuecomment-5365762989' },
        { gate: 1, state: 'active', status: 'Active verification', signal: '150 EKs · 70 LOs · 68-map candidate · suite green', copy: 'PR #59 cleared the eight regressions. The candidate still needs official-byte authority, exact-set mutation proof, and zero-difference reconciliation before it earns closure.', href: 'https://github.com/ilmych/humgeo-rebuild/pull/59' },
        { gate: 2, state: 'evidence', status: 'Evidence · gate locked', signal: '332 classified residual rows', copy: 'The sealed, unarmed plan is useful inventory input. Gate 2 must reconcile every row against corrected scope and current assets.', href: 'https://github.com/ilmych/humgeo-rebuild/pull/56' },
        { gate: 3, state: 'evidence', status: 'Evidence · gate locked', signal: '455 re-screened · 429 fresh passes', copy: 'This is substantial prior QC work, but Gate 2 must decide which records still represent real shortages before generation resumes.', href: 'claims.html' },
        { gate: 4, state: 'evidence', status: 'Evidence · gate locked', signal: 'Reconciled corpus + 1 passing replacement landed', copy: 'Landing receipts exist for bounded inputs. They do not prove a complete course assembly or learner projection.', href: 'https://github.com/ilmych/humgeo-rebuild/pull/55' }
      ]
    },
    apwh: {
      title: 'Existing work filed against the gate model',
      note: 'APWH has not adopted HumGeo’s sequence. This retrospective map shows where the published evidence would belong; it awards no gate credit.',
      rows: [
        { gate: 1, state: 'evidence', status: 'Mapped evidence', signal: '235-ID blueprint oracle exists', copy: 'The instrument belongs with scope lock, but its last result was unreadable and remains unmeasured against the accepted candidate.', href: 'https://github.com/ilmych/apwh-blueprint-build/issues/48' },
        { gate: 2, state: 'evidence', status: 'Mapped evidence', signal: '933 banked identities', copy: 'The complete pinned item population is inventoried and population-scoped.', href: 'https://github.com/ilmych/apwh-blueprint-build/issues/48' },
        { gate: 3, state: 'evidence', status: 'Mapped evidence', signal: '2 passing legs × 933 items · 0 disagreements', copy: 'The accepted population has exact two-leg agreement. This is strong QC evidence, not learner-surface proof.', href: 'https://github.com/ilmych/apwh-blueprint-build/issues/48#issuecomment-5354633163' },
        { gate: 4, state: 'evidence', status: 'Mapped evidence', signal: 'Practice release gate 9 of 9', copy: 'A governed component gate is green, while full candidate packaging and external placement remain separate work.', href: 'https://github.com/InceptTrilogy/ap-one/issues/591#issuecomment-5304612000' }
      ]
    },
    apush: {
      title: 'Existing work filed against the gate model',
      note: 'APUSH has not adopted HumGeo’s sequence. Counts preserve the difference between generated, accepted, receipted, and actually seated work.',
      rows: [
        { gate: 1, state: 'evidence', status: 'Mapped evidence', signal: '249-position blueprint · 4 recorded deviations', copy: 'The design reconciliation belongs with scope lock, but it is preparation rather than a current implementation crosswalk.', href: 'claims.html' },
        { gate: 2, state: 'evidence', status: 'Mapped evidence', signal: '2,479 candidates · 249 ledger positions', copy: 'The generation-QC corpus and canonical ledger provide a substantial inventory without implying that every candidate is accepted or seated.', href: 'claims.html' },
        { gate: 3, state: 'evidence', status: 'Mapped evidence', signal: '38 accepted · 211 pending · 11 additional receipts', copy: 'The accepted and receipted work is separated from pending scope so the dashboard does not inflate the usable corpus.', href: 'claims.html' },
        { gate: 4, state: 'evidence', status: 'Mapped evidence', signal: 'Seating reconciler merged · 0 of 11 newly seated', copy: 'The assembly mechanism exists on canonical main. The eleven successors still need canonical admission before a guarded seating run can change the count.', href: 'https://github.com/ilmych/apush-course-build/pull/6' }
      ]
    },
    psych: {
      title: 'Existing work filed against the gate model',
      note: 'Psychology has not adopted HumGeo’s sequence. The map keeps completed artifact work visible while preserving the unresolved scope and learner-wiring boundaries.',
      rows: [
        { gate: 1, state: 'evidence', status: 'Mapped evidence', signal: '221 of 221 EK design receipt', copy: 'The blueprint design scope is covered, but no course-level implementation oracle currently proves that design on the learner candidate.', href: 'claims.html' },
        { gate: 2, state: 'evidence', status: 'Mapped evidence', signal: '1,105 buckets scanned · 374 underfilled', copy: 'The bank inventory exposes the measurable shortage. Unit 5 scope must be sealed before that shortage becomes a generation order.', href: 'https://github.com/InceptTrilogy/ap-psychology-fall-2025-v1/issues/14' },
        { gate: 3, state: 'evidence', status: 'Mapped evidence', signal: '221 passing sidecars · 15 video assets · 34 image sets', copy: 'Substantial content and QC evidence already exists; the remaining work is selective, not a blank-slate rebuild.', href: 'https://github.com/InceptTrilogy/ap-psychology-fall-2025-v1/pull/23' },
        { gate: 4, state: 'evidence', status: 'Mapped evidence', signal: '34 embeds + 34 PNGs + 34 approvals · 71-file copy', copy: 'The image-stage delivery is byte-accounted on repository main. This proves bounded landing, not full course wiring.', href: 'https://github.com/InceptTrilogy/ap-psychology-fall-2025-v1/pull/23' },
        { gate: 5, state: 'evidence', status: 'Historical evidence · stale', signal: '262 nodes · 5 units · 221 lessons', copy: 'An older course-tree receipt recorded this structure and a failed chooser preflight. It is retained as historical work evidence, not current learner proof.', href: 'claims.html' }
      ]
    }
  }
};

(() => {
  const courses = AP4_DASHBOARD.courses;
  const activeCourse = courses.find(course => course.id === AP4_DASHBOARD.activeCourse);
  if (!activeCourse || AP4_DASHBOARD.gates.length !== 7 || new Set(AP4_DASHBOARD.gates.map(gate => gate.id)).size !== 7) {
    throw new Error('Active-course gate data is incomplete.');
  }

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
        <div><span class="badge b-${course.statusTone}">${course.mapping}</span><h2>${map.title}</h2></div>
        <span class="gate-observed">Latest mapped receipt · ${course.observed}</span>
      </div>
      <p class="gate-evidence-note">${map.note} Evidence counts retain their cited scope and are never summed into a completion percentage.</p>
      <div class="work-footprint" aria-label="${course.label} observable work footprint">
        ${course.footprint.map(metric => `<div><strong>${metric.value}</strong><span>${metric.label}</span></div>`).join('')}
      </div>
      <div class="gate-evidence-list">
        ${map.rows.map(row => `
          <article class="gate-evidence-row gate-evidence-${row.state}">
            <div class="gate-evidence-id"><span>G${row.gate}</span><small>${AP4_DASHBOARD.gates[row.gate].name}</small></div>
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

  root.innerHTML = `
    <div class="timeline-head">
      <div>
        <span class="badge b-blue">Active course</span>
        <h2>${activeCourse.label}</h2>
        <p class="timeline-sub">One approved seven-gate sequence is in flight. Other courses keep their verified work visible below without being rendered as empty gate rows.</p>
      </div>
      <span class="timeline-snapshot">Dashboard snapshot · ${AP4_DASHBOARD.snapshot}</span>
    </div>
    <div class="course-card-grid" aria-label="Observable work by course">
      ${courses.map(course => `
        <a class="course-summary-card${course.id === activeCourse.id ? ' is-active' : ''}" href="${course.id}.html" style="--course-color:${course.color}"${course.id === activeCourse.id ? ' aria-current="true"' : ''}>
          <span class="course-card-status b-${course.statusTone}">${course.status}</span>
          <h3>${course.label}</h3>
          <div class="course-card-metrics">
            ${course.footprint.map(metric => `<span><strong>${metric.value}</strong><small>${metric.label}</small></span>`).join('')}
          </div>
          <p>${course.summary}</p>
          <small>${course.mapping} · receipts through ${course.observed}</small>
        </a>`).join('')}
    </div>
    <div class="active-gate-wrap">
      <div class="active-gate-heading">
        <div><span class="eyebrow">Active course gates</span><h3>Gate 1 · Lock official AP scope</h3></div>
        <span class="badge b-blue">In progress</span>
      </div>
      <div class="active-gate-rail" role="list" aria-label="Human Geography completion gates">
        ${AP4_DASHBOARD.gates.map(gate => `
          <button class="active-gate active-gate-${gate.state}" type="button" role="listitem" data-active-gate="${gate.id}" aria-pressed="${gate.id === 1}">
            <span class="active-gate-dot">G${gate.id}</span>
            <span class="active-gate-name">${gate.name}</span>
            <small>${gate.status}</small>
          </button>`).join('')}
      </div>
      <div class="active-gate-detail" aria-live="polite">
        <div><span data-gate-detail-state></span><strong data-gate-detail-title></strong></div>
        <p data-gate-detail-copy></p>
        <a href="humgeo.html">Open the full HumGeo evidence map →</a>
      </div>
      <p class="gate-legend"><span class="legend-closed">Closed</span><span class="legend-active">Active</span><span class="legend-evidence">Evidence exists, no gate credit</span><span class="legend-locked">Locked</span></p>
    </div>`;

  const controls = [...root.querySelectorAll('[data-active-gate]')];
  const detailState = root.querySelector('[data-gate-detail-state]');
  const detailTitle = root.querySelector('[data-gate-detail-title]');
  const detailCopy = root.querySelector('[data-gate-detail-copy]');

  function showGate(id) {
    const gate = AP4_DASHBOARD.gates.find(item => item.id === Number(id));
    if (!gate) return;
    detailState.textContent = gate.status;
    detailTitle.textContent = `Gate ${gate.id} · ${gate.name}`;
    detailCopy.textContent = gate.detail;
    controls.forEach(control => control.setAttribute('aria-pressed', String(control.dataset.activeGate === String(gate.id))));
  }

  controls.forEach(control => {
    control.addEventListener('click', () => showGate(control.dataset.activeGate));
    control.addEventListener('focus', () => showGate(control.dataset.activeGate));
  });
  showGate(1);
})();
