/**
 * Contact form validation — the single source of truth for the rules.
 *
 * Imported by both the form (src/components/sections/ContactForm.tsx) and the
 * route handler (src/app/api/contact/route.ts), so the browser and the server
 * cannot disagree about what is acceptable. Tighten a rule here and both sides
 * tighten together.
 *
 * Errors are returned as KEYS, not sentences. The form maps them to its
 * translated messages; the server only needs to know whether the submission is
 * valid.
 *
 * Pure module — no React, no Next — so it is safe on both sides.
 */

export const CONTACT_LIMITS = {
  fullName: { min: 2, max: 100 },
  email: { max: 254 },
  organization: { max: 200 },
  domain: { max: 200 },
  message: { min: 10, max: 5000 },
} as const;

/**
 * Deliberately permissive. A stricter pattern mostly rejects valid addresses,
 * and deliverability is the mail server's problem, not the regex's.
 */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactErrorKey =
  | 'val_name_required'
  | 'val_name_min'
  | 'val_email_required'
  | 'val_email_invalid'
  | 'val_domain_required'
  | 'val_message_required'
  | 'val_message_min'
  | 'val_consent_required'
  | 'val_too_long';

export type ContactField = 'fullName' | 'email' | 'organization' | 'domain' | 'message' | 'consent';

export type ContactValues = {
  fullName: string;
  email: string;
  organization: string;
  domain: string;
  message: string;
  consent: boolean;
};

/** Coerce to trimmed text, so a non-string field cannot throw or slip through. */
const asText = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

export function validateContactSubmission(input: unknown): {
  valid: boolean;
  errors: Partial<Record<ContactField, ContactErrorKey>>;
  values: ContactValues;
} {
  const source = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>;

  const values: ContactValues = {
    fullName: asText(source.fullName),
    email: asText(source.email),
    organization: asText(source.organization),
    domain: asText(source.domain),
    message: asText(source.message),
    // Checkbox: anything other than a literal boolean true is not consent.
    consent: source.consent === true,
  };

  const errors: Partial<Record<ContactField, ContactErrorKey>> = {};

  if (!values.fullName) errors.fullName = 'val_name_required';
  else if (values.fullName.length < CONTACT_LIMITS.fullName.min) errors.fullName = 'val_name_min';
  else if (values.fullName.length > CONTACT_LIMITS.fullName.max) errors.fullName = 'val_too_long';

  if (!values.email) errors.email = 'val_email_required';
  else if (!EMAIL_PATTERN.test(values.email)) errors.email = 'val_email_invalid';
  else if (values.email.length > CONTACT_LIMITS.email.max) errors.email = 'val_too_long';

  // Optional field, so length is the only rule.
  if (values.organization.length > CONTACT_LIMITS.organization.max) {
    errors.organization = 'val_too_long';
  }

  if (!values.domain) errors.domain = 'val_domain_required';
  else if (values.domain.length > CONTACT_LIMITS.domain.max) errors.domain = 'val_too_long';

  if (!values.message) errors.message = 'val_message_required';
  else if (values.message.length < CONTACT_LIMITS.message.min) errors.message = 'val_message_min';
  else if (values.message.length > CONTACT_LIMITS.message.max) errors.message = 'val_too_long';

  // Required acknowledgement, enforced here so the server rejects a submission
  // that never ticked it.
  if (!values.consent) errors.consent = 'val_consent_required';

  return { valid: Object.keys(errors).length === 0, errors, values };
}
