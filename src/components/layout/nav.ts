import type { Pathname } from '@/i18n/routing';

export const mainNav = [
  { href: '/services', key: 'services' },
  { href: '/about', key: 'about' },
  { href: '/approach', key: 'approach' },
  { href: '/industries', key: 'industries' },
  { href: '/careers', key: 'careers' },
] as const satisfies readonly { href: Pathname; key: string }[];
