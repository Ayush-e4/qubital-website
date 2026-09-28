import HomeParallaxContent from '@/components/HomeParallaxContent';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return pageMetadata({
    title: 'Qubital | The IT Partner for Growing Companies',
    description:
      'IT advisory and systems architecture for growing companies. Software, cloud, security and SAP, delivered by senior engineers. Based in Herzogenaurach, Germany.',
    path: '/',
  });
}

export default function HomePage() {
  return <HomeParallaxContent />;
}
