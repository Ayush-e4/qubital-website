import type { PostContent } from '../types';

export const iamQueryPerformance: Record<'en' | 'de', PostContent> = {
  en: {
    title: 'From 70 seconds to under one: fixing a slow IAM database query',
    description:
      'A case study: how index remediation cut a critical identity governance query from over 70 seconds to under one second, and the method behind it.',
    excerpt:
      'A single slow query was holding up an entire identity platform. Here is how we found it, fixed it with index remediation, and made sure it stays fixed.',
    category: 'Case study',
    keywords: [
      'IAM performance',
      'identity governance database tuning',
      'SQL Server index optimisation',
      'IGA platform performance',
      'One Identity Manager performance',
    ],
    body: [
      {
        type: 'p',
        text: 'Identity governance platforms live and die by their database. Every provisioning run, every access request, every certification campaign ends up as SQL. When one of those queries slows down, users rarely see an error message. They see a request form that takes a minute to load, a nightly sync that runs into the working day, or an approval queue that never quite catches up.',
      },
      {
        type: 'p',
        text: 'In a recent engagement, one query in a customer’s identity governance platform regularly took more than 70 seconds. After our work it returns in under one second. This article walks through how we got there. The customer stays anonymous; the method is what matters.',
      },
      { type: 'h2', text: 'The symptom: everything felt slow' },
      {
        type: 'p',
        text: 'The first reports were vague: the web portal was “sluggish”, some jobs were “taking longer than usual”. That is typical. Performance problems in IAM rarely announce themselves as one broken component. They show up as general friction, and teams often respond by adding hardware or increasing timeouts. Both treat the symptom and hide the cause.',
      },
      {
        type: 'p',
        text: 'So we started with measurement, not opinions. Before changing anything we wanted to know which statements consumed the most time and resources, how often they ran, and whether their cost had changed over time.',
      },
      { type: 'h2', text: 'Step 1: find the queries that really cost time' },
      {
        type: 'p',
        text: 'On SQL Server, the Query Store and the dynamic management views give you this picture without installing anything. We ranked statements by total elapsed time and by logical reads, not just by average duration. A query that takes two seconds but runs ten thousand times a day matters more than a report that takes five minutes once a month.',
      },
      {
        type: 'p',
        text: 'One statement stood out. It was part of the logic that evaluates which entitlements a person should hold, ran many times per day, and averaged more than 70 seconds. It was also the root of much of the general slowness: other processes were waiting on the locks it held.',
      },
      { type: 'h2', text: 'Step 2: read the execution plan' },
      {
        type: 'p',
        text: 'The actual execution plan told the story quickly. Instead of seeking into a small set of rows, the engine scanned a large table of identity-to-entitlement assignments and then filtered the result. The estimated and actual row counts were far apart, a sign that the optimizer was working from a poor picture of the data.',
      },
      {
        type: 'ul',
        items: [
          'No index matched the combination of columns the query filtered and joined on.',
          'An existing index covered only part of the predicate, so the engine still had to look up every row.',
          'Statistics on the largest table were stale after years of growth, which skewed the optimizer’s estimates.',
        ],
      },
      { type: 'h2', text: 'Step 3: remediate the indexes, carefully' },
      {
        type: 'p',
        text: 'The fix was index remediation, not a code change. We designed a covering index for the query’s filter and join columns, with the remaining selected columns included, so the engine could answer it with a seek and no key lookups. We also refreshed statistics on the affected tables.',
      },
      {
        type: 'p',
        text: 'Indexes are not free. Every index slows down inserts and updates and takes space, and an IGA platform writes a lot during provisioning. So before adding anything we checked three things:',
      },
      {
        type: 'ol',
        items: [
          'Whether the vendor’s schema already offered a supported way to add the index, so it survives product upgrades.',
          'The write load on the table, to confirm the extra maintenance cost was acceptable.',
          'Existing indexes that overlapped with the new one and could be consolidated or removed.',
        ],
      },
      {
        type: 'callout',
        text: 'Result: the query dropped from over 70 seconds to under one second. Lock waits on the related tables largely disappeared, and the portal and scheduled jobs sped up with it.',
      },
      { type: 'h2', text: 'Step 4: make sure it stays fast' },
      {
        type: 'p',
        text: 'A one-off fix decays. Data grows, new connectors are added, and someone eventually changes a process. To keep the gains we put a few simple habits in place:',
      },
      {
        type: 'ul',
        items: [
          'A regular health check that lists the top statements by total time, so regressions surface in days, not months.',
          'Scheduled statistics and index maintenance aligned with the provisioning calendar.',
          'A short runbook that explains why the index exists, so nobody removes it during a later clean-up.',
        ],
      },
      { type: 'h2', text: 'What to take away' },
      {
        type: 'p',
        text: 'Most IAM performance problems are not mysterious. They come from a small number of expensive statements, and the database already records which ones they are. Measure first, read the plan, change one thing, and verify. In this case that sequence turned a 70-second wait into a sub-second response without new hardware or a platform change.',
      },
      {
        type: 'p',
        text: 'If your identity platform has slowed down as it has grown, we are happy to take a look. A focused health check usually shows within days where the time goes.',
      },
    ],
  },
  de: {
    title: 'Von 70 Sekunden auf unter eine: eine langsame IAM-Abfrage beheben',
    description:
      'Fallstudie: Wie gezielte Index-Optimierung eine kritische Abfrage einer Identity-Governance-Plattform von über 70 Sekunden auf unter eine Sekunde brachte.',
    excerpt:
      'Eine einzige langsame Abfrage bremste eine ganze Identity-Plattform aus. So haben wir sie gefunden, per Index-Optimierung behoben und dafür gesorgt, dass es so bleibt.',
    category: 'Fallstudie',
    keywords: [
      'IAM Performance',
      'Identity Governance Datenbank-Tuning',
      'SQL Server Index-Optimierung',
      'IGA Performance',
      'One Identity Manager Performance',
    ],
    body: [
      {
        type: 'p',
        text: 'Identity-Governance-Plattformen stehen und fallen mit ihrer Datenbank. Jeder Provisionierungslauf, jeder Berechtigungsantrag und jede Rezertifizierungskampagne endet als SQL. Wird eine dieser Abfragen langsam, sehen Anwender selten eine Fehlermeldung. Sie sehen ein Antragsformular, das eine Minute lädt, eine nächtliche Synchronisation, die bis in den Arbeitstag läuft, oder eine Genehmigungsliste, die nie ganz aufholt.',
      },
      {
        type: 'p',
        text: 'In einem aktuellen Projekt brauchte eine Abfrage in der Identity-Governance-Plattform eines Kunden regelmäßig mehr als 70 Sekunden. Nach unserer Arbeit antwortet sie in unter einer Sekunde. Dieser Beitrag zeigt, wie wir dorthin gekommen sind. Der Kunde bleibt anonym; entscheidend ist die Methode.',
      },
      { type: 'h2', text: 'Das Symptom: alles fühlte sich langsam an' },
      {
        type: 'p',
        text: 'Die ersten Meldungen waren vage: Das Webportal sei „träge“, einige Jobs liefen „länger als sonst“. Das ist typisch. Performance-Probleme im IAM zeigen sich selten als eine defekte Komponente, sondern als allgemeine Reibung. Oft reagieren Teams mit mehr Hardware oder längeren Timeouts. Beides behandelt das Symptom und verdeckt die Ursache.',
      },
      {
        type: 'p',
        text: 'Wir haben deshalb mit Messung begonnen, nicht mit Vermutungen. Bevor wir etwas änderten, wollten wir wissen, welche Statements die meiste Zeit und die meisten Ressourcen verbrauchen, wie oft sie laufen und ob sich ihre Kosten über die Zeit verändert haben.',
      },
      { type: 'h2', text: 'Schritt 1: die Abfragen finden, die wirklich Zeit kosten' },
      {
        type: 'p',
        text: 'Unter SQL Server liefern der Query Store und die Dynamic Management Views dieses Bild, ohne dass etwas installiert werden muss. Wir haben die Statements nach gesamter Laufzeit und nach logischen Lesevorgängen sortiert, nicht nur nach durchschnittlicher Dauer. Eine Abfrage mit zwei Sekunden, die zehntausendmal am Tag läuft, ist wichtiger als ein Bericht, der einmal im Monat fünf Minuten braucht.',
      },
      {
        type: 'p',
        text: 'Ein Statement stach heraus. Es gehörte zur Logik, die berechnet, welche Berechtigungen einer Person zustehen, lief viele Male täglich und brauchte im Schnitt über 70 Sekunden. Es war zugleich die Wurzel eines großen Teils der allgemeinen Langsamkeit: Andere Prozesse warteten auf die Sperren, die es hielt.',
      },
      { type: 'h2', text: 'Schritt 2: den Ausführungsplan lesen' },
      {
        type: 'p',
        text: 'Der tatsächliche Ausführungsplan erzählte die Geschichte schnell. Statt gezielt auf wenige Zeilen zuzugreifen, durchsuchte die Engine eine große Tabelle mit Zuordnungen von Identitäten zu Berechtigungen vollständig und filterte erst danach. Geschätzte und tatsächliche Zeilenzahlen lagen weit auseinander, ein Zeichen, dass der Optimizer mit einem schlechten Bild der Daten arbeitete.',
      },
      {
        type: 'ul',
        items: [
          'Kein Index passte zur Kombination der Spalten, nach denen die Abfrage filterte und verknüpfte.',
          'Ein vorhandener Index deckte nur einen Teil des Prädikats ab, die Engine musste also trotzdem jede Zeile nachschlagen.',
          'Die Statistiken der größten Tabelle waren nach Jahren des Wachstums veraltet und verzerrten die Schätzungen des Optimizers.',
        ],
      },
      { type: 'h2', text: 'Schritt 3: Indizes korrigieren, mit Bedacht' },
      {
        type: 'p',
        text: 'Die Lösung war eine Index-Korrektur, keine Codeänderung. Wir haben einen abdeckenden Index für die Filter- und Join-Spalten der Abfrage entworfen, mit den übrigen benötigten Spalten als Include-Spalten. So konnte die Engine die Abfrage per Seek beantworten, ohne Key Lookups. Zusätzlich haben wir die Statistiken der betroffenen Tabellen aktualisiert.',
      },
      {
        type: 'p',
        text: 'Indizes sind nicht kostenlos. Jeder Index verlangsamt Einfüge- und Änderungsvorgänge und belegt Speicher, und eine IGA-Plattform schreibt bei der Provisionierung viel. Bevor wir etwas hinzufügten, haben wir daher drei Dinge geprüft:',
      },
      {
        type: 'ol',
        items: [
          'Ob das Schema des Herstellers einen unterstützten Weg für den Index bietet, damit er Produkt-Upgrades übersteht.',
          'Die Schreiblast auf der Tabelle, um sicherzugehen, dass der zusätzliche Pflegeaufwand vertretbar ist.',
          'Vorhandene Indizes, die sich mit dem neuen überschneiden und zusammengelegt oder entfernt werden können.',
        ],
      },
      {
        type: 'callout',
        text: 'Ergebnis: Die Abfrage sank von über 70 Sekunden auf unter eine Sekunde. Sperrwartezeiten auf den betroffenen Tabellen verschwanden weitgehend, und Portal sowie geplante Jobs wurden spürbar schneller.',
      },
      { type: 'h2', text: 'Schritt 4: dafür sorgen, dass es schnell bleibt' },
      {
        type: 'p',
        text: 'Eine einmalige Korrektur verliert mit der Zeit ihre Wirkung. Daten wachsen, neue Konnektoren kommen hinzu, und irgendwann ändert jemand einen Prozess. Damit der Gewinn bleibt, haben wir einige einfache Gewohnheiten etabliert:',
      },
      {
        type: 'ul',
        items: [
          'Einen regelmäßigen Health Check, der die teuersten Statements nach Gesamtzeit auflistet, damit Verschlechterungen in Tagen auffallen statt in Monaten.',
          'Geplante Statistik- und Indexpflege, abgestimmt auf den Provisionierungskalender.',
          'Ein kurzes Runbook, das erklärt, warum der Index existiert, damit ihn niemand bei einer späteren Bereinigung entfernt.',
        ],
      },
      { type: 'h2', text: 'Was bleibt' },
      {
        type: 'p',
        text: 'Die meisten IAM-Performance-Probleme sind kein Rätsel. Sie gehen auf wenige teure Statements zurück, und die Datenbank protokolliert bereits, welche das sind. Erst messen, dann den Plan lesen, eine Sache ändern und das Ergebnis prüfen. In diesem Fall wurde so aus 70 Sekunden Wartezeit eine Antwort in unter einer Sekunde, ohne neue Hardware und ohne Plattformwechsel.',
      },
      {
        type: 'p',
        text: 'Wenn Ihre Identity-Plattform mit dem Wachstum langsamer geworden ist, schauen wir sie uns gern an. Ein fokussierter Health Check zeigt meist innerhalb weniger Tage, wo die Zeit verloren geht.',
      },
    ],
  },
};
