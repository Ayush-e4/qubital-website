'use client';

import { useEffect, useRef } from 'react';
import { canvasPalette, getTheme, subscribeTheme } from '@/lib/theme';

// Slowly falling columns of 0s and 1s, faded at the edges. Purely decorative.
export function BinaryRain({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mono =
      getComputedStyle(document.body).getPropertyValue('--font-geist-mono') || 'monospace';

    const size = 14;
    let w = 0;
    let h = 0;
    let cols: { y: number; speed: number; chars: string[] }[] = [];
    let raf = 0;
    let visible = true;
    let pal = canvasPalette[getTheme()];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.ceil(w / (size * 1.6));
      const rows = Math.ceil(h / size) + 1;
      cols = Array.from({ length: count }, () => ({
        y: Math.random() * h,
        speed: 0.15 + Math.random() * 0.45,
        chars: Array.from({ length: rows }, () => (Math.random() > 0.5 ? '1' : '0')),
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.font = `${size - 2}px ${mono}`;
      cols.forEach((col, ci) => {
        const x = ci * size * 1.6;
        if (!reduce) col.y = (col.y + col.speed) % h;
        col.chars.forEach((ch, ri) => {
          const y = ri * size;
          // distance from the moving "head" of the column
          const d = (col.y - y + h) % h;
          const trail = Math.max(0, 1 - d / (h * 0.35));
          const edge = Math.min(1, x / (w * 0.5)) * Math.sin((y / h) * Math.PI);
          const a = (0.04 + trail * 0.5) * edge;
          if (a < 0.02) return;
          const c = trail > 0.92 ? pal.cyan : pal.violet;
          const alpha = (trail > 0.92 ? a + 0.2 : a) * pal.alpha;
          ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${alpha})`;
          ctx.fillText(ch, x, y);
        });
        if (!reduce && Math.random() < 0.02) {
          const r = Math.floor(Math.random() * col.chars.length);
          col.chars[r] = col.chars[r] === '0' ? '1' : '0';
        }
      });
    };

    const loop = () => {
      if (visible) draw();
      raf = requestAnimationFrame(loop);
    };

    resize();
    draw();
    if (!reduce) raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    const unsubscribeTheme = subscribeTheme(() => {
      pal = canvasPalette[getTheme()];
      draw();
    });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      unsubscribeTheme();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
