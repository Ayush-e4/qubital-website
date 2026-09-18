import ImpressumContent from './ImpressumContent';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return pageMetadata({
    title: 'Impressum | Qubital',
    description: 'Legal disclosure (Impressum) for Qubital Systems GmbH pursuant to § 5 TMG: company details, registered office in Herzogenaurach, Germany, and contact information.',
    path: '/impressum',
  });
}

export default function ImpressumPage() {
  return <ImpressumContent />;
}
