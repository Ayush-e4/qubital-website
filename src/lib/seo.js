import { headers } from 'next/headers';

export const SITE_URL = 'https://qubital.eu';
export const SITE_NAME = 'Qubital';

export const LOCALES = ['en', 'de', 'fr', 'es', 'it', 'nl'];

const OG_LOCALES = {
  en: 'en_US',
  de: 'de_DE',
  fr: 'fr_FR',
  es: 'es_ES',
  it: 'it_IT',
  nl: 'nl_NL',
};

const OG_IMAGE = '/og-image.png';

/**
 * Locale-prefixed path. English lives at the unprefixed path, every other
 * locale is served under /{locale} (see src/middleware.js).
 */
export function localizedPath(path, locale) {
  if (!locale || locale === 'en') return path;
  return `/${locale}${path === '/' ? '' : path}`;
}

/**
 * Self-referencing canonical plus a full hreflang cluster for one logical
 * page. Relative values resolve against the root `metadataBase`.
 */
export function buildAlternates(path, locale) {
  return {
    canonical: localizedPath(path, locale),
    languages: {
      ...Object.fromEntries(LOCALES.map((l) => [l, localizedPath(path, l)])),
      'x-default': localizedPath(path, 'en'),
    },
  };
}

/**
 * Metadata for a single logical page, resolved for the locale the middleware
 * rewrote into the `x-locale` header. `path` is the unprefixed route, e.g.
 * '/about' or '/'.
 */
export async function pageMetadata({ title, description, path }) {
  const locale = (await headers()).get('x-locale') || 'en';

  return {
    // `title` is the complete, final title (e.g. 'About | Qubital'). Using
    // `absolute` bypasses the root `title.template`, which otherwise appends
    // ' | Qubital' a second time, and keeps <title> identical to og:title /
    // twitter:title instead of diverging from them.
    title: { absolute: title },
    description,
    alternates: buildAlternates(path, locale),
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: OG_LOCALES[locale] || OG_LOCALES.en,
      title,
      description,
      url: localizedPath(path, locale),
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — ${title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
