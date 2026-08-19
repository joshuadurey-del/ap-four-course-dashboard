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
  snapshot: 'Aug 19, 2026 late evening · live re-earn batch + filings posted',
  courses: [
    {
      id: 'apush',
      label: 'AP US History',
      short: 'APUSH',
      color: '#c2413a',
      x: 30,
      y: 88,
      stage: 'Build content',
      lastCompleted: 'Fleet fix merged · remint verified 36/36 + 18/18',
      summary: 'The committed builder re-derived the 49-of-249 ledger byte-exact in a scratch checkout (exit 0), so the count is now builder-receipted. The factory mode split is mandatory wherever it appears: 36 legacy dual-review plus 13 server-strict, of which 11 are successor admissions with a named reviewer. Josh ruled the 36 keep the honest legacy label with no funded re-earn. The 17 hand-rolled P10 scripts are quarantined read-only and the ledger re-derives without them.',
      next: 'Next · fleet merged PR #8 (their fix for our two filed defect classes) and we verified it offline: their own validator passes unit 7 at 36/36 and unit 9 at 18/18 from post-merge main, and the two defective positions read clean. Seating is proven ready — the blessed reconciler dry-ran all 11 admitted positions at PR #6 head — and the seating runbook is staged to execute the moment the fleet merges PR #6 (queue check only, per the standing factory-tooling go). The review-silence ping was killed by the owner as unnecessary. No paid APUSH packet is sanctioned.',
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
      lastCompleted: 'Lambda repaired via their script · walk honestly refused',
      summary: 'Today settled Psych into a fully measured state. The nine dispatched jobs finished 2 completed, 7 failed (their render gate; the last failure was genuine, pre-deadline). The deployed top-up Lambda was proven 3.5 months stale with no job cap, then repaired on the owner\'s word using the factory\'s own setup script — deployed now byte-matches committed, cap of 4 restored, schedule off, nothing dispatched. The factory w7 walk chain ran and refused at its own preflight: the course is not chooser-ready (bank 374 short, lesson-evidence sweep never run), which is the walk working, not failing. An 8-gate registration map with owners is on file.',
      next: 'Next · top-up dispatch is HELD as a recorded contract conflict: the lifecycle requires sealed blueprint scope first, and the top-up request carries no bucket-level exclusion (subjects and item types only), so a capped run cannot avoid Unit-5 or provenance-uncertain cells. It clears only when the factory answers the provenance/denominator question (course issue #14 / PS-004) or ships a scope-excluding route. Free re-walk fires when readiness turns. No spend until then.',
      etaDays: 'fleet-gated',
      etaNote: 'No date while the contract conflict stands — the clearing event belongs to the fleet (issue #14 / Unit-5). The Lambda repair and walk receipts are done and keep their value regardless.'
    },
    {
      id: 'apwh',
      label: 'AP World History',
      short: 'APWH',
      color: '#4f46b8',
      x: 52,
      y: 88,
      stage: 'Validate',
      lastCompleted: 'Fleet answered #93 · Faultless Bar named, bank-first order',
      summary: 'The fleet ruled native governed placement authoritative on issue #591 and closed PR #791 unmerged itself (2026-08-19T06:35Z, verified live); nothing further is needed from our lane on that thread. The 933-item population reconciles exactly (506 banked, 369 candidates, 58 disposition rows). The honest pre-sweep state stands: 933 items without current receipts and 427 structural fails. Which acceptance instrument judges the recovered cohort is a fleet choice. Our purge rows are quarantined and the stale local-done mark is retired.',
      next: 'Next · the fleet ANSWERED #93 within the hour (their lane issue #48, live-verified): the Faultless Bar course-QC job is the named acceptance instrument — the standalone per-item route is retracted as a category error — and the order is bank the sha-pinned 933 through the existing single-writer process first, then run the bar over the banked course with machine-readable proof that all 933 identities were judged. Their side owes first: push the course_qc implementation to a reproducible ref, document the one committed invocation, add a fail-closed fixture. Our next packet arms when the sanctioned single-writer apply is named in committed terms — nothing banks before that. #94 (gate blind spot) and #591 stay watched.',
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
      lastCompleted: 'Single repair re-earned · pass held for the wave',
      summary: 'A clean worktree at origin/main measured the 374-slot re-earn honestly: 373 records fail two fatal structural checks at once (S2 plus D1), which the factory repair engine refuses by rule, so they route to the regeneration cohort. The one repairable record (D4-only) is blocked on an invalid Anthropic key. A known-good wave candidate passes the same battery fresh, so the judge is healthy and the failures are real. Paying for the 741 re-earn would buy failures; regeneration is the honest route. The Aug-12 uncommitted set (classified: metadata-only) is preserved on a pushed branch and the i7 branch is verified clean.',
      next: 'Next · the key is rotated and the one repairable item now carries a fresh factory pass; per the owner shape-call it is HELD locally and re-enters with the consolidated regeneration landing, never a one-item PR. Fold the 373 into the regeneration re-derivation (filing waits on three unresolved rows and Josh text); watch #92 plus the release predicates (#659).',
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
