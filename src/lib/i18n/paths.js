/**
 * Single source of truth for locale routing.
 *
 * English is served unprefixed; every other locale lives under /{locale}. The
 * proxy rewrites a prefixed path onto the unprefixed route, but the browser URL
 * keeps its prefix — so a pathname is always authoritative for "which locale is
 * this visitor on". See src/proxy.js for the routing policy itself.
 *
 * Pure module — no React — so it is safe to import from server and client code.
 */

export const DEFAULT_LOCALE = 'en';

/** Every locale the site ships. */
export const LOCALES = ['en', 'de', 'fr', 'es', 'it', 'nl'];

/** Locales that carry a URL prefix: everything except the default. */
export const PREFIXED_LOCALES = LOCALES.filter((locale) => locale !== DEFAULT_LOCALE);

/**
 * The prefixed locale in a pathname, or null when it has none.
 *   '/de/about' -> 'de'      '/about' -> null
 */
export function localeFromPath(pathname) {
  if (!pathname) return null;
  return (
    PREFIXED_LOCALES.find(
      (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
    ) ?? null
  );
}

/**
 * Split a pathname into its locale and the unprefixed path.
 *   '/de/about' -> { locale: 'de',   path: '/about' }
 *   '/de'       -> { locale: 'de',   path: '/' }
 *   '/about'    -> { locale: null,   path: '/about' }
 */
export function stripLocale(pathname) {
  const locale = localeFromPath(pathname);
  if (!locale) return { locale: null, path: pathname || '/' };
  return { locale, path: pathname.slice(locale.length + 1) || '/' };
}

/**
 * Prefix an unprefixed path for a locale. The root stays '/', and the default
 * locale is never prefixed.
 *   ('/about', 'de') -> '/de/about'
 *   ('/',      'de') -> '/de'
 *   ('/about', 'en') -> '/about'
 */
export function localizedPath(path, locale) {
  if (!locale || locale === DEFAULT_LOCALE) return path;
  return `/${locale}${path === '/' ? '' : path}`;
}
