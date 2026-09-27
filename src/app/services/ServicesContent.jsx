'use client';

import Link from 'next/link';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/AnimateOnScroll';
import ServiceCard from '@/components/ServiceCard';
import MethodologySteps from '@/components/MethodologySteps';
import { useLanguage } from '@/components/LanguageProvider';
import { useLocalePath } from '@/lib/i18n/useLocalePath';
import { DynamicIcon } from '@/lib/icons';
import { BadgeCheck, LayoutGrid, Settings, User } from 'lucide-react';

export default function ServicesContent() {
  const { t } = useLanguage();
  const s = t.services_page;

  const localePath = useLocalePath();

  return (
    <main className="flex-grow pt-20 sm:pt-28 pb-16">
      {/* SECTION 1 - Hero */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-6 sm:py-16 md:py-20 lg:py-24">
        <AnimateOnScroll className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col items-center space-y-8">
            <h1 className="text-style-headline-lg text-on-surface">
              {s.hero_title_1} <br className="hidden sm:inline" />
              <span className="text-primary block sm:inline">{s.hero_title_2}</span>
            </h1>

            <p className="font-body-lg text-on-surface-variant max-w-2xl leading-relaxed mx-auto">
              {s.hero_desc}
            </p>

            <div className="flex justify-center w-full px-4 sm:px-0">
              <Link
                href={localePath('/contact')}
                className="w-full sm:w-auto text-center justify-center px-8 py-3.5 bg-primary text-on-primary rounded-xl hover:bg-primary/90 transition-colors duration-200 shadow-md font-semibold text-sm sm:text-base"
              >
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
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>{s.matrix_tag}</span>
            </div>
            <h2 className="text-style-headline-md text-on-surface mb-6">{s.matrix_title}</h2>
            <p className="font-body-lg text-on-surface-variant text-lg max-w-2xl mx-auto">
              {s.matrix_desc}
            </p>
          </div>
        </AnimateOnScroll>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(s.matrix_cards ?? []).map((card) => (
            <StaggerItem key={card.id} className="h-full">
              <ServiceCard
                id={card.id}
                icon={<DynamicIcon name={card.icon} className="h-8 w-8 md:h-9 md:w-9" />}
                title={card.title}
                description={card.description}
                items={card.items}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* SECTION 3 - Execution Methodology */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 md:py-24 bg-surface">
        <AnimateOnScroll className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-primary font-label-md tracking-widest uppercase mb-4 justify-center">
            <Settings className="h-3.5 w-3.5" />
            <span>{s.methodology_tag}</span>
          </div>
          <h2 className="text-style-headline-md text-on-surface mb-6">{s.methodology_title}</h2>
          <p className="font-body-lg text-on-surface-variant text-lg">{s.methodology_desc}</p>
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
                    <path
                      d="M0 40L40 0H20L0 20M40 40V20L20 40"
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cta-grid)" />
              </svg>
            </div>

            <div className="lg:max-w-2xl relative z-10 text-center lg:text-left mb-10 lg:mb-0">
              <h2 className="text-style-headline-md text-inverse-on-surface mb-6">{s.cta_title}</h2>
              <p className="font-body-lg text-inverse-on-surface/80 text-lg mb-8 max-w-xl mx-auto lg:mx-0">
                {s.cta_desc}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-6 text-sm text-inverse-on-surface/70">
                <div className="flex items-center space-x-2">
                  <BadgeCheck className="h-[18px] w-[18px]" />
                  <span>{s.cta_nda}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-[18px] w-[18px]" />
                  <span>{s.cta_direct}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full sm:w-auto space-y-4 relative z-10 shrink-0">
              <Link
                href={localePath('/contact')}
                className="inline-flex justify-center items-center px-8 py-4 bg-primary text-on-primary rounded hover:bg-primary/90 transition-colors duration-200 w-full sm:w-auto"
              >
                {s.cta_btn_primary}
              </Link>
              <a
                href="mailto:contact@qubital.eu"
                className="inline-flex justify-center items-center px-8 py-4 bg-transparent text-inverse-on-surface border border-inverse-on-surface/30 rounded hover:bg-inverse-on-surface/10 transition-colors duration-200 w-full sm:w-auto"
              >
                {s.cta_btn_secondary}
              </a>
            </div>
          </div>
        </AnimateOnScroll>
      </section>
    </main>
  );
}
