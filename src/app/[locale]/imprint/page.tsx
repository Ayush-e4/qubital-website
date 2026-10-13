import { LegalPage } from '@/components/sections/LegalPage';
import { initPage, pageMetadata } from '@/lib/page';

export function generateMetadata({ params }: PageProps<'/[locale]/imprint'>) {
  return pageMetadata(params, 'imprint', '/imprint');
}

export default async function ImprintPage({ params }: PageProps<'/[locale]/imprint'>) {
  const locale = await initPage(params);
  return <LegalPage page="imprint" locale={locale} />;
}
