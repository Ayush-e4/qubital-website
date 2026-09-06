'use client';

import { useLanguage } from '@/components/LanguageProvider';

export default function ImpressumPage() {
  const { t } = useLanguage();
  const i = t.impressum_page;

  return (
    <main className="pt-20 sm:pt-28 md:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-light text-on-surface mb-2 tracking-tight">{i.title}</h1>
      <p className="text-xs font-mono text-secondary mb-10 uppercase tracking-widest">{i.subtitle}</p>
      <div className="space-y-8 text-secondary leading-relaxed">
        <section>
          <h2 className="text-xl font-medium text-on-surface mb-3">{i.sec_1_title}</h2>
          <p className="font-medium text-on-surface">{i.sec_1_company}</p>
          <p>{i.sec_1_location}</p>
        </section>
        <section>
          <h2 className="text-xl font-medium text-on-surface mb-3">{i.sec_2_title}</h2>
          <p>{i.sec_2_email} <a href="mailto:contact@qubital.eu" className="text-primary hover:underline">contact@qubital.eu</a></p>
          <p>{i.sec_2_hours}</p>
        </section>
        <section>
          <h2 className="text-xl font-medium text-on-surface mb-3">{i.sec_3_title}</h2>
          <p>{i.sec_3_desc}</p>
        </section>
        <section>
          <h2 className="text-xl font-medium text-on-surface mb-3">{i.sec_4_title}</h2>
          <p>{i.sec_4_desc}</p>
        </section>
      </div>
    </main>
  );
}
