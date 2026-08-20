/*
CLAUDE UPDATE CONTRACT — routine timeline updates happen ONLY in AP4_TIMELINE below.

1. Verify current state from updates.json + data.json and each course page's current
   "Definition of done" before editing. Do not copy an old dashboard number forward.
2. Update snapshot, then each course's x/y, stage, lastCompleted, summary, next,
   etaDays, and etaNote. x is the horizontal position from 0–100; y staggers
   labels when multiple courses share a recovery locus.
3. etaDays must be a number-of-days range, never a calendar date. ETA notes must name
   what the range includes and excludes. Keep unmeasured/fleet-paced work explicit.
4. Never move a course to Release without canonical served-version readback and a dated
   learner walk. Registration, merge, or deploy alone is not release proof.

No index.html or style.css edit is needed for ordinary course-status updates.
*/
const AP4_TIMELINE = {
  snapshot: 'Aug 20, 2026 · 13:30 KST evidence reconciliation',
  courses: [
    {
      id: 'apush',
      label: 'AP US History',
      short: 'APUSH',
      color: '#c2413a',
      x: 24,
      y: 80,
      stage: 'Current recovery locus · Build current bytes',
      lastCompleted: 'Canonical ledger verified · 38 accepted / 211 pending',
      summary: 'The canonical outputs ledger contains 38 accepted positions: 36 legacy dual-review and 2 server-strict. Eleven additional successor records have receipts but are not committed admissions, so bare 49-of-249 is not an honest canonical count. Josh ruled the 36 keep the legacy label with no funded re-earn.',
      next: 'Fleet routes the 11 receipted successors into the canonical ledger, lands the image/wave contract, and merges seating PR #6; then rerun the implementation-to-blueprint crosswalk.',
      etaDays: '1–2 days',
      etaNote: 'Work estimate, not a release promise. Covers residual local verification only. Admissions, seating, registration, and serving are fleet-gated and carry no date.'
    },
    {
      id: 'psych',
      label: 'AP Psychology',
      short: 'Psych',
      color: '#7c3aed',
      x: 24,
      y: 160,
      stage: 'Current recovery locus · Build current bytes',
      lastCompleted: 'Lambda repaired via their script · walk honestly refused',
      summary: 'The current course repo has 221 EK articles and 221 passing QC sidecars: 204 use fully covered sources and 17 use partial-coverage sources. The 17 partial labels are not failures; the nonblocking article tail is three self-findings. Separately, the factory walk refuses correctly because 374 of 1,105 bank buckets are underfilled and the lesson-evidence sweep has not run.',
      next: 'Confirm one skill tag and trim two soft-cap overruns; the factory resolves provenance and scope through issue #14 before any top-up, then the course needs the named psychology-specialist disposition.',
      etaDays: 'fleet-gated',
      etaNote: 'No date while the contract conflict stands — the clearing event belongs to the fleet (issue #14 / Unit-5). The Lambda repair and walk receipts are done and keep their value regardless.'
    },
    {
      id: 'apwh',
      label: 'AP World History',
      short: 'APWH',
      color: '#4f46b8',
      x: 37,
      y: 120,
      stage: 'Current recovery locus · Reconcile and accept current bytes',
      lastCompleted: 'Attempt 1 rejected · attempt 2 active, outcome pending',
      summary: 'The latest completed fleet readback on issue #48 is REWORK. Acceptance was invoked without the required evidence envelope, so the reported 9-of-31 clear gates are an invocation artifact rather than a current-bank verdict. The current 933-item bank is adcc641; fleet attempt 2 was claimed at 04:13Z, with its outcome still pending.',
      next: 'Generate the evidence envelope for adcc641 and rerun the bar. Separately rerun the blueprint oracle against a readable exact current course directory; its A-197 result is unmeasured until course_dir_readable is true.',
      etaDays: 'fleet-gated',
      etaNote: 'No date until the current-bank evidence envelope is valid, genuine acceptance residue clears, and the missing Ilma-audit and named human-SME dispositions are receipted. The bank and local handoff are complete.'
    },
    {
      id: 'humgeo',
      label: 'AP Human Geography',
      short: 'HumGeo',
      color: '#2558d8',
      x: 37,
      y: 200,
      stage: 'Current recovery locus · Reconcile and accept current bytes',
      lastCompleted: '429/455 re-earned · both commits pushed',
      summary: 'PR #43 carries 429 current-byte passes and intake #95 owns the 332-row regeneration ask. The declared store still measures 2,505 of 2,513 items without fingerprint-matched QC receipts and 789 structural failures until landing. Served composition is independently red: 69 of 204 forms conform to 4/8/3, leaving 135 failures.',
      next: 'Merge/read back PR #43 and rerun coverage; advance #95 for regeneration; attach the 135-of-204 served-composition failure to existing cutover thread #659 before drafting any new filing.',
      etaDays: 'fleet-gated',
      etaNote: 'PR #43, intake #95, #659 composition repair, regeneration, and release remain fleet-paced, so no release date is claimed.'
    }
  ]
};

