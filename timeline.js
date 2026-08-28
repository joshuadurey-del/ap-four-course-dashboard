/*
Dashboard display contract:
- Overview cards show the current TimeBack lifecycle state, landed work, and next governed step.
- HumGeo uses the AP One Native TimeBack Course Publication Runbook lifecycle and phases.
- Historical receipts retain their original scope and move only to a new credit home.
- Evidence on a locked state stays evidence; it does not unlock that state.
*/
const AP4_DASHBOARD = {
  snapshot: 'Aug 28, 2026 · 21:54 KST',
  activeCourse: 'humgeo',
  gates: [
    { id: 0, name: 'Stabilize', canonCode: 'AS', railName: 'Source prep · stabilize', canonName: 'Accepted-source preparation · STABILIZED', state: 'closed', status: 'Closed', detail: 'The six-slot pilot is fully measured: one passing replacement landed, five failures remain preserved, and residual execution is stopped.' },
    { id: 1, name: 'Lock scope', canonCode: 'AS', railName: 'Source prep · scope', canonName: 'Accepted-source preparation · SCOPE_LOCKED', state: 'closed', status: 'Closed', detail: 'PR #62 and the issue #50 reconciliation receipt close the exact 150-EK, 70-LO, 68-topic, and 68-gate scope on canonical main aa11026.' },
    { id: 2, name: 'Inventory', canonCode: 'AS', railName: 'Source prep · inventory', canonName: 'Accepted-source preparation · INVENTORY_LOCKED', state: 'closed', status: 'Closed · amendment locked', detail: 'Owner-merged PR #66 seals the omitted rehearsal lane: 655 checked, 70 stale-unusable, zero unknown or unmeasured, and byte-stable canonical verification.' },
    { id: 3, name: 'Accept source', canonCode: 'AS', railName: 'Accepted source', canonName: 'Accepted source · SOURCE_ACCEPTED', state: 'closed', status: 'Closed · SOURCE_ACCEPTED', detail: 'Merged PR #67 and canonical post-merge verification bind all 70 replacement placements with exact coverage, the pinned delivery digest, and zero residue.' },
    { id: 4, name: 'Profile + authority', canonCode: 'P0', railName: 'Profile + source bound', canonName: 'Course profile + Phase 0 · PROFILE_AND_SOURCE_BOUND', state: 'closed', status: 'Closed · PROFILE_AND_SOURCE_BOUND', detail: 'Owner-merged AP One main, canonical artifact reconstruction, exact oracle coverage, zero-write dry run, exact Deploy, and staging readback are bound.' },
    { id: 5, name: 'Graph + preview', canonCode: 'P1-3', railName: 'Graph + preview', canonName: 'Phases 1-3 · Offline graph and student-surface preview', state: 'active', status: 'In progress · Round 6 active', detail: 'The active operator counter is 437/440: 13 of 16 enriched replacements hold dual-QC acceptance, and Round 6 is running on the three residue slots with fleet capacity available. Formal module reconcile follows landing.' },
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
      status: 'Phases 1-3 · IN PROGRESS', statusTone: 'blue', mapping: 'Runbook-canon lifecycle', observed: 'Aug 28 · 12:34Z',
      landed: 'Accepted source closed · Course profile and Phase 0 closed · Offline graph and student-surface preview underway',
      nextStep: 'Round 6 is running on the three scenario-enriched residue slots with fleet capacity available; then land accepted bytes and formally reconcile to 440/440.',
      footprint: [
        { value: '437/440', label: 'operational article-check position' },
        { value: '13/16', label: 'enriched replacements dual-QC accepted' },
        { value: '3', label: 'residue slots remain' }
      ],
      etaDays: '3 SLOTS OPEN',
      etaNote: 'The owner selected the Round 6 route; one job is in flight with eight pool slots free. The last formal module-reconciled baseline is 424/440; 437/440 becomes formal after landing and reconcile.'
    },
    {
      id: 'apwh', label: 'AP World History', short: 'APWH', color: '#4f46b8',
      status: 'Accepted source · IN PROGRESS', statusTone: 'blue', mapping: 'Runbook-canon lifecycle', observed: 'Aug 28 · 12:37Z',
      landed: 'Scope locked · AP One course profile and consumer landed · DBQ scoring repair landed',
      nextStep: 'Rework the authoring-wave candidate after two QA rejects and choose the landing route for the A-146/A-186 artifact branch; Phase 0 has not started.',
      footprint: [
        { value: '95', label: 'working-state oracle PASS rows' },
        { value: '34', label: 'working-state oracle MISSING rows' },
        { value: '3 + 1', label: 'oracle FAIL + ESCALATED rows' }
      ]
    },
    {
      id: 'apush', label: 'AP US History', short: 'APUSH', color: '#c2413a',
      status: 'Accepted source · IN PROGRESS', statusTone: 'blue', mapping: 'Runbook-canon lifecycle', observed: 'Aug 28 · 11:58Z',
      landed: 'Course scope and candidate queue locked · Course composer and release-packet bridge landed · Build-only wrapper migration landed',
      nextStep: 'Re-derive the remaining 21 bindings through issue #9, preserve the 53 landed wrappers, and rerun the owning verifier.',
      footprint: [
        { value: '49/249', label: 'accepted ledger positions' },
        { value: '53', label: 'safe migrated wrappers landed' },
        { value: '21', label: 'bindings require re-derivation' }
      ]
    },
    {
      id: 'psych', label: 'AP Psychology', short: 'Psych', color: '#7c3aed',
      status: 'Accepted source · IN PROGRESS', statusTone: 'blue', mapping: 'Runbook-canon lifecycle', observed: 'Aug 28 · 11:58Z',
      landed: 'Units 1-4 article and question corpus assembled · Course renderer and chart pipeline repaired · Unit 3 media stages landed',
      nextStep: 'Obtain the Unit 5 FRQ/receipt-safe route from intake #104, then re-enter through the committed course route; Phase 0 has not started.',
      footprint: [
        { value: '3,173', label: 'publish-tree XML files verified clean' },
        { value: '33', label: 'chart stimuli converted' },
        { value: '1', label: 'remaining Unit 5 factory gap' }
      ]
    }
  ],
  evidenceMaps: {
    humgeo: {
      title: 'Work footprint mapped to the runbook lifecycle',
      note: 'Accepted source and Phase 0 retain closure credit. Phases 1-3 are IN PROGRESS at an operational 437/440; Round 6 is active on the three residue slots and later phases remain locked.',
      rows: [
        { gate: 0, state: 'closed', status: 'Closed', signal: '6 pilot slots · 1 pass landed · 5 measured failures preserved', copy: 'The issue-44 writer was stopped and the residual retry was rescoped, closing the stabilization gate without hiding the five failures.', href: 'https://github.com/ilmych/humgeo-rebuild/issues/44#issuecomment-5365762989' },
        { gate: 1, state: 'closed', status: 'Closed', signal: '150 EKs · 70 LOs · 68 mappings · zero differences', copy: 'PR #62 merged the official-source authority and shared gate rule on canonical main. Issue #50 now carries the merged-SHA verifier receipt and no rework label.', href: 'https://github.com/ilmych/humgeo-rebuild/issues/50#issuecomment-5369982183' },
        { gate: 2, state: 'closed', status: 'Closed · amendment locked', signal: 'PR #66 merged · 655 checked · 70 stale · zero unknown', copy: 'Canonical main e16aebeb seals the omitted rehearsal lane. The manifest rebuilt byte-for-byte; 43 focused and 837 full-suite tests passed.', href: 'https://github.com/ilmych/humgeo-rebuild/pull/66' },
        { gate: 3, state: 'closed', status: 'Closed · SOURCE_ACCEPTED', signal: 'PR #67 merged · 70/70 accepted · zero residue', copy: 'Canonical verification reproduced exact source coverage and delivery SHA-256 37fb16a0133bb1e1390cb6ce9ada96a2e96cfd49a9c54020046437d9e9edc11b; focused, affected, and full repository gates passed.', href: 'https://github.com/ilmych/humgeo-rebuild/pull/67' },
        { gate: 4, state: 'closed', status: 'Closed · PROFILE_AND_SOURCE_BOUND', signal: 'PR #851 merged · exact Deploy · exact staging SHA', copy: 'Canonical reconstruction reproduced the profile, exhaustive Phase 0 capture, native bind, unchanged 5,870-coordinate oracle, and zero-write receipt byte-for-byte. Deploy 32799920454 and staging matched owner-merged AP One main.', href: 'https://github.com/InceptTrilogy/ap-one/pull/851' },
        { gate: 5, state: 'active', status: 'In progress', signal: '437/440 operational · 3 residue slots in Round 6', copy: 'Thirteen of 16 enriched replacements hold dual-QC acceptance. One job is in flight with eight pool slots free; land accepted bytes, then run formal module reconcile.', href: 'humgeo.html' }
      ]
    },
    apwh: {
      title: 'APWH runbook-aligned sequence',
      note: 'Accepted-source remediation is IN PROGRESS. The latest clean 235-row working-state oracle is 95 PASS / 34 MISSING, but its two contributing branches are not merged and the authoring-wave candidate failed both QA reviews. Phase 0 has not started.',
      rows: [
        { gate: 1, state: 'closed', status: 'Closed · SCOPE_LOCKED', signal: '9 units · 71 topics · 71 LOs · 71 production gates', copy: 'Pinned official, blueprint, accepted-lesson, and AP One identities agree. Eight known-bad mutations fail closed; broad conformance debt is preserved separately.', href: 'https://github.com/ilmych/apwh-blueprint-build/tree/8a6ebccbc72451217d1739791d89c14f492ccb60' },
        { gate: 2, state: 'active', status: 'Accepted source · in progress', signal: '95 PASS / 34 MISSING working state · 3 FAIL · 1 ESCALATED', copy: 'A-146 moves to PASS on the artifact branch. Candidate 8974add requires rework after two QA rejects; neither working branch is merged.', href: 'apwh.html' },
        { gate: 6, state: 'evidence', status: 'Historical absence evidence', signal: 'fresh GET: 0 of 71 tenant gates', copy: 'The zero-POST readback is retained as live-state evidence. It is not the Phase 5 sealed all-absent checkpoint and earns no Phase 4-5 closure.', href: 'apwh.html' }
      ]
    },
    apush: {
      title: 'Existing work mapped to the runbook lifecycle',
      note: 'APUSH accepted source is IN PROGRESS, not parked. The ledger is 49 accepted / 200 pending, 53 safe migrated wrappers are landed, and 21 bindings still require re-derivation. Phase 0 has not started.',
      rows: [
        { gate: 1, state: 'evidence', status: 'Mapped evidence', signal: '249-position blueprint · 4 recorded deviations', copy: 'The design reconciliation belongs with scope lock, but it is preparation rather than a current implementation crosswalk.', href: 'claims.html' },
        { gate: 2, state: 'evidence', status: 'Mapped evidence', signal: '2,480 candidates · 249 ledger positions', copy: 'The candidate queue is complete, but candidate-budget completeness is not factory-QC or learner-readiness proof.', href: 'claims.html' },
        { gate: 3, state: 'evidence', status: 'Mapped evidence', signal: '49 accepted · 200 pending', copy: 'The exact current ledger separates accepted from pending positions without inflating the usable corpus.', href: 'claims.html' },
        { gate: 4, state: 'evidence', status: 'Mapped evidence', signal: '53 wrappers landed · 21 require re-derivation', copy: 'Build-output PR #4 lands the 53 safe migrated wrappers. Open issue #9 owns the remaining 21 bindings.', href: 'https://github.com/ilmych/apush-build-outputs/pull/4' }
      ]
    },
    psych: {
      title: 'Existing work mapped to the runbook lifecycle',
      note: 'Psychology accepted source remains IN PROGRESS at 11f7028e. Six repository/control repairs are landed; Unit 5 remains held on intake #104 and absent assessment/publish artifacts. Phase 0 has not started.',
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
  if (courses.length !== 4 || AP4_DASHBOARD.gates.length !== 12 || new Set(AP4_DASHBOARD.gates.map(gate => gate.id)).size !== 12) {
    throw new Error('Dashboard lifecycle data is incomplete.');
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
        <span class="badge b-blue">Current runbook state</span>
        <h2>All four courses</h2>
        <p class="timeline-sub">Each card shows the current TimeBack lifecycle state, landed work, and next governed step. Open a course page for receipts and the detailed evidence map.</p>
      </div>
      <span class="timeline-snapshot">Dashboard snapshot · ${AP4_DASHBOARD.snapshot}</span>
    </div>
    <div class="course-card-grid" aria-label="Current TimeBack state, landed work, and next step by course">
      ${courses.map(course => `
        <a class="course-summary-card" href="${course.id}.html" style="--course-color:${course.color}">
          <div class="course-card-headline">
            <span class="course-card-status b-${course.statusTone}">${course.status}</span>
            <span class="course-card-landed"><strong>Landed so far:</strong> ${course.landed}</span>
          </div>
          <h3>${course.label}</h3>
          <p><strong>Next:</strong> ${course.nextStep}</p>
        </a>`).join('')}
    </div>`;
})();
