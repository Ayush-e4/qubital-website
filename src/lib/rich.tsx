import type { ReactNode } from 'react';

// Shared rich-text tags for next-intl: <em>…</em> in messages renders as a
// serif-italic gradient accent.
export const rich = {
  em: (chunks: ReactNode) => <em className="accent text-gradient pr-[0.08em]">{chunks}</em>,
};
