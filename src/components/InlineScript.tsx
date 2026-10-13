'use client';

// Inline script that runs during HTML parsing on full page loads.
// Must be a Client Component: the server renders type="text/javascript" so the
// browser executes it, while React on the client sees type="text/plain" and
// doesn't warn about rendering a <script>. suppressHydrationWarning accepts the
// type mismatch.
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
