# Qubital Website..

Marketing site for Qubital GmbH, an Identity & Access Management
consultancy (PAM, IGA, CIAM, workforce IAM, AI and agentic identity security).
Next.js 16 (App Router), React 19, Tailwind CSS 4 and next-intl, served in German
and English with localized URLs.

## Getting started

```bash
nvm use                      # picks up .nvmrc
npm ci
cp .env.example .env.local   # optional, see Environment variables
npm run dev
```

Node 22 (`>=22.13.0 <23`) is required (see `engines` in `package.json`; `.nvmrc` is the
version CI uses).

## Scripts

| Script                 | What it does                                                  |
| ---------------------- | ------------------------------------------------------------- |
| `npm run dev`          | Dev server (Turbopack)                                        |
| `npm run build`        | Production build                                              |
| `npm run start`        | Serve the production build                                    |
| `npm run lint`         | ESLint                                                        |
| `npm run typecheck`    | Generate route types, then `tsc --noEmit`                     |
| `npm run format`       | Format everything with Prettier                               |
| `npm run format:check` | Verify formatting without writing (runs in CI)                |
| `npm test`             | Browser-free smoke suite, **needs a build first**             |
| `npm run test:browser` | Interactive checks, needs a running server, **not run in CI** |

A pre-commit hook runs ESLint and Prettier over staged files.

## Locale routing

Routing is handled by next-intl and configured in one place,
`src/i18n/routing.ts`.

- **Both locales are prefixed**, German is the default, and each page has a
  localized slug:

  ```
  /de/leistungen   /en/services
  /de/ueber-uns    /en/about
  /de/kontakt      /en/contact
  ```

- **`/` auto-detects.** `src/proxy.ts` redirects it to `/de` or `/en` from the
  `NEXT_LOCALE` cookie, then `Accept-Language`, then the default (`de`). The
  redirect is marked `no-store` so a shared cache never keeps one visitor's
  language for everyone.
- **Never build a URL by hand.** Use `Link`, `useRouter` and `getPathname` from
  `src/i18n/navigation.ts` with the internal pathname (`/services`), and the
  locale-specific slug is filled in for you.
- Copy lives in `src/messages/de.json` and `src/messages/en.json`. The German
  legal texts are binding; the English pages say so.

### Redirects from the previous site

The old site served English unprefixed and six locales. `next.config.ts` builds
permanent (308) redirects from every old URL to its new page: `/about` goes to
`/en/about`, `/de/services` to `/de/leistungen`, and pages that no longer exist go
to the page that now carries their content (`/mission` to About, `/compliance` to
Services, `/privacy-and-gdpr` to Privacy). French, Spanish, Italian and Dutch URLs
go to the English page.

## Adding a page

1. Add the internal pathname and its two slugs to `pathnames` in
   `src/i18n/routing.ts`.
2. Create `src/app/[locale]/<route>/page.tsx` that exports `generateMetadata()`
   via `pageMetadata()` from `src/lib/page.ts`. That produces the canonical URL,
   the hreflang cluster and the Open Graph and Twitter tags.
3. Add the copy to **both** `src/messages/de.json` and `src/messages/en.json`.
4. To list it in navigation, add it to `src/components/layout/nav.ts`.

The sitemap expands every pathname across both locales automatically, and
`npm test` asserts that every URL returns 200 with the right canonical, hreflang,
title and `<html lang>`. Add the new route to `ROUTES` in `tests/smoke.test.mjs`.

## Photos

Stock photos live in `src/assets/photos/` and are imported statically, so
`next/image` knows their size and generates a blur placeholder. All are from
Unsplash under the [Unsplash License](https://unsplash.com/license) (free for
commercial use, no attribution required). Credited here anyway:

