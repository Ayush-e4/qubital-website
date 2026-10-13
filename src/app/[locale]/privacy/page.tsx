import { LegalPage } from '@/components/sections/LegalPage';
import { initPage, pageMetadata } from '@/lib/page';

export function generateMetadata({ params }: PageProps<'/[locale]/privacy'>) {
  return pageMetadata(params, 'privacy', '/privacy');
}

export default async function PrivacyPage({ params }: PageProps<'/[locale]/privacy'>) {
  const locale = await initPage(params);
  return <LegalPage page="privacy" locale={locale} />;
}
