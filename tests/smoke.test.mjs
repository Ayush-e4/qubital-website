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
  home: {
    de: '/de',
    en: '/en',
    fr: '/fr',
    it: '/it',
    es: '/es',
    nl: '/nl',
    pl: '/pl',
    pt: '/pt',
    sv: '/sv',
    da: '/da',
  },
  services: {
    de: '/de/leistungen',
    en: '/en/services',
    fr: '/fr/services',
    it: '/it/servizi',
    es: '/es/servicios',
    nl: '/nl/diensten',
    pl: '/pl/uslugi',
    pt: '/pt/servicos',
    sv: '/sv/tjanster',
    da: '/da/ydelser',
  },
  platforms: {
    de: '/de/plattformen',
    en: '/en/platforms',
    fr: '/fr/plateformes',
    it: '/it/piattaforme',
    es: '/es/plataformas',
    nl: '/nl/platformen',
    pl: '/pl/platformy',
    pt: '/pt/plataformas',
    sv: '/sv/plattformar',
    da: '/da/platforme',
  },
  about: {
    de: '/de/ueber-uns',
    en: '/en/about',
    fr: '/fr/a-propos',
    it: '/it/chi-siamo',
    es: '/es/sobre-nosotros',
    nl: '/nl/over-ons',
    pl: '/pl/o-nas',
    pt: '/pt/sobre-nos',
    sv: '/sv/om-oss',
    da: '/da/om-os',
  },
  approach: {
    de: '/de/vorgehen',
    en: '/en/approach',
    fr: '/fr/approche',
    it: '/it/approccio',
    es: '/es/enfoque',
    nl: '/nl/aanpak',
    pl: '/pl/podejscie',
    pt: '/pt/abordagem',
    sv: '/sv/arbetssatt',
    da: '/da/tilgang',
  },
  industries: {
    de: '/de/branchen',
    en: '/en/industries',
    fr: '/fr/secteurs',
    it: '/it/settori',
    es: '/es/sectores',
    nl: '/nl/sectoren',
    pl: '/pl/branze',
    pt: '/pt/setores',
    sv: '/sv/branscher',
    da: '/da/brancher',
  },
  careers: {
    de: '/de/karriere',
    en: '/en/careers',
    fr: '/fr/carrieres',
    it: '/it/carriere',
    es: '/es/empleo',
    nl: '/nl/vacatures',
    pl: '/pl/kariera',
    pt: '/pt/carreiras',
    sv: '/sv/karriar',
    da: '/da/karriere',
  },
  contact: {
    de: '/de/kontakt',
    en: '/en/contact',
    fr: '/fr/contact',
    it: '/it/contatti',
    es: '/es/contacto',
    nl: '/nl/contact',
    pl: '/pl/kontakt',
    pt: '/pt/contacto',
    sv: '/sv/kontakt',
    da: '/da/kontakt',
  },
  imprint: {
    de: '/de/impressum',
    en: '/en/imprint',
    fr: '/fr/mentions-legales',
    it: '/it/note-legali',
    es: '/es/aviso-legal',
    nl: '/nl/colofon',
    pl: '/pl/nota-prawna',
    pt: '/pt/aviso-legal',
    sv: '/sv/juridisk-information',
    da: '/da/juridisk-information',
  },
  privacy: {
    de: '/de/datenschutz',
    en: '/en/privacy',
    fr: '/fr/confidentialite',
    it: '/it/privacy',
    es: '/es/privacidad',
    nl: '/nl/privacy',
    pl: '/pl/prywatnosc',
    pt: '/pt/privacidade',
    sv: '/sv/integritet',
    da: '/da/privatliv',
  },
  blog: {
    de: '/de/blog',
    en: '/en/blog',
    fr: '/fr/blog',
    it: '/it/blog',
    es: '/es/blog',
    nl: '/nl/blog',
    pl: '/pl/blog',
    pt: '/pt/blog',
    sv: '/sv/blog',
    da: '/da/blog',
  },
  'blog/iam-query-performance': {
    de: '/de/blog/iam-performance-abfrage-70-sekunden-unter-eine',
    en: '/en/blog/iam-query-performance-70-seconds-to-under-one',
    fr: '/fr/blog/requete-iam-lente-de-70-secondes-a-moins-d-une',
    it: '/it/blog/query-iam-lenta-da-70-secondi-a-meno-di-uno',
    es: '/es/blog/de-70-segundos-a-menos-de-uno-consulta-iam-lenta',
    nl: '/nl/blog/iam-databasequery-van-70-seconden-naar-onder-een-seconde',
    pl: '/pl/blog/z-70-sekund-do-ponizej-jednej-wolne-zapytanie-iam',
    pt: '/pt/blog/de-70-segundos-a-menos-de-um-consulta-iam-lenta',
    sv: '/sv/blog/fran-70-sekunder-till-under-en-langsam-iam-databasfraga',
    da: '/da/blog/fra-70-sekunder-til-under-et-langsom-iam-foresporgsel',
  },
  'blog/non-human-identity-ai-agents': {
    de: '/de/blog/non-human-identities-und-ki-agenten-steuern',
    en: '/en/blog/governing-non-human-identities-and-ai-agents',
    fr: '/fr/blog/identites-non-humaines-et-agents-ia',
    it: '/it/blog/identita-non-umane-agenti-ai-governance',
    es: '/es/blog/identidades-no-humanas-y-agentes-de-ia',
    nl: '/nl/blog/niet-menselijke-identiteiten-en-ai-agents',
    pl: '/pl/blog/tozsamosci-nieosobowe-i-agenci-ai',
    pt: '/pt/blog/identidades-nao-humanas-e-agentes-de-ia',
    sv: '/sv/blog/icke-manskliga-identiteter-och-ai-agenter',
    da: '/da/blog/ikke-menneskelige-identiteter-og-ai-agenter',
  },
  'blog/iga-for-sap': {
    de: '/de/blog/identity-governance-fuer-sap-landschaften',
    en: '/en/blog/identity-governance-for-sap-landscapes',
    fr: '/fr/blog/gouvernance-des-identites-pour-sap',
    it: '/it/blog/identity-governance-sap',
    es: '/es/blog/gobierno-de-identidades-para-entornos-sap',
    nl: '/nl/blog/identity-governance-voor-sap-landschappen',
    pl: '/pl/blog/zarzadzanie-tozsamoscia-w-srodowiskach-sap',
    pt: '/pt/blog/governacao-de-identidades-para-ambientes-sap',
    sv: '/sv/blog/identitetsstyrning-for-sap-miljoer',
    da: '/da/blog/identitetsstyring-for-sap-landskaber',
  },
};
const LOCALES = ['de', 'en', 'fr', 'it', 'es', 'nl', 'pl', 'pt', 'sv', 'da'];
const DEFAULT_LOCALE = 'en';

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

