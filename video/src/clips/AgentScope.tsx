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
  fr: {
    title: 'Activité de l’agent IA',
    scopes: 'Autorisations',
    allowed: 'Autorisé',
    blocked: 'Bloqué',
    a1: 'Lire la facture n° 2231',
    a2: 'Consulter le fournisseur',
    a3: 'Créer un paiement de 48 000 €',
    why: 'Hors des autorisations de l’agent',
    human: 'Transmis à une personne pour validation',
  },
  it: {
    title: 'Attività dell’agente IA',
    scopes: 'Autorizzazioni',
    allowed: 'Consentito',
    blocked: 'Bloccato',
    a1: 'Leggere la fattura n. 2231',
    a2: 'Consultare i dati del fornitore',
    a3: 'Creare un pagamento di 48.000 €',
    why: 'Fuori dalle autorizzazioni dell’agente',
    human: 'Inoltrato a una persona per l’approvazione',
  },
  es: {
    title: 'Actividad del agente de IA',
    scopes: 'Permisos',
    allowed: 'Permitido',
    blocked: 'Bloqueado',
    a1: 'Leer la factura n.º 2231',
    a2: 'Consultar datos del proveedor',
    a3: 'Crear un pago de 48.000 €',
    why: 'Fuera de los permisos del agente',
    human: 'Enviado a una persona para su aprobación',
  },
  nl: {
    title: 'Activiteit van AI-agent',
    scopes: 'Rechten',
    allowed: 'Toegestaan',
    blocked: 'Geblokkeerd',
    a1: 'Factuur #2231 lezen',
    a2: 'Leveranciersgegevens opzoeken',
    a3: 'Betaling van € 48.000 aanmaken',
    why: 'Buiten de rechten van de agent',
    human: 'Ter goedkeuring naar een persoon gestuurd',
  },
  pl: {
    title: 'Aktywność agenta AI',
    scopes: 'Uprawnienia',
    allowed: 'Dozwolone',
    blocked: 'Zablokowane',
    a1: 'Odczyt faktury nr 2231',
    a2: 'Sprawdzenie danych dostawcy',
    a3: 'Utworzenie płatności 48 000 €',
    why: 'Poza uprawnieniami agenta',
    human: 'Przekazano człowiekowi do akceptacji',
  },
  pt: {
    title: 'Atividade do agente de IA',
    scopes: 'Permissões',
    allowed: 'Permitido',
    blocked: 'Bloqueado',
    a1: 'Ler a fatura n.º 2231',
    a2: 'Consultar dados do fornecedor',
    a3: 'Criar pagamento de 48 000 €',
    why: 'Fora das permissões do agente',
    human: 'Enviado a uma pessoa para aprovação',
  },
  sv: {
    title: 'AI-agentens aktivitet',
    scopes: 'Behörigheter',
    allowed: 'Tillåten',
    blocked: 'Blockerad',
    a1: 'Läs faktura nr 2231',
    a2: 'Slå upp leverantörsuppgifter',
    a3: 'Skapa betalning på 48 000 €',
    why: 'Utanför agentens behörigheter',
    human: 'Skickad till en person för godkännande',
  },
  da: {
    title: 'AI-agentens aktivitet',
    scopes: 'Rettigheder',
    allowed: 'Tilladt',
    blocked: 'Blokeret',
    a1: 'Læs faktura nr. 2231',
    a2: 'Slå leverandøroplysninger op',
    a3: 'Opret betaling på 48.000 €',
    why: 'Uden for agentens rettigheder',
    human: 'Sendt til en person til godkendelse',
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
