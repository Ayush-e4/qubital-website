'use client';

import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { useEffect } from 'react';
import { site } from '@/config/site';

let started = false;

/**
 * Cookieless web analytics with Azure Application Insights (EU region).
 *
 * Nothing is stored on the visitor's device: no cookies, no local or session
 * storage. Page views are sent on first load and on every client-side route
 * change. Browsers that send Do Not Track are not recorded, and nothing is
 * sent in development. The privacy policy describes exactly this setup, so
 * change both together.
 */
export function Analytics() {
  useEffect(() => {
    if (started || process.env.NODE_ENV !== 'production') return;
    if (!site.analyticsConnectionString) return;
    if (navigator.doNotTrack === '1') return;
    started = true;

    const appInsights = new ApplicationInsights({
      config: {
        connectionString: site.analyticsConnectionString,
        disableCookiesUsage: true,
        isStorageUseDisabled: true,
        enableSessionStorageBuffer: false,
        enableAutoRouteTracking: true,
        disableAjaxTracking: true,
        disableFetchTracking: true,
        disableExceptionTracking: true,
        // No remote SDK config from js.monitor.azure.com (blocked by our CSP anyway)
        extensionConfig: { AppInsightsCfgSyncPlugin: { syncMode: 0, blkCdnCfg: true } },
      },
    });
    appInsights.loadAppInsights();
    appInsights.addTelemetryInitializer((item) => {
      item.tags = item.tags ?? {};
      item.tags['ai.cloud.role'] = 'qubital.eu';
    });
    appInsights.trackPageView();
  }, []);

  return null;
}
