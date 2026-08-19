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
  snapshot: 'Aug 19, 2026 · 10:43 KST',
  courses: [
    {
      id: 'apush',
      label: 'AP US History',
      short: 'APUSH',
      color: '#c2413a',
      x: 29,
      y: 88,
      stage: 'Build content',
      lastCompleted: 'Last completed · Aug 19',
      summary: 'The readability fix is confirmed: batch-35 chunk 1 settled and all nine previously exhausted positions now pass the factory text QC. But every factory-passed article came back with its images stripped (server reason: unsupported contract, 10 of 10 measured), so zero articles are admissible yet.',
      next: 'Next · the remaining 64 posts are deliberately held until intake #90 answers the image-contract question; firing more chunks would only re-measure the strip. Wave-2 admissions resume the hour that answer lands.',
      etaDays: '2–3 days',
      etaNote: 'Top end is the seat\'s published cautious date (Aug 22). The whole range now rides on the fleet\'s intake #90 answer, not pool timing; zero of 249 wave-2 admissions have landed.'
    },
    {
      id: 'psych',
      label: 'AP Psychology',
      short: 'Psych',
      color: '#7c3aed',
      x: 42,
      y: 134,
      stage: 'Build content',
      lastCompleted: 'Last completed · Aug 17',
      summary: 'All 221 articles are complete; the bundle was walked 221-for-221 green with receipts (our instrument — the factory walker run is queued behind the bank fill), then rebuilt and re-walked after the fleet’s U5 repair train.',
      next: 'Next · fill 1,810 missing questions across 374 buckets on the pool turn (Psych is last in the pool chain), build the gate and practice snapshots, and walk the item legs; the U5 acceptance gate (26 findings) is fleet-owned; registration opens afterward on the owner’s conditions.',
      etaDays: '5–6 days',
      etaNote: 'Top end is the seat\'s published cautious date (Aug 25). Assumes essay-question yield recovers; another zero-yield result resets the estimate. Snapshot builds and item-leg walks are unmeasured; the U5 gate (26 findings re-verified today at head b19cced) is fleet-paced.'
    },
    {
      id: 'apwh',
      label: 'AP World History',
      short: 'APWH',
      color: '#4f46b8',
      x: 61,
      y: 88,
      stage: 'Validate',
      lastCompleted: 'Last completed · Aug 19',
      summary: 'The rebuild and tagging chain closed this morning: 419 of 423 accepted row-level on the drain receipt, and all 371 rebuild candidates verified — unique, coded, one per slot, zero content overlap with the 165 quarantined fingerprints. The 56-row disposition queue is fully receipted.',
      next: 'Next · the one paid QC sweep (933 judgments: the 371 candidates first, then the 562 already banked, judged in place), then bank the passers with receipts, re-judge content fails per their dispositions, then the factory-run walk.',
      etaDays: '1–2 days',
      etaNote: 'Top end is the seat\'s published cautious date (Aug 21). The walk is unmeasured until the walker-scope call; the 56 pre-classified fails ride their receipts; study-skills lesson placement is fleet work outside this range.'
    },
    {
      id: 'humgeo',
      label: 'AP Human Geography',
      short: 'HumGeo',
      color: '#2558d8',
      x: 80,
      y: 134,
      stage: 'Place course',
      lastCompleted: 'Last completed · Aug 19',
      summary: 'Overnight, all 741 staged repairs were rescreened through the factory’s official QC: 464 passed and 277 route to regeneration. One resumable row closed negative (its recovered item failed the factory’s checks) and joins the filed class, 9 becoming 10. The two walk marks were revoked Aug 18 for hand-rolled provenance, which is why the bar reads 52 honestly.',
      next: 'Next · land the 464 passes into main (write-back done on a pinned checkout, official verdict re-earn running, then a reviewed PR); post the promised update on the fleet filing; regenerate the 277-plus-18 queue once the per-slot route is named; assemble the local-host proof package for Ilma — demo hosting is no longer the target (owner, Aug 19).',
      etaDays: '1–2 days',
      etaNote: 'Covers this seat’s own work: the 464 landing and the regenerate queue. Excludes fleet latency on the filed slots’ ruling, the seal that waits on it, the cutover, and the release-flag walk — those are fleet- or owner-paced.'
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
        <p class="timeline-sub">One shared process. Hover, focus, or tap any point to see what it means, the latest dated evidence, and remaining work.</p>
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
        <p class="timeline-eta" hidden><span>Estimated active work within our control</span><strong></strong></p>
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
