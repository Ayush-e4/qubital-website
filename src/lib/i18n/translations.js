// @ts-check
import en from './locales/en';
import de from './locales/de';
import fr from './locales/fr';
import es from './locales/es';
import it from './locales/it';
import nl from './locales/nl';

export const LOCALES = ['en', 'de', 'fr', 'es', 'it', 'nl'];

/** @type {Record<string, import('./types').Dictionary>} */
const translations = { en, de, fr, es, it, nl };

/**
 * The dictionary for a locale, falling back to English for anything unknown.
 *
 * @param {string} locale
 * @returns {import('./types').Dictionary}
 */
export function getDictionary(locale) {
  return translations[locale] || translations.en;
}
