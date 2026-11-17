import type { PostContent } from '../types';

export const accessReviews: Record<'en' | 'de', PostContent> = {
  en: {
    title: 'Access reviews that mean something: ending rubber-stamp recertification',
    description:
      'Why access reviews turn into rubber-stamping and how to fix it: smaller scope, business-friendly descriptions, risk-based focus, owner reviews and real revocation.',
    excerpt:
      'Thousands of checkboxes, approved in an afternoon. Why most access reviews fail to remove anything, and five changes that make recertification an actual control again.',
    summary:
      'Access reviews fail when reviewers get thousands of items they cannot understand, so they approve everything. Make them work by shrinking the scope to what matters, describing access in business language, focusing on high-risk and unused access, asking system owners as well as managers, and making sure revocations are actually carried out.',
    category: 'Identity Governance',
    keywords: [
      'access review',
      'user access recertification',
      'access certification',
      'rubber-stamping access reviews',
      'risk-based access review',
      'IGA audit',
    ],
    body: [
      {
        type: 'p',
        text: 'Every quarter, managers receive a list of their team’s access and are asked to confirm it. Many open a list with hundreds of cryptic entitlement names, cannot tell what most of them mean, and approve everything to get back to work. The campaign closes at 100 percent, the auditor gets a report, and almost no access has been removed.',
      },
      {
        type: 'p',
        text: 'That is rubber-stamping, and auditors increasingly recognise it. A review that never revokes anything is evidence that the control does not work. Here are five changes that turn recertification back into a real control.',
      },
      { type: 'h2', text: '1. Review less, but the right things' },
      {
        type: 'p',
        text: 'Not every entitlement deserves the same attention. Birthright access that everyone in a role gets automatically does not need a manager to confirm it each quarter. Focus reviews on access that was requested, that is privileged, or that touches sensitive data, and review the rest less often.',
      },
      { type: 'h2', text: '2. Describe access in business language' },
      {
        type: 'p',
        text: 'A reviewer cannot judge “SAP_FI_AP_ALL_0100”. They can judge “Can create and pay supplier invoices in company code 0100”. Every reviewable entitlement needs a plain description and an owner who maintains it. This is tedious work once, and it pays off in every campaign afterwards.',
      },
      { type: 'h2', text: '3. Highlight risk and non-use' },
      {
        type: 'ul',
        items: [
          'Flag access that has not been used for 90 days or more.',
          'Flag segregation-of-duties conflicts and privileged rights.',
          'Show what changed since the last review, instead of the full list every time.',
          'Pre-select revocation for clearly unused access and let the reviewer keep it if needed.',
        ],
      },
      { type: 'h2', text: '4. Ask the people who know' },
      {
        type: 'p',
        text: 'Managers know what their people do, but not what each system permission means. System and data owners know the permissions, but not every user. Good programmes combine both: managers confirm that a person still needs a role, and owners periodically review who holds the critical permissions in their system.',
      },
      { type: 'h2', text: '5. Close the loop' },
      {
        type: 'p',
        text: 'A revoked item only counts when the access is really gone. Connect the review to automated deprovisioning wherever possible, track manual removals to completion, and report the revocation rate alongside the completion rate.',
      },
      {
        type: 'callout',
        text: 'A healthy campaign revokes something. If your revocation rate is close to zero, the problem is rarely that everyone has exactly the right access.',
      },
      {
        type: 'p',
        text: 'Most identity governance platforms support all of this; it is a matter of configuration, data quality and good campaign design. We help teams redesign their reviews so they pass audits and actually reduce access.',
      },
    ],
  },
  de: {
    title: 'Rezertifizierung, die wirkt: Schluss mit dem Durchwinken',
    description:
      'Warum Berechtigungsprüfungen zum Durchwinken werden und wie Sie das ändern: kleinerer Umfang, verständliche Beschreibungen, Risikofokus, Owner-Prüfung, echter Entzug.',
    excerpt:
      'Tausende Häkchen, an einem Nachmittag bestätigt. Warum die meisten Rezertifizierungen nichts entziehen – und fünf Änderungen, die daraus wieder eine echte Kontrolle machen.',
    summary:
      'Rezertifizierungen scheitern, wenn Prüfende Tausende Einträge bekommen, die sie nicht verstehen – also bestätigen sie alles. Wirksam werden sie mit kleinerem Umfang, Beschreibungen in Fachsprache, Fokus auf riskante und ungenutzte Rechte, Prüfung durch Systemverantwortliche und Führungskräfte und einem Entzug, der tatsächlich umgesetzt wird.',
    category: 'Identity Governance',
    keywords: [
      'Rezertifizierung',
      'Berechtigungsprüfung',
      'Access Review',
      'Berechtigungsrezertifizierung',
      'risikobasierte Rezertifizierung',
      'IGA Audit',
    ],
    body: [
      {
        type: 'p',
        text: 'Jedes Quartal erhalten Führungskräfte eine Liste der Berechtigungen ihres Teams und sollen sie bestätigen. Viele öffnen eine Liste mit Hunderten kryptischer Berechtigungsnamen, verstehen die meisten nicht und bestätigen alles, um weiterarbeiten zu können. Die Kampagne schließt mit 100 Prozent, der Prüfer bekommt einen Bericht – und kaum eine Berechtigung wurde entzogen.',
      },
      {
        type: 'p',
        text: 'Das ist Durchwinken, und Prüfer erkennen es immer häufiger. Eine Rezertifizierung, die nie etwas entzieht, belegt, dass die Kontrolle nicht wirkt. Fünf Änderungen machen daraus wieder eine echte Kontrolle.',
      },
      { type: 'h2', text: '1. Weniger prüfen – aber das Richtige' },
      {
        type: 'p',
        text: 'Nicht jede Berechtigung verdient dieselbe Aufmerksamkeit. Basisberechtigungen, die jede Person einer Rolle automatisch erhält, muss keine Führungskraft jedes Quartal bestätigen. Konzentrieren Sie die Prüfung auf beantragte, privilegierte und sensible Zugriffe und prüfen Sie den Rest seltener.',
      },
      { type: 'h2', text: '2. Berechtigungen in Fachsprache beschreiben' },
      {
        type: 'p',
        text: 'Niemand kann „SAP_FI_AP_ALL_0100“ beurteilen. „Darf Lieferantenrechnungen im Buchungskreis 0100 erfassen und bezahlen“ dagegen schon. Jede prüfbare Berechtigung braucht eine verständliche Beschreibung und eine verantwortliche Person, die sie pflegt. Das ist einmal mühsam und zahlt sich in jeder folgenden Kampagne aus.',
      },
      { type: 'h2', text: '3. Risiko und Nichtnutzung sichtbar machen' },
      {
        type: 'ul',
        items: [
          'Markieren Sie Rechte, die seit 90 Tagen oder länger nicht genutzt wurden.',
          'Markieren Sie Konflikte der Funktionstrennung und privilegierte Rechte.',
          'Zeigen Sie, was sich seit der letzten Prüfung geändert hat, statt jedes Mal die komplette Liste.',
          'Schlagen Sie für eindeutig ungenutzte Rechte den Entzug vor und lassen Sie Prüfende sie bei Bedarf behalten.',
        ],
      },
      { type: 'h2', text: '4. Die fragen, die es wissen' },
      {
        type: 'p',
        text: 'Führungskräfte wissen, was ihre Leute tun, aber nicht, was jede Systemberechtigung bedeutet. System- und Datenverantwortliche kennen die Berechtigungen, aber nicht jede Person. Gute Programme kombinieren beides: Führungskräfte bestätigen, dass eine Person eine Rolle noch braucht, und Systemverantwortliche prüfen regelmäßig, wer die kritischen Rechte in ihrem System hat.',
      },
      { type: 'h2', text: '5. Den Kreis schließen' },
      {
        type: 'p',
        text: 'Ein Entzug zählt erst, wenn der Zugriff wirklich weg ist. Verbinden Sie die Prüfung, wo immer möglich, mit automatischem Entzug, verfolgen Sie manuelle Entfernungen bis zum Abschluss und berichten Sie die Entzugsquote neben der Abschlussquote.',
      },
      {
        type: 'callout',
        text: 'Eine gesunde Kampagne entzieht etwas. Liegt Ihre Entzugsquote nahe null, liegt das selten daran, dass alle genau die richtigen Rechte haben.',
      },
      {
        type: 'p',
        text: 'Die meisten Identity-Governance-Plattformen unterstützen all das; es ist eine Frage von Konfiguration, Datenqualität und gutem Kampagnendesign. Wir helfen Teams, ihre Rezertifizierungen so umzubauen, dass sie Audits bestehen und tatsächlich Berechtigungen reduzieren.',
      },
    ],
  },
};
