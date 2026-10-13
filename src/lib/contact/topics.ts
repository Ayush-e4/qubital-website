/**
 * Contact form topics. The form sends the key; emails show the label, so staff
 * read "Customer Identity (CIAM)" rather than "ciam". Unknown values (an older
 * client, a test) are shown as sent.
 */
export const CONTACT_TOPICS = {
  pam: 'Privileged Access Management (PAM)',
  iga: 'Identity Governance & Administration (IGA)',
  ciam: 'Customer Identity (CIAM)',
  wiam: 'Workforce Identity (WIAM)',
  ai: 'Non-Human Identity (NHI) & AI Agent Identity Governance',
  other: 'Something else',
} as const;

export type ContactTopic = keyof typeof CONTACT_TOPICS;

export function topicLabel(value: string): string {
  return value in CONTACT_TOPICS ? CONTACT_TOPICS[value as ContactTopic] : value;
}
