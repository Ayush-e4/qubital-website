/**
 * Contact form validation — the single source of truth for the rules.
 *
 * Imported by both the client form (src/app/contact/ContactContent.jsx) and the
 * route handler (src/app/api/contact/route.js). They previously stated the rules
 * separately, which is how the browser ended up enforcing fewer of them than the
 * server: the client never checked length caps, so a long paste was accepted
 * locally and only rejected on the wire. One module means they cannot drift —
 * tighten a rule here and both sides tighten together.
 *
 * Errors are returned as translation KEYS, not sentences. The client renders them
 * through the locale dictionary; the server only needs to know whether the
 * submission is valid and never needs a dictionary at all.
 *
 * Pure module — no React, no Next — so it is safe on both sides.
 */

export const CONTACT_LIMITS = {
  fullName: { min: 2, max: 100 },
  email: { max: 254 },
  organization: { max: 200 },
  domain: { max: 200 },
  message: { min: 10, max: 5000 },
};

/**
 * Deliberately permissive. A stricter pattern mostly rejects valid addresses,
 * and the server is the only place that could actually tell the difference —
 * deliverability is Resend's problem, not the regex's.
 */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PRIORITIES = ['Standard', 'Urgent'];

/** Coerce to trimmed text, so a non-string field cannot throw or slip through. */
const asText = (value) => (typeof value === 'string' ? value.trim() : '');

/**
 * Validate a contact submission.
 *
 * @param {unknown} input
 * @returns {{
 *   valid: boolean,
 *   errors: Record<string, string>,
 *   values: {
 *     fullName: string, email: string, organization: string, domain: string,
 *     message: string, nda: boolean, consent: boolean, priority: string,
 *   },
 * }}
 */
export function validateContactSubmission(input) {
  const source = input && typeof input === 'object' ? input : {};

  const values = {
    fullName: asText(source.fullName),
    email: asText(source.email),
    organization: asText(source.organization),
    domain: asText(source.domain),
    message: asText(source.message),
    // Checkboxes: anything other than a literal boolean true is not consent.
    nda: source.nda === true,
    consent: source.consent === true,
    priority: PRIORITIES.includes(source.priority) ? source.priority : 'Standard',
  };

  /** @type {Record<string, string>} */
  const errors = {};

  if (!values.fullName) {
    errors.fullName = 'val_name_required';
  } else if (values.fullName.length < CONTACT_LIMITS.fullName.min) {
    errors.fullName = 'val_name_min';
  } else if (values.fullName.length > CONTACT_LIMITS.fullName.max) {
    errors.fullName = 'val_too_long';
  }

  if (!values.email) {
    errors.email = 'val_email_required';
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = 'val_email_invalid';
  } else if (values.email.length > CONTACT_LIMITS.email.max) {
    errors.email = 'val_too_long';
  }

  // Optional field, so length is the only rule.
  if (values.organization.length > CONTACT_LIMITS.organization.max) {
    errors.organization = 'val_too_long';
  }

  if (!values.domain) {
    errors.domain = 'val_domain_required';
  } else if (values.domain.length > CONTACT_LIMITS.domain.max) {
    errors.domain = 'val_too_long';
  }

  if (!values.message) {
    errors.message = 'val_message_required';
  } else if (values.message.length < CONTACT_LIMITS.message.min) {
    errors.message = 'val_message_min';
  } else if (values.message.length > CONTACT_LIMITS.message.max) {
    errors.message = 'val_too_long';
  }

  // Required acknowledgement. Enforced here rather than only in the markup, so
  // the server rejects a submission that never ticked it.
  if (!values.consent) {
    errors.consent = 'val_consent_required';
  }

  return { valid: Object.keys(errors).length === 0, errors, values };
}
