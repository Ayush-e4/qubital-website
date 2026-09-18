# Qubital Website

Marketing site for Qubital Systems GmbH — Next.js 16 (App Router), React 19 and
Tailwind CSS 4, serving six locales (English, German, French, Spanish, Italian,
Dutch) from a single codebase.

## Getting started

```bash
nvm use                      # picks up .nvmrc
npm ci
cp .env.example .env.local   # optional — see Environment variables
npm run dev
```

Node `>=22.13.0` is required (see `engines` in `package.json`; `.nvmrc` is the
version CI uses).

## Scripts

| Script                 | What it does                                                   |
| ---------------------- | -------------------------------------------------------------- |
| `npm run dev`          | Dev server (Turbopack)                                         |
| `npm run build`        | Production build                                               |
| `npm run start`        | Serve the production build                                     |
| `npm run lint`         | ESLint                                                         |
| `npm run format`       | Format everything with Prettier                                |
| `npm run format:check` | Verify formatting without writing (runs in CI)                 |
| `npm test`             | Browser-free smoke suite — **needs a build first**             |
| `npm run test:browser` | Interactive checks — needs a running server, **not run in CI** |

A pre-commit hook runs ESLint and Prettier over staged files.

## Locale routing

This is the least obvious part of the codebase, so it is worth reading before
touching anything under `src/app`.

**English is served unprefixed**; every other locale is prefixed:

```
/about        → English
/de/about     → German
/fr/services  → French
```

The authoritative rules live as a comment at the top of `src/proxy.js`, and the
helpers live in `src/lib/i18n/paths.js`. In short:

- **Prefixed paths** render in that language. The proxy tags the request with
  `x-locale`, which the layout and `pageMetadata()` read. The browser URL keeps
  its prefix, so **the pathname is the source of truth** for the active locale —
  the client derives it with `usePathname()`, never from a cookie.
- **`/` auto-detects.** On a first visit (no `NEXT_LOCALE` cookie) a browser whose
  top `Accept-Language` is a supported locale is redirected there. Only `/`
  redirects: deep links such as `/about` always serve English, so a shared URL
  renders as written.
- **`NEXT_LOCALE` is not a language switch.** It only suppresses the redirect so
  a returning visitor is not bounced off `/` repeatedly.

Never build a locale-aware URL by hand — use `localizedPath(path, locale)` from
`src/lib/i18n/paths.js`, or `useLocalePath()` in a client component.

## Adding a page

1. Create `src/app/<route>/page.js` as a server component that exports
   `generateMetadata()` via `pageMetadata()` from `src/lib/seo.js` — that is what
   produces the canonical URL, the hreflang cluster and the Open Graph tags.
2. Put the interactive markup in a sibling `*Content.jsx` client component, and
   read copy through `useLanguage()`.
3. Add the copy to **all six locales** in `src/lib/i18n/translations.js`.
4. To list it in navigation, add it to `NAV_LINKS` in `src/lib/constants.js`,
   to `NAV_KEY_MAP` in `src/components/Header.jsx`, and to the `nav` dictionary
   of every locale.
5. Add it to `PAGES` in `src/app/sitemap.js` — the sitemap expands each entry
   across all six locales automatically.

`npm test` covers all of the above: it asserts the sitemap lists every route ×
locale, that every URL returns 200, and that canonical, hreflang, titles and
`<html lang>` are correct.

## Environment variables

All optional — analytics is silently disabled when unset.

| Variable                   | Purpose                       |
| -------------------------- | ----------------------------- |
| `NEXT_PUBLIC_POSTHOG_KEY`  | PostHog project key           |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog host (defaults to EU) |

## Testing

- **`npm test`** — the suite that gates CI. Plain HTTP against a production
  server: the 60-entry sitemap, self-referencing canonicals, hreflang clusters,
  titles, `<html lang>` and the locale-routing rules. No browser, ~4s.
- **`npm run test:browser`** — language switcher, locale rendering and the mobile
  drawer. Run locally on demand; it is deliberately kept out of CI because the
  only real cost is a browser download and these failures are visible by eye.

## Deployment

Built for Vercel. It needs a Node runtime (not a static export) because locale
detection and the `/` redirect run in the proxy.

Responses are edge-cached: every route except `/` is marked
`Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400`, because
each locale has its own URL and the rendered output is deterministic per URL.
`/` stays uncached since it varies on `Accept-Language`.

Security headers (`HSTS`, `CSP`, `X-Content-Type-Options`, `Referrer-Policy`,
`X-Frame-Options`, `Permissions-Policy`) are set in `next.config.mjs`.

### Self-hosting (Azure, containers, any Node host)

The app runs off Vercel unchanged, but three things must be done deliberately.

**1. There has to be a CDN in front, or the cache headers do nothing.**
`Cache-Control: public, s-maxage=…` is plain HTTP — it only helps if a shared
cache honours it. On Azure that means **Front Door** (or Azure CDN). With no CDN,
every request re-renders on your compute, which is the slow and expensive case on
App Service. On Vercel the edge does this for you.

**2. `output: 'standalone'` is on, and its assets must be copied.**
The build emits `.next/standalone` — a self-contained server. **Running it
without copying the static assets serves a 200 page with a 404 stylesheet, i.e.
an unstyled site.** Verified:

```
node .next/standalone/server.js                    # page 200, css 404
cp -r .next/static .next/standalone/.next/static
cp -r public      .next/standalone/public
node .next/standalone/server.js                    # page 200, css 200
```

Run it with `node .next/standalone/server.js`. It honours `PORT` and `HOSTNAME`,
which is what App Service and Container Apps inject.

**3. `NEXT_PUBLIC_*` values are inlined at build time.**
`NEXT_PUBLIC_POSTHOG_KEY` is baked into the bundle during `next build`, so a
single artifact cannot serve two environments — build per environment, or supply
the values during the build step in the pipeline.

`sharp` is a direct dependency rather than an optional one. Next declares it
_optional_, which npm is allowed to skip, and self-hosted `next/image`
optimisation needs it. Vercel bundles its own, so this only matters off Vercel.

Node `>=22.13.0` is required; `.nvmrc` is the version CI uses.

> **Note:** `qubital.eu` currently serves a separate legacy static site from
> S3/CloudFront, not this application. This app is the replacement; the domain
> will be repointed when it is ready.

## Project layout

```
src/
  app/            routes, layout, sitemap, robots, not-found
  components/     Header, Footer, providers, UI primitives
  lib/
    i18n/         locale routing helpers + translation dictionaries
    seo.js        per-page metadata (canonical, hreflang, Open Graph)
  proxy.js        locale routing policy (prefixed paths, `/` auto-detect)
tests/
  smoke.test.mjs          browser-free suite, runs in CI
  browser/interactions.mjs local-only Playwright checks
```
