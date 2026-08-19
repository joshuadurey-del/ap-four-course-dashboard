/*
CLAUDE UPDATE CONTRACT — routine timeline updates happen ONLY in AP4_TIMELINE below.

1. Verify current state from updates.json + data.json and each course page's current
   "Definition of done" before editing. Do not copy an old dashboard number forward.
2. Update snapshot, then each course's x/y, stage, lastCompleted, summary, next,
   etaDays, and etaNote. x is the horizontal position from 0–100; y is 88 or 134
   to stagger labels.
3. etaDays must be a number-of-days range, never a calendar date. ETA notes must name
   what the range includes and excludes. Keep unmeasured/fleet-paced work explicit.
4. Never move a course to Release without canonical served-version readback and a dated
   learner walk. Registration, merge, or deploy alone is not release proof.

No index.html or style.css edit is needed for ordinary course-status updates.
*/
const AP4_TIMELINE = {
  snapshot: 'Aug 19, 2026 pm · orchestrated recovery run',
  courses: [
    {
      id: 'apush',
      label: 'AP US History',
      short: 'APUSH',
      color: '#c2413a',
      x: 30,
      y: 88,
      stage: 'Build content',
      lastCompleted: 'Ledger re-verified · 49/249 builder-receipted',
      summary: 'The committed builder re-derived the 49-of-249 ledger byte-exact in a scratch checkout (exit 0), so the count is now builder-receipted. The factory mode split is mandatory wherever it appears: 36 legacy dual-review plus 13 server-strict, of which 11 are successor admissions with a named reviewer. Josh ruled the 36 keep the honest legacy label with no funded re-earn. The 17 hand-rolled P10 scripts are quarantined read-only and the ledger re-derives without them.',
      next: 'Next · watch intake #90 (walls 64 held posts and 124 positions, zero fleet replies), intake #89 (our 48-hour ping posted 2026-08-19), and seating PR #6 (owner-lane merge). No paid APUSH packet is sanctioned.',
      etaDays: '1–2 days',
      etaNote: 'Work estimate, not a release promise. Covers residual local verification only. Admissions, seating, registration, and serving are fleet-gated and carry no date.'
    },
    {
      id: 'psych',
      label: 'AP Psychology',
      short: 'Psych',
      color: '#7c3aed',
      x: 39,
      y: 134,
      stage: 'Build content',
      lastCompleted: 'Factory top-up run · load-guarded at zero',
      summary: 'The committed factory top-up Lambda is confirmed as the only sanctioned client and was invoked today: a dry run, then one bounded real run capped at 4 jobs. The live scan confirms 374 of 1,105 buckets underfilled. The factory worker reserve deferred dispatch to zero because fleet jobs occupy the pool right now. Local drivers are purged, including the day-20260811 twins, and the provenance ask is filed as course issue #14.',
      next: 'Next · retry the bounded top-up when the factory pool frees, verify through CloudWatch plus a dry-run re-scan, and watch issue #14 and the U5 findings (fleet-owned). Registration stays parked.',
      etaDays: '2–4 days',
      etaNote: 'Work estimate, not a release promise. The owner relay cleared 2026-08-19 so the clock is running; the range covers pool retries, top-up hours, and local snapshot work. U5 repair and registration are fleet-gated and excluded.'
    },
    {
      id: 'apwh',
      label: 'AP World History',
      short: 'APWH',
      color: '#4f46b8',
      x: 52,
      y: 88,
      stage: 'Validate',
      lastCompleted: 'Fleet ruled #591 · PR #791 closed unmerged',
      summary: 'The fleet ruled native governed placement authoritative on issue #591 and closed PR #791 unmerged itself (2026-08-19T06:35Z, verified live); nothing further is needed from our lane on that thread. The 933-item population reconciles exactly (506 banked, 369 candidates, 58 disposition rows). The honest pre-sweep state stands: 933 items without current receipts and 427 structural fails. Which acceptance instrument judges the recovered cohort is a fleet choice. Our purge rows are quarantined and the stale local-done mark is retired.',
      next: 'Next · watch the native-publish chain on #591 (the intake autopilot is actively working it) and the acceptance-instrument answer. Josh retracted the fleet ask, so the open question stays recorded, not filed. Nothing is runnable from our side today.',
      etaDays: '2–4 days',
      etaNote: 'Entirely fleet-paced: publisher bootstrap (#2727), native placement, and the acceptance instrument belong to the fleet. The range is a watch window, not our work estimate.'
    },
    {
      id: 'humgeo',
      label: 'AP Human Geography',
      short: 'HumGeo',
      color: '#2558d8',
      x: 58,
      y: 134,
      stage: 'Validate',
      lastCompleted: 'Honest re-earn measured · 0 of 374 bankable',
      summary: 'A clean worktree at origin/main measured the 374-slot re-earn honestly: 373 records fail two fatal structural checks at once (S2 plus D1), which the factory repair engine refuses by rule, so they route to the regeneration cohort. The one repairable record (D4-only) is blocked on an invalid Anthropic key. A known-good wave candidate passes the same battery fresh, so the judge is healthy and the failures are real. Paying for the 741 re-earn would buy failures; regeneration is the honest route. The Aug-12 uncommitted set (classified: metadata-only) is preserved on a pushed branch and the i7 branch is verified clean.',
      next: 'Next · fold the 373 into the regeneration cohort re-derivation (the filing stays parked pending three unresolved rows and Josh text), rotate the Anthropic key to finish the single repair, and watch #92 plus the release predicates (#659).',
      etaDays: '2–4 days',
      etaNote: 'Work estimate, not a release promise. Covers the key-gated single repair and the regen-cohort re-derivation. The regeneration wave itself, #92 adjudication, and release predicates are owner- or fleet-gated and excluded.'
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
      id: 'stage-1', point: '1', label: 'Define course', kicker: 'Point 1 of 5', title: 'Define the course',
      copy: 'Bind the CED, blueprint, knowledge graph, units, topics, skills, assessment types, and the bank-first gap map.',
      foot: 'Exit evidence · validated blueprint, logged deviations, and a receipted inventory of what already exists.'
    },
    {
      id: 'stage-2', point: '2', label: 'Build content', kicker: 'Point 2 of 5', title: 'Build the missing content',
      copy: 'Generate only real gaps: articles, questions, FRQs, visuals, practice, mastery gates, and their metadata through the factory.',
      foot: 'Exit evidence · accepted factory outputs with source, retry, deduplication, and grounding receipts.'
    },
    {
      id: 'stage-3', point: '3', label: 'Validate', kicker: 'Point 3 of 5', title: 'Validate and accept',
      copy: 'Run structural checks, official /v1/qc, course oracles, grading checks, image review, and repair-or-rebuild loops.',
      foot: 'Exit evidence · current-byte fingerprints, saved verdicts, and no unmeasured dimension presented as passed.'
    },
    {
      id: 'stage-4', point: '4', label: 'Place course', kicker: 'Point 4 of 5', title: 'Place the canonical course',
      copy: 'Assemble the final bank and bundle, publish through the sanctioned TimeBack/AP One path, and read back exact stored versions.',
      foot: 'Exit evidence · governed manifest, deploy receipt, canonical version readback, and course registration.'
    },
    {
      id: 'release', point: 'Release', label: 'Release', kicker: 'Final point', title: 'Release',
      copy: 'The course is learner-visible and its exact deployed bytes pass a dated end-to-end walk. Registration or deployment alone does not count.',
      foot: 'Exit evidence · chooser visibility, lesson/practice/gate/scoring checks, and no answer-key exposure.'
    }
  ];

  root.innerHTML = `
    <div class="timeline-head">
      <div>
        <h2>Where each course sits on the path to release</h2>
        <p class="timeline-sub">One shared process. Hover, focus, or tap any point for evidence and remaining work. Ranges count recovery work after the named unblock, not time to release.</p>
      </div>
      <span class="timeline-snapshot">Verified snapshot · ${AP4_TIMELINE.snapshot}</span>
    </div>
    <div class="timeline-canvas" aria-label="Five-point course creation timeline with four course positions">
      <div class="timeline-rail" aria-hidden="true"></div>
      <div class="timeline-stages">
        ${stages.map(stage => `
          <button class="timeline-stage" type="button" data-timeline-item="${stage.id}" aria-pressed="${stage.id === 'release'}">
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
      foot: `${course.next} ${course.etaNote}`,
      eta: course.etaDays,
      color: course.color,
      href: `${course.id}.html`
    }])
  ]);
  const controls = [...root.querySelectorAll('[data-timeline-item]')];
  const kicker = root.querySelector('.timeline-detail-kicker');
  const title = root.querySelector('.timeline-detail-title');
  const copy = root.querySelector('.timeline-detail-copy');
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
      AP4_TIMELINE.courses.some(course => !/^\d+[–-]\d+ days$/.test(course.etaDays) || !course.etaNote)) {
    throw new Error('Course release timeline data is incomplete.');
  }
  show(locked, true);
})();
