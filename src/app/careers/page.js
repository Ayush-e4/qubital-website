import CareersContent from './CareersContent';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return pageMetadata({
    title: 'Careers | Qubital',
    description:
      'Build intelligent systems with Qubital. Learn about our engineering principles, culture, and reach out for spontaneous applications.',
    path: '/careers',
  });
}

export default function CareersPage() {
  return <CareersContent />;
}
