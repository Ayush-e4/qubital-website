import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { routing, type Pathname } from './src/i18n/routing';

const withNextIntl = createNextIntlPlugin();

const isDev = process.env.NODE_ENV !== 'production';

// Third parties the app talks to from the browser:
//   - Azure Application Insights: page views posted to the EU ingestion host
//     (SDK is bundled, so no script host is needed)
// Fonts are self-hosted via next/font and icons are inline SVG (Lucide), so
// neither fonts.googleapis.com nor fonts.gstatic.com is needed here.
// Next injects inline bootstrap scripts, the layout inlines the theme script and
// JSON-LD, and Tailwind/Motion emit inline styles, so 'unsafe-inline' is required
// until a nonce-based CSP is wired up. 'unsafe-eval' is only needed by the
// dev-mode React refresh runtime.
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: blob:",
  "connect-src 'self' https://germanywestcentral-1.in.applicationinsights.azure.com",
].join('; ');

const securityHeaders = [
  // Deliberately without `includeSubDomains`/`preload`: those commit every
  // subdomain of qubital.eu to HTTPS, which we can't verify from here. Add them
  // once confirmed that no subdomain is HTTP-only.
  { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
];

// Every page lives at its own locale-prefixed URL (/de/…, /en/…) and is
// prerendered, so the output is deterministic per URL and safe for a shared
// cache.
const edgeCacheHeaders = [
  {
    key: 'Cache-Control',
    value: 'public, s-maxage=3600, stale-while-revalidate=86400',
  },
];

// `/` is the one route that genuinely varies per request: the proxy redirects it
// on Accept-Language and NEXT_LOCALE. A shared cache must never store it, which
// is what `private` guarantees, while `no-cache` (unlike `no-store`) keeps it
// back/forward-cache eligible. The redirect itself is marked `no-store` in
// src/proxy.ts, where it is created.
const rootCacheHeaders = [{ key: 'Cache-Control', value: 'private, no-cache' }];

/**
 * Permanent redirects from the previous site's URLs.
 *
 * The old site served English unprefixed (/about) and five more locales under a
 * prefix (/de/about, /fr/about, …). The new site serves German and English only,
 * both prefixed, with localized slugs. Old French, Spanish, Italian and Dutch
 * URLs go to the English page. Pages that no longer exist map to the page that
 * now carries their content.
 */
const OLD_ROUTES: Record<string, Pathname> = {
  '/about': '/about',
  '/mission': '/about',
  '/why-us': '/',
  '/services': '/services',
  '/careers': '/careers',
  '/contact': '/contact',
  '/compliance': '/services',
  '/privacy-and-gdpr': '/privacy',
  '/impressum': '/imprint',
};
const DROPPED_LOCALES = ['fr', 'es', 'it', 'nl'];

function localized(locale: 'de' | 'en', href: Pathname) {
  const entry = routing.pathnames[href];
  const path = typeof entry === 'string' ? entry : entry[locale];
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

function legacyRedirects() {
  const rules: { source: string; destination: string; permanent: true }[] = [];
  const add = (source: string, destination: string) => {
    if (source !== destination) rules.push({ source, destination, permanent: true });
  };
  for (const [old, href] of Object.entries(OLD_ROUTES)) {
    add(old, localized('en', href));
    add(`/de${old}`, localized('de', href));
    for (const locale of DROPPED_LOCALES) add(`/${locale}${old}`, localized('en', href));
  }
  for (const locale of DROPPED_LOCALES) {
    add(`/${locale}`, '/en');
    // Anything else under a dropped locale (an old deep link we did not list).
    add(`/${locale}/:path*`, '/en');
  }
  return rules;
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // `output: 'standalone'` emits .next/standalone — the self-contained server
  // bundle used off Vercel (containers, Azure App Service, Container Apps).
  // It is applied only when NOT building on Vercel: Vercel manages its own
  // deployment output, and the build failed there with this set (see #39).
  ...(process.env.VERCEL ? {} : { output: 'standalone' as const }),
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return legacyRedirects();
  },
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
      // Every page but the root, excluding `_next` (content-hashed assets keep
      // Next's own `max-age=31536000, immutable`) and `api` (the contact endpoint
      // must never be stored by a shared cache). The lookahead sits inside an
      // outer group because path-to-regexp rejects a bare `(?…)` group.
      // Do not add a second rule for `/_next/static`: Next applies every matching
      // entry, so the response would carry two conflicting Cache-Control headers.
      { source: '/((?!_next/|api/).+)', headers: edgeCacheHeaders },
      { source: '/', headers: rootCacheHeaders },
    ];
  },
};

export default withNextIntl(nextConfig);
