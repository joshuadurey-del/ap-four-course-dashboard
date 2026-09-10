// node test_asap_ui.cjs; add --browser with the existing Playwright runtime available.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
require('./timeline.js'); // Includes the existing source-binding self-test.
const { asapPosition, bindCourseState, populationRows, readASAPStages, validateNeedsHuman } = globalThis.AP4_BOARD;
const generated = JSON.parse(fs.readFileSync(path.join(__dirname, 'process.json')));
const stages = readASAPStages(generated);
assert.deepEqual(stages.map(stage => [stage.id, stage.native_phases]), [
  ['align', ['p12']], ['synthesize', ['content', 'p3']], ['assemble', ['p5']], ['prove', ['p6', 'p7', 'p8']],
]);
assert.equal(readASAPStages({ ...generated, asap_stages: stages.slice(1) }).length, 0);
assert.equal(readASAPStages({ ...generated, asap_stages: stages.map(stage => ({ ...stage, native_phases: ['p3'] })) }).length, 0);
const now = Date.now();
const stamp = new Date(now - 3600000).toISOString();
const ids = ['humgeo', 'apwh', 'psych', 'apush'];
const phases = ['p12', 'p3', 'p5', 'fleet-held'];
const data = { snapshot: stamp, claims: ids.map((id, index) => ({
  claim_id: `${id}.blueprint.audit`, status: 'OBSERVED', value: 'Subset bank PASS; other populations unmeasured.',
  observed_at: stamp, freshness_limit_hours: 24, process_position: { current_stage: phases[index], state: 'Scope needs verification' },
})) };
const evidenceRow = {value:'0 / 10 accepted',detail:'Fixture inventory only.',next_step:'10 pending.',level:'Acceptance ledger',observed_at:stamp,evidence:[{url:`https://github.com/example/course/blob/${'a'.repeat(40)}/ledger.json`,sha256:'b'.repeat(64)}]};
data.population_coverage = {schema:'population-evidence/v1',courses:{apwh:{Practice:evidenceRow}}};
assert.equal(populationRows(data,'apwh',['Practice'],now)[0].value,'0 / 10 accepted');
assert.equal(populationRows(data,'humgeo',['Practice'],now)[0].measured,false,'No cross-course evidence');
for (const id of ids) for (const label of ['Train Your Eye','Embedded checks','Unit assessments']) {
  assert.deepEqual(populationRows(data,id,[label],now)[0],{label,measured:false,reporting_status:'NOT_REPORTED',course_status:'NOT_ASSESSED'});
}
assert.equal(populationRows({population_coverage:{schema:'population-evidence/v1',courses:{humgeo:{Practice:{reporting_status:'NOT_REPORTED',course_status:'NOT_ASSESSED'}}}}},'humgeo',['Practice'],now)[0].reporting_status,'NOT_REPORTED');
assert.equal(populationRows(data,'apwh',['Practice'],now+48*3600000)[0].stale,true);
for (const delta of [{evidence:[]},{evidence:[null]},{evidence:[{url:'javascript:alert(1)',sha256:'b'.repeat(64)}]},{observed_at:'bad'},{observed_at:new Date(now+3600000).toISOString()}]) {
  assert.equal(populationRows({population_coverage:{schema:'population-evidence/v1',courses:{apwh:{Practice:{...evidenceRow,...delta}}}}},'apwh',['Practice'],now)[0].measured,false);
  assert.equal(populationRows({population_coverage:{schema:'population-evidence/v1',courses:{apwh:{Practice:{...evidenceRow,...delta}}}}},'apwh',['Practice'],now)[0].reporting_status,'INVALID_EVIDENCE');
}
const processValue = { ...generated, courses: Object.fromEntries(data.claims.map((claim, index) => [ids[index], {
  ...claim.process_position, detail: claim.value, as_of: stamp,
  coverage: { gate_mcqs: { accepted: 10, required: 10, verdict: 'PASS' } },
}])) };
const courses = bindCourseState(data, processValue, now);
assert.deepEqual(courses.map(course => asapPosition(course, stages).stage), ['align', 'synthesize', null, 'assemble']);
for (const phase of ['p0', 'p4', 'unknown', 'fleet-held']) {
  assert.equal(asapPosition({ ...courses[0], phaseStates: [{ code: phase }] }, stages).stage, null);
}
assert.equal(asapPosition({ ...courses[0], stale: true }, stages).stage, null);
assert.equal(asapPosition({ ...courses[0], claimStatus: 'PLANNED' }, stages).stage, null);
assert.equal(asapPosition({ ...courses[0], phaseStates: [{ code: 'p3' }, { code: 'p5' }] }, stages).stage, null);
assert.equal(asapPosition({ ...courses[0], available: false }, stages).stage, null);
assert.match(asapPosition(courses[1], stages).reason, /Stage placement only/);
const item = { id: 'a'.repeat(16), ts: stamp, course: 'humgeo', kind: 'decision', title: 'A title', deadline: '' };
for (const code of [0, 9, 10, 31]) {
  assert.equal(validateNeedsHuman({ schema: 'needs-human-public/v1', generated_ts: stamp, open: [{ ...item, title: `A${String.fromCharCode(code)}title` }] }, now).status, 'hold');
}
assert(!fs.readFileSync(path.join(__dirname, 'timeline.js')).includes(0), 'JavaScript source contains a literal NUL');
console.log('ASAP mapping, unknown/stale/mixed scope, subset acceptance and title validation passed.');

