import PrivacyContent from './PrivacyContent';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return pageMetadata({ page: 'privacy', path: '/privacy-and-gdpr' });
}

export default function PrivacyPage() {
  return <PrivacyContent />;
}
