/**
 * HTML + plain-text builders for the two contact-form emails.
 *
 * Deliberately hand-rolled rather than using `@react-email/components`: that is
 * a handful of packages to render two templates whose content is already known.
 * Both builders return `{ subject, html, text }`. The text alternative is not
 * decoration: multipart/alternative measurably improves deliverability, and some
 * corporate clients strip HTML entirely.
 *
 * The copy is English-only; localizing the auto-reply is a follow-up.
 * Hex colours are correct here: email clients cannot use the site's CSS tokens.
 */
import { site } from '@/config/site';
import { topicLabel } from './topics';

const BRAND = site.legalName;
const CONTACT_EMAIL = site.email;
const HOURS = 'Mon to Fri, 8:00 to 18:00 CET';

const FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/**
 * Escape a value for interpolation into HTML.
 *
 * Every user-supplied value interpolated into a template MUST go through this.
 * The submitted message is attacker-controlled and lands in an inbox a human
 * reads; unescaped it is a phishing/markup-injection vector.
 */
export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Flatten to one line and clamp length, for values placed in a subject.
 * A newline in a header value is a header-injection primitive, so it must not
 * survive into the subject regardless of what the client sent.
 */
function oneLine(value: unknown, max = 80): string {
  const flat = String(value ?? '')
    .replace(/[\r\n]+/g, ' ')
    .trim();
  return flat.length > max ? `${flat.slice(0, max - 1)}…` : flat;
}

function shell({ heading, intro, body }: { heading: string; intro?: string; body: string }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(heading)}</title>
  </head>
  <body style="margin:0;padding:24px;background:#f4f5f7;font-family:${FONT_STACK};color:#1a1a1a;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2e4e8;border-radius:12px;overflow:hidden;">
      <div style="padding:20px 28px;border-bottom:3px solid #6650f2;background:#0c0c16;color:#ffffff;">
        <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.75;">${escapeHtml(BRAND)}</div>
        <div style="font-size:19px;font-weight:600;margin-top:6px;">${escapeHtml(heading)}</div>
      </div>
      <div style="padding:28px;">
        ${intro ? `<p style="margin:0 0 20px;font-size:15px;line-height:1.6;">${intro}</p>` : ''}
        ${body}
      </div>
      <div style="padding:16px 28px;background:#f8f9fb;border-top:1px solid #e2e4e8;font-size:12px;color:#5b6270;line-height:1.6;">
        ${escapeHtml(BRAND)} · <a href="mailto:${CONTACT_EMAIL}" style="color:#6650f2;text-decoration:none;">${CONTACT_EMAIL}</a><br />
        ${escapeHtml(HOURS)}
      </div>
    </div>
  </body>
</html>`;
}

function fieldRows(rows: [string, string][]) {
  return rows
    .map(
      ([label, value]) => `<tr>
          <td style="padding:9px 12px 9px 0;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:#5b6270;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
          <td style="padding:9px 0;font-size:15px;line-height:1.5;">${value}</td>
        </tr>`
    )
    .join('');
}

export type ContactSubmission = {
  fullName: string;
  email: string;
  organization: string;
  domain: string;
  message: string;
  locale: string;
};

/** Internal notification to the Qubital inbox. */
export function renderNotification(submission: ContactSubmission & { submittedAt: string }) {
  const { fullName, email, organization, message, locale, submittedAt } = submission;
  const topic = topicLabel(submission.domain);

  const subject = `New inquiry: ${oneLine(topic, 50)} from ${oneLine(fullName, 60)}`;

  const rows = fieldRows([
    ['Name', `<strong>${escapeHtml(fullName)}</strong>`],
    [
      'Email',
      `<a href="mailto:${escapeHtml(email)}" style="color:#6650f2;text-decoration:none;">${escapeHtml(email)}</a>`,
    ],
    ['Organization', escapeHtml(organization || '-')],
    ['Area of interest', escapeHtml(topic)],
    ['Site language', escapeHtml(locale)],
    ['Received', escapeHtml(submittedAt)],
  ]);

  const html = shell({
    heading: 'New project inquiry',
    intro: `Submitted through the website contact form. Reply directly to this message to answer ${escapeHtml(fullName)}.`,
    body: `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">${rows}</table>
        <div style="margin-top:22px;padding-top:18px;border-top:1px solid #e2e4e8;">
          <div style="font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:#5b6270;margin-bottom:8px;">Message</div>
          <div style="font-size:15px;line-height:1.65;white-space:pre-wrap;">${escapeHtml(message)}</div>
        </div>`,
  });

  const text = [
    'New project inquiry',
    '',
    `Name:              ${fullName}`,
    `Email:             ${email}`,
    `Organization:      ${organization || '-'}`,
    `Area of interest:  ${topic}`,
    `Site language:     ${locale}`,
    `Received:          ${submittedAt}`,
    '',
    '--- Message ---',
    message,
  ].join('\n');

  return { subject, html, text };
}

/**
 * Confirmation sent to the person who submitted the form, so they know the
 * message landed and have a copy of it.
 */
export function renderAutoReply(submission: ContactSubmission) {
  const { fullName, message, organization } = submission;
  const topic = topicLabel(submission.domain);

  const html = shell({
    heading: 'We have received your inquiry',
    // The turnaround is a fixed phrase, not read from anything the sender
    // controls; this sentence must not be rewritable by them.
    intro: `Thank you for reaching out${fullName ? `, ${escapeHtml(fullName)}` : ''}. Your message has reached our team and we will respond within one business day. A copy of what you sent is below.`,
    body: `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
          ${fieldRows([
            ['Area of interest', escapeHtml(topic)],
            ['Organization', escapeHtml(organization || '-')],
          ])}
        </table>
        <div style="margin-top:22px;padding-top:18px;border-top:1px solid #e2e4e8;">
          <div style="font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:#5b6270;margin-bottom:8px;">Your message</div>
          <div style="font-size:15px;line-height:1.65;white-space:pre-wrap;">${escapeHtml(message)}</div>
        </div>
        <p style="margin:22px 0 0;font-size:15px;line-height:1.6;">If anything is urgent, reply to this email or write to ${escapeHtml(CONTACT_EMAIL)} and we will prioritise it.</p>`,
  });

  const text = [
    `Thank you for reaching out${fullName ? `, ${fullName}` : ''}.`,
    '',
    'Your message has reached our team and we will respond within one business day.',
    'A copy of what you sent is below.',
    '',
    `Area of interest:  ${topic}`,
    `Organization:      ${organization || '-'}`,
    '',
    '--- Your message ---',
    message,
    '',
    `If anything is urgent, write to ${CONTACT_EMAIL}.`,
  ].join('\n');

  return { subject: 'We received your inquiry | Qubital', html, text };
}
