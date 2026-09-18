'use client';

import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { localizedPath, stripLocale } from './paths';

/**
 * Returns a `(path) => href` helper bound to the locale of the current URL.
 *
 * Derived from the pathname rather than from LanguageProvider state so it stays
 * correct across client-side navigation without a page reload.
 */
export function useLocalePath() {
  const pathname = usePathname();
  const { locale } = stripLocale(pathname);
  return useCallback((path) => localizedPath(path, locale), [locale]);
}
