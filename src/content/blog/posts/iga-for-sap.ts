import type { PostContent } from '../types';

export const igaForSap: Record<'en' | 'de', PostContent> = {
  en: {
    title: 'Identity governance for SAP landscapes: what to get right',
    description:
      'SAP roles, segregation of duties, emergency access and the end of SAP Identity Management: what an IGA programme for SAP needs to get right.',
    excerpt:
      'SAP is where the money moves, so it is where access mistakes hurt most. A practical look at roles, segregation of duties, emergency access and the move away from SAP IdM.',
    category: 'SAP',
    keywords: [
      'SAP identity governance',
      'SAP IGA',
      'SAP IdM replacement',
      'SAP Cloud Identity Services',
      'segregation of duties SAP',
      'S/4HANA access management',
    ],
    body: [
      {
        type: 'p',
        text: 'In most companies, SAP is where orders, invoices, payments and payroll live. That makes it the system where access mistakes are most expensive and where auditors look first. Yet SAP access is often managed separately from the rest of identity governance, with its own tools, its own team and its own spreadsheets.',
      },
      {
        type: 'p',
        text: 'Bringing SAP into a central identity governance and administration (IGA) programme pays off in faster onboarding, cleaner audits and fewer toxic combinations of access. It also has a new deadline: SAP Identity Management (SAP IdM) reaches the end of mainstream maintenance in 2027, so many organisations are choosing their next platform now.',
      },
      { type: 'h2', text: '1. Start with the role model, not the connector' },
      {
        type: 'p',
        text: 'Connecting an IGA platform to SAP is the easy part. The hard part is what you connect. Many SAP systems carry years of single and composite roles that grew project by project. Provisioning that chaos faster does not help.',
      },
      {
        type: 'ul',
        items: [
          'Clean up unused and duplicate roles before you automate them.',
          'Design business roles that bundle SAP roles with access in other systems, so a new buyer gets everything they need in one request.',
          'Describe every requestable role in business language, not technical role names.',
        ],
      },
      { type: 'h2', text: '2. Treat segregation of duties as a design rule' },
      {
        type: 'p',
        text: 'Segregation of duties (SoD) prevents one person from, for example, creating a vendor and paying it. In SAP these conflicts are defined down to transactions and authorisation objects, and many companies already run SAP GRC Access Control or a similar tool for risk analysis.',
      },
      {
        type: 'p',
        text: 'The goal is to check SoD before access is granted, not to find violations in the next audit. A sound setup runs the risk analysis during the request, shows the approver the conflict in plain language, and requires a documented mitigating control when a conflict is accepted. Whether the analysis runs in GRC or in the IGA platform matters less than making sure both use the same rule set.',
      },
      { type: 'h2', text: '3. Control emergency access' },
      {
        type: 'p',
        text: 'Every SAP landscape needs a way to fix production problems quickly, often called firefighter or emergency access. Without control it becomes a permanent back door. Emergency access should be requested for a reason, granted for a limited time, fully logged, and reviewed afterwards by someone other than the user.',
      },
      { type: 'h2', text: '4. Plan for hybrid: S/4HANA, BTP and the cloud' },
      {
        type: 'p',
        text: 'Modern SAP landscapes mix on-premises ABAP systems, S/4HANA, SAP Business Technology Platform and SaaS applications such as SuccessFactors or Ariba. SAP Cloud Identity Services connect these worlds: Identity Authentication (IAS) handles sign-in and single sign-on, and Identity Provisioning (IPS) moves users and groups between systems.',
      },
      {
        type: 'p',
        text: 'A central IGA platform should sit above this layer. It decides who should have which access and why, and IPS or direct connectors carry out the decision. Keep that split clear and you avoid two systems competing to be the source of truth.',
      },
      { type: 'h2', text: '5. Use the SAP IdM end of life as a reset' },
      {
        type: 'p',
        text: 'SAP has announced the end of mainstream maintenance for SAP IdM in 2027 and points customers to Microsoft Entra ID as a successor for many identity scenarios. For governance-heavy requirements such as SoD-aware requests, certifications and complex role models, many organisations combine Entra ID with a dedicated IGA platform.',
      },
      {
        type: 'p',
        text: 'Whatever you choose, do not migrate one-to-one. Use the move to retire custom scripts, simplify the role model and bring SAP into the same request and review processes as everything else.',
      },
      {
        type: 'callout',
        text: 'Checklist: clean role model, SoD checked at request time, controlled emergency access, a clear split between IGA and SAP Cloud Identity Services, and an SAP IdM exit plan well before 2027.',
      },
      { type: 'h2', text: 'How we help' },
      {
        type: 'p',
        text: 'We have connected SAP to identity governance platforms for years, from role redesign to SoD-aware provisioning and SAP Cloud Identity Services. If you are planning your SAP IdM successor or want SAP access under the same governance as the rest of your landscape, we are happy to help you plan the route.',
      },
    ],
  },
  de: {
    title: 'Identity Governance für SAP-Landschaften: worauf es ankommt',
    description:
      'SAP-Rollen, Funktionstrennung, Notfallzugriffe und das Ende von SAP Identity Management: worauf es bei einem IGA-Programm für SAP ankommt.',
    excerpt:
      'In SAP fließt das Geld, deshalb schmerzen Berechtigungsfehler dort am meisten. Ein praktischer Blick auf Rollen, Funktionstrennung, Notfallzugriffe und den Abschied von SAP IdM.',
    category: 'SAP',
    keywords: [
      'SAP Identity Governance',
      'SAP IGA',
      'SAP IdM Nachfolger',
      'SAP Cloud Identity Services',
      'Funktionstrennung SAP',
      'S/4HANA Berechtigungsmanagement',
    ],
    body: [
      {
        type: 'p',
        text: 'In den meisten Unternehmen liegen Bestellungen, Rechnungen, Zahlungen und Gehaltsabrechnung in SAP. Damit ist SAP das System, in dem Berechtigungsfehler am teuersten sind und auf das Prüfer zuerst schauen. Trotzdem wird SAP-Zugriff oft getrennt vom Rest der Identity Governance verwaltet, mit eigenen Werkzeugen, eigenem Team und eigenen Tabellen.',
      },
      {
        type: 'p',
        text: 'SAP in ein zentrales Programm für Identity Governance and Administration (IGA) zu holen, zahlt sich aus: schnelleres Onboarding, sauberere Audits und weniger kritische Berechtigungskombinationen. Dazu kommt eine neue Frist: SAP Identity Management (SAP IdM) erreicht 2027 das Ende der Mainstream-Wartung, und viele Unternehmen wählen jetzt ihre nächste Plattform.',
      },
      { type: 'h2', text: '1. Mit dem Rollenmodell beginnen, nicht mit dem Konnektor' },
      {
        type: 'p',
        text: 'Eine IGA-Plattform an SAP anzubinden ist der einfache Teil. Schwierig ist, was Sie anbinden. Viele SAP-Systeme tragen Einzel- und Sammelrollen aus Jahren, die Projekt für Projekt gewachsen sind. Dieses Durcheinander schneller zu provisionieren hilft niemandem.',
      },
      {
        type: 'ul',
        items: [
          'Bereinigen Sie ungenutzte und doppelte Rollen, bevor Sie automatisieren.',
          'Entwerfen Sie Geschäftsrollen, die SAP-Rollen mit Zugriffen in anderen Systemen bündeln, damit ein neuer Einkäufer alles Nötige mit einem Antrag erhält.',
          'Beschreiben Sie jede beantragbare Rolle in fachlicher Sprache, nicht mit technischen Rollennamen.',
        ],
      },
      { type: 'h2', text: '2. Funktionstrennung als Gestaltungsregel behandeln' },
      {
        type: 'p',
        text: 'Funktionstrennung (Segregation of Duties, SoD) verhindert, dass eine Person zum Beispiel einen Lieferanten anlegt und ihn auch bezahlt. In SAP sind diese Konflikte bis auf Transaktionen und Berechtigungsobjekte definiert, und viele Unternehmen nutzen bereits SAP GRC Access Control oder ein vergleichbares Werkzeug für die Risikoanalyse.',
      },
      {
        type: 'p',
        text: 'Ziel ist, SoD zu prüfen, bevor ein Zugriff vergeben wird, statt Verstöße beim nächsten Audit zu finden. Ein solides Setup führt die Risikoanalyse während des Antrags aus, zeigt dem Genehmiger den Konflikt in verständlicher Sprache und verlangt eine dokumentierte kompensierende Kontrolle, wenn ein Konflikt akzeptiert wird. Ob die Analyse in GRC oder in der IGA-Plattform läuft, ist weniger wichtig, als dass beide dasselbe Regelwerk nutzen.',
      },
      { type: 'h2', text: '3. Notfallzugriffe kontrollieren' },
      {
        type: 'p',
        text: 'Jede SAP-Landschaft braucht einen Weg, Produktionsprobleme schnell zu beheben, oft Firefighter- oder Notfallzugriff genannt. Ohne Kontrolle wird er zur dauerhaften Hintertür. Notfallzugriff sollte mit Begründung beantragt, zeitlich begrenzt vergeben, vollständig protokolliert und anschließend von jemand anderem als dem Nutzer geprüft werden.',
      },
      { type: 'h2', text: '4. Hybrid planen: S/4HANA, BTP und die Cloud' },
      {
        type: 'p',
        text: 'Moderne SAP-Landschaften mischen ABAP-Systeme im eigenen Rechenzentrum, S/4HANA, die SAP Business Technology Platform und SaaS-Anwendungen wie SuccessFactors oder Ariba. SAP Cloud Identity Services verbinden diese Welten: Identity Authentication (IAS) übernimmt Anmeldung und Single Sign-on, Identity Provisioning (IPS) überträgt Benutzer und Gruppen zwischen Systemen.',
      },
      {
        type: 'p',
        text: 'Eine zentrale IGA-Plattform gehört über diese Schicht. Sie entscheidet, wer welchen Zugriff haben soll und warum, und IPS oder direkte Konnektoren setzen die Entscheidung um. Bleibt diese Aufteilung klar, konkurrieren nicht zwei Systeme darum, die führende Quelle zu sein.',
      },
      { type: 'h2', text: '5. Das Ende von SAP IdM als Neustart nutzen' },
      {
        type: 'p',
        text: 'SAP hat das Ende der Mainstream-Wartung für SAP IdM für 2027 angekündigt und verweist für viele Identity-Szenarien auf Microsoft Entra ID als Nachfolger. Für anspruchsvolle Governance-Anforderungen wie SoD-geprüfte Anträge, Rezertifizierungen und komplexe Rollenmodelle kombinieren viele Unternehmen Entra ID mit einer eigenen IGA-Plattform.',
      },
      {
        type: 'p',
        text: 'Wie auch immer Sie sich entscheiden: Migrieren Sie nicht eins zu eins. Nutzen Sie den Umstieg, um eigene Skripte abzulösen, das Rollenmodell zu vereinfachen und SAP in dieselben Antrags- und Prüfprozesse zu bringen wie alles andere.',
      },
      {
        type: 'callout',
        text: 'Checkliste: bereinigtes Rollenmodell, SoD-Prüfung beim Antrag, kontrollierte Notfallzugriffe, klare Aufteilung zwischen IGA und SAP Cloud Identity Services und ein Ausstiegsplan für SAP IdM deutlich vor 2027.',
      },
      { type: 'h2', text: 'Wie wir helfen' },
      {
        type: 'p',
        text: 'Wir binden SAP seit Jahren an Identity-Governance-Plattformen an, vom Rollen-Redesign über SoD-geprüfte Provisionierung bis zu SAP Cloud Identity Services. Wenn Sie Ihren SAP-IdM-Nachfolger planen oder SAP-Zugriffe unter dieselbe Governance wie den Rest Ihrer Landschaft bringen wollen, planen wir gern mit Ihnen den Weg.',
      },
    ],
  },
};
