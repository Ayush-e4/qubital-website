// Renders the 1200×630 share images for the topic landing pages into
// public/og/<page>-<locale>.png, from each page's hero copy and in the brand's
// dark palette, logo and fonts.
//
// Needs a prior `npm run build` (it takes the Geist fonts from .next) and a
// local Chrome:  node scripts/og-landing.mjs
// Set PW_CHANNEL to use another Playwright browser channel (default: chrome).

import { mkdir, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'src/content/landing');
const outDir = path.join(root, 'public/og');

// Logo geometry, kept in sync with src/components/logo-data.ts.
const logoSrc = await readFile(path.join(root, 'src/components/logo-data.ts'), 'utf8');
const wordmark = {
  viewBox: logoSrc.match(/wordmark = \{\s*viewBox: '([^']+)'/)[1],
  zero: logoSrc.match(/wordmark[\s\S]*?zero: \{([\s\S]*?)\}/)[1],
  one: logoSrc.match(/wordmark[\s\S]*?one: \{\s*d: '([^']+)'/)[1],
  letters: logoSrc.match(/letters:\s*'([^']+)'/)[1],
};
const num = (k) => Number(wordmark.zero.match(new RegExp(`${k}: ([\\d.]+)`))[1]);
const logo = `<svg viewBox="${wordmark.viewBox}" fill="none" height="44">
  <ellipse cx="${num('cx')}" cy="${num('cy')}" rx="${num('rx')}" ry="${num('ry')}" stroke="#8b7bff" stroke-width="${num('stroke')}"/>
  <path d="${wordmark.one}" stroke="#3fe3f2" stroke-width="126" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="${wordmark.letters}" fill="#f3f3f8"/></svg>`;

// Fonts: the @font-face rules next/font generated, with the built files inlined
// (a page set from a string cannot load file: URLs).
async function fontFaces() {
  const chunks = path.join(root, '.next/static/chunks');
  const files = (await readdir(chunks, { recursive: true })).filter((f) => f.endsWith('.css'));
  for (const f of files) {
    const css = await readFile(path.join(chunks, f), 'utf8');
    const rules = css.match(/@font-face\{font-family:Geist[^}]*url\([^}]*\}/g);
    if (!rules) continue;
    const inlined = await Promise.all(
      rules.map(async (r) => {
        const file = path.basename(r.match(/url\(["']?([^)"']+)/)[1]);
        const data = await readFile(path.join(root, '.next/static/media', file), 'base64');
        return r.replace(/url\([^)]+\)/, `url(data:font/woff2;base64,${data})`);
      })
    );
    return inlined.join('\n');
  }
  throw new Error('No Geist @font-face in .next; run `npm run build` first.');
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// Keep hyphenated words (API-Schlüssel, KI-Agenten) on one line.
const nobreak = (s) => s.replace(/(\w)-(\w)/g, '$1\u2011$2');
const footer = {
  de: 'Identity & Access Management · Beratung für DACH',
  en: 'Identity & access management consulting · Europe',
};

function html(page, faces) {
  return `<!doctype html><html lang="${page.locale}"><head><meta charset="utf-8"><style>
${faces}
*{margin:0;box-sizing:border-box}
html,body{width:1200px;height:630px;background:#05050a;overflow:hidden}
body{position:relative;font-family:Geist,sans-serif;color:#f3f3f8;padding:72px 80px;display:flex;flex-direction:column}
.glow{position:absolute;inset:0;background:
  radial-gradient(620px 420px at 82% 18%,rgb(139 123 255/.26),transparent 70%),
  radial-gradient(560px 380px at 8% 100%,rgb(63 227 242/.14),transparent 70%)}
.grid{position:absolute;inset:0;background-image:
  linear-gradient(rgb(255 255 255/.045) 1px,transparent 1px),
  linear-gradient(90deg,rgb(255 255 255/.045) 1px,transparent 1px);
  background-size:60px 60px;mask-image:radial-gradient(900px 520px at 60% 40%,#000 30%,transparent 80%)}
.top,.main,.foot{position:relative}
.eyebrow{margin-top:auto;font-family:'Geist Mono',monospace;font-size:24px;letter-spacing:.08em;text-transform:uppercase;color:#3fe3f2}
h1{margin-top:24px;max-width:1000px;font-size:76px;line-height:1.04;font-weight:500;letter-spacing:-.035em;text-wrap:balance}
.foot{margin-top:52px;display:flex;justify-content:space-between;align-items:center;padding-top:28px;border-top:1px solid rgb(255 255 255/.12);font-size:24px;color:#9d9db3}
.url{font-family:'Geist Mono',monospace;color:#f3f3f8}
</style></head><body>
<div class="glow"></div><div class="grid"></div>
<div class="top">${logo}</div>
<p class="eyebrow main">${esc(page.hero.eyebrow)}</p>
<h1 class="main">${esc(nobreak(page.hero.h1))}</h1>
<div class="foot"><span>${esc(footer[page.locale])}</span><span class="url">qubital.eu</span></div>
</body></html>`;
}

const faces = await fontFaces();
await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL ?? 'chrome' });
const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 } });
const tab = await ctx.newPage();
for (const file of (await readdir(contentDir)).filter((f) => f.endsWith('.json'))) {
  const page = JSON.parse(await readFile(path.join(contentDir, file), 'utf8'));
  const out = path.join(root, 'public', page.service.ogImage);
  await tab.setContent(html(page, faces), { waitUntil: 'load' });
  await tab.evaluate(() => document.fonts.ready);
  const fonts = await tab.evaluate(() =>
    ['500 76px Geist', '24px "Geist Mono"'].every((f) => document.fonts.check(f, 'Aö'))
  );
  if (!fonts) throw new Error(`${file}: Geist did not load`);
  const overflow = await tab.evaluate(() => document.body.scrollHeight > 630);
  if (overflow) throw new Error(`${file}: text does not fit in 630px`);
  await tab.screenshot({ path: out, type: 'png' });
  console.log('wrote', path.relative(root, out));
}
await browser.close();
