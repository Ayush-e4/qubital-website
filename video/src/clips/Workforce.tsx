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
  fr: {
    title: 'Identité des collaborateurs',
    dayOne: 'Jour 1',
    lastDay: 'Dernier jour',
    team: 'Ventes · arrive aujourd’hui',
    teamLeft: 'Ventes · part aujourd’hui',
    sso: 'Authentification unique et MFA configurées',
    apps: ['E-mail et agenda', 'CRM', 'Messagerie d’équipe', 'VPN'],
    assigned: 'Attribué',
    removed: 'Retiré',
    done: 'Tous les accès retirés en 2 minutes',
    logged: 'Compte désactivé · journalisé pour l’audit',
  },
  it: {
    title: 'Identità dei dipendenti',
    dayOne: 'Giorno 1',
    lastDay: 'Ultimo giorno',
    team: 'Vendite · inizia oggi',
    teamLeft: 'Vendite · lascia oggi',
    sso: 'Single sign-on e MFA configurati',
    apps: ['Email e calendario', 'CRM', 'Chat del team', 'VPN'],
    assigned: 'Assegnato',
    removed: 'Rimosso',
    done: 'Tutti gli accessi rimossi in 2 minuti',
    logged: 'Account disattivato · registrato per l’audit',
  },
  es: {
    title: 'Identidad de empleados',
    dayOne: 'Día 1',
    lastDay: 'Último día',
    team: 'Ventas · empieza hoy',
    teamLeft: 'Ventas · se va hoy',
    sso: 'Inicio de sesión único y MFA configurados',
    apps: ['Correo y calendario', 'CRM', 'Chat del equipo', 'VPN'],
    assigned: 'Asignado',
    removed: 'Retirado',
    done: 'Todos los accesos retirados en 2 minutos',
    logged: 'Cuenta desactivada · registrada para auditoría',
  },
  nl: {
    title: 'Identiteit van medewerkers',
    dayOne: 'Dag 1',
    lastDay: 'Laatste dag',
    team: 'Sales · begint vandaag',
    teamLeft: 'Sales · vertrekt vandaag',
    sso: 'Single sign-on en MFA ingericht',
    apps: ['E-mail en agenda', 'CRM', 'Teamchat', 'VPN'],
    assigned: 'Toegewezen',
    removed: 'Verwijderd',
    done: 'Alle toegang binnen 2 minuten verwijderd',
    logged: 'Account uitgeschakeld · vastgelegd voor audit',
  },
  pl: {
    title: 'Tożsamość pracowników',
    dayOne: 'Dzień 1',
    lastDay: 'Ostatni dzień',
    team: 'Sprzedaż · zaczyna dziś',
    teamLeft: 'Sprzedaż · odchodzi dziś',
    sso: 'Skonfigurowano SSO i MFA',
    apps: ['Poczta i kalendarz', 'CRM', 'Czat zespołu', 'VPN'],
    assigned: 'Przydzielono',
    removed: 'Odebrano',
    done: 'Wszystkie dostępy odebrane w 2 minuty',
    logged: 'Konto wyłączone · zapisano do audytu',
  },
  pt: {
    title: 'Identidade dos colaboradores',
    dayOne: 'Dia 1',
    lastDay: 'Último dia',
    team: 'Vendas · começa hoje',
    teamLeft: 'Vendas · sai hoje',
    sso: 'Início de sessão único e MFA configurados',
    apps: ['E-mail e calendário', 'CRM', 'Chat da equipa', 'VPN'],
    assigned: 'Atribuído',
    removed: 'Removido',
    done: 'Todos os acessos removidos em 2 minutos',
    logged: 'Conta desativada · registada para auditoria',
  },
  sv: {
    title: 'Medarbetaridentitet',
    dayOne: 'Dag 1',
    lastDay: 'Sista dagen',
    team: 'Sälj · börjar idag',
    teamLeft: 'Sälj · slutar idag',
    sso: 'Enkel inloggning och MFA klart',
    apps: ['E-post och kalender', 'CRM', 'Teamchatt', 'VPN'],
    assigned: 'Tilldelad',
    removed: 'Borttagen',
    done: 'All åtkomst borttagen på 2 minuter',
    logged: 'Kontot inaktiverat · loggat för revision',
  },
  da: {
    title: 'Medarbejderidentitet',
    dayOne: 'Dag 1',
    lastDay: 'Sidste dag',
    team: 'Salg · starter i dag',
    teamLeft: 'Salg · stopper i dag',
    sso: 'Single sign-on og MFA sat op',
    apps: ['E-mail og kalender', 'CRM', 'Teamchat', 'VPN'],
    assigned: 'Tildelt',
    removed: 'Fjernet',
    done: 'Al adgang fjernet på 2 minutter',
    logged: 'Konto deaktiveret · logget til revision',
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
