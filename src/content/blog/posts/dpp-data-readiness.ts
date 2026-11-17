import type { PostContent } from '../types';

export const dppDataReadiness: Record<'en' | 'de', PostContent> = {
  en: {
    title: 'Getting your data ready for the Digital Product Passport',
    description:
      'The Digital Product Passport is a data project first. How to collect product, material and supplier data, close the gaps and decide who may change and see what.',
    excerpt:
      'Most passport projects stall on data, not software. Six practical steps to get product, material and supplier data ready, and to keep it accurate after the first passport.',
    summary:
      'Most Digital Product Passport projects stall on data, not software. Start with one representative product, build a clean product record, model materials once and reuse them, request supplier evidence early, define who may change and see which data, and connect the passport to your master data so it stays accurate.',
    category: 'Digital Product Passport',
    keywords: [
      'Digital Product Passport data',
      'DPP readiness',
      'supplier data DPP',
      'bill of materials passport',
      'product data management',
      'ESPR preparation',
    ],
    body: [
      {
        type: 'p',
        text: 'Ask a project team what slows down their first Digital Product Passport and the answer is almost never the QR code or the publishing tool. It is the data: where it lives, who owns it, whether suppliers deliver it, and whether anyone notices when it goes out of date.',
      },
      {
        type: 'p',
        text: 'Here are six steps that work across product groups, whether you prepare for the battery passport in 2027 or for one of the ESPR product groups that follow.',
      },
      { type: 'h2', text: '1. Start with one product, not the whole catalogue' },
      {
        type: 'p',
        text: 'Pick a product that is representative: a typical bill of materials, a few key suppliers, one or two components with sustainability claims. Building one complete passport teaches you more about your gaps than any spreadsheet survey of all products.',
      },
      { type: 'h2', text: '2. Build a clean product record' },
      {
        type: 'p',
        text: 'Every passport hangs off a product identity: manufacturer, model, category, variant and a unique identifier. Many companies discover here that the same product has different numbers in ERP, PLM and the web shop. Settle on one identifier and map the others to it.',
      },
      { type: 'h2', text: '3. Map the composition once and reuse it' },
      {
        type: 'p',
        text: 'Bills of materials and material data are the heart of most passports. Model materials as reusable records with origin and recycled-content details, then link them to components and products. When a supplier changes a material, you update it in one place instead of in every passport.',
      },
      { type: 'h2', text: '4. Get supplier data in early' },
      {
        type: 'p',
        text: 'Supplier declarations take the longest. Tell suppliers early which information you need, in which format and by when. Ask for evidence, not just values: a test report or certificate that supports a recycled-content claim is worth more than a number in an email.',
      },
      {
        type: 'callout',
        text: 'Keep each piece of evidence attached to the product or material it supports. When an authority or a customer asks where a value comes from, the answer should be one click away.',
      },
      { type: 'h2', text: '5. Decide who may change and see what' },
      {
        type: 'p',
        text: 'A passport combines data from engineering, procurement, quality and suppliers, and shows parts of it to the public, to repairers and recyclers, and to authorities. Treat this like any other access design:',
      },
      {
        type: 'ul',
        items: [
          'Give every data group an owner who approves changes.',
          'Let suppliers contribute only to their own components, with their own accounts, not shared logins.',
          'Require approval before a passport is published, and log who changed what.',
          'Separate what is public from what only parties with a legitimate interest or authorities may see.',
        ],
      },
      {
        type: 'p',
        text: 'This is where our identity and access management background helps. Least privilege, clear ownership and audit trails apply to passport data just as they apply to SAP or Active Directory.',
      },
      { type: 'h2', text: '6. Plan for change, not for a one-off export' },
      {
        type: 'p',
        text: 'Products change, suppliers change and regulations add fields. A passport is not a document you export once; it must stay accurate for the life of the product. Connect the passport to the systems that hold your master data, review readiness regularly, and treat new delegated acts as change requests.',
      },
      { type: 'h2', text: 'Where DPPSpace fits' },
      {
        type: 'p',
        text: 'DPPSpace follows these steps: a product record, a reusable material library, supplier and evidence linkage, and a readiness view that shows what is still missing before you publish. If you want to work through the steps with your own product, book a demo or contact us for a data readiness check.',
      },
    ],
  },
  de: {
    title: 'Daten für den digitalen Produktpass vorbereiten',
    description:
      'Der digitale Produktpass ist zuerst ein Datenprojekt. So sammeln Sie Produkt-, Material- und Lieferantendaten, schließen Lücken und regeln, wer was ändern und sehen darf.',
    excerpt:
      'Die meisten Produktpass-Projekte stocken an den Daten, nicht an der Software. Sechs praktische Schritte, um Produkt-, Material- und Lieferantendaten fit zu machen – und aktuell zu halten.',
    summary:
      'Die meisten Produktpass-Projekte scheitern an den Daten, nicht an der Software. Beginnen Sie mit einem repräsentativen Produkt, bauen Sie einen sauberen Produktdatensatz auf, erfassen Sie Materialien einmal und verwenden Sie sie wieder, fordern Sie Lieferantennachweise früh an, regeln Sie Zugriffe und verbinden Sie den Pass mit Ihren Stammdaten.',
    category: 'Digitaler Produktpass',
    keywords: [
      'Daten digitaler Produktpass',
      'DPP-Readiness',
      'Lieferantendaten DPP',
      'Stückliste Produktpass',
      'Produktdatenmanagement',
      'ESPR Vorbereitung',
    ],
    body: [
      {
        type: 'p',
        text: 'Fragen Sie ein Projektteam, was seinen ersten digitalen Produktpass bremst, und die Antwort ist fast nie der QR-Code oder das Veröffentlichungswerkzeug. Es sind die Daten: wo sie liegen, wem sie gehören, ob Lieferanten sie liefern und ob jemand merkt, wenn sie veralten.',
      },
      {
        type: 'p',
        text: 'Hier sind sechs Schritte, die über Produktgruppen hinweg funktionieren – ob Sie sich auf den Batteriepass 2027 vorbereiten oder auf eine der folgenden ESPR-Produktgruppen.',
      },
      { type: 'h2', text: '1. Mit einem Produkt beginnen, nicht mit dem ganzen Katalog' },
      {
        type: 'p',
        text: 'Wählen Sie ein repräsentatives Produkt: eine typische Stückliste, einige wichtige Lieferanten, ein oder zwei Komponenten mit Nachhaltigkeitsangaben. Ein vollständiger Pass zeigt Ihnen mehr über Ihre Lücken als jede Tabellenumfrage über alle Produkte.',
      },
      { type: 'h2', text: '2. Einen sauberen Produktdatensatz aufbauen' },
      {
        type: 'p',
        text: 'Jeder Pass hängt an einer Produktidentität: Hersteller, Modell, Kategorie, Variante und eine eindeutige Kennung. Viele Unternehmen stellen hier fest, dass dasselbe Produkt im ERP, im PLM und im Webshop unterschiedliche Nummern hat. Legen Sie sich auf eine Kennung fest und ordnen Sie die anderen ihr zu.',
      },
      { type: 'h2', text: '3. Die Zusammensetzung einmal erfassen und wiederverwenden' },
      {
        type: 'p',
        text: 'Stücklisten und Materialdaten sind das Herz der meisten Pässe. Bilden Sie Materialien als wiederverwendbare Datensätze mit Herkunft und Rezyklatanteil ab und verknüpfen Sie sie mit Komponenten und Produkten. Ändert ein Lieferant ein Material, pflegen Sie es an einer Stelle statt in jedem Pass.',
      },
      { type: 'h2', text: '4. Lieferantendaten früh einholen' },
      {
        type: 'p',
        text: 'Lieferantenerklärungen dauern am längsten. Sagen Sie Ihren Lieferanten früh, welche Angaben Sie brauchen, in welchem Format und bis wann. Fordern Sie Nachweise an, nicht nur Werte: Ein Prüfbericht oder Zertifikat, das einen Rezyklatanteil belegt, ist mehr wert als eine Zahl in einer E-Mail.',
      },
      {
        type: 'callout',
        text: 'Hängen Sie jeden Nachweis an das Produkt oder Material, das er belegt. Wenn eine Behörde oder ein Kunde fragt, woher ein Wert stammt, sollte die Antwort einen Klick entfernt sein.',
      },
      { type: 'h2', text: '5. Festlegen, wer was ändern und sehen darf' },
      {
        type: 'p',
        text: 'Ein Pass vereint Daten aus Entwicklung, Einkauf, Qualität und von Lieferanten und zeigt Teile davon der Öffentlichkeit, Reparaturbetrieben und Recyclern sowie Behörden. Behandeln Sie das wie jedes andere Berechtigungskonzept:',
      },
      {
        type: 'ul',
        items: [
          'Geben Sie jeder Datengruppe eine verantwortliche Person, die Änderungen freigibt.',
          'Lassen Sie Lieferanten nur zu ihren eigenen Komponenten beitragen, mit eigenen Konten statt geteilter Zugänge.',
          'Verlangen Sie eine Freigabe, bevor ein Pass veröffentlicht wird, und protokollieren Sie, wer was geändert hat.',
          'Trennen Sie, was öffentlich ist, von dem, was nur Berechtigte mit berechtigtem Interesse oder Behörden sehen dürfen.',
        ],
      },
      {
        type: 'p',
        text: 'Hier hilft unsere Erfahrung im Identity und Access Management. Minimale Rechte, klare Verantwortung und Prüfpfade gelten für Passdaten genauso wie für SAP oder Active Directory.',
      },
      { type: 'h2', text: '6. Auf Veränderung planen, nicht auf einen einmaligen Export' },
      {
        type: 'p',
        text: 'Produkte ändern sich, Lieferanten wechseln, und Vorschriften fügen Felder hinzu. Ein Pass ist kein Dokument, das man einmal exportiert; er muss über die Lebensdauer des Produkts stimmen. Verbinden Sie den Pass mit den Systemen, die Ihre Stammdaten halten, prüfen Sie den Reifegrad regelmäßig und behandeln Sie neue delegierte Rechtsakte als Änderungsanforderungen.',
      },
      { type: 'h2', text: 'Wo DPPSpace ansetzt' },
      {
        type: 'p',
        text: 'DPPSpace folgt diesen Schritten: ein Produktdatensatz, eine wiederverwendbare Materialbibliothek, die Verknüpfung von Lieferanten und Nachweisen und eine Reifeansicht, die vor der Veröffentlichung zeigt, was noch fehlt. Wenn Sie die Schritte mit Ihrem eigenen Produkt durchgehen möchten, buchen Sie eine Demo oder sprechen Sie uns auf einen Daten-Readiness-Check an.',
      },
    ],
  },
};
