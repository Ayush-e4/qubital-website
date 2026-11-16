import { notFound } from 'next/navigation';
import { LandingPage } from '@/components/landing/LandingPage';
import { getLanding } from '@/content/landing';
import { landingMetadata } from '@/lib/landing';
import { initPage } from '@/lib/page';

const href = '/services/non-human-identity-ai-agents';

export function generateMetadata({
  params,
}: PageProps<'/[locale]/services/non-human-identity-ai-agents'>) {
  return landingMetadata(params, href);
}

// German and English only; every other locale is a 404 (see src/content/landing).
export default async function Page({
  params,
}: PageProps<'/[locale]/services/non-human-identity-ai-agents'>) {
  const locale = await initPage(params);
  const page = getLanding(href, locale);
  if (!page) notFound();
  return <LandingPage page={page} />;
}
