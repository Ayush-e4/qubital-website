'use client';

import { createContext, useContext } from 'react';
import { usePathname } from 'next/navigation';
import { getDictionary } from '@/lib/i18n/translations';

const SUPPORTED_LOCALES = ['de', 'fr', 'es', 'it', 'nl'];

const LanguageContext = createContext({
  locale: 'en',
  t: getDictionary('en'),
  setLocale: () => {},
});

/**
 * The locale implied by a pathname. The middleware rewrites /{locale}/… onto the
 * unprefixed route, but the browser URL keeps the prefix, so the pathname is the
 * single source of truth for the active locale.
 */
function getPathLocale(pathname) {
  if (!pathname) return 'en';
  return (
    SUPPORTED_LOCALES.find(
      (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
    ) || 'en'
  );
}

/**
 * Wraps the app and provides the current locale + translation dictionary.
 *
 * The locale is derived from the pathname rather than mirrored into state, so
 * client-side route transitions (`<Link>`) stay in sync with the URL subpath
 * with no effect and no duplicated state.
 */
export function LanguageProvider({ children }) {
  const pathname = usePathname();
  const locale = getPathLocale(pathname);

  function setLocale(newLocale) {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
  }

  const t = getDictionary(locale);

  return (
    <LanguageContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Hook to access translations and locale switcher anywhere in the tree.
 *
 * Usage:
 *   const { t, locale, setLocale } = useLanguage();
 *   <h1>{t.hero.sub_headline}</h1>
 */
export function useLanguage() {
  return useContext(LanguageContext);
}
