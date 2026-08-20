/*
CLAUDE UPDATE CONTRACT — routine course-status updates happen ONLY in AP4_TIMELINE below.

1. Verify current state from updates.json + data.json and each course page's current
   LS review target before editing. Do not copy an old dashboard number forward.
2. Update snapshot, then each course's x/y, stage, lastCompleted, summary, next,
   etaDays, and etaNote. x is the horizontal position from 0–100; y staggers
   labels when multiple courses share a recovery locus.
3. etaDays must be a focused-work range, never a calendar date. ETA notes must name
   capacity assumptions and exclusions. External wait time stays explicit.
4. LS REVIEW READY means Learning Science can access and walk the named candidate. It is
   not LS approval or release. Never imply
   that a current recovery locus proves every earlier gate cleared canonically.

No index.html or style.css edit is needed for ordinary course-status updates.
*/
const AP4_TIMELINE = {
  snapshot: 'Aug 21, 2026 · 03:19 KST live-receipt refresh',
  courses: [
    {
      id: 'apush',
      label: 'AP US History',
      short: 'APUSH',
      color: '#c2413a',
      x: 28,
      y: 80,
      stage: 'Current recovery locus · Build local candidate',
      lastCompleted: 'Seating PR #6 merged · 2,479 candidates retain factory QC provenance',
      summary: 'The question candidates were QC checked during generation, so a duplicate blanket pass is not required. The seating reconciler merged at dab70a6, but the canonical article ledger still has 38 accepted positions plus 11 receipted successors outside canon; merge alone does not seat them or prove an approximately 80%-blueprint reviewer candidate.',
      next: 'Route the 11 receipted successors, measure the exact current candidate against the blueprint denominator, parallel-author only the highest-weight missing scope, and prepare a pinned local publication package. External placement waits for the sanctioned TimeBack instructions.',
      etaDays: '7–10 days',
      etaNote: 'Focused build work toward the candidate, not a calendar promise. Assumes at least four non-colliding authoring/QC lanes, prompt intake rulings, and reuse of the merged seating reconciler and hosted grader calibration. TimeBack wait is excluded.'
    },
    {
      id: 'psych',
      label: 'AP Psychology',
      short: 'Psych',
      color: '#7c3aed',
      x: 43,
      y: 160,
      stage: 'Current recovery locus · Build and measure local candidate',
      lastCompleted: '221/221 articles pass · Unit 3 video release verified 15/15',
      summary: 'Current main e7a3df preserves the verified article tree and Unit 3 video records. Open PR #23 adds a 34-figure Unit 3 image candidate with static branch checks green, but it has no configured checks or review and the monitor could not re-run its renderer-dependent ledger. Bank provenance is cleared; safe top-up remains held because the broad route cannot exclude unresolved Unit 5 scope.',
      next: 'Review, merge, and fully re-derive PR #23 on main; measure the owner-approved blueprint denominator; establish a committed Unit 5-safe scope route or resolve #2; then top up only proven scope and prepare a pinned local package with an explicit gap ledger.',
      etaDays: '4–7 days',
      etaNote: 'Focused build work after a safe Unit 5 scope route clears. Provenance is resolved; no paid top-up runs while scope remains unsealed. TimeBack publication and reviewer access wait on sanctioned instructions.'
    },
    {
      id: 'apwh',
      label: 'AP World History',
      short: 'APWH',
      color: '#4f46b8',
      x: 63,
      y: 120,
      stage: 'Current recovery locus · Reconcile + package',
      lastCompleted: 'Faultless Bar accepted · both 933-item legs pass · exact agreement',
      summary: 'Issue #48 closed complete at 10:25Z after PR #9 merged the reproducible evaluator and exact passing acceptance evidence. Both legs cover all 933 identities, both pass, identity sets match, and item and course-status disagreements are zero. This is acceptance proof, not student-surface deployment or reviewer visibility.',
      next: 'Rerun the existing blueprint oracle against the exact readable accepted candidate, record the measured gaps, and prepare the pinned local publication package. External placement waits for the sanctioned TimeBack instructions.',
      etaDays: '1–3 days',
      etaNote: 'Reprojected focused build range after issue #48 closed; it assumes the existing oracle and local packaging chain run without a new blocker. External TimeBack placement and reviewer access wait are excluded.'
    },
    {
      id: 'humgeo',
      label: 'AP Human Geography',
      short: 'HumGeo',
      color: '#2558d8',
      x: 69,
      y: 200,
      stage: 'Current recovery locus · Reconcile coverage + repair route',
      lastCompleted: '78f6ec4 local bundle sealed · exact served hash match · 40/0 bundle checks',
      summary: 'The current 13-file local bundle at candidate 78f6ec4 staged, served, and read back byte-equal at hash 17962c5c…. Bundle-law checks pass 40/0, including 3,060/3,060 student views without answer-key exposure, and gate integrity passes 7/0. The server still reports ready=false and the walker stops at the readiness preflight with 11 later stages skipped; local package identity is proven, reviewer visibility is not.',
      next: 'Preserve the sealed local package; reconcile the 120-versus-119 accepted-EK counter, keep PSO-3.D.2 explicit, and obtain a factory-sanctioned structural remediation plan plus a new owner re-arm before issue-44 scaling. External placement waits for the sanctioned TimeBack instructions.',
      etaDays: '3–5 days',
      etaNote: 'Focused build work plus an external wait. The local serving mechanism is proven, but accepted-EK counters disagree and the issue-44 pilot failed its scale condition. TimeBack placement and reviewer access wait on sanctioned instructions.'
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
      id: 'blueprint', point: '1', label: 'Bind review target', kicker: 'Planning stage 1', title: 'Bind the candidate and internal coverage target',
      copy: 'Pin the exact blueprint/CED and candidate scope. Measure coverage honestly for internal planning; the roughly 80% target is not a Learning Science intake requirement.',
      foot: 'These four planning stages organize the sprint. They are not claimed as universal factory phase names.'
    },
    {
      id: 'build', point: '2', label: 'Build candidate', kicker: 'Planning stage 2', title: 'Build the reviewer candidate',
      copy: 'Reuse factory-generated, generation-QC-proven content and existing hosted graders. Parallel-author only measured high-value gaps through sanctioned routes; no duplicate blanket QC or calibration work.',
      foot: 'Exit evidence · exact candidate census and provenance mapped to the bound blueprint dimensions.'
    },
    {
      id: 'measure', point: '3', label: 'Measure + preflight', kicker: 'Planning stage 3', title: 'Measure internally and preflight the walkthrough',
      copy: 'Run the blueprint crosswalk against the exact candidate, bind existing generation/QC receipts, and test a representative reviewer path. Keep internal measurements separate from the LS intake process.',
      foot: 'Exit evidence · current internal measurement plus a representative path that is ready to expose to reviewers.'
    },
    {
      id: 'stage', point: '4', label: 'Publish for review', kicker: 'Planning stage 4', title: 'Publish the exact candidate through the sanctioned TimeBack route',
      copy: 'After the sanctioned publishing instructions arrive, provide a working URL and access to the pinned candidate, then verify the representative walkthrough from a reviewer-equivalent account.',
      foot: 'HOLD: TIMEBACK_INSTRUCTIONS_FROM_ILMA. A localhost build is useful proof but is not reviewer visibility.'
    },
    {
      id: 'ls-ready', point: 'LS REVIEW READY', label: 'LS REVIEW READY', kicker: 'Sprint outcome', title: 'Ready for Learning Science review',
      copy: 'Learning Science can open the named candidate and walk the representative course path. Internal coverage and QC evidence remain available to builders but do not become an LS intake ceremony.',
      foot: 'Next lifecycle · human LS review → evidence-backed revisions → production validation and learner release.'
    }
  ];

  root.innerHTML = `
    <div class="timeline-head">
      <div>
        <h2>Where each course sits on the path to Learning Science review</h2>
        <p class="timeline-sub">Target: Learning Science can access the named course and walk a representative path. External publication is currently held pending sanctioned TimeBack instructions. Markers show the current recovery locus—not proof that every earlier stage cleared.</p>
      </div>
      <span class="timeline-snapshot">Verified snapshot · ${AP4_TIMELINE.snapshot}</span>
    </div>
    <div class="timeline-canvas" aria-label="Planning stages and current recovery locus for four courses moving to Learning Scientist review">
      <div class="timeline-rail" aria-hidden="true"></div>
      <div class="timeline-stages">
        ${stages.map(stage => `
          <button class="timeline-stage" type="button" data-timeline-item="${stage.id}" aria-pressed="${stage.id === 'ls-ready'}">
            <span class="timeline-stage-point">${stage.point}</span>
            <span class="timeline-stage-label"${stage.id === 'ls-ready' ? ' aria-hidden="true"' : ''}>${stage.label}</span>
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
        <p class="timeline-eta" hidden><span>Focused work to LS REVIEW READY</span><strong></strong></p>
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
  let locked = 'ls-ready';

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
        !/^\d+[–-]\d+ days$/.test(course.etaDays) ||
        !course.etaNote || !course.next)) {
    throw new Error('Course LS review timeline data is incomplete.');
  }
  show(locked, true);
})();
