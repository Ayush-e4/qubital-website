/**
 * Local-only browser checks — deliberately NOT run in CI.
 *
 * The interactive parts of this site (language switcher, mobile drawer) fail
 * visibly when broken, so they are covered by manual checks and by running this
 * on demand. CI runs only the browser-free suite in tests/smoke.test.mjs, which
 * keeps the pipeline fast and avoids a browser download.
 *
 * Usage — needs a running server first:
 *   npm run build && npm run start      # or: npm run dev
 *   npm run test:browser
 *
 * Set BASE_URL to point somewhere else, e.g. a Vercel preview.
 */
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL ?? 'http://localhost:3000';

const checks = [
  [
    'language switcher preserves the page (header dropdown)',
    async (page) => {
      await page.goto(`${BASE}/about`, { waitUntil: 'load' });
      await page.getByRole('button', { name: 'Change Language' }).click();
      await page
        .getByRole('link', { name: /Deutsch/ })
        .first()
        .click();
      await page.waitForURL('**/de/about');
      assert.match(page.url(), /\/de\/about$/);
    },
  ],
  [
    'switching back to English drops the locale prefix',
    async (page) => {
      await page.goto(`${BASE}/de/about`, { waitUntil: 'load' });
      await page.getByRole('link', { name: 'English', exact: true }).first().click();
      await page.waitForURL('**/about');
      assert.match(page.url(), /\/about$/);
    },
  ],
  [
    'locale content actually renders in that language',
    async (page) => {
      await page.goto(`${BASE}/fr/services`, { waitUntil: 'load' });
      assert.equal(await page.locator('html').getAttribute('lang'), 'fr');
      await page.getByRole('link', { name: 'Pourquoi nous' }).first().waitFor();
    },
  ],
  [
    'mobile drawer closes on navigation and releases the scroll lock',
    async (page) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE}/de/about`, { waitUntil: 'load' });
      await page.getByRole('button', { name: 'Open menu' }).click();
      await page.getByRole('link', { name: 'Leistungen' }).first().click();
      await page.waitForURL('**/de/services');
      const expanded = await page
        .getByRole('button', { name: 'Open menu' })
        .getAttribute('aria-expanded');
      assert.equal(expanded, 'false');
      assert.notEqual(await page.evaluate(() => document.body.style.overflow), 'hidden');
    },
  ],
];

const browser = await chromium.launch();
const page = await (await browser.newContext()).newPage();

let failed = 0;
for (const [name, run] of checks) {
  try {
    await run(page);
    console.log(`  PASS  ${name}`);
  } catch (err) {
    failed += 1;
    console.log(`  FAIL  ${name}\n        ${String(err.message).split('\n')[0]}`);
  }
}

await browser.close();
console.log(`\n${checks.length - failed}/${checks.length} passed`);
process.exit(failed ? 1 : 0);
