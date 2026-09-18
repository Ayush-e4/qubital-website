// @ts-check
/** @type {import('../types').Dictionary} */
const dictionary = {
  nav: {
    home: 'Startseite',
    about: 'Über uns',
    services: 'Leistungen',
    careers: 'Karriere',
    contact: 'Kontakt',
    mission: 'Mission',
    why_us: 'Warum wir',
  },
  header: {
    cta: 'Kontakt aufnehmen',
    menu: 'MENÜ',
    close: 'SCHLIESSEN',
    open_menu: 'Menü öffnen',
    close_menu: 'Menü schließen',
    change_language: 'Sprache ändern',
  },
  hero: {
    sub_headline: 'IT-Beratung & Digitale Architektur für Unternehmen',
    subtitle:
      'Wir vereinfachen Technologiesysteme für wachsende Unternehmen und moderne Enterprise-Teams.',
    cta_primary: 'Leistungen erkunden',
    cta_secondary: 'Unser Ansatz',
    scroll_hint: 'Scrollen zum Erkunden',
  },
  bento: {
    software_title: 'Softwareentwicklung',
    software_desc:
      'Maßgeschneiderte Enterprise-Anwendungen und Mikrodienste, entwickelt für Skalierbarkeit und Resilienz.',
    managed_title: 'Managed IT-Services',
    managed_desc: 'Proaktives Infrastrukturmanagement und Level-3-Support für kritische Systeme.',
    cloud_title: 'Cloud-Dienste',
    cloud_desc: 'AWS- und Azure-Cloud-Migrationen, Architekturoptimierung und FinOps.',
    cyber_title: 'Cybersicherheit',
    cyber_desc: 'Implementierung von Zero-Trust-Architekturen, Audits und Compliance-Management.',
    special_title: 'Spezialisierte Technologien',
    special_desc:
      'IoT-Integration, Modernisierung von Altsystemen und spezialisierte Hardwareschnittstellen.',
    cta: 'Mehr erfahren',
    sap_title: 'SAP-Lösungen',
    sap_desc: 'S/4HANA-Migrationen, Clean-Core-Architektur und SAP BTP-Cloud-Integrationen.',
  },
  services: {
    eyebrow: 'Kernkompetenzen',
    heading: 'Kernkompetenzen',
    description: 'Ganzheitliche technische Führung und Engineering-Exzellenz.',
  },
  methodology: {
    eyebrow: 'METHODIK',
    heading: 'Wie wir arbeiten',
    cta_link: 'Unseren Ansatz erkunden',
  },
  metrics: {
    eyebrow: 'BETRIEBSKENNZAHLEN',
    heading: 'Bewährt im Enterprise-Maßstab',
    labels: {
      cloud_workloads: 'Verwaltete Cloud-Workloads',
      arch_reviews: 'Architektur-Reviews',
      sla_guarantee: 'Durchschnittliche SLA-Garantie',
      continuity_rate: 'Kundenbindungsrate',
    },
  },
  badges: {
    iso: 'ISO 27001 Zertifiziert',
    bsi: 'BSI C5 Konform',
    gdpr: 'DSGVO Konform',
    tisax: 'TISAX Level 3',
  },
  cta_banner: {
    heading: 'Bereit für Ihr nächstes Kapitel?',
    description:
      'Vereinbaren Sie ein Erstgespräch mit unseren Hauptarchitekten, um Ihre technischen Herausforderungen zu besprechen.',
    btn_primary: 'Beratungsgespräch vereinbaren',
    btn_secondary: 'Offene Stellen ansehen',
  },
  footer: {
    tagline:
      'Strategische IT-Beratung, Systemarchitektur und Engineering-Governance. Gegründet auf europäischer Analysepräzision.',
    regulatory: 'Rechtliches',
    communications: 'Kommunikation',
    languages: 'Sprachen',
    regulatory_links: {
      gdpr: 'DSGVO & Datenschutz',
      impressum: 'Impressum (§ 5 TMG)',
      compliance: 'Informationssicherheits-Governance',
    },
  },
  not_found: {
    code: '404',
    heading: 'Seite nicht gefunden.',
    description: 'Die gesuchte Seite existiert nicht oder wurde verschoben.',
    cta: 'Zurück zur Startseite',
    links_heading: 'Oder navigieren Sie zu:',
  },
  contact_page: {
    title: 'Gespräch beginnen.',
    subtitle:
      'Treten Sie mit unserem Chef-Engineering-Team in Kontakt, um Ihre digitalen Initiativen und Architektur-Anforderungen zu besprechen.',
    form_title: 'Projektanfrage',
    security_badge: 'SICHER & VERTRAULICH',
    full_name: 'Vollständiger Name*',
    email: 'Geschäftliche E-Mail*',
    organization: 'Unternehmen / Organisation',
    domain: 'Beratungsbereich*',
    domain_select: 'Bereich auswählen...',
    message: 'Projektkurzbeschreibung & Anforderung*',
    nda: 'Genseitige Vertraulichkeitsvereinbarung (NDA) vorab erforderlich',
    priority: 'Priorität:',
    priority_std: 'Standard (24-48 Std.)',
    priority_urg: 'Dringend (Am selben Tag)',
    submit: 'Anfrage absenden',
    success_title: 'Anfrage erfolgreich übermittelt',
    success_desc:
      'Vielen Dank für Ihre Kontaktaufnahme. Unser Team hat Ihre Nachricht erhalten und wird sich umgehend melden.',
    submit_another: 'Weitere Anfrage senden',
    channels_title: 'Direkte Engineering-Kanäle',
    headquarters: 'Hauptsitz',
    direct_email: 'Direkte E-Mail',
    hours: 'Geschäftszeiten',
    protocol_title: 'Verschlüsselte Kommunikation',
    protocol_desc:
      'Alle Anfragen werden nach strengen europäischen Datenschutzstandards (DSGVO) verarbeitet und per TLS 1.3 verschlüsselt.',
    domains: [
      'Unternehmensarchitektur',
      'Cloud-Governance & FinOps',
      'Zero-Trust Cybersicherheit',
      'Modernisierung von Altsystemen',
      'Virtuelle CIO-Beratung',
    ],
    placeholders: {
      fullName: 'Dr. Marcus Vance',
      email: 'm.vance@company.de',
      organization: 'Siemens Energy AG',
      message: 'Beschreiben Sie Ihre betrieblichen Engpässe oder Migrationsziele...',
    },
    security_protocol: 'Sicherheitsprotokoll',
    region: 'Metropolregion Nürnberg',
    location_full: 'Herzogenaurach, Bayern, Deutschland',
    hours_val: 'Mo – Fr: 08:00 – 18:00 CET',
    val_name_required: 'Vollständiger Name ist erforderlich',
    val_name_min: 'Name muss mindestens 2 Zeichen lang sein',
    val_email_required: 'Geschäftliche E-Mail ist erforderlich',
    val_email_invalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
    val_domain_required: 'Bitte wählen Sie einen Bereich aus',
    val_message_required: 'Projektbeschreibung ist erforderlich',
  },
  about_page: {
    hero_title_1: 'Strategische IT-Beratung &',
    hero_title_2: 'Skalierbare digitale Systeme.',
    hero_desc:
      'Wir schaffen Klarheit in verteilten Architekturen und bieten IT-Führungskräften die strategische Orientierung und Governance für reibungsloses Wachstum.',
    focus_tag: 'UNSER FOKUS',
    focus_title: 'Betriebliche Zuverlässigkeit',
    focus_desc:
      'Unsere Methodiken garantieren migrationsfreie Ausfälle und absolute Konsistenz in komplexen Cloud-Umgebungen.',
    focus_items: ['Systemarchitektur', 'Cloud-Orchestrierung', 'Sicherheits-Governance'],
    mission_tag: 'KERNAUFTRAG / MISSION',
    mission_quote:
      '"Die Interaktion von Unternehmen mit ihren digitalen Ökosystemen durch unveränderliche Governance und transparente Architektur neu definieren."',
    mission_desc:
      'Wir sind überzeugt, dass Unternehmenstechnologie Klarheit schaffen sollte. Unsere Mission ist es, Geschäftslogik von Komplexität zu entkoppeln.',
    mission_badges: ['Strategie-Ausrichtung', 'System-Entkopplung', 'Engineering-Souveränität'],
    origins_tag: 'HERKUNFT & HALTUNG',
    origins_title: 'Gebaut für die Multi-Cloud- und KI-Realität.',
    origins_desc:
      'Gegründet von ehemaligen IT-Führungskräften in Herzogenaurach schließt Qubital die Lücke zwischen IT-Strategie und technischer Umsetzung.',
    story_p1:
      'Die Gründung von Qubital geht auf eine einfache Beobachtung zurück: Je leistungsfähiger Enterprise-Systeme werden, desto undurchsichtiger werden sie.',
    story_p2:
      "Wir haben unsere Beratungspraxis auf dem Konzept der 'Technischen Isolation' aufgebaut — klare Grenzen zwischen Systemen für minimale Ausfallrisiken.",
    principles_title: 'Unsere Leitprinzipien',
    principles: [
      {
        title: 'Strukturelle Integrität vor Feature-Geschwindigkeit',
        desc: 'Wir bauen Systeme, die Teamwechsel und Skalierungen dauerhaft überstehen.',
      },
      {
        title: 'Beobachten, Dokumentieren, Architekturskizze, dann Bauen',
        desc: 'Kein Code wird geschrieben, bevor der Ist-Zustand nicht vollständig kartiert ist.',
      },
      {
        title: 'Externe Abhängigkeiten & Risiken minimieren',
        desc: 'Jede Drittanbieter-Integration wird als potenzieller Ausfallvektor gesteuert.',
      },
      {
        title: 'Für Übergabe entwickeln, nicht für Heldenleistungen',
        desc: 'Systeme müssen für nachfolgende Entwickler sofort verständlich sein.',
      },
    ],
    stats: [
      {
        value: '480+',
        label: 'Verwaltete Cloud-Workloads',
      },
      {
        value: '120+',
        label: 'Gelieferte Architektur-Reviews',
      },
      {
        value: '<12min',
        label: 'Mittlere Vorfallsbehebungszeit',
      },
      {
        value: '97.3%',
        label: 'Kundenbindungsrate',
      },
    ],
    diff_tag: 'ALLEINSTELLUNGSMERKMALE',
    diff_title: 'Warum Qubital wählen',
    diff_items: [
      {
        icon: 'verified',
        title: 'Herstellerneutralität & Offene Standards',
        desc: 'Wir unterhalten keinerlei exklusive Partnerschaften. Unsere Architekturempfehlungen basieren rein auf technischer Exzellenz.',
      },
      {
        icon: 'shield_locked',
        title: 'Deutsche Engineering-Governance',
        desc: 'Vom Standort Herzogenaurach aus wenden wir strenge DIN/ISO-Standards auf moderne Softwarearchitekturen an.',
      },
      {
        icon: 'support_agent',
        title: 'Direkter Zugang zu Chefarchitekten',
        desc: 'Bei uns gibt es keine Zwischenschaltung von Account-Managern. Sie sprechen direkt mit den ausführenden Ingenieuren.',
      },
    ],
    cta_title: 'Lassen Sie uns Ihre IT-Landschaft analysieren.',
    cta_desc:
      'Starten Sie eine vertrauliche Bewertung Ihrer aktuellen Infrastruktur. Wir identifizieren Engpässe und Sicherheitsrisiken.',
    cta_btn_primary: 'Executive-Briefing anfordern',
    cta_btn_secondary: 'Direkte Beratungsleitung',
  },
  services_page: {
    hero_title_1: 'Kernkompetenzen &',
    hero_title_2: 'Beratungsleistungen.',
    hero_desc:
      'Technische Komplexität in betriebliche Einfachheit verwandeln. Wir bieten strukturierte Ingenieurskunst für moderne Unternehmen.',
    hero_cta: 'Beratungspraxis beauftragen',
    matrix_tag: 'PRAXIS-MATRIX',
    matrix_title: 'Strukturierte Kompetenzdisziplinen',
    matrix_desc:
      'Unsere Kernbereiche verbinden verlässliche Engineering-Standards mit strategischer Ausrichtung.',
    matrix_cards: [
      {
        tag: 'DEV',
        icon: 'terminal',
        id: 'software',
        title: 'Softwareentwicklung',
        description:
          'Maßgeschneiderte Webanwendungen und digitale Werkzeuge zur Optimierung Ihrer täglichen Geschäftsabläufe.',
        items: [
          'Individuelle Web- & Mobile-Apps',
          'Nahtlose Systemintegration',
          'Hohe Performance & Verlässlichkeit',
        ],
        focus: 'Individuelle Lösungen',
      },
      {
        tag: 'OPS',
        icon: 'dns',
        id: 'managed-it',
        title: 'Managed IT Support',
        description:
          'Proaktive IT-Betreuung, kontinuierliche Systemüberwachung und schneller Support für reibungslosen Betrieb.',
        items: [
          '24/7 Systemüberwachung',
          'Schneller technischer Support',
          'Team-Onboarding & Setup',
        ],
        focus: 'Keine Ausfallzeiten',
      },
      {
        tag: 'CLOUD',
        icon: 'cloud',
        id: 'cloud',
        title: 'Cloud-Infrastruktur',
        description:
          'Zuverlässige Cloud-Einrichtung, Migration und Verwaltung für sichere und kosteneffiziente Datenhaltung.',
        items: [
          'Reibungslose Cloud-Migration',
          'Monatliche Kostenoptimierung',
          'Garantierte Backups & Uptime',
        ],
        focus: 'AWS • Azure • GCP',
      },
      {
        tag: 'SEC',
        icon: 'security',
        id: 'cybersecurity',
        title: 'Cybersicherheit & Schutz',
        description:
          'Einfache, wirksame Sicherheitsstandards zum Schutz von Unternehmensdaten und Endgeräten.',
        items: [
          'Datenschutz & Privatsphäre',
          'Sichere Zugriffskontrollen',
          'Bedrohungsschutz & Audits',
        ],
        focus: 'Datenschutz',
      },
      {
        tag: 'AUTO',
        icon: 'smart_toy',
        id: 'specialized-tech',
        title: 'KI & Automatisierung',
        description:
          'Intelligente Werkzeuge und automatisierte Abläufe, die wiederkehrende manuelle Aufgaben eliminieren.',
        items: [
          'Workflow-Automatisierung',
          'Intelligente KI-Integration',
          'Zeiteinsparende Abläufe',
        ],
        focus: 'Effizienz',
      },
      {
        tag: 'SAP',
        icon: 'layers',
        id: 'sap',
        title: 'SAP-Lösungen & Architektur',
        description:
          'Unternehmensweite S/4HANA-Migrationen, Clean-Core-Strategien und maßgeschneiderte SAP BTP-Integrationen für höchste Stabilität.',
        items: [
          'S/4HANA Cloud & Clean Core',
          'SAP BTP & ABAP-Erweiterungen',
          'ERP-Performance-Optimierung',
        ],
        focus: 'Enterprise ERP',
      },
    ],
    methodology_tag: 'AUSFÜHRUNGSMETHODIK',
    methodology_title: 'Wie Qubital arbeitet',
    methodology_desc:
      'Unser standardisierter Vier-Phasen-Lebenszyklus sorgt für Transparenz, Risikominimierung und planbare Ergebnisse.',
    cta_title: 'Besprechen Sie Ihre Roadmap mit unserem Beratungsteam.',
    cta_desc: 'Vereinbaren Sie ein Erstgespräch zur Bewertung der Machbarkeit.',
    cta_nda: 'Vertraulicher NDA-Standard',
    cta_direct: 'Direktkontakt zu Partnern',
    cta_btn_primary: 'Erstberatung vereinbaren',
    cta_btn_secondary: 'Direkte E-Mail',
  },
  methodology_steps: [
    {
      id: 1,
      phase: 'PHASE 01',
      title: 'Bewerten & Auditieren',
      icon: 'search_insights',
      desc: 'Tiefgehende Architekturanalyse und Audit bestehender Systeme und Engpässe.',
      deliverable: 'Ziel-GAP-Analyse & RFC',
    },
    {
      id: 2,
      phase: 'PHASE 02',
      title: 'Entwerfen & Modellieren',
      icon: 'architecture',
      desc: 'Definition des Zielbetriebsmodells (TOM), Sicherheitsmodellierung und Blaupausen.',
      deliverable: 'Systemarchitektur-Blaupause',
    },
    {
      id: 3,
      phase: 'PHASE 03',
      title: 'Umsetzen & Bereitstellen',
      icon: 'build_circle',
      desc: 'Iterativer Rollout mit CI/CD-Disziplin, automatisierten Tests und unterbrechungsfreiem Go-Live.',
      deliverable: 'Produktionsfreigabe-Protokoll',
    },
    {
      id: 4,
      phase: 'PHASE 04',
      title: 'Optimieren & Steuern',
      icon: 'monitoring',
      desc: 'Kontinuierliche Telemetrie, FinOps-Kostensteuerung und proaktive SLA-Einhaltung.',
      deliverable: 'QBR-Leistungsbericht & SLA',
    },
  ],
  careers_page: {
    hero_title_1: 'Intelligente Systeme bauen',
    hero_title_2: 'mit Qubital.',
    hero_desc:
      'Wir laden Ingenieure, Forscher und Architekten ein, mit uns robuste, intelligente Lösungen zu entwickeln. Wir schätzen tiefe Expertise und Neugier.',
    btn_reach: 'Kontaktieren Sie uns',
    btn_principles: 'Unsere Prinzipien & Vorteile',
    benefits_tag: 'Vergütung & Rahmenbedingungen',
    benefits_title: 'Entworfen für Langlebigkeit, Fokus und tiefes Arbeiten.',
    benefits: [
      {
        title: 'Marktführende Vergütung',
        desc: 'Transparente Grundvergütung & Erfolgsprämien',
      },
      {
        title: 'Kontinuierliches Lernen',
        desc: 'Budget für Weiterbildung & Forschung',
      },
      {
        title: 'Hochleistungs-Hardware',
        desc: 'Individuelle Workstations & Flaggschiff-Monitore',
      },
      {
        title: 'Autonomie & Flexibilität',
        desc: 'Großzügiger Urlaub, flexible Zeiten & Remote',
      },
    ],
    blueprint_tag: 'Räumliches Hybrid-Modell',
    blueprint_title:
      'Wir kombinieren den Fokus von Remote-Arbeit mit intensiver Zusammenarbeit vor Ort.',
    network_tag: 'Talent-Netzwerk',
    network_title: 'Interesse an einer Karriere bei Qubital?',
    network_desc:
      'Auch ohne spezifische offene Stellen freuen wir uns jederzeit über Initiativbewerbungen von herausragenden Talenten.',
    network_email: 'E-Mail: contact@qubital.eu',
  },
  compliance_page: {
    title: 'Informationssicherheits-Governance',
    subtitle: 'Sicherheits- & Compliance-Framework',
    sec_1_title: 'Unsere Sicherheitsstandards',
    sec_1_desc:
      'Qubital arbeitet unter einem strengen Governance-Framework im Einklang mit ISO/IEC 27001, BSI C5, TISAX Level 3 und DSGVO.',
    sec_2_title: 'ISO 27001 Zertifizierung',
    sec_2_desc:
      'Unser Informationssicherheits-Managementsystem (ISMS) ist nach ISO/IEC 27001 zertifiziert und sichert Risikomanagement ab.',
    sec_3_title: 'BSI C5 Konformität',
    sec_3_desc:
      'Wir richten uns nach dem C5-Kriterienkatalog des Bundesamts für Sicherheit in der Informationstechnik (BSI).',
    sec_4_title: 'Zero-Trust-Architektur',
    sec_4_desc:
      'Alle internen Systeme setzen auf Zero-Trust-Netzwerkprinzipien mit mTLS-Verifizierung und segmentierten VPCs.',
    sec_5_title: 'Sicherheitsanfragen',
    sec_5_desc: 'Für Sicherheitsauskünfte oder Compliance-Dokumente kontaktieren Sie bitte',
  },
  impressum_page: {
    title: 'Impressum',
    subtitle: 'Angaben gemäß § 5 TMG',
    sec_1_title: 'Unternehmensangaben',
    sec_1_company: 'Qubital Systems GmbH',
    sec_1_location: 'Herzogenaurach, Bayern, Deutschland',
    sec_2_title: 'Kontakt',
    sec_2_email: 'E-Mail:',
    sec_2_hours: 'Geschäftszeiten: Mo – Fr, 08:00 – 18:00 Uhr CET',
    sec_3_title: 'Verantwortlich für den Inhalt',
    sec_3_desc:
      'Gemäß § 55 Abs. 2 RStV: Qubital Systems GmbH, Herzogenaurach, Bayern, Deutschland.',
    sec_4_title: 'Haftungsausschluss',
    sec_4_desc:
      'Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität übernehmen wir keine Gewähr.',
  },
  privacy_page: {
    title: 'Datenschutzerklärung & DSGVO',
    intro:
      'Die Qubital Systems GmbH verpflichtet sich zum Schutz personenbezogener Daten gemäß der EU-Datenschutz-Grundverordnung (DSGVO) und deutschen Datenschutzgesetzen.',
    sec_1_title: 'Verantwortlicher',
    sec_1_desc: 'Qubital Systems GmbH, Herzogenaurach, Bayern, Deutschland.',
    sec_2_title: 'Erfasste Daten',
    sec_2_desc:
      'Wir erfassen nur Daten, die für die Erbringung unserer Beratungsdienstleistungen unbedingt erforderlich sind.',
    sec_3_title: 'Ihre Rechte',
    sec_3_desc:
      'Gemäß DSGVO haben Sie das Recht auf Auskunft, Berichtigung, Löschung und Übertragbarkeit Ihrer Daten. Kontaktieren Sie uns unter',
    sec_4_title: 'Cookies',
    sec_4_desc:
      'Diese Website verwendet keine Tracking-Cookies. Es werden nur technisch notwendige Sitzungs-Cookies eingesetzt.',
  },
  mission_page: {
    tag: 'UNSERE MISSION & VISION',
    hero_title_1: 'Architektonische Klarheit in einer Ära von',
    hero_title_2: 'Technologischer Entropie.',
    hero_desc:
      'Unternehmen leiden unter fragmentierten Altsystemen, Anbieterabhängigkeiten und unkontrollierter Softwarekomplexität. Qubital wurde gegründet, um mit europäischer Ingenieursdisziplin nachhaltige architektonische Klarheit zu schaffen.',
    pillars_tag: 'GRUNDLEGENDE PRINZIPIEN',
    pillars_title: 'Die Leitlinien jeder unserer Architekturen',
    pillars: [
      {
        id: 1,
        icon: 'hub',
        title: 'Architektonische Souveränität & Clean Core',
        desc: 'Kein Vendor-Lock-in. Wir entwickeln modulare, API-gestützte Systeme, bei denen Unternehmenslogik und Daten vollständig unter Ihrer Kontrolle bleiben.',
      },
      {
        id: 2,
        icon: 'verified_user',
        title: 'DIN- & ISO-Governance als Standard',
        desc: 'Deutsche Präzision angewandt auf Software. Jede Architektur erfüllt strikte ISO 27001-, BSI C5- und DSGVO-Standards.',
      },
      {
        id: 3,
        icon: 'shield',
        title: 'Nachhaltige Stabilität statt Schnellschüsse',
        desc: 'Wir bauen Systeme für Jahrzehnte. Kein instabiler Wegwerfcode, keine undokumentierten Abkürzungen und keine versteckten technischen Schulden.',
      },
      {
        id: 4,
        icon: 'analytics',
        title: 'Meilensteinbasierte Transparenz',
        desc: 'Feste Projektphasen, messbare RFC-Ergebnisse und verlässliche Budgets ohne versteckte Mehrkosten. Direkter Zugang zu leitenden Architekten.',
      },
    ],
    roadmap_tag: 'ARCHITEKTONISCHE TRANSFORMATION',
    roadmap_title: 'Vom Systemchaos zur souveränen Architektur',
    roadmap_steps: [
      {
        phase: 'PHASE 01',
        title: 'Systemische Entkopplung',
        desc: 'Isolation starrer Monolithen und präzise Prüfung von Schnittstellenabhängigkeiten zur Schaffung klarer Systemgrenzen.',
      },
      {
        phase: 'PHASE 02',
        title: 'Clean-Core-Modernisierung',
        desc: 'Refactoring zentraler Geschäftslogiken in skalierbare Cloud-Microservices und moderne ERP-Fundamente.',
      },
      {
        phase: 'PHASE 03',
        title: 'Autonome Skalierbarkeit',
        desc: 'Bereitstellung einer resilienten Multi-Cloud-Topologie mit Zero-Trust-Sicherheit und proaktivem Monitoring.',
      },
    ],
    cta_title: 'Arbeiten Sie mit Architekten, die echte Ingenieurskunst leben.',
    cta_desc:
      'Vereinbaren Sie ein unverbindliches Erstgespräch zur Evaluierung Ihrer technischen Roadmap.',
    cta_btn: 'Architektur-Review vereinbaren',
    quote_text:
      'Wahre architektonische Klarheit entsteht nicht durch mehr Abstraktionen, sondern durch die ingenieurmäßige Überzeugung, Systemgrenzen zu isolieren, Abhängigkeiten zu beseitigen und langlebige, souveräne Systeme zu bauen.',
    quote_author: 'Qubital Architektur-Manifest',
    quote_location: 'Herzogenaurach, Bayern',
    tenet_label: 'Grundsatz',
    guaranteed_standard: 'Garantierter Standard',
    verified_milestone: 'Verifizierter Meilenstein',
  },
  why_us_page: {
    tag: 'WARUM QUBITAL',
    hero_title_1: 'Präzisions-Engineering.',
    hero_title_2: 'Ohne Agentur-Overhead.',
    comparison_tag: 'DER DIREKTE VERGLEICH',
    comparison_title: 'Wie Qubital Beratung neu definiert',
    comparison_headers: {
      criteria: 'Kriterium',
      qubital: 'Qubital Systems',
      traditional: 'Klassische Beratungen / Agenturen',
    },
    comparison_rows: [
      {
        criteria: 'Projektteam',
        qubital: 'Direkte Zusammenarbeit mit Principal Architects und Senior Engineers',
        traditional: 'Senior Partner verkaufen; unerfahrene Junioren setzen um',
      },
      {
        criteria: 'Kern-Ergebnis',
        qubital: 'Produktionsreifer Code, tragfähige Systemarchitekturen & RFCs',
        traditional: 'Theoretische Folienpräsentationen und generische Ratschläge',
      },
      {
        criteria: 'Anbieterunabhängigkeit',
        qubital: '100% unabhängig; keine Provisionen oder versteckten Partnerquoten',
        traditional: 'Versteckte Anreize zur Bindung an bevorzugte Software-Ökosysteme',
      },
      {
        criteria: 'Kosten & Verlässlichkeit',
        qubital: 'Feste Meilenstein-Preise mit garantierten SLA-Benchmarks',
        traditional: 'Abrechnung nach Aufwand mit unkontrolliertem Scope Creep',
      },
      {
        criteria: 'Sicherheit & Compliance',
        qubital: 'ISO 27001, BSI C5 und DSGVO von Beginn an in die Architektur integriert',
        traditional: 'Wird oft nachgelagert behandelt oder an Subunternehmer vergeben',
      },
    ],
    cta_title: 'Erleben Sie den Unterschied seniorer Fachexpertise.',
    cta_desc:
      'Sprechen Sie direkt mit unseren Chefarchitekten über Ihre technischen Herausforderungen.',
    cta_btn: 'Architektur-Briefing buchen',
  },
};

export default dictionary;
