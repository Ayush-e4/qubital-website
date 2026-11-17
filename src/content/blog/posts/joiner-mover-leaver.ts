import type { PostContent } from '../types';

export const joinerMoverLeaver: Record<'en' | 'de', PostContent> = {
  en: {
    title: 'Joiner, mover, leaver: getting the identity lifecycle right',
    description:
      'How to automate joiner, mover and leaver processes: HR as the source of truth, birthright access, role changes without leftovers and leavers locked out on time.',
    excerpt:
      'Most access problems start with a lifecycle event nobody handled cleanly. How to design joiner, mover and leaver processes that grant access fast and take it away completely.',
    summary:
      'A sound joiner-mover-leaver process takes identity data from HR, grants birthright access automatically on day one, removes old access when people change roles, and disables every account on the last day. The mover step is where most leftover access comes from, so treat it as a leaver plus a joiner.',
    category: 'Identity Governance',
    keywords: [
      'joiner mover leaver',
      'JML process',
      'identity lifecycle management',
      'user provisioning automation',
      'access deprovisioning',
      'birthright access',
    ],
    body: [
      {
        type: 'p',
        text: 'Ask an auditor where access problems come from and the answer is usually the same: people who left but still have accounts, and people who changed jobs and kept everything they had before. Both are lifecycle failures. They happen when joiners, movers and leavers are handled by tickets, emails and good intentions instead of a defined process.',
      },
      { type: 'h2', text: 'Start with one source of truth' },
      {
        type: 'p',
        text: 'Every lifecycle process needs a trigger it can trust. For employees, that is the HR system: hire date, department, position, manager and end date. For contractors, it is often a separate system or a vendor management process, and it needs the same discipline, including an end date that is always filled in.',
      },
      {
        type: 'ul',
        items: [
          'Agree which system is authoritative for each identity type.',
          'Make the end date mandatory for every external identity.',
          'Fix data quality at the source, not with exceptions in the identity platform.',
        ],
      },
      { type: 'h2', text: 'Joiners: ready on day one' },
      {
        type: 'p',
        text: 'A new employee should be able to work on their first morning. That means birthright access, the accounts and groups everyone in a role gets, is created automatically before the start date. Anything beyond that goes through a request with an approver, so the baseline stays small and predictable.',
      },
      { type: 'h2', text: 'Movers: the step most companies get wrong' },
      {
        type: 'p',
        text: 'When someone moves from sales to finance, new access is requested quickly because the person needs it to work. The old access rarely gets removed, because nobody misses it. After a few moves, people collect permissions that no single role would ever justify, including toxic combinations.',
      },
      {
        type: 'callout',
        text: 'Treat a move as a leaver and a joiner at the same time: remove the access tied to the old role, grant the access of the new one, and give the manager a short window to request anything the person still needs from the old job.',
      },
      { type: 'h2', text: 'Leavers: complete and on time' },
      {
        type: 'p',
        text: 'On the last day, every account should be disabled, not only the directory account. That includes cloud applications with their own logins, privileged accounts, VPN and remote access, and access granted to external parties the person managed. Ownership of service accounts and shared mailboxes the leaver owned must move to someone else before they go.',
      },
      { type: 'h2', text: 'Measure the process, not just the tool' },
      {
        type: 'ul',
        items: [
          'Time from hire to working access for new joiners.',
          'Share of movers whose old access was removed within a set period.',
          'Accounts still active after the end date, by system.',
          'Number of manual lifecycle tickets per month.',
        ],
      },
      {
        type: 'p',
        text: 'These numbers show whether the automation works in practice, and they are exactly what auditors ask for. If you want to see where your lifecycle leaks today, we start with a short assessment of your HR data, your identity platform and the systems that sit outside it.',
      },
    ],
  },
  de: {
    title: 'Joiner, Mover, Leaver: den Identitätslebenszyklus richtig aufsetzen',
    description:
      'So automatisieren Sie Joiner-, Mover- und Leaver-Prozesse: HR als führendes System, Basisberechtigungen, Rollenwechsel ohne Altlasten und pünktlich gesperrte Leaver.',
    excerpt:
      'Die meisten Berechtigungsprobleme beginnen mit einem Lebenszyklusereignis, das niemand sauber behandelt hat. So gestalten Sie Joiner-, Mover- und Leaver-Prozesse, die schnell vergeben und vollständig entziehen.',
    summary:
      'Ein guter Joiner-Mover-Leaver-Prozess übernimmt Identitätsdaten aus dem HR-System, vergibt Basisberechtigungen automatisch zum ersten Arbeitstag, entzieht alte Rechte beim Rollenwechsel und sperrt am letzten Tag jedes Konto. Der Mover-Schritt verursacht die meisten Altlasten – behandeln Sie ihn als Leaver und Joiner zugleich.',
    category: 'Identity Governance',
    keywords: [
      'Joiner Mover Leaver',
      'JML-Prozess',
      'Identity Lifecycle Management',
      'automatisierte Benutzerverwaltung',
      'Berechtigungsentzug',
      'Basisberechtigungen',
    ],
    body: [
      {
        type: 'p',
        text: 'Fragen Sie einen Prüfer, woher Berechtigungsprobleme kommen, und die Antwort ist meist dieselbe: Menschen, die gegangen sind und noch Konten haben, und Menschen, die die Stelle gewechselt und alles Bisherige behalten haben. Beides sind Fehler im Lebenszyklus. Sie entstehen, wenn Eintritte, Wechsel und Austritte über Tickets, E-Mails und guten Willen laufen statt über einen definierten Prozess.',
      },
      { type: 'h2', text: 'Mit einem führenden System beginnen' },
      {
        type: 'p',
        text: 'Jeder Lebenszyklusprozess braucht einen Auslöser, dem er vertrauen kann. Für Mitarbeitende ist das das HR-System: Eintrittsdatum, Abteilung, Position, Führungskraft und Austrittsdatum. Für Externe ist es oft ein eigenes System oder ein Lieferantenprozess – mit derselben Disziplin, einschließlich eines Enddatums, das immer gepflegt ist.',
      },
      {
        type: 'ul',
        items: [
          'Legen Sie fest, welches System für welchen Identitätstyp führend ist.',
          'Machen Sie das Enddatum für jede externe Identität zur Pflicht.',
          'Beheben Sie Datenqualität an der Quelle, nicht mit Ausnahmen in der Identity-Plattform.',
        ],
      },
      { type: 'h2', text: 'Joiner: am ersten Tag arbeitsfähig' },
      {
        type: 'p',
        text: 'Neue Mitarbeitende sollten am ersten Morgen arbeiten können. Das heißt: Basisberechtigungen – die Konten und Gruppen, die jede Person in einer Rolle bekommt – werden vor dem Eintritt automatisch angelegt. Alles darüber hinaus läuft über einen Antrag mit Genehmigung, damit die Basis klein und vorhersehbar bleibt.',
      },
      { type: 'h2', text: 'Mover: der Schritt, den die meisten falsch machen' },
      {
        type: 'p',
        text: 'Wechselt jemand vom Vertrieb in die Finanzabteilung, werden neue Rechte schnell beantragt, weil die Person sie zum Arbeiten braucht. Die alten Rechte werden selten entfernt, weil sie niemand vermisst. Nach ein paar Wechseln sammeln Menschen Berechtigungen, die keine einzelne Rolle rechtfertigen würde – einschließlich kritischer Kombinationen.',
      },
      {
        type: 'callout',
        text: 'Behandeln Sie einen Wechsel als Leaver und Joiner zugleich: Rechte der alten Rolle entfernen, Rechte der neuen vergeben und der Führungskraft ein kurzes Zeitfenster geben, um zu beantragen, was aus der alten Aufgabe noch gebraucht wird.',
      },
      { type: 'h2', text: 'Leaver: vollständig und pünktlich' },
      {
        type: 'p',
        text: 'Am letzten Tag sollte jedes Konto gesperrt sein, nicht nur das Verzeichniskonto. Dazu gehören Cloud-Anwendungen mit eigenen Anmeldungen, privilegierte Konten, VPN und Fernzugriff sowie Zugänge für Externe, die die Person betreut hat. Die Verantwortung für Servicekonten und Gruppenpostfächer der austretenden Person muss vor dem Austritt an jemand anderen übergehen.',
      },
      { type: 'h2', text: 'Den Prozess messen, nicht nur das Werkzeug' },
      {
        type: 'ul',
        items: [
          'Zeit vom Eintritt bis zum arbeitsfähigen Zugang für neue Mitarbeitende.',
          'Anteil der Wechsel, bei denen alte Rechte innerhalb einer festen Frist entfernt wurden.',
          'Konten, die nach dem Enddatum noch aktiv sind, je System.',
          'Anzahl manueller Lebenszyklus-Tickets pro Monat.',
        ],
      },
      {
        type: 'p',
        text: 'Diese Kennzahlen zeigen, ob die Automatisierung in der Praxis funktioniert – und genau danach fragen Prüfer. Wenn Sie sehen möchten, wo Ihr Lebenszyklus heute Lücken hat, beginnen wir mit einer kurzen Bestandsaufnahme Ihrer HR-Daten, Ihrer Identity-Plattform und der Systeme außerhalb davon.',
      },
    ],
  },
};
