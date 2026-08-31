(() => {
  const relative = ms => {
    const minutes = Math.max(0, Math.round((Date.now() - ms) / 60000));
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.round(minutes / 60);
    return hours < 48 ? `${hours}h ago` : `${Math.round(hours / 24)}d ago`;
  };
  const local = ms => new Date(ms).toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
  const nextStep = value => value && typeof value.verb === 'string' && typeof value.tool === 'string' &&
    Array.isArray(value.args) && typeof value.gate === 'string'
    ? `${value.verb} via ${value.tool}${value.args.length ? ` (${value.args.join(', ')})` : ''} once ${value.gate}`
    : 'The governed next step is unavailable.';
  const displayText = text => String(text)
    .replace(/\bilmych\/apush-build-outputs\b/gi, 'the APUSH build-outputs repository')
    .replace(/\bIlma['’]s\b/gi, "the repository owner's")
    .replace(/\bIlma\b|\bilmych\b/gi, 'the repository owner')
    .replace(/\bJayesh call\b/gi, 'review call')
    .replace(/\bJayesh['’]s\b/gi, "the reviewer's")
    .replace(/\bJayesh\b/gi, 'the reviewer');

  const scrubPeople = root => {
    const scrubText = node => {
      if (!node.parentElement?.closest('script, style, noscript')) node.data = displayText(node.data);
    };
    if (root.nodeType === Node.TEXT_NODE) {
      scrubText(root);
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE || root.matches('script, style, noscript')) return;
    [root, ...root.querySelectorAll('[aria-label], [title], [alt]')].forEach(element => {
      ['aria-label', 'title', 'alt'].forEach(attribute => {
        if (element.hasAttribute(attribute)) element.setAttribute(attribute, displayText(element.getAttribute(attribute)));
      });
    });
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) scrubText(node);
  };

  globalThis.AP4_PUBLIC_TEXT = displayText;

  const evidenceUrl = value => {
    try {
      const url = new URL(value);
      return url.protocol === 'https:' && url.hostname === 'github.com' ? url.href : null;
    } catch {
      return null;
    }
  };
  const newestLocal = (updates, course) => updates
    .filter(update => update?.course === course && typeof update?.kind === 'string' && !Number.isNaN(Date.parse(update.ts)))
    .sort((a, b) => Date.parse(b.ts) - Date.parse(a.ts))[0];
  const newestRepository = (updates, course) => updates
    .filter(update => update?.course === course && typeof update?.event_type === 'string' && evidenceUrl(update.evidence_url) && !Number.isNaN(Date.parse(update.ts)))
    .sort((a, b) => Date.parse(b.ts) - Date.parse(a.ts))[0];

  const summarizeCourse = (updates, course, now = Date.now()) => {
    const rows = Array.isArray(updates) ? updates.filter(update =>
      typeof update?.course === 'string' && update.course.toLowerCase() === course &&
      typeof update?.ts === 'string' && !Number.isNaN(Date.parse(update.ts))) : [];
    const since = now - 7 * 24 * 60 * 60 * 1000;
    const landingKinds = new Set(['landed', 'merged', 'closed', 'receipt-sealed', 'state-change']);
    const landings7d = rows.filter(update => Date.parse(update.ts) >= since &&
      (landingKinds.has(update.kind) || update.event_type === 'push')).length;
    const latestByPhase = new Map();
    rows.filter(update => typeof update.phase === 'string' && update.phase.trim() && typeof update.kind === 'string')
      .sort((a, b) => Date.parse(a.ts) - Date.parse(b.ts))
      .forEach(update => latestByPhase.set(update.phase.trim().toLowerCase(), update));
    const openHolds = [...latestByPhase.values()].filter(update => update.kind === 'hold').length;
    const gateEntry = rows.filter(update => update.kind === 'state-change')
      .sort((a, b) => Date.parse(b.ts) - Date.parse(a.ts))[0];
    return {
      landings7d,
      openHolds,
      gateDays: gateEntry ? Math.max(0, Math.floor((now - Date.parse(gateEntry.ts)) / 86400000)) : null,
    };
  };

  globalThis.AP4_UPDATES = { summarizeCourse };

  if (typeof document === 'undefined') {
    if (displayText('Ilma') !== 'the repository owner') throw new Error('display text self-test failed');
    if (displayText('Jayesh and Ilma asked Josh') !== 'the reviewer and the repository owner asked Josh') throw new Error('personal-name policy self-test failed');
    if (!evidenceUrl('https://github.com/example/course/commit/abc')) throw new Error('evidence URL self-test failed');
    if (evidenceUrl('https://example.com/not-allowed')) throw new Error('unsafe URL self-test failed');
    if (newestLocal([{ course: 'psych', kind: 'landed', ts: '2026-08-29T00:00Z' }], 'psych')?.kind !== 'landed') throw new Error('local freshness self-test failed');
    if (newestRepository([{ course: 'psych', event_type: 'push', evidence_url: 'https://github.com/example/course/commit/abc', ts: '2026-08-29T00:00Z' }], 'psych')?.event_type !== 'push') throw new Error('repository freshness self-test failed');
    const summary = summarizeCourse([
      { course: 'psych', kind: 'landed', phase: 'P0', ts: '2026-08-30T00:00Z' },
      { course: 'psych', kind: 'hold', phase: 'P1', ts: '2026-08-30T01:00Z' },
      { course: 'psych', kind: 'state-change', phase: 'P0', ts: '2026-08-29T00:00Z' },
    ], 'psych', Date.parse('2026-08-31T00:00Z'));
    if (summary.landings7d !== 2 || summary.openHolds !== 1 || summary.gateDays !== 2) throw new Error('rate summary self-test failed');
    return;
  }

  scrubPeople(document.body);
  new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(scrubPeople)))
    .observe(document.documentElement, { childList: true, subtree: true });

  const lists = [...document.querySelectorAll('[data-update-list]')];
  if (!lists.length) return;

  const render = (list, updates) => {
    const course = list.dataset.course?.toLowerCase();
    const eventOnly = list.hasAttribute('data-event-only');
    const visible = updates.filter(update =>
      typeof update?.ts === 'string' && !Number.isNaN(Date.parse(update.ts)) &&
      typeof update?.course === 'string' && typeof update?.text === 'string' &&
      (!course || update.course.toLowerCase() === course) &&
      (!eventOnly || (typeof update.event_type === 'string' && evidenceUrl(update.evidence_url)))
    );
    const limit = Number(list.dataset.limit) || visible.length;
    const items = visible.slice(0, limit).map(update => {
      const ms = Date.parse(update.ts);
      const item = document.createElement('li');
      item.className = 'update-item';
      const meta = document.createElement('div');
      meta.className = 'update-meta';
      const courseName = document.createElement('strong');
      courseName.textContent = update.course;
      const time = document.createElement('time');
      time.dateTime = update.ts;
      time.textContent = `${local(ms)} · ${relative(ms)}`;
      const writer = document.createElement('span');
      writer.className = 'update-writer';
      writer.textContent = `Writer: ${update.writer}`;
      meta.append(courseName, time, writer);
      const copy = document.createElement('p');
      copy.textContent = displayText(update.text);
      const href = evidenceUrl(update.evidence_url);
      if (href) {
        const link = document.createElement('a');
        link.className = 'update-evidence';
        link.href = href;
        link.target = '_blank';
        link.rel = 'noopener';
        link.textContent = 'Evidence';
        copy.append(' ', link);
      }
      item.append(meta, copy);
      return item;
    });
    list.replaceChildren(...items);
    if (!items.length) {
      const empty = document.createElement('li');
      empty.className = 'update-empty';
      empty.textContent = eventOnly ? 'No verified repository activity yet.' : 'No verified updates yet.';
      list.append(empty);
    }
    return visible;
  };

  const renderCourseCurrent = (data, updates) => lists.filter(list => list.hasAttribute('data-event-only')).forEach(list => {
    const course = list.dataset.course?.toLowerCase();
    const claim = data?.claims?.find(row => row?.claim_id === `${course}.blueprint.audit`);
    if (!claim) return;
    const event = claim.current_event;
    const current = event && typeof event.phase === 'string' && typeof event.kind === 'string' &&
      typeof event.text === 'string' ? event : null;
    const intro = list.closest('main')?.querySelector('h1 + .sub');
    if (intro) intro.textContent = displayText(current?.text || claim.value);
    const prior = list.parentElement?.querySelector('[data-automated-current]');
    if (prior) prior.remove();
    if (!current || Number.isNaN(Date.parse(current.ts))) return;
    const state = document.createElement('p');
    state.dataset.automatedCurrent = '';
    state.className = 'course-current';
    const phase = current.phase?.trim() ? `${current.phase} · ` : '';
    state.textContent = `Current attested state: ${phase}${current.kind.replaceAll('-', ' ')} · ${current.text} Next: ${nextStep(claim.next_step)}.`;
    list.before(state);
  });

  let updatesRefresh;
  const refreshUpdates = () => updatesRefresh || (updatesRefresh = Promise.all([
    fetch('updates.json', { cache: 'no-store' }).then(response => response.json()),
    fetch('data.json', { cache: 'no-store' }).then(response => response.json()).catch(() => null),
  ]).then(([updates, data]) => {
    if (!Array.isArray(updates)) throw new Error('updates.json must be an array');
    const visibleUpdates = render(lists[0], updates);
    lists.slice(1).forEach(list => render(list, updates));
    renderCourseCurrent(data, updates);
    lists.filter(list => list.hasAttribute('data-event-only')).forEach(list => {
      if (list.previousElementSibling?.classList.contains('local-freshness')) list.previousElementSibling.remove();
      const course = list.dataset.course?.toLowerCase();
      const repository = newestRepository(updates, course);
      const localEntry = newestLocal(updates, course);
      if (!repository && !localEntry) return;
      const status = document.createElement('p');
      status.className = 'local-freshness';
      const parts = [];
      if (repository) parts.push(`Latest repository activity: ${local(Date.parse(repository.ts))} · ${relative(Date.parse(repository.ts))}`);
      if (localEntry) parts.push(`Latest local log entry: ${local(Date.parse(localEntry.ts))} · ${relative(Date.parse(localEntry.ts))}`);
      status.textContent = parts.join(' | ');
      list.before(status);
    });
    const lastUpdated = document.getElementById('lastupd');
    if (lastUpdated && visibleUpdates.length) {
      const newest = Math.max(...visibleUpdates.map(update => Date.parse(update.ts)));
      const label = document.createElement('strong');
      label.textContent = 'Last updated:';
      const badge = document.createElement('span');
      badge.className = 'badge b-blue';
      badge.textContent = relative(newest);
      lastUpdated.replaceChildren(label, ` ${local(newest)} `, badge);
    }
  }).catch(() => {
    lists.forEach(list => {
      const empty = document.createElement('li');
      empty.className = 'update-empty';
      empty.textContent = 'The update feed is temporarily unavailable.';
      list.replaceChildren(empty);
    });
  }).finally(() => { updatesRefresh = null; }));
  const refreshOnReturn = () => {
    if (!document.hidden) void refreshUpdates();
  };
  void refreshUpdates();
  window.addEventListener('focus', refreshOnReturn);
  window.addEventListener('pageshow', refreshOnReturn);
  document.addEventListener('visibilitychange', refreshOnReturn);
})();
