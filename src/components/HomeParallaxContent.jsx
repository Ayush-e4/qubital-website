'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/AnimateOnScroll';
import MarqueeButton from '@/components/MarqueeButton';
import ServiceCard from '@/components/ServiceCard';
import { RetroGrid } from '@/components/magicui/retro-grid';
import { useLanguage } from '@/components/LanguageProvider';
import { useLocalePath } from '@/lib/i18n/useLocalePath';
import { readToken } from '@/lib/tokens';
import { DynamicIcon } from '@/lib/icons';
import { ArrowRight, Calendar, ChevronDown } from 'lucide-react';

export default function HomeParallaxContent() {
  const containerRef = useRef(null);
  const { t } = useLanguage();
  const localePath = useLocalePath();

  // Scroll Parallax Hooks for Mobile & Desktop
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Parallax transform layers
  const yHeroGrid = useTransform(scrollYProgress, [0, 0.25], [0, 60]);
  const yHeroCtas = useTransform(scrollYProgress, [0, 0.25], [0, -15]);

  // Ambient floating background parallax elements
  const yBlob1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const yBlob2 = useTransform(scrollYProgress, [0, 1], [0, -140]);

  // The homepage teaser keeps the uneven bento arrangement; the card itself is
  // shared with /services — see src/components/ServiceCard.jsx.
  const SERVICE_SPANS = {
    software: 'md:col-span-2',
    'managed-it': 'md:col-span-1',
    cloud: 'md:col-span-1',
    cybersecurity: 'md:col-span-2',
    'specialized-tech': 'md:col-span-2',
    sap: 'md:col-span-1',
  };

  return (
    <main ref={containerRef} className="flex flex-col w-full overflow-hidden relative">
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
        <motion.div
          style={{ y: yHeroGrid }}
          className="absolute inset-0 size-full pointer-events-none"
        >
          <RetroGrid lightLineColor={readToken('--color-text-muted', '#94a3b8')} opacity={0.4} />
        </motion.div>

        {/* Spacer for top balance */}
        <div className="h-2 sm:h-4 w-full" />

        {/* Centered Hero Content */}
        <div className="max-w-5xl w-full mx-auto flex flex-col items-center text-center relative z-10 my-auto">
          <AnimateOnScroll className="flex flex-col items-center space-y-4 sm:space-y-5 md:space-y-6 w-full">
            {/*
              The `<h1>` leads the hero. It previously sat below a wordmark many
              times its size, so the squint test saw only "Qubital" and the
              page's actual heading was visually subordinate — and it repeated
              the logo already in the header. The rainbow gradient that carried
              the wordmark is gone with it.
            */}
            <h1 className="text-style-display text-on-surface max-w-4xl px-2">
              {t.hero.sub_headline}
            </h1>

            {/* Subtitle */}
            <p className="text-xs xs:text-sm sm:text-lg md:text-xl font-medium text-on-surface-variant max-w-2xl leading-relaxed px-2">
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <motion.div
              style={{ y: yHeroCtas }}
              className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 pt-2 sm:pt-4 justify-center items-center w-full max-w-[260px] sm:max-w-none"
            >
              <MarqueeButton
                href={localePath('/services')}
                className="bg-primary text-on-primary shadow-md shadow-primary/20 font-bold w-full sm:w-auto text-center justify-center text-xs sm:text-sm"
              >
                {t.hero.cta_primary}
              </MarqueeButton>
              <MarqueeButton
                href={localePath('/about')}
                className="bg-surface-card text-on-surface font-bold border border-outline-variant hover:border-primary/40 shadow-2xs w-full sm:w-auto text-center justify-center text-xs sm:text-sm"
              >
                {t.hero.cta_secondary}
              </MarqueeButton>
            </motion.div>
          </AnimateOnScroll>
        </div>

        {/* Subtle Scroll Hint Indicator */}
        <div className="relative z-10 pt-4 flex flex-col items-center justify-center text-secondary/90 text-[11px] font-mono tracking-widest uppercase animate-bounce pointer-events-none">
          <span>{t.hero.scroll_hint}</span>
          <ChevronDown className="h-4 w-4" />
        </div>
      </section>

      {/* SECTION 2 - Services Overview */}
      <section className="w-full flex flex-col justify-center py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-surface relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <AnimateOnScroll className="mb-8 md:mb-12 text-center max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="text-style-headline-md text-on-surface mb-2 sm:mb-3">
              {t.services.heading}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-secondary px-2">
              {t.services.description}
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.15} className="w-full">
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
              {(t.services_page.matrix_cards ?? []).map((card) => (
                <ServiceCard
                  key={card.id}
                  icon={<DynamicIcon name={card.icon} className="h-8 w-8 md:h-9 md:w-9" />}
                  title={card.title}
                  description={card.description}
                  href={localePath(`/services#${card.id}`)}
                  ctaLabel={t.bento.cta}
                  className={SERVICE_SPANS[card.id] ?? ''}
                />
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* SECTION 3 - Methodology teaser (the full process lives on /services) */}
      <section className="w-full flex flex-col justify-center py-10 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-surface-canvas relative border-y border-outline-variant/30 z-10">
        <div className="max-w-7xl mx-auto w-full">
          <AnimateOnScroll className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-semibold text-primary tracking-wider uppercase mb-1 sm:mb-2 block">
                {t.methodology.eyebrow}
              </span>
              <h2 className="text-style-headline-md text-on-surface">{t.methodology.heading}</h2>
            </div>
            <Link
              href={localePath('/services')}
              className="text-primary group text-sm font-semibold flex items-center gap-1 py-1 w-fit"
            >
              <span className="group-hover:underline">{t.methodology.cta_link}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* SECTION 4 - Trust & Metrics */}
      <section className="w-full flex flex-col justify-center py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-surface-card relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto w-full text-center relative z-10">
          <AnimateOnScroll className="mb-8 md:mb-12">
            <span className="text-xs font-mono font-semibold text-primary tracking-widest uppercase mb-1 sm:mb-2 block">
              {t.metrics.eyebrow}
            </span>
            <h2 className="text-style-headline-md text-on-surface">{t.metrics.heading}</h2>
          </AnimateOnScroll>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 md:mb-12">
            <StaggerItem className="group bg-surface-canvas border border-outline-variant/60 hover:border-primary/40 rounded-xl p-5 sm:p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden flex items-center justify-center min-h-[140px] sm:min-h-[160px]">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary/40 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="text-base sm:text-lg font-semibold text-primary text-center leading-snug px-1">
                {t.metrics.labels.cloud_workloads}
              </div>
            </StaggerItem>

            <StaggerItem className="group bg-surface-canvas border border-outline-variant/60 hover:border-primary/40 rounded-xl p-5 sm:p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden flex items-center justify-center min-h-[140px] sm:min-h-[160px]">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary/40 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="text-base sm:text-lg font-semibold text-primary text-center leading-snug px-1">
                {t.metrics.labels.arch_reviews}
              </div>
            </StaggerItem>

            <StaggerItem className="group bg-surface-canvas border border-outline-variant/60 hover:border-primary/40 rounded-xl p-5 sm:p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden flex items-center justify-center min-h-[140px] sm:min-h-[160px]">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary/40 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="text-base sm:text-lg font-semibold text-primary text-center leading-snug px-1">
                {t.metrics.labels.sla_guarantee}
              </div>
            </StaggerItem>

            <StaggerItem className="group bg-surface-canvas border border-outline-variant/60 hover:border-primary/40 rounded-xl p-5 sm:p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden flex items-center justify-center min-h-[140px] sm:min-h-[160px]">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary/40 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="text-base sm:text-lg font-semibold text-primary text-center leading-snug px-1">
                {t.metrics.labels.continuity_rate}
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Compliance & Security Badges */}
          <AnimateOnScroll
            delay={0.2}
            className="pt-6 sm:pt-8 border-t border-outline-variant/30 flex flex-wrap justify-center gap-2.5 sm:gap-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-surface-container border border-outline-variant text-on-surface text-xs font-mono font-bold hover:border-success/40 hover:bg-success-container/50 transition-all duration-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-primary/70" />
              <span>{t.badges.iso}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-surface-container border border-outline-variant text-on-surface text-xs font-mono font-bold hover:border-success/40 hover:bg-success-container/50 transition-all duration-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-primary/70" />
              <span>{t.badges.bsi}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-surface-container border border-outline-variant text-on-surface text-xs font-mono font-bold hover:border-success/40 hover:bg-success-container/50 transition-all duration-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-primary/70" />
              <span>{t.badges.gdpr}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-surface-container border border-outline-variant text-on-surface text-xs font-mono font-bold hover:border-success/40 hover:bg-success-container/50 transition-all duration-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-primary/70" />
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
                <h2 className="text-style-headline-md mb-3">{t.cta_banner.heading}</h2>
                <p className="text-inverse-on-surface/75 text-sm sm:text-base md:text-lg mb-6 max-w-xl leading-relaxed">
                  {t.cta_banner.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Link
                    href={localePath('/contact')}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-on-primary font-semibold rounded-xl hover:bg-primary/90 transition-colors duration-200 shadow-sm text-sm sm:text-base"
                  >
                    <span>{t.cta_banner.btn_primary}</span>
                    <Calendar className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href={localePath('/careers')}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-transparent text-inverse-on-surface font-semibold rounded-xl border border-inverse-on-surface/30 hover:bg-white/5 transition-colors duration-200 text-sm sm:text-base"
                  >
                    <span>{t.cta_banner.btn_secondary}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  );
}
