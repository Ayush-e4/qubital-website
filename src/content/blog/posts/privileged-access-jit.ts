import type { PostContent } from '../types';

export const privilegedAccessJit: Record<'en' | 'de', PostContent> = {
  en: {
    title: 'Privileged access management: from vaulted passwords to just-in-time access',
    description:
      'How privileged access management has evolved: discover admin accounts, vault credentials, record sessions, then move to just-in-time access and zero standing privileges.',
    excerpt:
      'Administrator rights are what attackers look for first. A practical path from a password vault to just-in-time access, without stopping operations along the way.',
    summary:
      'Privileged access management protects the accounts that can change or read everything. Start by finding every privileged account, vault and rotate their credentials, and record sessions on critical systems. Then reduce standing rights step by step with just-in-time access that is requested, approved, time-limited and logged.',
    category: 'Privileged Access',
    keywords: [
      'privileged access management',
      'PAM',
      'just-in-time access',
      'zero standing privileges',
      'privileged account security',
      'session recording',
    ],
    body: [
      {
        type: 'p',
        text: 'Domain administrators, database owners, cloud subscription owners, root accounts on servers: privileged accounts can read, change or delete almost anything. That is why attackers look for them first, and why one compromised admin password can turn a small incident into a company-wide outage.',
      },
      {
        type: 'p',
        text: 'Privileged access management (PAM) is often introduced as a password vault and stops there. A vault is a good start. The goal, though, is fewer privileged rights that exist only when someone needs them.',
      },
      { type: 'h2', text: 'Step 1: find every privileged account' },
      {
        type: 'p',
        text: 'You cannot protect what you do not know. Discovery usually finds far more privileged accounts than expected: local administrator accounts, old service accounts with domain admin rights, shared emergency logins, cloud roles assigned directly to people, and accounts of former administrators that were never removed.',
      },
      { type: 'h2', text: 'Step 2: vault, rotate and record' },
      {
        type: 'ul',
        items: [
          'Move shared and service account credentials into a vault, so nobody needs to know the password.',
          'Rotate passwords automatically, especially after each use of a shared account.',
          'Record sessions on critical systems, so you can see what was done and by whom.',
          'Require strong, phishing-resistant multi-factor authentication for every privileged login.',
        ],
      },
      { type: 'h2', text: 'Step 3: remove standing privileges' },
      {
        type: 'p',
        text: 'Standing privileges are admin rights that are always active, even when the administrator is in a meeting or on holiday. Each one is an opportunity for an attacker. Just-in-time (JIT) access replaces them: an administrator requests elevated rights for a task, the request is approved or automatically checked against rules, the rights are granted for a limited time, and every action is logged.',
      },
      {
        type: 'callout',
        text: 'Start just-in-time access where it hurts least and helps most: cloud administrator roles and production database access. Move on to domain administration once teams trust the process.',
      },
      { type: 'h2', text: 'Step 4: connect PAM to identity governance' },
      {
        type: 'p',
        text: 'Privileged access should follow the same lifecycle as any other access. When an administrator changes teams or leaves, their privileged rights must go too. Linking the PAM platform to identity governance means privileged roles are requested, approved, recertified and removed through the same process, and auditors see one consistent picture.',
      },
      { type: 'h2', text: 'What auditors and regulators expect' },
      {
        type: 'p',
        text: 'NIS2, DORA and ISO 27001 all ask how privileged access is granted, controlled and monitored. A vault with rotated credentials, recorded sessions on critical systems, MFA for administrators and regular review of who holds privileged roles covers most of what they look for.',
      },
      {
        type: 'p',
        text: 'We help organisations plan this journey on the PAM platform they run, from discovery to just-in-time access, so operations keep running while risk comes down.',
      },
    ],
  },
  de: {
    title: 'Privileged Access Management: vom Passwort-Tresor zum Just-in-Time-Zugriff',
    description:
      'Wie sich Privileged Access Management entwickelt: Admin-Konten finden, Zugangsdaten verwahren, Sitzungen aufzeichnen, dann Just-in-Time-Zugriff und keine Dauerrechte mehr.',
    excerpt:
      'Administratorrechte sind das Erste, wonach Angreifer suchen. Ein praktischer Weg vom Passwort-Tresor zum Just-in-Time-Zugriff, ohne den Betrieb zu unterbrechen.',
    summary:
      'Privileged Access Management schützt die Konten, die alles lesen oder ändern können. Finden Sie zuerst jedes privilegierte Konto, verwahren und rotieren Sie die Zugangsdaten und zeichnen Sie Sitzungen auf kritischen Systemen auf. Bauen Sie dann Dauerrechte schrittweise ab – mit Just-in-Time-Zugriff, der beantragt, genehmigt, befristet und protokolliert wird.',
    category: 'Privileged Access',
    keywords: [
      'Privileged Access Management',
      'PAM',
      'Just-in-Time-Zugriff',
      'Zero Standing Privileges',
      'privilegierte Konten absichern',
      'Sitzungsaufzeichnung',
    ],
    body: [
      {
        type: 'p',
        text: 'Domänenadministratoren, Datenbank-Owner, Inhaber von Cloud-Subscriptions, Root-Konten auf Servern: Privilegierte Konten können fast alles lesen, ändern oder löschen. Deshalb suchen Angreifer zuerst nach ihnen – und deshalb kann ein einziges kompromittiertes Admin-Passwort aus einem kleinen Vorfall einen unternehmensweiten Ausfall machen.',
      },
      {
        type: 'p',
        text: 'Privileged Access Management (PAM) wird oft als Passwort-Tresor eingeführt und bleibt dort stehen. Ein Tresor ist ein guter Anfang. Das Ziel sind aber weniger privilegierte Rechte, die nur existieren, wenn sie gebraucht werden.',
      },
      { type: 'h2', text: 'Schritt 1: jedes privilegierte Konto finden' },
      {
        type: 'p',
        text: 'Was Sie nicht kennen, können Sie nicht schützen. Eine Bestandsaufnahme findet meist weit mehr privilegierte Konten als erwartet: lokale Administratorkonten, alte Servicekonten mit Domänen-Admin-Rechten, geteilte Notfallzugänge, Cloud-Rollen, die Personen direkt zugewiesen sind, und Konten ehemaliger Administratoren, die nie entfernt wurden.',
      },
      { type: 'h2', text: 'Schritt 2: verwahren, rotieren, aufzeichnen' },
      {
        type: 'ul',
        items: [
          'Legen Sie Zugangsdaten geteilter Konten und Servicekonten in einen Tresor, damit niemand das Passwort kennen muss.',
          'Rotieren Sie Passwörter automatisch, vor allem nach jeder Nutzung eines geteilten Kontos.',
          'Zeichnen Sie Sitzungen auf kritischen Systemen auf, damit nachvollziehbar ist, wer was getan hat.',
          'Verlangen Sie für jede privilegierte Anmeldung eine starke, phishing-resistente Mehrfaktor-Authentifizierung.',
        ],
      },
      { type: 'h2', text: 'Schritt 3: Dauerrechte abbauen' },
      {
        type: 'p',
        text: 'Dauerrechte sind Admin-Rechte, die immer aktiv sind – auch wenn der Administrator im Meeting oder im Urlaub ist. Jedes davon ist eine Gelegenheit für Angreifer. Just-in-Time-Zugriff (JIT) ersetzt sie: Ein Administrator beantragt erhöhte Rechte für eine Aufgabe, der Antrag wird genehmigt oder automatisch gegen Regeln geprüft, die Rechte gelten befristet, und jede Aktion wird protokolliert.',
      },
      {
        type: 'callout',
        text: 'Beginnen Sie mit Just-in-Time-Zugriff dort, wo es am wenigsten stört und am meisten hilft: Cloud-Administratorrollen und Zugriffe auf Produktionsdatenbanken. Die Domänenadministration folgt, sobald die Teams dem Prozess vertrauen.',
      },
      { type: 'h2', text: 'Schritt 4: PAM mit Identity Governance verbinden' },
      {
        type: 'p',
        text: 'Privilegierte Zugriffe sollten demselben Lebenszyklus folgen wie alle anderen. Wechselt ein Administrator das Team oder verlässt das Unternehmen, müssen auch seine privilegierten Rechte gehen. Ist die PAM-Plattform mit Identity Governance verbunden, werden privilegierte Rollen über denselben Prozess beantragt, genehmigt, rezertifiziert und entzogen – und Prüfer sehen ein einheitliches Bild.',
      },
      { type: 'h2', text: 'Was Prüfer und Aufsicht erwarten' },
      {
        type: 'p',
        text: 'NIS2, DORA und ISO 27001 fragen alle, wie privilegierte Zugriffe vergeben, kontrolliert und überwacht werden. Ein Tresor mit rotierten Zugangsdaten, aufgezeichnete Sitzungen auf kritischen Systemen, MFA für Administratoren und eine regelmäßige Prüfung, wer privilegierte Rollen hat, decken das meiste davon ab.',
      },
      {
        type: 'p',
        text: 'Wir helfen Unternehmen, diesen Weg auf ihrer bestehenden PAM-Plattform zu planen – von der Bestandsaufnahme bis zum Just-in-Time-Zugriff –, damit der Betrieb weiterläuft, während das Risiko sinkt.',
      },
    ],
  },
};
