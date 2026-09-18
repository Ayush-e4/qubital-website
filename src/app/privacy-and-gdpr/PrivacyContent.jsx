'use client';

import { useLanguage } from '@/components/LanguageProvider';

export default function PrivacyContent() {
  const { t } = useLanguage();
  const p = t.privacy_page;

  return (
    <main className="pt-20 sm:pt-28 md:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-light text-on-surface mb-6 tracking-tight">{p.title}</h1>
      <p className="text-secondary text-lg leading-relaxed mb-8">{p.intro}</p>
      <div className="space-y-6 text-secondary leading-relaxed">
        <section>
          <h2 className="text-xl font-medium text-on-surface mb-2">{p.sec_1_title}</h2>
          <p>
            {p.sec_1_desc}
            <br />
            Contact:{' '}
            <a href="mailto:contact@qubital.eu" className="text-primary hover:underline">
              contact@qubital.eu
            </a>
          </p>
        </section>
        <section>
          <h2 className="text-xl font-medium text-on-surface mb-2">{p.sec_2_title}</h2>
          <p>{p.sec_2_desc}</p>
        </section>
        <section>
          <h2 className="text-xl font-medium text-on-surface mb-2">{p.sec_3_title}</h2>
          <p>
            {p.sec_3_desc}{' '}
            <a href="mailto:contact@qubital.eu" className="text-primary hover:underline">
              contact@qubital.eu
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="text-xl font-medium text-on-surface mb-2">{p.sec_4_title}</h2>
          <p>{p.sec_4_desc}</p>
        </section>
      </div>
    </main>
  );
}
