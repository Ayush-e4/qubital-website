import ComplianceContent from './ComplianceContent';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return pageMetadata({ page: 'compliance', path: '/compliance' });
}

export default function CompliancePage() {
  return <ComplianceContent />;
}
