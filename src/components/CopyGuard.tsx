'use client';

import { useEffect } from 'react';

// Selection is already switched off in CSS (globals.css); this stops copy and cut
// too (Ctrl+A / Ctrl+C, the context menu) unless the selection is entirely inside
// an email link or a form field, so visitors can still copy hello@qubital.eu and
// edit what they type into the contact form.
const ALLOWED = 'a[href^="mailto:"], input, textarea, select, [contenteditable="true"]';

function allowed(node: Node | null) {
  const el = node instanceof Element ? node : node?.parentElement;
  return !!el?.closest(ALLOWED);
}

export function CopyGuard() {
  useEffect(() => {
    const guard = (e: ClipboardEvent) => {
      if (allowed(document.activeElement)) return;
      const sel = document.getSelection();
      if (sel && !sel.isCollapsed && allowed(sel.anchorNode) && allowed(sel.focusNode)) return;
      e.preventDefault();
    };
    document.addEventListener('copy', guard);
    document.addEventListener('cut', guard);
    return () => {
      document.removeEventListener('copy', guard);
      document.removeEventListener('cut', guard);
    };
  }, []);

  return null;
}
