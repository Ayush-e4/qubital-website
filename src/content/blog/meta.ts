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
    },
  },
  {
    id: 'non-human-identity-ai-agents',
    published: '2026-10-26',
    updated: '2026-10-26',
    slugs: {
      en: 'governing-non-human-identities-and-ai-agents',
      de: 'non-human-identities-und-ki-agenten-steuern',
    },
  },
  {
    id: 'iga-for-sap',
    published: '2026-10-19',
    updated: '2026-10-19',
    slugs: {
      en: 'identity-governance-for-sap-landscapes',
      de: 'identity-governance-fuer-sap-landschaften',
    },
  },
];

/** The slug of the same post in another language, if the slug is known. */
export function translateSlug(slug: string, to: Locale): string | undefined {
  const post = postMeta.find((p) => Object.values(p.slugs).includes(slug));
  return post?.slugs[to];
}
