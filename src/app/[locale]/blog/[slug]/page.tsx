import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { ArticleBody } from '@/components/blog/ArticleBody';
import { JsonLd } from '@/components/blog/JsonLd';
import { formatDate, PostCard } from '@/components/blog/PostCard';
import { CTASection } from '@/components/sections/CTASection';
import { BinaryRain } from '@/components/ui/BinaryRain';
import { Container } from '@/components/ui/Container';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { site } from '@/config/site';
import { getPost, getPosts, type Post } from '@/content/blog';
import { getPathname, Link } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { initPage, ogImage } from '@/lib/page';

// Only the slugs listed here exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!hasLocale(routing.locales, params.locale)) return [];
  return getPosts(params.locale).map((p) => ({ slug: p.slug }));
}

const postPath = (locale: Locale, post: Pick<Post, 'slugs'>) =>
  getPathname({
    locale,
    href: { pathname: '/blog/[slug]', params: { slug: post.slugs[locale] } },
  });

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/blog/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const post = getPost(locale, slug);
  if (!post) return {};
  const url = postPath(locale, post);

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: site.legalName, url: site.url }],
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, postPath(l, post)])),
        'x-default': postPath(routing.defaultLocale, post),
      },
    },
    openGraph: {
      type: 'article',
      title: `${post.title} · ${site.name}`,
      description: post.description,
      url,
      locale: locale === 'de' ? 'de_DE' : 'en_GB',
      publishedTime: post.published,
      modifiedTime: post.updated,
      section: post.category,
      tags: post.keywords,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} · ${site.name}`,
      description: post.description,
      images: [ogImage.url],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<'/[locale]/blog/[slug]'>) {
  const locale = await initPage(params);
  const { slug } = await params;
  const post = getPost(locale, slug);
  if (!post) notFound();

  const t = await getTranslations('blog');
  const tNav = await getTranslations('nav');
  const more = getPosts(locale)
    .filter((p) => p.id !== post.id)
    .slice(0, 2);

  const url = site.url + postPath(locale, post);
  const blogUrl = site.url + getPathname({ locale, href: '/blog' });
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        mainEntityOfPage: url,
        url,
        headline: post.title,
        description: post.description,
        articleSection: post.category,
        keywords: post.keywords.join(', '),
        inLanguage: locale,
        datePublished: post.published,
        dateModified: post.updated,
        wordCount: post.wordCount,
        image: site.url + ogImage.url,
        author: { '@id': `${site.url}/#organization` },
        publisher: { '@id': `${site.url}/#organization` },
        isPartOf: { '@id': `${blogUrl}#blog` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: site.name,
            item: site.url + getPathname({ locale, href: '/' }),
          },
          { '@type': 'ListItem', position: 2, name: tNav('blog'), item: blogUrl },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <article>
        <header className="relative overflow-hidden pb-14 pt-40 sm:pb-20 sm:pt-48">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid" />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(139_123_255/0.28),transparent)] blur-2xl"
          />
          <BinaryRain className="absolute inset-y-0 right-0 hidden w-1/3 md:block" />
          <Container className="relative">
            <div className="max-w-4xl">
              <Reveal>
                <nav aria-label={t('breadcrumb')} className="text-sm text-muted">
                  <Link
                    href="/blog"
                    className="group/back inline-flex items-center gap-2 transition-colors hover:text-fg"
                  >
                    <ArrowLeft className="size-4 transition-transform duration-300 group-hover/back:-translate-x-1" />
                    <span>{t('back')}</span>
                  </Link>
                </nav>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-gradient">
                  {post.category}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="mt-5 text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
                  {post.title}
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted text-pretty sm:text-xl">
                  {post.excerpt}
                </p>
                <p className="mt-8 text-sm text-faint">
                  <span>{site.name}</span>
                  {' · '}
                  <time dateTime={post.published}>{formatDate(post.published, locale)}</time>
                  {' · '}
                  <span>{t('minRead', { minutes: post.readingMinutes })}</span>
                </p>
              </Reveal>
            </div>
          </Container>
        </header>

        <Container className="pb-16 sm:pb-24">
          <div className="max-w-3xl">
            <ArticleBody blocks={post.body} />
          </div>
        </Container>
      </article>

      {more.length > 0 && (
        <section className="border-t border-line py-20 sm:py-28">
          <Container>
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">{t('more')}</h2>
            <Stagger className="mt-10 grid gap-4 md:grid-cols-2" stagger={0.06}>
              {more.map((p) => (
                <StaggerItem key={p.id}>
                  <PostCard post={p} locale={locale} />
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </section>
      )}

      <CTASection />
    </>
  );
}
