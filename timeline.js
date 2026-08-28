/*
Dashboard display contract:
- Overview cards show the current TimeBack lifecycle state, landed work, and next governed step.
- HumGeo uses the AP One Native TimeBack Course Publication Runbook lifecycle and phases.
- Historical receipts retain their original scope and move only to a new credit home.
- Evidence on a locked state stays evidence; it does not unlock that state.
*/
const AP4_DASHBOARD = {
  snapshot: 'Aug 28, 2026 · 14:38 KST',
  activeCourse: 'humgeo',
  gates: [
    { id: 0, name: 'Stabilize', canonCode: 'AS', railName: 'Source prep · stabilize', canonName: 'Accepted-source preparation · STABILIZED', state: 'closed', status: 'Closed', detail: 'The six-slot pilot is fully measured: one passing replacement landed, five failures remain preserved, and residual execution is stopped.' },
    { id: 1, name: 'Lock scope', canonCode: 'AS', railName: 'Source prep · scope', canonName: 'Accepted-source preparation · SCOPE_LOCKED', state: 'closed', status: 'Closed', detail: 'PR #62 and the issue #50 reconciliation receipt close the exact 150-EK, 70-LO, 68-topic, and 68-gate scope on canonical main aa11026.' },
    { id: 2, name: 'Inventory', canonCode: 'AS', railName: 'Source prep · inventory', canonName: 'Accepted-source preparation · INVENTORY_LOCKED', state: 'closed', status: 'Closed · amendment locked', detail: 'Owner-merged PR #66 seals the omitted rehearsal lane: 655 checked, 70 stale-unusable, zero unknown or unmeasured, and byte-stable canonical verification.' },
    { id: 3, name: 'Accept source', canonCode: 'AS', railName: 'Accepted source', canonName: 'Accepted source · SOURCE_ACCEPTED', state: 'closed', status: 'Closed · SOURCE_ACCEPTED', detail: 'Merged PR #67 and canonical post-merge verification bind all 70 replacement placements with exact coverage, the pinned delivery digest, and zero residue.' },
    { id: 4, name: 'Profile + authority', canonCode: 'P0', railName: 'Profile + source bound', canonName: 'Course profile + Phase 0 · PROFILE_AND_SOURCE_BOUND', state: 'closed', status: 'Closed · PROFILE_AND_SOURCE_BOUND', detail: 'Owner-merged AP One main, canonical artifact reconstruction, exact oracle coverage, zero-write dry run, exact Deploy, and staging readback are bound.' },
    { id: 5, name: 'Graph + preview', canonCode: 'P1-3', railName: 'Graph + preview', canonName: 'Phases 1-3 · Offline graph and student-surface preview', state: 'active', status: 'Active · census current', detail: '410 of 440 article checks are accepted through the factory census validator; 5 re-judge flips are actionable and 25 are terminal (10 policy, 10 S10-held, 5 amendment-14). All live writes remain zero.' },
    { id: 6, name: 'Seal plan', canonCode: 'P4-5', railName: 'Sealed plan', canonName: 'Phases 4-5 · Sealed all-absent plan', state: 'locked', status: 'Locked', detail: 'Build the deterministic publication plan and bind an exact all-absent live checkpoint.' },
    { id: 7, name: 'Dark publish', canonCode: 'P6', railName: 'Publish + replay', canonName: 'Phase 6 · Dark publication and exact zero-write replay', state: 'locked', status: 'Locked', detail: 'Publish in testing under the global writer lock, exact-read each write, and replay the completed plan with zero writes.' },
    { id: 8, name: 'Canary enroll', canonCode: 'P7', railName: 'Canary enrollments', canonName: 'Phase 7 · Owner-controlled canary enrollments', state: 'locked', status: 'Locked', detail: 'Enroll only owner-controlled canaries under a separate plan and authority, then exact-read and replay with zero writes.' },
    { id: 9, name: 'Activate', canonCode: 'P8', railName: 'Private activation', canonName: 'Phase 8 · Separate private activation', state: 'locked', status: 'Locked', detail: 'Activate privately under its own authority, restore-proof checkpoint, exact readback, and zero-write replay.' },
    { id: 10, name: 'Learner accept', canonCode: 'P9.1-9.5', railName: 'Learner acceptance', canonName: 'Phases 9.1-9.5 · Fresh-learner acceptance and identity isolation', state: 'locked', status: 'Locked', detail: 'Fresh isolated learners prove start, middle, end, retries, writing grading, XP, persistence, identity isolation, and visuals.' },
    { id: 11, name: 'Release', canonCode: 'P9.6', railName: 'Broader enrollment', canonName: 'Phase 9.6 + release checklist · Broader enrollment', state: 'locked', status: 'Locked', detail: 'Broader enrollment waits for the full release checklist, preserved repair chain, and owner decision.' }
  ],
  courses: [
    {
      id: 'humgeo', label: 'AP Human Geography', short: 'HumGeo', color: '#2558d8',
      status: 'Phases 1-3 · ACTIVE', statusTone: 'blue', mapping: 'Runbook-canon lifecycle', observed: 'Aug 28 · 05:30Z',
      landed: '410/440 article checks accepted via the factory census validator · 70/70 source placements · Phase 0 bound',
      nextStep: 'One census-convention pass for the 5 re-judge flips, then bank-wide answer-shape validation and the Phase 3 asset/QTI chain.',
      footprint: [
        { value: '410/440', label: 'article checks accepted (census reconcile)' },
        { value: '5', label: 're-judge flips actionable' },
        { value: '25', label: 'terminal: 10 policy · 10 S10-held · 5 amendment-14' }
      ],
      etaDays: 'FLIPS PASS NEXT',
      etaNote: 'Census rebuilt through the factory validator (410 is the number; earlier 415/420 were bookkeeping). Certify now refuses generation campaigns lacking a downstream consumer-contract row. Phases 4-10 remain locked.'
    },
    {
      id: 'apwh', label: 'AP World History', short: 'APWH', color: '#4f46b8',
      status: 'Accepted source · IN PROGRESS', statusTone: 'blue', mapping: 'Runbook-canon lifecycle', observed: 'Aug 28 · 05:30Z',
      landed: '933-item acceptance proof · Scope locked · 123/123 grading calls settled (274 criteria receipt-verified)',
      nextStep: 'Close the accepted-source entry state on the settled grading evidence; deficit queue dispositioned 4 lane-owned / 36 board-owned; Phase 0 has not started.',
      footprint: [
        { value: '2,791', label: 'live passed/available MCQs' },
        { value: '5,465', label: 'live passed constructed responses' },
        { value: '123/123', label: 'grading calls settled' }
      ]
    },
    {
      id: 'apush', label: 'AP US History', short: 'APUSH', color: '#c2413a',
      status: 'Accepted source · PARKED (owner)', statusTone: 'amber', mapping: 'Runbook-canon lifecycle', observed: 'Aug 28 · 05:30Z',
      landed: '38 canonical acceptances · 11 receipted successors staged on open PR #3 · Seating reconciler merged',
      nextStep: 'Owner merge word on build-outputs PR #3 admits the 11 successors (38 to 49 accepted); wave-2 residue needs fleet-minted fix rounds. Not in flight today by owner word.',
      footprint: [
        { value: '2,479', label: 'generation-QC candidates' },
        { value: '38', label: 'accepted positions' },
        { value: '+11', label: 'receipted successors' }
      ]
    },
    {
      id: 'psych', label: 'AP Psychology', short: 'Psych', color: '#7c3aed',
      status: 'Accepted source · IN PROGRESS', statusTone: 'blue', mapping: 'Runbook-canon lifecycle', observed: 'Aug 28 · 05:30Z',
      landed: '221 article/QC pairs · U1-U4 assessments with sanitized publish trees · render-repair PR #44 MERGED (26/26 overflows cleared, 3,173 XML verified)',
      nextStep: 'Chart renderer per repo issue #45 (fleet spec, assigned to owner lane); Unit 5 generation held on four mechanism gaps pending filings; Phase 0 has not started.',
      footprint: [
        { value: '3,173', label: 'publish-tree XML files verified clean' },
        { value: '33', label: 'chart stimuli awaiting renderer (#45)' },
        { value: '4', label: 'U5 mechanism gaps to file' }
      ]
    }
  ],
  evidenceMaps: {
    humgeo: {
      title: 'Work footprint mapped to the runbook lifecycle',
      note: 'Accepted source and Phase 0 are closed on canonical HumGeo main 8495d759 and owner-merged AP One main e46586c3. Phases 1-3 are active with the receipt census current at 410/440; later publication states remain locked.',
      rows: [
        { gate: 0, state: 'closed', status: 'Closed', signal: '6 pilot slots · 1 pass landed · 5 measured failures preserved', copy: 'The issue-44 writer was stopped and the residual retry was rescoped, closing the stabilization gate without hiding the five failures.', href: 'https://github.com/ilmych/humgeo-rebuild/issues/44#issuecomment-5365762989' },
        { gate: 1, state: 'closed', status: 'Closed', signal: '150 EKs · 70 LOs · 68 mappings · zero differences', copy: 'PR #62 merged the official-source authority and shared gate rule on canonical main. Issue #50 now carries the merged-SHA verifier receipt and no rework label.', href: 'https://github.com/ilmych/humgeo-rebuild/issues/50#issuecomment-5369982183' },
        { gate: 2, state: 'closed', status: 'Closed · amendment locked', signal: 'PR #66 merged · 655 checked · 70 stale · zero unknown', copy: 'Canonical main e16aebeb seals the omitted rehearsal lane. The manifest rebuilt byte-for-byte; 43 focused and 837 full-suite tests passed.', href: 'https://github.com/ilmych/humgeo-rebuild/pull/66' },
        { gate: 3, state: 'closed', status: 'Closed · SOURCE_ACCEPTED', signal: 'PR #67 merged · 70/70 accepted · zero residue', copy: 'Canonical verification reproduced exact source coverage and delivery SHA-256 37fb16a0133bb1e1390cb6ce9ada96a2e96cfd49a9c54020046437d9e9edc11b; focused, affected, and full repository gates passed.', href: 'https://github.com/ilmych/humgeo-rebuild/pull/67' },
        { gate: 4, state: 'closed', status: 'Closed · PROFILE_AND_SOURCE_BOUND', signal: 'PR #851 merged · exact Deploy · exact staging SHA', copy: 'Canonical reconstruction reproduced the profile, exhaustive Phase 0 capture, native bind, unchanged 5,870-coordinate oracle, and zero-write receipt byte-for-byte. Deploy 32799920454 and staging matched owner-merged AP One main.', href: 'https://github.com/InceptTrilogy/ap-one/pull/851' },
        { gate: 5, state: 'active', status: 'Active · census current', signal: '410/440 accepted · 5 flips actionable · 25 terminal', copy: 'The census was rebuilt through the factory validator: original job bodies pulled free, independent QC re-run per item, 5 verdicts honestly flipped out. Certification now requires a downstream consumer-contract evidence row.', href: 'humgeo.html' }
      ]
    },
    apwh: {
      title: 'APWH runbook-aligned sequence',
      note: 'The accepted-source scope sub-receipt retains credit. All 123 authorized grading calls are settled (113 activities, 274 criteria receipt-verified). Closure classification proceeds on that evidence; Phase 0 has not started.',
      rows: [
        { gate: 1, state: 'closed', status: 'Closed · SCOPE_LOCKED', signal: '9 units · 71 topics · 71 LOs · 71 production gates', copy: 'Pinned official, blueprint, accepted-lesson, and AP One identities agree. Eight known-bad mutations fail closed; broad conformance debt is preserved separately.', href: 'https://github.com/ilmych/apwh-blueprint-build/tree/8a6ebccbc72451217d1739791d89c14f492ccb60' },
        { gate: 2, state: 'active', status: 'Accepted source · in progress', signal: '123/123 calls settled · 274 criteria verified', copy: 'The resume window settled the remaining 79 grading calls through the committed AP One grading route, receipt-verified per criterion. Accepted-source closure proceeds on this evidence.', href: 'apwh.html' },
        { gate: 6, state: 'evidence', status: 'Historical absence evidence', signal: 'fresh GET: 0 of 71 tenant gates', copy: 'The zero-POST readback is retained as live-state evidence. It is not the Phase 5 sealed all-absent checkpoint and earns no Phase 4-5 closure.', href: 'apwh.html' }
      ]
    },
    apush: {
      title: 'Existing work mapped to the runbook lifecycle',
      note: 'APUSH remains in accepted-source preparation after a current exact-ref recheck. Existing work is credited without converting generated, receipted, accepted, and seated counts into one number; Phase 0 has not started.',
      rows: [
        { gate: 1, state: 'evidence', status: 'Mapped evidence', signal: '249-position blueprint · 4 recorded deviations', copy: 'The design reconciliation belongs with scope lock, but it is preparation rather than a current implementation crosswalk.', href: 'claims.html' },
        { gate: 2, state: 'evidence', status: 'Mapped evidence', signal: '2,479 candidates · 249 ledger positions', copy: 'The generation-QC corpus and canonical ledger provide a substantial inventory without implying that every candidate is accepted or seated.', href: 'claims.html' },
        { gate: 3, state: 'evidence', status: 'Mapped evidence', signal: '38 accepted · 211 pending · 11 additional receipts', copy: 'The accepted and receipted work is separated from pending scope so the dashboard does not inflate the usable corpus.', href: 'claims.html' },
        { gate: 4, state: 'evidence', status: 'Mapped evidence', signal: 'Seating reconciler merged · 0 of 11 newly seated', copy: 'The assembly mechanism exists on canonical main. The eleven successors still need canonical admission before a guarded seating run can change the count.', href: 'https://github.com/ilmych/apush-course-build/pull/6' }
      ]
    },
    psych: {
      title: 'Existing work mapped to the runbook lifecycle',
      note: 'Psychology remains in accepted-source preparation. Render-repair PR #44 is merged on main (1fc6d10); the chart renderer is specified as repo issue #45; Unit 5 generation is held on four mechanism gaps pending filings. Phase 0 has not started.',
      rows: [
        { gate: 1, state: 'evidence', status: 'Mapped evidence', signal: '221 of 221 EK design receipt', copy: 'The blueprint design scope is covered, but no course-level implementation oracle currently proves that design on the learner candidate.', href: 'claims.html' },
        { gate: 2, state: 'evidence', status: 'Mapped evidence', signal: '1,105 buckets scanned · 374 underfilled', copy: 'The bank inventory exposes the measurable shortage. Unit 5 scope must be sealed before that shortage becomes a generation order.', href: 'https://github.com/InceptTrilogy/ap-psychology-fall-2025-v1/issues/14' },
        { gate: 3, state: 'evidence', status: 'Mapped evidence', signal: '221 paired sidecars · PR #32 retrieves 407/407 MCQs', copy: 'PR #32 generated nothing and retains nine publish-blocking unverified citations. It is bounded candidate evidence, not accepted-source closure.', href: 'https://github.com/InceptTrilogy/ap-psychology-fall-2025-v1/pull/32' },
        { gate: 4, state: 'evidence', status: 'Mapped evidence', signal: '34 embeds + 34 PNGs + 34 approvals · 71-file copy', copy: 'The PR #23 image-stage delivery is byte-accounted on its named checkpoint. This proves bounded landing, not current-source binding or full course wiring.', href: 'https://github.com/InceptTrilogy/ap-psychology-fall-2025-v1/pull/23' },
        { gate: 10, state: 'evidence', status: 'Historical evidence · stale', signal: '262 nodes · 5 units · 221 lessons', copy: 'An older course-tree receipt and failed chooser preflight remain historical learner-surface evidence, not current Phase 9 learner acceptance.', href: 'claims.html' }
      ]
    }
  }
};

