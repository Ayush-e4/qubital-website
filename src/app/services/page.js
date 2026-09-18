import ServicesContent from './ServicesContent';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return pageMetadata({
    title: 'Services & Capabilities | Qubital',
    description:
      'Core capabilities and practice areas provided by Qubital: Software development, managed IT, cloud services, cybersecurity, specialized tech, and enterprise SAP solutions.',
    path: '/services',
  });
}

export default function ServicesPage() {
  return <ServicesContent />;
}