(() => {
  document.querySelectorAll('[data-course-eta]').forEach(section => {
    const course = AP4_TIMELINE.courses.find(item => item.id === section.dataset.courseEta);
    if (!course) return;
    section.querySelector('[data-course-eta-days]').textContent = course.etaDays;
    section.querySelector('[data-course-eta-note]').textContent = course.etaNote;
  });

  const root = document.getElementById('course-release-timeline');
  if (!root) return;

  const stages = [
    {
      id: 'blueprint', point: '1', label: 'Bind blueprint', kicker: 'Evidence gate 1', title: 'Bind the exact working blueprint',
      copy: 'Pin the course lane to an exact blueprint ref and hash, including course-specific v1 scope, deferred-v2 scope, and completion blockers.',
      foot: 'A lane-bound copy is working authority for the build; it is not proof that no newer owner-sanctioned blueprint exists.'
    },
    {
      id: 'build', point: '2', label: 'Build current bytes', kicker: 'Evidence gate 2', title: 'Build the course against the blueprint',
      copy: 'Use sanctioned factory routes to produce the course artifacts required by that blueprint. Prepared plans and design locks do not count as implementation.',
      foot: 'Exit evidence · current artifact census and provenance mapped to every required blueprint dimension.'
    },
    {
      id: 'reconcile', point: '3', label: 'Reconcile + accept', kicker: 'Evidence gate 3', title: 'Reconcile and accept the current bytes',
      copy: 'Run the course oracle or dimension-by-dimension crosswalk against the exact candidate revision, then clear the course-specific QC and validation gates.',
      foot: 'A historical or base-branch receipt does not clear a newer candidate. Documented deviations stay visible.'
    },
    {
      id: 'human-review', point: 'H', label: 'Human disposition', kicker: 'Required evidence · sequence authority unresolved', title: 'Obtain every required named human disposition',
      copy: 'Record the named human reviewer, dated scope, findings, revisions, and final disposition required by the course blueprint or factory contract.',
      foot: 'Persona and model reviews are not human clearance. The current factory-blessed ordering of whole-course LS review is not pinned, so this dashboard does not invent it.'
    },
    {
      id: 'delivery', point: '4', label: 'Bind + deliver', kicker: 'Evidence gate 4', title: 'Bind and execute course-owned delivery',
      copy: 'Bind the exact accepted bytes to the sanctioned TimeBack and AP One route, with course-owned IDs, authorization, manifest, checkpointing, readback, and recovery.',
      foot: 'Shared APIs and publisher code are mechanisms, not transferable course authority or proof.'
    },
    {
      id: 'served', point: '5', label: 'Serve + read back', kicker: 'Evidence gate 5', title: 'Prove the served course',
      copy: 'Read back exact stored and learner-served versions, registration, chooser visibility, and the required lesson, practice, gate, scoring, and failure paths.',
      foot: 'A merge, publish call, deployment, or course registration alone is not served-course proof.'
    },
    {
      id: 'release', point: 'Release', label: 'Release', kicker: 'Outcome gate', title: 'Release',
      copy: 'The course is learner-visible and its exact deployed bytes pass a dated signed-in end-to-end walk. Registration, publication, or deployment alone does not count.',
      foot: 'Exit evidence · chooser visibility, lesson/practice/gate/scoring checks, no answer-key exposure, and identity/progress readback when those outcomes are claimed.'
    }
  ];

  root.innerHTML = `
    <div class="timeline-head">
      <div>
        <h2>Where each course sits on the path to release</h2>
        <p class="timeline-sub">Evidence gates for the honest audit—not a claimed factory phase order. Course markers show the current recovery locus, not proof that every earlier gate cleared. Hover, focus, or tap for evidence and remaining work.</p>
      </div>
      <span class="timeline-snapshot">Verified snapshot · ${AP4_TIMELINE.snapshot}</span>
    </div>
    <div class="timeline-canvas" aria-label="Blueprint audit evidence gates and current recovery locus for four courses">
      <div class="timeline-rail" aria-hidden="true"></div>
      <div class="timeline-stages">
        ${stages.map(stage => `
          <button class="timeline-stage${stage.id === 'human-review' ? ' timeline-stage-review' : ''}" type="button" data-timeline-item="${stage.id}" aria-pressed="${stage.id === 'release'}">
            <span class="timeline-stage-point">${stage.point}</span>
            <span class="timeline-stage-label"${stage.id === 'release' ? ' aria-hidden="true"' : ''}>${stage.label}</span>
          </button>`).join('')}
      </div>
      ${AP4_TIMELINE.courses.map(course => `
        <button class="timeline-course" type="button" data-timeline-item="${course.id}" aria-pressed="false"
          style="--timeline-course-x:${course.x}%;--timeline-course-y:${course.y}px;--timeline-course-color:${course.color}">
          <span class="timeline-course-long">${course.label}</span><span class="timeline-course-short">${course.short}</span>
        </button>`).join('')}
    </div>
    <div class="timeline-detail" aria-live="polite">
      <div>
        <p class="timeline-detail-kicker"></p>
        <p class="timeline-detail-title"></p>
      </div>
      <div>
        <p class="timeline-eta" hidden><span>Estimated recovery work</span><strong></strong></p>
        <p class="timeline-detail-copy"></p>
        <p class="timeline-detail-move" hidden><span>What moves it forward</span><strong></strong></p>
        <p class="timeline-detail-foot"></p>
        <a class="timeline-detail-link" hidden>Open course dashboard →</a>
      </div>
    </div>`;

  const details = Object.fromEntries([
    ...stages.map(stage => [stage.id, stage]),
    ...AP4_TIMELINE.courses.map(course => [course.id, {
      kicker: `${course.label} · ${course.stage}`,
      title: course.lastCompleted,
      copy: course.summary,
      move: course.next,
      foot: course.etaNote,
      eta: course.etaDays,
      color: course.color,
      href: `${course.id}.html`
    }])
  ]);
  const controls = [...root.querySelectorAll('[data-timeline-item]')];
  const kicker = root.querySelector('.timeline-detail-kicker');
  const title = root.querySelector('.timeline-detail-title');
  const copy = root.querySelector('.timeline-detail-copy');
  const move = root.querySelector('.timeline-detail-move');
  const moveValue = move.querySelector('strong');
  const foot = root.querySelector('.timeline-detail-foot');
  const eta = root.querySelector('.timeline-eta');
  const etaValue = eta.querySelector('strong');
  const detailLink = root.querySelector('.timeline-detail-link');
  let locked = 'release';

  function show(key, persist = false) {
    const item = details[key];
    if (!item) return;
    kicker.textContent = item.kicker;
    kicker.style.color = item.color || '';
    title.textContent = item.title;
    copy.textContent = item.copy;
    move.hidden = !item.move;
    moveValue.textContent = item.move || '';
    foot.textContent = item.foot;
    eta.hidden = !item.eta;
    etaValue.textContent = item.eta || '';
    detailLink.hidden = !item.href;
    detailLink.href = item.href || '';
    if (persist) {
      locked = key;
      controls.forEach(control => control.setAttribute('aria-pressed', String(control.dataset.timelineItem === key)));
    }
  }

  controls.forEach(control => {
    const key = control.dataset.timelineItem;
    control.addEventListener('pointerenter', () => show(key));
    control.addEventListener('focus', () => show(key));
    control.addEventListener('click', () => show(key, true));
  });

  if (controls.length !== stages.length + AP4_TIMELINE.courses.length ||
      AP4_TIMELINE.courses.some(course =>
        !(/^\d+[–-]\d+ days$/.test(course.etaDays) || course.etaDays === 'fleet-gated') ||
        !course.etaNote || !course.next)) {
    throw new Error('Course release timeline data is incomplete.');
  }
  show(locked, true);
})();