(() => {
  const courses = AP4_DASHBOARD.courses;
  const activeCourse = courses.find(course => course.id === AP4_DASHBOARD.activeCourse);
  if (!activeCourse || AP4_DASHBOARD.gates.length !== 12 || new Set(AP4_DASHBOARD.gates.map(gate => gate.id)).size !== 12) {
    throw new Error('Active-course lifecycle data is incomplete.');
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
            <div class="gate-evidence-id"><span title="${AP4_DASHBOARD.gates[row.gate].canonName}" aria-label="${AP4_DASHBOARD.gates[row.gate].canonName}">${AP4_DASHBOARD.gates[row.gate].canonCode}</span><small aria-hidden="true">${AP4_DASHBOARD.gates[row.gate].railName}</small></div>
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
        <p class="timeline-sub">Each card shows the current TimeBack lifecycle state, landed work, and next governed step. Open a course page for receipts and the detailed evidence map.</p>
      </div>
      <span class="timeline-snapshot">Dashboard snapshot · ${AP4_DASHBOARD.snapshot}</span>
    </div>
    <div class="course-card-grid" aria-label="Current TimeBack state, landed work, and next step by course">
      ${courses.map(course => `
        <a class="course-summary-card${course.id === activeCourse.id ? ' is-active' : ''}" href="${course.id}.html" style="--course-color:${course.color}"${course.id === activeCourse.id ? ' aria-current="true"' : ''}>
          <div class="course-card-headline">
            <span class="course-card-status b-${course.statusTone}">${course.status}</span>
            <span class="course-card-landed"><strong>Landed so far:</strong> ${course.landed}</span>
          </div>
          <h3>${course.label}</h3>
          <p><strong>Next:</strong> ${course.nextStep}</p>
        </a>`).join('')}
    </div>
    <div class="active-gate-wrap">
      <div class="active-gate-heading">
        <div><span class="eyebrow">Current runbook state</span><h3>Phases 1-3 · Offline graph and student-surface preview</h3></div>
        <span class="badge b-amber">HOLD · MISSING FACTORY MODULE</span>
      </div>
      <div class="active-gate-rail" role="list" aria-label="Human Geography runbook lifecycle">
        ${AP4_DASHBOARD.gates.map(gate => `
          <button class="active-gate active-gate-${gate.state}" type="button" role="listitem" data-active-gate="${gate.id}" aria-label="${gate.canonName}. ${gate.status}." aria-pressed="${gate.id === 5}">
            <span class="active-gate-dot">${gate.canonCode}</span>
            <span class="active-gate-name">${gate.railName}</span>
            <small>${gate.status}</small>
          </button>`).join('')}
      </div>
      <div class="active-gate-detail" aria-live="polite">
        <div><span data-gate-detail-state></span><strong data-gate-detail-title></strong></div>
        <p data-gate-detail-copy></p>
        <a href="humgeo.html">Open the full HumGeo evidence map →</a>
      </div>
      <p class="gate-legend"><span class="legend-closed">Closed</span><span class="legend-active">Active</span><span class="legend-evidence">Evidence exists, no lifecycle credit</span><span class="legend-locked">Locked</span></p>
    </div>`;

  const controls = [...root.querySelectorAll('[data-active-gate]')];
  const detailState = root.querySelector('[data-gate-detail-state]');
  const detailTitle = root.querySelector('[data-gate-detail-title]');
  const detailCopy = root.querySelector('[data-gate-detail-copy]');

  function showGate(id) {
    const gate = AP4_DASHBOARD.gates.find(item => item.id === Number(id));
    if (!gate) return;
    detailState.textContent = gate.status;
    detailTitle.textContent = gate.canonName;
    detailCopy.textContent = gate.detail;
    controls.forEach(control => control.setAttribute('aria-pressed', String(control.dataset.activeGate === String(gate.id))));
  }

  controls.forEach(control => {
    control.addEventListener('click', () => showGate(control.dataset.activeGate));
    control.addEventListener('focus', () => showGate(control.dataset.activeGate));
  });
  showGate(5);
})();
