import { useCurrentFrame } from 'remotion';
import {
  Appear,
  Avatar,
  Button,
  CheckRow,
  Cursor,
  Icon,
  Label,
  Panel,
  Stage,
  Tag,
  Window,
  useColors,
  type ClipProps,
} from '../ui';

// A new joiner requests access, policy checks run, the manager approves, and
// the grant is provisioned and logged. 13s at 30fps.
export const ACCESS_REQUEST_FRAMES = 390;

const copy = {
  en: {
    title: 'Access request',
    pending: 'Pending',
    approved: 'Approved',
    team: 'Finance · joined 3 days ago',
    requests: 'Requests',
    access: 'ERP · Accounts payable clerk',
    check1: 'Role matches department',
    check2: 'No segregation-of-duties conflict',
    check3: 'Manager approval',
    deny: 'Deny',
    approve: 'Approve',
    provisioned: 'Provisioned in ERP',
    logged: 'Logged for audit · review in 90 days',
  },
  de: {
    title: 'Zugriffsanfrage',
    pending: 'Offen',
    approved: 'Genehmigt',
    team: 'Finanzen · seit 3 Tagen im Team',
    requests: 'Beantragt',
    access: 'ERP · Kreditorenbuchhaltung',
    check1: 'Rolle passt zur Abteilung',
    check2: 'Kein Konflikt bei der Funktionstrennung',
    check3: 'Freigabe durch Führungskraft',
    deny: 'Ablehnen',
    approve: 'Genehmigen',
    provisioned: 'Im ERP bereitgestellt',
    logged: 'Für Audit protokolliert · Rezertifizierung in 90 Tagen',
  },
};

const CLICK = 205;

export function AccessRequest({ theme, locale }: ClipProps) {
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
  const approved = frame >= CLICK + 6;

  return (
    <Window
      title={t.title}
      aside={
        approved ? <Tag tone="green">{t.approved}</Tag> : <Tag tone="muted">{t.pending} · #1042</Tag>
      }
    >
      <Appear at={10}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Avatar initials="AM" />
          <div>
            <div style={{ fontSize: 30, fontWeight: 500 }}>Anna Müller</div>
            <div style={{ fontSize: 22, color: c.muted, marginTop: 4 }}>{t.team}</div>
          </div>
        </div>
      </Appear>

      <Appear at={30}>
        <Panel>
          <Label>{t.requests}</Label>
          <div style={{ fontSize: 30, fontWeight: 500 }}>{t.access}</div>
        </Panel>
      </Appear>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, padding: '6px 0' }}>
        <CheckRow at={65} resolveAt={88} label={t.check1} />
        <CheckRow at={95} resolveAt={118} label={t.check2} />
        <CheckRow
          at={125}
          resolveAt={CLICK + 6}
          label={t.check3}
          detail={approved ? 'Thomas Weber' : undefined}
        />
      </div>

      <div style={{ height: 96, position: 'relative' }}>
        {!approved ? (
          <Appear at={140} style={{ display: 'flex', gap: 16, justifyContent: 'flex-end' }}>
            <Button>{t.deny}</Button>
            <span style={{ position: 'relative' }}>
              <Button primary pressAt={CLICK}>
                {t.approve}
              </Button>
              <Cursor from={[-320, -150]} to={[110, 34]} start={160} end={198} clickAt={CLICK} />
            </span>
          </Appear>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Appear at={CLICK + 20}>
              <FooterLine icon="check" text={`${t.provisioned} · 14:02`} />
            </Appear>
            <Appear at={CLICK + 50}>
              <FooterLine icon="clock" text={t.logged} />
            </Appear>
          </div>
        )}
      </div>
    </Window>
  );
}

function FooterLine({ icon, text }: { icon: 'check' | 'clock'; text: string }) {
  const c = useColors();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 24, color: c.muted }}>
      <Icon name={icon} size={26} color={icon === 'check' ? c.green : c.cyan} />
      {text}
    </div>
  );
}
