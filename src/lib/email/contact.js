/**
 * HTML + plain-text builders for the two contact-form emails.
 *
 * Deliberately hand-rolled rather than using `@react-email/components`: that is
 * a handful of packages to render two templates whose content is already known.
 *
 * Both builders return `{ subject, html, text }`. The text alternative is not
 * decoration — multipart/alternative measurably improves deliverability, and
 * some corporate clients strip HTML entirely.
 *
 * Locale note: the copy here is English-only. Localizing the auto-reply would
 * mean another set of keys in all six dictionaries; see the plan for why it was
 * deferred.
 */

const BRAND = 'Qubital Systems GmbH';
const CONTACT_EMAIL = 'contact@qubital.eu';
const HOURS = 'Mon – Fri: 08:00 – 18:00 CET';

const FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/**
 * Escape a value for interpolation into HTML.
 *
 * Every user-supplied value interpolated into a template MUST go through this.
 * The submitted brief is attacker-controlled and lands in an inbox a human
 * reads; unescaped it is a phishing/markup-injection vector.
 *
 * @param {unknown} value
 */
export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Flatten to one line and clamp length — for values placed in a subject.
 * A newline in a header value is a header-injection primitive, so it must not
 * survive into the subject regardless of what the client sent.
 */
function oneLine(value, max = 80) {
  const flat = String(value ?? '')
    .replace(/[\r\n]+/g, ' ')
    .trim();
  return flat.length > max ? `${flat.slice(0, max - 1)}…` : flat;
}

function shell({ heading, intro, body }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(heading)}</title>
  </head>
  <body style="margin:0;padding:24px;background:#f4f5f7;font-family:${FONT_STACK};color:#1a1a1a;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2e4e8;border-radius:12px;overflow:hidden;">
      <div style="padding:20px 28px;border-bottom:3px solid #1f4fd8;background:#0d1b3d;color:#ffffff;">
        <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.75;">${escapeHtml(BRAND)}</div>
        <div style="font-size:19px;font-weight:600;margin-top:6px;">${escapeHtml(heading)}</div>
      </div>
      <div style="padding:28px;">
        ${intro ? `<p style="margin:0 0 20px;font-size:15px;line-height:1.6;">${intro}</p>` : ''}
        ${body}
      </div>
      <div style="padding:16px 28px;background:#f8f9fb;border-top:1px solid #e2e4e8;font-size:12px;color:#5b6270;line-height:1.6;">
        ${escapeHtml(BRAND)} · <a href="mailto:${CONTACT_EMAIL}" style="color:#1f4fd8;text-decoration:none;">${CONTACT_EMAIL}</a><br />
        ${escapeHtml(HOURS)}
      </div>
    </div>
  </body>
</html>`;
}

function fieldRows(rows) {
  return rows
    .map(
      ([label, value]) => `<tr>
          <td style="padding:9px 12px 9px 0;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:#5b6270;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
          <td style="padding:9px 0;font-size:15px;line-height:1.5;">${value}</td>
        </tr>`
    )
    .join('');
}

/**
 * Internal notification to the Qubital inbox.
 *
 * @param {{
 *   fullName: string, email: string, organization: string, domain: string,
 *   message: string, nda: boolean, priority: string, locale: string,
 *   submittedAt: string,
 * }} submission
 */
export function renderNotification(submission) {
  const { fullName, email, organization, domain, message, nda, priority, locale, submittedAt } =
    submission;

  const subject = `New ${oneLine(domain, 40)} inquiry — ${oneLine(fullName, 60)}`;

  const rows = fieldRows([
    ['Name', `<strong>${escapeHtml(fullName)}</strong>`],
    [
      'Email',
      `<a href="mailto:${escapeHtml(email)}" style="color:#1f4fd8;text-decoration:none;">${escapeHtml(email)}</a>`,
    ],
    ['Organization', escapeHtml(organization || '—')],
    ['Engagement domain', escapeHtml(domain)],
    [
      'Priority',
      `<span style="display:inline-block;padding:2px 9px;border-radius:999px;font-size:13px;background:${priority === 'Urgent' ? '#fdeaea' : '#eef1f6'};color:${priority === 'Urgent' ? '#b3261e' : '#3d4453'};">${escapeHtml(priority)}</span>`,
    ],
    ['Mutual NDA requested', nda ? 'Yes' : 'No'],
    ['Site locale', escapeHtml(locale)],
    ['Received', escapeHtml(submittedAt)],
  ]);

  const html = shell({
    heading: 'New project inquiry',
    intro: `Submitted through the website contact form. Reply directly to this message to answer ${escapeHtml(fullName)}.`,
    body: `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">${rows}</table>
        <div style="margin-top:22px;padding-top:18px;border-top:1px solid #e2e4e8;">
          <div style="font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:#5b6270;margin-bottom:8px;">Project brief</div>
          <div style="font-size:15px;line-height:1.65;white-space:pre-wrap;">${escapeHtml(message)}</div>
        </div>`,
  });

  const text = [
    'New project inquiry',
    '',
    `Name:               ${fullName}`,
    `Email:              ${email}`,
    `Organization:       ${organization || '—'}`,
    `Engagement domain:  ${domain}`,
    `Priority:           ${priority}`,
    `Mutual NDA:         ${nda ? 'Yes' : 'No'}`,
    `Site locale:        ${locale}`,
    `Received:           ${submittedAt}`,
    '',
    '--- Project brief ---',
    message,
  ].join('\n');

  return { subject, html, text };
}

/**
 * Confirmation sent to the person who submitted the form, so the lead knows the
 * message landed and has a copy of it.
 *
 * @param {{ fullName: string, domain: string, message: string, organization: string }} submission
 */
export function renderAutoReply(submission) {
  const { fullName, domain, message, organization } = submission;

  const html = shell({
    heading: 'We have received your inquiry',
    // The turnaround is a fixed phrase, not read from the submitted priority —
    // this sentence must not be rewritable by the sender.
    intro: `Thank you for reaching out${fullName ? `, ${escapeHtml(fullName)}` : ''}. Your brief has reached our engineering team and we will respond within one business day. A copy of what you sent is below.`,
    body: `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
          ${fieldRows([
            ['Engagement domain', escapeHtml(domain)],
            ['Organization', escapeHtml(organization || '—')],
          ])}
        </table>
        <div style="margin-top:22px;padding-top:18px;border-top:1px solid #e2e4e8;">
          <div style="font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:#5b6270;margin-bottom:8px;">Your brief</div>
          <div style="font-size:15px;line-height:1.65;white-space:pre-wrap;">${escapeHtml(message)}</div>
        </div>
        <p style="margin:22px 0 0;font-size:15px;line-height:1.6;">If anything is urgent, reply to this email or write to ${escapeHtml(CONTACT_EMAIL)} and we will prioritise it.</p>`,
  });

  const text = [
    `Thank you for reaching out${fullName ? `, ${fullName}` : ''}.`,
    '',
    'Your brief has reached our engineering team and we will respond within one business day.',
    'A copy of what you sent is below.',
    '',
    `Engagement domain:  ${domain}`,
    `Organization:       ${organization || '—'}`,
    '',
    '--- Your brief ---',
    message,
    '',
    `If anything is urgent, write to ${CONTACT_EMAIL}.`,
  ].join('\n');

  return { subject: 'We received your inquiry — Qubital', html, text };
}
