/**
 * Browser-free smoke suite.
 *
 * Covers the things that break silently: locale routing, canonical/hreflang,
 * titles and the sitemap. Everything here is plain HTTP against a production
 * server, so it runs in a couple of seconds and is safe to gate CI on.
 *
 * Interactive behaviour (language switcher, mobile drawer) is deliberately NOT
 * here — that is tests/browser/interactions.mjs, run locally on demand.
 *
 * Requires a build first:  npm run build && npm test
 */
import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const NEXT_BIN = require.resolve('next/dist/bin/next');

const PORT = Number(process.env.SMOKE_PORT ?? 3123);
const BASE = `http://localhost:${PORT}`;
const SITE = 'https://qubital.eu';

const ROUTES = [
  '/',
  '/about',
  '/mission',
  '/why-us',
  '/services',
  '/careers',
  '/contact',
  '/compliance',
  '/privacy-and-gdpr',
  '/impressum',
];
const LOCALES = ['en', 'de', 'fr', 'es', 'it', 'nl'];

const pathFor = (route, locale) =>
  locale === 'en' ? route : `/${locale}${route === '/' ? '' : route}`;

/** Absolute URL for a route+locale. The root has no trailing slash. */
const absoluteFor = (route, locale) => SITE + pathFor(route, locale).replace(/\/$/, '');

/** @type {{route: string, locale: string, path: string, html: string}[]} */
const entries = [];
let sitemapLocs = [];
let server;
let serverStderr = '';

async function waitForReady(timeoutMs = 60_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      if ((await fetch(`${BASE}/`)).ok) return;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error(
    `next start never became ready on ${BASE}.` +
      (serverStderr ? `\n--- server stderr ---\n${serverStderr}` : '')
  );
}

before(async () => {
  assert.ok(
    existsSync(new URL('../.next/BUILD_ID', import.meta.url)),
    'No production build found. Run `npm run build` first.'
  );

  server = spawn(process.execPath, [NEXT_BIN, 'start', '--port', String(PORT)], {
    env: { ...process.env, NODE_ENV: 'production' },
    stdio: ['ignore', 'ignore', 'pipe'],
  });
  server.stderr.on('data', (d) => {
    serverStderr += d.toString();
  });

  await waitForReady();

  const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
  sitemapLocs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

  for (const route of ROUTES) {
    for (const locale of LOCALES) {
      const path = pathFor(route, locale);
      entries.push({ route, locale, path, html: await (await fetch(BASE + path)).text() });
    }
  }
});

after(() => {
  server?.kill('SIGTERM');
});

const attr = (html, re) => html.match(re)?.[1];

test('sitemap lists every route for every locale', () => {
  assert.equal(sitemapLocs.length, ROUTES.length * LOCALES.length);
  for (const route of ROUTES) {
    for (const locale of LOCALES) {
      const expected = absoluteFor(route, locale);
      assert.ok(sitemapLocs.includes(expected), `sitemap missing ${expected}`);
    }
  }
});

test('every sitemap URL returns 200', async () => {
  const bad = [];
  for (const url of sitemapLocs) {
    const res = await fetch(url.replace(SITE, BASE));
    if (res.status !== 200) bad.push(`${url} -> ${res.status}`);
  }
  assert.deepEqual(bad, []);
});

test('canonical is self-referencing for every route and locale', () => {
  const bad = [];
  for (const { path, html } of entries) {
    const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
    const expected = SITE + (path === '/' ? '' : path);
    if (canonical !== expected) bad.push(`${path}: got ${canonical}, want ${expected}`);
  }
  assert.deepEqual(bad, []);
});

test('hreflang cluster covers every locale plus x-default', () => {
  const bad = [];
  for (const { route, path, html } of entries) {
    for (const locale of LOCALES) {
      const href = attr(html, new RegExp(`hreflang="${locale}" href="([^"]*)"`, 'i'));
      const expected = absoluteFor(route, locale);
      if (href !== expected) bad.push(`${path} [${locale}]: got ${href}, want ${expected}`);
    }
    const xDefault = attr(html, /hreflang="x-default" href="([^"]*)"/i);
    const expectedDefault = absoluteFor(route, 'en');
    if (xDefault !== expectedDefault) {
      bad.push(`${path} [x-default]: got ${xDefault}, want ${expectedDefault}`);
    }
  }
  assert.deepEqual(bad, []);
});

test('title, og:title and twitter:title agree and name the brand exactly once', () => {
  const bad = [];
  for (const { path, html } of entries) {
    const title = attr(html, /<title>(.*?)<\/title>/s);
    const og = attr(html, /<meta property="og:title" content="(.*?)"/);
    const twitter = attr(html, /<meta name="twitter:title" content="(.*?)"/);
    if (!title) bad.push(`${path}: no <title>`);
    else if (title !== og || title !== twitter) {
      bad.push(`${path}: title/og/twitter disagree (${title} | ${og} | ${twitter})`);
    } else if (title.split('Qubital').length - 1 !== 1) {
      bad.push(`${path}: brand name repeated in "${title}"`);
    }
  }
  assert.deepEqual(bad, []);
});

test('html lang matches the locale being served', () => {
  const bad = [];
  for (const { locale, path, html } of entries) {
    const lang = attr(html, /<html[^>]*\slang="([^"]*)"/);
    if (lang !== locale) bad.push(`${path}: lang=${lang}, want ${locale}`);
  }
  assert.deepEqual(bad, []);
});

// --- locale routing policy (src/proxy.js) -----------------------------------

test('root auto-detects a supported Accept-Language on a first visit', async () => {
  const res = await fetch(`${BASE}/`, {
    redirect: 'manual',
    headers: { 'accept-language': 'de-DE,de;q=0.9' },
  });
  assert.equal(res.status, 307, 'expected a redirect for a German first-time visitor');
  assert.equal(res.headers.get('location'), '/de');
});

test('root serves English when the browser prefers English', async () => {
  const res = await fetch(`${BASE}/`, {
    redirect: 'manual',
    headers: { 'accept-language': 'en-US,en;q=0.9' },
  });
  assert.equal(res.status, 200);
});

test('root does not redirect once NEXT_LOCALE is set', async () => {
  const res = await fetch(`${BASE}/`, {
    redirect: 'manual',
    headers: { 'accept-language': 'de-DE,de;q=0.9', cookie: 'NEXT_LOCALE=de' },
  });
  assert.equal(res.status, 200, 'a returning visitor must not be redirected again');
});

test('un-prefixed deep links always serve English', async () => {
  const res = await fetch(`${BASE}/about`, {
    headers: { 'accept-language': 'de-DE,de;q=0.9' },
  });
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('x-locale'), 'en');
});
