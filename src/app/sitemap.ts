import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { getPathname } from '@/i18n/navigation';
import { routing, type Pathname } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = Object.keys(routing.pathnames) as Pathname[];
  return pages.flatMap((href) =>
    routing.locales.map((locale) => ({
      url: site.url + getPathname({ locale, href }),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: href === '/' ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, site.url + getPathname({ locale: l, href })])
        ),
      },
    }))
  );
}
