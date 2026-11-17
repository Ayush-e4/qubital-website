import { notFound } from 'next/navigation';
import { LandingPage } from '@/components/landing/LandingPage';
import { getLanding } from '@/content/landing';
import { landingMetadata } from '@/lib/landing';
import { initPage } from '@/lib/page';

const href = '/product';

export function generateMetadata({ params }: PageProps<'/[locale]/product'>) {
  return landingMetadata(params, href);
}

export default async function Page({ params }: PageProps<'/[locale]/product'>) {
  const locale = await initPage(params);
  const page = getLanding(href, locale);
  if (!page) notFound();
  return <LandingPage page={page} />;
}
