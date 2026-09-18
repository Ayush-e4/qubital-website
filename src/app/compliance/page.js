import ComplianceContent from './ComplianceContent';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return pageMetadata({
    title: 'Information Security Governance | Qubital',
    description: 'Qubital\'s information security governance framework: the policies, controls, and compliance practices applied to enterprise engagements.',
    path: '/compliance',
  });
}

export default function CompliancePage() {
  return <ComplianceContent />;
}
