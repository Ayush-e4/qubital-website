import type { Block } from '@/content/blog/types';

// Renders an article's blocks with the site's type scale. Headings get ids so
// sections can be linked to directly.
const anchor = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-6 text-lg leading-relaxed text-muted">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'h2':
            return (
              <h2
                key={i}
                id={anchor(b.text)}
                className="mt-8 scroll-mt-32 text-3xl font-medium leading-tight tracking-tight text-fg text-balance sm:text-4xl"
              >
                {b.text}
              </h2>
            );
          case 'h3':
            return (
              <h3
                key={i}
                id={anchor(b.text)}
                className="mt-2 scroll-mt-32 text-xl font-medium tracking-tight text-fg"
              >
                {b.text}
              </h3>
            );
          case 'ul':
          case 'ol': {
            const List = b.type;
            return (
              <List
                key={i}
                className={
                  b.type === 'ol'
                    ? 'flex list-decimal flex-col gap-3 pl-6 marker:font-mono marker:text-cyan'
                    : 'flex list-disc flex-col gap-3 pl-6 marker:text-violet'
                }
              >
                {b.items.map((item) => (
                  <li key={item} className="pl-1">
                    {item}
                  </li>
                ))}
              </List>
            );
          }
          case 'callout':
            return (
              <aside
                key={i}
                className="relative overflow-hidden rounded-2xl bg-surface p-6 text-fg sm:p-8"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[inherit]"
                  style={{
                    padding: 1,
                    background: 'linear-gradient(100deg, var(--violet) 10%, var(--cyan) 90%)',
                    WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                />
                <p className="relative">{b.text}</p>
              </aside>
            );
          default:
            return (
              <p key={i} className="text-pretty">
                {b.text}
              </p>
            );
        }
      })}
    </div>
  );
}
