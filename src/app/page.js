import HomeParallaxContent from '@/components/HomeParallaxContent';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return pageMetadata({
    title: 'Qubital | Enterprise-Grade IT Advisory & Digital Architecture',
    description:
      'Engineering clarity for mid-market enterprises and global leaders. Headquartered in Herzogenaurach, Germany.',
    path: '/',
  });
}

export default function HomePage() {
  return <HomeParallaxContent />;
}
