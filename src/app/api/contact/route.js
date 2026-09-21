/**
 * POST /api/contact — the contact form's backend.
 *
 * Runs on the Node runtime because the Resend SDK expects it.
 *
 * Order matters and is deliberate:
 *   1. rate limit      — cheapest defence, and it protects everything below it
 *   2. parse + validate — the same rules the browser ran, re-run here because the
 *                         browser checks are UX, not security (see
 *                         src/lib/validation/contact.js)
 *   3. honeypot         — silently accept and discard, so a bot learns nothing
 *   4. config check     — a missing key must be a loud failure, not a silent drop
 *   5. send             — notification first (that is the lead), auto-reply second
 *
 * Nothing submitted is ever echoed back in a response body.
 */
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { renderAutoReply, renderNotification } from '@/lib/email/contact';
import { clientIp, rateLimit } from '@/lib/rate-limit';
import { LOCALES, DEFAULT_LOCALE } from '@/lib/i18n/paths';
import { validateContactSubmission } from '@/lib/validation/contact';

export const runtime = 'nodejs';

const MAX_BODY_BYTES = 20_000;

const DEFAULT_TO = 'contact@qubital.eu';
const DEFAULT_CC = 'arun1812@gmail.com';
/**
 * Until qubital.eu is verified in Resend, sending must come from the sandbox
 * address — Resend rejects any other `from` for an unverified domain.
 */
const DEFAULT_FROM = 'Qubital Website <onboarding@resend.dev>';

/** Split a comma-separated env value into a clean recipient list. */
function recipients(value, fallback) {
  const list = String(value ?? '')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
  return list.length > 0 ? list : [fallback];
}

/**
 * Validate and normalise the payload.
 *
 * The rules live in src/lib/validation/contact.js and are shared with the form,
 * so the browser and the server cannot disagree about what is acceptable.
 *
 * Returns `null` when anything is wrong — callers must not learn *which* field
 * failed, and a partial object cannot leak submitted values.
 *
 * @param {any} payload
 */
function parseSubmission(payload) {
  const { valid, values } = validateContactSubmission(payload);
  if (!valid) return null;

  return {
    ...values,
    // Not a validation rule — the locale only picks which strings the mail is
    // drawn from, and an unknown value simply falls back to English.
    locale: LOCALES.includes(payload?.locale) ? payload.locale : DEFAULT_LOCALE,
  };
}

export async function POST(request) {
  // 1. Rate limit -------------------------------------------------------------
  // Skipped only when no client address can be determined at all. Collapsing
  // those requests into a single shared bucket would let the first few
  // submissions block everyone, which is worse than not limiting them.
  const ip = clientIp(request);
  if (ip) {
    const { ok, retryAfterSeconds } = rateLimit(ip);
    if (!ok) {
      return NextResponse.json(
        { error: 'rate_limited' },
        { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } }
      );
    }
  } else {
    console.warn(
      '[contact] no client IP header (x-forwarded-for / x-real-ip) — rate limiting skipped'
    );
  }

  // 2. Parse + validate ------------------------------------------------------
  const declaredLength = Number(request.headers.get('content-length') ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'invalid_input' }, { status: 413 });
  }

  let payload;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'invalid_input' }, { status: 413 });
    }
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
  }

  if (typeof payload?.website === 'string' && payload.website.trim() !== '') {
    // 3. Honeypot ------------------------------------------------------------
    // A hidden field no human can reach. Answer exactly as a success so the bot
    // does not retry with the field blanked, and send nothing.
    return NextResponse.json({ ok: true });
  }

  const submission = parseSubmission(payload);
  if (!submission) {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
  }

  // 4. Config ----------------------------------------------------------------
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not set — submission could not be delivered');
    return NextResponse.json({ error: 'not_configured' }, { status: 500 });
  }

  const from = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM;
  const to = recipients(process.env.CONTACT_TO_EMAIL, DEFAULT_TO);
  const cc = recipients(process.env.CONTACT_CC_EMAIL, DEFAULT_CC);

  const submittedAt = new Date().toISOString();
  const resend = new Resend(apiKey);

  try {
    // 5a. Notification — this is the lead, so a failure here is a failed request.
    const notification = renderNotification({ ...submission, submittedAt });
    const { error } = await resend.emails.send({
      from,
      to,
      cc,
      // Reply reaches the sender, not our own noreply address.
      replyTo: submission.email,
      subject: notification.subject,
      html: notification.html,
      text: notification.text,
    });

    if (error) {
      console.error('[contact] notification rejected by Resend:', error);
      return NextResponse.json({ error: 'send_failed' }, { status: 502 });
    }

    // 5b. Auto-reply — best effort. The lead is already captured, so losing the
    // confirmation is cosmetic and must never turn a good submission into an
    // error the visitor sees.
    const autoReply = renderAutoReply(submission);
    const echo = await resend.emails.send({
      from,
      to: [submission.email],
      replyTo: process.env.CONTACT_TO_EMAIL || DEFAULT_TO,
      subject: autoReply.subject,
      html: autoReply.html,
      text: autoReply.text,
    });
    if (echo.error) {
      console.error('[contact] auto-reply rejected by Resend:', echo.error);
    }
  } catch (cause) {
    console.error('[contact] send failed:', cause);
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
