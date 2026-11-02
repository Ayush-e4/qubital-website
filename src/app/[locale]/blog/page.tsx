import { getTranslations } from 'next-intl/server';
import { PostCard } from '@/components/blog/PostCard';
import { CTASection } from '@/components/sections/CTASection';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui/Container';
import { Stagger, StaggerItem } from '@/components/ui/Reveal';
import { site } from '@/config/site';
import { getPosts } from '@/content/blog';
import { getPathname } from '@/i18n/navigation';
import { initPage, pageMetadata } from '@/lib/page';
import { rich } from '@/lib/rich';
import { JsonLd } from '@/components/blog/JsonLd';

export function generateMetadata({ params }: PageProps<'/[locale]/blog'>) {
  return pageMetadata(params, 'blog', '/blog');
}

export default async function BlogPage({ params }: PageProps<'/[locale]/blog'>) {
  const locale = await initPage(params);
  const t = await getTranslations('blog');
  const tMeta = await getTranslations('meta.pages');
  const posts = getPosts(locale);
  const blogUrl = site.url + getPathname({ locale, href: '/blog' });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${blogUrl}#blog`,
    url: blogUrl,
    name: tMeta('blog.title'),
    description: tMeta('blog.description'),
    inLanguage: locale,
    publisher: { '@id': `${site.url}/#organization` },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url:
        site.url +
        getPathname({ locale, href: { pathname: '/blog/[slug]', params: { slug: p.slug } } }),
      datePublished: p.published,
      dateModified: p.updated,
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero title={t.rich('hero.title', rich)} description={t('hero.description')} />

      <section className="pb-8 sm:pb-16">
        <Container>
          <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {posts.map((post) => (
              <StaggerItem key={post.id}>
                <PostCard post={post} locale={locale} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
