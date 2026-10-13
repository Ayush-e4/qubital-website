// Renders every clip in both locales and both themes, plus a poster frame.
//
//   node render.mjs                     all videos + posters into ../public/videos
//   node render.mjs stills id:frame...  quick review stills (dark, en) into ./out
//   OUT=somewhere node render.mjs       render elsewhere
import { bundle } from '@remotion/bundler';
import { renderMedia, renderStill, selectComposition } from '@remotion/renderer';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const OUT = path.resolve(
  process.env.OUT ?? (process.argv[2] === 'stills' ? 'out' : '../public/videos')
);
const LOCALES = ['en', 'de'];
const THEMES = ['dark', 'light'];
// Frame used as the poster: the moment each clip makes its point.
const POSTER = { 'access-request': 300, 'just-in-time': 320, passkey: 250, workforce: 330, 'agent-scope': 300 };

const serveUrl = await bundle({ entryPoint: path.resolve('src/index.ts') });

async function still(id, frame, props, file) {
  const composition = await selectComposition({ serveUrl, id, inputProps: props });
  await renderStill({ composition, serveUrl, output: file, frame, inputProps: props, imageFormat: 'jpeg', jpegQuality: 82 });
}

if (process.argv[2] === 'stills') {
  mkdirSync(path.join(OUT, 'stills'), { recursive: true });
  for (const spec of process.argv.slice(3)) {
    const [id, frame, theme = 'dark', locale = 'en'] = spec.split(':');
    const file = path.join(OUT, 'stills', `${id}-${frame}-${theme}-${locale}.jpg`);
    await still(id, Number(frame), { theme, locale }, file);
    console.log(file);
  }
} else {
  mkdirSync(OUT, { recursive: true });
  for (const id of Object.keys(POSTER)) {
    for (const locale of LOCALES) {
      for (const theme of THEMES) {
        const props = { theme, locale };
        const name = `${id}-${locale}-${theme}`;
        const composition = await selectComposition({ serveUrl, id, inputProps: props });
        await renderMedia({
          composition,
          serveUrl,
          codec: 'h264',
          crf: 26,
          pixelFormat: 'yuv420p',
          inputProps: props,
          outputLocation: path.join(OUT, `${name}.mp4`),
        });
        await still(id, POSTER[id], props, path.join(OUT, `${name}.jpg`));
        console.log('rendered', name);
      }
    }
  }
}
