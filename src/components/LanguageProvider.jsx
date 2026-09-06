'use client';

import { createContext, useContext, useState } from 'react';
import { getDictionary } from '@/lib/i18n/translations';

const LanguageContext = createContext({
  locale: 'en',
  t: getDictionary('en'),
  setLocale: () => {},
});

/**
 * Wraps the app and provides the current locale + translation dictionary.
 * initialLocale is read server-side from the x-locale header (set by middleware)
 * and passed in as a prop so there's no flash on first render.
 */
export function LanguageProvider({ children, initialLocale = 'en' }) {
  const [locale, setLocaleState] = useState(initialLocale);

  function setLocale(newLocale) {
    setLocaleState(newLocale);
    // Persist preference in cookie so middleware picks it up on next request
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
