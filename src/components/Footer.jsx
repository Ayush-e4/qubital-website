"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FOOTER_LINKS, COMPANY_INFO } from "@/lib/constants";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { useLanguage } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";

const LANGUAGES = [
  { code: 'en', label: 'English', path: '/' },
  { code: 'de', label: 'Deutsch', path: '/de' },
  { code: 'fr', label: 'Français', path: '/fr' },
  { code: 'es', label: 'Español', path: '/es' },
  { code: 'it', label: 'Italiano', path: '/it' },
  { code: 'nl', label: 'Nederlands', path: '/nl' },
];

export default function Footer() {
  const { t, locale, setLocale } = useLanguage();
  const [time, setTime] = useState("--:--:-- CET");
  const serverSyncedRef = useRef(false);

  useEffect(() => {
    fetch("/api/time")
      .then((r) => r.json())
      .then(({ time: serverTime }) => {
        setTime(serverTime);
        serverSyncedRef.current = true;
      })
      .catch(() => {
        serverSyncedRef.current = true;
      });

    const interval = setInterval(() => {
      const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Berlin",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(formatter.format(new Date()) + " CET");
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full relative z-50 bg-surface-card border-t border-border-subtle overflow-hidden flex flex-col items-center">
      {/* Interactive Grid Background */}
      <div className="absolute inset-0 overflow-hidden opacity-80 -z-0">
        <InteractiveGridPattern
          className={cn(
            "[mask-image:radial-gradient(1200px_circle_at_top,white,transparent)]",
            "inset-x-0 inset-y-[-10%] h-[150%] skew-y-12"
          )}
          squares={[40, 40]}
        />
      </div>

      {/* Content Layout */}
      <div className="max-w-[72rem] w-full mx-auto relative z-10 pt-[4rem] pointer-events-none">
        <div className="grid grid-cols-1 md:grid-cols-4 pointer-events-none">

          {/* Company Info */}
          <div className="md:col-span-2 p-[2rem] md:p-[3rem] flex flex-col justify-between gap-[2rem] pointer-events-none">
            <div className="flex flex-col gap-4 pointer-events-auto w-fit">
              <span className="text-2xl text-on-surface font-medium tracking-tight">
                Qubital Advisory
              </span>
              <p className="text-sm text-on-surface/90 font-medium leading-relaxed max-w-[24rem]">
                {t.footer.tagline}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-on-surface/90 font-semibold pointer-events-auto w-fit">
              <span className="material-symbols-outlined text-[16px]">location_on</span>
              <span>{COMPANY_INFO.location}</span>
            </div>
          </div>

          {/* Communications */}
          <div className="p-[2rem] md:p-[3rem] flex flex-col justify-between gap-[2rem] pointer-events-none">
            <div className="flex flex-col gap-[1rem] pointer-events-auto w-fit">
              <span className="text-xs font-mono tracking-widest uppercase text-on-surface/90 font-bold">
                {t.footer.communications}
              </span>
              <a
                className="text-primary font-semibold hover:underline break-all"
                href={`mailto:${COMPANY_INFO.email}`}
              >
                {COMPANY_INFO.email}
              </a>
              <span className="text-sm text-on-surface/90 font-medium">
                {COMPANY_INFO.hours}
              </span>
            </div>

            {/* Live Berlin Time */}
            <div
              title="Current time in Herzogenaurach, Germany (CET/CEST)"
              className="font-mono text-xs text-on-surface font-medium bg-surface p-2 px-3 rounded w-fit border border-outline-variant/60 shadow-inner flex items-center gap-2 pointer-events-auto"
            >
              <span className="material-symbols-outlined text-[14px] text-on-surface/90">schedule</span>
              <span suppressHydrationWarning>{time}</span>
            </div>
          </div>

          {/* Regulatory & Compliance */}
          <div className="p-[2rem] md:p-[3rem] flex flex-col gap-[1rem] pointer-events-none">
            <span className="text-xs font-mono tracking-widest uppercase text-on-surface/90 font-bold pointer-events-auto w-fit">
              {t.footer.regulatory}
            </span>
            <div className="flex flex-col gap-3 pointer-events-auto w-fit">
              {FOOTER_LINKS.regulatory.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="text-sm text-on-surface/90 font-medium hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar: Copyright & Subtle Language Text Links */}
        <div className="p-[2rem] border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4 bg-surface-card/50 pointer-events-none">
          <span className="text-xs text-on-surface/90 font-medium pointer-events-auto">
            {COMPANY_INFO.copyright}
          </span>

          {/* Minimal Text Language Links (No UI Buttons) */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-on-surface/70 pointer-events-auto">
            <span className="text-on-surface/40 uppercase tracking-widest">{t.footer.languages}:</span>
            {LANGUAGES.map((lang, idx) => (
              <span key={lang.code} className="flex items-center gap-3">
                <Link
                  href={lang.path}
                  onClick={() => setLocale(lang.code)}
                  className={`hover:text-primary transition-colors ${
                    locale === lang.code ? "text-primary font-bold underline" : "text-on-surface/80"
                  }`}
                >
                  {lang.label}
                </Link>
                {idx < LANGUAGES.length - 1 && <span className="text-on-surface/30">•</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
