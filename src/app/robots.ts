import type { MetadataRoute } from 'next';
import { site } from '@/config/site';

// Crawlers that collect content to train AI models. They are asked to stay out;
// search engines (Googlebot, Bingbot …) and AI assistants fetching a page for a
// user are unaffected, so the site stays findable. Well-behaved bots honour this;
// it is a request, not an enforcement.
const AI_TRAINING_BOTS = [
  'GPTBot',
  'ClaudeBot',
  'anthropic-ai',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'Bytespider',
  'meta-externalagent',
  'FacebookBot',
  'cohere-ai',
  'cohere-training-data-crawler',
  'Diffbot',
  'Omgilibot',
  'img2dataset',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: AI_TRAINING_BOTS, disallow: '/' },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
