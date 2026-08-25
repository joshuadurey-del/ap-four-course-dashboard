/*
Dashboard display contract:
- Overview cards show only the current TimeBack gate and next governed step.
- All four courses use the same local source-acceptance gates followed by Ilma's native
  TimeBack publication lifecycle.
- Historical receipts retain their original scope and move only to a new credit home.
- Evidence on a locked gate stays evidence; it does not unlock that gate.
*/
const AP4_DASHBOARD = {
  snapshot: 'Aug 25, 2026 · 11:23 KST',
  activeCourse: 'humgeo',
  gates: [
    { id: 0, name: 'Stabilize', state: 'closed', status: 'Closed', detail: 'The six-slot pilot is fully measured: one passing replacement landed, five failures remain preserved, and residual execution is stopped.' },
    { id: 1, name: 'Lock scope', state: 'closed', status: 'Closed', detail: 'PR #62 and the issue #50 reconciliation receipt close the exact 150-EK, 70-LO, 68-topic, and 68-gate scope on canonical main aa11026.' },
    { id: 2, name: 'Inventory', state: 'closed', status: 'Closed · amendment locked', detail: 'Owner-merged PR #66 seals the omitted rehearsal lane: 655 checked, 70 stale-unusable, zero unknown or unmeasured, and byte-stable canonical verification.' },
    { id: 3, name: 'Accept source', state: 'closed', status: 'Closed · SOURCE_ACCEPTED', detail: 'Merged PR #67 and canonical post-merge verification bind all 70 replacement placements with exact coverage, the pinned delivery digest, and zero residue.' },
    { id: 4, name: 'Profile + authority', state: 'closed', status: 'Closed · PROFILE_AND_SOURCE_BOUND', detail: 'Owner-merged AP One main, canonical artifact reconstruction, exact oracle coverage, zero-write dry run, exact Deploy, and staging readback are bound.' },
    { id: 5, name: 'Graph + preview', state: 'locked', status: 'Locked', detail: 'Gate 5 remains locked pending a new explicit owner instruction. Gate 4 closure does not open it.' },
    { id: 6, name: 'Seal plan', state: 'locked', status: 'Locked', detail: 'Build the deterministic publication plan and bind an exact all-absent live checkpoint under Phases 4-5.' },
    { id: 7, name: 'Dark publish', state: 'locked', status: 'Locked', detail: 'Publish in testing under the global writer lock, exact-read each write, and replay the completed plan with zero writes.' },
    { id: 8, name: 'Canary enroll', state: 'locked', status: 'Locked', detail: 'Enroll only owner-controlled canaries under a separate plan and authority, then exact-read and replay with zero writes.' },
    { id: 9, name: 'Activate', state: 'locked', status: 'Locked', detail: 'Activate privately under its own authority, restore-proof checkpoint, exact readback, and zero-write replay.' },
    { id: 10, name: 'Learner accept', state: 'locked', status: 'Locked', detail: 'Fresh isolated learners prove start, middle, end, retries, writing grading, XP, persistence, identity isolation, and visuals.' },
    { id: 11, name: 'Release', state: 'locked', status: 'Locked', detail: 'Broader enrollment waits for the full release checklist, preserved repair chain, and owner decision.' }
  ],
  courses: [
    {
      id: 'humgeo', label: 'AP Human Geography', short: 'HumGeo', color: '#2558d8',
      status: 'Gate 4 · CLOSED', statusTone: 'green', mapping: 'Runbook-aligned sequence', observed: 'Aug 25 · 02:23Z',
      nextStep: 'Stop before Gate 5. Graph and preview work stays locked until a new explicit owner instruction.',
      footprint: [
        { value: '5,870/5,870', label: 'oracle coverage' },
        { value: '0', label: 'answer-shape failures' },
        { value: '0', label: 'Gate 4 writes' }
      ],
      etaDays: 'GATE 5 LOCKED',
      etaNote: 'Canonical HumGeo main 8495d759 and owner-merged AP One main e46586c3 bind the accepted source, profile, exhaustive capture, exact Deploy, and staging readback. A new owner instruction is required before Gate 5.'
    },
    {
      id: 'apwh', label: 'AP World History', short: 'APWH', color: '#4f46b8',
      status: 'Gate 2 · HOLD', statusTone: 'amber', mapping: 'Runbook-aligned sequence', observed: 'Aug 24 · 14:09Z',
      nextStep: 'Factory ask: adjudicate the two rubric-drift clauses and publish current SHA-bound receipts for all six grader boundaries, then rerun Gate 2 before opening Gate 3.',
      footprint: [
        { value: '2,791', label: 'live passed/available MCQs' },
        { value: '5,465', label: 'live passed constructed responses' },
        { value: '2 + 4', label: 'drift + missing receipts' }
      ]
    },
    {
      id: 'apush', label: 'AP US History', short: 'APUSH', color: '#c2413a',
      status: 'Gate 0 · IN PROGRESS', statusTone: 'blue', mapping: 'Runbook-aligned migration', observed: 'Aug 23 · 00:40Z',
      nextStep: 'Complete the live-writer and canonical-input census, then bind the existing evidence into exact Gate 1–3 closure packets without repeating accepted work.',
      footprint: [
        { value: '2,479', label: 'generation-QC candidates' },
        { value: '38', label: 'accepted positions' },
        { value: '+11', label: 'receipted successors' }
      ]
    },
    {
      id: 'psych', label: 'AP Psychology', short: 'Psych', color: '#7c3aed',
      status: 'Gate 0 · IN PROGRESS', statusTone: 'blue', mapping: 'Runbook-aligned migration', observed: 'Aug 23 · 00:40Z',
      nextStep: 'Complete the canonical-input census, bind the issue #2 and PR #28 bytes, and rerun current-source scope checks before any selective top-up.',
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
      note: 'Gates 3 and 4 are closed on canonical HumGeo main 8495d759 and owner-merged AP One main e46586c3. Gate 4 binds the exhaustive profile/source package, exact 5,870-coordinate oracle, zero-write dry run, Deploy, and staging proof. Gate 5 remains locked.',
      rows: [
        { gate: 0, state: 'closed', status: 'Closed', signal: '6 pilot slots · 1 pass landed · 5 measured failures preserved', copy: 'The issue-44 writer was stopped and the residual retry was rescoped, closing the stabilization gate without hiding the five failures.', href: 'https://github.com/ilmych/humgeo-rebuild/issues/44#issuecomment-5365762989' },
        { gate: 1, state: 'closed', status: 'Closed', signal: '150 EKs · 70 LOs · 68 mappings · zero differences', copy: 'PR #62 merged the official-source authority and shared gate rule on canonical main. Issue #50 now carries the merged-SHA verifier receipt and no rework label.', href: 'https://github.com/ilmych/humgeo-rebuild/issues/50#issuecomment-5369982183' },
        { gate: 2, state: 'closed', status: 'Closed · amendment locked', signal: 'PR #66 merged · 655 checked · 70 stale · zero unknown', copy: 'Canonical main e16aebeb seals the omitted rehearsal lane. The manifest rebuilt byte-for-byte; 43 focused and 837 full-suite tests passed.', href: 'https://github.com/ilmych/humgeo-rebuild/pull/66' },
        { gate: 3, state: 'closed', status: 'Closed · SOURCE_ACCEPTED', signal: 'PR #67 merged · 70/70 accepted · zero residue', copy: 'Canonical verification reproduced exact source coverage and delivery SHA-256 37fb16a0133bb1e1390cb6ce9ada96a2e96cfd49a9c54020046437d9e9edc11b; focused, affected, and full repository gates passed.', href: 'https://github.com/ilmych/humgeo-rebuild/pull/67' },
        { gate: 4, state: 'closed', status: 'Closed · PROFILE_AND_SOURCE_BOUND', signal: 'PR #851 merged · exact Deploy · exact staging SHA', copy: 'Canonical reconstruction reproduced the profile, exhaustive Phase 0 capture, native bind, unchanged 5,870-coordinate oracle, and zero-write receipt byte-for-byte. Deploy 32799920454 and staging matched owner-merged AP One main.', href: 'https://github.com/InceptTrilogy/ap-one/pull/851' },
        { gate: 5, state: 'locked', status: 'Locked', signal: 'New owner instruction required', copy: 'Gate 5 remains locked. No graph, preview, TimeBack, publication, or learner action is opened by Gate 4 closure.', href: 'humgeo.html' }
      ]
    },
    apwh: {
      title: 'APWH runbook-aligned sequence',
      note: 'Gate 1 retains closure credit. Gate 2 keeps its sanctioned census, repeatable reconciliation, and exhaustive GET-only readbacks; closure is held on two authority-drift clauses and four missing boundary-receipt clauses. Gate 3 remains locked.',
      rows: [
        { gate: 1, state: 'closed', status: 'Closed · SCOPE_LOCKED', signal: '9 units · 71 topics · 71 LOs · 71 production gates', copy: 'Pinned official, blueprint, accepted-lesson, and AP One identities agree. Eight known-bad mutations fail closed; broad conformance debt is preserved separately.', href: 'https://github.com/ilmych/apwh-blueprint-build/tree/8a6ebccbc72451217d1739791d89c14f492ccb60' },
        { gate: 2, state: 'active', status: 'In progress · grader-evidence hold', signal: '2,791 MCQ · 5,465 CR · 2 drift + 4 missing receipts', copy: 'A-116 and A-202 are proved missing and A-154 is attached. A-100/A-101 need factory authority adjudication; A-103–A-106 need current SHA-bound receipts, so source acceptance stays locked.', href: 'apwh.html' },
        { gate: 6, state: 'evidence', status: 'Historical absence evidence', signal: 'fresh GET: 0 of 71 tenant gates', copy: 'The zero-POST readback is retained as live-state evidence. It is not the runbook’s sealed all-absent checkpoint and earns no Gate 6 closure.', href: 'apwh.html' }
      ]
    },
    apush: {
      title: 'Existing work filed against the gate model',
      note: 'APUSH now uses the shared sequence. Existing work is credited without converting generated, receipted, accepted, and seated counts into one number.',
      rows: [
        { gate: 1, state: 'evidence', status: 'Mapped evidence', signal: '249-position blueprint · 4 recorded deviations', copy: 'The design reconciliation belongs with scope lock, but it is preparation rather than a current implementation crosswalk.', href: 'claims.html' },
        { gate: 2, state: 'evidence', status: 'Mapped evidence', signal: '2,479 candidates · 249 ledger positions', copy: 'The generation-QC corpus and canonical ledger provide a substantial inventory without implying that every candidate is accepted or seated.', href: 'claims.html' },
        { gate: 3, state: 'evidence', status: 'Mapped evidence', signal: '38 accepted · 211 pending · 11 additional receipts', copy: 'The accepted and receipted work is separated from pending scope so the dashboard does not inflate the usable corpus.', href: 'claims.html' },
        { gate: 4, state: 'evidence', status: 'Mapped evidence', signal: 'Seating reconciler merged · 0 of 11 newly seated', copy: 'The assembly mechanism exists on canonical main. The eleven successors still need canonical admission before a guarded seating run can change the count.', href: 'https://github.com/ilmych/apush-course-build/pull/6' }
      ]
    },
    psych: {
      title: 'Existing work filed against the gate model',
      note: 'Psychology now uses the shared sequence. Existing artifact work stays visible while current-source and learner-wiring closure remain unproved.',
      rows: [
        { gate: 1, state: 'evidence', status: 'Mapped evidence', signal: '221 of 221 EK design receipt', copy: 'The blueprint design scope is covered, but no course-level implementation oracle currently proves that design on the learner candidate.', href: 'claims.html' },
        { gate: 2, state: 'evidence', status: 'Mapped evidence', signal: '1,105 buckets scanned · 374 underfilled', copy: 'The bank inventory exposes the measurable shortage. Unit 5 scope must be sealed before that shortage becomes a generation order.', href: 'https://github.com/InceptTrilogy/ap-psychology-fall-2025-v1/issues/14' },
        { gate: 3, state: 'evidence', status: 'Mapped evidence', signal: '221 passing sidecars · 15 video assets · 34 image sets', copy: 'Substantial content and QC evidence already exists; the remaining work is selective, not a blank-slate rebuild.', href: 'https://github.com/InceptTrilogy/ap-psychology-fall-2025-v1/pull/23' },
        { gate: 4, state: 'evidence', status: 'Mapped evidence', signal: '34 embeds + 34 PNGs + 34 approvals · 71-file copy', copy: 'The PR #23 image-stage delivery is byte-accounted on its named checkpoint. This proves bounded landing, not current-source binding or full course wiring.', href: 'https://github.com/InceptTrilogy/ap-psychology-fall-2025-v1/pull/23' },
        { gate: 10, state: 'evidence', status: 'Historical evidence · stale', signal: '262 nodes · 5 units · 221 lessons', copy: 'An older course-tree receipt and failed chooser preflight remain historical learner-surface evidence, not current Gate 10 acceptance.', href: 'claims.html' }
      ]
    }
  }
};

