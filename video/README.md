# Qubital product clips

Short looping clips for the website, made with [Remotion](https://www.remotion.dev).
Each clip is a React component in `src/clips/`; the website plays the rendered
MP4s from `public/videos/` through `src/components/ui/Clip.tsx`.

| Clip             | Shown on                  |
| ---------------- | ------------------------- |
| `access-request` | Home, Services (IGA)      |
| `just-in-time`   | Services (PAM)            |
| `passkey`        | Services (CIAM)           |
| `workforce`      | Services (workforce IAM)  |
| `agent-scope`    | Services (AI security)    |

This is a separate npm project so Remotion never becomes a dependency of the
site. It is not part of CI or the Vercel build.

```bash
cd video
npm install
npm run studio                 # preview and tweak in the browser
node render.mjs stills passkey:140 access-request:300:light:de   # quick stills
npm run render                 # all clips × 10 languages × dark/light → ../public/videos
LOCALES=fr,it npm run render   # only some languages
```

Every clip renders in all ten site languages and both themes (100 MP4s plus a
JPG poster each). The site's smoke test fails if any of them is missing. Copy lives in each clip's `copy` object. The
background is the site's exact page colour, because the site letterboxes the
clip in its box (`object-fit: contain`) and the bars must be invisible. Keep
it solid if you change the design.
