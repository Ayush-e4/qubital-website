"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, COMPANY_INFO } from "@/lib/constants";
import { Dock, DockIcon } from "@/components/ui/dock";
import { useLanguage } from "@/components/LanguageProvider";

const NAV_KEY_MAP = {
  "/":        "home",
  "/about":   "about",
  "/services":"services",
  "/careers": "careers",
  "/contact": "contact",
};

const SUPPORTED_LOCALES = ['de', 'fr', 'es', 'it', 'nl'];

export default function Header() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);

  // Detect if the current path has a locale prefix (e.g., /de, /fr)
  const currentPrefix = SUPPORTED_LOCALES.find(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
  );

  // Build locale-aware href for navigation links
  const localePath = useCallback(
    (path) => (currentPrefix ? `/${currentPrefix}${path === "/" ? "" : path}` : path),
    [currentPrefix]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Canonical path without locale prefix for active-state matching
  const canonicalPath = currentPrefix
    ? pathname.slice(currentPrefix.length + 1) || "/"
    : pathname;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] border-b border-border-subtle transition-all duration-300 ${
          scrolled ? "bg-surface-card/95 backdrop-blur-md shadow-xs" : "bg-surface-card/95 backdrop-blur-md"
        }`}
      >
        <div className="h-16 max-w-[72rem] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link href={localePath("/")} className="flex items-center gap-3">
              <img
                alt="Qubital Logo"
                className="h-8 w-auto object-contain"
                src={COMPANY_INFO.logoUrl}
              />
              <span className="text-style-headline-sm tracking-tight text-text-primary font-bold">
                Qubital
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center">
            <Dock className="bg-transparent border-none shadow-none h-12" iconMagnification={20} iconDistance={80}>
              {NAV_LINKS.map((link) => {
                const isActive = canonicalPath === link.path;
                const label    = t.nav[NAV_KEY_MAP[link.path]] ?? link.label;
                return (
                  <DockIcon
                    key={link.path}
                    className={isActive ? "bg-primary/10 text-primary font-bold" : "text-on-surface-variant hover:text-primary"}
                  >
                    <Link
                      href={localePath(link.path)}
                      className="flex h-full w-full items-center justify-center"
                      title={label}
                      {...(isActive ? { "aria-current": "page" } : {})}
                    >
                      {label}
                    </Link>
                  </DockIcon>
                );
              })}
            </Dock>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link
              href={localePath("/contact")}
              className="hidden sm:inline-flex items-center text-style-label-md bg-primary-container text-on-primary px-5 py-2 rounded-xl hover:bg-primary transition-colors shadow-xs font-semibold text-xs uppercase tracking-wider"
            >
              {t.header.cta}
            </Link>

            {/* Custom Animated Executive Mobile Menu Button (Pill + Morphing Dual Lines) */}
            <button
              className="md:hidden flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-slate-300/80 bg-slate-100/90 hover:bg-slate-200/80 transition-all duration-200 shadow-2xs active:scale-95"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {/* Morphing Dual-Line Icon */}
              <div className="w-4 h-3 flex flex-col justify-between items-center relative py-0.5">
                <motion.span
                  className="w-4 h-[2px] bg-slate-900 rounded-full block transform-gpu"
                  animate={mobileOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
                <motion.span
                  className="w-4 h-[2px] bg-slate-900 rounded-full block transform-gpu"
                  animate={mobileOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              </div>

              {/* Text Label */}
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-slate-900 select-none">
                {mobileOpen ? "CLOSE" : "MENU"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[55] bg-text-primary/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-in Panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-[60] w-[85vw] max-w-[360px] bg-surface-card shadow-2xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle">
                <div className="flex items-center gap-2">
                  <img
                    alt="Qubital Logo"
                    className="h-7 w-auto object-contain"
                    src={COMPANY_INFO.logoUrl}
                  />
                  <span className="text-style-headline-sm font-semibold tracking-tight text-text-primary">
                    Qubital
                  </span>
                </div>
                
                {/* Close Button Pill */}
                <button
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-900 hover:bg-slate-200 transition-colors"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <span className="w-3.5 h-3.5 flex items-center justify-center relative">
                    <span className="w-3.5 h-[2px] bg-slate-900 rounded-full absolute rotate-45" />
                    <span className="w-3.5 h-[2px] bg-slate-900 rounded-full absolute -rotate-45" />
                  </span>
                  <span className="text-[11px] font-mono font-bold tracking-wider uppercase">CLOSE</span>
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-2">
                {NAV_LINKS.map((link) => {
                  const isActive = canonicalPath === link.path;
                  const label    = t.nav[NAV_KEY_MAP[link.path]] ?? link.label;
                  return (
                    <Link
                      key={link.path}
                      href={localePath(link.path)}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-style-title-md transition-all ${
                        isActive
                          ? "bg-primary-container/10 text-primary font-bold shadow-2xs"
                          : "text-text-secondary hover:bg-surface-canvas hover:text-text-primary"
                      }`}
                    >
                      <span>{label}</span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Drawer Footer CTA */}
              <div className="p-6 border-t border-border-subtle bg-surface-canvas/50">
                <Link
                  href={localePath("/contact")}
                  className="w-full flex items-center justify-center text-style-label-md bg-primary-container text-on-primary px-4 py-3.5 rounded-xl hover:bg-primary transition-colors text-center font-bold shadow-sm uppercase tracking-wider text-xs"
                >
                  {t.header.cta}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
