import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { postMeta } from '@/content/blog/meta';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import type { StaticPathname } from '@/lib/page';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = (Object.keys(routing.pathnames) as string[]).filter(
    (href): href is StaticPathname => !href.includes('[')
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

  return [...staticEntries, ...postEntries];
}
