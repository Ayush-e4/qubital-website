import { routing, type Locale, type Pathname } from '@/i18n/routing';
import nhiDa from './nhi.da.json';
import nhiDe from './nhi.de.json';
import nhiEn from './nhi.en.json';
import nhiEs from './nhi.es.json';
import nhiFr from './nhi.fr.json';
import nhiIt from './nhi.it.json';
import nhiNl from './nhi.nl.json';
import nhiPl from './nhi.pl.json';
import nhiPt from './nhi.pt.json';
import nhiSv from './nhi.sv.json';
import nis2Da from './nis2-iam.da.json';
import nis2De from './nis2-iam.de.json';
import nis2En from './nis2-iam.en.json';
import nis2Es from './nis2-iam.es.json';
import nis2Fr from './nis2-iam.fr.json';
import nis2It from './nis2-iam.it.json';
import nis2Nl from './nis2-iam.nl.json';
import nis2Pl from './nis2-iam.pl.json';
import nis2Pt from './nis2-iam.pt.json';
import nis2Sv from './nis2-iam.sv.json';
import sapDa from './sap-idm.da.json';
import sapDe from './sap-idm.de.json';
import sapEn from './sap-idm.en.json';
import sapEs from './sap-idm.es.json';
import sapFr from './sap-idm.fr.json';
import sapIt from './sap-idm.it.json';
import sapNl from './sap-idm.nl.json';
import sapPl from './sap-idm.pl.json';
import sapPt from './sap-idm.pt.json';
import sapSv from './sap-idm.sv.json';
import type { LandingContent } from './types';

export type { LandingContent, LandingSection } from './types';

/**
 * Topic landing pages, in every language of the site.
 *
 * The copy is maintained as JSON (one file per page and language), so it can be
 * edited and reviewed outside the code; see qubital-seo/pages in the marketing
 * folder for the source and the build that checks titles and descriptions.
 */
export const landingLocales = routing.locales;

// JSON imports widen string unions (a section's `type`), hence the cast; the
// shapes are checked by the smoke tests rendering every page.
const page = (byLocale: Record<Locale, unknown>) => byLocale as Record<Locale, LandingContent>;

export const landingPages = {
  '/sap-idm-replacement': page({
    de: sapDe,
    en: sapEn,
    fr: sapFr,
    it: sapIt,
    es: sapEs,
    nl: sapNl,
    pl: sapPl,
    pt: sapPt,
    sv: sapSv,
    da: sapDa,
  }),
  '/nis2-iam': page({
    de: nis2De,
    en: nis2En,
    fr: nis2Fr,
    it: nis2It,
    es: nis2Es,
    nl: nis2Nl,
    pl: nis2Pl,
    pt: nis2Pt,
    sv: nis2Sv,
    da: nis2Da,
  }),
  '/services/non-human-identity-ai-agents': page({
    de: nhiDe,
    en: nhiEn,
    fr: nhiFr,
    it: nhiIt,
    es: nhiEs,
    nl: nhiNl,
    pl: nhiPl,
    pt: nhiPt,
    sv: nhiSv,
    da: nhiDa,
  }),
} satisfies Partial<Record<Pathname, Record<Locale, LandingContent>>>;

export type LandingPathname = keyof typeof landingPages;

export const landingPathnames = Object.keys(landingPages) as LandingPathname[];

export function isLandingPathname(pathname: string): pathname is LandingPathname {
  return pathname in landingPages;
}

export function getLanding(href: LandingPathname, locale: string): LandingContent | undefined {
  return (landingPages[href] as Partial<Record<string, LandingContent>>)[locale];
}
