import AboutContent from './AboutContent';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return pageMetadata({
    title: 'About | Qubital - Strategic IT Advisory',
    description: 'Learn about Qubital\'s mission, company story, and our operational codex for scalable digital systems.',
    path: '/about',
  });
}

export default function AboutPage() {
  return <AboutContent />;
}
