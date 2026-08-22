/*
Dashboard display contract:
- Counts describe observable work units. They are never added into a completion score.
- HumGeo is the active seven-gate rail; APWH has its own owner-directed six-gate plan
  with optional Gate 0, a closed Gate 1, and an open Gate 2.
- APUSH and Psychology mappings are retrospective filing aids, not gate credit.
- Evidence on a locked gate stays evidence; it does not unlock that gate.
*/
const AP4_DASHBOARD = {
  snapshot: 'Aug 22, 2026 · 20:22 KST',
  activeCourse: 'humgeo',
  gates: [
    { id: 0, name: 'Stabilize', state: 'closed', status: 'Closed', detail: 'The six-slot pilot is fully measured: one passing replacement landed, five failures remain preserved, and residual execution is stopped.' },
    { id: 1, name: 'Lock scope', state: 'closed', status: 'Closed', detail: 'PR #62 and the issue #50 reconciliation receipt close the exact 150-EK, 70-LO, 68-topic, and 68-gate scope on canonical main aa11026.' },
    { id: 2, name: 'Inventory', state: 'closed', status: 'Closed', detail: 'The sanctioned read-only bank audit and deterministic reconciliation account for all 8,377 required rows with zero unknown or unmeasured and prove an exact four-slot shortage.' },
    { id: 3, name: 'Fill gaps', state: 'closed', status: 'Closed', detail: 'Four proved shortages were generated through the served Content Factory and passed matching full QC. One placement collision was retained and regenerated; zero residue remains.' },
    { id: 4, name: 'Assemble', state: 'active', status: 'HOLD · blocked contract', detail: 'PR #63 is merged. AP One #659 now carries the exact publisher-contract request; canonical landing, deployment, and exact readback remain unproved.' },
    { id: 5, name: 'Learner proof', state: 'locked', status: 'Locked', detail: 'Historical local walks do not prove the current canonical course. Exact deployed-byte learner verification belongs here after assembly.' },
    { id: 6, name: 'Release', state: 'locked', status: 'Locked', detail: 'TimeBack, EOC, production readback, and final approval remain later release obligations.' }
  ],
  courses: [
    {
      id: 'humgeo', label: 'AP Human Geography', short: 'HumGeo', color: '#2558d8',
      status: 'Gate 4 · HOLD', statusTone: 'amber', mapping: 'Approved gate sequence', observed: 'Aug 22 · 10:21Z',
      summary: 'Official scope, the 8,377-row inventory, and the four-item factory gap fill are closed locally. #659 remains unanswered; GET-only PR #842 does not satisfy the publisher contract.',
      footprint: [
        { value: '8,377', label: 'required rows classified' },
        { value: '0', label: 'unknown or unmeasured' },
        { value: '4', label: 'accepted Gate 3 artifacts' }
      ],
      etaDays: 'GATE 4 HOLD',
      etaNote: 'Gates 0-3 are closed locally and PR #63 is merged. AP One #659 owns the publisher-contract unblock; no landing, deployment, or learner visibility is claimed yet.'
    },
    {
      id: 'apwh', label: 'AP World History', short: 'APWH', color: '#4f46b8',
      status: 'Gate 2 · HOLD', statusTone: 'amber', mapping: 'Owner-directed gate sequence', observed: 'Aug 22 · 11:22Z',
      summary: 'The exact 9-unit, 71-topic, 71-LO scope is locked. The first sanctioned Gate 2 reconciliation is byte-repeatable but cannot close while unknown and unmeasured rows remain.',
      footprint: [
        { value: '2,791', label: 'live passed/available MCQs' },
        { value: '9,633', label: 'item identities reconciled' },
        { value: '5,919', label: 'concrete slots classified' }
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
      note: 'HumGeo uses the approved gate sequence. Gates 0-3 have local closure credit. Gate 4 is held on a missing publisher contract; later rows remain locked evidence only.',
      rows: [
        { gate: 0, state: 'closed', status: 'Closed', signal: '6 pilot slots · 1 pass landed · 5 measured failures preserved', copy: 'The issue-44 writer was stopped and the residual retry was rescoped, closing the stabilization gate without hiding the five failures.', href: 'https://github.com/ilmych/humgeo-rebuild/issues/44#issuecomment-5365762989' },
        { gate: 1, state: 'closed', status: 'Closed', signal: '150 EKs · 70 LOs · 68 mappings · zero differences', copy: 'PR #62 merged the official-source authority and shared gate rule on canonical main. Issue #50 now carries the merged-SHA verifier receipt and no rework label.', href: 'https://github.com/ilmych/humgeo-rebuild/issues/50#issuecomment-5369982183' },
        { gate: 2, state: 'closed', status: 'Closed · evidence in review', signal: '8,377 classified · 0 unknown · 4-slot shortage', copy: 'A sanctioned metadata-only factory-bank snapshot and independent deterministic review closed the inventory. The evidence is now included in PR #63.', href: 'https://github.com/ilmych/humgeo-rebuild/pull/63' },
        { gate: 3, state: 'closed', status: 'Closed · CONTENT_COMPLETE', signal: '4 accepted · 1 retained collision · 0 residue', copy: 'All four proved shortages have matching terminal factory creation and full-QC receipts. The package remains a candidate until Gate 4 lands it.', href: 'https://github.com/ilmych/humgeo-rebuild/pull/63' },
        { gate: 4, state: 'active', status: 'HOLD · BLOCKED_CONTRACT', signal: 'PR #63 merged · publisher contract requested', copy: 'AP One #659 must bind the package, seal/version transition, complete manifest, authorized writer and recovery path, and exact readback before any Gate 4 write.', href: 'https://github.com/InceptTrilogy/ap-one/issues/659#issuecomment-5378967008' }
      ]
    },
    apwh: {
      title: 'APWH six-gate sequence',
      note: 'Gate 1 has local closure credit on pinned bytes. Gate 2 has a sanctioned census and repeatable first reconciliation, but closure is held on nonzero unknowns. Gate 3 remains locked.',
      rows: [
        { gate: 1, state: 'closed', status: 'Closed · SCOPE_LOCKED', signal: '9 units · 71 topics · 71 LOs · 71 production gates', copy: 'Pinned official, blueprint, accepted-lesson, and AP One identities agree. Eight known-bad mutations fail closed; broad conformance debt is preserved separately.', href: 'https://github.com/ilmych/apwh-blueprint-build/tree/8a6ebccbc72451217d1739791d89c14f492ccb60' },
        { gate: 2, state: 'active', status: 'In progress · zero-unknown hold', signal: '2,791 live · 9,633 identities · 5,919 slots', copy: 'The census used REPEATABLE READ, server-verified read-only mode, and ROLLBACK. The byte-repeatable inventory exposes 235 accepted preview items not landed, four missing mock forms, and unresolved serving and oracle rows; it does not authorize generation.', href: 'apwh.html' },
        { gate: 4, state: 'evidence', status: 'Locked evidence only', signal: '0 of 71 tenant gates preserved', copy: 'The current launch expectation records the serving gap. A fresh tenant readback remains a Gate 2 unknown and any mutation remains locked to later assembly.', href: 'https://github.com/InceptTrilogy/ap-one/tree/bb17b21b856d81de4ba26c468790f0c5896a3c75/services/bff/data/courses/ap-world-history-fall-2026-v1' }
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
        <p class="timeline-sub">HumGeo has four locally closed gates; Gate 4 is held on the missing AP One publisher contract and Gates 5-6 remain locked. Other courses keep their verified work visible below without being rendered as empty gate rows.</p>
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
        <div><span class="eyebrow">Current gate</span><h3>Gate 4 · Land and assemble · HOLD</h3></div>
        <span class="badge b-blue">UNDERWAY</span>
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
  showGate(4);
})();
