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
      // Selected by aria-controls, not by accessible name: the labels are
      // localised, so matching on English wording would only pass on /en.
      await page.locator('button[aria-controls="header-language-menu"]').click();
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

      const trigger = page.locator('button[aria-controls="header-mobile-menu"]');
      await trigger.click();

      // Focus must land inside the panel, otherwise the drawer is unreachable
      // by keyboard.
      assert.equal(
        await page.evaluate(() =>
          Boolean(document.querySelector('#header-mobile-menu')?.contains(document.activeElement))
        ),
        true,
        'focus should move into the drawer when it opens'
      );

      await page.getByRole('link', { name: 'Leistungen' }).first().click();
      await page.waitForURL('**/de/services');
      assert.equal(await trigger.getAttribute('aria-expanded'), 'false');
      assert.notEqual(await page.evaluate(() => document.body.style.overflow), 'hidden');
    },
  ],
  [
    'homepage content is readable with JavaScript disabled',
    async () => {
      // Scroll-reveal is scoped to the `.js` class, which only exists when
      // scripting does. With JS off the page must render fully — the old
      // implementation server-rendered `opacity: 0` and left whole sections
      // invisible. Playwright's isVisible() ignores opacity, so assert the
      // computed value directly.
      const ctx = await browser.newContext({ javaScriptEnabled: false });
      const noJsPage = await ctx.newPage();
      await noJsPage.goto(`${BASE}/`, { waitUntil: 'load' });

      const heading = noJsPage.getByRole('heading', { name: /Core Capabilities/i }).first();
      await heading.waitFor();

      // An ancestor at opacity 0 hides an element just as effectively as the
      // element itself, and Playwright's isVisible() ignores opacity entirely.
      // Walk the chain — this is exactly how PageTransition used to blank the
      // entire document while every element's own opacity read as 1.
      const hiddenBy = await heading.evaluate((el) => {
        let node = el;
        while (node && node !== document.documentElement) {
          if (Number(getComputedStyle(node).opacity) === 0) {
            return `${node.tagName.toLowerCase()}.${(node.className || '').toString().split(' ')[0]}`;
          }
          node = node.parentElement;
        }
        return null;
      });
      assert.equal(
        hiddenBy,
        null,
        `services heading hidden by ancestor ${hiddenBy} with JS disabled`
      );

      // The metrics are drawn by a counter; the value must still exist as text.
      const metricNumber = await noJsPage
        .locator('span.inline-block.tracking-normal')
        .first()
        .textContent();
      assert.ok(
        /\d/.test(metricNumber ?? ''),
        `metric number should render without JS, got "${metricNumber}"`
      );

      await ctx.close();
    },
  ],
  [
    'header does not collide with the language switcher at 320px',
    async (page) => {
      await page.setViewportSize({ width: 320, height: 640 });
      await page.goto(`${BASE}/`, { waitUntil: 'load' });

      // Measure the logo link itself: below `xs` it is the mark alone, above it
      // the wordmark shows too, and either way it must not reach the switcher.
      const logo = page.locator('header a[href="/"]').first();
      const langButton = page.locator('button[aria-controls="header-language-menu"]');
      const brandBox = await logo.boundingBox();
      const langBox = await langButton.boundingBox();

      assert.ok(brandBox && langBox, 'logo and language switcher should both be measurable');
      assert.ok(
        brandBox.x + brandBox.width <= langBox.x + 1,
        `logo overlaps the language switcher (ends at ${Math.round(
          brandBox.x + brandBox.width
        )}, switcher starts at ${Math.round(langBox.x)})`
      );

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      assert.ok(overflow <= 1, `page overflows horizontally by ${overflow}px at 320px`);
    },
  ],
  [
    'form controls are at least 16px on mobile (no iOS focus zoom)',
    async (page) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(`${BASE}/contact`, { waitUntil: 'load' });
      await page.locator('form').first().waitFor();

      const tooSmall = await page.$$eval(
        'input:not([type="hidden"]):not([type="checkbox"]):not(#website), select, textarea',
        (els) =>
          els
            .map((el) => ({
              tag: el.tagName.toLowerCase(),
              id: el.id || el.name,
              px: parseFloat(getComputedStyle(el).fontSize),
            }))
            .filter(({ px }) => px < 16)
      );

      assert.deepEqual(tooSmall, [], `controls below 16px: ${JSON.stringify(tooSmall)}`);
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
