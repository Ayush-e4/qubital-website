'use client';

import { useLenis } from 'lenis/react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import { Logo } from '../Logo';
import { arrowRotate, ButtonLink } from '../ui/Button';
import { Container } from '../ui/Container';
import { LocaleSwitcher } from './LocaleSwitcher';
import { DockItem, DockList } from './Dock';
import { mainNav } from './nav';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev && y > 320 && !open);
  });

  // Close the mobile menu on navigation
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  // Lock scrolling while the mobile menu is open
  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }, [open, lenis]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
      >
        {t('skip')}
      </a>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4"
      >
        <Container>
          <div
            className={cn(
              'flex h-14 items-center justify-between rounded-full border pl-4 pr-2 transition-all duration-500 sm:h-16 sm:pl-5',
              scrolled || open
                ? 'border-line bg-bg/70 shadow-[0_8px_40px_-12px_rgb(0_0_0/0.25)] dark:shadow-[0_8px_40px_-12px_rgb(0_0_0/0.6)] backdrop-blur-xl'
                : 'border-transparent bg-transparent'
            )}
          >
            <Link href="/" aria-label={t('home')} className="relative z-10">
              <Logo className="h-6 sm:h-7" />
            </Link>

            <nav className="hidden lg:block" onPointerLeave={() => setHovered(null)}>
              <DockList className="flex items-center gap-1">
                {mainNav.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <DockItem key={item.key}>
                      <Link
                        href={item.href}
                        onPointerEnter={() => setHovered(item.key)}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'relative block rounded-full px-4 py-2 text-sm transition-colors',
                          active ? 'text-fg' : 'text-muted hover:text-fg'
                        )}
                      >
                        {hovered === item.key && (
                          <motion.span
                            layoutId="nav-hover"
                            className="absolute inset-0 -z-10 rounded-full bg-fg/[0.07]"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                        {/* Wrapped so the conditional pill/underline never sit next to a bare
                            text node (browser translation replaces those and breaks React) */}
                        <span>{t(item.key)}</span>
                        {active && (
                          <span className="absolute inset-x-0 -bottom-0.5 mx-auto h-px w-4 bg-gradient-to-r from-violet to-cyan" />
                        )}
                      </Link>
                    </DockItem>
                  );
                })}
              </DockList>
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              <LocaleSwitcher className="hidden sm:flex" />
              <div className="hidden xl:block">
                <ButtonLink href="/contact">{t('cta')}</ButtonLink>
              </div>
              {/* Compact CTA on small desktops, leaving room for the dock magnification */}
              <Link
                href="/contact"
                aria-label={t('cta')}
                title={t('cta')}
                className="group hidden size-10 items-center justify-center rounded-full bg-fg text-bg transition-colors duration-200 hover:bg-fg/85 lg:flex xl:hidden"
              >
                <ArrowUpRight className={arrowRotate} />
              </Link>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? t('closeMenu') : t('openMenu')}
                className="relative z-10 flex size-10 items-center justify-center rounded-full border border-line bg-fg/[0.04] lg:hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={open ? 'x' : 'menu'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {open ? <X className="size-5" /> : <Menu className="size-5" />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </Container>
      </motion.header>

      <AnimatePresence>{open && <MobileMenu onNavigate={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}

function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const items = [...mainNav, { href: '/contact', key: 'contact' } as const];

  return (
    <motion.div
      id="mobile-menu"
      initial={{ clipPath: 'circle(0% at calc(100% - 3rem) 2.5rem)' }}
      animate={{ clipPath: 'circle(150% at calc(100% - 3rem) 2.5rem)' }}
      exit={{ clipPath: 'circle(0% at calc(100% - 3rem) 2.5rem)' }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-40 flex flex-col bg-bg/95 backdrop-blur-2xl lg:hidden"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/3 size-96 rounded-full bg-violet/20 blur-[120px]"
      />
      <Container className="relative flex flex-1 flex-col justify-between pb-10 pt-28">
        <nav>
          <ul className="flex flex-col gap-1">
            {items.map((item, i) => (
              <motion.li
                key={item.key}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    'flex items-baseline gap-4 py-2 text-4xl font-medium tracking-tight sm:text-5xl',
                    pathname === item.href ? 'text-fg' : 'text-fg/60'
                  )}
                >
                  <span className="font-mono text-xs text-faint">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {t(item.key)}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-between border-t border-line pt-6"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            {t('language')}
          </span>
          <LocaleSwitcher />
        </motion.div>
      </Container>
    </motion.div>
  );
}
