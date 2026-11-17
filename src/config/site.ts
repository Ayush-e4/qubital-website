// Company details shown across the site. Taken from the previous site; extend
// (phone, social profiles) only with details the client has confirmed.
export const site = {
  name: 'Qubital',
  legalName: 'Qubital GmbH',
  url: 'https://qubital.eu',
  email: 'hello@qubital.eu',
  linkedin: 'https://www.linkedin.com/company/qubital-gmbh/',
  location: 'Bavaria, Germany',
  // Postal address as published in the imprint.
  address: {
    streetAddress: 'Erlanger Straße 12',
    postalCode: '91074',
    addressLocality: 'Herzogenaurach',
    addressRegion: 'Bavaria',
    addressCountry: 'DE',
  },
  // Blog authors, for bylines and structured data. The bio text is in
  // messages (blog.authors.<id>.bio) so it is translated.
  authors: {
    arun: {
      name: 'Arun Kumar',
      initials: 'AK',
      jobTitle: 'IAM/IGA Enthusiast',
      linkedin: 'https://www.linkedin.com/in/arun1812/',
    },
    manoj: {
      name: 'Manoj Sahani',
      initials: 'MS',
      jobTitle: 'Technical Architect, Cloud & AI Solutions',
      linkedin: 'https://www.linkedin.com/in/sahanimanoj/',
    },
  },
  // Markets served, for structured data: the DACH region first, then the rest of
  // the EU/EEA, Switzerland and the UK (where the client logos already are).
  areaServed: [
    'Germany',
    'Austria',
    'Switzerland',
    'Luxembourg',
    'Belgium',
    'Netherlands',
    'France',
    'Denmark',
    'Sweden',
    'Norway',
    'Finland',
    'Poland',
    'Czechia',
    'Italy',
    'Spain',
    'Portugal',
    'Ireland',
    'United Kingdom',
  ],
  // Azure Application Insights (appi-websites, Germany West Central). Public by
  // design: it only allows sending telemetry, not reading it. If the ingestion
  // host changes, update connect-src in next.config.ts too.
  analyticsConnectionString:
    'InstrumentationKey=97360684-08c7-4071-960a-36d3d201d929;IngestionEndpoint=https://germanywestcentral-1.in.applicationinsights.azure.com/;LiveEndpoint=https://germanywestcentral.livediagnostics.monitor.azure.com/;ApplicationId=1f320c2d-ab45-4ce4-a6f8-be5766d8133f',
} as const;
