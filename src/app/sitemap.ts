import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { postMeta } from '@/content/blog/meta';
import { isLandingPathname, landingLocales, landingPathnames } from '@/content/landing';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import type { StaticPathname } from '@/lib/page';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = (Object.keys(routing.pathnames) as string[]).filter(
    (href): href is StaticPathname => !href.includes('[') && !isLandingPathname(href)
  );

  const staticEntries = pages.flatMap((href) =>
    routing.locales.map((locale) => ({
      url: site.url + getPathname({ locale, href }),
      lastModified: new Date(),
      changeFrequency: (href === '/blog' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
      priority: href === '/' ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, site.url + getPathname({ locale: l, href })])
        ),
      },
    }))
  );

  // Each post has its own slug per language; the hreflang pair links them.
  const postUrl = (locale: (typeof routing.locales)[number], slug: string) =>
    site.url + getPathname({ locale, href: { pathname: '/blog/[slug]', params: { slug } } });

  const postEntries = postMeta.flatMap((post) =>
    routing.locales.map((locale) => ({
      url: postUrl(locale, post.slugs[locale]),
      lastModified: new Date(post.updated),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, postUrl(l, post.slugs[l])])),
      },
    }))
  );

  // Landing pages exist in German and English only, so only those two are listed
  // and linked; x-default points at English like everywhere else.
  const landingEntries = landingPathnames.flatMap((href) =>
    landingLocales.map((locale) => ({
      url: site.url + getPathname({ locale, href }),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          ...Object.fromEntries(
            landingLocales.map((l) => [l, site.url + getPathname({ locale: l, href })])
          ),
          'x-default': site.url + getPathname({ locale: routing.defaultLocale, href }),
        },
      },
    }))
  );

  return [...staticEntries, ...landingEntries, ...postEntries];
}
