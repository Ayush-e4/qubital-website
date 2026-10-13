import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['de', 'en'],
  defaultLocale: 'de',
  pathnames: {
    '/': '/',
    '/services': { de: '/leistungen', en: '/services' },
    '/platforms': { de: '/plattformen', en: '/platforms' },
    '/about': { de: '/ueber-uns', en: '/about' },
    '/approach': { de: '/vorgehen', en: '/approach' },
    '/industries': { de: '/branchen', en: '/industries' },
    '/careers': { de: '/karriere', en: '/careers' },
    '/contact': { de: '/kontakt', en: '/contact' },
    '/imprint': { de: '/impressum', en: '/imprint' },
    '/privacy': { de: '/datenschutz', en: '/privacy' },
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathname = keyof typeof routing.pathnames;
