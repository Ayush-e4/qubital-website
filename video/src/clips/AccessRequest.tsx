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
  fr: {
    title: 'Demande d’accès',
    pending: 'En attente',
    approved: 'Approuvée',
    team: 'Finance · arrivée il y a 3 jours',
    requests: 'Demande',
    access: 'ERP · Comptable fournisseurs',
    check1: 'Le rôle correspond au service',
    check2: 'Aucun conflit de séparation des tâches',
    check3: 'Validation du responsable',
    deny: 'Refuser',
    approve: 'Approuver',
    provisioned: 'Provisionné dans l’ERP',
    logged: 'Journalisé pour l’audit · revue dans 90 jours',
  },
  it: {
    title: 'Richiesta di accesso',
    pending: 'In attesa',
    approved: 'Approvata',
    team: 'Finanza · in azienda da 3 giorni',
    requests: 'Richiede',
    access: 'ERP · Contabilità fornitori',
    check1: 'Il ruolo corrisponde al reparto',
    check2: 'Nessun conflitto di separazione dei compiti',
    check3: 'Approvazione del responsabile',
    deny: 'Rifiuta',
    approve: 'Approva',
    provisioned: 'Abilitato nell’ERP',
    logged: 'Registrato per l’audit · revisione tra 90 giorni',
  },
  es: {
    title: 'Solicitud de acceso',
    pending: 'Pendiente',
    approved: 'Aprobada',
    team: 'Finanzas · se incorporó hace 3 días',
    requests: 'Solicita',
    access: 'ERP · Cuentas por pagar',
    check1: 'El rol coincide con el departamento',
    check2: 'Sin conflicto de segregación de funciones',
    check3: 'Aprobación del responsable',
    deny: 'Rechazar',
    approve: 'Aprobar',
    provisioned: 'Aprovisionado en el ERP',
    logged: 'Registrado para auditoría · revisión en 90 días',
  },
  nl: {
    title: 'Toegangsaanvraag',
    pending: 'In behandeling',
    approved: 'Goedgekeurd',
    team: 'Financiën · sinds 3 dagen in dienst',
    requests: 'Vraagt aan',
    access: 'ERP · Crediteurenadministratie',
    check1: 'Rol past bij de afdeling',
    check2: 'Geen conflict in functiescheiding',
    check3: 'Goedkeuring door leidinggevende',
    deny: 'Afwijzen',
    approve: 'Goedkeuren',
    provisioned: 'Ingericht in het ERP',
    logged: 'Vastgelegd voor audit · herbeoordeling over 90 dagen',
  },
  pl: {
    title: 'Wniosek o dostęp',
    pending: 'Oczekuje',
    approved: 'Zatwierdzony',
    team: 'Finanse · w zespole od 3 dni',
    requests: 'Wnioskuje o',
    access: 'ERP · Rozrachunki z dostawcami',
    check1: 'Rola pasuje do działu',
    check2: 'Brak konfliktu podziału obowiązków',
    check3: 'Akceptacja przełożonego',
    deny: 'Odrzuć',
    approve: 'Zatwierdź',
    provisioned: 'Nadano w systemie ERP',
    logged: 'Zapisano do audytu · przegląd za 90 dni',
  },
  pt: {
    title: 'Pedido de acesso',
    pending: 'Pendente',
    approved: 'Aprovado',
    team: 'Finanças · entrou há 3 dias',
    requests: 'Pede',
    access: 'ERP · Contas a pagar',
    check1: 'A função corresponde ao departamento',
    check2: 'Sem conflito de segregação de funções',
    check3: 'Aprovação da chefia',
    deny: 'Recusar',
    approve: 'Aprovar',
    provisioned: 'Provisionado no ERP',
    logged: 'Registado para auditoria · revisão em 90 dias',
  },
  sv: {
    title: 'Behörighetsbegäran',
    pending: 'Väntar',
    approved: 'Godkänd',
    team: 'Ekonomi · började för 3 dagar sedan',
    requests: 'Begär',
    access: 'ERP · Leverantörsreskontra',
    check1: 'Rollen matchar avdelningen',
    check2: 'Ingen konflikt i ansvarsfördelningen',
    check3: 'Godkännande av chef',
    deny: 'Neka',
    approve: 'Godkänn',
    provisioned: 'Tilldelad i ERP',
    logged: 'Loggad för revision · omprövas om 90 dagar',
  },
  da: {
    title: 'Adgangsanmodning',
    pending: 'Afventer',
    approved: 'Godkendt',
    team: 'Økonomi · startede for 3 dage siden',
    requests: 'Anmoder om',
    access: 'ERP · Kreditorbogholder',
    check1: 'Rollen passer til afdelingen',
    check2: 'Ingen konflikt i funktionsadskillelse',
    check3: 'Godkendelse fra leder',
    deny: 'Afvis',
    approve: 'Godkend',
    provisioned: 'Tildelt i ERP',
    logged: 'Logget til revision · gennemgang om 90 dage',
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
