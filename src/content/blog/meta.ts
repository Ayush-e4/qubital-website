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
  /** Key of the author in site.authors */
  author: 'arun' | 'manoj';
};

// Newest first.
export const postMeta: PostMeta[] = [
  {
    id: 'privileged-access-jit',
    author: 'arun',
    published: '2026-11-17',
    updated: '2026-11-17',
    slugs: {
      en: 'privileged-access-management-just-in-time',
      de: 'privileged-access-management-just-in-time',
      fr: 'gestion-des-acces-a-privileges-juste-a-temps',
      it: 'gestione-accessi-privilegiati-just-in-time',
      es: 'gestion-de-accesos-privilegiados-just-in-time',
      nl: 'privileged-access-management-just-in-time',
      pl: 'zarzadzanie-dostepem-uprzywilejowanym-just-in-time',
      pt: 'gestao-de-acessos-privilegiados-just-in-time',
      sv: 'privilegierad-atkomst-just-in-time',
      da: 'privilegeret-adgang-just-in-time',
    },
  },
  {
    id: 'access-reviews',
    author: 'arun',
    published: '2026-11-17',
    updated: '2026-11-17',
    slugs: {
      en: 'access-reviews-that-mean-something',
      de: 'rezertifizierung-die-wirkt',
      fr: 'revues-des-acces-efficaces',
      it: 'revisioni-degli-accessi-efficaci',
      es: 'revisiones-de-accesos-eficaces',
      nl: 'toegangsreviews-die-werken',
      pl: 'przeglady-uprawnien-ktore-dzialaja',
      pt: 'revisoes-de-acessos-eficazes',
      sv: 'behorighetsgranskningar-som-fungerar',
      da: 'adgangsgennemgange-der-virker',
    },
  },
  {
    id: 'joiner-mover-leaver',
    author: 'arun',
    published: '2026-11-17',
    updated: '2026-11-17',
    slugs: {
      en: 'joiner-mover-leaver-identity-lifecycle',
      de: 'joiner-mover-leaver-identitaetslebenszyklus',
      fr: 'joiner-mover-leaver-cycle-de-vie-des-identites',
      it: 'joiner-mover-leaver-ciclo-di-vita-delle-identita',
      es: 'joiner-mover-leaver-ciclo-de-vida-de-identidades',
      nl: 'joiner-mover-leaver-identiteitslevenscyclus',
      pl: 'joiner-mover-leaver-cykl-zycia-tozsamosci',
      pt: 'joiner-mover-leaver-ciclo-de-vida-das-identidades',
      sv: 'joiner-mover-leaver-identitetens-livscykel',
      da: 'joiner-mover-leaver-identitetens-livscyklus',
    },
  },
  {
    id: 'dpp-data-readiness',
    author: 'manoj',
    published: '2026-11-17',
    updated: '2026-11-17',
    slugs: {
      en: 'preparing-data-for-the-digital-product-passport',
      de: 'daten-fuer-den-digitalen-produktpass-vorbereiten',
      fr: 'preparer-les-donnees-pour-le-passeport-numerique-des-produits',
      it: 'preparare-i-dati-per-il-passaporto-digitale-dei-prodotti',
      es: 'preparar-los-datos-para-el-pasaporte-digital-de-producto',
      nl: 'data-voorbereiden-op-het-digitaal-productpaspoort',
      pl: 'przygotowanie-danych-do-cyfrowego-paszportu-produktu',
      pt: 'preparar-os-dados-para-o-passaporte-digital-do-produto',
      sv: 'forbered-data-for-det-digitala-produktpasset',
      da: 'klargoer-data-til-det-digitale-produktpas',
    },
  },
  {
    id: 'battery-passport-2027',
    author: 'manoj',
    published: '2026-11-17',
    updated: '2026-11-17',
    slugs: {
      en: 'battery-passport-2027-what-manufacturers-need',
      de: 'batteriepass-2027-was-hersteller-brauchen',
      fr: 'passeport-batterie-2027-ce-que-les-fabricants-doivent-preparer',
      it: 'passaporto-batteria-2027-cosa-serve-ai-produttori',
      es: 'pasaporte-de-bateria-2027-que-necesitan-los-fabricantes',
      nl: 'batterijpaspoort-2027-wat-fabrikanten-nodig-hebben',
      pl: 'paszport-baterii-2027-czego-potrzebuja-producenci',
      pt: 'passaporte-de-bateria-2027-o-que-os-fabricantes-precisam',
      sv: 'batteripass-2027-vad-tillverkare-behover',
      da: 'batteripas-2027-hvad-producenter-skal-have-klar',
    },
  },
  {
    id: 'digital-product-passport-guide',
    author: 'manoj',
    published: '2026-11-17',
    updated: '2026-11-17',
    slugs: {
      en: 'eu-digital-product-passport-explained',
      de: 'digitaler-produktpass-eu-erklaert',
      fr: 'guide-passeport-numerique-des-produits-ue',
      it: 'passaporto-digitale-dei-prodotti-ue-guida',
      es: 'pasaporte-digital-de-producto-ue-explicado',
      nl: 'digitaal-productpaspoort-eu-uitgelegd',
      pl: 'cyfrowy-paszport-produktu-ue-wyjasnienie',
      pt: 'passaporte-digital-do-produto-ue-explicado',
      sv: 'eus-digitala-produktpass-forklarat',
      da: 'eus-digitale-produktpas-forklaret',
    },
  },
  {
    id: 'iam-query-performance',
    author: 'arun',
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
    author: 'arun',
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
    author: 'arun',
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
