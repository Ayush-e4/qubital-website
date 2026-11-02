import type { Locale } from '@/i18n/routing';
import { postMeta, type PostMeta } from './meta';
import { iamQueryPerformance } from './posts/iam-query-performance';
import { igaForSap } from './posts/iga-for-sap';
import { nonHumanIdentityAiAgents } from './posts/non-human-identity-ai-agents';
import da from './translations/da.json';
import es from './translations/es.json';
import fr from './translations/fr.json';
import it from './translations/it.json';
import nl from './translations/nl.json';
import pl from './translations/pl.json';
import pt from './translations/pt.json';
import sv from './translations/sv.json';
import type { Block, PostContent } from './types';

// Adding a post: write src/content/blog/posts/<id>.ts in English and German, add
// the other languages to translations/<locale>.json under the same id, add its
// id, dates and slugs (one per language) to meta.ts, and register it here. The
// sitemap, blog index, hreflang and language switcher pick it up from there.
const source: Record<string, Record<'en' | 'de', PostContent>> = {
  'iam-query-performance': iamQueryPerformance,
  'non-human-identity-ai-agents': nonHumanIdentityAiAgents,
  'iga-for-sap': igaForSap,
};

type Translations = Record<string, PostContent>;
const translations = { fr, it, es, nl, pl, pt, sv, da } as unknown as Record<
  Exclude<Locale, 'en' | 'de'>,
  Translations
>;

const content: Record<string, Record<Locale, PostContent>> = Object.fromEntries(
  Object.entries(source).map(([id, base]) => [
    id,
    {
      ...base,
      ...Object.fromEntries(Object.entries(translations).map(([l, t]) => [l, t[id]])),
    } as Record<Locale, PostContent>,
  ])
);

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
