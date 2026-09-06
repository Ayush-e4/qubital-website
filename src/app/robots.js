export default function robots() {
  return {
    rules: [
      {
        // Allow all well-behaved crawlers
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        // Block AI training crawlers — common GDPR-conscious practice
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'Google-Extended',
        disallow: '/',
      },
    ],
    sitemap: 'https://qubital.eu/sitemap.xml',
    host: 'https://qubital.eu',
  };
}
