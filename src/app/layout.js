import "./globals.css";
import { headers } from "next/headers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/LenisProvider";
import PageTransition from "@/components/PageTransition";
import { LanguageProvider } from "@/components/LanguageProvider";
import { PostHogProvider } from "@/components/PostHogProvider";

const BASE_URL = "https://qubital.eu";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Qubital — Strategic IT Advisory & Systems Architecture",
    template: "%s | Qubital",
  },
  description:
    "Qubital engineers clarity across distributed architectures. Based in Bavaria, Germany, we partner with enterprises to turn technical complexity into operational simplicity.",
  keywords: [
    "IT Advisory",
    "Systems Architecture",
    "Cloud Services",
    "Cybersecurity",
    "Digital Transformation",
    "Germany",
    "Herzogenaurach",
    "IT Beratung",
    "Systemarchitektur",
  ],
  authors: [{ name: "Qubital Systems GmbH" }],
  creator: "Qubital Systems GmbH",
  publisher: "Qubital Systems GmbH",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  // hreflang alternate links for European SEO (EN, DE, FR, ES, IT, NL)
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en": BASE_URL,
      "de": `${BASE_URL}/de`,
      "fr": `${BASE_URL}/fr`,
      "es": `${BASE_URL}/es`,
      "it": `${BASE_URL}/it`,
      "nl": `${BASE_URL}/nl`,
      "x-default": BASE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "de_DE",
    url: BASE_URL,
    siteName: "Qubital",
    title: "Qubital — Strategic IT Advisory & Systems Architecture",
    description:
      "Qubital engineers clarity across distributed architectures. Based in Bavaria, Germany.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Qubital — Strategic IT Advisory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qubital — Strategic IT Advisory & Systems Architecture",
    description: "Enterprise IT advisory and systems architecture. Based in Herzogenaurach, Bavaria.",
    images: ["/og-image.png"],
  },
};

// JSON-LD Structured Data — Organisation + LocalBusiness schema
// This makes Google display rich results (address, hours, email) in search.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Qubital Systems GmbH",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "contact@qubital.eu",
        contactType: "customer support",
        availableLanguage: ["English", "German"],
      },
      sameAs: [],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#localbusiness`,
      name: "Qubital Systems GmbH",
      description:
        "Strategic IT Advisory & Systems Architecture firm based in Herzogenaurach, Bavaria, Germany.",
      url: BASE_URL,
      email: "contact@qubital.eu",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Herzogenaurach",
        addressRegion: "Bavaria",
        addressCountry: "DE",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:30",
          closes: "18:00",
        },
      ],
      priceRange: "$$$$",
      currenciesAccepted: "EUR",
      paymentAccepted: "Invoice",
      areaServed: ["Germany", "Europe"],
      serviceType: [
        "IT Advisory",
        "Systems Architecture",
        "Cloud Services",
        "Cybersecurity",
        "Managed IT",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Qubital",
      publisher: { "@id": `${BASE_URL}/#organization` },
      inLanguage: ["en", "de"],
    },
  ],
};

export default async function RootLayout({ children }) {
  // Read locale set by middleware — server-side, no client flash
  const locale = (await headers()).get("x-locale") || "en";

  return (
    <html lang={locale} className="h-full antialiased">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400&family=Plus+Jakarta+Sans:wght@600;700&display=swap"
          rel="stylesheet"
        />
        {/* Material Symbols */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface-canvas text-on-surface selection:bg-secondary-container selection:text-on-secondary-fixed min-h-full flex flex-col">
        <PostHogProvider>
          <LanguageProvider initialLocale={locale}>
            <LenisProvider>
              <Header />
              <main className="w-full pt-16 bg-surface-canvas min-h-screen flex-1 overflow-hidden">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
            </LenisProvider>
          </LanguageProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
