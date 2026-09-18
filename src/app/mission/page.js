import MissionContent from './MissionContent';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return pageMetadata({
    title: 'Our Mission & Vision | Qubital',
    description:
      "Engineering clarity in an era of architectural entropy. Discover Qubital's mission to eliminate technical complexity and vendor lock-in through European engineering precision.",
    path: '/mission',
  });
}

export default function MissionPage() {
  return <MissionContent />;
}
