// Article bodies are plain data, rendered by src/components/blog/ArticleBody.tsx.
// No Markdown parser: each block is one paragraph, heading, list or callout.
export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'callout'; text: string };

export type PostContent = {
  /** <h1> and the base of the <title> (the site template appends the brand) */
  title: string;
  /** Meta description, 140–160 characters */
  description: string;
  /** Short teaser on the blog index */
  excerpt: string;
  category: string;
  keywords: string[];
  body: Block[];
};
