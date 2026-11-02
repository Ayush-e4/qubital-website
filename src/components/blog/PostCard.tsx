import { ArrowUpRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { Post } from '@/content/blog';
import { Link } from '@/i18n/navigation';
import { SpotlightCard } from '../ui/SpotlightCard';

export function formatDate(iso: string, locale: string) {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(
    new Date(iso)
  );
}

/** Teaser card on the blog index and under "More articles". */
export async function PostCard({ post, locale }: { post: Post; locale: string }) {
  const t = await getTranslations('blog');

  return (
    <SpotlightCard className="h-full">
      <Link
        href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }}
        className="group/link flex h-full flex-col p-7 sm:p-8"
      >
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-gradient">
          {post.category}
        </span>
        <h2 className="mt-6 text-2xl font-medium leading-snug tracking-tight text-balance">
          {post.title}
        </h2>
        <p className="mt-4 flex-1 leading-relaxed text-muted">{post.excerpt}</p>
        <div className="mt-8 flex items-center justify-between gap-4 text-sm text-faint">
          <span>
            <time dateTime={post.published}>{formatDate(post.published, locale)}</time>
            {' · '}
            {t('minRead', { minutes: post.readingMinutes })}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-fg">
            <span>{t('readMore')}</span>
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/link:rotate-45" />
          </span>
        </div>
      </Link>
    </SpotlightCard>
  );
}
