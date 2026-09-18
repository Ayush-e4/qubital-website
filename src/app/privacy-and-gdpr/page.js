import PrivacyContent from './PrivacyContent';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return pageMetadata({
    title: 'Privacy & GDPR',
    description: 'How Qubital Systems GmbH collects, processes, and protects personal data in accordance with the EU General Data Protection Regulation (GDPR).',
    path: '/privacy-and-gdpr',
  });
}

export default function PrivacyPage() {
  return <PrivacyContent />;
}
