import { loadFont as loadGeist } from '@remotion/google-fonts/Geist';
import { loadFont as loadGeistMono } from '@remotion/google-fonts/GeistMono';
import { createContext, useContext, type CSSProperties, type ReactNode } from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const { fontFamily: sans } = loadGeist('normal', { weights: ['400', '500', '600'], subsets: ['latin'] });
const { fontFamily: mono } = loadGeistMono('normal', { weights: ['400', '500'], subsets: ['latin'] });
export const fonts = { sans, mono };

// Same tokens as the website (src/app/globals.css)
export const palettes = {
  dark: {
    bg: '#05050a',
    surface: '#0b0b13',
    surface2: '#11111b',
    line: 'rgba(255,255,255,0.08)',
    lineStrong: 'rgba(255,255,255,0.16)',
    fg: '#f3f3f8',
    muted: '#9d9db3',
    faint: '#5d5d73',
    violet: '#8b7bff',
    cyan: '#3fe3f2',
    green: '#4ade80',
    red: '#f87171',
    grid: 'rgba(255,255,255,0.045)',
  },
  light: {
    bg: '#f6f6f9',
    surface: '#ffffff',
    surface2: '#eeeef4',
    line: 'rgba(16,16,40,0.09)',
    lineStrong: 'rgba(16,16,40,0.17)',
    fg: '#0c0c16',
    muted: '#55556c',
    faint: '#8a8aa0',
    violet: '#6650f2',
    cyan: '#0a9fbd',
    green: '#16a34a',
    red: '#dc2626',
    grid: 'rgba(16,16,40,0.06)',
  },
};
export type Theme = keyof typeof palettes;
export type Palette = (typeof palettes)[Theme];
export type Locale = 'en' | 'de';
export type ClipProps = { theme: Theme; locale: Locale };

const PaletteContext = createContext<Palette>(palettes.dark);
export const useColors = () => useContext(PaletteContext);

/** 0 → 1 spring that starts at `at`. */
export function useEnter(at: number, damping = 18) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - at, fps, config: { damping, mass: 0.6 } });
}

/** Background and the loop fade (in at the start, out at the end). */
export function Stage({ theme, children }: { theme: Theme; children: ReactNode }) {
  const c = palettes[theme];
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const opacity = interpolate(
    frame,
    [0, 12, durationInFrames - 18, durationInFrames - 1],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  return (
    <PaletteContext.Provider value={c}>
      {/* Solid page colour only: the site letterboxes the clip with the same
          colour, so any extra space around it is invisible. */}
      <AbsoluteFill style={{ background: c.bg, fontFamily: sans, color: c.fg }}>
        <AbsoluteFill style={{ opacity, alignItems: 'center', justifyContent: 'center' }}>
          {children}
        </AbsoluteFill>
      </AbsoluteFill>
    </PaletteContext.Provider>
  );
}

/** The app window every clip is staged in. */
export function Window({
  title,
  aside,
  children,
  width = 1000,
}: {
  title: string;
  aside?: ReactNode;
  children: ReactNode;
  width?: number;
}) {
  const c = useColors();
  const enter = useEnter(0, 20);
  return (
    <div
      style={{
        width,
        background: c.surface,
        border: `1px solid ${c.lineStrong}`,
        borderRadius: 28,
        boxShadow: '0 20px 50px -24px rgba(0,0,0,0.35)',
        overflow: 'hidden',
        transform: `translateY(${(1 - enter) * 40}px) scale(${0.97 + enter * 0.03})`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '26px 40px',
          borderBottom: `1px solid ${c.line}`,
        }}
      >
        <span style={{ fontSize: 28, fontWeight: 500 }}>{title}</span>
        {aside}
      </div>
      <div style={{ padding: 40, display: 'flex', flexDirection: 'column', gap: 24 }}>
        {children}
      </div>
    </div>
  );
}

/** Fades and lifts its children in at `at`. Renders nothing before. */
export function Appear({
  at,
  children,
  style,
}: {
  at: number;
  children: ReactNode;
  style?: CSSProperties;
}) {
  const frame = useCurrentFrame();
  const p = useEnter(at);
  if (frame < at) return null;
  return (
    <div style={{ opacity: p, transform: `translateY(${(1 - p) * 18}px)`, ...style }}>
      {children}
    </div>
  );
}

export function Avatar({ initials, size = 64 }: { initials: string; size?: number }) {
  const c = useColors();
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${c.violet}, ${c.cyan})`,
        color: '#05050a',
        fontSize: size * 0.38,
        fontWeight: 600,
        flexShrink: 0,
      }}
    >
      {initials}
    </span>
  );
}

/** Small rectangular status tag (deliberately not pill-shaped). */
export function Tag({ tone, children }: { tone: 'muted' | 'green' | 'red' | 'violet'; children: ReactNode }) {
  const c = useColors();
  const color = tone === 'muted' ? c.muted : c[tone];
  return (
    <span
      style={{
        fontFamily: mono,
        fontSize: 20,
        padding: '6px 12px',
        borderRadius: 8,
        color,
        border: `1px solid ${color}55`,
        background: `${color}14`,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}

export function Panel({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  const c = useColors();
  return (
    <div
      style={{
        border: `1px solid ${c.line}`,
        background: c.surface2,
        borderRadius: 18,
        padding: '22px 26px',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Label({ children }: { children: ReactNode }) {
  const c = useColors();
  return <div style={{ fontSize: 22, color: c.muted, marginBottom: 8 }}>{children}</div>;
}

// ── Icons (24px viewBox, stroke) ───────────────────────────────────────────

const iconPaths = {
  check: 'M5 12.5l4.5 4.5L19 7.5',
  x: 'M6 6l12 12M18 6L6 18',
  lock: 'M7 11V8a5 5 0 0110 0v3M5 11h14v10H5z',
  key: 'M12 10a3.5 3.5 0 100-7 3.5 3.5 0 000 7zm0 0v11m0-4h3.5m-3.5-3.5h2.5',
  user: 'M12 12a4 4 0 100-8 4 4 0 000 8zm-7 9a7 7 0 0114 0',
  bot: 'M12 4v3M6 9h12v10H6zM9.5 13.5h0M14.5 13.5h0M10 16.5h4',
  finger:
    'M7.5 19.5C6.5 17.6 6 15.4 6 13a6 6 0 0112 0M9 13a3 3 0 016 0v1.5c0 2.6-.5 5-1.5 7M12 13v2c0 2.3-.5 4.4-1.5 6M17.6 18c.3-1.2.4-2.4.4-3.5M4 9.5A8.5 8.5 0 0112 4.5a8.5 8.5 0 018 5',
  clock: 'M12 7v5l3 2M12 21a9 9 0 100-18 9 9 0 000 18z',
};

export function Icon({
  name,
  size = 28,
  color,
  strokeWidth = 2,
}: {
  name: keyof typeof iconPaths;
  size?: number;
  color: string;
  strokeWidth?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d={iconPaths[name]}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Circle that is a spinner while pending, then pops into a check or a cross. */
export function StatusDot({
  from,
  resolveAt,
  result,
}: {
  from: number;
  resolveAt: number;
  result: 'ok' | 'no';
}) {
  const c = useColors();
  const frame = useCurrentFrame();
  const pop = useEnter(resolveAt, 12);
  const size = 40;
  if (frame < resolveAt) {
    const angle = (frame - from) * 12;
    return (
      <span
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          border: `3px solid ${c.line}`,
          borderTopColor: c.violet,
          transform: `rotate(${angle}deg)`,
          flexShrink: 0,
        }}
      />
    );
  }
  const color = result === 'ok' ? c.green : c.red;
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        background: `${color}22`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${0.6 + pop * 0.4})`,
        flexShrink: 0,
      }}
    >
      <Icon name={result === 'ok' ? 'check' : 'x'} size={24} color={color} strokeWidth={2.6} />
    </span>
  );
}

