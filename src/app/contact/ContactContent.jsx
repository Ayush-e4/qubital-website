'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePostHog } from 'posthog-js/react';
import { useLanguage } from '@/components/LanguageProvider';
import { useLocalePath } from '@/lib/i18n/useLocalePath';
import { CONTACT_LIMITS, validateContactSubmission } from '@/lib/validation/contact';

export default function ContactContent() {
  const { t, locale } = useLanguage();
  const c = t.contact_page;
  const posthog = usePostHog();
  const localePath = useLocalePath();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    organization: '',
    domain: '',
    message: '',
    nda: false,
    consent: false,
    priority: 'Standard',
    // Honeypot. Never shown to a human — see the input at the end of the form.
    website: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Validation returns translation keys, not sentences (see
  // src/lib/validation/contact.js); the dictionary supplies the wording.
  const errorText = (field) => (errors[field] ? c[errors[field]] || errors[field] : '');

  // The label carries a {link} placeholder rather than being split into two keys,
  // because "Privacy Policy" does not sit at the same point in the sentence in
  // all six locales.
  const [consentBefore, consentAfter = ''] = (c.consent_label || '').split('{link}');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (submitError) setSubmitError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // The same rules the endpoint enforces, imported from the same module. This
    // copy exists to give immediate feedback; the server's copy is the one that
    // actually protects anything.
    const { valid, errors: fieldErrors } = validateContactSubmission(formData);
    if (!valid) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, locale }),
      });

      if (!response.ok) {
        throw new Error(`Contact endpoint returned ${response.status}`);
      }

      // After the submission is known to have succeeded, and carrying no PII —
      // the brief and the sender's address stay out of PostHog deliberately.
      try {
        if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
          posthog.capture('contact_form_submitted', {
            domain: formData.domain,
            priority: formData.priority,
            nda: formData.nda,
            locale,
          });
        }
      } catch {
        // Analytics must never turn a delivered submission into a visible error.
      }

      setIsSubmitted(true);
    } catch {
      // Keep what was typed on screen — a failed send must not also lose the brief.
      setSubmitError(
        c.val_submit_failed ||
          'We could not send your message. Please try again or email us directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-20 sm:pt-28 md:pt-32 pb-16 sm:pb-24 bg-surface-canvas text-on-surface">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Header Area */}
        <div className="mb-6 sm:mb-12">
          <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-light text-on-surface mb-4 sm:mb-6 tracking-tight">
            {c.title}
          </h1>
          <p className="text-base sm:text-xl text-secondary max-w-2xl leading-relaxed">
            {c.subtitle}
          </p>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Column (7 cols) - Contact Form */}
          <div className="xl:col-span-7">
            <div className="bg-surface-card border border-outline-variant border-l-4 border-l-primary p-5 sm:p-8 md:p-12 rounded-xl relative overflow-hidden group shadow-sm">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-150 pointer-events-none"></div>

              {isSubmitted ? (
                <div className="py-12 sm:py-20 text-center relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 text-success mb-6">
                    <span className="material-symbols-outlined text-4xl">check_circle</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-light text-on-surface mb-4">
                    {c.success_title}
                  </h2>
                  <p className="text-secondary text-sm sm:text-base mb-8 max-w-md mx-auto">
                    {c.success_desc}
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ ...formData, message: '' });
                    }}
                    className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-primary hover:text-primary/80 transition-colors py-2 px-4"
                  >
                    {c.submit_another}
                  </button>
                </div>
              ) : (
                <div className="relative z-10">
                  <div className="flex flex-wrap items-center justify-between border-b border-outline-variant pb-5 mb-6 sm:mb-8 gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-primary text-[20px]">
                        mail
                      </span>
                      <span className="text-xs font-mono font-semibold tracking-widest text-secondary uppercase">
                        {c.form_title}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-primary bg-primary/10 px-2.5 py-1 rounded inline-block font-semibold">
                      {c.security_badge}
                    </span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                      {/* Full Name */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="fullName"
                          className="block text-xs font-semibold tracking-wider text-secondary uppercase"
                        >
                          {c.full_name}
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder={c.placeholders?.fullName ?? 'Dr. Marcus Vance'}
                          maxLength={CONTACT_LIMITS.fullName.max}
                          className={`w-full bg-surface-canvas border ${errors.fullName ? 'border-error' : 'border-outline-variant'} text-on-surface px-4 py-3 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-base sm:text-sm placeholder:text-secondary/90`}
                        />
                        {errors.fullName && (
                          <p className="text-error text-xs mt-1">{errorText('fullName')}</p>
                        )}
                      </div>

                      {/* Corporate Email */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="email"
                          className="block text-xs font-semibold tracking-wider text-secondary uppercase"
                        >
                          {c.email}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={c.placeholders?.email ?? 'm.vance@company.com'}
                          maxLength={CONTACT_LIMITS.email.max}
                          className={`w-full bg-surface-canvas border ${errors.email ? 'border-error' : 'border-outline-variant'} text-on-surface px-4 py-3 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-base sm:text-sm placeholder:text-secondary/90`}
                        />
                        {errors.email && (
                          <p className="text-error text-xs mt-1">{errorText('email')}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                      {/* Organization Name */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="organization"
                          className="block text-xs font-semibold tracking-wider text-secondary uppercase"
                        >
                          {c.organization}
                        </label>
                        <input
                          type="text"
                          id="organization"
                          name="organization"
                          value={formData.organization}
                          onChange={handleChange}
                          placeholder={c.placeholders?.organization ?? 'Siemens Energy AG'}
                          maxLength={CONTACT_LIMITS.organization.max}
                          className={`w-full bg-surface-canvas border ${errors.organization ? 'border-error' : 'border-outline-variant'} text-on-surface px-4 py-3 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-base sm:text-sm placeholder:text-secondary/90`}
                        />
                        {errors.organization && (
                          <p className="text-error text-xs mt-1">{errorText('organization')}</p>
                        )}
                      </div>

                      {/* Engagement Domain */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="domain"
                          className="block text-xs font-semibold tracking-wider text-secondary uppercase"
                        >
                          {c.domain}
                        </label>
                        <select
                          id="domain"
                          name="domain"
                          value={formData.domain}
                          onChange={handleChange}
                          className={`w-full bg-surface-canvas border ${errors.domain ? 'border-error' : 'border-outline-variant'} text-on-surface px-4 py-3 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-base sm:text-sm`}
                        >
                          <option value="">{c.domain_select}</option>
                          {(c.domains ?? []).map((dom, i) => (
                            <option key={i} value={dom}>
                              {dom}
                            </option>
                          ))}
                        </select>
                        {errors.domain && (
                          <p className="text-error text-xs mt-1">{errorText('domain')}</p>
                        )}
                      </div>
                    </div>

                    {/* Message Input */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="message"
                        className="block text-xs font-semibold tracking-wider text-secondary uppercase"
                      >
                        {c.message}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={
                          c.placeholders?.message ?? 'Detail your operational bottlenecks...'
                        }
                        maxLength={CONTACT_LIMITS.message.max}
                        className={`w-full bg-surface-canvas border ${errors.message ? 'border-error' : 'border-outline-variant'} text-on-surface px-4 py-3 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-base sm:text-sm placeholder:text-secondary/90`}
                      />
                      {errors.message && (
                        <p className="text-error text-xs mt-1">{errorText('message')}</p>
                      )}
                    </div>

                    {/* Checkboxes & Priority */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                      <label className="flex items-center gap-3 cursor-pointer py-1">
                        <input
                          type="checkbox"
                          name="nda"
                          checked={formData.nda}
                          onChange={handleChange}
                          className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary"
                        />
                        <span className="text-xs text-secondary font-medium">{c.nda}</span>
                      </label>

                      <div className="flex items-center gap-2">
                        <label htmlFor="priority" className="text-xs text-secondary font-medium">
                          {c.priority}
                        </label>
                        <select
                          id="priority"
                          name="priority"
                          value={formData.priority}
                          onChange={handleChange}
                          className="bg-surface-canvas border border-outline-variant text-xs text-on-surface px-2.5 py-1.5 rounded focus:outline-none focus:border-primary"
                        >
                          <option value="Standard">{c.priority_std ?? 'Standard (24-48h)'}</option>
                          <option value="Urgent">{c.priority_urg ?? 'Urgent (Same Day)'}</option>
                        </select>
                      </div>
                    </div>

                    {/* Required acknowledgement. Enforced by the shared rules, so
                        the endpoint rejects a submission that skipped it. */}
                    <div className="space-y-1.5 pt-2">
                      <label className="flex items-start gap-3 cursor-pointer py-1">
                        <input
                          type="checkbox"
                          name="consent"
                          checked={formData.consent}
                          onChange={handleChange}
                          className={`w-4 h-4 mt-0.5 rounded text-primary focus:ring-primary ${errors.consent ? 'border-error' : 'border-outline-variant'}`}
                        />
                        <span className="text-xs text-secondary font-medium leading-relaxed">
                          {consentBefore}
                          <Link
                            href={localePath('/privacy-and-gdpr')}
                            className="text-primary hover:underline"
                          >
                            {c.consent_link_text}
                          </Link>
                          {consentAfter}
                        </span>
                      </label>
                      {errors.consent && (
                        <p className="text-error text-xs mt-1">{errorText('consent')}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-on-primary font-semibold px-8 py-3.5 rounded-xl hover:bg-primary/90 transition-colors shadow-md text-sm mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span>{isSubmitting ? c.submitting || 'Sending…' : c.submit}</span>
                      <span className="material-symbols-outlined text-[18px]">send</span>
                    </button>

                    {submitError && (
                      <p role="alert" className="text-error text-xs sm:text-sm mt-3">
                        {submitError}
                      </p>
                    )}

                    {/*
                      Honeypot: off-screen rather than display:none, because bots
                      commonly skip fields that are hidden outright. A human never
                      reaches it (aria-hidden + tabIndex -1), so any value here
                      means an automated submitter.
                    */}
                    <div
                      aria-hidden="true"
                      className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden"
                    >
                      <label htmlFor="website">Website</label>
                      <input
                        type="text"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (5 cols) - Contact Info & Direct Channels */}
          <div className="xl:col-span-5 flex flex-col gap-6">
            <div className="bg-surface-card border border-outline-variant p-6 sm:p-8 rounded-xl shadow-xs space-y-6">
              <h2 className="text-lg font-bold text-on-surface pb-3 border-b border-outline-variant">
                {c.channels_title}
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">location_on</span>
                  </div>
                  <div>
                    <span className="text-xs font-mono font-semibold text-secondary uppercase block mb-0.5">
                      {c.headquarters}
                    </span>
                    <p className="text-sm font-medium text-on-surface">
                      {c.location_full || 'Herzogenaurach, Bavaria, Germany'}
                    </p>
                    <span className="text-xs text-secondary">
                      {c.region || 'Nuremberg Metropolitan Region'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </div>
                  <div>
                    <span className="text-xs font-mono font-semibold text-secondary uppercase block mb-0.5">
                      {c.direct_email}
                    </span>
                    <a
                      href="mailto:contact@qubital.eu"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      contact@qubital.eu
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">schedule</span>
                  </div>
                  <div>
                    <span className="text-xs font-mono font-semibold text-secondary uppercase block mb-0.5">
                      {c.hours}
                    </span>
                    <p className="text-sm font-medium text-on-surface">
                      {c.hours_val || 'Mon – Fri: 08:00 – 18:00 CET'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-card border border-outline-variant p-6 sm:p-8 rounded-xl shadow-xs space-y-4">
              <span className="text-xs font-mono font-semibold text-primary uppercase tracking-wider block">
                {c.security_protocol || 'Security Protocol'}
              </span>
              <h3 className="text-base font-bold text-on-surface">{c.protocol_title}</h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">{c.protocol_desc}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
