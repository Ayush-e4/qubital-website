import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

/**
 * Guards the contrast fix in #36.
 *
 * The design system's semantic tokens pass WCAG AA at full strength — the
 * failures were all *alpha-modified* utilities, where the effective colour is
 * blended towards a light background. Measured thresholds on the light surfaces
 * this site uses (white, #fafafa, #f8f9ff):
 *
 *   text-on-surface/NN  ->  NN >= 70   (70 gives ~6.3:1)
 *   text-secondary/NN   ->  NN >= 80   (80 gives ~4.0:1, fine for large text
 *                                       and icons; 85+ is needed for body copy)
 *
 * This is a heuristic, not a contrast calculation — it cannot see the actual
 * background, so it will miss problems caused by a new background colour. It
 * exists to stop the specific regression we just fixed, cheaply, without
 * putting a browser in CI (see #5).
 */
const MIN_ALPHA = {
  'text-on-surface': 70,
  'text-secondary': 80,
};

const ALPHA_UTILITY = /\btext-(on-surface|secondary)\/(\d{1,3})\b/g;

const minTextAlpha = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Require a minimum alpha on text colour utilities to keep WCAG AA contrast',
    },
    messages: {
      tooLow:
        '`{{utility}}` may fall below WCAG AA on light backgrounds. Use an alpha of {{min}} or above, or a darker token.',
    },
  },
  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode();

    const check = (node) => {
      const text = sourceCode.getText(node);
      for (const match of text.matchAll(ALPHA_UTILITY)) {
        const [, token, alphaText] = match;
        const utility = `text-${token}/${alphaText}`;
        const min = MIN_ALPHA[`text-${token}`];
        if (!min || Number(alphaText) >= min) continue;
        context.report({
          node,
          messageId: 'tooLow',
          data: { utility, min },
        });
      }
    };

    return {
      Literal: (node) => typeof node.value === 'string' && check(node),
      TemplateLiteral: check,
    };
  },
};

/**
 * Guards the token layer.
 *
 * An audit found 64 raw palette utilities (`text-slate-900`, `bg-emerald-500`,
 * `from-blue-700`, …) sitting beside a complete semantic token set. Tailwind's
 * built-in palette is not themeable, so it bypasses globals.css entirely — a
 * token change would never reach these. This keeps the sweep from regressing.
 *
 * Only utility class names are matched, not hex literals: `src/lib/email/` is
 * hand-rolled HTML for email clients, where custom properties cannot be used,
 * so hex is correct there.
 */
const PALETTE_UTILITY =
  /\b(?:bg|text|border|from|via|to|ring|outline|fill|stroke|divide|placeholder|caret|accent|shadow)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/;

const noRawPalette = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow built-in Tailwind palette utilities in favour of semantic tokens',
    },
    messages: {
      raw: '`{{utility}}` uses the built-in Tailwind palette, which bypasses the design tokens. Use a semantic token from globals.css instead.',
    },
  },
  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode();

    const check = (node) => {
      const match = sourceCode.getText(node).match(PALETTE_UTILITY);
      if (match) {
        context.report({ node, messageId: 'raw', data: { utility: match[0] } });
      }
    };

    return {
      Literal: (node) => typeof node.value === 'string' && check(node),
      TemplateLiteral: check,
    };
  },
};

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    files: ['src/**/*.{js,jsx}'],
    plugins: {
      local: { rules: { 'min-text-alpha': minTextAlpha, 'no-raw-palette': noRawPalette } },
    },
    rules: { 'local/min-text-alpha': 'error', 'local/no-raw-palette': 'error' },
  },
  // `no-page-custom-font` guards the Pages Router: a font `<link>` declared
  // anywhere other than `pages/_document.js` only loads for the page that
  // declares it. This project has no `pages/` directory — `app/layout.js` *is*
  // the document, so its `<link>` is already site-wide and the rule is a false
  // positive. Scoped to that one file rather than turned off globally, so it
  // would still fire if the router were ever mixed.
  {
    files: ['src/app/layout.js'],
    rules: { '@next/next/no-page-custom-font': 'off' },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
