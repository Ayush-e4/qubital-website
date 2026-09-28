import HomeParallaxContent from '@/components/HomeParallaxContent';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return pageMetadata({ page: 'home', path: '/' });
}

export default function HomePage() {
  return <HomeParallaxContent />;
}
