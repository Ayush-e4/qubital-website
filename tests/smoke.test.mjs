/**
 * Browser-free smoke suite.
 *
 * Covers the things that break silently: locale routing, redirects from the old
 * site's URLs, canonical/hreflang, titles, the sitemap, cache headers and the
 * contact endpoint. Everything here is plain HTTP against a production server,
 * so it runs in a few seconds and is safe to gate CI on.
 *
 * Interactive behaviour (language switcher, mobile menu, theme toggle) is
 * deliberately NOT here — that is tests/browser/interactions.mjs, run locally.
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
// A second server, started only for the rate-limit cases: they need a tiny
// budget, and the main server is deliberately given a large one so the
// validation cases do not trip it and start returning 429 mid-suite.
const LIMITER_PORT = PORT + 1;
const LIMITER_BASE = `http://localhost:${LIMITER_PORT}`;
const LIMITER_MAX = 2;
const LIMITER_WINDOW_MS = 1500;
// TEST-NET-3 (RFC 5737) documentation addresses — never real clients, so these
// cannot collide with a genuine caller.
const LIMITER_IP = '198.51.100.10';
const OTHER_IP = '198.51.100.20';
const SITE = 'https://qubital.eu';

/**
 * Every page and its URL per locale. This mirrors `pathnames` in
 * src/i18n/routing.ts on purpose: it is the public URL contract, so a change
 * there should be a deliberate change here too.
 */
const ROUTES = {
  home: { de: '/de', en: '/en' },
  services: { de: '/de/leistungen', en: '/en/services' },
  platforms: { de: '/de/plattformen', en: '/en/platforms' },
  about: { de: '/de/ueber-uns', en: '/en/about' },
  approach: { de: '/de/vorgehen', en: '/en/approach' },
  industries: { de: '/de/branchen', en: '/en/industries' },
  careers: { de: '/de/karriere', en: '/en/careers' },
  contact: { de: '/de/kontakt', en: '/en/contact' },
  imprint: { de: '/de/impressum', en: '/en/imprint' },
  privacy: { de: '/de/datenschutz', en: '/en/privacy' },
};
const LOCALES = ['de', 'en'];
const DEFAULT_LOCALE = 'de';

/** @type {{route: string, locale: string, path: string, html: string}[]} */
const entries = [];
let sitemapLocs = [];
let server;
let limiterServer;
let serverStderr = '';

async function waitForReady(base = BASE, timeoutMs = 60_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      if ((await fetch(`${base}/en`)).ok) return;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error(
    `next start never became ready on ${base}.` +
      (serverStderr ? `\n--- server stderr ---\n${serverStderr}` : '')
  );
}

/**
 * Start a production server.
 *
 * GRAPH_CLIENT_SECRET is pinned to the empty string, not deleted. The contact
 * endpoint then takes its "not configured" path, so the suite can never send
 * real email — and because Next will not let .env.local override a variable
 * that is already present in process.env, an empty string pins that behaviour
 * even on a machine holding a real key.
 */
function startServer(port, extraEnv) {
  const child = spawn(process.execPath, [NEXT_BIN, 'start', '--port', String(port)], {
    env: { ...process.env, NODE_ENV: 'production', GRAPH_CLIENT_SECRET: '', ...extraEnv },
    stdio: ['ignore', 'ignore', 'pipe'],
  });
  child.stderr.on('data', (d) => {
    serverStderr += d.toString();
  });
  return child;
}

before(async () => {
  assert.ok(
    existsSync(new URL('../.next/BUILD_ID', import.meta.url)),
    'No production build found. Run `npm run build` first.'
  );

  // The main server gets a large rate-limit budget so the validation cases below
  // do not consume it and start returning 429 partway through the suite.
  server = startServer(PORT, { CONTACT_RATE_LIMIT_MAX: '100' });
  limiterServer = startServer(LIMITER_PORT, {
    CONTACT_RATE_LIMIT_MAX: String(LIMITER_MAX),
    CONTACT_RATE_LIMIT_WINDOW_MS: String(LIMITER_WINDOW_MS),
  });

  await waitForReady();
  await waitForReady(LIMITER_BASE);

  const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
  sitemapLocs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

  for (const [route, paths] of Object.entries(ROUTES)) {
    for (const locale of LOCALES) {
      const path = paths[locale];
      entries.push({ route, locale, path, html: await (await fetch(BASE + path)).text() });
    }
  }
});

after(() => {
  server?.kill('SIGTERM');
  limiterServer?.kill('SIGTERM');
});

const attr = (html, re) => html.match(re)?.[1];
const routeCount = Object.keys(ROUTES).length;

test('sitemap lists every route for every locale', () => {
  assert.equal(sitemapLocs.length, routeCount * LOCALES.length);
  for (const paths of Object.values(ROUTES)) {
    for (const locale of LOCALES) {
      const expected = SITE + paths[locale];
      assert.ok(sitemapLocs.includes(expected), `sitemap missing ${expected}`);
    }
  }
});

