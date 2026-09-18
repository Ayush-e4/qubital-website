// Route + locale source of truth for sitemap.xml.
// English is served unprefixed; every other locale lives under /{locale}
// (see src/middleware.js). Adding a route here is all that is needed to have it
// emitted for all six locales with its hreflang cluster.
const BASE_URL = 'https://qubital.eu';

const LOCALES = ['en', 'de', 'fr', 'es', 'it', 'nl'];

const PAGES = [
  { path: '/', priority: 1.0, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/mission', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/why-us', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/careers', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'yearly' },
  { path: '/compliance', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/privacy-and-gdpr', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/impressum', priority: 0.2, changeFrequency: 'yearly' },
];

function localizedUrl(path, locale) {
  const suffix = path === '/' ? '' : path;
  if (locale === 'en') return `${BASE_URL}${suffix}`;
  return `${BASE_URL}/${locale}${suffix}`;
}

export default function sitemap() {
  const lastModified = new Date();

  return PAGES.flatMap(({ path, priority, changeFrequency }) =>
    LOCALES.map((locale) => ({
      url: localizedUrl(path, locale),
      lastModified,
      changeFrequency,
      // Slightly lower priority for translated versions vs the English page
      priority: locale === 'en' ? priority : +(priority * 0.9).toFixed(1),
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, localizedUrl(path, l)])
        ),
      },
    }))
  );
}
