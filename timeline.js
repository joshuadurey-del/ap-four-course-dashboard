/*
Dashboard display contract:
- Overview cards show the current TimeBack lifecycle state, landed work, and next governed step.
- HumGeo uses the AP One Native TimeBack Course Publication Runbook lifecycle and phases.
- Historical receipts retain their original scope and move only to a new credit home.
- Evidence on a locked state stays evidence; it does not unlock that state.
*/
const AP4_DASHBOARD = window.AP4_DASHBOARD = {
  snapshot: 'Aug 30, 2026 · 13:37 KST',
  activeCourse: 'humgeo',
  gates: [
    { id: 0, name: 'Stabilize', canonCode: 'AS', railName: 'Source prep · stabilize', canonName: 'Accepted-source preparation · STABILIZED', state: 'closed', status: 'Closed', detail: 'The six-slot pilot is fully measured: one passing replacement landed, five failures remain preserved, and residual execution is stopped.' },
    { id: 1, name: 'Lock scope', canonCode: 'AS', railName: 'Source prep · scope', canonName: 'Accepted-source preparation · SCOPE_LOCKED', state: 'closed', status: 'Closed', detail: 'PR #62 and the issue #50 reconciliation receipt close the exact 150-EK, 70-LO, 68-topic, and 68-gate scope on canonical main aa11026.' },
    { id: 2, name: 'Inventory', canonCode: 'AS', railName: 'Source prep · inventory', canonName: 'Accepted-source preparation · INVENTORY_LOCKED', state: 'closed', status: 'Closed · amendment locked', detail: 'Owner-merged PR #66 seals the omitted rehearsal lane: 655 checked, 70 stale-unusable, zero unknown or unmeasured, and byte-stable canonical verification.' },
    { id: 3, name: 'Accept source', canonCode: 'AS', railName: 'Accepted source', canonName: 'Accepted source · SOURCE_ACCEPTED', state: 'closed', status: 'Closed · SOURCE_ACCEPTED', detail: 'Merged PR #67 and canonical post-merge verification bind all 70 replacement placements with exact coverage, the pinned delivery digest, and zero residue.' },
    { id: 4, name: 'Profile + authority', canonCode: 'P0', railName: 'Profile + source bound', canonName: 'Course profile + Phase 0 · PROFILE_AND_SOURCE_BOUND', state: 'closed', status: 'Closed · PROFILE_AND_SOURCE_BOUND', detail: 'Owner-merged AP One main, canonical artifact reconstruction, exact oracle coverage, zero-write dry run, exact Deploy, and staging readback are bound.' },
    { id: 5, name: 'Map course tree', canonCode: 'P1', railName: 'Course tree', canonName: 'Phase 1 · Map the complete course tree', state: 'active', status: 'In progress', detail: 'Map the complete hierarchy, order, gates, invariants, assessments, and assigned-reading delivery.' },
    { id: 6, name: 'Price activities', canonCode: 'P2', railName: 'Activity pricing', canonName: 'Phase 2 · Price activities', state: 'blocked', status: 'Unmeasured', detail: 'Derive activity XP from the actual workload and bind the native rounding rules.' },
    { id: 7, name: 'Generate assets', canonCode: 'P3', railName: 'Assets + QTI', canonName: 'Phase 3 · Generate hosted assets and QTI', state: 'active', status: 'In progress · 528 assets locally validated', detail: 'Generate static, article, video, native MCQ, and writing assets; validate QTI and the student surface.' },
    { id: 8, name: 'Seal plan', canonCode: 'P4-5', railName: 'Sealed plan', canonName: 'Phases 4-5 · Sealed all-absent plan', state: 'locked', status: 'Locked', detail: 'Build the deterministic publication plan and bind an exact all-absent live checkpoint.' },
    { id: 9, name: 'Dark publish', canonCode: 'P6', railName: 'Publish + replay', canonName: 'Phase 6 · Dark publication and exact zero-write replay', state: 'locked', status: 'Locked', detail: 'Publish in testing under the global writer lock, exact-read each write, and replay the completed plan with zero writes.' },
    { id: 10, name: 'Canary enroll', canonCode: 'P7', railName: 'Canary enrollments', canonName: 'Phase 7 · Owner-controlled canary enrollments', state: 'locked', status: 'Locked', detail: 'Enroll only owner-controlled canaries under a separate plan and authority, then exact-read and replay with zero writes.' },
    { id: 11, name: 'Activate', canonCode: 'P8', railName: 'Private activation', canonName: 'Phase 8 · Separate private activation', state: 'locked', status: 'Locked', detail: 'Activate privately under its own authority, restore-proof checkpoint, exact readback, and zero-write replay.' },
    { id: 12, name: 'Learner accept', canonCode: 'P9.1-9.5', railName: 'Learner acceptance', canonName: 'Phases 9.1-9.5 · Fresh-learner acceptance and identity isolation', state: 'locked', status: 'Locked', detail: 'Fresh isolated learners prove start, middle, end, retries, writing grading, XP, persistence, identity isolation, and visuals.' },
    { id: 13, name: 'Release', canonCode: 'P9.6', railName: 'Broader enrollment', canonName: 'Phase 9.6 + release checklist · Broader enrollment', state: 'locked', status: 'Locked', detail: 'Broader enrollment waits for the full release checklist, preserved repair chain, and owner decision.' }
  ],
  courses: [
    {
      id: 'humgeo', label: 'AP Human Geography', short: 'HumGeo', color: 'oklch(46% 0.11 170)',
      status: 'P1 IN PROGRESS · P2 UNMEASURED · P3 IN PROGRESS', statusTone: 'blue', mapping: 'Runbook-canon lifecycle', observed: 'Aug 30 · 04:19Z',
      landed: 'Accepted source — closed · Phase 0 — closed · Five enriched lessons — landed · Article checks — 440/440 operator receipts · Phase 3.1-3.2 — 528 assets locally validated',
      nextStep: 'Resolve the formal census contract, complete bank-wide and answer-shape validation, then verify QTI and the student preview on the governed surface. Nothing is uploaded yet.',
      footprint: [
        { value: '440/440', label: 'operator-receipt article-check position' },
        { value: '528', label: 'locally validated XHTML + QTI assets' },
        { value: '5', label: 'enriched lessons landed' }
      ],
      etaDays: 'VALIDATION NEXT',
      etaNote: 'The operator position is 440/440 and the enriched bytes are landed. The formal census remains blocked by its current contract; local asset validation is not upload or learner proof.',
      phaseStates: [
        { code: 'P1', name: 'Map the complete course tree', state: 'active', status: 'IN PROGRESS', detail: 'Five enriched lessons and 440/440 operator-receipt checks are landed; the formal census and bank-wide tree validation remain.' },
        { code: 'P2', name: 'Price activities', state: 'blocked', status: 'UNMEASURED', detail: 'No current activity-pricing receipt exists; XP totals are not inferred.' },
        { code: 'P3', name: 'Generate hosted assets and QTI', state: 'active', status: 'IN PROGRESS', detail: '88 script-free XHTML files and 440 two-attempt QTI packages pass local validation; upload and governed-surface preview remain.' }
      ]
    },
    {
      id: 'apwh', label: 'AP World History', short: 'APWH', color: 'oklch(48% 0.12 75)',
      status: 'Accepted source · IN PROGRESS', statusTone: 'blue', mapping: 'Runbook-canon lifecycle', observed: 'Aug 30 · 04:24Z',
      landed: 'Course profile required before Phase 0 — DONE · Accepted source — IN PROGRESS · Phase 0 — NOT ENTERED · Phases 1-10 — NOT STARTED',
      nextStep: 'Resolve A-187 issue #290 and E3 issue #63, disposition open A-168 PR #905, and settle the remaining accepted-source rows. Then run Phase 0.1-0.3.',
      footprint: [
        { value: '520435e6', label: 'current blueprint main' },
        { value: '95', label: 'last complete-surface PASS rows' },
        { value: '34', label: 'last complete-surface MISSING rows' }
      ],
      phaseStates: [
        { code: 'P1', name: 'Map the complete course tree', state: 'locked', status: 'NOT STARTED', detail: 'Accepted source remains open and Phase 0 has not been entered.' },
        { code: 'P2', name: 'Price activities', state: 'locked', status: 'NOT STARTED', detail: 'Accepted source remains open and Phase 0 has not been entered.' },
        { code: 'P3', name: 'Generate hosted assets and QTI', state: 'locked', status: 'NOT STARTED', detail: 'Existing accepted-source evidence earns no Phase 3 credit.' }
      ]
    },
    {
      id: 'apush', label: 'AP US History', short: 'APUSH', color: 'oklch(48% 0.17 28)',
      status: 'Accepted source · IN PROGRESS', statusTone: 'blue', mapping: 'Runbook-canon lifecycle', observed: 'Aug 30 · 04:24Z',
      landed: 'Accepted source — in progress · 249-position ledger — 49 accepted / 200 pending · 53 migrated wrappers — landed · 139 wave-3 image contracts — landed · first packets bound to canonical manifest',
      nextStep: 'Disposition manifest PR #7, rebase and verify ordered PR #8, resolve issues #6 and #9, then rerun the owning verifier.',
      footprint: [
        { value: '49/249', label: 'accepted ledger positions' },
        { value: '139', label: 'wave-3 image contracts landed' },
        { value: '4', label: 'open PR/issues: #7, #8, #6, #9' }
      ],
      phaseStates: [
        { code: 'P1', name: 'Map the complete course tree', state: 'locked', status: 'NOT STARTED', detail: 'Accepted source remains open and Phase 0 has not been entered.' },
        { code: 'P2', name: 'Price activities', state: 'locked', status: 'NOT STARTED', detail: 'Accepted source remains open and Phase 0 has not been entered.' },
        { code: 'P3', name: 'Generate hosted assets and QTI', state: 'locked', status: 'NOT STARTED', detail: 'Wrapper and image-contract evidence earns no Phase 3 credit.' }
      ]
    },
    {
      id: 'psych', label: 'AP Psychology', short: 'Psych', color: 'oklch(48% 0.16 305)',
      status: 'Accepted source · IN PROGRESS', statusTone: 'blue', mapping: 'Runbook-canon lifecycle', observed: 'Aug 30 · 04:24Z',
      landed: 'Accepted source — IN PROGRESS · Content generation — PROVEN · staged bank — 1,912 MCQs + 37 FRQs across five units · Unit 5 — 457 MCQs + 2 AAQs + 1 EBQ landed · no phase credit',
      nextStep: 'Resolve the undeclared store/layout contract, obtain factory-side EBQ readback and grader certification, then rerun QC. No local course step is currently executable.',
      footprint: [
        { value: '1,912', label: 'staged MCQs across five units' },
        { value: '37', label: 'staged FRQs across five units' },
        { value: '0/1,912', label: 'staged MCQs with /v1/qc receipts' }
      ],
      phaseStates: [
        { code: 'P1', name: 'Map the complete course tree', state: 'locked', status: 'NOT STARTED', detail: 'Accepted source remains open and Phase 0 has not been entered.' },
        { code: 'P2', name: 'Price activities', state: 'locked', status: 'NOT STARTED', detail: 'Accepted source remains open and Phase 0 has not been entered.' },
        { code: 'P3', name: 'Generate hosted assets and QTI', state: 'locked', status: 'NOT STARTED', detail: 'Staged content evidence earns no Phase 3 credit.' }
      ]
    }
  ],
  evidenceMaps: {
    humgeo: {
      title: 'Work footprint mapped to the runbook lifecycle',
      note: 'Accepted source and Phase 0 retain closure credit. Phase 1 and Phase 3 are IN PROGRESS; Phase 2 is UNMEASURED. The formal census contract and governed-surface checks remain.',
      rows: [
        { gate: 0, state: 'closed', status: 'Closed', signal: '6 pilot slots · 1 pass landed · 5 measured failures preserved', copy: 'The issue-44 writer was stopped and the residual retry was rescoped, closing the stabilization gate without hiding the five failures.', href: 'https://github.com/ilmych/humgeo-rebuild/issues/44#issuecomment-5365762989' },
        { gate: 1, state: 'closed', status: 'Closed', signal: '150 EKs · 70 LOs · 68 mappings · zero differences', copy: 'PR #62 merged the official-source authority and shared gate rule on canonical main. Issue #50 now carries the merged-SHA verifier receipt and no rework label.', href: 'https://github.com/ilmych/humgeo-rebuild/issues/50#issuecomment-5369982183' },
        { gate: 2, state: 'closed', status: 'Closed · amendment locked', signal: 'PR #66 merged · 655 checked · 70 stale · zero unknown', copy: 'Canonical main e16aebeb seals the omitted rehearsal lane. The manifest rebuilt byte-for-byte; 43 focused and 837 full-suite tests passed.', href: 'https://github.com/ilmych/humgeo-rebuild/pull/66' },
        { gate: 3, state: 'closed', status: 'Closed · SOURCE_ACCEPTED', signal: 'PR #67 merged · 70/70 accepted · zero residue', copy: 'Canonical verification reproduced exact source coverage and delivery SHA-256 37fb16a0133bb1e1390cb6ce9ada96a2e96cfd49a9c54020046437d9e9edc11b; focused, affected, and full repository gates passed.', href: 'https://github.com/ilmych/humgeo-rebuild/pull/67' },
        { gate: 4, state: 'closed', status: 'Closed · PROFILE_AND_SOURCE_BOUND', signal: 'PR #851 merged · exact Deploy · exact staging SHA', copy: 'Canonical reconstruction reproduced the profile, exhaustive Phase 0 capture, native bind, unchanged 5,870-coordinate oracle, and zero-write receipt byte-for-byte. Deploy 32799920454 and staging matched owner-merged AP One main.', href: 'https://github.com/InceptTrilogy/ap-one/pull/851' },
        { gate: 5, state: 'active', status: 'In progress', signal: 'Five enriched lessons · 440/440 operator receipts', copy: 'The formal census and bank-wide tree validation remain open, so Phase 1 is not closed.', href: 'humgeo.html' },
        { gate: 7, state: 'active', status: 'In progress', signal: '528 assets locally validated', copy: 'Local validation covers 88 script-free XHTML files and 440 two-attempt QTI packages; upload and governed-surface validation remain.', href: 'humgeo.html' }
      ]
    },
    apwh: {
      title: 'APWH runbook-aligned sequence',
      note: 'APWH is before Phase 0. Blueprint main 520435e6 includes merged PR #62. Accepted source remains IN PROGRESS at 95 PASS / 34 MISSING; A-168 PR #905 and contract issues #290 and #63 are open. Phase 0 is NOT ENTERED.',
      rows: [
        { gate: 4, code: 'PRE-0', name: 'Course profile required before Phase 0', label: 'Course profile', state: 'closed', status: 'Done', signal: 'Profile, consumer, authoring wave, and hash refresh landed', copy: 'PR #889 landed the reviewed, validator-consumed profile and consumer; PR #891 then landed the authoring wave and profile-hash refresh. This prerequisite does not enter Phase 0.', href: 'https://github.com/InceptTrilogy/ap-one/pull/891' },
        { gate: 3, code: 'AS', name: 'Accepted source', label: 'Accepted source', state: 'active', status: 'In progress', signal: '95 PASS / 34 MISSING · PR #62 merged', copy: 'The full pool slice is on main 520435e6. T050 is 2101/2101, A-168 is 311/312, and the suite reports 373 passing tests. All progress remains inside open accepted-source rows.', href: 'https://github.com/ilmych/apwh-blueprint-build/commit/520435e6346d' },
        { gate: 4, code: 'P0', name: 'Phase 0 — Establish authority', label: 'Establish authority', state: 'locked', status: 'Not entered', signal: '0.2 capture tool authored; accepted source still moving', copy: 'After AS-01 settles: bind the environment under 0.1, capture immutable source authority under 0.2, then freeze the versioned namespace under 0.3.', href: 'apwh.html' }
      ]
    },
    apush: {
      title: 'Existing work mapped to the runbook lifecycle',
      note: 'APUSH accepted source is IN PROGRESS. The ledger remains 49 accepted / 200 pending; 53 migrated wrappers and 139 wave-3 image contracts are landed. PR #8 is ordered behind open PR #7; issues #6 and #9 remain open. Phase 0 has not started.',
      rows: [
        { gate: 1, state: 'evidence', status: 'Mapped evidence', signal: '249-position blueprint · 4 recorded deviations', copy: 'The design reconciliation belongs with scope lock, but it is preparation rather than a current implementation crosswalk.', href: 'claims.html' },
        { gate: 2, state: 'evidence', status: 'Mapped evidence', signal: '2,480 candidates · 249 ledger positions', copy: 'The candidate queue is complete, but candidate-budget completeness is not factory-QC or learner-readiness proof.', href: 'claims.html' },
        { gate: 3, state: 'evidence', status: 'Mapped evidence', signal: '49 accepted · 200 pending', copy: 'The exact current ledger separates accepted from pending positions without inflating the usable corpus.', href: 'claims.html' },
        { gate: 4, state: 'evidence', status: 'Mapped evidence', signal: '53 wrappers + 139 image contracts landed', copy: 'Build-output main 8682f4dc holds the current packets. PR #8 must follow PR #7; issues #6 and #9 remain open. No platform or learner write is claimed.', href: 'https://github.com/ilmych/apush-build-outputs/commit/8682f4dca668' }
      ]
    },
    psych: {
      title: 'Psychology runbook-aligned sequence',
      note: 'Psychology remains before Phase 0 at the accepted-source entry boundary. Content generation is PROVEN with 1,912 staged MCQs and 37 staged FRQs across five units, but QC green is BLOCKED_CONTRACT and zero canon rows are PROVEN.',
      rows: [
        { gate: 3, code: 'AS-01', name: 'Accepted source', label: 'Entry boundary', state: 'active', status: 'In progress', signal: 'Content generated · QC contract blocked', copy: 'The staged bank has 1,912 MCQs and 37 FRQs across five units, including the landed Unit 5 set. Zero staged MCQs have /v1/qc receipts; store/layout declaration, EBQ readback, and grader certification remain.', href: 'https://github.com/InceptTrilogy/ap-psychology-fall-2025-v1/issues/51' },
        { gate: 5, code: 'P1-04', name: 'Phase 1.3 article check sets', label: 'Article checks', state: 'evidence', status: 'Evidence only', signal: 'Units 1-5 pipeline evidence landed', copy: 'The assessment pipeline supplies bounded source-bound evidence through Unit 5. Course-wide exact-set and answer-shape seals do not exist, so this does not enter Phase 1.', href: 'https://github.com/InceptTrilogy/ap-psychology-fall-2025-v1/tree/c349f4349742/3.%20Assessment' },
        { gate: 7, code: 'P3-05', name: 'Phase 3.4 native MCQs', label: 'Native MCQs', state: 'evidence', status: 'Evidence only', signal: 'Bounded item-pipeline evidence; QTI seal absent', copy: 'Units 1-4 are staged, but no complete native-MCQ QTI, reference, or final answer-shape report exists. The row has evidence, not phase credit.', href: 'psych.html' },
        { gate: 7, code: 'P3-06', name: 'Phase 3.5 writing tasks', label: 'Writing tasks', state: 'evidence', status: 'Evidence only', signal: 'FRQ PR #20 open · grader readiness false', copy: 'Writing content work exists, but the AP Psychology AI_ONLY_READY flag is false. QTI, rubric, grader-parity, and writing-display seals remain open, capping P3-06 and RLS-14.', href: 'https://github.com/InceptTrilogy/ap-psychology-fall-2025-v1/pull/20' },
        { gate: 4, code: 'PROFILE', name: 'Course profile required before Phase 0', label: 'Course profile', state: 'locked', status: 'Not yet measured', signal: 'PR-01 through PR-08, RLS-01, and HO-01 remain open', copy: 'Author the reviewed, validator-consumed Psychology profile only after Unit 5 content exists. Its source digest waits for the immutable source capture.', href: 'psych.html' },
        { gate: 4, code: 'P0', name: 'Phase 0 — Establish authority', label: 'Establish authority', state: 'locked', status: 'Not entered', signal: '0.1-0.3 wait for accepted-source closure', copy: 'After AS-01 closes: bind the environment, capture immutable source authority, then freeze a fresh versioned namespace.', href: 'psych.html' },
        { gate: 13, code: 'HO', name: 'Required handoff packet', label: 'Handoff packet', state: 'locked', status: 'Not yet measured', signal: 'No runbook handoff artifact set exists', copy: 'The course remains at the entry boundary. END-01 still requires the real learner path plus persisted TimeBack readback.', href: 'psych.html' }
      ]
    }
  }
};

