import ContactContent from './ContactContent';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return pageMetadata({ page: 'contact', path: '/contact' });
}

export default function ContactPage() {
  return <ContactContent />;
}
