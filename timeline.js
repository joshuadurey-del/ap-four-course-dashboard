/*
CLAUDE UPDATE CONTRACT — routine timeline updates happen ONLY in AP4_TIMELINE below.

1. Verify current state from updates.json + data.json and each course page's current
   "Definition of done" before editing. Do not copy an old dashboard number forward.
2. Update snapshot, then each course's x/y, stage, lastCompleted, summary, next,
   etaDays, and etaNote. x is the horizontal position from 0–100; y is 100 or 150
   to stagger labels.
3. etaDays must be a number-of-days range, never a calendar date. ETA notes must name
   what the range includes and excludes. Keep unmeasured/fleet-paced work explicit.
4. Never move a course to Release without canonical served-version readback and a dated
   learner walk. Registration, merge, or deploy alone is not release proof.

No index.html or style.css edit is needed for ordinary course-status updates.
*/
const AP4_TIMELINE = {
  snapshot: 'Aug 20, 2026 · 12:10 KST factory-phase audit',
  courses: [
    {
      id: 'apush',
      label: 'AP US History',
      short: 'APUSH',
      color: '#c2413a',
      x: 19,
      y: 100,
      stage: 'Phase 2 · Articles per concept',
      lastCompleted: 'Fleet fix merged · remint verified 36/36 + 18/18',
      summary: 'The committed builder re-derived the 49-of-249 ledger byte-exact in a scratch checkout (exit 0), so the count is now builder-receipted. The factory mode split is mandatory wherever it appears: 36 legacy dual-review plus 13 server-strict, of which 11 are successor admissions with a named reviewer. Josh ruled the 36 keep the honest legacy label with no funded re-earn. The 17 hand-rolled P10 scripts are quarantined read-only and the ledger re-derives without them.',
      next: 'Fleet lands the image/wave contract and merges seating PR #6; then the staged seating checks can run. New admissions remain held.',
      etaDays: '1–2 days',
      etaNote: 'Work estimate, not a release promise. Covers residual local verification only. Admissions, seating, registration, and serving are fleet-gated and carry no date.'
    },
    {
      id: 'psych',
      label: 'AP Psychology',
      short: 'Psych',
      color: '#7c3aed',
      x: 24,
      y: 150,
      stage: 'Phases 2–3 · Articles and questions',
      lastCompleted: 'Lambda repaired via their script · walk honestly refused',
      summary: 'Today settled Psych into a fully measured state. The nine dispatched jobs finished 2 completed, 7 failed (their render gate; the last failure was genuine, pre-deadline). The deployed top-up Lambda was proven 3.5 months stale with no job cap, then repaired on the owner\'s word using the factory\'s own setup script — deployed now byte-matches committed, cap of 4 restored, schedule off, nothing dispatched. The factory w7 walk chain ran and refused at its own preflight: the course is not chooser-ready (bank 374 short, lesson-evidence sweep never run), which is the walk working, not failing. An 8-gate registration map with owners is on file.',
      next: 'The factory resolves provenance and scope through course issue #14, or supplies a committed scope-excluding route; then bank completion and the free readiness re-walk can resume.',
      etaDays: 'fleet-gated',
      etaNote: 'No date while the contract conflict stands — the clearing event belongs to the fleet (issue #14 / Unit-5). The Lambda repair and walk receipts are done and keep their value regardless.'
    },
    {
      id: 'apwh',
      label: 'AP World History',
      short: 'APWH',
      color: '#4f46b8',
      x: 65,
      y: 100,
      stage: 'Phase 6 complete · Phase 7 held',
      lastCompleted: 'Two repaired-bank legs ran · acceptance still failed closed',
      summary: 'Two fresh model-backed legs ran against the same repaired 933-item bank at 243b340 with complete, equal identity sets. Leg A reported 3 failed items and leg B reported 9; the comparator retained 8 stable ordering findings and 6 item/check disagreements. Both-run pass is false and two-run agreement is FAIL, so PR #9 remains open and unmerged.',
      next: 'The fleet adjudicates or repairs the 8 stable ordering findings, strengthens the 6 unstable item-verdict paths, then reruns two independent empty-cache legs until both pass and agree exactly.',
      etaDays: 'fleet-gated',
      etaNote: 'No date until two fresh post-repair Faultless Bar legs pass and agree exactly. The bank and our local handoff are complete.'
    },
    {
      id: 'humgeo',
      label: 'AP Human Geography',
      short: 'HumGeo',
      color: '#2558d8',
      x: 60,
      y: 150,
      stage: 'Phase 6 · SME/persona review + fixes',
      lastCompleted: '429/455 re-earned · both commits pushed',
      summary: 'The two campaign legs re-earned 429 of 455 records through the factory judge: 351 plus 78 fresh fingerprint-bound passes. The remaining measured dispositions are 8 content fails, 17 unmeasured, and 1 unresolved rationale. Both commits are pushed at 43584a54; the outgoing 429 records passed the #642 signature scan with zero flags and the diff contains only intended record files.',
      next: 'PR #43 merges and reads back, the companion filing lands, and the factory supplies the missing regeneration selector and authority.',
      etaDays: 'fleet-gated',
      etaNote: 'PR #43 is open; its merge, the companion filing, regeneration, #92 adjudication, and release remain fleet-paced, so no release date is claimed.'
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
      id: 'phase-1', point: '1', label: 'CED → validated KG + videos', kicker: 'Factory phase 1 of 7', title: 'CED → validated KG + per-concept videos',
      copy: 'Build and validate the CED-aligned knowledge graph. Start one AlphaTok video per KG concept in parallel.',
      foot: 'Gate · validated KG and blueprint reconciliation; videos are KG-driven, not deferred to the end.'
    },
    {
      id: 'phase-2', point: '2', label: 'Articles per concept', kicker: 'Factory phase 2 of 7', title: 'Articles per concept',
      copy: 'Build an article for each concept, grounded in secondary sources.',
      foot: 'Gate · Content QC passes against the article golden standard.'
    },
    {
      id: 'phase-3', point: '3', label: 'Questions per CED type', kicker: 'Factory phase 3 of 7', title: 'Questions per CED type + point structure',
      copy: 'Build questions for each required CED type and point structure through the UQG.',
      foot: 'Gate · Content QC passes for MCQs and FRQs against their golden standards.'
    },
    {
      id: 'phase-4', point: '4', label: 'Video wiring', kicker: 'Factory phase 4 of 7', title: 'Video wiring',
      copy: 'Wire the per-concept videos into the course ledger.',
      foot: 'Gate · the video map resolves against the accepted course structure.'
    },
    {
      id: 'phase-5', point: '5', label: 'Difficulty + metadata tagging', kicker: 'Factory phase 5 of 7', title: 'Difficulty + metadata tagging',
      copy: 'Apply honest difficulty and required metadata using the canonical allowlist, not College Board tags.',
      foot: 'Gate · real per-unit difficulty spread, PP100 pools, and the structure/distribution checks pass.'
    },
    {
      id: 'phase-6', point: '6', label: 'SME/persona review + fixes', kicker: 'Factory phase 6 of 7', title: 'SME/persona review + fixes',
      copy: 'Run the factory learning-science personas, fix root causes, and rerun the applicable QC gates.',
      foot: 'Factory meaning · persona review, not real human SME or Learning Science clearance.'
    },
    {
      id: 'phase-7', point: '7', label: 'Publish/wire into AP One', kicker: 'Factory phase 7 of 7', title: 'Publish/wire into AP One',
      copy: 'Publish the course-owned accepted bytes and wire them into AP One through the authorized course-bound delivery path.',
      foot: 'Gate · exact stored-object readback, learner-surface wiring, registration, deployment, and recovery receipt.'
    },
    {
      id: 'internal-review', point: 'LS', label: 'Human LS review', kicker: 'Post-Phase-7 gate · QC Layer 4', title: 'Human Learning Science review',
      copy: 'Specialist queueing and component sampling may begin earlier. The course-level gate clears only after a human learning-science or subject-matter reviewer works the current reviewable served course, including failure paths; findings reopen the relevant production work.',
      foot: 'Exit evidence · named human reviewer, dated course-level scope and disposition, revision/readback receipts, and no partial, persona, or model review presented as whole-course human clearance.'
    },
    {
      id: 'release', point: 'Release', label: 'Release', kicker: 'Separate outcome gate', title: 'Release',
      copy: 'The course is learner-visible and its exact deployed bytes pass a dated signed-in end-to-end walk. Registration, publication, or deployment alone does not count.',
      foot: 'Exit evidence · chooser visibility, lesson/practice/gate/scoring checks, no answer-key exposure, and identity/progress readback when those outcomes are claimed.'
    }
  ];

  root.innerHTML = `
    <div class="timeline-head">
      <div>
        <h2>Where each course sits on the path to release</h2>
        <p class="timeline-sub">The factory's seven phases, then separate human Learning Science review and Release gates. Hover, focus, or tap any point for evidence and remaining work.</p>
      </div>
      <span class="timeline-snapshot">Verified snapshot · ${AP4_TIMELINE.snapshot}</span>
    </div>
    <div class="timeline-canvas" aria-label="Seven factory phases plus separate human Learning Science review and release gates with four course positions">
      <div class="timeline-rail" aria-hidden="true"></div>
      <div class="timeline-stages">
        ${stages.map(stage => `
          <button class="timeline-stage${stage.id === 'internal-review' ? ' timeline-stage-review' : ''}" type="button" data-timeline-item="${stage.id}" aria-pressed="${stage.id === 'release'}">
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
