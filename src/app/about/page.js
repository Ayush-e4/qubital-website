import AboutContent from './AboutContent';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return pageMetadata({ page: 'about', path: '/about' });
}

export default function AboutPage() {
  return <AboutContent />;
}
