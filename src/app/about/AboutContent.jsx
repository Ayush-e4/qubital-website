'use client';

import Link from 'next/link';
import Image from 'next/image';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/AnimateOnScroll';
import { useLanguage } from '@/components/LanguageProvider';
import { useLocalePath } from '@/lib/i18n/useLocalePath';

export default function AboutContent() {
  const { t } = useLanguage();
  const a = t.about_page;

  const localePath = useLocalePath();

  return (
    <main className="flex-1 w-full flex flex-col items-center">
      {/* SECTION 1 - Editorial Header & Hero */}
      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 pb-12 md:pb-24">
        <AnimateOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full mb-8 md:mb-16 lg:items-end">
            <h1 className="lg:col-span-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-on-surface leading-tight sm:pr-4">
              {a.hero_title_1}
              <br />
              <span className="text-secondary font-medium">{a.hero_title_2}</span>
            </h1>

            <p className="lg:col-span-4 text-base sm:text-lg text-secondary leading-relaxed lg:pb-3">
              {a.hero_desc}
            </p>
          </div>
        </AnimateOnScroll>

        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-auto lg:h-[450px]">
          {/* Left 8 cols */}
          <StaggerItem className="lg:col-span-8 relative rounded-2xl overflow-hidden group h-[260px] sm:h-[360px] lg:h-full">
            <Image
              src="/images/image1.png"
              alt="Engineering Center"
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
          </StaggerItem>

          {/* Right 4 cols */}
          <StaggerItem className="lg:col-span-4 bg-surface-card border border-outline-variant/60 rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-auto lg:h-full relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="flex flex-col gap-4 sm:gap-6 relative z-10">
              <div className="text-xs font-mono text-secondary pb-3 border-b border-outline-variant/60 flex justify-between items-center">
                <span>{a.focus_tag}</span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl text-on-surface font-semibold mb-2">
                  {a.focus_title}
                </h3>
                <p className="text-sm text-secondary leading-relaxed">{a.focus_desc}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:gap-4 mt-6 sm:mt-8 relative z-10 border-t border-outline-variant/60 pt-5 sm:pt-6">
              {(a.focus_items ?? []).map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-secondary">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    {i === 0 ? 'architecture' : i === 1 ? 'account_tree' : 'security'}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* SECTION 2 - Mission */}
      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <AnimateOnScroll>
          <div className="flex flex-col gap-4 mb-6 sm:mb-8">
            <h2 className="text-xs font-mono tracking-widest text-secondary uppercase font-semibold">
              {a.mission_tag}
            </h2>
          </div>

          <div className="bg-primary/10 border border-primary/20 border-l-4 border-l-primary rounded-r-xl p-5 sm:p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <span className="material-symbols-outlined text-9xl">hub</span>
            </div>

            <div className="relative z-10 max-w-4xl">
              <span className="material-symbols-outlined text-primary text-3xl mb-6">
                format_quote
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-on-surface leading-relaxed mb-6">
                {a.mission_quote}
              </h2>
              <p className="text-lg text-secondary leading-relaxed max-w-3xl mb-8">
                {a.mission_desc}
              </p>

              <div className="flex flex-wrap gap-3">
                {(a.mission_badges ?? []).map((badge, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-surface-card border border-outline-variant rounded-lg text-sm text-secondary flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {i === 0 ? 'account_tree' : i === 1 ? 'layers_clear' : 'gavel'}
                    </span>
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* SECTION 3 - Company Story */}
      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-outline-variant/60 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Left sidebar - sticky */}
          <div className="lg:col-span-4 relative">
            <AnimateOnScroll className="lg:sticky lg:top-32 flex flex-col gap-6">
              <div className="text-xs font-mono text-secondary pb-4 border-b border-outline-variant">
                {a.origins_tag}
              </div>
              <h3 className="text-2xl text-on-surface font-light leading-snug">
                {a.origins_title}
              </h3>
              <p className="text-secondary text-sm leading-relaxed">{a.origins_desc}</p>
            </AnimateOnScroll>
          </div>

          {/* Right content */}
          <div className="lg:col-span-8">
            <AnimateOnScroll>
              <div className="prose prose-invert prose-zinc max-w-none">
                <p className="text-lg text-secondary leading-relaxed mb-8">{a.story_p1}</p>
                <p className="text-lg text-secondary leading-relaxed mb-12">{a.story_p2}</p>

                <h4 className="text-xl font-light text-on-surface mb-6 border-b border-outline-variant pb-4">
                  {a.principles_title}
                </h4>

                <div className="flex flex-col gap-6 mb-16">
                  {(a.principles ?? []).map((principle, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <span className="material-symbols-outlined text-primary mt-1">
                        check_circle
                      </span>
                      <div>
                        <h5 className="text-on-surface font-medium mb-1">{principle.title}</h5>
                        <p className="text-secondary text-sm">{principle.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Grid */}
              <StaggerContainer className="grid grid-cols-2 gap-4">
                {(a.stats ?? []).map((stat, i) => (
                  <StaggerItem
                    key={i}
                    className="bg-surface-card border border-outline-variant/60 rounded-xl p-6 flex flex-col gap-2"
                  >
                    <span className="text-3xl text-on-surface font-light">{stat.value}</span>
                    <span className="text-xs font-mono text-secondary uppercase">{stat.label}</span>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* SECTION 4 - Differentiators */}
      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-outline-variant/60">
        <AnimateOnScroll>
          <div className="flex flex-col gap-2 mb-12">
            <h2 className="text-xs font-mono tracking-widest text-secondary uppercase">
              {a.diff_tag}
            </h2>
            <h3 className="text-3xl font-light text-on-surface">{a.diff_title}</h3>
          </div>

          <StaggerContainer className="flex flex-col gap-4">
            {(a.diff_items ?? []).map((diff, i) => (
              <StaggerItem
                key={i}
                className="bg-surface-card border border-outline-variant rounded-xl p-6 md:p-8 hover:border-primary/40 hover:shadow-md transition-all group relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6 md:gap-8 relative z-10">
                  <div className="w-14 h-14 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                    <span className="material-symbols-outlined text-2xl">{diff.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-xl text-on-surface font-medium mb-2 text-center sm:text-left">
                      {diff.title}
                    </h4>
                    <p className="text-secondary leading-relaxed max-w-3xl text-center sm:text-left">
                      {diff.desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimateOnScroll>
      </section>

      {/* SECTION 5 - CTA Banner */}
      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-8 md:pb-12">
        <AnimateOnScroll>
          <div className="bg-surface-canvas border border-outline-variant rounded-2xl p-8 md:p-16 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-surface-canvas to-surface-canvas"></div>

            <div className="relative z-10 flex flex-col items-center max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-light text-on-surface mb-6 leading-tight">
                {a.cta_title}
              </h2>

              <p className="text-secondary text-lg mb-10">{a.cta_desc}</p>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-4">
                <Link
                  href={localePath('/contact')}
                  className="relative flex items-center justify-center px-8 py-4 overflow-hidden font-medium transition-all bg-primary text-inverse-on-surface rounded-lg group w-full sm:w-auto"
                >
                  <span className="relative w-full text-center flex items-center justify-center gap-2 transition-colors duration-200 ease-in-out">
                    {a.cta_btn_primary}
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </span>
                </Link>

                <a
                  href="mailto:contact@qubital.eu"
                  className="relative flex items-center justify-center px-8 py-4 overflow-hidden font-medium transition-all bg-surface border border-outline-variant text-on-surface rounded-lg group w-full sm:w-auto"
                >
                  <span className="relative w-full text-center flex items-center justify-center gap-2 transition-colors duration-200 ease-in-out">
                    <span className="material-symbols-outlined text-[18px]">mail</span>
                    {a.cta_btn_secondary}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>
    </main>
  );
}
