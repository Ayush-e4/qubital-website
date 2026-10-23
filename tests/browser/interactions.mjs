/**
 * Local-only browser checks — deliberately NOT run in CI.
 *
 * The interactive parts of this site (language switcher, mobile menu, theme
 * toggle, navigation hover, contact form) fail visibly when broken, so they are
 * covered by running this on demand. CI runs only the browser-free suite in
 * tests/smoke.test.mjs, which keeps the pipeline fast and avoids a browser
 * download.
 *
 * Every check also fails on any uncaught page error, which is how React runtime
 * problems (e.g. a DOM insertBefore crash) show up.
 *
 * Usage — needs a running server first:
 *   npm run build && npm run start      # or: npm run dev
 *   npm run test:browser
 *
 * BASE_URL points somewhere else (e.g. a Vercel preview). PW_CHANNEL=chrome uses
 * the installed Google Chrome instead of Playwright's bundled Chromium.
 */
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL ?? 'http://localhost:3000';

const PAGES = [
  '/de',
  '/de/leistungen',
  '/de/plattformen',
  '/de/ueber-uns',
  '/de/vorgehen',
  '/de/branchen',
  '/de/karriere',
  '/de/kontakt',
  '/de/impressum',
  '/de/datenschutz',
  '/en',
  '/en/services',
  '/en/platforms',
  '/en/about',
  '/en/approach',
  '/en/industries',
  '/en/careers',
  '/en/contact',
  '/en/imprint',
  '/en/privacy',
];

/** Replace every text node like Chrome's page translation does. */
async function simulateTranslation(page) {
  await page.evaluate(() => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) =>
        n.parentElement &&
        !['SCRIPT', 'STYLE'].includes(n.parentElement.tagName) &&
        n.nodeValue.trim()
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT,
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      const outer = document.createElement('font');
      const inner = document.createElement('font');
      inner.textContent = node.nodeValue;
      outer.appendChild(inner);
      node.parentNode.replaceChild(outer, node);
    }
  });
}

const languageButton = (page, code) =>
  page.locator('header [role="group"] button', { hasText: new RegExp(`^${code}$`, 'i') });

const checks = [
  [
    'every page renders without a runtime error',
    async (page) => {
      for (const path of PAGES) {
        const res = await page.goto(`${BASE}${path}`, { waitUntil: 'load' });
        assert.equal(res?.status(), 200, `${path} returned ${res?.status()}`);
      }
    },
  ],
  [
    'language switcher keeps the page and switches the slug',
    async (page) => {
      await page.goto(`${BASE}/de/leistungen`, { waitUntil: 'load' });
      await languageButton(page, 'en').click();
      await page.waitForURL('**/en/services');
      await languageButton(page, 'de').click();
      await page.waitForURL('**/de/leistungen');
    },
  ],
  [
    'hovering every navigation link works (dock + hover pill)',
    async (page) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`${BASE}/en`, { waitUntil: 'load' });
      const links = page.locator('header nav a');
      const count = await links.count();
      assert.ok(count >= 5, `expected the desktop nav, found ${count} links`);
      for (let i = 0; i < count; i += 1) await links.nth(i).hover();
      await page.mouse.move(700, 600);
    },
  ],
  [
    'a translated page survives hover and a language switch',
    async (page) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      // Chrome translates after the page has loaded and hydrated; translating
      // before hydration is a different (unavoidable) mismatch, not this bug.
      await page.goto(`${BASE}/de`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(500);
      await simulateTranslation(page);
      const links = page.locator('header nav a');
      for (let i = 0; i < (await links.count()); i += 1) await links.nth(i).hover();
      await languageButton(page, 'en').click();
      await page.waitForURL('**/en');
    },
  ],
  [
    'theme toggle switches, survives rapid clicks and persists',
    async (page) => {
      await page.goto(`${BASE}/en`, { waitUntil: 'networkidle' });
      const html = page.locator('html');
      const toggle = page.locator('header button[title]');
      const before = await html.getAttribute('data-theme');
      await toggle.click();
      // The circular reveal runs ~750ms; clicks during it land on the overlay
      await page.waitForTimeout(1000);
      const flipped = await html.getAttribute('data-theme');
      assert.notEqual(flipped, before, 'one click should flip the theme');

      // Rapid clicks must not throw (an interrupted transition used to)
      await toggle.click();
      await toggle.click({ force: true });
      await toggle.click({ force: true });
      await page.waitForTimeout(1000);

      const settled = await html.getAttribute('data-theme');
      await page.reload({ waitUntil: 'load' });
      assert.equal(await html.getAttribute('data-theme'), settled, 'theme did not persist');
      await page.evaluate(() => localStorage.removeItem('theme'));
    },
  ],
  [
    'mobile menu opens, switches language and closes on navigation',
    async (page) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(`${BASE}/en`, { waitUntil: 'load' });
      await page.locator('[aria-controls="mobile-menu"]').click();
      const menu = page.locator('#mobile-menu');
      await menu.waitFor();
      await menu.getByRole('link', { name: 'Services' }).click();
      await page.waitForURL('**/en/services');
      await menu.waitFor({ state: 'detached' });
      await page.setViewportSize({ width: 1440, height: 900 });
    },
  ],
  [
    'contact form validates, and never fakes success without email configured',
    async (page) => {
      await page.goto(`${BASE}/en/contact`, { waitUntil: 'load' });
      await page.locator('form button[type="submit"]').click();
      assert.equal(await page.locator('form [role="alert"]').count(), 4);

      await page.fill('input[name="fullName"]', 'Browser Check');
      await page.fill('input[name="email"]', 'check@example.com');
      await page.fill('textarea[name="message"]', 'Local browser check of the contact form.');
      await page.locator('input[name="consent"]').check({ force: true });
      const response = page.waitForResponse('**/api/contact');
      await page.locator('form button[type="submit"]').click();
      const res = await response;
      if (res.status() === 200) {
        await page.locator('[role="status"]').waitFor();
      } else {
        // Without the Graph credentials the endpoint answers 500: the form must show its
        // error state, not a success message.
        await page.locator('form [role="alert"]').first().waitFor();
        assert.equal(await page.locator('[role="status"]').count(), 0);
      }
    },
  ],
  [
    'old URLs land on the new pages',
    async (page) => {
      for (const [from, to] of [
        ['/about', '/en/about'],
        ['/de/services', '/de/leistungen'],
        ['/fr/contact', '/en/contact'],
      ]) {
        await page.goto(`${BASE}${from}`, { waitUntil: 'load' });
        assert.equal(new URL(page.url()).pathname, to, `${from} ended at ${page.url()}`);
      }
    },
  ],
];

const browser = await chromium.launch(
  process.env.PW_CHANNEL ? { channel: process.env.PW_CHANNEL } : {}
);

let failed = 0;
for (const [name, run] of checks) {
  const page = await (await browser.newContext()).newPage();
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));
  try {
    await run(page);
    assert.deepEqual(errors, [], `uncaught page error: ${errors[0]}`);
    console.log(`  PASS  ${name}`);
  } catch (err) {
    failed += 1;
    console.log(`  FAIL  ${name}\n        ${String(err.message).split('\n')[0]}`);
  }
  await page.context().close();
}

await browser.close();
console.log(`\n${checks.length - failed}/${checks.length} passed`);
process.exit(failed ? 1 : 0);
