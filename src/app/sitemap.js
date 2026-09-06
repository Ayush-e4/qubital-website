export default function sitemap() {
  const base = 'https://qubital.eu';
  const lastMod = new Date('2026-09-07');

  // All page routes
  const pages = [
    { path: '/',               priority: 1.0, changeFrequency: 'monthly' },
    { path: '/about',          priority: 0.9, changeFrequency: 'monthly' },
    { path: '/services',       priority: 0.9, changeFrequency: 'monthly' },
    { path: '/careers',        priority: 0.7, changeFrequency: 'weekly'  },
    { path: '/contact',        priority: 0.8, changeFrequency: 'yearly'  },
    { path: '/privacy-and-gdpr', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/impressum',      priority: 0.2, changeFrequency: 'yearly'  },
    { path: '/compliance',     priority: 0.4, changeFrequency: 'yearly'  },
  ];

  // Generate entries for each locale
  const localePrefix = ['', '/de'];

  return pages.flatMap(({ path, priority, changeFrequency }) =>
    localePrefix.map((prefix) => ({
      url: `${base}${prefix}${path}`,
      lastModified: lastMod,
      changeFrequency,
      // Slightly lower priority for translated version vs canonical
      priority: prefix === '/de' ? +(priority * 0.9).toFixed(1) : priority,
    }))
  );
}
