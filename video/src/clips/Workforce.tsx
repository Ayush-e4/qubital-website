import { useCurrentFrame } from 'remotion';
import {
  Appear,
  Avatar,
  Icon,
  Panel,
  Stage,
  StatusDot,
  Tag,
  Window,
  useColors,
  useEnter,
  type ClipProps,
} from '../ui';

// Joiner and leaver: a new hire gets single sign-on and every app on day one,
// and loses all of it on their last day. 12s at 30fps.
export const WORKFORCE_FRAMES = 360;

const copy = {
  en: {
    title: 'Workforce identity',
    dayOne: 'Day 1',
    lastDay: 'Last day',
    team: 'Sales · starts today',
    teamLeft: 'Sales · leaving today',
    sso: 'Single sign-on and MFA set up',
    apps: ['Email & calendar', 'CRM', 'Team chat', 'VPN'],
    assigned: 'Assigned',
    removed: 'Removed',
    done: 'All access removed in 2 minutes',
    logged: 'Account disabled · logged for audit',
  },
  de: {
    title: 'Mitarbeiter-Identität',
    dayOne: 'Tag 1',
    lastDay: 'Letzter Tag',
    team: 'Vertrieb · startet heute',
    teamLeft: 'Vertrieb · verlässt uns heute',
    sso: 'Single Sign-on und MFA eingerichtet',
    apps: ['E-Mail & Kalender', 'CRM', 'Team-Chat', 'VPN'],
    assigned: 'Zugewiesen',
    removed: 'Entzogen',
    done: 'Alle Zugriffe in 2 Minuten entzogen',
    logged: 'Konto deaktiviert · für Audit protokolliert',
  },
};

const LEAVE = 190;

export function Workforce({ theme, locale }: ClipProps) {
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
  const leaving = frame >= LEAVE;

  return (
    <Window
      title={t.title}
      aside={leaving ? <Tag tone="red">{t.lastDay}</Tag> : <Tag tone="violet">{t.dayOne}</Tag>}
    >
      <Appear at={10}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Avatar initials="LS" />
          <div>
            <div style={{ fontSize: 30, fontWeight: 500 }}>Lena Schmidt</div>
            <div style={{ fontSize: 22, color: c.muted, marginTop: 4 }}>
              {leaving ? t.teamLeft : t.team}
            </div>
          </div>
        </div>
      </Appear>

      <Appear at={30}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <StatusDot from={30} resolveAt={55} result={leaving ? 'no' : 'ok'} />
          <span
            style={{
              fontSize: 28,
              color: leaving ? c.faint : c.fg,
              textDecoration: leaving ? 'line-through' : 'none',
            }}
          >
            {t.sso}
          </span>
        </div>
      </Appear>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {t.apps.map((app, i) => (
          <AppTile
            key={app}
            name={app}
            at={60 + i * 10}
            assignAt={80 + i * 18}
            removeAt={LEAVE + 20 + i * 14}
            assigned={t.assigned}
            removed={t.removed}
          />
        ))}
      </div>

      <div style={{ height: 90, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Appear at={LEAVE + 85}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 28, fontWeight: 500 }}>
            <Icon name="lock" size={30} color={c.cyan} />
            {t.done}
          </div>
        </Appear>
        <Appear at={LEAVE + 105}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 24, color: c.muted }}>
            <Icon name="clock" size={26} color={c.muted} />
            {t.logged}
          </div>
        </Appear>
      </div>
    </Window>
  );
}

function AppTile({
  name,
  at,
  assignAt,
  removeAt,
  assigned,
  removed,
}: {
  name: string;
  at: number;
  assignAt: number;
  removeAt: number;
  assigned: string;
  removed: string;
}) {
  const c = useColors();
  const frame = useCurrentFrame();
  const gone = frame >= removeAt;
  const popGone = useEnter(removeAt, 14);
  return (
    <Appear at={at}>
      <Panel
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          padding: '20px 22px',
          opacity: gone ? 1 - popGone * 0.35 : 1,
        }}
      >
        <span
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: gone ? c.line : `linear-gradient(135deg, ${c.violet}55, ${c.cyan}44)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            fontWeight: 600,
            color: gone ? c.faint : c.fg,
            flexShrink: 0,
          }}
        >
          {name[0]}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 26, fontWeight: 500 }}>{name}</div>
          <div style={{ fontSize: 20, marginTop: 4, color: gone ? c.red : frame >= assignAt ? c.green : c.faint }}>
            {gone ? removed : frame >= assignAt ? assigned : '…'}
          </div>
        </div>
      </Panel>
    </Appear>
  );
}
