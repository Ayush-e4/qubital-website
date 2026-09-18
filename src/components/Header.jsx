'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { NAV_LINKS, COMPANY_INFO } from '@/lib/constants';
import { Dock, DockIcon } from '@/components/ui/dock';
import { useLanguage } from '@/components/LanguageProvider';
import { localeFromPath, localizedPath, stripLocale } from '@/lib/i18n/paths';

const NAV_KEY_MAP = {
  '/': 'home',
  '/about': 'about',
  '/mission': 'mission',
  '/why-us': 'why_us',
  '/services': 'services',
  '/careers': 'careers',
  '/contact': 'contact',
};

const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'de', label: 'Deutsch', short: 'DE' },
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'it', label: 'Italiano', short: 'IT' },
  { code: 'nl', label: 'Nederlands', short: 'NL' },
];

export default function Header() {
  const pathname = usePathname();
  const { t, locale, setLocale } = useLanguage();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langDropdownRef = useRef(null);
  const langButtonRef = useRef(null);
  const drawerRef = useRef(null);
  const backdropRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Locale of the current URL, or null when unprefixed (English)
  const currentPrefix = localeFromPath(pathname);

  const activeLocale = currentPrefix || locale || 'en';

  // Build locale-aware href for navigation links
  const localePath = useCallback((path) => localizedPath(path, currentPrefix), [currentPrefix]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu when the route changes. Adjusted during render
  // (React's "adjust state when a prop changes" pattern) rather than in an
  // effect, which would cause a cascading render.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Canonical path without locale prefix for active-state matching
  const canonicalPath = stripLocale(pathname).path;

  // Compute locale-preserving path when switching language
  const getSwitchPath = useCallback(
    (targetLang) => localizedPath(canonicalPath, targetLang),
    [canonicalPath]
  );

  // Smooth GSAP Close Handler
  const handleClose = useCallback(() => {
    if (drawerRef.current) {
      const tl = gsap.timeline({
        onComplete: () => setMobileOpen(false),
      });

      tl.to(drawerRef.current, {
        xPercent: -100,
        duration: 0.28,
        ease: 'power2.in',
      });

      if (backdropRef.current) {
        tl.to(backdropRef.current, { opacity: 0, duration: 0.2 }, '-=0.15');
      }
    } else {
      setMobileOpen(false);
    }
  }, []);

  // GSAP Choreography for Left-Sliding Drawer
  useEffect(() => {
    if (!mobileOpen || !drawerRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (backdropRef.current) {
      tl.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35 });
    }

    tl.fromTo(
      drawerRef.current,
      { xPercent: -100 },
      { xPercent: 0, duration: 0.45, ease: 'expo.out' },
      backdropRef.current ? '-=0.2' : 0
    )
      .fromTo(
        '.mobile-lang-chip',
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.22, stagger: 0.02 },
        '-=0.2'
      )
      .fromTo(
        '.mobile-nav-link-item',
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.32, stagger: 0.03 },
        '-=0.15'
      )
      .fromTo(
        '.mobile-drawer-footer-content',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.25 },
        '-=0.1'
      );
  }, [mobileOpen]);

  // Mobile drawer: move focus into the panel, keep Tab inside it, close on
  // Escape, and hand focus back to the trigger when it closes.
  useEffect(() => {
    if (!mobileOpen) return undefined;

    const trigger = menuButtonRef.current;
    const focusables = () =>
      drawerRef.current
        ? Array.from(
            drawerRef.current.querySelectorAll(
              'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
          ).filter((el) => el.offsetParent !== null)
        : [];

    focusables()[0]?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      trigger?.focus();
    };
  }, [mobileOpen, handleClose]);

  // Close desktop language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] border-b transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-blue-500/20 shadow-[0_4px_25px_rgba(0,102,255,0.06)]'
            : 'bg-white/95 backdrop-blur-md border-border-subtle'
        }`}
      >
        <div className="h-16 max-w-[72rem] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link href={localePath('/')} className="flex items-center gap-3 group">
              <Image
                alt="Qubital Logo"
                className="h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                src={COMPANY_INFO.logoUrl}
                width={32}
                height={32}
                priority
              />
              <div className="flex flex-col">
                <span className="text-style-headline-sm tracking-tight text-text-primary font-bold leading-none">
                  Qubital
                </span>
                <span className="text-[9px] font-mono tracking-widest uppercase text-primary font-semibold mt-0.5 hidden sm:inline-block">
                  Systems // Germany
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center">
            <Dock
              className="bg-transparent border-none shadow-none h-12"
              iconMagnification={20}
              iconDistance={80}
            >
              {NAV_LINKS.map((link) => {
                const isActive = canonicalPath === link.path;
                const label = t.nav[NAV_KEY_MAP[link.path]] ?? link.label;
                return (
                  <DockIcon
                    key={link.path}
                    className={
                      isActive
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'text-on-surface-variant hover:text-primary'
                    }
                  >
                    <Link
                      href={localePath(link.path)}
                      className="flex h-full w-full items-center justify-center"
                      title={label}
                      {...(isActive ? { 'aria-current': 'page' } : {})}
                    >
                      {label}
                    </Link>
                  </DockIcon>
                );
              })}
            </Dock>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Language Switcher Glass Capsule */}
            <div
              className="relative"
              ref={langDropdownRef}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  setLangOpen(false);
                  langButtonRef.current?.focus();
                }
              }}
            >
              <button
                ref={langButtonRef}
                type="button"
                onClick={() => setLangOpen(!langOpen)}
                className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200/90 hover:border-blue-400/50 bg-white/80 hover:bg-blue-50/50 transition-all duration-200 text-xs font-mono font-bold text-slate-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)] backdrop-blur-md cursor-pointer select-none"
                aria-label={t.header?.change_language || 'Change language'}
                aria-expanded={langOpen}
                aria-controls="header-language-menu"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_6px_rgba(37,99,235,0.6)]" />
                <span className="material-symbols-outlined text-[15px] text-blue-600 group-hover:scale-110 transition-transform duration-200">
                  language
                </span>
                <span className="tracking-wider">
                  {LANGUAGES.find((l) => l.code === activeLocale)?.short || 'EN'}
                </span>
                <span
                  className={`material-symbols-outlined text-[14px] text-slate-400 group-hover:text-blue-600 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}
                >
                  expand_more
                </span>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    id="header-language-menu"
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-48 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.12)] py-1.5 z-[70] overflow-hidden"
                  >
                    <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold flex items-center justify-between">
                      <span>{t.footer?.languages || 'Languages'}</span>
                      <span className="text-blue-600 font-bold">6 European</span>
                    </div>
                    {LANGUAGES.map((lang) => {
                      const isCurrent = activeLocale === lang.code;
                      return (
                        <Link
                          key={lang.code}
                          href={getSwitchPath(lang.code)}
                          onClick={() => {
                            setLocale(lang.code);
                            setLangOpen(false);
                          }}
                          className={`flex items-center justify-between px-3.5 py-2 text-xs transition-colors ${
                            isCurrent
                              ? 'bg-blue-50/80 text-blue-700 font-bold'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                          }`}
                        >
                          <span className="font-medium">{lang.label}</span>
                          <span
                            className={`font-mono text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded-md ${
                              isCurrent ? 'bg-blue-600 text-white' : 'text-slate-400 bg-slate-100'
                            }`}
                          >
                            {lang.short}
                          </span>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href={localePath('/contact')}
              className="hidden sm:inline-flex items-center text-style-label-md bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-2 rounded-full hover:from-blue-500 hover:to-blue-600 transition-all shadow-[0_2px_12px_rgba(0,102,255,0.25)] font-semibold text-xs uppercase tracking-wider"
            >
              {t.header.cta}
            </Link>

            {/* Custom Animated Executive Mobile Menu Button (Pill + Morphing Dual Lines) */}
            <button
              ref={menuButtonRef}
              className="md:hidden flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200/90 hover:border-blue-400/50 bg-white/90 hover:bg-slate-100/90 transition-all duration-200 shadow-2xs active:scale-95 backdrop-blur-md cursor-pointer select-none"
              onClick={() => {
                if (mobileOpen) {
                  handleClose();
                } else {
                  setMobileOpen(true);
                }
              }}
              aria-label={
                mobileOpen
                  ? t.header?.close_menu || 'Close menu'
                  : t.header?.open_menu || 'Open menu'
              }
              aria-expanded={mobileOpen}
              aria-controls="header-mobile-menu"
            >
              {/* Morphing Dual-Line Icon */}
              <div className="w-4 h-3 flex flex-col justify-between items-center relative py-0.5">
                <span
                  className={`w-4 h-[2px] bg-slate-900 rounded-full block transform transition-all duration-200 ${
                    mobileOpen ? 'rotate-45 translate-y-[3.5px] bg-blue-600' : ''
                  }`}
                />
                <span
                  className={`w-4 h-[2px] bg-slate-900 rounded-full block transform transition-all duration-200 ${
                    mobileOpen ? '-rotate-45 -translate-y-[3.5px] bg-blue-600' : ''
                  }`}
                />
              </div>

              {/* Text Label */}
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-slate-900 select-none">
                {mobileOpen ? t.header?.close || 'CLOSE' : t.header?.menu || 'MENU'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Left-Sliding Translucent Bluish Glass with GSAP) */}
      {mobileOpen && (
        <>
          {/* Frosted Deep Backdrop */}
          <div
            ref={backdropRef}
            className="fixed inset-0 z-[65] bg-[#020617]/65 backdrop-blur-md transition-opacity"
            onClick={handleClose}
          />

          {/* Left-Sliding Panel Container */}
          <div
            ref={drawerRef}
            id="header-mobile-menu"
            className="fixed top-0 left-0 bottom-0 z-[70] w-[88vw] max-w-[380px] flex flex-col overflow-hidden bg-[#060e24]/92 backdrop-blur-2xl text-white border-r border-blue-500/25 shadow-[12px_0_50px_rgba(0,102,255,0.22)]"
          >
            {/* Ambient Lighting Layers */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 -left-20 w-56 h-56 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

            {/* Mobile Header */}
            <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <Image
                  alt="Qubital Logo"
                  className="h-7 w-auto object-contain brightness-110 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                  src={COMPANY_INFO.logoUrl}
                  width={28}
                  height={28}
                />
                <div className="flex flex-col">
                  <span className="text-base font-bold tracking-tight text-white leading-tight">
                    Qubital
                  </span>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-blue-400/80 font-semibold">
                    Systems // Munich
                  </span>
                </div>
              </div>

              {/* Close Button Pill */}
              <button
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/15 backdrop-blur-md transition-all cursor-pointer"
                onClick={handleClose}
                aria-label={t.header?.close_menu || 'Close menu'}
              >
                <span className="w-3.5 h-3.5 flex items-center justify-center relative">
                  <span className="w-3.5 h-[2px] bg-white rounded-full absolute rotate-45" />
                  <span className="w-3.5 h-[2px] bg-white rounded-full absolute -rotate-45" />
                </span>
                <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-white/90">
                  {t.header?.close || 'CLOSE'}
                </span>
              </button>
            </div>

            {/* Redesigned Language Segmented Glass Capsule */}
            <div className="relative z-10 px-6 py-3.5 border-b border-white/[0.08] bg-white/[0.02] mobile-lang-container">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase text-blue-300/80 font-semibold tracking-widest">
                  {t.footer?.languages || 'Languages'}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Active: <strong className="text-blue-300 uppercase">{activeLocale}</strong>
                </span>
              </div>

              <div className="grid grid-cols-6 gap-1 p-1 rounded-xl bg-white/[0.05] border border-white/[0.1] backdrop-blur-md">
                {LANGUAGES.map((lang) => {
                  const isCurrent = activeLocale === lang.code;
                  return (
                    <Link
                      key={lang.code}
                      href={getSwitchPath(lang.code)}
                      onClick={() => {
                        setLocale(lang.code);
                        handleClose();
                      }}
                      title={lang.label}
                      className={`mobile-lang-chip flex flex-col items-center justify-center py-2 px-0.5 rounded-lg text-xs transition-all relative font-mono select-none ${
                        isCurrent
                          ? 'bg-blue-600/35 border border-blue-400/60 text-white font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                          : 'border border-transparent text-slate-400 hover:text-white hover:bg-white/[0.08] font-medium'
                      }`}
                    >
                      <span className="text-xs uppercase tracking-tight">{lang.short}</span>
                      {isCurrent && (
                        <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee] mt-0.5" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Architectural Navigation Links */}
            <nav className="relative z-10 flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-1.5 scrollbar-none">
              {NAV_LINKS.map((link, idx) => {
                const isActive = canonicalPath === link.path;
                const label = t.nav[NAV_KEY_MAP[link.path]] ?? link.label;
                const indexStr = String(idx + 1).padStart(2, '0');
                return (
                  <Link
                    key={link.path}
                    href={localePath(link.path)}
                    onClick={handleClose}
                    className={`mobile-nav-link-item group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 border ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600/25 to-blue-500/10 border-blue-400/40 text-white font-semibold shadow-[0_0_25px_rgba(37,99,235,0.25)]'
                        : 'border-transparent text-slate-300 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.08]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-[11px] tracking-wider transition-colors ${
                          isActive
                            ? 'text-blue-300 font-bold'
                            : 'text-blue-400/50 group-hover:text-blue-300'
                        }`}
                      >
                        {indexStr}
                      </span>
                      <span className="text-[15px] tracking-tight">{label}</span>
                    </div>
                    {isActive ? (
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                      </span>
                    ) : (
                      <span className="text-slate-500 group-hover:text-blue-300 group-hover:translate-x-0.5 transition-all text-sm">
                        →
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Drawer Footer Status & CTA */}
            <div className="relative z-10 border-t border-white/[0.08] bg-white/[0.02] mobile-drawer-footer-content flex flex-col">
              {/* Munich Operating Status Strip */}
              <div className="flex items-center justify-between px-6 py-2.5 border-b border-white/[0.05] text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                  <span>Munich HQ</span>
                </div>
                <span className="text-slate-300 font-medium">08:00 – 18:00 CET</span>
              </div>

              {/* Primary CTA Button */}
              <div className="p-5 pt-3.5">
                <Link
                  href={localePath('/contact')}
                  onClick={handleClose}
                  className="mobile-cta-btn w-full flex items-center justify-center gap-2 text-style-label-md bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-3.5 rounded-xl font-bold shadow-[0_4px_25px_rgba(37,99,235,0.4)] hover:shadow-[0_4px_30px_rgba(37,99,235,0.6)] border border-blue-400/40 text-center uppercase tracking-wider text-xs transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span>{t.header.cta}</span>
                  <span className="text-sm font-bold">→</span>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
