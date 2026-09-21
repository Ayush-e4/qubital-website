/**
 * Sliding-window rate limiter for the contact endpoint.
 *
 * Host-neutral by construction: module scope, no platform APIs, no external
 * store, no cron. How strong it is depends only on how many instances run:
 *
 *   - One long-lived process — a container, a VM, App Service, plain
 *     `node server.js` — gives a complete per-IP limit.
 *   - N serverless instances give N independent budgets, so a caller who
 *     spreads requests around gets N× the allowance. Best-effort.
 *
 * Either way it stops what this form actually sees: a bot hammering one
 * endpoint, and a human double-clicking Submit. If real abuse ever appears in a
 * multi-instance deployment, the fix is a shared store (Redis) or the hosting
 * platform's edge/WAF rate limiting — more in-memory bookkeeping here cannot
 * make separate instances agree.
 *
 * Pure module — no React, no Next, no host SDK — so it is importable from a
 * route handler, a plain Node server and tests alike.
 */

const DEFAULT_LIMIT = 5;
const DEFAULT_WINDOW_MS = 10 * 60 * 1000;

/**
 * Ceiling on tracked keys. Without it, a flood of distinct source IPs grows the
 * Map without bound and eventually exhausts the instance's memory — turning a
 * spam problem into an outage.
 */
const MAX_TRACKED_KEYS = 5000;

/** @type {Map<string, number[]>} key -> ascending request timestamps */
const buckets = new Map();

function positiveInt(value, fallback) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function evictOldest() {
  if (buckets.size <= MAX_TRACKED_KEYS) return;
  let excess = buckets.size - MAX_TRACKED_KEYS;
  for (const key of buckets.keys()) {
    buckets.delete(key);
    if (--excess <= 0) return;
  }
}

/**
 * Record a request against `key` and report whether it is allowed.
 *
 * @param {string} key
 * @param {{ limit?: number, windowMs?: number, now?: number }} [options]
 * @returns {{ ok: boolean, retryAfterSeconds: number }}
 */
export function rateLimit(key, options = {}) {
  const limit = options.limit ?? positiveInt(process.env.CONTACT_RATE_LIMIT_MAX, DEFAULT_LIMIT);
  const windowMs =
    options.windowMs ?? positiveInt(process.env.CONTACT_RATE_LIMIT_WINDOW_MS, DEFAULT_WINDOW_MS);
  const now = options.now ?? Date.now();

  const cutoff = now - windowMs;
  const recent = (buckets.get(key) ?? []).filter((at) => at > cutoff);

  if (recent.length >= limit) {
    buckets.set(key, recent);
    const oldest = recent[0];
    return {
      ok: false,
      retryAfterSeconds: Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)),
    };
  }

  recent.push(now);
  buckets.set(key, recent);
  evictOldest();

  return { ok: true, retryAfterSeconds: 0 };
}

/**
 * The client address to rate-limit on, or null when none can be determined.
 *
 * `x-forwarded-for` is a comma-separated chain — the first entry is the
 * originating client; everything after it is an intermediary. Every common
 * proxy sets it (nginx, Cloudflare, Azure Front Door, an ALB, Vercel's edge),
 * and `x-real-ip` is the usual single-value alternative.
 *
 * Returning null rather than a placeholder is deliberate. If no address is
 * available at all — stripped headers, an unusual runtime — collapsing every
 * caller into one shared bucket would let the first few submissions lock *every*
 * visitor out of the contact form. Callers must treat null as "cannot limit
 * this request" and let it through.
 *
 * In practice an address is nearly always available: a proxy sets one, and even
 * a direct connection to Next's own Node server gets one derived from the
 * socket. Null is the fallback, not the norm.
 *
 * @param {Request} request
 * @returns {string | null}
 */
export function clientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0].trim();
    if (first) return first;
  }
  return request.headers.get('x-real-ip')?.trim() || null;
}
