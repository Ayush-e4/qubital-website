import './globals.css';
import { headers } from 'next/headers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LenisProvider from '@/components/LenisProvider';
import PageTransition from '@/components/PageTransition';
import { LanguageProvider } from '@/components/LanguageProvider';
import { PostHogProvider } from '@/components/PostHogProvider';
import { SITE_URL } from '@/lib/constants';
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';

// Self-hosted at build time: `next/font` downloads the woff2 files and serves
// them from our own origin, so no font request ever reaches Google. That
// removes a render-blocking third-party stylesheet — a DNS lookup, TLS
// handshake and CSS fetch before first paint — and stops the visitor's IP
// being sent to Google, which matters for a German site whose privacy page
// makes GDPR claims.
//
// The weights below are the ones the type scale in globals.css actually uses.
// Anything not listed here is silently substituted by the browser: the site
// asked for `font-bold`/`font-extrabold` (700/800) in well over a hundred
// places while loading only 400/500/600, so that text never rendered bold.
// `latin` covers every character in the six locales (umlauts, accents, ß).
// `next/font` also emits a size-adjusted fallback face, so text does not shift
// when the real font swaps in — that is CLS, 25% of the mobile score.
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Qubital — The IT Partner for Growing Companies',
  },
  description:
    'IT advisory and systems architecture for growing companies. Software, cloud, security and SAP, delivered by senior engineers. Based in Herzogenaurach, Germany.',
  keywords: [
    'IT Advisory',
    'Systems Architecture',
    'Cloud Services',
    'Cybersecurity',
    'Digital Transformation',
    'Germany',
    'Herzogenaurach',
    'IT Beratung',
    'Systemarchitektur',
  ],
  authors: [{ name: 'Qubital Systems GmbH' }],
  creator: 'Qubital Systems GmbH',
  publisher: 'Qubital Systems GmbH',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'de_DE',
    url: SITE_URL,
    siteName: 'Qubital',
    title: 'Qubital — The IT Partner for Growing Companies',
    description:
      'IT advisory and systems architecture for growing companies. Based in Herzogenaurach, Germany.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Qubital — IT partner for growing companies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Qubital — The IT Partner for Growing Companies',
    description:
      'IT advisory and systems architecture for growing companies. Based in Herzogenaurach, Bavaria.',
    images: ['/og-image.png'],
  },
};

// JSON-LD Structured Data — Organisation + LocalBusiness schema
// This makes Google display rich results (address, hours, email) in search.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Qubital Systems GmbH',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'contact@qubital.eu',
        contactType: 'customer support',
        availableLanguage: ['English', 'German'],
      },
      sameAs: [],
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#localbusiness`,
      name: 'Qubital Systems GmbH',
      description:
        'IT advisory and systems architecture for growing companies. Based in Herzogenaurach, Bavaria, Germany.',
      url: SITE_URL,
      email: 'contact@qubital.eu',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Herzogenaurach',
        addressRegion: 'Bavaria',
        addressCountry: 'DE',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '18:00',
        },
      ],
      priceRange: '$$$$',
      currenciesAccepted: 'EUR',
      paymentAccepted: 'Invoice',
      areaServed: ['Germany', 'Europe'],
      serviceType: [
        'SAP Solutions & Architecture',
        'Systems Architecture',
        'Cloud Services',
        'Cybersecurity',
        'Managed IT',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Qubital',
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: ['en', 'de'],
    },
  ],
};

export default async function RootLayout({ children }) {
  // Read locale set by middleware — server-side, no client flash
  const locale = (await headers()).get('x-locale') || 'en';

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`h-full antialiased ${inter.variable} ${jetbrainsMono.variable} ${plusJakartaSans.variable}`}
    >
      <head>
        {/* Scroll-reveal is scoped to `.js`, which is added here before first
            paint — and only when IntersectionObserver exists. With scripting
            unavailable the class is never set, so reveal elements stay visible
            rather than being stuck at the server-rendered hidden state.
            suppressHydrationWarning is required because this class is not part
            of the markup React hydrates (same pattern as next-themes). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if('IntersectionObserver' in window){document.documentElement.classList.add('js')}",
          }}
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-surface-canvas text-on-surface selection:bg-secondary-container selection:text-on-secondary-fixed min-h-full flex flex-col">
        <PostHogProvider>
          <LanguageProvider>
            <LenisProvider>
              <Header />
              {/* Shell wrapper only — the page itself renders the <main>
                  landmark. Nesting them produced duplicate/nested main
                  landmarks and confused screen readers. */}
              <div className="w-full pt-16 bg-surface-canvas min-h-screen flex-1 overflow-hidden">
                <PageTransition>{children}</PageTransition>
              </div>
              <Footer />
            </LenisProvider>
          </LanguageProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
