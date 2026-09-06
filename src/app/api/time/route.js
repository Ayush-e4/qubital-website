// Edge Function — runs at CDN edge for minimal latency
export const runtime = 'edge';

export function GET() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Berlin',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const time = formatter.format(now) + ' CET';

  return new Response(JSON.stringify({ time }), {
    headers: {
      'Content-Type': 'application/json',
      // Never cache — time must always be current
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}
