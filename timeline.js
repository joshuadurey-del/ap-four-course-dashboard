/*
Dashboard display contract:
- Overview cards show the current TimeBack lifecycle state, landed work, and next governed step.
- HumGeo uses the AP One Native TimeBack Course Publication Runbook lifecycle and phases.
- Historical receipts retain their original scope and move only to a new credit home.
- Evidence on a locked state stays evidence; it does not unlock that state.
*/
const AP4_DASHBOARD = {
  snapshot: 'Aug 29, 2026 · 10:56 KST',
  activeCourse: 'humgeo',
  gates: [
    { id: 0, name: 'Stabilize', canonCode: 'AS', railName: 'Source prep · stabilize', canonName: 'Accepted-source preparation · STABILIZED', state: 'closed', status: 'Closed', detail: 'The six-slot pilot is fully measured: one passing replacement landed, five failures remain preserved, and residual execution is stopped.' },
    { id: 1, name: 'Lock scope', canonCode: 'AS', railName: 'Source prep · scope', canonName: 'Accepted-source preparation · SCOPE_LOCKED', state: 'closed', status: 'Closed', detail: 'PR #62 and the issue #50 reconciliation receipt close the exact 150-EK, 70-LO, 68-topic, and 68-gate scope on canonical main aa11026.' },
    { id: 2, name: 'Inventory', canonCode: 'AS', railName: 'Source prep · inventory', canonName: 'Accepted-source preparation · INVENTORY_LOCKED', state: 'closed', status: 'Closed · amendment locked', detail: 'Owner-merged PR #66 seals the omitted rehearsal lane: 655 checked, 70 stale-unusable, zero unknown or unmeasured, and byte-stable canonical verification.' },
    { id: 3, name: 'Accept source', canonCode: 'AS', railName: 'Accepted source', canonName: 'Accepted source · SOURCE_ACCEPTED', state: 'closed', status: 'Closed · SOURCE_ACCEPTED', detail: 'Merged PR #67 and canonical post-merge verification bind all 70 replacement placements with exact coverage, the pinned delivery digest, and zero residue.' },
    { id: 4, name: 'Profile + authority', canonCode: 'P0', railName: 'Profile + source bound', canonName: 'Course profile + Phase 0 · PROFILE_AND_SOURCE_BOUND', state: 'closed', status: 'Closed · PROFILE_AND_SOURCE_BOUND', detail: 'Owner-merged AP One main, canonical artifact reconstruction, exact oracle coverage, zero-write dry run, exact Deploy, and staging readback are bound.' },
    { id: 5, name: 'Graph + preview', canonCode: 'P1-3', railName: 'Graph + preview', canonName: 'Phases 1-3 · Offline graph and student-surface preview', state: 'active', status: 'In progress · 440/440 operator receipts', detail: 'P1-04 article exercise depth is met at the operator-receipt position: all 440 slots hold creation full-QC plus independent /v1/qc acceptance. Landing, formal census reconcile, bank-wide validation, answer-shape reporting, QTI validation, and student-surface preview remain.' },
    { id: 6, name: 'Seal plan', canonCode: 'P4-5', railName: 'Sealed plan', canonName: 'Phases 4-5 · Sealed all-absent plan', state: 'locked', status: 'Locked', detail: 'Build the deterministic publication plan and bind an exact all-absent live checkpoint.' },
    { id: 7, name: 'Dark publish', canonCode: 'P6', railName: 'Publish + replay', canonName: 'Phase 6 · Dark publication and exact zero-write replay', state: 'locked', status: 'Locked', detail: 'Publish in testing under the global writer lock, exact-read each write, and replay the completed plan with zero writes.' },
    { id: 8, name: 'Canary enroll', canonCode: 'P7', railName: 'Canary enrollments', canonName: 'Phase 7 · Owner-controlled canary enrollments', state: 'locked', status: 'Locked', detail: 'Enroll only owner-controlled canaries under a separate plan and authority, then exact-read and replay with zero writes.' },
    { id: 9, name: 'Activate', canonCode: 'P8', railName: 'Private activation', canonName: 'Phase 8 · Separate private activation', state: 'locked', status: 'Locked', detail: 'Activate privately under its own authority, restore-proof checkpoint, exact readback, and zero-write replay.' },
    { id: 10, name: 'Learner accept', canonCode: 'P9.1-9.5', railName: 'Learner acceptance', canonName: 'Phases 9.1-9.5 · Fresh-learner acceptance and identity isolation', state: 'locked', status: 'Locked', detail: 'Fresh isolated learners prove start, middle, end, retries, writing grading, XP, persistence, identity isolation, and visuals.' },
    { id: 11, name: 'Release', canonCode: 'P9.6', railName: 'Broader enrollment', canonName: 'Phase 9.6 + release checklist · Broader enrollment', state: 'locked', status: 'Locked', detail: 'Broader enrollment waits for the full release checklist, preserved repair chain, and owner decision.' }
  ],
  courses: [
    {
      id: 'humgeo', label: 'AP Human Geography', short: 'HumGeo', color: 'oklch(46% 0.11 170)',
      status: 'Phases 1-3 · IN PROGRESS', statusTone: 'blue', mapping: 'Runbook-canon lifecycle', observed: 'Aug 29 · 00:55Z',
      landed: 'Accepted source — closed · Course profile required before Phase 0 — closed · Phase 0 — Establish authority — closed · Phase 1.3 article depth — 440/440 operator receipts; bank-wide validation open · Phase 2 — unmeasured · Phase 3 — in progress',
      nextStep: 'Gate and show the five-lesson PR package; after Josh opens and merges the course PR and the bytes are ingested, run the formal census reconcile, bank-wide validation, and answer-shape report.',
      footprint: [
        { value: '440/440', label: 'operator-receipt article-check position' },
        { value: '161', label: 'persisted generation job bodies' },
        { value: '5', label: 'enriched lessons awaiting landing' }
      ],
      etaDays: 'LANDING NEXT',
      etaNote: '440/440 is the operator-receipt position. The census module mints the formal number only after the enriched article bytes land; its plan binds those landed bytes.'
    },
    {
      id: 'apwh', label: 'AP World History', short: 'APWH', color: 'oklch(48% 0.12 75)',
      status: 'Accepted source · IN PROGRESS', statusTone: 'blue', mapping: 'Runbook-canon lifecycle', observed: 'Aug 29 · 01:16Z',
      landed: 'Course profile required before Phase 0 — DONE · Accepted source — IN PROGRESS · Phase 0 — NOT ENTERED · Phases 1-10 — NOT STARTED',
      nextStep: 'Settle the remaining accepted-source rows, including paid or judgment content and open study-skills platform work; no course-merge-owner wait applies. Then run Phase 0.1-0.3.',
      footprint: [
        { value: '235', label: 'accepted-source ledger rows' },
        { value: '95', label: 'last complete-surface PASS rows' },
        { value: '34', label: 'last complete-surface MISSING rows' }
      ]
    },
    {
      id: 'apush', label: 'AP US History', short: 'APUSH', color: 'oklch(48% 0.17 28)',
      status: 'Accepted source · IN PROGRESS', statusTone: 'blue', mapping: 'Runbook-canon lifecycle', observed: 'Aug 29 · 01:16Z',
      landed: 'Accepted source — in progress · Phase 1 — Map the complete course tree / 1.7 Tree invariants — mapped composer and binding-census evidence · Phase 3 — Generate hosted assets and QTI — mapped wrapper evidence; no phase credit',
      nextStep: 'Re-derive the remaining 21 bindings through issue #9, preserve the 53 landed wrappers, and rerun the owning verifier.',
      footprint: [
        { value: '49/249', label: 'accepted ledger positions' },
        { value: '53', label: 'safe migrated wrappers landed' },
        { value: '21', label: 'bindings require re-derivation' }
      ]
    },
    {
      id: 'psych', label: 'AP Psychology', short: 'Psych', color: 'oklch(48% 0.16 305)',
      status: 'Accepted source · IN PROGRESS', statusTone: 'blue', mapping: 'Runbook-canon lifecycle', observed: 'Aug 29 · 01:16Z',
      landed: 'Accepted source — IN PROGRESS · Units 1-4 assessment and publish artifacts staged · P1-04, P3-05, and P3-06 — bounded IN_PROGRESS evidence with no phase credit · Course profile, Phase 0, and handoff — NOT_YET_MEASURED',
      nextStep: 'Land the one remaining Unit 5 mechanism issue, #51; then run bounded Unit 5 generation after the HumGeo-first queue and spend go, close AS-01, and build the reviewed course profile.',
      footprint: [
        { value: '0', label: 'canon rows proven' },
        { value: '3', label: 'implementation rows in progress' },
        { value: '1', label: 'Unit 5 mechanism issue remains' }
      ]
    }
  ],
  evidenceMaps: {
    humgeo: {
      title: 'Work footprint mapped to the runbook lifecycle',
      note: 'Accepted source and Phase 0 retain closure credit. Phases 1-3 are IN PROGRESS: P1-04 is 440/440 at the operator-receipt position, while landing, formal reconcile, the bank-wide sweeps, QTI validation, and student preview remain.',
      rows: [
        { gate: 0, state: 'closed', status: 'Closed', signal: '6 pilot slots · 1 pass landed · 5 measured failures preserved', copy: 'The issue-44 writer was stopped and the residual retry was rescoped, closing the stabilization gate without hiding the five failures.', href: 'https://github.com/ilmych/humgeo-rebuild/issues/44#issuecomment-5365762989' },
        { gate: 1, state: 'closed', status: 'Closed', signal: '150 EKs · 70 LOs · 68 mappings · zero differences', copy: 'PR #62 merged the official-source authority and shared gate rule on canonical main. Issue #50 now carries the merged-SHA verifier receipt and no rework label.', href: 'https://github.com/ilmych/humgeo-rebuild/issues/50#issuecomment-5369982183' },
        { gate: 2, state: 'closed', status: 'Closed · amendment locked', signal: 'PR #66 merged · 655 checked · 70 stale · zero unknown', copy: 'Canonical main e16aebeb seals the omitted rehearsal lane. The manifest rebuilt byte-for-byte; 43 focused and 837 full-suite tests passed.', href: 'https://github.com/ilmych/humgeo-rebuild/pull/66' },
        { gate: 3, state: 'closed', status: 'Closed · SOURCE_ACCEPTED', signal: 'PR #67 merged · 70/70 accepted · zero residue', copy: 'Canonical verification reproduced exact source coverage and delivery SHA-256 37fb16a0133bb1e1390cb6ce9ada96a2e96cfd49a9c54020046437d9e9edc11b; focused, affected, and full repository gates passed.', href: 'https://github.com/ilmych/humgeo-rebuild/pull/67' },
        { gate: 4, state: 'closed', status: 'Closed · PROFILE_AND_SOURCE_BOUND', signal: 'PR #851 merged · exact Deploy · exact staging SHA', copy: 'Canonical reconstruction reproduced the profile, exhaustive Phase 0 capture, native bind, unchanged 5,870-coordinate oracle, and zero-write receipt byte-for-byte. Deploy 32799920454 and staging matched owner-merged AP One main.', href: 'https://github.com/InceptTrilogy/ap-one/pull/851' },
        { gate: 5, state: 'active', status: 'In progress', signal: '440/440 operator receipts · formal reconcile after landing', copy: 'Every article-check slot holds creation full-QC and independent /v1/qc acceptance. Land the five enriched lessons, reconcile the formal census, then run bank-wide validation, answer-shape, QTI, and student-preview checks.', href: 'humgeo.html' }
      ]
    },
    apwh: {
      title: 'APWH runbook-aligned sequence',
      note: 'APWH is before Phase 0. The required course profile and profile-hash refresh are landed. Accepted source remains IN PROGRESS; 95 PASS / 34 MISSING is the last complete-surface receipt, while the Aug 29 partial materialization remains diagnostic only. Phase 0 is NOT ENTERED, and Phases 1-10 are NOT STARTED.',
      rows: [
        { gate: 4, code: 'PRE-0', name: 'Course profile required before Phase 0', label: 'Course profile', state: 'closed', status: 'Done', signal: 'Profile, consumer, authoring wave, and hash refresh landed', copy: 'PR #889 landed the reviewed, validator-consumed profile and consumer; PR #891 then landed the authoring wave and profile-hash refresh. This prerequisite does not enter Phase 0.', href: 'https://github.com/InceptTrilogy/ap-one/pull/891' },
        { gate: 3, code: 'AS', name: 'Accepted source', label: 'Accepted source', state: 'active', status: 'In progress', signal: '235 rows · last complete receipt 95 PASS / 34 MISSING', copy: 'The Aug 29 current-tree recheck remained non-green, but its materialized tree omitted registry and app-source surfaces. That partial diagnostic does not supersede the last complete-surface ledger. The blocker is unsettled accepted-source evidence, not merge ownership.', href: 'https://github.com/ilmych/apwh-blueprint-build/commit/c9c47afef75b7af70bc312cb486801ebad3a4e3f' },
        { gate: 4, code: 'P0', name: 'Phase 0 — Establish authority', label: 'Establish authority', state: 'locked', status: 'Not entered', signal: '0.2 capture tool authored; accepted source still moving', copy: 'After AS-01 settles: bind the environment under 0.1, capture immutable source authority under 0.2, then freeze the versioned namespace under 0.3.', href: 'apwh.html' },
        { gate: 5, code: 'P1-10', name: 'Phases 1-10', label: 'Later lifecycle', state: 'locked', status: 'Not started', signal: 'Nothing after Phase 0 has started', copy: 'Course-tree mapping begins only after Phase 0 exists; every later runbook phase remains untouched.', href: 'apwh.html' }
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
      title: 'Psychology runbook-aligned sequence',
      note: 'Psychology remains before Phase 0 at the accepted-source entry boundary. Zero canon rows are PROVEN. P1-04, P3-05, and P3-06 carry bounded IN_PROGRESS evidence beneath AS-01; the course profile through the handoff packet remains NOT_YET_MEASURED.',
      rows: [
        { gate: 3, code: 'AS-01', name: 'Accepted source', label: 'Entry boundary', state: 'active', status: 'In progress', signal: 'One Unit 5 mechanism issue remains: #51', copy: 'The assessment tree has 68 tracked files, with zero under Unit 5; the 3,173 Units 1-4 publish XML files are parse-clean. Three earlier mechanism gaps are closed; #51 owns the bounded generation route and claim-rules oracle.', href: 'https://github.com/InceptTrilogy/ap-psychology-fall-2025-v1/issues/51' },
        { gate: 5, code: 'P1-04', name: 'Phase 1.3 article check sets', label: 'Article checks', state: 'active', status: 'In progress', signal: 'Units 1-4 pipeline evidence landed', copy: 'The assessment pipeline supplies bounded source-bound check-set evidence. Course-wide exact-set and answer-shape seals do not exist, so this does not enter Phase 1.', href: 'https://github.com/InceptTrilogy/ap-psychology-fall-2025-v1/tree/11f7028eee30e705594c47b72a1d36c29318e534/3.%20Assessment' },
        { gate: 5, code: 'P3-05', name: 'Phase 3.4 native MCQs', label: 'Native MCQs', state: 'active', status: 'In progress', signal: 'Bounded item-pipeline evidence; QTI seal absent', copy: 'Units 1-4 are staged, but no complete native-MCQ QTI, reference, or final answer-shape report exists. The row has evidence, not phase credit.', href: 'psych.html' },
        { gate: 5, code: 'P3-06', name: 'Phase 3.5 writing tasks', label: 'Writing tasks', state: 'active', status: 'In progress', signal: 'FRQ PR #20 open · grader readiness false', copy: 'Writing content work exists, but the AP Psychology AI_ONLY_READY flag is false. QTI, rubric, grader-parity, and writing-display seals remain open, capping P3-06 and RLS-14.', href: 'https://github.com/InceptTrilogy/ap-psychology-fall-2025-v1/pull/20' },
        { gate: 4, code: 'PROFILE', name: 'Course profile required before Phase 0', label: 'Course profile', state: 'locked', status: 'Not yet measured', signal: 'PR-01 through PR-08, RLS-01, and HO-01 remain open', copy: 'Author the reviewed, validator-consumed Psychology profile only after Unit 5 content exists. Its source digest waits for the immutable source capture.', href: 'psych.html' },
        { gate: 4, code: 'P0', name: 'Phase 0 — Establish authority', label: 'Establish authority', state: 'locked', status: 'Not entered', signal: '0.1-0.3 wait for accepted-source closure', copy: 'After AS-01 closes: bind the environment, capture immutable source authority, then freeze a fresh versioned namespace.', href: 'psych.html' },
        { gate: 11, code: 'HO', name: 'Required handoff packet', label: 'Handoff packet', state: 'locked', status: 'Not yet measured', signal: 'No runbook handoff artifact set exists', copy: 'The course remains at the entry boundary. END-01 still requires the real learner path plus persisted TimeBack readback.', href: 'psych.html' }
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
        <div><span class="badge b-${course.statusTone}">${course.mapping}</span><h2>Current runbook state</h2></div>
        <span class="gate-observed">Latest mapped receipt · ${course.observed}</span>
      </div>
      <p class="gate-evidence-note">${map.note} Evidence counts retain their cited scope and are never summed into a completion percentage.</p>
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
          <p><strong>Next:</strong> ${course.nextStep}</p>
        </a>`).join('')}
    </div>`;
})();
