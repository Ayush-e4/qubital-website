import type { Locale } from '@/i18n/routing';

// Light post index: ids, dates and the localized slugs. Kept apart from the
// article bodies so client components (the language switcher) can map a post's
// slug to its counterpart in the other language without shipping the articles.
export type PostMeta = {
  id: string;
  /** ISO date of first publication */
  published: string;
  /** ISO date of the last substantive update */
  updated: string;
  slugs: Record<Locale, string>;
};

// Newest first.
export const postMeta: PostMeta[] = [
  {
    id: 'iam-query-performance',
    published: '2026-11-02',
    updated: '2026-11-02',
    slugs: {
      en: 'iam-query-performance-70-seconds-to-under-one',
      de: 'iam-performance-abfrage-70-sekunden-unter-eine',
      fr: 'requete-iam-lente-de-70-secondes-a-moins-d-une',
      it: 'query-iam-lenta-da-70-secondi-a-meno-di-uno',
      es: 'de-70-segundos-a-menos-de-uno-consulta-iam-lenta',
      nl: 'iam-databasequery-van-70-seconden-naar-onder-een-seconde',
      pl: 'z-70-sekund-do-ponizej-jednej-wolne-zapytanie-iam',
      pt: 'de-70-segundos-a-menos-de-um-consulta-iam-lenta',
      sv: 'fran-70-sekunder-till-under-en-langsam-iam-databasfraga',
      da: 'fra-70-sekunder-til-under-et-langsom-iam-foresporgsel',
    },
  },
  {
    id: 'non-human-identity-ai-agents',
    published: '2026-10-26',
    updated: '2026-10-26',
    slugs: {
      en: 'governing-non-human-identities-and-ai-agents',
      de: 'non-human-identities-und-ki-agenten-steuern',
      fr: 'identites-non-humaines-et-agents-ia',
      it: 'identita-non-umane-agenti-ai-governance',
      es: 'identidades-no-humanas-y-agentes-de-ia',
      nl: 'niet-menselijke-identiteiten-en-ai-agents',
      pl: 'tozsamosci-nieosobowe-i-agenci-ai',
      pt: 'identidades-nao-humanas-e-agentes-de-ia',
      sv: 'icke-manskliga-identiteter-och-ai-agenter',
      da: 'ikke-menneskelige-identiteter-og-ai-agenter',
    },
  },
  {
    id: 'iga-for-sap',
    published: '2026-10-19',
    updated: '2026-10-19',
    slugs: {
      en: 'identity-governance-for-sap-landscapes',
      de: 'identity-governance-fuer-sap-landschaften',
      fr: 'gouvernance-des-identites-pour-sap',
      it: 'identity-governance-sap',
      es: 'gobierno-de-identidades-para-entornos-sap',
      nl: 'identity-governance-voor-sap-landschappen',
      pl: 'zarzadzanie-tozsamoscia-w-srodowiskach-sap',
      pt: 'governacao-de-identidades-para-ambientes-sap',
      sv: 'identitetsstyrning-for-sap-miljoer',
      da: 'identitetsstyring-for-sap-landskaber',
    },
  },
];

/** The slug of the same post in another language, if the slug is known. */
export function translateSlug(slug: string, to: Locale): string | undefined {
  const post = postMeta.find((p) => Object.values(p.slugs).includes(slug));
  return post?.slugs[to];
}
