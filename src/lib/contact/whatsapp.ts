/**
 * WhatsApp ping for a new contact form lead, sent through CallMeBot
 * (https://www.callmebot.com/blog/free-api-whatsapp-messages/).
 *
 * Optional: does nothing unless both WHATSAPP_PHONE and CALLMEBOT_API_KEY are
 * set. Best effort: the lead is already in the mailbox, so a failure here is
 * logged and never surfaces to the visitor.
 */
import { topicLabel } from '@/lib/contact/topics';

type Lead = {
  fullName: string;
  email: string;
  organization?: string;
  domain: string;
  message: string;
};

const TIMEOUT_MS = 5_000;

function clamp(value: unknown, max: number): string {
  const flat = String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim();
  return flat.length > max ? `${flat.slice(0, max - 1)}…` : flat;
}

/** `null` when not configured: the caller skips the ping. */
export function whatsappConfig(): { phone: string; apiKey: string } | null {
  const phone = String(process.env.WHATSAPP_PHONE ?? '').replace(/[^\d]/g, '');
  const apiKey = String(process.env.CALLMEBOT_API_KEY ?? '').trim();
  if (!phone || !apiKey) return null;
  return { phone, apiKey };
}

export async function sendWhatsAppNotification(
  config: { phone: string; apiKey: string },
  lead: Lead
): Promise<void> {
  const lines = [
    'New Qubital website inquiry',
    `Name: ${clamp(lead.fullName, 80)}`,
    `Email: ${clamp(lead.email, 120)}`,
    lead.organization ? `Company: ${clamp(lead.organization, 80)}` : '',
    `Topic: ${clamp(topicLabel(lead.domain), 80)}`,
    `Message: ${clamp(lead.message, 300)}`,
  ].filter(Boolean);

  const url = new URL('https://api.callmebot.com/whatsapp.php');
  url.searchParams.set('phone', config.phone);
  url.searchParams.set('text', lines.join('\n'));
  url.searchParams.set('apikey', config.apiKey);

  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!res.ok) throw new Error(`CallMeBot responded ${res.status}`);
}
