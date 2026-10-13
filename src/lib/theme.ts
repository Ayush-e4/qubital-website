export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';

// Runs in <head> before first paint. Light is the default for everyone; dark only
// when the visitor picked it with the toggle (saved in localStorage).
export const themeScript = `(function(){var d=document.documentElement;var t="light";try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="dark"){t="dark"}}catch(e){}d.setAttribute("data-theme",t)})()`;

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

/** Calls `callback` whenever the theme attribute on <html> changes. */
export function subscribeTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  return () => observer.disconnect();
}

/** Colors for canvas drawings, which can't read CSS variables directly. */
export const canvasPalette = {
  dark: {
    violet: [139, 123, 255],
    cyan: [63, 227, 242],
    ink: [255, 255, 255],
    hot: [255, 255, 255],
    alpha: 1,
  },
  light: {
    violet: [102, 80, 242],
    cyan: [10, 159, 189],
    ink: [16, 16, 40],
    hot: [40, 24, 170],
    alpha: 1.15,
  },
} as const satisfies Record<
  Theme,
  {
    violet: readonly number[];
    cyan: readonly number[];
    ink: readonly number[];
    hot: readonly number[];
    alpha: number;
  }
>;
