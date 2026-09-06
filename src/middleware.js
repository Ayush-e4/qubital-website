import { NextResponse } from 'next/server';

const SUPPORTED_LOCALES = ['de', 'fr', 'es', 'it', 'nl'];

export function middleware(request) {
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

    const res = NextResponse.rewrite(new URL(actualPath, request.url));
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
  const locale = (cookieLocale && [...SUPPORTED_LOCALES, 'en'].includes(cookieLocale))
    ? cookieLocale
    : 'en';

  const res = NextResponse.next();
  res.headers.set('x-locale', locale);
  return res;
}

export const config = {
  // Run on all routes except Next.js internals, API routes, and static assets
  matcher: [
    '/((?!api|_next/static|_next/image|favicon\\.ico|images|logo\\.png).*)',
  ],
};
