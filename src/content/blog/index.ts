import type { Locale } from '@/i18n/routing';
import { postMeta, type PostMeta } from './meta';
import { iamQueryPerformance } from './posts/iam-query-performance';
import { igaForSap } from './posts/iga-for-sap';
import { nonHumanIdentityAiAgents } from './posts/non-human-identity-ai-agents';
import type { Block, PostContent } from './types';

// Adding a post: write src/content/blog/posts/<id>.ts with both languages, add
// its id, dates and slugs to meta.ts, and register it here. The sitemap, the
// blog index, hreflang and the language switcher pick it up from there.
const content: Record<string, Record<Locale, PostContent>> = {
  'iam-query-performance': iamQueryPerformance,
  'non-human-identity-ai-agents': nonHumanIdentityAiAgents,
  'iga-for-sap': igaForSap,
};

export type Post = PostMeta &
  PostContent & { slug: string; wordCount: number; readingMinutes: number };

const WORDS_PER_MINUTE = 200;

function wordCount(blocks: Block[]) {
  const text = blocks
    .map((b) => ('items' in b ? b.items.join(' ') : b.text))
    .join(' ')
    .trim();
  return text ? text.split(/\s+/).length : 0;
}

function build(meta: PostMeta, locale: Locale): Post {
  const c = content[meta.id][locale];
  const words = wordCount(c.body);
  return {
    ...meta,
    ...c,
    slug: meta.slugs[locale],
    wordCount: words,
    readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
  };
}

/** All posts in one language, newest first. */
export function getPosts(locale: Locale): Post[] {
  return postMeta.map((m) => build(m, locale));
}

/** A post by its slug in the given language. */
export function getPost(locale: Locale, slug: string): Post | undefined {
  const meta = postMeta.find((m) => m.slugs[locale] === slug);
  return meta && build(meta, locale);
}
