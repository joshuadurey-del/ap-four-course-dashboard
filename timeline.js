/*
Dashboard display contract:
- Overview cards show the current TimeBack lifecycle state, landed work, and next governed step.
- HumGeo uses the AP One Native TimeBack Course Publication Runbook lifecycle and phases.
- Historical receipts retain their original scope and move only to a new credit home.
- Evidence on a locked state stays evidence; it does not unlock that state.
*/
const AP4_DASHBOARD = window.AP4_DASHBOARD = {
  snapshot: 'Aug 31, 2026 · 10:36 KST',
  activeCourse: 'humgeo',
  gates: [
    { id: 0, name: 'Stabilize', canonCode: 'AS', railName: 'Source prep · stabilize', canonName: 'Accepted-source preparation · STABILIZED', state: 'closed', status: 'Closed', detail: 'The six-slot pilot is fully measured: one passing replacement landed, five failures remain preserved, and residual execution is stopped.' },
    { id: 1, name: 'Lock scope', canonCode: 'AS', railName: 'Source prep · scope', canonName: 'Accepted-source preparation · SCOPE_LOCKED', state: 'closed', status: 'Closed', detail: 'PR #62 and the issue #50 reconciliation receipt close the exact 150-EK, 70-LO, 68-topic, and 68-gate scope on canonical main aa11026.' },
    { id: 2, name: 'Inventory', canonCode: 'AS', railName: 'Source prep · inventory', canonName: 'Accepted-source preparation · INVENTORY_LOCKED', state: 'closed', status: 'Closed · amendment locked', detail: 'Owner-merged PR #66 seals the omitted rehearsal lane: 655 checked, 70 stale-unusable, zero unknown or unmeasured, and byte-stable canonical verification.' },
    { id: 3, name: 'Accept source', canonCode: 'AS', railName: 'Accepted source', canonName: 'Accepted source · SOURCE_ACCEPTED', state: 'closed', status: 'Closed · SOURCE_ACCEPTED', detail: 'Merged PR #67 and canonical post-merge verification bind all 70 replacement placements with exact coverage, the pinned delivery digest, and zero residue.' },
    { id: 4, name: 'Profile + authority', canonCode: 'P0', railName: 'Profile + source bound', canonName: 'Course profile + Phase 0 · PROFILE_AND_SOURCE_BOUND', state: 'closed', status: 'Closed · PROFILE_AND_SOURCE_BOUND', detail: 'Owner-merged AP One main, canonical artifact reconstruction, exact oracle coverage, zero-write dry run, exact Deploy, and staging readback are bound.' },
    { id: 5, name: 'Map course tree', canonCode: 'P1', railName: 'Course tree', canonName: 'Phase 1 · Map the complete course tree', state: 'closed', status: 'Closed', detail: 'The complete hierarchy, order, gates, invariants, assessments, and assigned-reading delivery are receipted.' },
    { id: 6, name: 'Price activities', canonCode: 'P2', railName: 'Activity pricing', canonName: 'Phase 2 · Price activities', state: 'closed', status: 'Done · stored XP measured', detail: 'The receipt measures 3,633 served practice-key items: 3,167 at 1 XP and 466 at 2 XP. It also measures 403 demo-snapshot items and zero XP fields in the demo tree. Resource-level base XP remains unmeasured locally and binds in the Phase 4 plan.' },
    { id: 7, name: 'Generate assets', canonCode: 'P3', railName: 'Assets + QTI', canonName: 'Phase 3 · Generate hosted assets and QTI', state: 'closed', status: 'Closed · validation + preview passed', detail: 'Assets, QTI, Phase 3.6 validation, and the Phase 3.7 student-preview gate are closed on receipts.' },
    { id: 8, name: 'Seal plan', canonCode: 'P4-5', railName: 'Sealed plan', canonName: 'Phases 4-5 · Sealed all-absent plan', state: 'active', status: 'Phase 4 open · Phase 5 next', detail: 'Phase 4 waits for the private content-base URL or bucket, execute authority, and owner rulings on 71 video cues and answer-position skew. Phase 5 is the next read-only capture.' },
    { id: 9, name: 'Dark publish', canonCode: 'P6', railName: 'Publish + replay', canonName: 'Phase 6 · Dark publication and exact zero-write replay', state: 'locked', status: 'Locked', detail: 'Publish in testing under the global writer lock, exact-read each write, and replay the completed plan with zero writes.' },
    { id: 10, name: 'Canary enroll', canonCode: 'P7', railName: 'Canary enrollments', canonName: 'Phase 7 · Owner-controlled canary enrollments', state: 'locked', status: 'Locked', detail: 'Enroll only owner-controlled canaries under a separate plan and authority, then exact-read and replay with zero writes.' },
    { id: 11, name: 'Activate', canonCode: 'P8', railName: 'Private activation', canonName: 'Phase 8 · Separate private activation', state: 'locked', status: 'Locked', detail: 'Activate privately under its own authority, restore-proof checkpoint, exact readback, and zero-write replay.' },
    { id: 12, name: 'Learner accept', canonCode: 'P9.1-9.5', railName: 'Learner acceptance', canonName: 'Phases 9.1-9.5 · Fresh-learner acceptance and identity isolation', state: 'locked', status: 'Locked', detail: 'Fresh isolated learners prove start, middle, end, retries, writing grading, XP, persistence, identity isolation, and visuals.' },
    { id: 13, name: 'Release', canonCode: 'P9.6', railName: 'Broader enrollment', canonName: 'Phase 9.6 + release checklist · Broader enrollment', state: 'locked', status: 'Locked', detail: 'Broader enrollment waits for the full release checklist, preserved repair chain, and owner decision.' }
  ],
  courses: [
    {
      id: 'humgeo', label: 'AP Human Geography', short: 'HumGeo', color: 'oklch(46% 0.11 170)',
      status: 'Phase 4 · OPEN', statusTone: 'blue', mapping: 'Runbook-canon lifecycle', observed: 'Aug 31 · 00:58Z',
      landed: 'Phases 0-3 — receipts in hand · Assets and QTI — closed · Phase 3.6 validation — closed · Phase 3.7 preview gate — closed',
      nextStep: 'Owner: fill the private content-base URL or bucket and execute authority, then rule on 71 video cues and answer-position skew. Seal the Phase 4 plan; Phase 5 read-only capture is next.',
      footprint: [
        { value: '440/440', label: 'operator-receipt article-check position' },
        { value: '528', label: 'locally validated XHTML + QTI assets' },
        { value: '1,042', label: 'Phase 3.3 video pages + checks built' }
      ],
      etaDays: 'PHASE 4 OPEN',
      etaNote: 'Phases 0-3 are closed. Phase 4 is waiting on the two private fields and two owner rulings; Phase 6 remains the first platform write and requires a separate go.',
      phaseStates: [
        { code: 'P4', name: 'Seal the publication plan', state: 'active', status: 'OPEN', detail: 'The plan skeleton is drafted. It waits for the private content base, execute authority, and owner rulings on 71 video cues and answer-position skew.' }
      ]
    },
    {
      id: 'apwh', label: 'AP World History', short: 'APWH', color: 'oklch(48% 0.12 75)',
      status: 'Phase 0.2 · PR OPEN', statusTone: 'blue', mapping: 'Runbook-canon lifecycle', observed: 'Aug 31 · 00:48Z',
      landed: 'Pre-runbook repair — 45/58 broken gate items replaced · E3 wiring — PR #916 open · Phase 0.2 source capture — PR #917 open',
      nextStep: 'Fleet merges and deploys PRs #916 and #917; owner decides whether to authorize tier 2 for 1,003 more items. Test-builder issue #290 holds 169 article alternates.',
      footprint: [
        { value: '45/58', label: 'tier-1 replacements merged in PR #65' },
        { value: '1,003', label: 'tier-2 items awaiting owner decision' },
        { value: '169', label: 'article alternates held by issue #290' }
      ],
      phaseStates: [
        { code: 'P0.2', name: 'Capture source authority', state: 'active', status: 'PR OPEN', detail: 'PR #917 carries the source capture; PR #916 carries E3 wiring. Fleet owns merge and deploy watch.' }
      ]
    },
    {
      id: 'apush', label: 'AP US History', short: 'APUSH', color: 'oklch(48% 0.17 28)',
      status: 'Pre-runbook · CONTENT PRODUCTION', statusTone: 'blue', mapping: 'Runbook-canon lifecycle', observed: 'Aug 31 · 00:51Z',
      landed: 'Wave-3 article production — fleet-side · Chunk 1 of 20 passed at 50% · 249-position ledger — 49 accepted / 200 pending',
      nextStep: 'Fleet completes the wave, regenerates failures, and rebuilds the acceptance ledger. The publication runbook starts only after that; no owner action is due.',
      footprint: [
        { value: '49/249', label: 'accepted ledger positions' },
        { value: '1/20', label: 'wave-3 chunks through the first measured checkpoint' },
        { value: '50%', label: 'chunk-1 pass rate' }
      ],
      phaseStates: [
        { code: 'PRE', name: 'Fleet content production', state: 'active', status: 'IN PROGRESS', detail: 'Wave-3 articles run through fleet QC; failed items regenerate. The runbook begins after the wave lands and the ledger rebuilds.' }
      ]
    },
    {
      id: 'psych', label: 'AP Psychology', short: 'Psych', color: 'oklch(48% 0.16 305)',
      status: 'Pre-Phase 0 · QC BLOCKED', statusTone: 'blue', mapping: 'Runbook-canon lifecycle', observed: 'Aug 31 · 00:54Z',
      landed: 'Articles — built · Questions — 1,912 · Essays — 37 · Phase 0 profile and tree-map drafts — ready',
      nextStep: 'Factory clears judge receipts, grader certification in PR #20, and essay-type deploy readback in issue #248. Phase 0 can then start quickly; no owner action is due.',
      footprint: [
        { value: '1,912', label: 'questions built' },
        { value: '37', label: 'essays built' },
        { value: '0', label: 'items with factory-judge admission receipts' }
      ],
      phaseStates: [
        { code: 'PRE-0', name: 'Factory QC admission', state: 'active', status: 'BLOCKED', detail: 'Built content cannot enter a bank until factory judge receipts, grader certification, and essay-type deploy readback exist.' }
      ]
    }
  ],
  evidenceMaps: {
    humgeo: {
      title: 'Work footprint mapped to the runbook lifecycle',
      note: 'Phases 0-3 are closed on receipts. Phase 4 is open for the sealed publication plan; Phase 5 is the next read-only capture. Phase 6 remains the first platform write and waits for a separate owner go.',
      rows: [
        { gate: 0, state: 'closed', status: 'Closed', signal: '6 pilot slots · 1 pass landed · 5 measured failures preserved', copy: 'The issue-44 writer was stopped and the residual retry was rescoped, closing the stabilization gate without hiding the five failures.', href: 'https://github.com/ilmych/humgeo-rebuild/issues/44#issuecomment-5365762989' },
        { gate: 1, state: 'closed', status: 'Closed', signal: '150 EKs · 70 LOs · 68 mappings · zero differences', copy: 'PR #62 merged the official-source authority and shared gate rule on canonical main. Issue #50 now carries the merged-SHA verifier receipt and no rework label.', href: 'https://github.com/ilmych/humgeo-rebuild/issues/50#issuecomment-5369982183' },
        { gate: 2, state: 'closed', status: 'Closed · amendment locked', signal: 'PR #66 merged · 655 checked · 70 stale · zero unknown', copy: 'Canonical main e16aebeb seals the omitted rehearsal lane. The manifest rebuilt byte-for-byte; 43 focused and 837 full-suite tests passed.', href: 'https://github.com/ilmych/humgeo-rebuild/pull/66' },
        { gate: 3, state: 'closed', status: 'Closed · SOURCE_ACCEPTED', signal: 'PR #67 merged · 70/70 accepted · zero residue', copy: 'Canonical verification reproduced exact source coverage and delivery SHA-256 37fb16a0133bb1e1390cb6ce9ada96a2e96cfd49a9c54020046437d9e9edc11b; focused, affected, and full repository gates passed.', href: 'https://github.com/ilmych/humgeo-rebuild/pull/67' },
        { gate: 4, state: 'closed', status: 'Closed · PROFILE_AND_SOURCE_BOUND', signal: 'PR #851 merged · exact Deploy · exact staging SHA', copy: 'Canonical reconstruction reproduced the profile, exhaustive Phase 0 capture, native bind, unchanged 5,870-coordinate oracle, and zero-write receipt byte-for-byte. Deploy 32799920454 and staging matched owner-merged AP One main.', href: 'https://github.com/InceptTrilogy/ap-one/pull/851' },
        { gate: 5, state: 'closed', status: 'Closed', signal: 'Phase 1 course tree receipted', copy: 'The Phase 1 mapping receipt is in hand; this row no longer reports the older open-census snapshot.', href: 'humgeo.html' },
        { gate: 6, state: 'closed', status: 'Done', signal: '3,633 served practice-key items measured', copy: 'The receipt measures 3,167 at 1 XP and 466 at 2 XP, plus a 403-item demo snapshot at 356/47. The demo tree has zero XP fields. Resource-level base XP remains unmeasured locally and binds in the Phase 4 plan.', href: 'claims.html#claim-humgeo.blueprint.audit' },
        { gate: 7, state: 'closed', status: 'Closed', signal: 'Assets + QTI + 3.6 validation + 3.7 preview closed', copy: 'Phase 3 is closed on its receipts. The 71 video-cue calls now belong to the Phase 4 owner decision, not unfinished Phase 3 credit.', href: 'https://github.com/InceptTrilogy/ap-one/pull/913' },
        { gate: 8, state: 'active', status: 'Phase 4 open', signal: 'Plan skeleton drafted · four owner inputs remain', copy: 'Fill the private content-base URL or bucket and execute authority, then rule on the 71 video cues and answer-position skew before sealing the plan.', href: 'humgeo.html' }
      ]
    },
    apwh: {
      title: 'APWH runbook-aligned sequence',
      note: 'APWH is stepping into Phase 0. Pre-runbook repair replaced 45 of 58 broken gate items. E3 wiring is open in PR #916 and Phase 0.2 source capture is open in PR #917; fleet owns both merges and deploy watch.',
      rows: [
        { gate: 4, code: 'PRE-0', name: 'Course profile required before Phase 0', label: 'Course profile', state: 'closed', status: 'Done', signal: 'Profile, consumer, authoring wave, and hash refresh landed', copy: 'PR #889 landed the reviewed, validator-consumed profile and consumer; PR #891 then landed the authoring wave and profile-hash refresh. This prerequisite does not enter Phase 0.', href: 'https://github.com/InceptTrilogy/ap-one/pull/891' },
        { gate: 3, code: 'PRE-0', name: 'Pre-runbook repair', label: 'Repair', state: 'evidence', status: 'Landed', signal: '45/58 broken gate items replaced', copy: 'The tier-1 round is landed. This is repair evidence, not later-phase credit.', href: 'https://github.com/ilmych/apwh-blueprint-build/pull/65' },
        { gate: 4, code: 'P0.2', name: 'Phase 0.2 — Capture source authority', label: 'Source capture', state: 'active', status: 'PR open', signal: 'PR #917 source capture · PR #916 E3 wiring', copy: 'Fleet owns both merges and deploy watch. Owner tier-2 authority for 1,003 items remains undecided; issue #290 holds 169 article alternates.', href: 'https://github.com/InceptTrilogy/ap-one/pull/917' }
      ]
    },
    apush: {
      title: 'Existing work mapped to the runbook lifecycle',
      note: 'APUSH is entirely pre-runbook and still in fleet-side content production. Wave-3 articles pass their own QC or regenerate; the runbook begins after the wave lands and the acceptance ledger rebuilds.',
      rows: [
        { gate: 1, state: 'evidence', status: 'Mapped evidence', signal: '249-position blueprint · 4 recorded deviations', copy: 'The design reconciliation belongs with scope lock, but it is preparation rather than a current implementation crosswalk.', href: 'claims.html' },
        { gate: 2, state: 'evidence', status: 'Mapped evidence', signal: '2,480 candidates · 249 ledger positions', copy: 'The candidate queue is complete, but candidate-budget completeness is not factory-QC or learner-readiness proof.', href: 'claims.html' },
        { gate: 3, state: 'evidence', status: 'Mapped evidence', signal: '49 accepted · 200 pending', copy: 'The exact current ledger separates accepted from pending positions without inflating the usable corpus.', href: 'claims.html' },
        { gate: 3, code: 'PRE', name: 'Fleet content production', label: 'Wave 3', state: 'active', status: 'In progress', signal: 'Chunk 1 of 20 measured at 50%', copy: 'Wave-3 articles run fleet-side behind their own QC; failures regenerate. The 249-position ledger remains 49 accepted and 200 pending until the wave finishes and the ledger rebuilds.', href: 'https://github.com/ilmych/apush-course-build/issues/9' }
      ]
    },
    psych: {
      title: 'Psychology runbook-aligned sequence',
      note: 'Psychology is pre-Phase 0. Articles, 1,912 questions, and 37 essays exist, but zero items carry the factory judge receipt required for bank admission. Phase 0 profile and tree-map drafts are ready for the factory waits to clear.',
      rows: [
        { gate: 3, code: 'PRE-0', name: 'Factory QC admission', label: 'QC layer', state: 'active', status: 'Blocked', signal: '1,912 questions + 37 essays built · zero judge receipts', copy: 'Content exists but cannot enter a bank without the factory judge receipt. The waits are judge receipts, grader certification in PR #20, and essay-type deploy readback in issue #248.', href: 'https://github.com/InceptTrilogy/ap-psychology-fall-2025-v1/pull/20' },
        { gate: 5, code: 'P1-04', name: 'Phase 1.3 article check sets', label: 'Article checks', state: 'evidence', status: 'Evidence only', signal: '253 canonical articles · 236 illustrated in prep draft', copy: 'The prep-only tree draft measures the current source, but owner/factory fields and course-wide exact-set and answer-shape seals remain open, so this does not enter Phase 1.', href: 'https://github.com/InceptTrilogy/ap-psychology-fall-2025-v1/tree/037cc168b43b/3.%20Assessment' },
        { gate: 7, code: 'P3-05', name: 'Phase 3.4 native MCQs', label: 'Native MCQs', state: 'evidence', status: 'Evidence only', signal: 'Bounded item-pipeline evidence; QTI seal absent', copy: 'Units 1-4 are staged, but no complete native-MCQ QTI, reference, or final answer-shape report exists. The row has evidence, not phase credit.', href: 'psych.html' },
        { gate: 7, code: 'P3-06', name: 'Phase 3.5 writing tasks', label: 'Writing tasks', state: 'evidence', status: 'Evidence only', signal: 'FRQ PR #20 open · grader readiness false', copy: 'Writing content work exists, but the AP Psychology AI_ONLY_READY flag is false. QTI, rubric, grader-parity, and writing-display seals remain open, capping P3-06 and RLS-14.', href: 'https://github.com/InceptTrilogy/ap-psychology-fall-2025-v1/pull/20' },
        { gate: 4, code: 'PROFILE', name: 'Course profile required before Phase 0', label: 'Course profile', state: 'locked', status: 'Prep only', signal: 'Draft: 253 canonical articles · 236 illustrated · owner fields deferred', copy: 'A local profile and tree draft now measures the current source. It is not reviewed or validator-consumed, its owner/factory fields are deferred, and its source digest waits for immutable Phase 0 capture.', href: 'psych.html' },
        { gate: 4, code: 'P0', name: 'Phase 0 — Establish authority', label: 'Establish authority', state: 'locked', status: 'Not entered', signal: '0.1-0.3 wait for accepted-source closure', copy: 'After AS-01 closes: bind the environment, capture immutable source authority, then freeze a fresh versioned namespace.', href: 'psych.html' },
        { gate: 13, code: 'HO', name: 'Required handoff packet', label: 'Handoff packet', state: 'locked', status: 'Not yet measured', signal: 'No runbook handoff artifact set exists', copy: 'The course remains at the entry boundary. END-01 still requires the real learner path plus persisted TimeBack readback.', href: 'psych.html' }
      ]
    }
  }
};

(() => {
  const courses = AP4_DASHBOARD.courses;
  if (courses.length !== 4 || AP4_DASHBOARD.gates.length !== 14 || new Set(AP4_DASHBOARD.gates.map(gate => gate.id)).size !== 14 || courses.some(course => !course.phaseStates.length || course.phaseStates.some(phase => !phase.code || !phase.name || !phase.status))) {
    throw new Error('Dashboard lifecycle data is incomplete.');
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
      <div class="section-head"><div><span class="badge b-blue">Runbook position</span><h2>Current phase or pre-runbook work</h2></div></div>
      <p>Each course shows only its current in-flight position; earlier receipts remain in the evidence map.</p>
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
          <p><strong>Next:</strong> ${course.nextStep}</p>
        </a>`).join('')}
    </div>`;
})();
