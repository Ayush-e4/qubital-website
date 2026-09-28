import MissionContent from './MissionContent';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return pageMetadata({ page: 'mission', path: '/mission' });
}

export default function MissionPage() {
  return <MissionContent />;
}
