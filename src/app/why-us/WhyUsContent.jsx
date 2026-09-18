'use client';

import Link from 'next/link';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/AnimateOnScroll';
import { useLanguage } from '@/components/LanguageProvider';
import { useLocalePath } from '@/lib/i18n/useLocalePath';

export default function WhyUsContent() {
  const { t } = useLanguage();
  const w = t.why_us_page || {};

  const localePath = useLocalePath();

  const headers = w.comparison_headers || {
    criteria: 'Criteria',
    qubital: 'Qubital Systems',
    traditional: 'Traditional Consultancies / Agencies'
  };

  return (
    <main className="flex-1 w-full flex flex-col items-center">
      {/* SECTION 1 - Editorial Header & Hero */}
      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 pb-12 md:pb-20">
        <AnimateOnScroll>
          <div className="flex flex-col items-start gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold tracking-widest uppercase">
              <span className="material-symbols-outlined text-[14px]">award_star</span>
              <span>{w.tag || 'WHY QUBITAL'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            <h1 className="lg:col-span-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-on-surface leading-tight">
              {w.hero_title_1} <br />
              <span className="text-primary font-semibold">{w.hero_title_2}</span>
            </h1>

            <p className="lg:col-span-4 text-base sm:text-lg text-secondary leading-relaxed pt-2">
              {w.hero_desc}
            </p>
          </div>
        </AnimateOnScroll>
      </section>

      <hr className="border-outline/30 w-full max-w-7xl mx-auto" />

      {/* SECTION 2 - Head-to-Head Comparison Matrix Table */}
      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <AnimateOnScroll className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-primary text-xs font-mono font-bold tracking-widest uppercase mb-3 justify-center">
            <span className="material-symbols-outlined text-sm">compare_arrows</span>
            <span>{w.comparison_tag || 'THE DIRECT COMPARISON'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-on-surface tracking-tight mb-4">
            {w.comparison_title || 'How Qubital Redefines Advisory Engagements'}
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <div className="w-full overflow-x-auto rounded-2xl border border-outline-variant/60 bg-surface-card shadow-sm">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-outline-variant/60 bg-surface">
                  <th className="py-4 px-6 text-xs font-mono font-bold uppercase tracking-wider text-secondary w-1/4">
                    {headers.criteria}
                  </th>
                  <th className="py-4 px-6 text-xs font-mono font-bold uppercase tracking-wider text-primary bg-primary/5 w-3/8 border-x border-primary/20">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      <span>{headers.qubital}</span>
                    </div>
                  </th>
                  <th className="py-4 px-6 text-xs font-mono font-bold uppercase tracking-wider text-secondary/70 w-3/8">
                    {headers.traditional}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/40">
                {(w.comparison_rows || []).map((row, idx) => (
                  <tr key={idx} className="hover:bg-surface/50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-sm text-on-surface">
                      {row.criteria}
                    </td>
                    <td className="py-4 px-6 text-sm text-on-surface bg-primary/5 border-x border-primary/20 font-medium">
                      <div className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                        <span>{row.qubital}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-secondary">
                      <div className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-secondary/50 text-[18px] shrink-0 mt-0.5">cancel</span>
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimateOnScroll>
      </section>

      {/* SECTION 3 - Proven Advantages */}
      <section className="w-full bg-surface py-16 md:py-24 border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-primary text-xs font-mono font-bold tracking-widest uppercase mb-3 justify-center">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span>{w.pillars_tag || 'PROVEN ADVANTAGES'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-on-surface tracking-tight mb-4">
              {w.pillars_title || 'Engineered for High-Stakes Environments'}
            </h2>
          </AnimateOnScroll>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(w.pillars || []).map((pillar) => (
              <StaggerItem key={pillar.id} className="h-full">
                <div className="h-full bg-surface-canvas border border-outline-variant/60 hover:border-primary/40 rounded-2xl p-8 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-2xl">{pillar.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold text-on-surface mb-3">{pillar.title}</h3>
                    <p className="text-secondary text-sm sm:text-base leading-relaxed">{pillar.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-outline-variant/40 flex items-center justify-between text-xs font-mono text-secondary/70 uppercase">
                    <span>{w.advantage_label || 'Advantage'} 0{pillar.id}</span>
                    <span className="text-primary font-bold">{w.enterprise_guarantee || 'Enterprise Guarantee'}</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* SECTION 4 - Call to Action */}
      <section className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <AnimateOnScroll className="bg-inverse-surface text-inverse-on-surface rounded-2xl p-8 sm:p-12 shadow-xl relative overflow-hidden text-center flex flex-col items-center">
          <div className="absolute -right-24 -top-24 w-72 md:w-96 h-72 md:h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 relative z-10">
            {w.cta_title || 'Experience the difference of senior-led engineering.'}
          </h2>
          <p className="text-inverse-on-surface/75 text-sm sm:text-base md:text-lg mb-8 max-w-2xl leading-relaxed relative z-10">
            {w.cta_desc || 'Talk directly to our principal architects to review your technical challenges.'}
          </p>
          <Link
            href={localePath("/contact")}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-on-primary font-semibold rounded-xl hover:bg-primary/90 transition-colors duration-200 shadow-md text-sm sm:text-base relative z-10"
          >
            <span>{w.cta_btn || 'Book an Architecture Briefing'}</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </AnimateOnScroll>
      </section>
    </main>
  );
}
