import WhyUsContent from './WhyUsContent';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return pageMetadata({
    title: 'Why Qubital | Senior-Led IT Advisory & Systems Architecture',
    description: 'Discover why mid-market champions and enterprise leaders choose Qubital over traditional Big-4 consultancies and web agencies. Precision engineering with zero agency overhead.',
    path: '/why-us',
  });
}

export default function WhyUsPage() {
  return <WhyUsContent />;
}