test('root sends each European browser language to its own locale', async () => {
  const cases = {
    'fr-FR,fr;q=0.9': '/fr',
    'fr-BE,fr;q=0.9': '/fr',
    'it-IT,it;q=0.9': '/it',
    'es-ES,es;q=0.9': '/es',
    'nl-NL,nl;q=0.9': '/nl',
    'nl-BE,nl;q=0.9': '/nl',
    'pl-PL,pl;q=0.9': '/pl',
    'pt-PT,pt;q=0.9': '/pt',
    'sv-SE,sv;q=0.9': '/sv',
    'da-DK,da;q=0.9': '/da',
  };
  for (const [lang, want] of Object.entries(cases)) {
    const res = await rootRedirect({ 'accept-language': lang });
    assert.equal(res.status, 307);
    assert.equal(locationPath(res), want, lang);
  }
});

test('root falls back to English for languages the site does not offer', async () => {
  for (const lang of ['cs-CZ,cs;q=0.9', 'fi-FI,fi;q=0.9', 'ja-JP,ja;q=0.9']) {
    const res = await rootRedirect({ 'accept-language': lang });
    assert.equal(locationPath(res), '/en', lang);
  }
});

test('root still sends an Austrian or Swiss German browser to /de', async () => {
  for (const lang of ['de-AT,de;q=0.9', 'de-CH,de;q=0.9']) {
    const res = await rootRedirect({ 'accept-language': lang });
    assert.equal(locationPath(res), '/de', lang);
  }
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
  assert.match(csp, /connect-src 'self' https:\/\/[a-z0-9-]+\.in\.applicationinsights\.azure\.com/);
  assert.equal(res.headers.get('x-content-type-options'), 'nosniff');
  assert.ok(res.headers.get('strict-transport-security'));
});

// --- redirects from the previous site (next.config.ts) ----------------------

// Every product clip (src/components/ui/Clip.tsx) must exist for every locale
// and theme, or the clip box stays empty in that language.
const CLIPS = ['access-request', 'just-in-time', 'passkey', 'workforce', 'agent-scope'];

test('every product clip exists for every locale and theme', async () => {
  const missing = [];
  for (const clip of CLIPS) {
    for (const locale of LOCALES) {
      for (const theme of ['dark', 'light']) {
        for (const ext of ['mp4', 'jpg']) {
          const path = `/videos/${clip}-${locale}-${theme}.${ext}`;
          const res = await fetch(BASE + path, { method: 'HEAD' });
          if (res.status !== 200) missing.push(`${path}: ${res.status}`);
        }
      }
    }
  }
  assert.deepEqual(missing, []);
});

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
    '/fr/about': '/fr/a-propos',
    '/es/about': '/es/sobre-nosotros',
    '/it/contact': '/it/contatti',
    '/it/careers': '/it/carriere',
    '/nl/impressum': '/nl/colofon',
    '/nl/privacy-and-gdpr': '/nl/privacy',
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
