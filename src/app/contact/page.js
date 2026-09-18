import ContactContent from './ContactContent';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return pageMetadata({
    title: 'Contact | Qubital',
    description:
      'Start a conversation with Qubital for your digital transformation needs. Reach out to our principal engineering team to discuss your architectural requirements.',
    path: '/contact',
  });
}

export default function ContactPage() {
  return <ContactContent />;
}
