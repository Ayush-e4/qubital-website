import type { PostContent } from '../types';

export const nonHumanIdentityAiAgents: Record<'en' | 'de', PostContent> = {
  en: {
    title: 'Non-human identities and AI agents: closing the governance gap',
    description:
      'Service accounts, API keys, workloads and now AI agents far outnumber employees. A practical guide to governing non-human identities before they govern you.',
    excerpt:
      'Most organisations govern their employees carefully and their machines barely at all. AI agents make that gap urgent. Here is a practical way to close it.',
    category: 'Non-human identity',
    keywords: [
      'non-human identity governance',
      'NHI security',
      'AI agent identity',
      'service account management',
      'machine identity',
      'agentic AI security',
    ],
    body: [
      {
        type: 'p',
        text: 'Ask an IAM team how many employees have access to the finance system and they can usually answer within minutes. Ask how many service accounts, API keys and automation tokens can reach the same system and the room tends to go quiet. Non-human identities (NHIs) now far outnumber human ones in most organisations, yet they are usually governed the least.',
      },
      {
        type: 'p',
        text: 'AI agents raise the stakes. An agent that books travel, reconciles invoices or opens tickets needs credentials to act, and it acts at machine speed. If those credentials are broad, long-lived and owned by nobody, the agent becomes a very efficient way to misuse access.',
      },
      { type: 'h2', text: 'What counts as a non-human identity' },
      {
        type: 'ul',
        items: [
          'Service accounts in Active Directory, databases and applications.',
          'API keys, client secrets and certificates used for system-to-system integration.',
          'Workload identities in the cloud: managed identities, service principals, IAM roles.',
          'Bots and RPA users, and the technical users of integration platforms.',
          'AI agents, which combine all of the above and add autonomy.',
        ],
      },
      { type: 'h2', text: 'Why the usual IGA controls miss them' },
      {
        type: 'p',
        text: 'Classic identity governance is built around the joiner-mover-leaver lifecycle of people, fed by HR. Non-human identities have no HR record, no manager and no leaving date. They are created by developers or administrators to solve an immediate problem and then forgotten. The result is familiar: accounts nobody can explain, secrets that have not been rotated in years, and privileges far beyond what the integration needs.',
      },
      { type: 'h2', text: 'Five steps to bring NHIs under governance' },
      { type: 'h3', text: '1. Build an inventory' },
      {
        type: 'p',
        text: 'You cannot govern what you cannot see. Pull non-human accounts from directories, cloud tenants, databases, secret stores and CI/CD pipelines into one place. Mark each one with its type, the systems it can reach and when it was last used.',
      },
      { type: 'h3', text: '2. Assign a human owner to every identity' },
      {
        type: 'p',
        text: 'Every service account and agent needs an accountable person, and ideally a deputy. Ownership is what turns an anonymous account into something that can be reviewed, renewed or switched off. When an owner leaves, ownership moves through the same leaver process as their own access.',
      },
      { type: 'h3', text: '3. Give NHIs a lifecycle' },
      {
        type: 'p',
        text: 'Create non-human identities through a request with a stated purpose and an expiry date, and review them in the same certification campaigns as human access. Accounts that are unused for a defined period are disabled first, then removed.',
      },
      { type: 'h3', text: '4. Replace standing secrets with short-lived credentials' },
      {
        type: 'p',
        text: 'Wherever the platform allows it, prefer managed identities, workload identity federation or certificates with short validity over static passwords and keys. Where static secrets remain, keep them in a vault, rotate them automatically and never embed them in code.',
      },
      { type: 'h3', text: '5. Apply least privilege and watch behaviour' },
      {
        type: 'p',
        text: 'Scope each identity to the minimum it needs and alert on unusual use: a service account signing in interactively, a token used from an unexpected location, or an agent calling an API it has never touched before.',
      },
      { type: 'h2', text: 'AI agents: what is different' },
      {
        type: 'p',
        text: 'Agents add two complications. First, they often act on behalf of a person, so you need to know both who the agent is and whose authority it is using. Delegated access, for example through OAuth on-behalf-of flows, keeps the user’s own permissions as the upper limit instead of giving the agent a powerful technical account. Second, agents decide what to do next. That makes boundaries essential:',
      },
      {
        type: 'ul',
        items: [
          'A distinct identity per agent, never a shared technical user.',
          'Narrow, task-specific scopes and short token lifetimes.',
          'Human approval for high-impact actions such as payments or access changes.',
          'A complete audit trail of what the agent did, with which identity, on whose behalf.',
          'A tested way to revoke an agent’s access immediately.',
        ],
      },
      {
        type: 'callout',
        text: 'Rule of thumb: an AI agent should never be able to do something the person it acts for is not allowed to do, and every action should be traceable to both.',
      },
      { type: 'h2', text: 'Where to start' },
      {
        type: 'p',
        text: 'Start with the systems that matter most, such as finance, HR and production, and inventory the non-human identities that can reach them. Assign owners, remove what nobody claims, and move the rest into your existing review cycle. That alone usually removes a surprising amount of risk, and it lays the foundation for governing AI agents as they arrive.',
      },
      {
        type: 'p',
        text: 'We help organisations extend their identity governance to service accounts, workloads and AI agents, on the IGA platform they already run. If that is on your roadmap, let’s talk.',
      },
    ],
  },
  de: {
    title: 'Non-Human Identities und KI-Agenten: die Governance-Lücke schließen',
    description:
      'Service-Accounts, API-Schlüssel, Workloads und KI-Agenten sind längst zahlreicher als Mitarbeitende. Ein Leitfaden, wie Sie nicht-menschliche Identitäten steuern.',
    excerpt:
      'Die meisten Unternehmen steuern die Zugriffe ihrer Mitarbeitenden sorgfältig, die ihrer Maschinen kaum. KI-Agenten machen diese Lücke dringend. So schließen Sie sie.',
    category: 'Non-Human Identity',
    keywords: [
      'Non-Human Identity Governance',
      'NHI Sicherheit',
      'KI-Agenten Identität',
      'Service-Account-Verwaltung',
      'Maschinenidentitäten',
      'Agentic AI Sicherheit',
    ],
    body: [
      {
        type: 'p',
        text: 'Fragen Sie ein IAM-Team, wie viele Mitarbeitende Zugriff auf das Finanzsystem haben, kommt die Antwort meist in wenigen Minuten. Fragen Sie, wie viele Service-Accounts, API-Schlüssel und Automatisierungs-Token dasselbe System erreichen, wird es oft still. Nicht-menschliche Identitäten (Non-Human Identities, NHIs) sind in den meisten Unternehmen inzwischen deutlich zahlreicher als menschliche, werden aber am wenigsten gesteuert.',
      },
      {
        type: 'p',
        text: 'KI-Agenten erhöhen den Einsatz. Ein Agent, der Reisen bucht, Rechnungen abgleicht oder Tickets anlegt, braucht Zugangsdaten, um zu handeln, und er handelt in Maschinengeschwindigkeit. Sind diese Zugangsdaten weitreichend, langlebig und niemandem zugeordnet, wird der Agent zu einem sehr effizienten Weg, Berechtigungen zu missbrauchen.',
      },
      { type: 'h2', text: 'Was zählt als nicht-menschliche Identität' },
      {
        type: 'ul',
        items: [
          'Service-Accounts in Active Directory, Datenbanken und Anwendungen.',
          'API-Schlüssel, Client Secrets und Zertifikate für die Kommunikation zwischen Systemen.',
          'Workload-Identitäten in der Cloud: Managed Identities, Service Principals, IAM-Rollen.',
          'Bots und RPA-Benutzer sowie die technischen Benutzer von Integrationsplattformen.',
          'KI-Agenten, die all das kombinieren und Autonomie hinzufügen.',
        ],
      },
      { type: 'h2', text: 'Warum klassische IGA-Kontrollen sie übersehen' },
      {
        type: 'p',
        text: 'Klassische Identity Governance ist um den Joiner-Mover-Leaver-Lebenszyklus von Menschen gebaut, gespeist aus dem HR-System. Nicht-menschliche Identitäten haben keinen HR-Datensatz, keine Führungskraft und kein Austrittsdatum. Sie werden von Entwicklern oder Administratoren angelegt, um ein akutes Problem zu lösen, und danach vergessen. Das Ergebnis kennt jeder: Konten, die niemand erklären kann, Secrets, die seit Jahren nicht rotiert wurden, und Berechtigungen weit über dem, was die Integration braucht.',
      },
      { type: 'h2', text: 'Fünf Schritte, um NHIs in die Governance zu holen' },
      { type: 'h3', text: '1. Ein Inventar aufbauen' },
      {
        type: 'p',
        text: 'Was Sie nicht sehen, können Sie nicht steuern. Führen Sie nicht-menschliche Konten aus Verzeichnisdiensten, Cloud-Tenants, Datenbanken, Secret Stores und CI/CD-Pipelines an einem Ort zusammen. Erfassen Sie für jedes Konto Typ, erreichbare Systeme und letzte Nutzung.',
      },
      { type: 'h3', text: '2. Jeder Identität eine verantwortliche Person zuordnen' },
      {
        type: 'p',
        text: 'Jeder Service-Account und jeder Agent braucht eine verantwortliche Person, idealerweise mit Vertretung. Erst die Zuständigkeit macht aus einem anonymen Konto etwas, das geprüft, verlängert oder abgeschaltet werden kann. Verlässt die verantwortliche Person das Unternehmen, wandert die Zuständigkeit über denselben Austrittsprozess wie ihre eigenen Zugriffe.',
      },
      { type: 'h3', text: '3. NHIs einen Lebenszyklus geben' },
      {
        type: 'p',
        text: 'Legen Sie nicht-menschliche Identitäten über einen Antrag mit Zweck und Ablaufdatum an und prüfen Sie sie in denselben Rezertifizierungskampagnen wie menschliche Zugriffe. Konten, die über einen festgelegten Zeitraum ungenutzt sind, werden zuerst deaktiviert und dann entfernt.',
      },
      { type: 'h3', text: '4. Dauerhafte Secrets durch kurzlebige Zugangsdaten ersetzen' },
      {
        type: 'p',
        text: 'Wo die Plattform es erlaubt, sind Managed Identities, Workload Identity Federation oder kurzlebige Zertifikate statischen Passwörtern und Schlüsseln vorzuziehen. Wo statische Secrets bleiben, gehören sie in einen Vault, werden automatisch rotiert und niemals im Code abgelegt.',
      },
      { type: 'h3', text: '5. Least Privilege durchsetzen und Verhalten beobachten' },
      {
        type: 'p',
        text: 'Beschränken Sie jede Identität auf das Nötigste und alarmieren Sie bei ungewöhnlicher Nutzung: ein Service-Account, der sich interaktiv anmeldet, ein Token, das von einem unerwarteten Ort genutzt wird, oder ein Agent, der eine API aufruft, die er nie zuvor genutzt hat.',
      },
      { type: 'h2', text: 'KI-Agenten: was anders ist' },
      {
        type: 'p',
        text: 'Agenten bringen zwei zusätzliche Herausforderungen. Erstens handeln sie oft im Auftrag einer Person. Sie müssen also wissen, wer der Agent ist und wessen Befugnis er nutzt. Delegierter Zugriff, etwa über OAuth-On-Behalf-Of-Flows, hält die Berechtigungen der Person als Obergrenze, statt dem Agenten einen mächtigen technischen Account zu geben. Zweitens entscheiden Agenten selbst, was sie als Nächstes tun. Klare Grenzen sind deshalb unverzichtbar:',
      },
      {
        type: 'ul',
        items: [
          'Eine eigene Identität pro Agent, niemals ein geteilter technischer Benutzer.',
          'Enge, aufgabenbezogene Scopes und kurze Token-Laufzeiten.',
          'Menschliche Freigabe für folgenreiche Aktionen wie Zahlungen oder Berechtigungsänderungen.',
          'Ein vollständiger Audit-Trail: was der Agent getan hat, mit welcher Identität, in wessen Auftrag.',
          'Ein getesteter Weg, die Zugriffe eines Agenten sofort zu entziehen.',
        ],
      },
      {
        type: 'callout',
        text: 'Faustregel: Ein KI-Agent darf nie etwas tun können, was die Person, in deren Auftrag er handelt, nicht darf, und jede Aktion muss sich beiden zuordnen lassen.',
      },
      { type: 'h2', text: 'Wo Sie anfangen' },
      {
        type: 'p',
        text: 'Beginnen Sie mit den wichtigsten Systemen wie Finanzen, HR und Produktion und inventarisieren Sie die nicht-menschlichen Identitäten, die sie erreichen. Ordnen Sie Verantwortliche zu, entfernen Sie, was niemand beansprucht, und überführen Sie den Rest in Ihren bestehenden Prüfzyklus. Das allein reduziert meist überraschend viel Risiko und legt das Fundament, um KI-Agenten zu steuern, sobald sie kommen.',
      },
      {
        type: 'p',
        text: 'Wir unterstützen Unternehmen dabei, ihre Identity Governance auf Service-Accounts, Workloads und KI-Agenten auszuweiten, auf der IGA-Plattform, die sie bereits betreiben. Wenn das auf Ihrer Roadmap steht, sprechen Sie uns an.',
      },
    ],
  },
};
