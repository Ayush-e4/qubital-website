'use client';

import Link from 'next/link';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/AnimateOnScroll';
import { useLanguage } from '@/components/LanguageProvider';
import { useLocalePath } from '@/lib/i18n/useLocalePath';

export default function MissionContent() {
  const { t } = useLanguage();
  const m = t.mission_page || {};

  const localePath = useLocalePath();

  return (
    <main className="flex-1 w-full flex flex-col items-center">
      {/* SECTION 1 - Editorial Header & Mission Hero */}
      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 pb-12 md:pb-20">
        <AnimateOnScroll>
          <div className="flex flex-col items-start gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold tracking-widest uppercase">
              <span className="material-symbols-outlined text-[14px]">flag</span>
              <span>{m.tag || 'OUR MISSION & VISION'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            <h1 className="lg:col-span-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-on-surface leading-tight">
              {m.hero_title_1} <br />
              <span className="text-primary font-semibold">{m.hero_title_2}</span>
            </h1>

            <p className="lg:col-span-4 text-base sm:text-lg text-secondary leading-relaxed pt-2">
              {m.hero_desc}
            </p>
          </div>
        </AnimateOnScroll>

        {/* Hero Banner Quote Box */}
        <AnimateOnScroll delay={0.1}>
          <div className="relative rounded-2xl bg-gradient-to-br from-[#16202e] to-[#0f172a] text-white p-8 sm:p-12 border border-slate-700/60 shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-3xl">
              <span className="material-symbols-outlined text-sky-400 text-4xl mb-4 block">format_quote</span>
              <p className="text-xl sm:text-2xl font-light text-slate-100 leading-relaxed mb-6">
                &ldquo;{m.quote_text}&rdquo;
              </p>
              <div className="flex items-center gap-3 text-xs font-mono tracking-wider text-sky-400 uppercase">
                <span>{m.quote_author}</span>
                <span>•</span>
                <span>{m.quote_location}</span>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      <hr className="border-outline/30 w-full max-w-7xl mx-auto" />

      {/* SECTION 2 - The 4 Foundational Pillars */}
      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <AnimateOnScroll className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-primary text-xs font-mono font-bold tracking-widest uppercase mb-3 justify-center">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            <span>{m.pillars_tag || 'FOUNDATIONAL TENETS'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-on-surface tracking-tight mb-4">
            {m.pillars_title || 'The Principles That Guide Every Architecture'}
          </h2>
        </AnimateOnScroll>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(m.pillars || []).map((pillar) => (
            <StaggerItem key={pillar.id} className="h-full">
              <div className="h-full bg-surface-card border border-outline-variant/60 hover:border-primary/40 rounded-2xl p-8 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-2xl">{pillar.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-secondary text-sm sm:text-base leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-outline-variant/40 flex items-center justify-between text-xs font-mono text-secondary/70 uppercase">
                  <span>{m.tenet_label || 'Tenet'} 0{pillar.id}</span>
                  <span className="text-primary font-bold">{m.guaranteed_standard || 'Guaranteed Standard'}</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* SECTION 3 - Architectural Transformation Roadmap */}
      <section className="w-full bg-surface py-16 md:py-24 border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-primary text-xs font-mono font-bold tracking-widest uppercase mb-3 justify-center">
              <span className="material-symbols-outlined text-sm">timeline</span>
              <span>{m.roadmap_tag || 'ARCHITECTURAL TRANSFORMATION'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-on-surface tracking-tight mb-4">
              {m.roadmap_title || 'From Legacy Sprawl to Sovereign Systems'}
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(m.roadmap_steps || []).map((step, idx) => (
              <AnimateOnScroll key={idx} delay={idx * 0.15}>
                <div className="relative bg-surface-canvas border border-outline-variant/60 rounded-2xl p-8 h-full flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-primary tracking-widest uppercase block mb-3">
                      {step.phase}
                    </span>
                    <h3 className="text-xl font-bold text-on-surface mb-3">{step.title}</h3>
                    <p className="text-secondary text-sm leading-relaxed">{step.desc}</p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-outline-variant/30 flex items-center gap-2 text-xs font-mono text-emerald-600 font-semibold">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span>{m.verified_milestone || 'Verified Milestone'}</span>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 - Call to Action */}
      <section className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <AnimateOnScroll className="bg-inverse-surface text-inverse-on-surface rounded-2xl p-8 sm:p-12 shadow-xl relative overflow-hidden text-center flex flex-col items-center">
          <div className="absolute -right-24 -top-24 w-72 md:w-96 h-72 md:h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 relative z-10">
            {m.cta_title || 'Partner with architects who prioritize engineering discipline.'}
          </h2>
          <p className="text-inverse-on-surface/75 text-sm sm:text-base md:text-lg mb-8 max-w-2xl leading-relaxed relative z-10">
            {m.cta_desc || 'Schedule an introductory review to evaluate your enterprise technical roadmap.'}
          </p>
          <Link
            href={localePath("/contact")}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-on-primary font-semibold rounded-xl hover:bg-primary/90 transition-colors duration-200 shadow-md text-sm sm:text-base relative z-10"
          >
            <span>{m.cta_btn || 'Schedule Architectural Review'}</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </AnimateOnScroll>
      </section>
    </main>
  );
}