(() => {
  const courses = AP4_DASHBOARD.courses;
  const phaseCodes = ['P1', 'P2', 'P3'];
  if (courses.length !== 4 || AP4_DASHBOARD.gates.length !== 14 || new Set(AP4_DASHBOARD.gates.map(gate => gate.id)).size !== 14 || courses.some(course => course.phaseStates.length !== 3 || course.phaseStates.some((phase, index) => phase.code !== phaseCodes[index]))) {
    throw new Error('Dashboard lifecycle data is incomplete.');
  }

  const phaseMarkup = course => `
    <div class="phase-state-grid" aria-label="${course.label} Phase 1, Phase 2, and Phase 3 states">
      ${course.phaseStates.map(phase => `
        <div class="phase-state phase-state-${phase.state}">
          <div><strong>${phase.code}</strong><span>${phase.status}</span></div>
          <h3>${phase.name}</h3>
          <p>${phase.detail}</p>
        </div>`).join('')}
    </div>`;

  document.querySelectorAll('[data-phase-summary]').forEach(root => {
    root.innerHTML = `
      <div class="section-head"><div><span class="badge b-blue">Runbook phases</span><h2>Phase 1, Phase 2, and Phase 3</h2></div></div>
      <p>Each phase is reported separately; evidence on a locked phase does not grant phase credit.</p>
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
        <div><span class="badge b-${course.statusTone}">${course.mapping}</span><h2>Current runbook state</h2></div>
        <span class="gate-observed">Latest mapped receipt · ${course.observed}</span>
      </div>
      <p class="gate-evidence-note">${map.note} Evidence counts retain their cited scope and are never summed into a completion percentage.</p>
      ${phaseMarkup(course)}
      <div class="work-footprint" aria-label="${course.label} observable work footprint">
        ${course.footprint.map(metric => `<div><strong>${metric.value}</strong><span>${metric.label}</span></div>`).join('')}
      </div>
      <div class="gate-evidence-list">
        ${map.rows.map(row => `
          <article class="gate-evidence-row gate-evidence-${row.state}">
            <div class="gate-evidence-id"><span title="${row.name || AP4_DASHBOARD.gates[row.gate].canonName}" aria-label="${row.name || AP4_DASHBOARD.gates[row.gate].canonName}">${row.code || AP4_DASHBOARD.gates[row.gate].canonCode}</span><small aria-hidden="true">${row.label || AP4_DASHBOARD.gates[row.gate].railName}</small></div>
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
          ${phaseMarkup(course)}
          <p><strong>Next:</strong> ${course.nextStep}</p>
        </a>`).join('')}
    </div>`;
})();
