/**
 * Design tokens at runtime.
 *
 * The palette is defined once, in `@theme` in src/app/globals.css, which emits
 * real custom properties on the document root. Anything needing a token from
 * JavaScript — framer-motion colour animation, the WebGL grid — reads it
 * through here, so a value is never duplicated between CSS and JS.
 *
 * Pure module aside from the `document` read, so it is safe on both sides.
 */

/**
 * Read a design token from the document root.
 *
 * Returns `fallback` during server rendering, where there is no document, so
 * every caller must pass a literal that matches the token. That keeps SSR and
 * client output identical.
 *
 * @param {string} name token name, e.g. `--color-primary`
 * @param {string} fallback value used when there is no document
 * @returns {string}
 */
export function readToken(name, fallback) {
  if (typeof window === 'undefined') return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name);
  return value.trim() || fallback;
}
