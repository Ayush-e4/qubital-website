import { LOCALES, localizedPath } from '@/lib/i18n/paths';

// Route source of truth for sitemap.xml. Adding a route here is all that is
// needed to emit it for every locale with its hreflang cluster.
const BASE_URL = 'https://qubital.eu';

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

/** Absolute URL for a route+locale. The root has no trailing slash. */
const absoluteUrl = (path, locale) =>
  `${BASE_URL}${localizedPath(path, locale)}`.replace(/\/$/, '');

export default function sitemap() {
  const lastModified = new Date();

  return PAGES.flatMap(({ path, priority, changeFrequency }) =>
    LOCALES.map((locale) => ({
      url: absoluteUrl(path, locale),
      lastModified,
      changeFrequency,
      // Slightly lower priority for translated versions vs the English page
      priority: locale === 'en' ? priority : +(priority * 0.9).toFixed(1),
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, absoluteUrl(path, l)])
        ),
      },
    }))
  );
}