| File                     | Photographer                                                |
| ------------------------ | ----------------------------------------------------------- |
| `team-whiteboard.jpg`    | [Kaleidico](https://unsplash.com/photos/3V8xo5Gbusk)        |
| `team-laptop.jpg`        | [Jeremy](https://unsplash.com/photos/PF-rZraOOOo)           |
| `phone-verification.jpg` | [Zulfugar Karimov](https://unsplash.com/photos/hvbjTynPt7A) |
| `security-key.jpg`       | [Andy Kennedy](https://unsplash.com/photos/CpbI_SbiKqs)     |
| `frankfurt.jpg`          | [NIR HIMI](https://unsplash.com/photos/pfWSXfrrItg)         |

Swap any of them for real photos of the team when those exist.

Industry card photos (`src/assets/industries/`) are Unsplash photos too
(Unsplash License), cropped to 16:10. Source IDs:

| File                | Unsplash photo                     |
| ------------------- | ---------------------------------- |
| `automotive.jpg`    | `photo-1589320012458-ce28bd1c86b1` |
| `aviation.jpg`      | `photo-1610642372677-bcddb69f3531` |
| `banking.jpg`       | `photo-1773775098057-bc43ea51c347` |
| `pharma.jpg`        | `photo-1581093577421-f561a654a353` |
| `retail.jpg`        | `photo-1578916171728-46686eac8d58` |
| `telecom.jpg`       | `photo-1673798880756-889117cacb7e` |
| `tourism.jpg`       | `photo-1619680939776-4eadd78709a4` |
| `insurance.jpg`     | `photo-1606788075819-9574a6edfab3` |
| `manufacturing.jpg` | `photo-1761195696590-3490ea770aa1` |

## Logos

Third-party logos live in `public/logos/` and are trademarks of their owners.
They are shown to name the products Qubital works with (`platforms/`) and the
organisations it has worked with (`clients/`), as confirmed by the client;
nothing on the site claims an official partnership. Sources: the company's own
website (One Identity, SailPoint, Omada, Saviynt, Intersnack, and Novo Nordisk,
whose logo is a glyph in its site's icon font) or Wikimedia Commons (the rest).

## Product clips

The short animations on Home and Services are rendered with Remotion from the
separate project in `video/` (see `video/README.md`). The site only ships the
rendered files in `public/videos/` and plays them with
`src/components/ui/Clip.tsx`, picking the file for the current locale and
theme. To change a clip, edit it in `video/src/clips/` and run `npm run render`
there.

## Environment variables

All optional: the contact form's email delivery degrades gracefully when
unset. Web analytics (Azure Application Insights, cookieless) needs no
variable; its connection string is in `src/config/site.ts`.

| Variable                       | Purpose                                                     |
| ------------------------------ | ----------------------------------------------------------- |
| `GRAPH_TENANT_ID`              | Entra tenant ID for contact form delivery (Microsoft Graph) |
| `GRAPH_CLIENT_ID`              | Entra app (client) ID                                       |
| `GRAPH_CLIENT_SECRET`          | Entra app client secret                                     |
| `CONTACT_TO_EMAIL`             | Inquiry recipient (default `hello@qubital.eu`)              |
| `CONTACT_CC_EMAIL`             | Copied on every inquiry (default `arun1812@gmail.com`)      |
| `CONTACT_FROM_EMAIL`           | Mailbox Graph sends as (default `hello@qubital.eu`)         |
| `CONTACT_RATE_LIMIT_MAX`       | Submissions per IP per window (default `5`)                 |
| `CONTACT_RATE_LIMIT_WINDOW_MS` | Rate-limit window in ms (default `600000`)                  |

The `NEXT_PUBLIC_*` pair is inlined at **build** time, so one build cannot serve
two environments. The `GRAPH_*`/`CONTACT_*` values are read at **request** time
and never enter the browser bundle, but a change needs the process restarted (a
redeploy on Vercel, a container restart elsewhere).

## Contact form

`src/components/sections/ContactForm.tsx` posts JSON to `POST /api/contact`
(`src/app/api/contact/route.ts`). Both sides run the same rules from
`src/lib/contact/validation.ts`, so most mistakes are caught before a request.

Without the three `GRAPH_*` values the endpoint returns `500` and the form shows its error
state. That is deliberate: a lead must never be silently lost behind a fake
success message.

Two emails are sent per inquiry: a notification to `CONTACT_TO_EMAIL` (with
`CONTACT_CC_EMAIL` copied and `Reply-To` set to the sender, so staff can answer
directly) and a confirmation to the person who submitted it. The notification
failing fails the request; the confirmation failing does not, since the lead has
already been captured by then.

Spam handling is a hidden honeypot field plus an in-memory per-IP rate limit.

Nothing here is tied to a hosting platform: the endpoint is plain Next.js on the
Node runtime calling Microsoft Graph over outbound HTTPS: no platform APIs, no cron, no
queue, no external store. It runs unchanged on Vercel, a container or any Node
host. Per-IP limiting reads `x-forwarded-for` (first entry) or `x-real-ip`, which
proxies set and Next's own Node server derives from the socket, verified against
a direct `next start` with no proxy in front. If neither header is present the
request is **not** limited, rather than being collapsed into one shared bucket:
sharing would let the first few submissions lock every visitor out of the form.

### Sending through Microsoft 365

`qubital.eu` mail is Exchange Online, so the form sends from the
`CONTACT_FROM_EMAIL` mailbox through Microsoft Graph
(`src/lib/contact/graph-mail.ts`). That costs nothing beyond the existing
mailbox and needs no DNS changes: SPF and DKIM already cover Microsoft 365. Both
emails come from that mailbox, and the confirmation is kept in its Sent Items.

One-time setup, by a Microsoft 365 admin, all in the browser:

1. **Shared mailbox** (Exchange admin center → Recipients → Mailboxes → Add a
   shared mailbox). Ours is "Qubital Website": primary address and user
   principal name `hello@qubital.eu`, with `website@qubital.eu` as a second
   address. Give staff **Full Access** under Delegation. Shared mailboxes need
   no licence; leave the account disabled, nobody signs in to it.
2. **Register an app** in Entra ID (App registrations → New registration,
   single tenant). Ours is "Qubital Website Mailer". Copy the **Application
   (client) ID** and **Directory (tenant) ID** into `GRAPH_CLIENT_ID` and
   `GRAPH_TENANT_ID`.
3. **Add the permission** API permissions → Add a permission → Microsoft Graph
   → **Application** permissions → `Mail.Send`, then **Grant admin consent**.
   The row must show "Granted".
4. **Create a client secret** (Certificates & secrets → New client secret,
   24 months) and put its **Value** in `GRAPH_CLIENT_SECRET`. Note the expiry:
   when it expires the form returns errors until a new secret is set.

Application `Mail.Send` granted this way can send as _any_ mailbox in the
tenant. The code only ever sends as `CONTACT_FROM_EMAIL`, and the secret lives
only in the hosting environment. To restrict the app to the one mailbox, replace
the Entra grant with an Exchange-scoped one (RBAC for Applications, PowerShell
only):

```
New-ServicePrincipal -AppId <client-id> -ObjectId <enterprise-app-object-id> -DisplayName "Qubital Website Mailer"
New-ManagementScope -Name "Website mailbox" -RecipientRestrictionFilter "PrimarySmtpAddress -eq 'hello@qubital.eu'"
New-ManagementRoleAssignment -App <client-id> -Role "Application Mail.Send" -CustomResourceScope "Website mailbox"
```

then remove the `Mail.Send` grant in Entra, and check with
`Test-ServicePrincipalAuthorization -Identity <client-id> -Resource hello@qubital.eu`.

Exchange Online allows 30 messages a minute per mailbox; each inquiry sends two.

## Testing

- **`npm test`** is the suite that gates CI. Plain HTTP against a production
  server: the 18-entry sitemap, self-referencing canonicals, hreflang clusters,
  titles, `<html lang>`, the `/` redirect rules, cache and security headers, and
  the redirects from the old site's URLs. It also drives the contact endpoint
  (validation, honeypot, per-IP rate limiting) with `GRAPH_CLIENT_SECRET`
  pinned empty, so the suite can never send real mail. No browser, a few seconds.
- **`npm run test:browser`** renders every page, then checks the language
  switcher, navigation hover, a page translated the way Chrome's translator does
  it, the theme toggle, the mobile menu, contact form validation and the old URLs.
  Every check also fails on an uncaught page error. Run it locally on demand
  (`PW_CHANNEL=chrome` uses the installed Chrome instead of a browser download);
  it is kept out of CI on purpose.

## Deployment

Built for Vercel. It needs a Node runtime (not a static export) because locale
detection and the `/` redirect run in the proxy.

Responses are edge-cached: every route except `/` is marked
`Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400`, because
each locale has its own URL and the rendered output is deterministic per URL.
`/` stays uncached since it varies on `Accept-Language` and `NEXT_LOCALE`, and `/api/*` is excluded
because the contact endpoint must never be stored by a shared cache.

Security headers (`HSTS`, `CSP`, `X-Content-Type-Options`, `Referrer-Policy`,
`X-Frame-Options`, `Permissions-Policy`) are set in `next.config.ts`.

### Self-hosting (Azure, containers, any Node host)

The app runs off Vercel unchanged, but three things must be done deliberately.

**1. There has to be a CDN in front, or the cache headers do nothing.**
`Cache-Control: public, s-maxage=…` is plain HTTP; it only helps if a shared
cache honours it. On Azure that means **Front Door** (or Azure CDN). With no CDN,
every request re-renders on your compute, which is the slow and expensive case on
App Service. On Vercel the edge does this for you.

**2. `output: 'standalone'` is on, and its assets must be copied.**
The build emits `.next/standalone`, a self-contained server. **Running it
without copying the static assets serves a 200 page with a 404 stylesheet, i.e.
an unstyled site.** Verified:

```
node .next/standalone/server.js                    # page 200, css 404
cp -r .next/static .next/standalone/.next/static
cp -r public      .next/standalone/public
node .next/standalone/server.js                    # page 200, css 200
```

`npm run build:azure` is `next build` plus those two copies. Use it instead of
`npm run build` in any pipeline that ships `.next/standalone`; on Azure Static
Web Apps, set `app_build_command: 'npm run build:azure'` in the workflow. The
plain `build` script cannot do the copies, because Vercel builds without
`standalone` and the `cp` would fail there.

Run it with `node .next/standalone/server.js`. It honours `PORT` and `HOSTNAME`,
which is what App Service and Container Apps inject.

**3. `NEXT_PUBLIC_*` values are inlined at build time.**
Any `NEXT_PUBLIC_*` value is baked into the bundle during `next build`, so a
single artifact cannot serve two environments. Build per environment, or supply
the values during the build step in the pipeline.

`sharp` is a direct dependency rather than an optional one. Next declares it
_optional_, which npm is allowed to skip, and self-hosted `next/image`
optimisation needs it. Vercel bundles its own, so this only matters off Vercel.

Node 22 (`>=22.13.0 <23`) is required; `.nvmrc` is the version CI uses. The upper
bound matters on Azure Static Web Apps: its builder picks the newest Node that
satisfies `engines`, and the hosted Next.js runtime only accepts 18, 20 and 22.

> **Note:** `qubital.eu` currently serves a separate legacy static site from
> S3/CloudFront, not this application. This app is the replacement; the domain
> will be repointed when it is ready.

## Project layout

```
src/
  app/
    [locale]/       pages, layout, not-found (one folder per internal pathname)
    api/contact/    contact form endpoint (POST)
    sitemap.ts, robots.ts, manifest.ts
  components/
    home/           home page sections
    layout/         Header, Dock, Footer, LocaleSwitcher, ThemeToggle, nav
    sections/       shared page sections, ContactForm, LegalPage
    ui/             primitives (Button, Container, Reveal, ...)
    Analytics.tsx   cookieless Azure Application Insights page views
  config/site.ts    name, legal name, domain, email, location
  i18n/             next-intl routing, navigation helpers, request config
  lib/
    contact/        validation, rate limiter, email templates, topics
    page.ts         per-page metadata (canonical, hreflang, Open Graph)
  messages/         de.json, en.json
  proxy.ts          locale detection and redirect for `/`
tests/
  smoke.test.mjs           browser-free suite, runs in CI
  browser/interactions.mjs local-only Playwright checks
```
