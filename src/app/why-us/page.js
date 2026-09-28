import WhyUsContent from './WhyUsContent';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return pageMetadata({ page: 'why_us', path: '/why-us' });
}

export default function WhyUsPage() {
  return <WhyUsContent />;
}
