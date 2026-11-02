import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Analytics } from '@/components/Analytics';
import { InlineScript } from '@/components/InlineScript';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { site } from '@/config/site';
import { routing } from '@/i18n/routing';
import { alternates, ogImage } from '@/lib/page';
import { themeScript } from '@/lib/theme';
import '../globals.css';

// Fonts are self-hosted by next/font, so no requests go to Google (GDPR).
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });
const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  // Light by default; dark is an explicit choice made on the page
  themeColor: '#f6f6f9',
  colorScheme: 'light',
};

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL(site.url),
    title: { default: t('title'), template: `%s · ${site.name}` },
    description: t('description'),
    alternates: alternates(locale, '/'),
    openGraph: {
      type: 'website',
      siteName: site.name,
      title: t('title'),
      description: t('description'),
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [ogImage.url],
    },
  };
}

// Structured data for search engines. Only confirmed facts: no prices, hours of
// a physical office or services the client has not signed off on.
function organizationJsonLd(description: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${site.url}/#organization`,
        name: site.legalName,
        alternateName: site.name,
        url: site.url,
        logo: `${site.url}/icon-512.png`,
        description,
        email: site.email,
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'Bavaria',
          addressCountry: 'DE',
        },
        sameAs: [site.linkedin],
        image: `${site.url}${ogImage.url}`,
        areaServed: ['Germany', 'Europe'],
        knowsAbout: [
          'Identity and Access Management (IAM)',
          'Identity Governance and Administration (IGA)',
          'Privileged Access Management (PAM)',
          'Customer Identity and Access Management (CIAM)',
          'Workforce Identity',
          'Non-Human Identity (NHI) governance',
          'AI agent identity governance',
          'SAP identity integration',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          email: site.email,
          contactType: 'customer support',
          availableLanguage: ['German', 'English'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { '@id': `${site.url}/#organization` },
        inLanguage: ['de', 'en'],
      },
    ],
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const tMeta = await getTranslations({ locale, namespace: 'meta' });
  const jsonLd = organizationJsonLd(tMeta('description'));

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
      // data-theme is set by the inline script before hydration
      suppressHydrationWarning
    >
      <head>
        <InlineScript html={themeScript} />
        <script
          type="application/ld+json"
          // `<` escaped so no value can close the script element
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      </head>
      <body className="grain min-h-svh overflow-x-clip">
        <Analytics />
        <NextIntlClientProvider>
          <SmoothScroll>
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
