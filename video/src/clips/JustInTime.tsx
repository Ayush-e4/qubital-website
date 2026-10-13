import { interpolate, useCurrentFrame } from 'remotion';
import {
  Appear,
  Avatar,
  Icon,
  Label,
  Panel,
  Stage,
  Tag,
  Window,
  fonts,
  useColors,
  type ClipProps,
} from '../ui';

// Just-in-time privileged access: admin rights for two hours, the session is
// recorded, and the rights are removed on their own. 12s at 30fps.
export const JUST_IN_TIME_FRAMES = 360;

const copy = {
  en: {
    title: 'Privileged access',
    team: 'Platform team',
    requests: 'Admin access',
    reason: 'Reason',
    reasonValue: 'Incident INC-4821',
    duration: 'Duration',
    durationValue: '2 hours',
    approved: 'Approved by on-call lead',
    recording: 'Session recorded',
    remaining: 'Time left',
    revoked: 'Access removed automatically',
    rotated: 'Admin password rotated',
    active: 'Active',
    ended: 'Ended',
  },
  de: {
    title: 'Privilegierter Zugriff',
    team: 'Plattform-Team',
    requests: 'Admin-Zugriff',
    reason: 'Grund',
    reasonValue: 'Incident INC-4821',
    duration: 'Dauer',
    durationValue: '2 Stunden',
    approved: 'Freigegeben durch On-Call-Lead',
    recording: 'Sitzung wird aufgezeichnet',
    remaining: 'Verbleibend',
    revoked: 'Zugriff automatisch entzogen',
    rotated: 'Admin-Passwort rotiert',
    active: 'Aktiv',
    ended: 'Beendet',
  },
};

const SESSION_START = 120;
const SESSION_END = 260;

export function JustInTime({ theme, locale }: ClipProps) {
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
  const ended = frame >= SESSION_END;
  const left = interpolate(frame, [SESSION_START, SESSION_END], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const seconds = Math.round(left * 7200);
  const clock = `${Math.floor(seconds / 3600)}:${String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  const blink = Math.floor(frame / 15) % 2 === 0;

  return (
    <Window
      title={t.title}
      aside={
        frame < SESSION_START ? (
          <Tag tone="muted">prod-db-01</Tag>
        ) : ended ? (
          <Tag tone="muted">{t.ended}</Tag>
        ) : (
          <Tag tone="green">{t.active}</Tag>
        )
      }
    >
      <Appear at={10}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Avatar initials="JK" />
          <div>
            <div style={{ fontSize: 30, fontWeight: 500 }}>Jonas Keller</div>
            <div style={{ fontSize: 22, color: c.muted, marginTop: 4 }}>{t.team}</div>
          </div>
        </div>
      </Appear>

      <Appear at={28}>
        <Panel style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 0.8fr', gap: 24 }}>
          <div>
            <Label>{t.requests}</Label>
            <div style={{ fontSize: 28, fontWeight: 500, fontFamily: fonts.mono }}>prod-db-01</div>
          </div>
          <div>
            <Label>{t.reason}</Label>
            <div style={{ fontSize: 26 }}>{t.reasonValue}</div>
          </div>
          <div>
            <Label>{t.duration}</Label>
            <div style={{ fontSize: 26 }}>{t.durationValue}</div>
          </div>
        </Panel>
      </Appear>

      <Appear at={80}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 26 }}>
          <Icon name="check" size={28} color={c.green} strokeWidth={2.6} />
          {t.approved}
        </div>
      </Appear>

      <Appear at={SESSION_START - 10}>
        <Panel>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 24 }}>
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 7,
                  background: ended ? c.faint : c.red,
                  opacity: ended || blink ? 1 : 0.3,
                }}
              />
              {t.recording}
            </div>
            <div style={{ fontSize: 22, color: c.muted }}>
              {t.remaining}{' '}
              <span style={{ fontFamily: fonts.mono, fontSize: 30, color: c.fg, marginLeft: 8 }}>
                {clock}
              </span>
            </div>
          </div>
          <div style={{ height: 10, borderRadius: 5, background: c.line, marginTop: 20, overflow: 'hidden' }}>
            <div
              style={{
                width: `${left * 100}%`,
                height: '100%',
                background: `linear-gradient(90deg, ${c.violet}, ${c.cyan})`,
              }}
            />
          </div>
        </Panel>
      </Appear>

      <div style={{ height: 90, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Appear at={SESSION_END + 8}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 28, fontWeight: 500 }}>
            <Icon name="lock" size={30} color={c.cyan} />
            {t.revoked}
          </div>
        </Appear>
        <Appear at={SESSION_END + 30}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 24, color: c.muted }}>
            <Icon name="key" size={26} color={c.muted} />
            {t.rotated}
          </div>
        </Appear>
      </div>
    </Window>
  );
}
