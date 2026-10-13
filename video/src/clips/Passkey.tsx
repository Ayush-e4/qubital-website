import { interpolate, useCurrentFrame } from 'remotion';
import {
  Appear,
  Button,
  Cursor,
  Icon,
  Stage,
  fonts,
  useColors,
  useEnter,
  type ClipProps,
} from '../ui';

// Customer sign-in with a passkey instead of a password. 10s at 30fps.
export const PASSKEY_FRAMES = 300;

const copy = {
  en: {
    signIn: 'Sign in',
    email: 'Email',
    cta: 'Continue with passkey',
    sheet: 'Use your fingerprint to sign in to acme.com',
    welcome: 'Welcome back, Anna',
    note: 'Signed in with a passkey. No password to steal.',
  },
  de: {
    signIn: 'Anmelden',
    email: 'E-Mail',
    cta: 'Weiter mit Passkey',
    sheet: 'Mit Fingerabdruck bei acme.com anmelden',
    welcome: 'Willkommen zurück, Anna',
    note: 'Mit Passkey angemeldet. Kein Passwort, das gestohlen werden kann.',
  },
};

const EMAIL = 'anna@example.com';
const TYPE_START = 22;
const CLICK = 100;
const SHEET = 110;
const VERIFIED = 170;
const DONE = 190;

export function Passkey({ theme, locale }: ClipProps) {
  return (
    <Stage theme={theme}>
      <Body locale={locale} />
    </Stage>
  );
}

function Body({ locale }: Pick<ClipProps, 'locale'>) {
  const t = copy[locale];
  const c = useColors();
  const frame = useCurrentFrame();
  const enter = useEnter(0, 20);
  const typed = EMAIL.slice(0, Math.max(0, Math.floor((frame - TYPE_START) / 2.4)));
  const caret = frame < CLICK && Math.floor(frame / 12) % 2 === 0;

  return (
    <div
      style={{
        width: 720,
        height: 720,
        position: 'relative',
        background: c.surface,
        border: `1px solid ${c.lineStrong}`,
        borderRadius: 28,
        boxShadow: '0 20px 50px -24px rgba(0,0,0,0.35)',
        overflow: 'hidden',
        transform: `translateY(${(1 - enter) * 40}px)`,
      }}
    >
      {frame < DONE ? (
        <div style={{ padding: 56, display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: `linear-gradient(135deg, ${c.violet}, ${c.cyan})`,
              }}
            />
            <span style={{ fontSize: 30, fontWeight: 600 }}>Acme</span>
          </div>
          <div style={{ fontSize: 52, fontWeight: 500, letterSpacing: -1 }}>{t.signIn}</div>
          <div>
            <div style={{ fontSize: 22, color: c.muted, marginBottom: 10 }}>{t.email}</div>
            <div
              style={{
                fontSize: 28,
                fontFamily: fonts.mono,
                padding: '20px 22px',
                borderRadius: 14,
                border: `1px solid ${frame < CLICK ? c.violet : c.lineStrong}`,
                background: c.surface2,
                minHeight: 36,
              }}
            >
              {typed}
              <span style={{ opacity: caret ? 1 : 0, color: c.violet }}>|</span>
            </div>
          </div>
          <Appear at={70} style={{ position: 'relative', alignSelf: 'stretch' }}>
            <div style={{ display: 'flex' }}>
              <Button primary pressAt={CLICK}>
                <Icon name="key" size={28} color={c.bg} />
                {t.cta}
              </Button>
            </div>
            <Cursor from={[560, 160]} to={[200, 36]} start={74} end={96} clickAt={CLICK} />
          </Appear>
        </div>
      ) : (
        <Welcome title={t.welcome} note={t.note} />
      )}

      {frame >= SHEET && frame < DONE + 6 && <Sheet text={t.sheet} />}
    </div>
  );
}

function Sheet({ text }: { text: string }) {
  const c = useColors();
  const frame = useCurrentFrame();
  const up = useEnter(SHEET, 22);
  const out = interpolate(frame, [DONE - 4, DONE + 6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scan = interpolate(frame, [SHEET + 10, VERIFIED], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const verified = frame >= VERIFIED;
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `rgba(0,0,0,${0.45 * up * (1 - out)})`,
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      <div
        style={{
          width: '100%',
          background: c.surface2,
          borderTop: `1px solid ${c.lineStrong}`,
          borderRadius: '28px 28px 0 0',
          padding: '44px 56px 56px',
          transform: `translateY(${(1 - up + out) * 100}%)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 28,
        }}
      >
        <div style={{ position: 'relative', width: 140, height: 140 }}>
          <svg width="140" height="140" viewBox="0 0 140 140" style={{ position: 'absolute' }}>
            <circle cx="70" cy="70" r="64" stroke={c.line} strokeWidth="6" fill="none" />
            <circle
              cx="70"
              cy="70"
              r="64"
              stroke={verified ? c.green : c.violet}
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={402}
              strokeDashoffset={402 * (1 - scan)}
              transform="rotate(-90 70 70)"
            />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={verified ? 'check' : 'finger'} size={64} color={verified ? c.green : c.fg} strokeWidth={verified ? 2.6 : 1.6} />
          </div>
        </div>
        <div style={{ fontSize: 26, textAlign: 'center', color: c.muted }}>{text}</div>
      </div>
    </div>
  );
}

function Welcome({ title, note }: { title: string; note: string }) {
  const c = useColors();
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 56,
        gap: 24,
      }}
    >
      <Appear at={DONE + 4}>
        <span
          style={{
            width: 88,
            height: 88,
            borderRadius: 44,
            background: `${c.green}22`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="check" size={48} color={c.green} strokeWidth={2.6} />
        </span>
      </Appear>
      <Appear at={DONE + 12}>
        <div style={{ fontSize: 48, fontWeight: 500, letterSpacing: -1 }}>{title}</div>
      </Appear>
      <Appear at={DONE + 22}>
        <div style={{ fontSize: 28, color: c.muted, lineHeight: 1.4 }}>{note}</div>
      </Appear>
    </div>
  );
}