test('every sitemap URL returns 200', async () => {
  const bad = [];
  for (const url of sitemapLocs) {
    const res = await fetch(url.replace(SITE, BASE), { redirect: 'manual' });
    if (res.status !== 200) bad.push(`${url} -> ${res.status}`);
  }
  assert.deepEqual(bad, []);
});

test('canonical is self-referencing for every route and locale', () => {
  const bad = [];
  for (const { path, html } of entries) {
    const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
    if (canonical !== SITE + path) bad.push(`${path}: got ${canonical}, want ${SITE + path}`);
  }
  assert.deepEqual(bad, []);
});

test('hreflang cluster covers every locale plus x-default', () => {
  const bad = [];
  for (const { route, path, html } of entries) {
    for (const locale of LOCALES) {
      const href = attr(html, new RegExp(`hreflang="${locale}" href="([^"]*)"`, 'i'));
      const expected = SITE + ROUTES[route][locale];
      if (href !== expected) bad.push(`${path} [${locale}]: got ${href}, want ${expected}`);
    }
    const xDefault = attr(html, /hreflang="x-default" href="([^"]*)"/i);
    const expectedDefault = SITE + ROUTES[route][DEFAULT_LOCALE];
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

// --- locale routing policy (src/proxy.ts) -----------------------------------

const rootRedirect = (headers) => fetch(`${BASE}/`, { redirect: 'manual', headers });
const locationPath = (res) => new URL(res.headers.get('location'), BASE).pathname;

test('root redirects a German browser to /de', async () => {
  const res = await rootRedirect({ 'accept-language': 'de-DE,de;q=0.9' });
  assert.equal(res.status, 307);
  assert.equal(locationPath(res), '/de');
});

test('root redirects an English browser to /en', async () => {
  const res = await rootRedirect({ 'accept-language': 'en-US,en;q=0.9' });
  assert.equal(res.status, 307);
  assert.equal(locationPath(res), '/en');
});

test('root falls back to German for an unsupported language', async () => {
  const res = await rootRedirect({ 'accept-language': 'fr-FR,fr;q=0.9' });
  assert.equal(res.status, 307);
  assert.equal(locationPath(res), '/de');
});

test('the NEXT_LOCALE cookie wins over Accept-Language', async () => {
  const res = await rootRedirect({ 'accept-language': 'de-DE,de;q=0.9', cookie: 'NEXT_LOCALE=en' });
  assert.equal(res.status, 307);
  assert.equal(locationPath(res), '/en');
});

test('the language redirect is never stored by a shared cache', async () => {
  const res = await rootRedirect({ 'accept-language': 'de-DE,de;q=0.9' });
  assert.equal(res.headers.get('cache-control'), 'no-store');
});

test('locale pages are edge-cacheable', async () => {
  const res = await fetch(`${BASE}/de/leistungen`, { redirect: 'manual' });
  assert.equal(res.status, 200);
  assert.match(res.headers.get('cache-control') ?? '', /public, s-maxage=3600/);
});

test('security headers are sent', async () => {
  const res = await fetch(`${BASE}/en`, { redirect: 'manual' });
  const csp = res.headers.get('content-security-policy') ?? '';
  assert.match(csp, /default-src 'self'/);
  assert.match(csp, /connect-src 'self' https:\/\/eu\.i\.posthog\.com/);
  assert.equal(res.headers.get('x-content-type-options'), 'nosniff');
  assert.ok(res.headers.get('strict-transport-security'));
});

// --- redirects from the previous site (next.config.ts) ----------------------

test('old URLs redirect permanently to their new pages', async () => {
  const cases = {
    '/about': '/en/about',
    '/mission': '/en/about',
    '/why-us': '/en',
    '/services': '/en/services',
    '/careers': '/en/careers',
    '/contact': '/en/contact',
    '/compliance': '/en/services',
    '/privacy-and-gdpr': '/en/privacy',
    '/impressum': '/en/imprint',
    '/de/about': '/de/ueber-uns',
    '/de/services': '/de/leistungen',
    '/de/careers': '/de/karriere',
    '/de/contact': '/de/kontakt',
    '/de/privacy-and-gdpr': '/de/datenschutz',
    '/fr': '/en',
    '/fr/services': '/en/services',
    '/es/about': '/en/about',
    '/it/contact': '/en/contact',
    '/nl/impressum': '/en/imprint',
    '/nl/some-old-page': '/en',
  };
  const bad = [];
  for (const [from, to] of Object.entries(cases)) {
    const res = await fetch(BASE + from, { redirect: 'manual' });
    if (res.status !== 308 || locationPath(res) !== to) {
      bad.push(`${from}: ${res.status} -> ${res.headers.get('location')}, want 308 -> ${to}`);
    }
  }
  assert.deepEqual(bad, []);
});

test('/de/impressum keeps working unchanged', async () => {
  const res = await fetch(`${BASE}/de/impressum`, { redirect: 'manual' });
  assert.equal(res.status, 200);
});

// --- contact endpoint (src/app/api/contact/route.ts) ------------------------
//
// The server is started with GRAPH_CLIENT_SECRET='' above, so the "not configured"
// path is what a valid submission hits. That is what makes the honeypot case
// below meaningful: reaching 200 proves the request short-circuited before the
// config check, i.e. nothing was sent.

const postContact = (body, { base = BASE, ip } = {}) =>
  fetch(`${base}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Set explicitly wherever rate limiting is under test. The limiter keys on
      // this header, so a test that depends on limiting must control it rather
      // than rely on whether `next start` happens to synthesise one.
      ...(ip ? { 'x-forwarded-for': ip } : {}),
    },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });

const validSubmission = () => ({
  fullName: 'Ada Lovelace',
  email: 'ada@example.com',
  organization: 'Analytical Engines Ltd',
  domain: 'pam',
  message: 'We need help modernising a legacy estate spread across four regions.',
  consent: true,
  locale: 'en',
  website: '',
});

test('a valid submission is rejected loudly when email is not configured', async () => {
  const res = await postContact(validSubmission());
  // Not 200. The form used to claim success unconditionally; an unconfigured
  // endpoint must surface as an error instead of silently dropping the lead.
  assert.equal(res.status, 500);
  assert.deepEqual(await res.json(), { error: 'not_configured' });
});

test('invalid submissions are rejected with 400', async () => {
  const cases = {
    'missing name': { ...validSubmission(), fullName: '' },
    'one-character name': { ...validSubmission(), fullName: 'A' },
    'malformed email': { ...validSubmission(), email: 'not-an-email' },
    'missing domain': { ...validSubmission(), domain: '' },
    'empty message': { ...validSubmission(), message: '' },
    'too-short message': { ...validSubmission(), message: 'too short' },
    'oversized message': { ...validSubmission(), message: 'x'.repeat(5001) },
    'overlong name': { ...validSubmission(), fullName: 'A'.repeat(101) },
    'overlong organization': { ...validSubmission(), organization: 'x'.repeat(201) },
    // The rules are shared with the browser, so anything the form can reject
    // must be rejected here too — a client-only check is not a check.
    'consent withheld': { ...validSubmission(), consent: false },
    'consent not a boolean': { ...validSubmission(), consent: 'yes' },
    'array instead of object': [],
    'null payload': null,
  };

  const bad = [];
  for (const [label, body] of Object.entries(cases)) {
    const res = await postContact(body);
    if (res.status !== 400) bad.push(`${label} -> ${res.status}`);
  }
  assert.deepEqual(bad, []);
});

test('a malformed JSON body is rejected with 400', async () => {
  const res = await postContact('{"fullName": ');
  assert.equal(res.status, 400);
});

test('the honeypot is answered like a success and sends nothing', async () => {
  const res = await postContact({ ...validSubmission(), website: 'http://spam.example' });
  // 200 rather than 4xx: a bot that gets an error learns to retry without the
  // field. And a real send is impossible here (no API key), so a 200 proves the
  // honeypot returned before the send was ever reached.
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });
});

test('GET on the contact endpoint is not allowed', async () => {
  const res = await fetch(`${BASE}/api/contact`);
  assert.equal(res.status, 405);
});

test('rate limiter blocks past the budget and reports Retry-After', async () => {
  const statuses = [];
  let retryAfter;
  for (let attempt = 0; attempt < LIMITER_MAX + 1; attempt += 1) {
    const res = await postContact(validSubmission(), { base: LIMITER_BASE, ip: LIMITER_IP });
    statuses.push(res.status);
    if (res.status === 429) retryAfter = res.headers.get('retry-after');
  }

  // The first LIMITER_MAX requests reach the handler (and stop at the
  // not-configured 500); only the one past the budget is turned away.
  assert.deepEqual(statuses, [...Array(LIMITER_MAX).fill(500), 429]);
  assert.ok(Number(retryAfter) > 0, 'a 429 must tell the caller when to retry');
});

test('the rate-limit budget is per client address, not global', async () => {
  // LIMITER_IP is out of budget from the previous test and the window has not
  // elapsed, so a different address must still be served — per-IP keying is the
  // difference between throttling one abuser and locking out every visitor.
  const res = await postContact(validSubmission(), { base: LIMITER_BASE, ip: OTHER_IP });
  assert.equal(res.status, 500, 'a fresh address keeps its own budget');
});

test('rate limiter forgets requests once the window has passed', async () => {
  // The limiter server's window is short precisely so this does not need a sleep
  // measured in minutes.
  await new Promise((r) => setTimeout(r, LIMITER_WINDOW_MS + 200));
  const res = await postContact(validSubmission(), { base: LIMITER_BASE, ip: LIMITER_IP });
  assert.equal(res.status, 500, 'the budget should be available again');
});
