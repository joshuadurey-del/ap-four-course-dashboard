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
  snapshot: 'Aug 18, 2026 · 17:40 KST',
  courses: [
    {
      id: 'apush',
      label: 'AP US History',
      short: 'APUSH',
      color: '#c2413a',
      x: 29,
      y: 88,
      stage: 'Build content',
      lastCompleted: 'Last completed · Aug 17',
      summary: 'Seventy-four wave-2 article contracts were authored, gated, and validated. Forty-nine of 249 article positions are admitted.',
      next: 'Next · post the 74 contracts on the factory-pool turn, one factory call per slot on factory defaults; 124 visual-capability positions and 2 source-packet positions remain factory-owned.',
      etaDays: '2–4 days',
      etaNote: 'Covers the 74 authorable positions only; the 126 factory-owned positions are excluded. APUSH posts after the APWH pool turn ahead of it.'
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
      summary: 'All 221 articles are complete; the course bundle was walked locally 221-for-221 green with receipts, then rebuilt and re-walked after the fleet’s U5 article-repair train landed.',
      next: 'Next · fill 1,810 missing questions across 374 buckets on the pool turn (Psych is last in the pool chain), build the gate and practice snapshots, and walk the item legs; the U5 acceptance gate (26 findings) is fleet-owned; registration opens afterward on the owner’s conditions.',
      etaDays: '6–7 days',
      etaNote: 'Assumes evidence-based-FRQ yield recovers; another zero-yield result resets the estimate. Snapshot builds and item-leg walks are unmeasured; the U5 gate fix is fleet-paced.'
    },
    {
      id: 'apwh',
      label: 'AP World History',
      short: 'APWH',
      color: '#4f46b8',
      x: 61,
      y: 88,
      stage: 'Validate',
      lastCompleted: 'Last completed · Aug 18',
      summary: 'The repair route closed with 506 of 506 repairable questions banked and verified; the rebuild batch is in its final chunks — 355 of 423 rows accepted, 57 still to call, roughly an hour at measured pace.',
      next: 'Next · tag and bank the accepted rebuilds, run the paid whole-bank QC sweep, re-judge its content fails, and repeat the 176-lesson walk.',
      etaDays: '2–3 days',
      etaNote: 'Rebuild, tagging, and paid QC are sized; the re-judge loop is an estimate borrowed from another course; the 176-lesson walk is unmeasured. Study-skills lesson placement is fleet work outside this range.'
    },
    {
      id: 'humgeo',
      label: 'AP Human Geography',
      short: 'HumGeo',
      color: '#2558d8',
      x: 80,
      y: 134,
      stage: 'Place course',
      lastCompleted: 'Last completed · Aug 18',
      summary: 'The regeneration campaign settled at 462 of 474 current-byte factory QC passes; the 12 open slots are dispositioned — 9 filed for fleet adjudication, 3 resumable from persisted factory jobs.',
      next: 'Next · adopt and QC the 3 resumable rows, fix the 3 failed metadata rows, rescreen the 741 staged repairs after APWH’s pool turn, then seal, cut over, and walk once the fleet rules the 9 filed slots.',
      etaDays: '2–3 days',
      etaNote: 'Includes adoption QCs, metadata fixes, rescreens, seal, cutover, and walk; excludes fleet adjudication latency on the 9 filed slots, the shared-pool wait behind APWH, and any repair loop the rescreen triggers.'
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
