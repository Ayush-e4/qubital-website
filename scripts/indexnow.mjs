// Tells IndexNow search engines (Bing, Yandex, Seznam, Naver …) about new or
// changed pages, so they recrawl them without waiting for the sitemap.
//
//   node scripts/indexnow.mjs                 every URL in the live sitemap
//   node scripts/indexnow.mjs <url> [<url>…]  only these URLs
//
// The key is public by design: IndexNow checks that https://qubital.eu/<key>.txt
// contains it, which proves the request comes from the site owner. Run this only
// after the deploy that contains the pages is live.

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const host = 'qubital.eu';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const keyFile = (await readdir(path.join(root, 'public'))).find((f) =>
  /^[0-9a-f]{32}\.txt$/.test(f)
);
if (!keyFile) throw new Error('No IndexNow key file (32 hex characters .txt) in public/');
const key = (await readFile(path.join(root, 'public', keyFile), 'utf8')).trim();

let urls = process.argv.slice(2);
if (urls.length === 0) {
  const xml = await (await fetch(`https://${host}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
if (urls.some((u) => new URL(u).host !== host)) throw new Error(`Only ${host} URLs`);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${keyFile}`, urlList: urls }),
});
// 200 = accepted, 202 = accepted and the key is still being verified.
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urls.length} URLs`);
if (res.status >= 300) {
  console.log(await res.text());
  process.exitCode = 1;
}