(() => {
  const courses = AP4_DASHBOARD.courses;
  const activeCourse = courses.find(course => course.id === AP4_DASHBOARD.activeCourse);
  if (!activeCourse || AP4_DASHBOARD.gates.length !== 12 || new Set(AP4_DASHBOARD.gates.map(gate => gate.id)).size !== 12) {
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
        <p class="timeline-sub">Each card shows only the current TimeBack gate and the next governed step. Open a course page for its receipts and detailed evidence map.</p>
      </div>
      <span class="timeline-snapshot">Dashboard snapshot · ${AP4_DASHBOARD.snapshot}</span>
    </div>
    <div class="course-card-grid" aria-label="Current TimeBack gate and next step by course">
      ${courses.map(course => `
        <a class="course-summary-card${course.id === activeCourse.id ? ' is-active' : ''}" href="${course.id}.html" style="--course-color:${course.color}"${course.id === activeCourse.id ? ' aria-current="true"' : ''}>
          <span class="course-card-status b-${course.statusTone}">${course.status}</span>
          <h3>${course.label}</h3>
          <p><strong>Next:</strong> ${course.nextStep}</p>
        </a>`).join('')}
    </div>
    <div class="active-gate-wrap">
      <div class="active-gate-heading">
        <div><span class="eyebrow">Latest closed gate</span><h3>Gate 4 · Profile + authority</h3></div>
        <span class="badge b-green">CLOSED</span>
      </div>
      <div class="active-gate-rail" role="list" aria-label="Human Geography completion gates">
        ${AP4_DASHBOARD.gates.map(gate => `
          <button class="active-gate active-gate-${gate.state}" type="button" role="listitem" data-active-gate="${gate.id}" aria-pressed="${gate.id === 4}">
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
  showGate(2);
})();