async function browserCheck() {
  const { chromium } = require('playwright');
  const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const errors = []; page.on('pageerror', error => errors.push(error.message));
    let processFails = false;
    const fixtures = { 'data.json': data, 'process.json': processValue, 'updates.json': [],
      'needs-human.json': { schema: 'needs-human-public/v1', generated_ts: stamp, open: [] } };
    await page.route('https://asap.test/**', route => {
      const filename = new URL(route.request().url()).pathname.slice(1) || 'index.html';
      if (filename === 'process.json' && processFails) return route.fulfill({ status: 503, body: 'Unavailable' });
      if (fixtures[filename]) return route.fulfill({ contentType: 'application/json', body: JSON.stringify(fixtures[filename]) });
      if (!(filename === 'docs/assets/workspace-preview.png' || /^[a-z][a-z0-9.-]*\.(html|js|css|json|svg)$/.test(filename)) || !fs.existsSync(path.join(__dirname, filename))) return route.fulfill({ status: 404, body: '' });
      return route.fulfill({ contentType: filename.endsWith('.png') ? 'image/png' : filename.endsWith('.js') ? 'text/javascript' : filename.endsWith('.css') ? 'text/css' : filename.endsWith('.svg') ? 'image/svg+xml' : filename.endsWith('.json') ? 'application/json' : 'text/html',
        body: fs.readFileSync(path.join(__dirname, filename)) });
    });
    const ready = async () => {
      await page.waitForFunction(() => globalThis.AP4_DASHBOARD?.ready);
      await page.evaluate(async () => { await AP4_DASHBOARD.ready; });
      if (await page.locator('#needs-human-strip').count()) await page.waitForSelector('#needs-human-strip:not(.is-loading)');
    };
    const visible = () => page.locator('[data-course-card]:visible').evaluateAll(cards => cards.map(card => card.dataset.courseCard));
    await page.goto('https://asap.test/index.html');
    assert.equal(await page.locator('#course-release-timeline, .population-coverage, .source-sync-bar, #needs-human-strip').count(), 0, 'Home must remain a product entry');
    assert.equal(await page.locator('#install-command').count(), 1);
    await page.locator('#copy-install').click();
    await page.waitForFunction(() => document.querySelector('#copy-install-status').textContent.length > 0);
    assert.equal(await page.locator('.preview-link img').evaluate(img => img.complete && img.naturalWidth > 0), true);
    if (process.env.UI_SCREENSHOT_DIR) await page.screenshot({path:path.join(process.env.UI_SCREENSHOT_DIR,'home-desktop.png'),fullPage:true});
    await page.getByRole('link', {name: 'Open course workspace'}).click(); await ready();
    assert.equal(new URL(page.url()).pathname, '/courses.html');
    assert.equal(await page.locator('.population-coverage').count(), 0, 'Full population table belongs on each course');
    assert(await page.locator('#course-release-timeline').evaluate(el => el.offsetTop < document.querySelector('#needs-human-strip').offsetTop));
    await page.getByText('Source sync and verification', {exact:true}).click();
    assert.match(await page.locator('.source-sync-link').getAttribute('href'), /InceptTrilogy.*dashboard-repo-poll.yml$/);
    await page.locator('.source-refresh').click(); await ready();
    assert.match(await page.locator('.source-sync-status').textContent(), /No live-source sync recorded/);
    assert.equal(await page.locator('.site-header .site-identity img').evaluate(image => image.complete && image.naturalWidth > 0), true);
    assert.equal(await page.evaluate(() => getComputedStyle(document.body).backgroundColor), 'rgb(20, 22, 21)');
    await page.getByText('Filter by build stage', {exact:true}).click();
    const contrast = await page.evaluate(() => {
      const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1;
      const ctx = canvas.getContext('2d');
      const rgb = color => { ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = color; ctx.fillRect(0, 0, 1, 1); return [...ctx.getImageData(0, 0, 1, 1).data]; };
      const lum = color => color.slice(0, 3).map(value => value / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4).reduce((sum, value, i) => sum + value * [.2126, .7152, .0722][i], 0);
      return ['.sub', '.asap-summary', '.asap-coverage', '.course-card-status', '.header-install', 'nav a.active'].map(selector => {
        const node = document.querySelector(selector); let parent = node; let bg;
        while (parent) { bg = rgb(getComputedStyle(parent).backgroundColor); if (bg[3] === 255) break; parent = parent.parentElement; }
        const fg = lum(rgb(getComputedStyle(node).color)), back = lum(bg);
        return [selector, (Math.max(fg, back) + .05) / (Math.min(fg, back) + .05)];
      });
    });
    for (const [selector, ratio] of contrast) assert(ratio >= 4.5, `${selector} text contrast ${ratio.toFixed(2)} is too low`);
    if (process.env.UI_SCREENSHOT_DIR) { fs.mkdirSync(process.env.UI_SCREENSHOT_DIR, { recursive: true }); await page.screenshot({ path: path.join(process.env.UI_SCREENSHOT_DIR, 'overview-desktop.png'), fullPage: true }); }
    assert.equal(await page.locator('.asap-card[aria-expanded="false"]').count(), 4);
    assert.equal((await visible()).length, 4);
    await page.locator('#asap-synthesize').click();
    assert.deepEqual(await visible(), ['apwh', 'apush']);
    assert.equal(await page.locator('#asap-panel-synthesize').isVisible(), true);
    assert.match(await page.locator('.asap-unassigned').textContent(), /APUSH/);
    await page.locator('#asap-align').focus(); await page.keyboard.press('Enter');
    assert.deepEqual(await visible(), ['humgeo', 'apush']);
    await page.keyboard.press('Space'); assert.equal((await visible()).length, 4);
    await page.keyboard.press('Enter'); await page.keyboard.press('Escape');
    assert.equal(await page.locator('#asap-align').getAttribute('aria-expanded'), 'false');
    assert.equal(await page.locator('#asap-align').evaluate(node => node === document.activeElement), true);
    await page.locator('#asap-prove').click(); assert.deepEqual(await visible(), ['apush']);
    await page.locator('#asap-show-all').click(); assert.equal((await visible()).length, 4);
    await page.setViewportSize({ width: 375, height: 812 });
    await page.locator('#asap-assemble').click();
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'Mobile document overflows');
    const old = new Date(now - 48 * 3600000).toISOString();
    data.claims[0].observed_at = old; processValue.courses.humgeo.as_of = old;
    await page.evaluate(async () => { await AP4_DASHBOARD.refresh(); });
    assert.deepEqual(await visible(), ['humgeo', 'apush', 'psych']);
    assert.match(await page.locator('[data-course-card="humgeo"] .course-asap-position').textContent(), /stale/);
    processFails = true; await page.reload(); await ready();
    assert.match(await page.locator('#asap-stage-view').textContent(), /unavailable/);
    assert.equal((await visible()).length, 4);
    assert.equal(await page.locator('.asap-card').count(), 0);
    processFails = false;
    await page.goto('https://asap.test/humgeo.html'); await ready();
    assert.equal(await page.locator('.population-coverage tbody tr').count(), generated.population_scope.length);
    assert.equal(await page.locator('.population-recorded').count(), 0);
    assert.equal(await page.locator('#population-course').count(), 0, 'A course page must not switch to another course silently');
    await page.getByRole('link', {name:'APWH',exact:true}).click(); await ready();
    assert.equal(await page.locator('.population-recorded').count(), 1);
    assert.match(await page.locator('.population-recorded').textContent(), /0 \/ 10 accepted/);
    assert.equal(await page.locator('.population-pending').count(), generated.population_scope.length-1);
    assert.match(await page.locator('.population-pending').first().textContent(), /no finding about course completion/);
    processFails = true; await page.reload(); await ready();
    assert.match(await page.locator('[data-population-coverage]').textContent(), /unavailable/);
    assert.equal(await page.locator('.population-recorded').count(), 0);
    processFails = false;
    for (const filename of fs.readdirSync(__dirname).filter(name => name.endsWith('.html'))) {
      await page.goto(`https://asap.test/${filename}`);
      assert.deepEqual(await page.locator('nav[aria-label="Main navigation"] > a').allTextContents(), ['Courses','Docs','Impact'], filename);
      assert.equal(await page.locator('footer a[href="about.html"]').count(), 1, filename);
      const links = await page.locator('a[href]').evaluateAll(links => links.map(a => a.getAttribute('href')).filter(h => !/^(https?:|mailto:|#)/.test(h)));
      for (const href of links) { const target=href.split(/[?#]/)[0]; if(target) assert(fs.existsSync(path.join(__dirname,target)), `${filename} has broken local link: ${href}`); }
      assert.equal(await page.locator('.site-header a[href="https://github.com/joshuadurey-del/ap-four-course-dashboard"]').count(), 1, filename);
      assert.equal(await page.locator('.skip-link').count(), 1, filename);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${filename} overflows on mobile`);
    }
    await page.goto('https://asap.test/about.html');
    assert.equal(await page.locator('footer a[href="about.html"]').count(), 1);
    assert.equal(await page.locator('#install').count(), 1);
    await page.locator('.skip-link').focus(); await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(() => location.hash), '#main-content');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'main-content');
    await page.evaluate(() => { document.activeElement.blur(); scrollTo(0, 0); });
    if (process.env.UI_SCREENSHOT_DIR) await page.screenshot({ path: path.join(process.env.UI_SCREENSHOT_DIR, 'about-mobile.png'), fullPage: true });
    await page.goto('https://asap.test/economics.html');
    assert.match(await page.locator('#roi-result').textContent(), /Enter all five/);
    for (const [field, value] of Object.entries({ courses: 4, hours: 10, rate: 100, investment: 1000, operating: 100 })) await page.locator(`#roi-${field}`).fill(String(value));
    assert.match(await page.locator('#roi-result').textContent(), /\$2,600/);
    assert.match(await page.locator('#roi-result').textContent(), /260\.0%/);
    await page.locator('#roi-operating').fill('');
    assert.match(await page.locator('#roi-result').textContent(), /Enter all five/);
    await page.locator('#roi-operating').fill('0');
    assert.match(await page.locator('#roi-result').textContent(), /\$3,000/);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'ROI mobile overflow');
    if (process.env.UI_SCREENSHOT_DIR) await page.screenshot({ path: path.join(process.env.UI_SCREENSHOT_DIR, 'economics-mobile.png'), fullPage: true });
    assert.deepEqual(errors, []);
    console.log('Site browser PASS: Home/install, workspace routing, stage filters, course coverage, stale/failed loads, all-page links, mobile, keyboard/focus, About and Impact.');
  } finally { await browser.close(); }
}
if (process.argv.includes('--browser')) browserCheck().catch(error => { console.error(error); process.exitCode = 1; });
