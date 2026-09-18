/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== 'production';

// Third parties the app talks to from the browser:
//   - PostHog: bundle served from *-assets, events posted to the api host
//   - Google Fonts: stylesheet + font files
// Next injects inline bootstrap scripts and Tailwind emits inline styles, so
// 'unsafe-inline' is required until a nonce-based CSP is wired up. 'unsafe-eval'
// is only needed by the dev-mode React refresh runtime.
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://eu.i.posthog.com https://eu-assets.i.posthog.com`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "connect-src 'self' https://eu.i.posthog.com https://eu-assets.i.posthog.com",
].join('; ');

const securityHeaders = [
  // Deliberately without `includeSubDomains`/`preload`: those commit every
  // subdomain of qubital.eu to HTTPS, which we can't verify from here. Add them
  // once confirmed that no subdomain is HTTP-only.
  { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
];

// Every route except `/` is deterministic per URL — verified by fetching
// /de/about with different Accept-Language and cookie values and getting
// byte-identical HTML. Next marks these responses `no-store` because the layout
// reads `headers()`, which forces a fresh server render per request even though
// the result never changes for a given URL. Letting the edge cache them avoids
// that.
//
// `/` is excluded on purpose: it redirects on Accept-Language and NEXT_LOCALE,
// so it is the one route that genuinely varies per request.
const edgeCacheHeaders = [
  {
    key: 'Cache-Control',
    value: 'public, s-maxage=3600, stale-while-revalidate=86400',
  },
];

const nextConfig = {
  poweredByHeader: false,
  // `output: 'standalone'` emits .next/standalone — the self-contained server
  // bundle used off Vercel (containers, Azure App Service, Container Apps).
  //
  // It is applied only when NOT building on Vercel: Vercel manages its own
  // deployment output, and the build failed there with this set (see #39). The
  // standalone bundle is therefore still produced for a self-hosted build,
  // which is the only place it is used.
  ...(process.env.VERCEL ? {} : { output: 'standalone' }),
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
      // `/:path+` needs at least one segment, so it matches every page but not
      // the root.
      { source: '/:path+', headers: edgeCacheHeaders },
    ];
  },
};

export default nextConfig;
