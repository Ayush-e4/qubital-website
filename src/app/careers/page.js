import CareersContent from './CareersContent';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return pageMetadata({ page: 'careers', path: '/careers' });
}

export default function CareersPage() {
  return <CareersContent />;
}
