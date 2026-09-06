'use client';

import Link from 'next/link';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/AnimateOnScroll';
import MethodologySteps from '@/components/MethodologySteps';
import { useLanguage } from '@/components/LanguageProvider';

export default function ServicesContent() {
  const { t } = useLanguage();
  const s = t.services_page;

  return (
    <main className="flex-grow pt-20 sm:pt-28 pb-16">
      {/* SECTION 1 - Hero */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-6 sm:py-16 md:py-20 lg:py-24">
        <AnimateOnScroll className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col items-center space-y-8">
            <h1 className="font-display text-display text-4xl sm:text-5xl lg:text-6xl text-on-surface tracking-tight leading-tight">
              {s.hero_title_1} <br className="hidden sm:inline" />
              <span className="text-primary block sm:inline">{s.hero_title_2}</span>
            </h1>
            
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed mx-auto">
              {s.hero_desc}
            </p>
            
            <div className="flex justify-center w-full px-4 sm:px-0">
              <Link href="/contact" className="w-full sm:w-auto text-center justify-center px-8 py-3.5 bg-primary text-on-primary font-label-lg rounded-xl hover:bg-primary/90 transition-colors duration-200 shadow-md font-semibold text-sm sm:text-base">
                {s.hero_cta}
              </Link>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      <hr className="border-outline/30 w-full max-w-7xl mx-auto" />

      {/* SECTION 2 - Practice Matrix */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 md:py-24">
        <AnimateOnScroll>
          <div className="mb-12 md:mb-16 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 text-primary font-label-md tracking-widest uppercase mb-4 justify-center">
              <span className="material-symbols-outlined text-sm">grid_view</span>
              <span>{s.matrix_tag}</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-3xl md:text-4xl text-on-surface mb-6 font-bold">
              {s.matrix_title}
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant text-lg max-w-2xl mx-auto">
              {s.matrix_desc}
            </p>
          </div>
        </AnimateOnScroll>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(s.matrix_cards ?? []).map((card, idx) => (
            <StaggerItem key={idx} className="h-full">
              <div id={card.id} className="group relative rounded-2xl p-[2px] h-full transition-all duration-500 scroll-mt-28">
                {/* 1. Ambient blur glow behind card */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-700 via-sky-500 to-blue-500 blur-xl opacity-20 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500 pointer-events-none z-0" />

                {/* 2. Rotating conic gradient border behind card */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-0">
                  <div className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,#0f172a_0%,#0050cb_25%,#38bdf8_50%,#0f172a_75%,#0f172a_100%)] opacity-40 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-1000 ease-out" />
                </div>

                {/* 3. Solid Dark Navy Card Face */}
                <div className="relative z-10 bg-[#16202e] rounded-2xl p-6 sm:p-8 flex flex-col h-full text-white border border-slate-700/50 group-hover:border-sky-500/50 transition-colors duration-300 shadow-xl">
                  <h3 className="font-title-lg text-title-lg text-xl text-white font-bold mb-3">{card.title}</h3>
                  <p className="font-body-md text-body-md text-slate-300 mb-6 flex-grow leading-relaxed">
                    {card.description}
                  </p>

                  <ul className="space-y-2.5">
                    {(card.items ?? []).map((item, i) => (
                      <li key={i} className="flex items-center space-x-2.5 text-sm text-slate-200">
                        <span className="material-symbols-outlined text-[18px] text-sky-400 shrink-0">check_circle</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* SECTION 3 - Execution Methodology */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 md:py-24 bg-surface">
        <AnimateOnScroll className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-primary font-label-md tracking-widest uppercase mb-4 justify-center">
            <span className="material-symbols-outlined text-sm">settings_timelapse</span>
            <span>{s.methodology_tag}</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-3xl md:text-4xl text-on-surface mb-6">
            {s.methodology_title}
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant text-lg">
             {s.methodology_desc}
          </p>
        </AnimateOnScroll>

        <MethodologySteps />
      </section>

      {/* SECTION 4 - CTA Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-16 md:pt-24 pb-8 md:pb-12">
        <AnimateOnScroll>
          <div className="bg-inverse-surface rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between shadow-lg">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="currentColor" strokeWidth="1" fill="none"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cta-grid)"/>
              </svg>
            </div>
            
            <div className="lg:max-w-2xl relative z-10 text-center lg:text-left mb-10 lg:mb-0">
              <h2 className="font-display text-4xl sm:text-5xl text-inverse-on-surface mb-6 tracking-tight leading-tight">
                {s.cta_title}
              </h2>
              <p className="font-body-lg text-inverse-on-surface/80 text-lg mb-8 max-w-xl mx-auto lg:mx-0">
                {s.cta_desc}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-6 text-sm text-inverse-on-surface/70">
                <div className="flex items-center space-x-2">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>{s.cta_nda}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="material-symbols-outlined text-[18px]">person</span>
                  <span>{s.cta_direct}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col w-full sm:w-auto space-y-4 relative z-10 shrink-0">
              <Link href="/contact" className="inline-flex justify-center items-center px-8 py-4 bg-primary text-on-primary font-label-lg rounded hover:bg-primary/90 transition-colors duration-200 w-full sm:w-auto">
                {s.cta_btn_primary}
              </Link>
              <a href="mailto:contact@qubital.eu" className="inline-flex justify-center items-center px-8 py-4 bg-transparent text-inverse-on-surface border border-inverse-on-surface/30 font-label-lg rounded hover:bg-inverse-on-surface/10 transition-colors duration-200 w-full sm:w-auto">
                {s.cta_btn_secondary}
              </a>
            </div>
          </div>
        </AnimateOnScroll>
      </section>
    </main>
  );
}
