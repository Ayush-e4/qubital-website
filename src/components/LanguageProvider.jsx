'use client';

import { createContext, useContext } from 'react';
import { usePathname } from 'next/navigation';
import { getDictionary } from '@/lib/i18n/translations';
import { DEFAULT_LOCALE, localeFromPath } from '@/lib/i18n/paths';

const LanguageContext = createContext({
  locale: DEFAULT_LOCALE,
  t: getDictionary(DEFAULT_LOCALE),
  setLocale: () => {},
});

/**
 * Wraps the app and provides the current locale + translation dictionary.
 *
 * The locale is derived from the pathname rather than mirrored into state, so
 * client-side route transitions (`<Link>`) stay in sync with the URL subpath
 * with no effect and no duplicated state.
 */
export function LanguageProvider({ children }) {
  const pathname = usePathname();
  const locale = localeFromPath(pathname) ?? DEFAULT_LOCALE;

  function setLocale(newLocale) {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
  }

  const t = getDictionary(locale);

  return (
    <LanguageContext.Provider value={{ locale, t, setLocale }}>{children}</LanguageContext.Provider>
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
