'use client';

import { createContext, useContext } from 'react';
import { usePathname } from 'next/navigation';
import { DEFAULT_LOCALE, localeFromPath } from '@/lib/i18n/paths';

const LanguageContext = createContext({
  locale: DEFAULT_LOCALE,
  t: {},
  setLocale: () => {},
});

/**
 * Wraps the app and provides the current locale + translation dictionary.
 *
 * The locale is derived from the pathname rather than mirrored into state, so
 * client-side route transitions (`<Link>`) stay in sync with the URL subpath
 * with no effect and no duplicated state.
 *
 * `dictionary` is handed down from the server layout, which already knows the
 * locale from the `x-locale` header that the proxy sets. Importing the
 * dictionaries here instead would pull all six locales into the client bundle
 * to display one of them — the lookup would be cheap, the download would not.
 * The server needs every locale; the client needs exactly one.
 *
 * This only holds while no `'use client'` module imports
 * `@/lib/i18n/translations` — one such import puts all six back into the client
 * graph and silently undoes the saving.
 */
export function LanguageProvider({ dictionary, children }) {
  const pathname = usePathname();
  const locale = localeFromPath(pathname) ?? DEFAULT_LOCALE;

  function setLocale(newLocale) {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
  }

  return (
    <LanguageContext.Provider value={{ locale, t: dictionary, setLocale }}>
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
