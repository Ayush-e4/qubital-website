import ImpressumContent from './ImpressumContent';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return pageMetadata({ page: 'impressum', path: '/impressum' });
}

export default function ImpressumPage() {
  return <ImpressumContent />;
}
