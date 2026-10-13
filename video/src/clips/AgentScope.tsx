import { useCurrentFrame } from 'remotion';
import {
  Appear,
  Icon,
  Label,
  Panel,
  Stage,
  StatusDot,
  Tag,
  Window,
  fonts,
  useColors,
  type ClipProps,
} from '../ui';

// An AI agent works inside its permissions, tries something outside them, is
// blocked, and the action goes to a person. 12s at 30fps.
export const AGENT_SCOPE_FRAMES = 360;

const copy = {
  en: {
    title: 'AI agent activity',
    scopes: 'Permissions',
    allowed: 'Allowed',
    blocked: 'Blocked',
    a1: 'Read invoice #2231',
    a2: 'Look up vendor details',
    a3: 'Create payment €48,000',
    why: 'Outside the agent’s permissions',
    human: 'Sent to a person for approval',
  },
  de: {
    title: 'Aktivität des KI-Agenten',
    scopes: 'Berechtigungen',
    allowed: 'Erlaubt',
    blocked: 'Blockiert',
    a1: 'Rechnung #2231 lesen',
    a2: 'Lieferantendaten abrufen',
    a3: 'Zahlung über 48.000 € anlegen',
    why: 'Außerhalb der Berechtigungen des Agenten',
    human: 'Zur Freigabe an einen Menschen übergeben',
  },
};

const scopes: { name: string; ok: boolean }[] = [
  { name: 'invoices:read', ok: true },
  { name: 'vendors:read', ok: true },
  { name: 'payments:create', ok: false },
];

export function AgentScope({ theme, locale }: ClipProps) {
  return (
    <Stage theme={theme}>
      <Body locale={locale} />
    </Stage>
  );
}

function Body({ locale }: Pick<ClipProps, 'locale'>) {
  const t = copy[locale];
  const c = useColors();

  return (
    <Window
      title={t.title}
      aside={
        <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Icon name="bot" size={26} color={c.violet} />
          <span style={{ fontFamily: fonts.mono, fontSize: 22, color: c.muted }}>invoice-assistant</span>
        </span>
      }
    >
      <Appear at={12}>
        <Panel>
          <Label>{t.scopes}</Label>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 6 }}>
            {scopes.map((s) => (
              <span
                key={s.name}
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 22,
                  padding: '8px 14px',
                  borderRadius: 8,
                  border: `1px solid ${s.ok ? c.lineStrong : c.line}`,
                  color: s.ok ? c.fg : c.faint,
                  textDecoration: s.ok ? 'none' : 'line-through',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <Icon name={s.ok ? 'check' : 'x'} size={18} color={s.ok ? c.green : c.faint} strokeWidth={2.6} />
                {s.name}
              </span>
            ))}
          </div>
        </Panel>
      </Appear>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Action at={60} resolveAt={82} label={t.a1} result="ok" tag={t.allowed} />
        <Action at={100} resolveAt={122} label={t.a2} result="ok" tag={t.allowed} />
        <Action at={145} resolveAt={200} label={t.a3} result="no" tag={t.blocked} highlight />
      </div>

      <div style={{ height: 96, display: 'flex', flexDirection: 'column', gap: 12, paddingLeft: 4 }}>
        <Appear at={212}>
          <div style={{ fontSize: 24, color: c.red }}>{t.why}</div>
        </Appear>
        <Appear at={240}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 28, fontWeight: 500 }}>
            <Icon name="user" size={30} color={c.cyan} />
            {t.human}
          </div>
        </Appear>
      </div>
    </Window>
  );
}

function Action({
  at,
  resolveAt,
  label,
  result,
  tag,
  highlight,
}: {
  at: number;
  resolveAt: number;
  label: string;
  result: 'ok' | 'no';
  tag: string;
  highlight?: boolean;
}) {
  const c = useColors();
  const frame = useCurrentFrame();
  const resolved = frame >= resolveAt;
  return (
    <Appear at={at}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          padding: '18px 22px',
          borderRadius: 16,
          border: `1px solid ${highlight && resolved ? `${c.red}66` : c.line}`,
          background: highlight && resolved ? `${c.red}10` : 'transparent',
        }}
      >
        <StatusDot from={at} resolveAt={resolveAt} result={result} />
        <span style={{ fontSize: 28, flex: 1 }}>{label}</span>
        {resolved && <Tag tone={result === 'ok' ? 'green' : 'red'}>{tag}</Tag>}
      </div>
    </Appear>
  );
}
