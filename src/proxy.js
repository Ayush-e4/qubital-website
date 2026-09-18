import { NextResponse } from 'next/server';
import { PREFIXED_LOCALES, localeFromPath, stripLocale } from '@/lib/i18n/paths';

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
 *    /about always serve English, so a shared URL renders as written. The
 *    redirect is sent `no-store`, since it depends on a request header and must
 *    not be replayed by a shared cache.
 * 3. Every other unprefixed path serves English.
 *
 * NEXT_LOCALE is written when a visitor uses a prefixed path, and is
 * deliberately NOT cleared on unprefixed paths: it is what stops a returning
 * German visitor from being redirected off `/` again on every subsequent visit.
 * `x-locale` is the header the app renders from; the cookie is only an
 * auto-detect marker.
 */
export function proxy(request) {
  const { pathname } = request.nextUrl;

  // ── Prefixed paths: /de, /fr, /es, /it, /nl ───────────────────────────────
  const pathLocale = localeFromPath(pathname);

  if (pathLocale) {
    const url = request.nextUrl.clone();
    url.pathname = stripLocale(pathname).path;

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

    if (PREFIXED_LOCALES.includes(firstLang)) {
      // First visit from a European browser matching supported language -> auto-redirect
      const redirect = NextResponse.redirect(new URL(`/${firstLang}`, request.url));

      // A redirect decided from Accept-Language must never be stored by a
      // shared cache, or it would be replayed to visitors whose browser asks
      // for a different language. This is set here rather than in
      // next.config.mjs so that the root *page* — the response everyone else
      // gets — can stay back/forward-cache eligible (see rootCacheHeaders).
      redirect.headers.set('Cache-Control', 'no-store');
      return redirect;
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
  matcher: ['/((?!api|_next/static|_next/image|favicon\\.ico|images|logo\\.png).*)'],
};
