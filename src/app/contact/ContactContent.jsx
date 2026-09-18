'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { useLanguage } from '@/components/LanguageProvider';

export default function ContactContent() {
  const { t } = useLanguage();
  const c = t.contact_page;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    organization: '',
    domain: '',
    message: '',
    nda: false,
    priority: 'Standard',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    const fullNameTrimmed = formData.fullName.trim();
    if (!fullNameTrimmed) {
      newErrors.fullName = c.val_name_required || 'Full Name is required';
    } else if (fullNameTrimmed.length < 2) {
      newErrors.fullName = c.val_name_min || 'Name must be at least 2 characters';
    }

    const emailTrimmed = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrimmed) {
      newErrors.email = c.val_email_required || 'Corporate Email is required';
    } else if (!emailRegex.test(emailTrimmed)) {
      newErrors.email = c.val_email_invalid || 'Please enter a valid email address';
    }

    if (!formData.domain) {
      newErrors.domain = c.val_domain_required || 'Please select a domain';
    }

    const messageTrimmed = formData.message.trim();
    if (!messageTrimmed) {
      newErrors.message = c.val_message_required || 'Message is required';
    } else if (messageTrimmed.length < 10) {
      newErrors.message = c.val_message_required || 'Message must be at least 10 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitted(true);
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
                          className={`w-full bg-surface-canvas border ${errors.fullName ? 'border-error' : 'border-outline-variant'} text-on-surface px-4 py-3 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-base sm:text-sm placeholder:text-secondary/70`}
                        />
                        {errors.fullName && (
                          <p className="text-error text-xs mt-1">{errors.fullName}</p>
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
                          className={`w-full bg-surface-canvas border ${errors.email ? 'border-error' : 'border-outline-variant'} text-on-surface px-4 py-3 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-base sm:text-sm placeholder:text-secondary/70`}
                        />
                        {errors.email && <p className="text-error text-xs mt-1">{errors.email}</p>}
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
                          className="w-full bg-surface-canvas border border-outline-variant text-on-surface px-4 py-3 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-base sm:text-sm placeholder:text-secondary/70"
                        />
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
                          <p className="text-error text-xs mt-1">{errors.domain}</p>
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
                        className={`w-full bg-surface-canvas border ${errors.message ? 'border-error' : 'border-outline-variant'} text-on-surface px-4 py-3 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-base sm:text-sm placeholder:text-secondary/70`}
                      />
                      {errors.message && (
                        <p className="text-error text-xs mt-1">{errors.message}</p>
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
                        <span className="text-xs text-secondary font-medium">{c.priority}</span>
                        <select
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

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-on-primary font-semibold px-8 py-3.5 rounded-xl hover:bg-primary/90 transition-colors shadow-md text-sm mt-4"
                    >
                      <span>{c.submit}</span>
                      <span className="material-symbols-outlined text-[18px]">send</span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (5 cols) - Contact Info & Direct Channels */}
          <div className="xl:col-span-5 flex flex-col gap-6">
            <div className="bg-surface-card border border-outline-variant p-6 sm:p-8 rounded-xl shadow-xs space-y-6">
              <h3 className="text-lg font-bold text-on-surface pb-3 border-b border-outline-variant">
                {c.channels_title}
              </h3>

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
              <h4 className="text-base font-bold text-on-surface">{c.protocol_title}</h4>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">{c.protocol_desc}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
