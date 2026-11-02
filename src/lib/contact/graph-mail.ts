/**
 * Sends mail through Microsoft Graph from a Microsoft 365 mailbox (qubital.eu
 * mail is Exchange Online). Plain `fetch`, no SDK: an app-only token from the
 * client-credentials flow, then `POST /users/{sender}/sendMail`.
 *
 * The Entra app needs the *application* permission Mail.Send. On its own that
 * lets the app send as any mailbox in the tenant, so it must be limited to the
 * sending mailbox with RBAC for Applications in Exchange Online (see README).
 */

export type GraphConfig = { tenantId: string; clientId: string; clientSecret: string };

export type GraphMessage = {
  to: string[];
  cc?: string[];
  replyTo?: string;
  subject: string;
  html: string;
  /** Keep a copy in the sender's Sent Items. */
  save?: boolean;
};

/** A non-2xx answer from Entra or Graph. Carries no secrets, only status and code. */
export class GraphMailError extends Error {
  constructor(
    readonly step: 'token' | 'send',
    readonly status: number,
    readonly code: string
  ) {
    super(`Graph ${step} failed: ${status} ${code}`);
  }
}

/** `null` when any of the three values is missing: the caller reports "not configured". */
export function graphConfig(): GraphConfig | null {
  const tenantId = process.env.GRAPH_TENANT_ID;
  const clientId = process.env.GRAPH_CLIENT_ID;
  const clientSecret = process.env.GRAPH_CLIENT_SECRET;
  if (!tenantId || !clientId || !clientSecret) return null;
  return { tenantId, clientId, clientSecret };
}

// Tokens live about an hour. One per process is enough; refresh a minute early.
let cached: { key: string; token: string; expiresAt: number } | null = null;

async function accessToken({ tenantId, clientId, clientSecret }: GraphConfig) {
  const key = `${tenantId}:${clientId}`;
  if (cached && cached.key === key && cached.expiresAt > Date.now()) return cached.token;

  const res = await fetch(
    `https://login.microsoftonline.com/${encodeURIComponent(tenantId)}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        scope: 'https://graph.microsoft.com/.default',
      }),
    }
  );
  const body = (await res.json().catch(() => ({}))) as {
    access_token?: string;
    expires_in?: number;
    error?: string;
  };
  if (!res.ok || !body.access_token) {
    throw new GraphMailError('token', res.status, body.error ?? 'no_token');
  }

  cached = {
    key,
    token: body.access_token,
    expiresAt: Date.now() + ((body.expires_in ?? 3600) - 60) * 1000,
  };
  return cached.token;
}

const address = (email: string) => ({ emailAddress: { address: email } });

export async function sendMail(config: GraphConfig, sender: string, message: GraphMessage) {
  const token = await accessToken(config);

  const res = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: {
          subject: message.subject,
          body: { contentType: 'HTML', content: message.html },
          toRecipients: message.to.map(address),
          ccRecipients: (message.cc ?? []).map(address),
          replyTo: message.replyTo ? [address(message.replyTo)] : [],
        },
        saveToSentItems: message.save ?? false,
      }),
    }
  );

  // Graph answers 202 Accepted with an empty body on success.
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: { code?: string } };
    if (res.status === 401 || res.status === 403) cached = null;
    throw new GraphMailError('send', res.status, body.error?.code ?? 'unknown');
  }
}
