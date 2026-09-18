'use client';

import { useLanguage } from '@/components/LanguageProvider';

export default function ComplianceContent() {
  const { t } = useLanguage();
  const c = t.compliance_page;

  return (
    <main className="pt-20 sm:pt-28 md:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-light text-on-surface mb-2 tracking-tight">{c.title}</h1>
      <p className="text-xs font-mono text-secondary mb-10 uppercase tracking-widest">{c.subtitle}</p>
      <div className="space-y-8 text-secondary leading-relaxed">
        <section>
          <h2 className="text-xl font-medium text-on-surface mb-3">{c.sec_1_title}</h2>
          <p>{c.sec_1_desc}</p>
        </section>
        <section>
          <h2 className="text-xl font-medium text-on-surface mb-3">{c.sec_2_title}</h2>
          <p>{c.sec_2_desc}</p>
        </section>
        <section>
          <h2 className="text-xl font-medium text-on-surface mb-3">{c.sec_3_title}</h2>
          <p>{c.sec_3_desc}</p>
        </section>
        <section>
          <h2 className="text-xl font-medium text-on-surface mb-3">{c.sec_4_title}</h2>
          <p>{c.sec_4_desc}</p>
        </section>
        <section>
          <h2 className="text-xl font-medium text-on-surface mb-3">{c.sec_5_title}</h2>
          <p>{c.sec_5_desc} <a href="mailto:contact@qubital.eu" className="text-primary hover:underline">contact@qubital.eu</a>.</p>
        </section>
      </div>
    </main>
  );
}
