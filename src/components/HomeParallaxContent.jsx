"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimateOnScroll, StaggerContainer, StaggerItem } from "@/components/AnimateOnScroll";
import MarqueeButton from "@/components/MarqueeButton";
import { Terminal, Server, Cloud, ShieldCheck, Cpu, Layers } from "lucide-react";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import MethodologySteps from "@/components/MethodologySteps";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { RetroGrid } from "@/components/magicui/retro-grid";
import { useLanguage } from "@/components/LanguageProvider";
import { useLocalePath } from "@/lib/i18n/useLocalePath";

export default function HomeParallaxContent() {
  const containerRef = useRef(null);
  const { t } = useLanguage();
  const localePath = useLocalePath();

  // Scroll Parallax Hooks for Mobile & Desktop
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Parallax transform layers
  const yHeroGrid = useTransform(scrollYProgress, [0, 0.25], [0, 60]);
  const yHeroTitle = useTransform(scrollYProgress, [0, 0.25], [0, -35]);
  const opacityHeroTitle = useTransform(scrollYProgress, [0, 0.2], [1, 0.6]);
  const yHeroCtas = useTransform(scrollYProgress, [0, 0.25], [0, -15]);

  // Ambient floating background parallax elements
  const yBlob1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const yBlob2 = useTransform(scrollYProgress, [0, 1], [0, -140]);

  const serviceFeatures = [
    {
      Icon: <Terminal className="h-9 w-9 md:h-10 md:w-10 origin-left transform-gpu text-primary transition-all duration-300 ease-in-out group-hover:scale-110" />,
      name: t.bento.software_title,
      description: t.bento.software_desc,
      href: localePath("/services#software"),
      cta: t.bento.cta,
      className: "md:col-span-2",
      background: (
        <div className="absolute right-0 top-0 h-full w-full flex items-center justify-end pr-4 md:pr-8 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-500">
          <Terminal className="w-48 h-48 md:w-64 md:h-64 text-primary" />
        </div>
      ),
    },
    {
      Icon: <Server className="h-9 w-9 md:h-10 md:w-10 origin-left transform-gpu text-primary transition-all duration-300 ease-in-out group-hover:scale-110" />,
      name: t.bento.managed_title,
      description: t.bento.managed_desc,
      href: localePath("/services#managed-it"),
      cta: t.bento.cta,
      className: "md:col-span-1",
      background: (
        <div className="absolute right-0 top-0 h-full w-full flex items-center justify-end pr-4 md:pr-8 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-500">
          <Server className="w-36 h-36 md:w-48 md:h-48 text-primary" />
        </div>
      ),
    },
    {
      Icon: <Cloud className="h-9 w-9 md:h-10 md:w-10 origin-left transform-gpu text-primary transition-all duration-300 ease-in-out group-hover:scale-110" />,
      name: t.bento.cloud_title,
      description: t.bento.cloud_desc,
      href: localePath("/services#cloud"),
      cta: t.bento.cta,
      className: "md:col-span-1",
      background: (
        <div className="absolute right-0 top-0 h-full w-full flex items-center justify-end pr-4 md:pr-8 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-500">
          <Cloud className="w-36 h-36 md:w-48 md:h-48 text-primary" />
        </div>
      ),
    },
    {
      Icon: <ShieldCheck className="h-9 w-9 md:h-10 md:w-10 origin-left transform-gpu text-primary transition-all duration-300 ease-in-out group-hover:scale-110" />,
      name: t.bento.cyber_title,
      description: t.bento.cyber_desc,
      href: localePath("/services#cybersecurity"),
      cta: t.bento.cta,
      className: "md:col-span-2",
      background: (
        <div className="absolute right-0 top-0 h-full w-full flex items-center justify-end pr-4 md:pr-8 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-500">
          <ShieldCheck className="w-48 h-48 md:w-64 md:h-64 text-primary" />
        </div>
      ),
    },
    {
      Icon: <Cpu className="h-9 w-9 md:h-10 md:w-10 origin-left transform-gpu text-primary transition-all duration-300 ease-in-out group-hover:scale-110" />,
      name: t.bento.special_title,
      description: t.bento.special_desc,
      href: localePath("/services#specialized-tech"),
      cta: t.bento.cta,
      className: "md:col-span-2",
      background: (
        <div className="absolute right-0 top-0 h-full w-full flex items-center justify-end pr-4 md:pr-8 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-500">
          <Cpu className="w-48 h-48 md:w-64 md:h-64 text-primary" />
        </div>
      ),
    },
    {
      Icon: <Layers className="h-9 w-9 md:h-10 md:w-10 origin-left transform-gpu text-primary transition-all duration-300 ease-in-out group-hover:scale-110" />,
      name: t.bento.sap_title || "SAP Solutions",
      description: t.bento.sap_desc || "S/4HANA migrations, clean-core architecture, and SAP BTP cloud integrations.",
      href: localePath("/services#sap"),
      cta: t.bento.cta,
      className: "md:col-span-1",
      background: (
        <div className="absolute right-0 top-0 h-full w-full flex items-center justify-end pr-4 md:pr-8 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-500">
          <Layers className="w-36 h-36 md:w-48 md:h-48 text-primary" />
        </div>
      ),
    },
  ];

  return (
    <div ref={containerRef} className="flex flex-col w-full overflow-hidden relative">
      
      {/* Parallax Ambient Glowing Elements */}
      <motion.div 
        style={{ y: yBlob1 }} 
        className="absolute top-32 left-[-10%] w-72 h-72 sm:w-[450px] sm:h-[450px] bg-primary/10 rounded-full blur-3xl pointer-events-none z-0" 
      />
      <motion.div 
        style={{ y: yBlob2 }} 
        className="absolute top-[40%] right-[-10%] w-72 h-72 sm:w-[500px] sm:h-[500px] bg-secondary-container/20 rounded-full blur-3xl pointer-events-none z-0" 
      />

      {/* SECTION 1 - Full 100vh Viewport Landing Hero */}
      <section className="w-full min-h-[calc(100dvh-4rem)] flex flex-col justify-between items-center pt-16 sm:pt-20 pb-6 px-4 sm:px-6 lg:px-8 bg-surface-canvas relative overflow-hidden border-b border-outline-variant/20">
        
        {/* Parallax Grid Layer */}
        <motion.div style={{ y: yHeroGrid }} className="absolute inset-0 size-full pointer-events-none">
          <RetroGrid lightLineColor="#94a3b8" opacity={0.4} />
        </motion.div>
        
        {/* Spacer for top balance */}
        <div className="h-2 sm:h-4 w-full" />

        {/* Centered Hero Content */}
        <div className="max-w-5xl w-full mx-auto flex flex-col items-center text-center relative z-10 my-auto">
          <AnimateOnScroll className="flex flex-col items-center space-y-4 sm:space-y-5 md:space-y-6 w-full">
            
            {/* Brand Title with Parallax float */}
            <motion.span 
              style={{ y: yHeroTitle, opacity: opacityHeroTitle }}
              className="pointer-events-none z-10 bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-[4.75rem] xs:text-[5.75rem] sm:text-7xl md:text-8xl lg:text-9xl leading-none font-black tracking-tighter whitespace-pre-wrap text-transparent drop-shadow-sm select-none py-1 block"
            >
              Qubital
            </motion.span>

            {/* Sub-headline */}
            <h1 className="text-base xs:text-lg sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-950 leading-snug max-w-3xl px-2">
              {t.hero.sub_headline}
            </h1>
            
            {/* Subtitle */}
            <p className="text-xs xs:text-sm sm:text-lg md:text-xl font-medium text-slate-800 max-w-2xl leading-relaxed px-2">
              {t.hero.subtitle}
            </p>
            
            {/* CTAs */}
            <motion.div 
              style={{ y: yHeroCtas }}
              className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 pt-2 sm:pt-4 justify-center items-center w-full max-w-[260px] sm:max-w-none"
            >
              <MarqueeButton 
                href={localePath("/services")} 
                className="bg-primary text-on-primary shadow-md shadow-primary/20 font-bold w-full sm:w-auto text-center justify-center text-xs sm:text-sm"
              >
                {t.hero.cta_primary}
              </MarqueeButton>
              <MarqueeButton 
                href={localePath("/about")} 
                className="bg-surface-card text-slate-950 font-bold border border-slate-300 hover:border-primary/40 shadow-2xs w-full sm:w-auto text-center justify-center text-xs sm:text-sm"
              >
                {t.hero.cta_secondary}
              </MarqueeButton>
            </motion.div>

          </AnimateOnScroll>
        </div>

        {/* Subtle Scroll Hint Indicator */}
        <div className="relative z-10 pt-4 flex flex-col items-center justify-center text-secondary/60 text-[11px] font-mono tracking-widest uppercase animate-bounce pointer-events-none">
          <span>{t.hero.scroll_hint}</span>
          <span className="material-symbols-outlined text-[16px]">expand_more</span>
        </div>
      </section>

      {/* SECTION 2 - Services Overview */}
      <section className="w-full flex flex-col justify-center py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-surface relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <AnimateOnScroll className="mb-8 md:mb-12 text-center max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface mb-2 sm:mb-3">
              {t.services.heading}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-secondary px-2">
              {t.services.description}
            </p>
          </AnimateOnScroll>
          
          <AnimateOnScroll delay={0.15} className="w-full">
            <BentoGrid>
              {serviceFeatures.map((feature, idx) => (
                <BentoCard key={idx} {...feature} />
              ))}
            </BentoGrid>
          </AnimateOnScroll>
        </div>
      </section>

      {/* SECTION 3 - Methodology Snapshot */}
      <section className="w-full flex flex-col justify-center py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-surface-canvas relative border-y border-outline-variant/30 z-10">
        <div className="max-w-7xl mx-auto w-full">
          <AnimateOnScroll className="mb-8 md:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-semibold text-primary tracking-wider uppercase mb-1 sm:mb-2 block">
                {t.methodology.eyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface">
                {t.methodology.heading}
              </h2>
            </div>
            <Link href={localePath("/about")} className="text-primary group text-sm font-semibold flex items-center gap-1 py-1 w-fit">
              <span className="group-hover:underline">{t.methodology.cta_link}</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </AnimateOnScroll>
          
          <MethodologySteps />
        </div>
      </section>

      {/* SECTION 4 - Trust & Metrics */}
      <section className="w-full flex flex-col justify-center py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-surface-card relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto w-full text-center relative z-10">
          <AnimateOnScroll className="mb-8 md:mb-12">
            <span className="text-xs font-mono font-semibold text-primary tracking-widest uppercase mb-1 sm:mb-2 block">
              {t.metrics.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight">
              {t.metrics.heading}
            </h2>
          </AnimateOnScroll>
          
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 md:mb-12">
            <StaggerItem className="group bg-surface-canvas border border-outline-variant/60 hover:border-primary/40 rounded-xl p-5 sm:p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden flex flex-col items-center justify-between min-h-[140px] sm:min-h-[160px]">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mb-1.5 flex items-center justify-center tracking-tight">
                <NumberTicker value={480} className="text-primary" />
                <span>+</span>
              </div>
              <div className="text-xs md:text-sm text-slate-900 font-semibold uppercase tracking-wider">{t.metrics.labels.cloud_workloads}</div>
            </StaggerItem>

            <StaggerItem className="group bg-surface-canvas border border-outline-variant/60 hover:border-primary/40 rounded-xl p-5 sm:p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden flex flex-col items-center justify-between min-h-[140px] sm:min-h-[160px]">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mb-1.5 flex items-center justify-center tracking-tight">
                <NumberTicker value={120} className="text-primary" />
                <span>+</span>
              </div>
              <div className="text-xs md:text-sm text-slate-900 font-semibold uppercase tracking-wider">{t.metrics.labels.arch_reviews}</div>
            </StaggerItem>

            <StaggerItem className="group bg-surface-canvas border border-outline-variant/60 hover:border-primary/40 rounded-xl p-5 sm:p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden flex flex-col items-center justify-between min-h-[140px] sm:min-h-[160px]">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mb-1.5 flex items-center justify-center tracking-tight">
                <NumberTicker value={99.98} decimalPlaces={2} className="text-primary" />
                <span>%</span>
              </div>
              <div className="text-xs md:text-sm text-slate-900 font-semibold uppercase tracking-wider">{t.metrics.labels.sla_guarantee}</div>
            </StaggerItem>

            <StaggerItem className="group bg-surface-canvas border border-outline-variant/60 hover:border-primary/40 rounded-xl p-5 sm:p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden flex flex-col items-center justify-between min-h-[140px] sm:min-h-[160px]">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mb-1.5 flex items-center justify-center tracking-tight">
                <NumberTicker value={97.3} decimalPlaces={1} className="text-primary" />
                <span>%</span>
              </div>
              <div className="text-xs md:text-sm text-slate-900 font-semibold uppercase tracking-wider">{t.metrics.labels.continuity_rate}</div>
            </StaggerItem>
          </StaggerContainer>

          {/* Compliance & Security Badges */}
          <AnimateOnScroll delay={0.2} className="pt-6 sm:pt-8 border-t border-outline-variant/30 flex flex-wrap justify-center gap-2.5 sm:gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-mono font-bold hover:border-emerald-500/40 hover:bg-emerald-50/50 transition-all duration-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t.badges.iso}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-mono font-bold hover:border-emerald-500/40 hover:bg-emerald-50/50 transition-all duration-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t.badges.bsi}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-mono font-bold hover:border-emerald-500/40 hover:bg-emerald-50/50 transition-all duration-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t.badges.gdpr}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-mono font-bold hover:border-emerald-500/40 hover:bg-emerald-50/50 transition-all duration-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t.badges.tisax}</span>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* SECTION 5 - CTA Banner */}
      <section className="w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-surface relative z-10">
        <div className="max-w-5xl mx-auto w-full">
          <AnimateOnScroll className="bg-inverse-surface text-inverse-on-surface rounded-2xl p-6 sm:p-8 md:p-12 shadow-lg relative overflow-hidden">
            <div className="absolute -right-24 -top-24 w-72 md:w-96 h-72 md:h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center justify-between">
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                  {t.cta_banner.heading}
                </h2>
                <p className="text-inverse-on-surface/75 text-sm sm:text-base md:text-lg mb-6 max-w-xl leading-relaxed">
                  {t.cta_banner.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Link 
                    href={localePath("/contact")} 
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-on-primary font-semibold rounded-xl hover:bg-primary/90 transition-colors duration-200 shadow-sm text-sm sm:text-base"
                  >
                    <span>{t.cta_banner.btn_primary}</span>
                    <span className="material-symbols-outlined text-sm">calendar_month</span>
                  </Link>
                  <Link 
                    href={localePath("/careers")} 
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-transparent text-inverse-on-surface font-semibold rounded-xl border border-inverse-on-surface/30 hover:bg-white/5 transition-colors duration-200 text-sm sm:text-base"
                  >
                    <span>{t.cta_banner.btn_secondary}</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
