'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect } from 'react';

export function PostHogProvider({ children }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com';

    if (!key) {
      // Key not set — analytics silently disabled (safe in dev)
      return;
    }

    posthog.init(key, {
      api_host: host,

      // GDPR compliance settings (important for Germany)
      persistence: 'memory', // No persistent cookie by default
      respect_dnt: true, // Honour browser Do Not Track header
      capture_pageview: false, // We capture manually for SPA routing
      capture_pageleave: true,
      autocapture: false, // Only track what we explicitly call

      loaded: (ph) => {
        // In development: just log, don't actually send data
        if (process.env.NODE_ENV === 'development') {
          ph.opt_out_capturing();
          console.log('[PostHog] Dev mode — tracking disabled');
        }
      },
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