/** One line in a checklist: label on the left, status on the right. */
export function CheckRow({
  at,
  resolveAt,
  result = 'ok',
  label,
  detail,
}: {
  at: number;
  resolveAt: number;
  result?: 'ok' | 'no';
  label: string;
  detail?: ReactNode;
}) {
  const c = useColors();
  return (
    <Appear at={at}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <StatusDot from={at} resolveAt={resolveAt} result={result} />
        <span style={{ fontSize: 28, flex: 1 }}>{label}</span>
        {detail && <span style={{ fontSize: 22, color: c.muted }}>{detail}</span>}
      </div>
    </Appear>
  );
}

/** A button that dips when it is clicked at `pressAt`. */
export function Button({
  primary,
  pressAt,
  children,
}: {
  primary?: boolean;
  pressAt?: number;
  children: ReactNode;
}) {
  const c = useColors();
  const frame = useCurrentFrame();
  const pressed =
    pressAt !== undefined
      ? interpolate(frame, [pressAt - 3, pressAt, pressAt + 6], [0, 1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 0;
  return (
    <span
      style={{
        fontSize: 26,
        fontWeight: 500,
        padding: '18px 30px',
        borderRadius: 14,
        background: primary ? c.fg : 'transparent',
        color: primary ? c.bg : c.fg,
        border: primary ? 'none' : `1px solid ${c.lineStrong}`,
        transform: `scale(${1 - pressed * 0.05})`,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      {children}
    </span>
  );
}

/** Mouse pointer gliding from `from` to `to` (canvas pixels), with a click ring. */
export function Cursor({
  from,
  to,
  start,
  end,
  clickAt,
}: {
  from: [number, number];
  to: [number, number];
  start: number;
  end: number;
  clickAt: number;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < start - 6) return null;
  const t = spring({ frame: frame - start, fps, durationInFrames: end - start, config: { damping: 200 } });
  const x = from[0] + (to[0] - from[0]) * t;
  const y = from[1] + (to[1] - from[1]) * t;
  const ring = interpolate(frame, [clickAt, clickAt + 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const show = interpolate(frame, [start - 6, start, clickAt + 24, clickAt + 34], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div style={{ position: 'absolute', left: x, top: y, opacity: show, pointerEvents: 'none' }}>
      {frame >= clickAt && (
        <span
          style={{
            position: 'absolute',
            left: -30,
            top: -30,
            width: 60,
            height: 60,
            borderRadius: 30,
            border: '3px solid rgba(139,123,255,0.9)',
            transform: `scale(${0.4 + ring})`,
            opacity: 1 - ring,
          }}
        />
      )}
      <svg width="36" height="36" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }}>
        <path d="M4 3l7 18 2.5-7.5L21 11z" fill="#fff" stroke="#05050a" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
