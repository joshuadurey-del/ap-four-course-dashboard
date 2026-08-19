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
  snapshot: 'Aug 19, 2026 · recovery audit',
  courses: [
    {
      id: 'apush',
      label: 'AP US History',
      short: 'APUSH',
      color: '#c2413a',
      x: 30,
      y: 88,
      stage: 'Build content',
      lastCompleted: 'Recovery audit · mixed proof',
      summary: 'The 49-of-249 ledger count is current, but it is not one uniform factory-accepted cohort: 13 admissions are server-strict, 36 are legacy dual-review, and 11 successors used a local admit path. Future admissions remain held.',
      next: 'Next · rerun the committed ledger builder in an isolated scratch checkout, preserve the 13/36/11 split, obtain the legacy-36 label ruling, and watch intake #89/#90 plus seating PR #6. Do not post more articles while the factory image contract is unresolved.',
      etaDays: '1–2 days',
      etaNote: 'Work estimate, not a release promise. This covers local re-verification and decision preparation only. Factory answers, future admissions, registration, serving, and release remain separate blockers.'
    },
    {
      id: 'psych',
      label: 'AP Psychology',
      short: 'Psych',
      color: '#7c3aed',
      x: 39,
      y: 134,
      stage: 'Build content',
      lastCompleted: 'Recovery audit · content proven',
      summary: 'The fleet-built 221-article content state is proven. The bank scan shows 731 of 1,105 buckets filled, but the served-bank provenance is unknown. The EBQ receipt admitted two items and closed zero buckets, so it does not earn serving credit.',
      next: 'Next · verify a committed factory top-up client, obtain the owner relay, read the EBQ state back from the factory, and fix the local status verifier to open its receipt. U5 is still not green; registration stays parked.',
      etaDays: '3–4 days',
      etaNote: 'Work estimate, not a release promise. The clock starts after the owner relay and a canonical top-up client are confirmed. The range includes about 48 pool-hours plus local snapshot and walk work; zero EBQ yield stops and resets it.'
    },
    {
      id: 'apwh',
      label: 'AP World History',
      short: 'APWH',
      color: '#4f46b8',
      x: 52,
      y: 88,
      stage: 'Validate',
      lastCompleted: 'Recovery audit · re-earn required',
      summary: 'The staged population survives as input, not completion proof: 506 banked rows, 369 candidate rows, and 58 disposition rows await a fresh machine-readable pack and one official 933-item sweep. The folded tags and the local-done walk cannot back factory credit.',
      next: 'Next · contain PR #791. It is CI-green and mergeable but has no review and conflicts with the newer owner recommendation to supersede the shadow tree with native governed placement. Resolve that authority first; then approve and run the paid sweep through committed factory machinery.',
      etaDays: '2–3 days',
      etaNote: 'Work estimate, not a release promise. The clock starts after the tree ruling and paid-sweep approval. Publisher bootstrap, study-skills placement, merge/deploy latency, and learner-visible release remain separate blockers.'
    },
    {
      id: 'humgeo',
      label: 'AP Human Geography',
      short: 'HumGeo',
      color: '#2558d8',
      x: 58,
      y: 134,
      stage: 'Validate',
      lastCompleted: 'Recovery audit · re-earn required',
      summary: 'The sealed-plan wave is the surviving factory proof, with its exact total scheduled for re-derivation. The 741 rescreen verdicts are not bindable to current bytes and must be re-earned. The 374 pass set survives only as input and is not banked on main.',
      next: 'Next · use a clean factory checkout to re-derive the wave total, stage the paid 741 re-earn through committed service_qc.py, and prepare the 374-pass reviewed-PR path through repair_shortcut.py. Do not touch the polluted shortfall clone until its older 2,038-file residue is ruled.',
      etaDays: '2–3 days',
      etaNote: 'Work estimate, not a release promise. The clock starts after the paid re-earn and 374-apply decisions. #92, #642, release-ready, deployment, and the post-flip learner walk remain separate blockers.'
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
