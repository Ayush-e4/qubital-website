'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect, type ReactNode } from 'react';

/**
 * Cookieless PostHog analytics (EU host), disabled when no key is configured.
 * The privacy policy describes exactly this setup, so change both together.
 */
export function PostHogProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com';

    if (!key) {
      // Key not set: analytics silently disabled (safe in dev and previews)
      return;
    }

    posthog.init(key, {
      api_host: host,

      // GDPR settings (important for Germany)
      persistence: 'memory', // No cookie or local storage identifier
      respect_dnt: true, // Honour the browser's Do Not Track signal
      // PostHog's App Router setting: a pageview on first load and on every
      // client-side navigation.
      capture_pageview: 'history_change',
      capture_pageleave: true,
      autocapture: false, // Only track what we explicitly call

      loaded: (ph) => {
        if (process.env.NODE_ENV === 'development') {
          ph.opt_out_capturing();
        }
      },
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
