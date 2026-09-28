const dictionary = {
  nav: {
    home: 'Home',
    about: 'About',
    services: 'Services',
    careers: 'Careers',
    contact: 'Contact',
    mission: 'Mission',
    why_us: 'Why Us',
  },
  header: {
    cta: 'Get in Touch',
    menu: 'MENU',
    close: 'CLOSE',
    open_menu: 'Open menu',
    close_menu: 'Close menu',
    change_language: 'Change language',
  },
  hero: {
    sub_headline: 'The IT partner for growing companies.',
    subtitle:
      'Software, cloud, security, and SAP, planned and run by senior engineers, so your systems scale without the chaos.',
    cta_primary: 'Explore Our Services',
    cta_secondary: 'Meet the Practice',
    scroll_hint: 'Scroll to explore',
  },
  bento: {
    cta: 'Learn more',
  },
  services: {
    heading: 'Core Capabilities',
    description: 'End-to-end technical leadership and engineering excellence.',
  },
  methodology: {
    eyebrow: 'METHODOLOGY',
    heading: 'How We Operate',
    cta_link: 'Explore Our Approach',
  },
  metrics: {
    eyebrow: 'HOW WE WORK',
    heading: 'Standards and practices you can check.',
    labels: {
      cloud_workloads: 'EU-hosted data',
      arch_reviews: 'No tracking cookies',
      sla_guarantee: 'Privacy by design',
      continuity_rate: 'Vendor-neutral advice',
    },
  },
  badges: {
    iso: 'Designed to ISO/IEC 27001',
    bsi: 'Designed to meet BSI C5',
    gdpr: 'GDPR data protection',
    tisax: 'NDA on request',
  },
  cta_banner: {
    heading: 'Ready to architect your next chapter?',
    description:
      'Schedule a discovery call with our principal architects to discuss your technical challenges and operational goals.',
    btn_primary: 'Schedule Advisory Call',
    btn_secondary: 'View Open Roles',
  },
  footer: {
    tagline:
      'IT advice, systems architecture and engineering governance for growing companies. Based in Germany.',
    regulatory: 'Regulatory',
    communications: 'Communications',
    languages: 'Languages',
    regulatory_links: {
      gdpr: 'GDPR & Privacy Policy',
      impressum: 'Impressum (§ 5 TMG)',
      compliance: 'Information Security Governance',
    },
  },
  not_found: {
    code: '404',
    heading: 'Page not found.',
    description: 'The page you are looking for does not exist or has been moved.',
    cta: 'Back to Home',
    links_heading: 'Or navigate to:',
  },
  contact_page: {
    title: 'Start a Conversation.',
    subtitle:
      'Reach out to our principal engineering team to discuss your digital transformation initiatives and architectural requirements.',
    form_title: 'Project Inquiry',
    security_badge: 'SECURE & CONFIDENTIAL',
    full_name: 'Full Name*',
    email: 'Corporate Email*',
    organization: 'Organization / Enterprise',
    domain: 'Engagement Domain*',
    domain_select: 'Select Domain...',
    message: 'Project Brief & Architectural Mandate*',
    nda: 'Require Mutual NDA Prior to Technical Discussion',
    priority: 'Priority:',
    priority_std: 'Standard (24-48h)',
    priority_urg: 'Urgent (Same Day)',
    submit: 'Transmit Brief',
    success_title: 'Inquiry Sent Successfully',
    success_desc:
      'Thank you for reaching out. Our team has received your message and will get back to you shortly.',
    submit_another: 'Submit another inquiry',
    channels_title: 'Direct Engineering Channels',
    headquarters: 'Headquarters',
    direct_email: 'Direct Email',
    hours: 'Operating Hours',
    protocol_title: 'Encrypted Communications',
    protocol_desc:
      'All inquiries are processed under strict European data protection standards (GDPR) and encrypted in transit via TLS 1.3.',
    domains: [
      'Enterprise Architecture',
      'Cloud Governance & FinOps',
      'Zero-Trust Cybersecurity',
      'Legacy Systems Modernization',
      'Virtual CIO Advisory',
    ],
    placeholders: {
      fullName: 'Anna Keller',
      email: 'a.keller@company.de',
      organization: 'Nordwerk GmbH',
      message:
        'Detail your operational bottlenecks, system constraints, or upcoming migration goals...',
    },
    security_protocol: 'Security Protocol',
    region: 'Nuremberg Metropolitan Region',
    location_full: 'Herzogenaurach, Bavaria, Germany',
    hours_val: 'Mon – Fri: 08:00 – 18:00 CET',
    val_name_required: 'Full Name is required',
    val_name_min: 'Name must be at least 2 characters',
    val_email_required: 'Corporate Email is required',
    val_email_invalid: 'Please enter a valid email address',
    val_domain_required: 'Please select a domain',
    val_message_required: 'Message is required',
    val_message_min: 'Message must be at least 10 characters',
    submitting: 'Sending…',
    val_submit_failed:
      'We could not send your message. Please try again, or email contact@qubital.eu directly.',
    val_too_long: 'This field is too long',
    consent_label: 'I have read and accept the {link}',
    consent_link_text: 'Privacy Policy',
    val_consent_required: 'Please accept the Privacy Policy to continue',
  },
  about_page: {
    hero_title_1: 'Strategic IT Advisory &',
    hero_title_2: 'Scalable Digital Systems.',
    hero_desc:
      'We engineer clarity across distributed architectures, providing enterprise technology leaders with the strategic insight and structural governance needed to scale without friction.',
    focus_tag: 'OUR FOCUS',
    focus_title: 'Operational Reliability',
    focus_desc:
      'Our work is built to make migrations predictable and keep your systems consistent while they change.',
    focus_items: ['System Architecture', 'Cloud Orchestration', 'Security Governance'],
    mission_tag: 'Core Mandate / Mission Statement',
    mission_quote:
      '"Helping companies take back control of their systems through clear governance and transparent architecture."',
    mission_desc:
      'We believe that enterprise technology should be a lever for clarity, not a source of operational friction. Our mission is to decouple business logic from underlying complexity, giving organizations true sovereignty over their digital infrastructure.',
    mission_badges: ['Strategy Alignment', 'Systems Decoupling', 'Engineering Sovereignty'],
    origins_tag: 'ORIGINS & STANCE',
    origins_title: 'Built for the multi-cloud, AI-native reality.',
    origins_desc:
      'Founded by former enterprise engineering leaders in Herzogenaurach, Qubital was established to bridge the gap between high-level IT strategy and ground-level technical implementation.',
    story_p1:
      'The genesis of Qubital came from a simple observation: as enterprise systems grow more capable, they paradoxically become more opaque. Organizations were losing control of their own architectures to vendor lock-in, shadow IT, and undocumented legacy dependencies.',
    story_p2:
      'We built our practice around a simple idea: clear boundaries between systems. A change or failure in one part should not force rewrites everywhere else.',
    principles_title: 'Our Guiding Principles',
    principles: [
      {
        title: 'Structural Integrity Over Feature Velocity',
        desc: 'We prioritize building systems that survive team changes, vendor shifts, and scaling events.',
      },
      {
        title: 'Observe, Document, Architect, Then Build',
        desc: 'No code is written and no system is migrated before the current state is exhaustively mapped.',
      },
      {
        title: 'Minimize Externalities and Dependency Risk',
        desc: 'Every third-party integration is treated as a potential vector for failure and governed accordingly.',
      },
      {
        title: 'Engineer for Handover, Not Personal Heroics',
        desc: 'Systems should be understandable by the junior engineer onboarding tomorrow, not just the principal who wrote it today.',
      },
    ],
    stats: [
      {
        value: '6',
        label: 'Service Areas',
      },
      {
        value: '6',
        label: 'Languages Supported',
      },
      {
        value: 'EU',
        label: 'Data Residency',
      },
      {
        value: '0',
        label: 'Tracking Cookies',
      },
    ],
    diff_tag: 'DIFFERENTIATORS',
    diff_title: 'Why Choose Qubital',
    diff_items: [
      {
        icon: 'verified',
        title: 'Vendor Neutrality & Open Standards',
        desc: "We're not tied to reseller quotas or vendor commissions, so our advice is based on what fits your systems and budget.",
      },
      {
        icon: 'shield_locked',
        title: 'German Engineering Governance',
        desc: 'Based in Herzogenaurach and working to recognised security and data-protection standards, we build systems that hold up to review.',
      },
      {
        icon: 'support_agent',
        title: 'Direct Principal Access',
        desc: 'When you work with Qubital, you talk directly to the senior engineers doing the work, with no account managers in between.',
      },
    ],
    cta_title: 'Let us map your technical landscape.',
    cta_desc:
      "Initiate a confidential assessment of your current infrastructure. We'll identify architectural bottlenecks, security vulnerabilities, and scalability constraints.",
    cta_btn_primary: 'Request Executive Briefing',
    cta_btn_secondary: 'Direct Advisory Line',
  },
  services_page: {
    hero_title_1: 'Core Capabilities &',
    hero_title_2: 'Advisory Services.',
    hero_desc:
      'Turning technical complexity into operational simplicity. We provide structured engineering and strategic oversight for modern businesses.',
    hero_cta: 'Engage Advisory Practice',
    matrix_tag: 'PRACTICE MATRIX',
    matrix_title: 'Structured Competency Disciplines',
    matrix_desc:
      'Our core practice areas combine reliable engineering standards with strategic business alignment to deliver clean, scalable digital solutions.',
    matrix_cards: [
      {
        tag: 'DEV',
        icon: 'terminal',
        id: 'software',
        title: 'Software Development',
        description:
          'Custom web applications and digital tools built to streamline your daily business workflows and scale with your growth.',
        items: [
          'Tailored Web & Mobile Apps',
          'Seamless System Integration',
          'Fast & Reliable Performance',
        ],
        focus: 'Custom Solutions',
      },
      {
        tag: 'OPS',
        icon: 'dns',
        id: 'managed-it',
        title: 'Managed IT Support',
        description:
          'Proactive IT care, continuous system health monitoring, and fast support to keep your business running smoothly.',
        items: ['24/7 System Monitoring', 'Quick Technical Support', 'Team Onboarding & Setup'],
        focus: 'Zero Downtime',
      },
      {
        tag: 'CLOUD',
        icon: 'cloud',
        id: 'cloud',
        title: 'Cloud Infrastructure',
        description:
          'Reliable cloud setup, migration, and management to keep your data secure, accessible, and cost-efficient.',
        items: [
          'Smooth Cloud Migration',
          'Monthly Cost Optimization',
          'Guaranteed Backups & Uptime',
        ],
        focus: 'AWS • Azure • GCP',
      },
      {
        tag: 'SEC',
        icon: 'security',
        id: 'cybersecurity',
        title: 'Cybersecurity & Safety',
        description:
          'Simple, effective security standards to protect your company files, customer data, and employee devices.',
        items: ['Data Protection & Privacy', 'Secure Access Controls', 'Threat Defense & Audits'],
        focus: 'Data Protection',
      },
      {
        tag: 'AUTO',
        icon: 'smart_toy',
        id: 'specialized-tech',
        title: 'AI & Automation',
        description:
          'Smart tools and automated workflows that eliminate repetitive manual tasks so your team can focus on what matters.',
        items: ['Workflow Automation', 'Smart AI Tool Integration', 'Time-Saving Workflows'],
        focus: 'Efficiency',
      },
      {
        tag: 'SAP',
        icon: 'layers',
        id: 'sap',
        title: 'SAP Solutions & Architecture',
        description:
          'Enterprise S/4HANA migrations, clean-core strategy, and custom SAP BTP integrations designed for reliability and scalability.',
        items: [
          'S/4HANA Cloud & Clean Core',
          'SAP BTP & ABAP Extensions',
          'ERP Performance Optimization',
        ],
        focus: 'Enterprise ERP',
      },
    ],
    methodology_tag: 'EXECUTION METHODOLOGY',
    methodology_title: 'How Qubital Works',
    methodology_desc:
      'Our standardized four-phase lifecycle ensures transparency, risk mitigation, and predictable outcomes from discovery to production deployment.',
    cta_title: 'Discuss your technical roadmap with our advisory team.',
    cta_desc:
      'Schedule a preliminary discovery call to evaluate structural alignment and technical feasibility.',
    cta_nda: 'Confidential NDA Standard',
    cta_direct: 'Direct Access to Principals',
    cta_btn_primary: 'Schedule Initial Review',
    cta_btn_secondary: 'Direct Email',
  },
  methodology_steps: [
    {
      id: 1,
      phase: 'PHASE 01',
      title: 'Assess & Audit',
      icon: 'search_insights',
      desc: 'Deep architectural discovery and systemic audit of current topologies and performance bottlenecks.',
      deliverable: 'Target GAP Analysis & RFC',
    },
    {
      id: 2,
      phase: 'PHASE 02',
      title: 'Design & Blueprint',
      icon: 'architecture',
      desc: 'Target Operating Model (TOM) definition, security modeling, and infrastructure blueprints.',
      deliverable: 'System Architecture Blueprint',
    },
    {
      id: 3,
      phase: 'PHASE 03',
      title: 'Implement & Deploy',
      icon: 'build_circle',
      desc: 'Iterative rollout with CI/CD rigor, automated testing, and zero-downtime production deployment.',
      deliverable: 'Production Release Sign-Off',
    },
    {
      id: 4,
      phase: 'PHASE 04',
      title: 'Optimize & Govern',
      icon: 'monitoring',
      desc: 'Continuous telemetry monitoring, FinOps cost feedback loops, and proactive SLA compliance.',
      deliverable: 'QBR Performance Log & SLA',
    },
  ],
  careers_page: {
    hero_title_1: 'Build Intelligent Systems',
    hero_title_2: 'with Qubital.',
    hero_desc:
      'We are inviting engineers, researchers, and systems architects to join us in building robust, intelligent solutions. We value deep technical expertise, clarity of thought, and relentless curiosity.',
    btn_reach: 'Reach Out to Us',
    btn_principles: 'Our Principles & Benefits',
    benefits_tag: 'Total Compensation & Framework',
    benefits_title: 'Designed for longevity, focus, and deep work.',
    benefits: [
      {
        title: 'Competitive Pay',
        desc: 'Clear base salary and performance bonuses',
      },
      {
        title: 'Continuous Mastery',
        desc: 'Dedicated Upskilling & Research Budget',
      },
      {
        title: 'Proper Hardware',
        desc: 'A well-specced workstation and monitors',
      },
      {
        title: 'Work-Life Autonomy',
        desc: 'Generous PTO, Flexible Hours & Remote',
      },
    ],
    blueprint_tag: 'How We Work',
    blueprint_title:
      'We combine focused remote work with in-person sessions where the team builds together.',
    network_tag: 'Talent Network',
    network_title: 'Interested in joining Qubital?',
    network_desc:
      "While we don't have active job listings open right now, we are always eager to connect with extraordinary engineering talent. If you have deep expertise, we'd love to hear from you.",
    network_email: 'Email Us: contact@qubital.eu',
  },
  compliance_page: {
    title: 'Information Security Governance',
    subtitle: 'Security & Compliance Framework',
    sec_1_title: 'Our Security Standards',
    sec_1_desc:
      'We work to recognised information security standards, including ISO/IEC 27001 and the BSI C5 criteria, alongside GDPR requirements.',
    sec_2_title: 'ISO/IEC 27001',
    sec_2_desc:
      'We design our information security management practices against ISO/IEC 27001, covering risk management, asset protection and continual improvement of our controls.',
    sec_3_title: 'BSI C5',
    sec_3_desc:
      'We align with the BSI Cloud Computing Compliance Criteria Catalogue (C5), the German Federal Office for Information Security standard for cloud service providers.',
    sec_4_title: 'Zero-Trust Architecture',
    sec_4_desc:
      'We apply zero-trust principles across our internal systems and client environments, including strong authentication and separated networks.',
    sec_5_title: 'Security Inquiries',
    sec_5_desc:
      'For security disclosures or compliance documentation requests, contact our security team at',
  },
  impressum_page: {
    title: 'Impressum',
    subtitle: 'Legal Notice pursuant to § 5 TMG',
    sec_1_title: 'Company Information',
    sec_1_company: 'Qubital Systems GmbH',
    sec_1_location: 'Herzogenaurach, Bavaria, Germany',
    sec_2_title: 'Contact',
    sec_2_email: 'Email:',
    sec_2_hours: 'Business Hours: Mon – Fri, 08:00 – 18:00 CET',
    sec_3_title: 'Responsible for Content',
    sec_3_desc:
      'Pursuant to § 55 Abs. 2 RStV: Qubital Systems GmbH, Herzogenaurach, Bavaria, Germany.',
    sec_4_title: 'Disclaimer',
    sec_4_desc:
      'The information provided on this website is for general informational purposes only. Qubital Systems GmbH assumes no liability for the accuracy, completeness, or timeliness of the content.',
  },
  privacy_page: {
    title: 'Privacy Policy & GDPR',
    intro:
      'Qubital Systems GmbH is committed to the protection of personal data in accordance with the EU General Data Protection Regulation (GDPR) and applicable German data protection laws.',
    sec_1_title: 'Data Controller',
    sec_1_desc: 'Qubital Systems GmbH, Herzogenaurach, Bavaria, Germany.',
    sec_2_title: 'Data We Collect',
    sec_2_desc:
      'We collect only data that is strictly necessary for providing our advisory and engineering services. This includes contact form submissions, correspondence, and contractual data. Contact form data — your name, corporate email address, organization, engagement domain and message — is processed to answer your inquiry (Art. 6(1)(b) and (f) GDPR). Email delivery is handled by Resend and product analytics by PostHog, both acting as our processors under Art. 28 GDPR, with PostHog hosted in the EU.',
    sec_3_title: 'Your Rights',
    sec_3_desc:
      'Under GDPR, you have the right to access, correct, delete, and port your personal data. To exercise these rights, contact us at',
    sec_4_title: 'Cookies',
    sec_4_desc:
      'This website does not use tracking cookies. We use only essential session cookies required for site functionality. For product analytics we use PostHog, configured to store no cookies in your browser and to respect the Do Not Track signal; the resulting statistics are pseudonymous and are not used to identify you.',
  },
  mission_page: {
    tag: 'OUR MISSION & VISION',
    hero_title_1: 'Engineering Clarity in an Era of',
    hero_title_2: 'Rising Complexity.',
    hero_desc:
      'Enterprises are weighed down by fragmented legacy tech stacks, vendor dependency, and spiraling software complexity. Qubital was founded to restore architectural discipline through European engineering precision.',
    pillars_tag: 'FOUNDATIONAL TENETS',
    pillars_title: 'The Principles That Guide Every Architecture',
    pillars: [
      {
        id: 1,
        icon: 'hub',
        title: 'Control & Clean Core',
        desc: 'No vendor lock-in. We build modular, API-first systems where your data and core logic stay under your control.',
      },
      {
        id: 2,
        icon: 'verified_user',
        title: 'Security & Data Standards by Default',
        desc: 'We design every blueprint against recognised standards such as ISO/IEC 27001 and the BSI C5 criteria, and to meet GDPR requirements.',
      },
      {
        id: 3,
        icon: 'shield',
        title: 'Long-Term Resilience over Quick Hacks',
        desc: 'We engineer systems built to run reliably for decades. No fragile throwaway code, no undocumented shortcuts, and no technical debt masked as velocity.',
      },
      {
        id: 4,
        icon: 'analytics',
        title: 'Milestone-Driven Transparency',
        desc: 'Fixed delivery phases, clear deliverables, and transparent milestone-based billing. Direct access to the senior engineers doing the work.',
      },
    ],
    roadmap_tag: 'ARCHITECTURAL TRANSFORMATION',
    roadmap_title: 'From Legacy Sprawl to Systems You Control',
    roadmap_steps: [
      {
        phase: 'PHASE 01',
        title: 'Untangle What Is Stuck Together',
        desc: 'Separate tightly coupled legacy systems and map the hidden dependencies between them.',
      },
      {
        phase: 'PHASE 02',
        title: 'Clean-Core Modernization',
        desc: 'Refactoring core business workflows into scalable cloud microservices, modern ERP foundations, and standard API layers.',
      },
      {
        phase: 'PHASE 03',
        title: 'Autonomous Scalability',
        desc: 'Delivering resilient, multi-cloud topologies equipped with zero-trust security and proactive automated observability.',
      },
    ],
    cta_title: 'Partner with architects who prioritize engineering discipline.',
    cta_desc:
      'Schedule an introductory review to evaluate your enterprise technical roadmap and decoupling strategy.',
    cta_btn: 'Schedule Architectural Review',
    quote_text:
      "True architectural clarity isn't adding more abstractions; it's having the engineering conviction to isolate boundaries, eliminate dependencies, and build sovereign systems that endure.",
    quote_author: 'Qubital Architectural Manifesto',
    quote_location: 'Herzogenaurach, Bavaria',
    tenet_label: 'Tenet',
    guaranteed_standard: 'Guaranteed Standard',
    verified_milestone: 'Verified Milestone',
  },
  why_us_page: {
    tag: 'WHY QUBITAL',
    hero_title_1: 'Precision Engineering.',
    hero_title_2: 'Zero Agency Overhead.',
    comparison_tag: 'THE DIRECT COMPARISON',
    comparison_title: 'How Qubital Compares with Keeping IT In-House',
    comparison_headers: {
      criteria: 'Criteria',
      qubital: 'Qubital Systems',
      traditional: 'In-House IT / Status Quo',
    },
    comparison_rows: [
      {
        criteria: 'Capacity & Skills',
        qubital:
          'Senior engineers across software, cloud, security and SAP, available when you need them',
        traditional: 'A small team stretched across everything, with gaps you fill by hiring',
      },
      {
        criteria: 'Delivery',
        qubital: 'Production systems, clear documentation, and work that ships',
        traditional: 'A growing backlog; projects stall when the team is busy',
      },
      {
        criteria: 'Continuity',
        qubital: 'Documented systems your team can pick up and own',
        traditional: 'Critical knowledge held by whoever built it, and no one else',
      },
      {
        criteria: 'Cost & Focus',
        qubital: 'Fixed, milestone-based engagements you can plan around',
        traditional: 'Salaries, tooling and hiring risk for skills you only need sometimes',
      },
      {
        criteria: 'Security & Compliance',
        qubital: 'Security and data protection designed in from the start',
        traditional: 'Addressed late, when an audit or incident forces it',
      },
    ],
    cta_title: 'Experience the difference of senior-led engineering.',
    cta_desc:
      'Talk directly to our principal architects to review your technical challenges and architectural goals.',
    cta_btn: 'Book an Architecture Briefing',
  },
};

export default dictionary;
