/**
 * POST /api/contact — the contact form's backend.
 *
 * Runs on the Node runtime. Mail goes out through Microsoft Graph from the
 * Microsoft 365 mailbox (src/lib/contact/graph-mail.ts).
 *
 * Order matters and is deliberate:
 *   1. rate limit       — cheapest defence, and it protects everything below it
 *   2. parse + validate — the same rules the browser ran, re-run here because the
 *                         browser checks are UX, not security
 *                         (src/lib/contact/validation.ts)
 *   3. honeypot         — silently accept and discard, so a bot learns nothing
 *   4. config check     — a missing key must be a loud failure, not a silent drop
 *   5. send             — notification first (that is the lead), auto-reply second,
 *                         then an optional WhatsApp ping (src/lib/contact/whatsapp.ts)
 *
 * Nothing submitted is ever echoed back in a response body.
 */
import { NextResponse } from 'next/server';
import { site } from '@/config/site';
import { routing } from '@/i18n/routing';
import { renderAutoReply, renderNotification, type ContactSubmission } from '@/lib/contact/email';
import { graphConfig, sendMail } from '@/lib/contact/graph-mail';
import { clientIp, rateLimit } from '@/lib/contact/rate-limit';
import { validateContactSubmission } from '@/lib/contact/validation';
import { sendWhatsAppNotification, whatsappConfig } from '@/lib/contact/whatsapp';

export const runtime = 'nodejs';

const MAX_BODY_BYTES = 20_000;

const DEFAULT_TO = site.email;
const DEFAULT_CC = 'arun1812@hotmail.com';
/** The mailbox Graph sends as. The Entra app must be allowed to send from it. */
const DEFAULT_FROM = site.email;

/** Split a comma-separated env value into a clean recipient list. */
function recipients(value: string | undefined, fallback: string) {
  const list = String(value ?? '')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
  return list.length > 0 ? list : [fallback];
}

/**
 * Validate and normalise the payload. Returns `null` when anything is wrong:
 * callers must not learn *which* field failed, and a partial object cannot leak
 * submitted values.
 */
function parseSubmission(payload: unknown): ContactSubmission | null {
  const { valid, values } = validateContactSubmission(payload);
  if (!valid) return null;

  const requested = (payload as { locale?: unknown } | null)?.locale;
  return {
    fullName: values.fullName,
    email: values.email,
    organization: values.organization,
    domain: values.domain,
    message: values.message,
    // Not a validation rule: the locale is only informational in the mail, and
    // an unknown value falls back to the default.
    locale: routing.locales.includes(requested as never)
      ? (requested as string)
      : routing.defaultLocale,
  };
}

export async function POST(request: Request) {
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

  let payload: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'invalid_input' }, { status: 413 });
    }
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
  }

  const honeypot = (payload as { website?: unknown } | null)?.website;
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
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
  const graph = graphConfig();
  if (!graph) {
    console.error(
      '[contact] GRAPH_TENANT_ID / GRAPH_CLIENT_ID / GRAPH_CLIENT_SECRET not set — submission could not be delivered'
    );
    return NextResponse.json({ error: 'not_configured' }, { status: 500 });
  }

  const from = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM;
  const to = recipients(process.env.CONTACT_TO_EMAIL, DEFAULT_TO);
  const cc = recipients(process.env.CONTACT_CC_EMAIL, DEFAULT_CC);

  const submittedAt = new Date().toISOString();

  // 5a. Notification — this is the lead, so a failure here is a failed request.
  try {
    const notification = renderNotification({ ...submission, submittedAt });
    await sendMail(graph, from, {
      to,
      cc,
      // Reply reaches the sender, not our own mailbox.
      replyTo: submission.email,
      subject: notification.subject,
      html: notification.html,
    });
  } catch (cause) {
    console.error('[contact] notification failed:', cause);
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }

  // 5b. Auto-reply — best effort. The lead is already captured, so losing the
  // confirmation is cosmetic and must never turn a good submission into an
  // error the visitor sees. Kept in Sent Items, so staff can see what went out.
  try {
    const autoReply = renderAutoReply(submission);
    await sendMail(graph, from, {
      to: [submission.email],
      replyTo: process.env.CONTACT_TO_EMAIL || DEFAULT_TO,
      subject: autoReply.subject,
      html: autoReply.html,
      save: true,
    });
  } catch (cause) {
    console.error('[contact] auto-reply failed:', cause);
  }

  // 5c. WhatsApp ping — optional and best effort, like the auto-reply.
  const whatsapp = whatsappConfig();
  if (whatsapp) {
    try {
      await sendWhatsAppNotification(whatsapp, submission);
    } catch (cause) {
      console.error('[contact] WhatsApp notification failed:', cause);
    }
  }

  return NextResponse.json({ ok: true });
}
