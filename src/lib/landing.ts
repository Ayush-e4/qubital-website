import type { Metadata } from 'next';
import { site } from '@/config/site';
import {
  getLanding,
  landingLocales,
  type LandingContent,
  type LandingPathname,
} from '@/content/landing';
import { getPathname } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { ogImage as siteOgImage, ogLocale } from '@/lib/page';

/** Canonical plus hreflang for German, English and x-default (English) only. */
export function landingAlternates(locale: Locale, href: LandingPathname) {
  return {
    canonical: getPathname({ locale, href }),
    languages: {
      ...Object.fromEntries(landingLocales.map((l) => [l, getPathname({ locale: l, href })])),
      'x-default': getPathname({ locale: routing.defaultLocale, href }),
    },
  };
}

export async function landingMetadata(
  params: Promise<{ locale: string }>,
  href: LandingPathname
): Promise<Metadata> {
  const { locale } = await params;
  const page = getLanding(href, locale);
  if (!page) return {};
  // The layout's title template appends the brand; the copy files carry it for
  // the standalone preview, so strip it here to name the brand exactly once.
  const title = page.meta.title.replace(/\s·\s[^·]+$/, '');
  const { description } = page.meta;
  const image = { ...siteOgImage, url: page.service.ogImage, alt: page.meta.ogImageAlt };
  const { alternateLocale: _all, ...og } = ogLocale(locale as Locale);
  return {
    title,
    description,
    alternates: landingAlternates(locale as Locale, href),
    openGraph: {
      title: `${title} · ${site.name}`,
      description,
      url: getPathname({ locale: locale as Locale, href }),
      ...og,
      alternateLocale: landingLocales
        .filter((l) => l !== locale)
        .map((l) => (l === 'de' ? 'de_DE' : 'en_GB')),
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} · ${site.name}`,
      description,
      images: [image.url],
    },
  };
}

/** Service, FAQPage and BreadcrumbList, tied to the site-wide Organization node. */
export function landingJsonLd(page: LandingContent) {
  const url = site.url + page.path;
  const faq = page.sections.find((s) => s.type === 'faq');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: page.breadcrumb.at(-1)?.name,
        serviceType: page.service.serviceType,
        image: site.url + page.service.ogImage,
        description: page.meta.description,
        url,
        inLanguage: page.locale,
        provider: { '@id': `${site.url}/#organization` },
        areaServed: [
          { '@type': 'Place', name: 'Europe' },
          { '@type': 'Country', name: 'Germany' },
          { '@type': 'Country', name: 'Austria' },
          { '@type': 'Country', name: 'Switzerland' },
        ],
        offers: {
          '@type': 'Offer',
          name: page.hero.cta.label,
          price: '0',
          priceCurrency: 'EUR',
          url: site.url + page.hero.cta.href,
        },
      },
      ...(faq && faq.type === 'faq'
        ? [
            {
              '@type': 'FAQPage',
              '@id': `${url}#faq`,
              inLanguage: page.locale,
              mainEntity: faq.items.map(({ q, a }) => ({
                '@type': 'Question',
                name: q,
                acceptedAnswer: { '@type': 'Answer', text: a },
              })),
            },
          ]
        : []),
      {
        '@type': 'BreadcrumbList',
        itemListElement: page.breadcrumb.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          item: site.url + b.href,
        })),
      },
    ],
  };
}
