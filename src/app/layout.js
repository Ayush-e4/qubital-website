import './globals.css';
import { headers } from 'next/headers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LenisProvider from '@/components/LenisProvider';
import PageTransition from '@/components/PageTransition';
import { LanguageProvider } from '@/components/LanguageProvider';
import { PostHogProvider } from '@/components/PostHogProvider';
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';

const BASE_URL = 'https://qubital.eu';

// Self-hosted at build time: `next/font` downloads the woff2 files and serves
// them from our own origin, so no font request ever reaches Google. That
// removes a render-blocking third-party stylesheet — a DNS lookup, TLS
// handshake and CSS fetch before first paint — and stops the visitor's IP
// being sent to Google, which matters for a German site whose privacy page
// makes GDPR claims.
//
// The weights are exactly the ones the design uses, so nothing unused ships.
// `latin` covers every character in the six locales (umlauts, accents, ß).
// `next/font` also emits a size-adjusted fallback face, so text does not shift
// when the real font swaps in — that is CLS, 25% of the mobile score.
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
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
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Qubital — Strategic IT Advisory & Systems Architecture',
  },
  description:
    'Qubital engineers clarity across distributed architectures. Based in Bavaria, Germany, we partner with enterprises to turn technical complexity into operational simplicity.',
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
    url: BASE_URL,
    siteName: 'Qubital',
    title: 'Qubital — Strategic IT Advisory & Systems Architecture',
    description:
      'Qubital engineers clarity across distributed architectures. Based in Bavaria, Germany.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Qubital — Strategic IT Advisory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Qubital — Strategic IT Advisory & Systems Architecture',
    description:
      'Enterprise IT advisory and systems architecture. Based in Herzogenaurach, Bavaria.',
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
      '@id': `${BASE_URL}/#organization`,
      name: 'Qubital Systems GmbH',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
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
      '@id': `${BASE_URL}/#localbusiness`,
      name: 'Qubital Systems GmbH',
      description:
        'Strategic IT Advisory & Systems Architecture firm based in Herzogenaurach, Bavaria, Germany.',
      url: BASE_URL,
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
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'Qubital',
      publisher: { '@id': `${BASE_URL}/#organization` },
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
      className={`h-full antialiased ${inter.variable} ${jetbrainsMono.variable} ${plusJakartaSans.variable}`}
    >
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* The text families are self-hosted via `next/font` above, so no
            preconnect or stylesheet is needed for them.
            Material Symbols is the one remaining third-party font request: it
            is a variable icon font with a wght/FILL axis that `next/font` does
            not serve, and its 47 usages are spread across 12 files. Replacing
            it with `lucide-react` (already a dependency) would remove this
            request and the two Google origins from the CSP below. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          precedence="default"
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
