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

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    files: ['src/**/*.{js,jsx}'],
    plugins: { local: { rules: { 'min-text-alpha': minTextAlpha } } },
    rules: { 'local/min-text-alpha': 'error' },
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
