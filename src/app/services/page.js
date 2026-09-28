import ServicesContent from './ServicesContent';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return pageMetadata({ page: 'services', path: '/services' });
}

export default function ServicesPage() {
  return <ServicesContent />;
}
