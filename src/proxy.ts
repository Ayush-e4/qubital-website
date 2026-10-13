import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

/**
 * Locale routing (next-intl), see src/i18n/routing.ts:
 *
 * 1. Every page lives under a locale prefix with localized slugs:
 *    /de/leistungen, /en/services. German is the default.
 * 2. `/` and other unprefixed paths redirect to the visitor's locale, picked from
 *    the NEXT_LOCALE cookie, then Accept-Language, then the default.
 * 3. Old URLs from the previous site (/about, /fr/…) never reach this proxy:
 *    next.config.ts redirects them permanently first.
 *
 * A redirect decided from a cookie or Accept-Language must never be stored by a
 * shared cache, or it would be replayed to visitors who should get a different
 * language. It is marked `no-store` here, where it is created, so the pages
 * themselves can stay cacheable (see the Cache-Control rules in next.config.ts).
 */
const handleI18nRouting = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const response = handleI18nRouting(request);
  if (response.headers.has('location')) {
    response.headers.set('Cache-Control', 'no-store');
  }
  return response;
}

export const config = {
  // Match everything except API routes, Next.js internals and static files
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
