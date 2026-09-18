'use client';

import Link from 'next/link';
import Image from 'next/image';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/AnimateOnScroll';
import { useLanguage } from '@/components/LanguageProvider';

export default function CareersContent() {
  const { t } = useLanguage();
  const c = t.careers_page;

  const icons = ['payments', 'school', 'developer_board', 'balance'];

  return (
    <main className="min-h-screen pt-20 sm:pt-28 pb-20">
      {/* SECTION 1 - Hero */}
      <section className="container mx-auto px-4 lg:px-8 mb-12 sm:mb-20 md:mb-32">
        <AnimateOnScroll className="grid grid-cols-12 gap-6 lg:gap-12 items-center">
          <div className="col-span-12 lg:col-span-7">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-on-surface mb-4 sm:mb-6">
              {c.hero_title_1} <br className="hidden md:block" />
              <span className="text-secondary font-medium">{c.hero_title_2}</span>
            </h1>
            <p className="text-base sm:text-lg text-secondary mb-6 sm:mb-8 max-w-2xl leading-relaxed">
              {c.hero_desc}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="#reach-out"
                className="inline-flex items-center justify-center h-12 px-6 bg-on-surface text-surface-canvas font-semibold rounded-xl hover:opacity-90 transition-opacity text-sm sm:text-base text-center"
              >
                {c.btn_reach}
              </a>
              <a
                href="#work-environment"
                className="inline-flex items-center justify-center h-12 px-6 bg-surface-canvas border border-outline-variant text-on-surface font-semibold rounded-xl hover:bg-surface-card transition-colors text-sm sm:text-base text-center"
              >
                {c.btn_principles}
              </a>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 flex justify-center">
            <div className="w-full rounded-2xl border border-outline-variant overflow-hidden shadow-sm aspect-[4/3] relative bg-surface-card">
              <Image
                src="/images/career_hero.jpg"
                alt="Qubital Team Workshop"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* SECTION 2 - Benefits */}
      <section id="work-environment" className="container mx-auto px-4 lg:px-8 mb-32 scroll-mt-24">
        <AnimateOnScroll className="mb-12 border-b border-outline-variant pb-8">
          <div className="inline-flex items-center gap-2 text-sm text-primary mb-4 font-mono">
            {c.benefits_tag}
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-on-surface tracking-tight">
            {c.benefits_title}
          </h2>
        </AnimateOnScroll>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {(c.benefits ?? []).map((ben, i) => (
            <StaggerItem
              key={i}
              className="bg-surface-canvas border border-outline-variant rounded-xl p-6 flex flex-col items-start gap-4 hover:bg-surface-card transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-surface-card border border-outline-variant flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">{icons[i % icons.length]}</span>
              </div>
              <div>
                <h4 className="text-on-surface font-medium mb-1">{ben.title}</h4>
                <p className="text-secondary text-sm">{ben.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimateOnScroll className="rounded-2xl border border-outline-variant overflow-hidden relative h-64 md:h-80">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80"
            alt="Modern collaborative office workspace"
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-8 md:p-12 flex flex-col justify-end">
            <div className="inline-flex px-3 py-1 bg-white/10 backdrop-blur-md rounded-md text-xs font-mono text-white mb-4 w-fit border border-white/20">
              {c.blueprint_tag}
            </div>
            <h3 className="text-2xl md:text-3xl font-light text-white max-w-2xl">
              {c.blueprint_title}
            </h3>
          </div>
        </AnimateOnScroll>
      </section>

      {/* SECTION 3 - Spontaneous Application CTA */}
      <section id="reach-out" className="container mx-auto px-4 lg:px-8 mb-16 scroll-mt-24">
        <AnimateOnScroll className="max-w-3xl mx-auto bg-surface-canvas border border-outline-variant rounded-2xl p-6 md:p-7 text-center flex flex-col items-center">
          <div className="flex items-center justify-center gap-2 mb-2.5 text-primary">
            <span className="material-symbols-outlined text-xl">mail</span>
            <span className="text-xs font-mono tracking-wider uppercase text-secondary">
              {c.network_tag}
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-medium text-on-surface mb-2">
            {c.network_title}
          </h3>
          <p className="text-secondary text-sm leading-relaxed max-w-xl mb-5">{c.network_desc}</p>
          <a
            href="mailto:contact@qubital.eu?subject=Spontaneous%20Application%20-%20Qubital"
            className="inline-flex items-center justify-center h-10 px-6 text-sm bg-on-surface text-surface-canvas font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            {c.network_email}
          </a>
        </AnimateOnScroll>
      </section>
    </main>
  );
}
