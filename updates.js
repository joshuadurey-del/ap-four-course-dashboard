(() => {
  const list = document.querySelector('[data-update-list]');
  if (!list) return;

  const relative = ms => {
    const minutes = Math.round((Date.now() - ms) / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.round(minutes / 60);
    return hours < 48 ? `${hours}h ago` : `${Math.round(hours / 24)}d ago`;
  };
  const local = ms => new Date(ms).toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  fetch('updates.json', { cache: 'no-store' }).then(response => response.json()).then(updates => {
    const limit = Number(list.dataset.limit) || updates.length;
    const lastUpdated = document.getElementById('lastupd');
    if (lastUpdated && updates.length) {
      const newest = Math.max(...updates.map(update => Date.parse(update.ts)));
      lastUpdated.innerHTML = `<strong>Last updated:</strong> ${local(newest)} <span class="badge b-blue">${relative(newest)}</span>`;
    }
    list.innerHTML = updates.slice(0, limit).map(update => {
      const ms = Date.parse(update.ts);
      return `<li class="update-item"><div class="update-meta"><strong>${update.course}</strong><time datetime="${update.ts}">${local(ms)} · ${relative(ms)}</time></div><p>${update.text}</p></li>`;
    }).join('');
  }).catch(() => {
    list.innerHTML = '<li class="update-empty">The update feed is temporarily unavailable.</li>';
  });
})();
