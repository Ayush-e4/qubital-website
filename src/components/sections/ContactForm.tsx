'use client';

import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Check, LoaderCircle } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useState, type FormEvent, type ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import {
  validateContactSubmission,
  type ContactErrorKey,
  type ContactField,
} from '@/lib/contact/validation';
import { arrowRotate } from '../ui/Button';
import { serviceKeys } from './services';

const topics = [...serviceKeys, 'other'] as const;

type ErrorMessage = 'name' | 'email' | 'message' | 'consent' | 'tooLong';
type FormError = 'server' | 'rateLimited';

/** Validation keys (shared with the server) mapped to this form's messages. */
const FIELD_MESSAGES: Partial<Record<ContactErrorKey, ErrorMessage>> = {
  val_name_required: 'name',
  val_name_min: 'name',
  val_email_required: 'email',
  val_email_invalid: 'email',
  val_message_required: 'message',
  val_message_min: 'message',
  val_consent_required: 'consent',
  val_too_long: 'tooLong',
};

export function ContactForm() {
  const t = useTranslations('contact.form');
  const locale = useLocale();
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<ContactField, ErrorMessage>>>({});
  const [formError, setFormError] = useState<FormError | null>(null);

  const fieldError = (f: ContactField) => {
    const key = fieldErrors[f];
    return key ? t(`errors.${key}`) : undefined;
  };
  const has = (f: ContactField) => Boolean(fieldErrors[f]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const payload = {
      fullName: String(data.get('fullName') ?? ''),
      email: String(data.get('email') ?? ''),
      organization: String(data.get('organization') ?? ''),
      domain: String(data.get('domain') ?? ''),
      message: String(data.get('message') ?? ''),
      consent: data.get('consent') === 'on',
      website: String(data.get('website') ?? ''),
      locale,
    };

    // Same rules as the server, so most mistakes are caught before a request
    const { valid, errors } = validateContactSubmission(payload);
    const mapped: Partial<Record<ContactField, ErrorMessage>> = {};
    for (const [field, key] of Object.entries(errors) as [ContactField, ContactErrorKey][]) {
      const message = FIELD_MESSAGES[key];
      if (message) mapped[field] = message;
    }
    setFieldErrors(mapped);
    setFormError(null);
    if (!valid) {
      // A rule without a field message (e.g. a missing topic) still blocks sending
      if (Object.keys(mapped).length === 0) setFormError('server');
      return;
    }

    setPending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) setSent(true);
      else setFormError(res.status === 429 ? 'rateLimited' : 'server');
    } catch {
      setFormError('server');
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface/80 p-6 sm:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-violet/15 blur-[100px]"
      />
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex min-h-[520px] flex-col items-center justify-center text-center"
            role="status"
          >
            <motion.span
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
              className="flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-violet to-cyan text-bg shadow-[0_0_80px_-10px_rgb(63_227_242/0.8)]"
            >
              <Check className="size-9" strokeWidth={2.5} />
            </motion.span>
            <h2 className="mt-8 text-3xl font-medium tracking-tight">{t('success.title')}</h2>
            <p className="mt-3 max-w-sm text-muted">{t('success.text')}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-8 text-sm text-cyan underline-offset-4 hover:underline"
            >
              {t('success.again')}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            exit={{ opacity: 0, y: -10 }}
            onSubmit={onSubmit}
            className="relative flex flex-col gap-6"
          >
            {/* honeypot */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label={t('name')} error={fieldError('fullName')}>
                <input
                  name="fullName"
                  autoComplete="name"
                  placeholder={t('namePlaceholder')}
                  className={inputCls(has('fullName'))}
                  aria-invalid={has('fullName')}
                />
              </Field>
              <Field label={t('email')} error={fieldError('email')}>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t('emailPlaceholder')}
                  className={inputCls(has('email'))}
                  aria-invalid={has('email')}
                />
              </Field>
            </div>

            <Field label={t('company')} error={fieldError('organization')}>
              <input
                name="organization"
                autoComplete="organization"
                placeholder={t('companyPlaceholder')}
                className={inputCls(has('organization'))}
                aria-invalid={has('organization')}
              />
            </Field>

            <fieldset>
              <legend className="mb-3 text-sm text-muted">{t('topic')}</legend>
              <div className="flex flex-wrap gap-2">
                {topics.map((topic, i) => (
                  <label key={topic} className="cursor-pointer">
                    <input
                      type="radio"
                      name="domain"
                      value={topic}
                      defaultChecked={i === 0}
                      className="peer sr-only"
                    />
                    <span className="block rounded-full border border-line bg-fg/[0.02] px-4 py-2 text-sm text-muted transition-all duration-300 hover:border-line-strong hover:text-fg peer-checked:border-transparent peer-checked:bg-fg peer-checked:text-bg peer-focus-visible:outline-2 peer-focus-visible:outline-cyan">
                      {t(`topics.${topic}`)}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <Field label={t('message')} error={fieldError('message')}>
              <textarea
                name="message"
                rows={5}
                placeholder={t('messagePlaceholder')}
                className={cn(inputCls(has('message')), 'resize-none')}
                aria-invalid={has('message')}
              />
            </Field>

            <div>
              <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted">
                <input type="checkbox" name="consent" className="peer sr-only" />
                <span
                  className={cn(
                    'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors peer-checked:border-transparent peer-checked:bg-gradient-to-br peer-checked:from-violet peer-checked:to-cyan peer-focus-visible:outline-2 peer-focus-visible:outline-cyan [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100',
                    has('consent') ? 'border-danger' : 'border-line-strong'
                  )}
                >
                  <Check className="size-3.5 text-bg" strokeWidth={3} />
                </span>
                <span>
                  {t.rich('consent', {
                    link: (chunks) => (
                      <Link
                        href="/privacy"
                        className="text-fg underline underline-offset-4 hover:text-cyan"
                      >
                        {chunks}
                      </Link>
                    ),
                  })}
                </span>
              </label>
              {has('consent') && <ErrorText>{fieldError('consent')}</ErrorText>}
            </div>

            {formError && (
              <p
                role="alert"
                className="rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger"
              >
                {t(`errors.${formError}`)}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="group mt-2 inline-flex items-center justify-between gap-3 self-start rounded-full bg-fg py-2 pl-6 pr-2 text-sm font-medium text-bg transition-colors duration-200 hover:bg-fg/85 disabled:opacity-70"
            >
              <span>{pending ? t('sending') : t('submit')}</span>
              <span className="flex size-9 items-center justify-center rounded-full bg-bg text-fg">
                {pending ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  <ArrowUpRight className={arrowRotate} />
                )}
              </span>
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function inputCls(error: boolean) {
  return cn(
    'w-full rounded-2xl border bg-bg/60 px-4 py-3.5 text-fg placeholder:text-faint outline-none transition-all duration-300 focus:border-violet/60 focus:bg-bg focus:shadow-[0_0_0_4px_rgb(139_123_255/0.12)]',
    error ? 'border-danger/60' : 'border-line'
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm text-muted">{label}</span>
      {children}
      {error && <ErrorText>{error}</ErrorText>}
    </label>
  );
}

function ErrorText({ children }: { children: ReactNode }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      role="alert"
      className="mt-1 block text-sm text-danger"
    >
      {children}
    </motion.span>
  );
}
