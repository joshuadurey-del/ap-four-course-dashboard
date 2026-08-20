/*
CLAUDE UPDATE CONTRACT — routine course-status updates happen ONLY in AP4_TIMELINE below.

1. Verify current state from updates.json + data.json and each course page's current
   LS-QC target before editing. Do not copy an old dashboard number forward.
2. Update snapshot, then each course's x/y, stage, lastCompleted, summary, next,
   etaDays, and etaNote. x is the horizontal position from 0–100; y staggers
   labels when multiple courses share a recovery locus.
3. etaDays must be a focused-work range, never a calendar date. ETA notes must name
   capacity assumptions and exclusions. External wait time stays explicit.
4. LS-QC READY is a reviewer-handoff milestone, not LS approval or release. Never imply
   that a current recovery locus proves every earlier gate cleared canonically.

No index.html or style.css edit is needed for ordinary course-status updates.
*/
const AP4_TIMELINE = {
  snapshot: 'Aug 20, 2026 · 15:45 KST live-receipt refresh',
  courses: [
    {
      id: 'apush',
      label: 'AP US History',
      short: 'APUSH',
      color: '#c2413a',
      x: 28,
      y: 80,
      stage: 'Current recovery locus · Build reviewer candidate',
      lastCompleted: 'Seating PR #6 merged · 2,479 candidates retain factory QC provenance',
      summary: 'The question candidates were QC checked during generation, so a duplicate blanket pass is not required. The seating reconciler merged at dab70a6, but the canonical article ledger still has 38 accepted positions plus 11 receipted successors outside canon; merge alone does not seat them or prove an approximately 80%-blueprint reviewer candidate.',
      next: 'Route the 11 receipted successors, measure the exact current candidate against the blueprint denominator, parallel-author only the highest-weight missing scope, and stage the pinned AP One review candidate.',
      etaDays: '7–10 days',
      etaNote: 'Focused work to LS-QC READY, not release. Assumes at least four non-colliding authoring/QC lanes, prompt intake rulings, and reuse of the merged seating reconciler and hosted grader calibration.'
    },
    {
      id: 'psych',
      label: 'AP Psychology',
      short: 'Psych',
      color: '#7c3aed',
      x: 43,
      y: 160,
      stage: 'Current recovery locus · Build and measure candidate',
      lastCompleted: 'Bank provenance confirmed · 221/221 articles pass · 374/1,105 buckets underfilled',
      summary: 'Issue #14 closed with owner confirmation that the served bank came through the Content Factory generation API and includes its QC. Provenance is no longer the hold. Safe top-up remains held because the broad route cannot exclude unresolved Unit 5 scope; issue #2 remains open.',
      next: 'Measure the owner-approved blueprint denominator, bind the confirmed generation/QC provenance, establish a committed Unit 5-safe scope route or resolve #2, then top up only proven scope and stage the candidate with an explicit gap ledger.',
      etaDays: '4–7 days',
      etaNote: 'Focused work to LS-QC READY after a safe Unit 5 scope route clears. Provenance is resolved; no paid top-up runs while scope remains unsealed. A bounded candidate may advance only if its measured denominator honestly reaches the owner’s review bar.'
    },
    {
      id: 'apwh',
      label: 'AP World History',
      short: 'APWH',
      color: '#4f46b8',
      x: 55,
      y: 120,
      stage: 'Current recovery locus · Measure and preflight',
      lastCompleted: '17808cc full pair measured · 28/31 gates clear in both legs',
      summary: 'The latest complete 933-item pair on bank 17808cc remains red: five identities fail both legs, nine item/check verdicts disagree, and ordering reports six findings in leg A and five in leg B. Builder evidence is present and population binding agrees; issue #48 owns the active repair loop.',
      next: 'Repair or defensibly adjudicate the five stable failures and recurring prerequisite findings, strengthen the nine unstable verdicts, run two new empty-cache legs, then rerun readable blueprint reconciliation and stage the AP One reviewer handoff.',
      etaDays: '3–5 days',
      etaNote: 'Focused work to LS-QC READY, not release. Assumes the fleet continues its active bar loop and the governed AP One placement route remains available; named LS/SME disposition follows the handoff.'
    },
    {
      id: 'humgeo',
      label: 'AP Human Geography',
      short: 'HumGeo',
      color: '#2558d8',
      x: 63,
      y: 200,
      stage: 'Current recovery locus · Measure and preflight',
      lastCompleted: 'PR #43 merged · #95 closed with route and cost authority',
      summary: 'The 429 fresh QC passes merged at be18d12. Intake #95 closed with owner delegation to choose regeneration or enrich-plus-QC for the 332-record cohort and approval of the associated API costs. Current-byte coverage and the blueprint denominator have not yet been remeasured after landing.',
      next: 'Read back the merged 429 records, rerun current-byte coverage and the blueprint oracle, execute the highest-quality route for the 332-record cohort, verify a safe AP One review surface, and carry form-composition/EOC tails in the gap ledger.',
      etaDays: '3–5 days',
      etaNote: 'Focused work to LS-QC READY, not release. The landing and route-authority waits are cleared; the range now assumes a dedicated course lane and prompt verifier throughput. Full 204-form remediation, formal EOC calibration, release cutover, and learner walk remain later unless they break the review surface.'
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
      id: 'blueprint', point: '1', label: 'Bind review target', kicker: 'Planning stage 1', title: 'Bind the blueprint and review denominator',
      copy: 'Pin the exact blueprint/CED and candidate scope. Name what counts in the approximately 80% reviewer bar and what is explicitly deferred; do not redefine the denominator after seeing the result.',
      foot: 'These four planning stages organize the sprint. They are not claimed as universal factory phase names.'
    },
    {
      id: 'build', point: '2', label: 'Build candidate', kicker: 'Planning stage 2', title: 'Build the reviewer candidate',
      copy: 'Reuse factory-generated, generation-QC-proven content and existing hosted graders. Parallel-author only measured high-value gaps through sanctioned routes; no duplicate blanket QC or calibration work.',
      foot: 'Exit evidence · exact candidate census and provenance mapped to the bound blueprint dimensions.'
    },
    {
      id: 'measure', point: '3', label: 'Measure + preflight', kicker: 'Planning stage 3', title: 'Measure coverage and preflight the review surface',
      copy: 'Run the blueprint crosswalk against the exact candidate, bind existing generation/QC receipts, and check the reviewer path for answer-key exposure, placeholders, and critical broken routes.',
      foot: 'Exit evidence · measured coverage with denominator, current-byte receipts, and an explicit known-gap ledger.'
    },
    {
      id: 'stage', point: '4', label: 'Stage for LS', kicker: 'Planning stage 4', title: 'Stage the exact candidate for Learning Science',
      copy: 'Make the pinned candidate reviewer-visible in AP One or the sanctioned review surface and seal the coverage report, provenance, gaps, review instructions, and next owner.',
      foot: 'A local build or unbound publish call is not reviewer visibility. The staged bytes and the packet must name each other.'
    },
    {
      id: 'ls-ready', point: 'LS-QC READY', label: 'LS-QC READY', kicker: 'Sprint outcome', title: 'Ready for Learning Scientist QC',
      copy: 'A Learning Scientist can immediately inspect a named candidate, measured blueprint coverage, QC provenance, and every known gap. This outcome does not claim LS approval or release.',
      foot: 'Next lifecycle · human LS review → evidence-backed revisions → production validation and learner release.'
    }
  ];

  root.innerHTML = `
    <div class="timeline-head">
      <div>
        <h2>Where each course sits on the path to Learning Science review</h2>
        <p class="timeline-sub">Target: a reviewer-visible candidate at approximately 80% blueprint match. Markers show the current recovery locus—not proof that every earlier stage cleared. Hover, focus, or tap for evidence and the next move.</p>
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
        <p class="timeline-eta" hidden><span>Focused work to LS-QC READY</span><strong></strong></p>
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
    throw new Error('Course LS-QC timeline data is incomplete.');
  }
  show(locked, true);
})();
