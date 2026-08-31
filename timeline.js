/*
Dashboard display contract:
- Overview cards show the current TimeBack lifecycle state, landed work, and next governed step.
- HumGeo uses the AP One Native TimeBack Course Publication Runbook lifecycle and phases.
- Historical receipts retain their original scope and move only to a new credit home.
- Evidence on a locked state stays evidence; it does not unlock that state.
*/
const AP4_DASHBOARD = globalThis.AP4_DASHBOARD = {
  snapshot: 'Aug 31, 2026 · 12:24 KST',
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
    { id: 8, name: 'Seal plan', canonCode: 'P4-5', railName: 'Sealed plan', canonName: 'Phases 4-5 · Sealed all-absent plan', state: 'active', status: 'Phase 4 open · Phase 5 next', detail: 'Phase 4 authority is resolved and the real-base build is deterministic. The native-asset plan-builder gap is open in issue #919; 71 video-cue content decisions remain. Phase 5 is the next read-only capture.' },
    { id: 9, name: 'Dark publish', canonCode: 'P6', railName: 'Publish + replay', canonName: 'Phase 6 · Dark publication and exact zero-write replay', state: 'locked', status: 'Locked', detail: 'Publish in testing under the global writer lock, exact-read each write, and replay the completed plan with zero writes.' },
    { id: 10, name: 'Canary enroll', canonCode: 'P7', railName: 'Canary enrollments', canonName: 'Phase 7 · Owner-controlled canary enrollments', state: 'locked', status: 'Locked', detail: 'Enroll only owner-controlled canaries under a separate plan and authority, then exact-read and replay with zero writes.' },
    { id: 11, name: 'Activate', canonCode: 'P8', railName: 'Private activation', canonName: 'Phase 8 · Separate private activation', state: 'locked', status: 'Locked', detail: 'Activate privately under its own authority, restore-proof checkpoint, exact readback, and zero-write replay.' },
    { id: 12, name: 'Learner accept', canonCode: 'P9.1-9.5', railName: 'Learner acceptance', canonName: 'Phases 9.1-9.5 · Fresh-learner acceptance and identity isolation', state: 'locked', status: 'Locked', detail: 'Fresh isolated learners prove start, middle, end, retries, writing grading, XP, persistence, identity isolation, and visuals.' },
    { id: 13, name: 'Release', canonCode: 'P9.6', railName: 'Broader enrollment', canonName: 'Phase 9.6 + release checklist · Broader enrollment', state: 'locked', status: 'Locked', detail: 'Broader enrollment waits for the full release checklist, preserved repair chain, and owner decision.' }
  ],
  courses: [
    {
      id: 'humgeo', label: 'AP Human Geography', short: 'HumGeo', color: 'oklch(46% 0.11 170)',
      status: 'Phase 4 · OPEN', statusTone: 'blue', mapping: 'Runbook-canon lifecycle', observed: 'Aug 31 · 02:18Z',
      landed: 'Phases 0-3 — receipts in hand · Phase 4 authority — resolved · Real-base build — deterministic twice · Position correction — deployed and staging-verified',
      nextStep: 'Fleet closes the native-asset plan-builder gap in issue #919; resolve the 71 video-cue content decisions, then seal Phase 4. Phase 5 read-only capture is next.',
      footprint: [
        { value: '440/440', label: 'operator-receipt article-check position' },
        { value: '528', label: 'locally validated XHTML + QTI assets' },
        { value: '1,042', label: 'Phase 3.3 video pages + checks built' }
      ],
      etaDays: 'PHASE 4 OPEN',
      etaNote: 'Phases 0-3 are closed. Phase 4 authority and the real-base rebuild are complete; plan-builder machinery and 71 video-cue content decisions remain. Phase 6 remains the first platform write and requires a separate go.',
      phaseStates: [
        { code: 'P4', name: 'Seal the publication plan', state: 'active', status: 'OPEN', detail: 'P4-1 authority is resolved and P4-2 is done. PR #918 is deployed and independently staging-verified. P4-3 is filed as issue #919 because the native asset layer has no publication plan builder. Seventy-one video-cue content decisions remain.' }
      ]
    },
    {
      id: 'apwh', label: 'AP World History', short: 'APWH', color: 'oklch(48% 0.12 75)',
      status: 'Phase 0.2 OPEN · P1 LEG A MEASURED', statusTone: 'blue', mapping: 'Runbook-canon lifecycle', observed: 'Aug 31 · 01:22Z',
      landed: 'Pre-runbook repair — 45/58 replaced · Phase 0.2 — PR #917 open · Phase 1 Leg A — five read-only measurements receipted',
      nextStep: 'Fleet merges and deploys PRs #916 and #917; re-pin if covered bytes move, then complete Phase 1 Leg B. Tier 2 and issue #290 remain separate waits.',
      footprint: [
        { value: '45/58', label: 'tier-1 replacements merged in PR #65' },
        { value: '5', label: 'Phase 1 Leg A measurements receipted' },
        { value: '169', label: 'article alternates held by issue #290' }
      ],
      phaseStates: [
        { code: 'P0.2', name: 'Capture source authority', state: 'active', status: 'PR OPEN', detail: 'PR #917 carries the source capture; PR #916 carries E3 wiring. Fleet owns merge and deploy watch.' },
        { code: 'P1', name: 'Map the complete course tree', state: 'evidence', status: 'LEG A MEASURED', detail: 'Five read-only measurements are receipted locally. This is in-flight work, not Phase 1 closure while Phase 0.2 remains open.' }
      ]
    },
    {
      id: 'apush', label: 'AP US History', short: 'APUSH', color: 'oklch(48% 0.17 28)',
      status: 'Pre-runbook · CONTENT PRODUCTION', statusTone: 'blue', mapping: 'Runbook-canon lifecycle', observed: 'Aug 31 · 02:22Z',
      landed: 'Wave-3 article production — resumed serially · Positions 52 and 53 — articles_ready · Successor reconciliation — 11/11 PASS · Next-phase plan and baseline instruments — prepared',
      nextStep: 'Fleet proceeds serially from position 54. When the wave is quiet, the reconciled manifests authorize a gated seating PR; the acceptance ledger rebuild follows the wave. The publication runbook has not started.',
      footprint: [
        { value: '49/249', label: 'accepted ledger positions' },
        { value: '53', label: 'latest serial wave position terminal' },
        { value: '54', label: 'next fleet-side position' }
      ],
      phaseStates: [
        { code: 'PRE', name: 'Fleet content production', state: 'active', status: 'IN PROGRESS', detail: 'Positions 52 and 53 reached articles_ready and the fleet is running serially. Successor reconciliation passes 11/11 at current course-build origin/main. The next-phase plan, profile draft, Phase 2 pricing model, and Phase 1.3/3.4 baseline instruments are prepared; final values and owner-only fields remain pending.' }
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
      note: 'Phases 0-3 are closed on receipts. Phase 4 authority is resolved and the real-base build is deterministic; issue #919 holds the missing native-asset plan builder. Phase 5 is the next read-only capture. Phase 6 remains the first platform write and waits for a separate owner go.',
      rows: [
        { gate: 0, state: 'closed', status: 'Closed', signal: '6 pilot slots · 1 pass landed · 5 measured failures preserved', copy: 'The issue-44 writer was stopped and the residual retry was rescoped, closing the stabilization gate without hiding the five failures.', href: 'https://github.com/ilmych/humgeo-rebuild/issues/44#issuecomment-5365762989' },
        { gate: 1, state: 'closed', status: 'Closed', signal: '150 EKs · 70 LOs · 68 mappings · zero differences', copy: 'PR #62 merged the official-source authority and shared gate rule on canonical main. Issue #50 now carries the merged-SHA verifier receipt and no rework label.', href: 'https://github.com/ilmych/humgeo-rebuild/issues/50#issuecomment-5369982183' },
        { gate: 2, state: 'closed', status: 'Closed · amendment locked', signal: 'PR #66 merged · 655 checked · 70 stale · zero unknown', copy: 'Canonical main e16aebeb seals the omitted rehearsal lane. The manifest rebuilt byte-for-byte; 43 focused and 837 full-suite tests passed.', href: 'https://github.com/ilmych/humgeo-rebuild/pull/66' },
        { gate: 3, state: 'closed', status: 'Closed · SOURCE_ACCEPTED', signal: 'PR #67 merged · 70/70 accepted · zero residue', copy: 'Canonical verification reproduced exact source coverage and delivery SHA-256 37fb16a0133bb1e1390cb6ce9ada96a2e96cfd49a9c54020046437d9e9edc11b; focused, affected, and full repository gates passed.', href: 'https://github.com/ilmych/humgeo-rebuild/pull/67' },
        { gate: 4, state: 'closed', status: 'Closed · PROFILE_AND_SOURCE_BOUND', signal: 'PR #851 merged · exact Deploy · exact staging SHA', copy: 'Canonical reconstruction reproduced the profile, exhaustive Phase 0 capture, native bind, unchanged 5,870-coordinate oracle, and zero-write receipt byte-for-byte. Deploy 32799920454 and staging matched owner-merged AP One main.', href: 'https://github.com/InceptTrilogy/ap-one/pull/851' },
        { gate: 5, state: 'closed', status: 'Closed', signal: 'Phase 1 course tree receipted', copy: 'The Phase 1 mapping receipt is in hand; this row no longer reports the older open-census snapshot.', href: 'humgeo.html' },
        { gate: 6, state: 'closed', status: 'Done', signal: '3,633 served practice-key items measured', copy: 'The receipt measures 3,167 at 1 XP and 466 at 2 XP, plus a 403-item demo snapshot at 356/47. The demo tree has zero XP fields. Resource-level base XP remains unmeasured locally and binds in the Phase 4 plan.', href: 'claims.html#claim-humgeo.blueprint.audit' },
        { gate: 7, state: 'closed', status: 'Closed', signal: 'Assets + QTI + 3.6 validation + 3.7 preview closed', copy: 'Phase 3 is closed on its receipts. The 71 video-cue calls now belong to the Phase 4 owner decision, not unfinished Phase 3 credit.', href: 'https://github.com/InceptTrilogy/ap-one/pull/913' },
        { gate: 8, state: 'active', status: 'Phase 4 open', signal: 'Authority resolved · real-base build done · plan builder missing', copy: 'P4-1 and P4-2 are complete. The PR #918 correction is deployed and independently staging-verified at c1086cfc; issue #919 records the missing native-asset plan builder. Seventy-one video-cue content decisions remain before sealing.', href: 'https://github.com/InceptTrilogy/ap-one/issues/919' }
      ]
    },
    apwh: {
      title: 'APWH runbook-aligned sequence',
      note: 'APWH Phase 0.2 remains open in PR #917 with E3 wiring in PR #916. Phase 1 Leg A has five read-only measurements receipted locally; that is in-flight evidence, not Phase 1 closure while the Phase 0.2 PR remains open.',
      rows: [
        { gate: 4, code: 'PRE-0', name: 'Course profile required before Phase 0', label: 'Course profile', state: 'closed', status: 'Done', signal: 'Profile, consumer, authoring wave, and hash refresh landed', copy: 'PR #889 landed the reviewed, validator-consumed profile and consumer; PR #891 then landed the authoring wave and profile-hash refresh. This prerequisite does not enter Phase 0.', href: 'https://github.com/InceptTrilogy/ap-one/pull/891' },
        { gate: 3, code: 'PRE-0', name: 'Pre-runbook repair', label: 'Repair', state: 'evidence', status: 'Landed', signal: '45/58 broken gate items replaced', copy: 'The tier-1 round is landed. This is repair evidence, not later-phase credit.', href: 'https://github.com/ilmych/apwh-blueprint-build/pull/65' },
        { gate: 4, code: 'P0.2', name: 'Phase 0.2 — Capture source authority', label: 'Source capture', state: 'active', status: 'PR open', signal: 'PR #917 source capture · PR #916 E3 wiring', copy: 'Fleet owns both merges and deploy watch. Owner tier-2 authority for 1,003 items remains undecided; issue #290 holds 169 article alternates.', href: 'https://github.com/InceptTrilogy/ap-one/pull/917' },
        { gate: 5, code: 'P1', name: 'Phase 1 — Map the complete course tree', label: 'Course mapping', state: 'evidence', status: 'Leg A measured', signal: 'Five read-only measurements receipted', copy: 'Article-check policy, lesson order, inline practice, gate boundaries, and pinned assessment forms are measured. Leg B waits; no Phase 1 closure is claimed.', href: 'apwh.html' }
      ]
    },
    apush: {
      title: 'Existing work mapped to the runbook lifecycle',
      note: 'APUSH is entirely pre-runbook and still in fleet-side content production. Positions 52 and 53 reached articles_ready and the fleet is running serially. Successor reconciliation passes 11/11 and authorizes a gated seating PR when the wave is quiet. The runbook begins after the wave lands and the acceptance ledger rebuilds.',
      rows: [
        { gate: 1, state: 'evidence', status: 'Mapped evidence', signal: '249-position blueprint · 4 recorded deviations', copy: 'The design reconciliation belongs with scope lock, but it is preparation rather than a current implementation crosswalk.', href: 'claims.html' },
        { gate: 2, state: 'evidence', status: 'Mapped evidence', signal: '2,480 candidates · 249 ledger positions', copy: 'The candidate queue is complete, but candidate-budget completeness is not factory-QC or learner-readiness proof.', href: 'claims.html' },
        { gate: 3, state: 'evidence', status: 'Mapped evidence', signal: '49 accepted · 200 pending', copy: 'The exact current ledger separates accepted from pending positions without inflating the usable corpus.', href: 'claims.html' },
        { gate: 3, code: 'PRE', name: 'Fleet content production', label: 'Wave 3', state: 'active', status: 'In progress', signal: 'Positions 52 and 53 articles_ready · position 54 next', copy: 'The serial factory wave is moving again. The 249-position ledger remains 49 accepted and 200 pending until the wave finishes and the ledger rebuilds.', href: 'https://github.com/ilmych/apush-course-build/issues/9#issuecomment-5472793907' }
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

const NEEDS_KEYS = ['generated_ts', 'open', 'schema'];
const NEEDS_ITEM_KEYS = ['course', 'deadline', 'id', 'kind', 'title', 'ts'];
const NEEDS_COURSES = new Set(['humgeo', 'apwh', 'apush', 'psych', 'cross']);
const NEEDS_KINDS = new Set(['decision', 'approval', 'credential', 'scope', 'timing', 'other']);
const PRIVATE_TOKENS = ['/Users/', 'file://', '-----BEGIN', 'ghp_', 'github_pat_'];
const FRESHNESS_LIMIT_MS = 24 * 60 * 60 * 1000;

const sameKeys = (value, keys) => value && typeof value === 'object' && !Array.isArray(value) &&
  JSON.stringify(Object.keys(value).sort()) === JSON.stringify(keys);
const parsedTime = value => typeof value === 'string' ? Date.parse(value) : NaN;
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
      value.stages.some(stage => typeof stage?.automated !== 'boolean')) return null;
  return {
    automated: value.stages.filter(stage => stage.automated).length,
    total: value.stages.length,
    measured: parsedTime(value.generated_utc),
  };
};

const make = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
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
    row.append(make('span', 'needs-human-course', item.course));
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
  const title = make('strong', '', frontier ? `${frontier.automated} of ${frontier.total} process steps automated` : 'Automation frontier unavailable');
  const note = make('span', '', frontier ? `Requirements-only · measured ${ageLabel(frontier.measured, now)}` : 'process.json is missing or untyped');
  root.replaceChildren(title, note);
};

const renderCourseCards = (root, data, updates, now) => {
  const claims = Array.isArray(data?.claims) ? data.claims : [];
  const summary = globalThis.AP4_UPDATES?.summarizeCourse;
  const head = make('div', 'timeline-head');
  const intro = make('div');
  intro.append(make('span', 'badge b-blue', 'Current runbook state'), make('h2', '', 'All four courses'),
    make('p', 'timeline-sub', 'Current state, freshness, machine-readable next step, and measured rates. Open a course for receipts and full detail.'));
  head.append(intro, make('span', 'timeline-snapshot', `Dashboard snapshot · ${AP4_DASHBOARD.snapshot}`));
  const grid = make('div', 'course-card-grid');
  grid.setAttribute('aria-label', 'Current TimeBack state and next step by course');
  AP4_DASHBOARD.courses.forEach(course => {
    const claim = claims.find(row => row?.claim_id === `${course.id}.blueprint.audit`);
    const measured = parsedTime(claim?.observed_at || claim?.status_at);
    const limit = Number(claim?.freshness_limit_hours);
    const stale = !Number.isFinite(measured) || !Number.isFinite(limit) || measured > now + 5 * 60 * 1000 || now - measured > limit * 60 * 60 * 1000;
    const rates = typeof summary === 'function' ? summary(updates, course.id, now) : null;
    const card = make('a', `course-summary-card${stale ? ' is-stale' : ''}`);
    card.href = `${course.id}.html`;
    card.style.setProperty('--course-color', course.color);
    const headline = make('div', 'course-card-headline');
    const status = make('span', 'course-card-status', `${stale ? 'STALE · ' : ''}${course.status} · measured ${ageLabel(measured, now)}`);
    if (Number.isFinite(measured)) status.title = new Date(measured).toISOString();
    headline.append(status);
    card.append(headline, make('h3', '', course.label));
    const landed = make('p', 'course-card-landed');
    landed.append(make('strong', '', 'Landed: '), course.landed);
    const next = make('p', 'course-card-next');
    next.append(make('strong', '', 'Next: '), formatNextStep(claim?.next_step, course.nextStep));
    const tiles = make('div', 'rate-tiles');
    [
      [rates?.landings7d, 'landings · 7d'],
      [rates?.openHolds, 'open typed holds'],
      [rates?.gateDays, 'days in current gate'],
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
  const item = { id: 'a'.repeat(16), ts: '2026-08-31T02:00:00Z', course: 'humgeo', kind: 'decision', title: 'Choose the bounded option.', deadline: '' };
  const good = { schema: 'needs-human-public/v1', generated_ts: '2026-08-31T02:30:00Z', open: [item] };
  if (validateNeedsHuman(good, now).status !== 'ok') throw new Error('needs-human valid fixture failed');
  if (validateNeedsHuman(null, now).status !== 'hold') throw new Error('missing projection did not hold');
  if (validateNeedsHuman({ ...good, generated_ts: '2026-08-29T00:00:00Z' }, now).status !== 'hold') throw new Error('stale projection did not hold');
  if (validateNeedsHuman({ ...good, open: [{ ...item, title: 'x'.repeat(141) }] }, now).status !== 'hold') throw new Error('oversized title did not hold');
  if (validateNeedsHuman({ ...good, extra: true }, now).status !== 'hold') throw new Error('unexpected field did not hold');
  if (formatNextStep({ verb: 'resume', tool: 'factory-course-run', args: ['humgeo'], gate: 'the picker is runnable' }, 'fallback') === 'fallback') throw new Error('typed next step failed');
};

globalThis.AP4_BOARD = { ageLabel, formatNextStep, processFrontier, renderCourseCards, renderNeedsHuman, validateNeedsHuman };

(() => {
  const courses = AP4_DASHBOARD.courses;
  if (courses.length !== 4 || AP4_DASHBOARD.gates.length !== 14 || new Set(AP4_DASHBOARD.gates.map(gate => gate.id)).size !== 14 || courses.some(course => !course.phaseStates.length || course.phaseStates.some(phase => !phase.code || !phase.name || !phase.status))) {
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
  const needsRoot = document.getElementById('needs-human-strip');
  const frontierRoot = document.getElementById('automation-frontier');
  const load = async path => {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) throw new Error(`${path} unavailable`);
    return response.json();
  };
  Promise.allSettled([load('needs-human.json'), load('data.json'), load('process.json'), load('updates.json')]).then(results => {
    const now = Date.now();
    if (needsRoot) renderNeedsHuman(needsRoot, validateNeedsHuman(results[0].status === 'fulfilled' ? results[0].value : null, now), now);
    if (frontierRoot) renderFrontier(frontierRoot, results[2].status === 'fulfilled' ? results[2].value : null, now);
    renderCourseCards(root, results[1].status === 'fulfilled' ? results[1].value : null,
      results[3].status === 'fulfilled' && Array.isArray(results[3].value) ? results[3].value : [], now);
  });
})();
