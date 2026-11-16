import type { Pathname } from '@/i18n/routing';
import nhiDe from './nhi.de.json';
import nhiEn from './nhi.en.json';
import nis2De from './nis2-iam.de.json';
import nis2En from './nis2-iam.en.json';
import sapDe from './sap-idm.de.json';
import sapEn from './sap-idm.en.json';
import type { LandingContent } from './types';

export type { LandingContent, LandingSection } from './types';

/**
 * Topic landing pages. Unlike the rest of the site they exist in German and
 * English only: every other locale answers 404, they are left out of those
 * locales' sitemap entries and hreflang, and the language picker sends a
 * visitor switching to another language to that language's services page.
 *
 * The copy is maintained as JSON (one file per page and language), so it can be
 * edited and reviewed outside the code; see qubital-seo/pages in the marketing
 * folder for the source and the build that checks titles and descriptions.
 */
export const landingLocales = ['de', 'en'] as const;
export type LandingLocale = (typeof landingLocales)[number];

// JSON imports widen string unions (a section's `type`), hence the cast; the
// shapes are checked by the smoke tests rendering every page.
const page = (de: unknown, en: unknown) => ({ de, en }) as Record<LandingLocale, LandingContent>;

export const landingPages = {
  '/sap-idm-replacement': page(sapDe, sapEn),
  '/nis2-iam': page(nis2De, nis2En),
  '/services/non-human-identity-ai-agents': page(nhiDe, nhiEn),
} satisfies Partial<Record<Pathname, Record<LandingLocale, LandingContent>>>;

export type LandingPathname = keyof typeof landingPages;

export const landingPathnames = Object.keys(landingPages) as LandingPathname[];

export function isLandingLocale(locale: string): locale is LandingLocale {
  return (landingLocales as readonly string[]).includes(locale);
}

export function isLandingPathname(pathname: string): pathname is LandingPathname {
  return pathname in landingPages;
}

export function getLanding(href: LandingPathname, locale: string): LandingContent | undefined {
  return isLandingLocale(locale) ? landingPages[href][locale] : undefined;
}
