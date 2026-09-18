import { NextResponse } from 'next/server';

/**
 * Locale routing policy — keep this comment in sync with the behaviour below.
 *
 * 1. Prefixed paths (/de/…, /fr/…) are rewritten onto the unprefixed route and
 *    tagged with `x-locale`, so the page renders in that language. The browser
 *    URL keeps its prefix, which is why the client derives the locale from
 *    usePathname() rather than from a cookie.
 * 2. The root `/` is auto-detected for first-time visitors: with no NEXT_LOCALE
 *    cookie, a browser whose top Accept-Language is a supported locale is
 *    redirected to that locale. Only the root redirects — deep links such as
 *    /about always serve English, so a shared URL renders as written.
 * 3. Every other unprefixed path serves English.
 *
 * NEXT_LOCALE is written when a visitor uses a prefixed path, and is
 * deliberately NOT cleared on unprefixed paths: it is what stops a returning
 * German visitor from being redirected off `/` again on every subsequent visit.
 * `x-locale` is the header the app renders from; the cookie is only an
 * auto-detect marker.
 */
const SUPPORTED_LOCALES = ['de', 'fr', 'es', 'it', 'nl'];

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // ── Match URL subpaths like /de, /fr, /es, /it, /nl ───────────────────────
  const pathLocale = SUPPORTED_LOCALES.find(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
  );

  if (pathLocale) {
    const actualPath =
      pathname === `/${pathLocale}`
        ? '/'
        : pathname.slice(pathLocale.length + 1) || '/';

    const url = request.nextUrl.clone();
    url.pathname = actualPath;

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-locale', pathLocale);

    const res = NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    });
    res.headers.set('x-locale', pathLocale);
    res.cookies.set('NEXT_LOCALE', pathLocale, {
      path: '/',
      maxAge: 31536000,
      sameSite: 'lax',
    });
    return res;
  }

  // ── Auto-detect on first visit (no cookie set yet) ────────────────────────
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;

  if (!cookieLocale && pathname === '/') {
    const acceptLanguage = request.headers.get('accept-language') || '';
    const firstLang = acceptLanguage.split(',')[0].trim().toLowerCase().slice(0, 2);

    if (SUPPORTED_LOCALES.includes(firstLang)) {
      // First visit from a European browser matching supported language -> auto-redirect
      return NextResponse.redirect(new URL(`/${firstLang}`, request.url));
    }
  }

  // ── Default English path ──────────────────────────────────────────────────
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-locale', 'en');

  const res = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  res.headers.set('x-locale', 'en');
  return res;
}

export const config = {
  // Run on all routes except Next.js internals, API routes, and static assets
  matcher: [
    '/((?!api|_next/static|_next/image|favicon\\.ico|images|logo\\.png).*)',
  ],
};
