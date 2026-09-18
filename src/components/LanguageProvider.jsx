'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getDictionary } from '@/lib/i18n/translations';

const SUPPORTED_LOCALES = ['de', 'fr', 'es', 'it', 'nl'];

const LanguageContext = createContext({
  locale: 'en',
  t: getDictionary('en'),
  setLocale: () => {},
});

/**
 * Wraps the app and provides the current locale + translation dictionary.
 * initialLocale is read server-side from the x-locale header (set by middleware).
 * Client-side pathname is also tracked so route transitions update translations seamlessly.
 */
export function LanguageProvider({ children, initialLocale = 'en' }) {
  const pathname = usePathname();

  // Detect locale from pathname if present, otherwise fallback to initialLocale or 'en'
  const getPathLocale = (path) => {
    if (!path) return initialLocale || 'en';
    const match = SUPPORTED_LOCALES.find(
      (loc) => path === `/${loc}` || path.startsWith(`/${loc}/`)
    );
    return match || 'en';
  };

  const [locale, setLocaleState] = useState(() => getPathLocale(pathname));

  // Sync when pathname changes on client-side soft navigation
  useEffect(() => {
    const active = getPathLocale(pathname);
    if (active !== locale) {
      setLocaleState(active);
    }
  }, [pathname]);

  // Sync when initialLocale changes (e.g. server render)
  useEffect(() => {
    if (initialLocale && initialLocale !== locale) {
      setLocaleState(initialLocale);
    }
  }, [initialLocale]);

  function setLocale(newLocale) {
    setLocaleState(newLocale);
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
