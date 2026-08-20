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
  snapshot: 'Aug 20, 2026 · 17:30 KST live-receipt refresh',
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
      etaNote: 'Focused work to LS REVIEW READY, not release. Assumes at least four non-colliding authoring/QC lanes, prompt intake rulings, and reuse of the merged seating reconciler and hosted grader calibration.'
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
      etaNote: 'Focused work to LS REVIEW READY after a safe Unit 5 scope route clears. Provenance is resolved; no paid top-up runs while scope remains unsealed. Internal coverage measurement guides the bounded candidate but is not Learning Science’s intake process.'
    },
    {
      id: 'apwh',
      label: 'AP World History',
      short: 'APWH',
      color: '#4f46b8',
      x: 55,
      y: 120,
      stage: 'Current recovery locus · Measure and preflight',
      lastCompleted: '67f6961 full pair measured · ordering passes both legs',
      summary: 'The latest complete 933-item pair on serialized bank 67f6961 remains red but is narrower: leg A passes 930 and fails 3; leg B passes 931 and fails 2. Ordering passes both legs, population binding agrees, and the remaining residue is one stable plus three unstable substantive item defects. Issue #48 owns the active repair loop.',
      next: 'Repair the four named bindings through the serialized bank route, run two new independent 933-item legs until they pass and agree exactly, then rerun readable blueprint reconciliation and open the governed AP One reviewer path.',
      etaDays: '3–5 days',
      etaNote: 'Focused work to LS REVIEW READY, not release. Assumes the fleet continues its active bar loop and the governed AP One placement route remains available; named LS/SME disposition follows the handoff.'
    },
    {
      id: 'humgeo',
      label: 'AP Human Geography',
      short: 'HumGeo',
      color: '#2558d8',
      x: 69,
      y: 200,
      stage: 'Current recovery locus · Measure coverage + open review access',
      lastCompleted: '150 EK / 70 LO settled · PR #45 sealed plan merged · pinned candidate serves locally',
      summary: 'The live College Board CED resolves the denominator at 150 EK / 70 LO. Post-merge inventory is 2,578 generated records: 433 current passes, 26 fingerprint-valid fails inside PR #45, and 2,119 without matching receipts, including 1,780 never swept. Candidate be18d12d stages, boots, and serves a byte-identical 1,225-lesson bundle locally; the walker stops honestly at the readiness chooser, so a complete reviewer walk is not yet proven.',
      next: 'Compute the distinct accepted-EK numerator over 150, explicitly measure missing map code PSO-3.D.2, target any pilot at uncovered EKs, place the pinned candidate on an LS-reachable secure surface, and run the full reviewer-equivalent walk. Merged PR #45 supplies the separate sealed 332-row plan; its candidate-only execution has not run.',
      etaDays: '3–5 days',
      etaNote: 'Focused work to LS REVIEW READY, not release. The denominator and local serving mechanism are proven; the remaining handoff gate is an LS-reachable surface plus a complete reviewer-equivalent walk. Internal EK measurement and the 332-row lane continue in parallel.'
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
      id: 'stage', point: '4', label: 'Open LS access', kicker: 'Planning stage 4', title: 'Make the exact candidate accessible to Learning Science',
      copy: 'Provide a working URL and access to the pinned candidate, then verify the representative walkthrough from a reviewer-equivalent account.',
      foot: 'A localhost build is useful proof but is not reviewer visibility. Supply the version, walk route, blocking defects, and feedback owner.'
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
        <p class="timeline-sub">Target: Learning Science can access the named course and walk a representative path. Markers show the current recovery locus—not proof that every earlier stage cleared. Hover, focus, or tap for evidence and the next move.</p>
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
