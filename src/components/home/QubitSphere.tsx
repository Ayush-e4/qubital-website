'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';
import { canvasPalette, getTheme, subscribeTheme } from '@/lib/theme';

type Glyph = {
  x: number;
  y: number;
  z: number;
  bit: 0 | 1;
  timer: number;
  flash: number;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * A rotating Bloch sphere made of 0/1 glyphs. Glyphs flip state over time
 * ("superposition"), react to the cursor, and a state vector precesses
 * between the |0⟩ and |1⟩ poles.
 */
export function QubitSphere({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mono =
      getComputedStyle(document.body).getPropertyValue('--font-geist-mono').trim() || 'monospace';

    let w = 0;
    let h = 0;
    let radius = 0;
    let glyphs: Glyph[] = [];
    let raf = 0;
    const AXIS = 1.14; // pole axis length, relative to the radius
    let visible = true;
    let pal = canvasPalette[getTheme()];
    const rgba = (c: readonly number[], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

    let rotY = 0;
    const baseTiltX = -0.32;
    let tiltX = 0;
    let tiltY = 0;
    let targetX = 0;
    let targetY = 0;
    let vecPhase = 0;
    const mouse = { x: -9999, y: -9999 };

    const build = (n: number) => {
      // Evenly distribute points over the sphere (Fibonacci lattice)
      const golden = Math.PI * (3 - Math.sqrt(5));
      glyphs = Array.from({ length: n }, (_, i) => {
        const y = 1 - (i / (n - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = golden * i;
        return {
          x: Math.cos(theta) * r,
          y,
          z: Math.sin(theta) * r,
          bit: Math.random() < 0.5 ? 0 : 1,
          timer: Math.random() * 600,
          flash: 0,
        };
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // The axis reaches AXIS·r and the pole labels sit ~22px beyond it,
      // so the radius is capped to keep everything inside the canvas.
      radius = Math.max(40, Math.min(w * 0.4, (h / 2 - 26) / AXIS));
      const n = w < 640 ? 260 : 420;
      if (glyphs.length !== n) build(n);
    };

    const project = (
      x: number,
      y: number,
      z: number,
      cosY: number,
      sinY: number,
      cosX: number,
      sinX: number
    ) => {
      // rotate around Y, then around X
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;
      const y1 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;
      const fov = 3.4;
      const s = fov / (fov + z2);
      return { sx: w / 2 + x1 * radius * s, sy: h / 2 + y1 * radius * s, z: z2, s };
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      tiltX += (targetX - tiltX) * 0.045;
      tiltY += (targetY - tiltY) * 0.045;
      if (!reduce) {
        rotY += 0.0021;
        vecPhase += 0.008;
      }

      const ay = rotY + tiltY;
      const ax = baseTiltX + tiltX;
      const cosY = Math.cos(ay);
      const sinY = Math.sin(ay);
      const cosX = Math.cos(ax);
      const sinX = Math.sin(ax);
      const P = (x: number, y: number, z: number) => project(x, y, z, cosY, sinY, cosX, sinX);

      // Equator & a meridian ring
      const ring = (fn: (a: number) => [number, number, number], alpha: number) => {
        ctx.beginPath();
        for (let i = 0; i <= 120; i++) {
          const [x, y, z] = fn((i / 120) * Math.PI * 2);
          const p = P(x * 1.04, y * 1.04, z * 1.04);
          if (i === 0) ctx.moveTo(p.sx, p.sy);
          else ctx.lineTo(p.sx, p.sy);
        }
        ctx.strokeStyle = rgba(pal.ink, alpha * pal.alpha);
        ctx.lineWidth = 1;
        ctx.stroke();
      };
      ring((a) => [Math.cos(a), 0, Math.sin(a)], 0.1);
      ring((a) => [Math.cos(a), Math.sin(a), 0], 0.05);

      // Z-axis between the poles
      const top = P(0, -AXIS, 0);
      const bottom = P(0, AXIS, 0);
      ctx.setLineDash([3, 6]);
      ctx.beginPath();
      ctx.moveTo(top.sx, top.sy);
      ctx.lineTo(bottom.sx, bottom.sy);
      ctx.strokeStyle = rgba(pal.ink, 0.14 * pal.alpha);
      ctx.stroke();
      ctx.setLineDash([]);

      // Glyphs, far to near
      const projected = glyphs.map((g) => ({ g, ...P(g.x, g.y, g.z) }));
      projected.sort((a, b) => b.z - a.z);

      const scale = radius / 260;
      let currentFont = '';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (const { g, sx, sy, z, s } of projected) {
        const depth = (1 - z) / 2; // 0 = far, 1 = near

        if (!reduce) {
          g.timer -= 1;
          if (g.timer <= 0) {
            g.bit = g.bit ? 0 : 1;
            g.timer = 300 + Math.random() * 900;
            g.flash = 1;
          }
        }

        const dx = sx - mouse.x;
        const dy = sy - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const reach = 110 * scale + 40;
        const near = dist < reach ? 1 - dist / reach : 0;
        if (near > 0.55 && g.flash < 0.15 && Math.random() < 0.12) {
          g.bit = g.bit ? 0 : 1;
          g.flash = 1;
        }
        g.flash *= 0.94;

        // push glyphs slightly away from the cursor
        const push = near * 14;
        const px = dist > 0 ? sx + (dx / dist) * push : sx;
        const py = dist > 0 ? sy + (dy / dist) * push : sy;

        const t = (g.y + 1) / 2;
        const r = lerp(pal.violet[0], pal.cyan[0], t);
        const gr = lerp(pal.violet[1], pal.cyan[1], t);
        const b = lerp(pal.violet[2], pal.cyan[2], t);
        const hot = Math.min(1, g.flash + near * 0.8);
        const alpha = Math.min(1, (0.06 + depth * depth * 0.7 + hot * 0.5) * pal.alpha);

        const size = Math.round((6 + depth * 9) * s * scale * 10) / 10;
        const font = `${size}px ${mono}`;
        if (font !== currentFont) {
          ctx.font = font;
          currentFont = font;
        }
        ctx.fillStyle = `rgba(${lerp(r, pal.hot[0], hot) | 0},${lerp(gr, pal.hot[1], hot) | 0},${lerp(b, pal.hot[2], hot) | 0},${alpha})`;
        ctx.fillText(g.bit ? '1' : '0', px, py);
      }

      // State vector |ψ⟩ precessing around the axis
      const theta = 0.95 + Math.sin(vecPhase * 0.7) * 0.35;
      const phi = vecPhase;
      const vx = Math.sin(theta) * Math.cos(phi);
      const vy = -Math.cos(theta);
      const vz = Math.sin(theta) * Math.sin(phi);
      const origin = P(0, 0, 0);
      const tip = P(vx, vy, vz);

      const grad = ctx.createLinearGradient(origin.sx, origin.sy, tip.sx, tip.sy);
      grad.addColorStop(0, rgba(pal.violet, 0.1));
      grad.addColorStop(1, rgba(pal.cyan, 0.95));
      ctx.beginPath();
      ctx.moveTo(origin.sx, origin.sy);
      ctx.lineTo(tip.sx, tip.sy);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.stroke();

      const glow = ctx.createRadialGradient(tip.sx, tip.sy, 0, tip.sx, tip.sy, 26 * scale + 6);
      glow.addColorStop(0, rgba(pal.cyan, 0.9));
      glow.addColorStop(0.3, rgba(pal.cyan, 0.35));
      glow.addColorStop(1, rgba(pal.cyan, 0));
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(tip.sx, tip.sy, 26 * scale + 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = getTheme() === 'light' ? '#ffffff' : '#eaffff';
      ctx.beginPath();
      ctx.arc(tip.sx, tip.sy, 3.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = rgba(pal.ink, 0.9);
      ctx.beginPath();
      ctx.arc(origin.sx, origin.sy, 2.2, 0, Math.PI * 2);
      ctx.fill();

      // Pole labels
      ctx.font = `${Math.max(11, 14 * scale)}px ${mono}`;
      ctx.fillStyle = rgba(pal.ink, 0.55);
      ctx.fillText('|0⟩', top.sx, top.sy - 14);
      ctx.fillText('|1⟩', bottom.sx, bottom.sy + 14);
    };

    const loop = () => {
      if (visible && !document.hidden) draw();
      raf = requestAnimationFrame(loop);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      const clamp = (v: number) => Math.max(-0.5, Math.min(0.5, v));
      targetY = clamp(mouse.x / rect.width - 0.5) * 0.9;
      targetX = clamp(mouse.y / rect.height - 0.5) * -0.6;
    };
    const onPointerLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      targetX = 0;
      targetY = 0;
    };

    resize();
    draw();
    if (!reduce) raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);
    // Redraw immediately so the theme transition snapshot has the right colors
    const unsubscribeTheme = subscribeTheme(() => {
      pal = canvasPalette[getTheme()];
      draw();
    });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      unsubscribeTheme();
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <canvas ref={canvasRef} aria-hidden className={cn('h-full w-full touch-pan-y', className)} />
  );
}
