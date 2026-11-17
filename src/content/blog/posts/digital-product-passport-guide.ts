import type { PostContent } from '../types';

export const digitalProductPassportGuide: Record<'en' | 'de', PostContent> = {
  en: {
    title: 'The EU Digital Product Passport explained: what it is and when it applies',
    description:
      'What the EU Digital Product Passport is, which products need one and when, what data it holds, and how manufacturers can prepare under the ESPR and the Battery Regulation.',
    excerpt:
      'Batteries first, then steel, textiles, tyres and furniture. A plain-language guide to the EU Digital Product Passport: what it contains, who needs one and when.',
    category: 'Digital Product Passport',
    keywords: [
      'Digital Product Passport',
      'EU DPP',
      'ESPR',
      'Ecodesign for Sustainable Products Regulation',
      'DPP registry',
      'battery passport',
    ],
    body: [
      {
        type: 'p',
        text: 'Scan a QR code on a product and see what it is made of, where it comes from, how to repair it and how to recycle it. That is the idea behind the EU Digital Product Passport (DPP). For manufacturers, it turns product data that is scattered across departments and suppliers into a legal obligation, product group by product group.',
      },
      {
        type: 'p',
        text: 'This guide explains what a passport is, which rules require it, when the first obligations apply and how to prepare without waiting for the last delegated act.',
      },
      { type: 'h2', text: 'What is a Digital Product Passport?' },
      {
        type: 'p',
        text: 'A DPP is a structured, machine-readable record about one product model, batch or item. It is reached through a data carrier on the product, its packaging or its documentation, usually a QR code. Behind the carrier sits a unique product identifier and the passport data itself.',
      },
      {
        type: 'ul',
        items: [
          'Identity: manufacturer, model, product category and unique identifier.',
          'Composition: materials, components, substances of concern and recycled content.',
          'Origin and supply chain: where materials and components come from.',
          'Sustainability: carbon footprint, durability and repairability information, where the product rules require it.',
          'End of life: instructions for disassembly, reuse and recycling.',
        ],
      },
      {
        type: 'p',
        text: 'Not everyone sees everything. The product rules define which information is public, which is reserved for repairers or recyclers, and which only authorities may access.',
      },
      { type: 'h2', text: 'The legal basis: ESPR and the Battery Regulation' },
      {
        type: 'p',
        text: 'Two EU regulations drive the passport. The Ecodesign for Sustainable Products Regulation (ESPR, Regulation (EU) 2024/1781) entered into force on 18 July 2024. It sets the general framework, and delegated acts then define the requirements and the passport content for each product group. The Battery Regulation (Regulation (EU) 2023/1542) already contains its own passport, with a fixed start date.',
      },
      {
        type: 'p',
        text: 'The passport data itself stays decentralised, with the manufacturer or a service provider it appoints. The ESPR required the Commission to set up a central registry by 19 July 2026. It holds the unique identifiers and key references, so that customs and market surveillance authorities can check products quickly.',
      },
      { type: 'h2', text: 'When does it apply?' },
      {
        type: 'ul',
        items: [
          'Batteries: from 18 February 2027, every EV battery, light means of transport (LMT) battery and industrial battery above 2 kWh placed on the EU market needs a passport.',
          'Iron and steel: the first ESPR delegated act is expected from late 2026.',
          'Textiles and apparel, aluminium and tyres: delegated acts are expected in 2027.',
          'Furniture in 2028 and mattresses in 2029, according to the Commission’s working plan 2025–2030.',
        ],
      },
      {
        type: 'callout',
        text: 'For ESPR product groups, the obligation usually applies about 18 months after the delegated act is adopted. The dates above are indicative, but the data work behind a passport takes longer than 18 months for most companies.',
      },
      { type: 'h2', text: 'What makes the passport hard in practice' },
      {
        type: 'p',
        text: 'The technology is rarely the problem. The data is. Specifications live in PLM, bills of materials in ERP, material declarations with suppliers, and test reports in folders. Nobody owns the complete picture, and supplier data often arrives in a different format every time.',
      },
      {
        type: 'p',
        text: 'There is also an access question. A passport mixes public information with data only some parties may see, and many people across the company and the supply chain contribute to it. Deciding who may enter, change, approve and read which fields is an identity and access management task, and it is easier to design at the start than to repair later.',
      },
      { type: 'h2', text: 'How to prepare now' },
      {
        type: 'ol',
        items: [
          'Find out which of your products fall under the Battery Regulation or an upcoming ESPR delegated act.',
          'Pick one representative product and collect its identity, composition, suppliers and evidence in one place.',
          'Identify the gaps, especially supplier declarations and recycled-content data, and start asking for them now.',
          'Decide who owns each part of the data and who approves a passport before publication.',
          'Choose a tool that can publish a machine-readable passport and connect to the EU registry.',
        ],
      },
      {
        type: 'p',
        text: 'We built DPPSpace for exactly this path: one workspace for product, material, supplier and evidence data, a readiness view that shows what is still missing, and registry submission for eligible passports. If you want to see it with a product from your industry, book a demo.',
      },
    ],
  },
  de: {
    title: 'Der digitale Produktpass der EU erklärt: was er ist und ab wann er gilt',
    description:
      'Was der digitale Produktpass der EU ist, welche Produkte ihn wann brauchen, welche Daten er enthält und wie sich Hersteller unter ESPR und Batterieverordnung vorbereiten.',
    excerpt:
      'Erst Batterien, dann Stahl, Textilien, Reifen und Möbel. Ein verständlicher Leitfaden zum digitalen Produktpass der EU: Inhalt, Pflichten und Zeitplan.',
    category: 'Digitaler Produktpass',
    keywords: [
      'Digitaler Produktpass',
      'DPP',
      'ESPR',
      'Ökodesign-Verordnung',
      'DPP-Register',
      'Batteriepass',
    ],
    body: [
      {
        type: 'p',
        text: 'Einen QR-Code auf einem Produkt scannen und sehen, woraus es besteht, woher es kommt, wie man es repariert und wie man es recycelt. Das ist die Idee hinter dem digitalen Produktpass (DPP) der EU. Für Hersteller wird damit aus Produktdaten, die über Abteilungen und Lieferanten verstreut sind, Schritt für Schritt eine gesetzliche Pflicht.',
      },
      {
        type: 'p',
        text: 'Dieser Leitfaden erklärt, was ein Produktpass ist, welche Regeln ihn vorschreiben, ab wann die ersten Pflichten gelten und wie Sie sich vorbereiten, ohne auf den letzten delegierten Rechtsakt zu warten.',
      },
      { type: 'h2', text: 'Was ist ein digitaler Produktpass?' },
      {
        type: 'p',
        text: 'Ein DPP ist ein strukturierter, maschinenlesbarer Datensatz zu einem Produktmodell, einer Charge oder einem einzelnen Artikel. Erreichbar ist er über einen Datenträger auf dem Produkt, der Verpackung oder den Unterlagen, meist einen QR-Code. Dahinter stehen eine eindeutige Produktkennung und die eigentlichen Passdaten.',
      },
      {
        type: 'ul',
        items: [
          'Identität: Hersteller, Modell, Produktkategorie und eindeutige Kennung.',
          'Zusammensetzung: Materialien, Komponenten, bedenkliche Stoffe und Rezyklatanteil.',
          'Herkunft und Lieferkette: woher Materialien und Komponenten stammen.',
          'Nachhaltigkeit: CO₂-Fußabdruck, Haltbarkeit und Reparierbarkeit, soweit die Produktregeln das verlangen.',
          'Lebensende: Hinweise zu Demontage, Wiederverwendung und Recycling.',
        ],
      },
      {
        type: 'p',
        text: 'Nicht jeder sieht alles. Die Produktregeln legen fest, welche Angaben öffentlich sind, welche Reparaturbetrieben oder Recyclern vorbehalten sind und welche nur Behörden einsehen dürfen.',
      },
      { type: 'h2', text: 'Die Rechtsgrundlage: ESPR und Batterieverordnung' },
      {
        type: 'p',
        text: 'Zwei EU-Verordnungen treiben den Produktpass. Die Ökodesign-Verordnung für nachhaltige Produkte (ESPR, Verordnung (EU) 2024/1781) ist am 18. Juli 2024 in Kraft getreten. Sie setzt den allgemeinen Rahmen; delegierte Rechtsakte legen dann für jede Produktgruppe die Anforderungen und den Inhalt des Passes fest. Die Batterieverordnung (Verordnung (EU) 2023/1542) enthält bereits einen eigenen Pass mit festem Starttermin.',
      },
      {
        type: 'p',
        text: 'Die Passdaten selbst bleiben dezentral beim Hersteller oder einem beauftragten Dienstleister. Die ESPR verpflichtete die Kommission, bis zum 19. Juli 2026 ein zentrales Register einzurichten. Es enthält die eindeutigen Kennungen und wichtige Verweise, damit Zoll und Marktüberwachung Produkte schnell prüfen können.',
      },
      { type: 'h2', text: 'Ab wann gilt was?' },
      {
        type: 'ul',
        items: [
          'Batterien: Ab dem 18. Februar 2027 braucht jede Traktionsbatterie für Elektrofahrzeuge, jede Batterie für leichte Verkehrsmittel (LV) und jede Industriebatterie über 2 kWh, die in der EU in Verkehr gebracht wird, einen Pass.',
          'Eisen und Stahl: Der erste delegierte Rechtsakt nach der ESPR wird ab Ende 2026 erwartet.',
          'Textilien und Bekleidung, Aluminium und Reifen: delegierte Rechtsakte werden für 2027 erwartet.',
          'Möbel 2028 und Matratzen 2029, laut Arbeitsplan der Kommission 2025–2030.',
        ],
      },
      {
        type: 'callout',
        text: 'Für ESPR-Produktgruppen gilt die Pflicht in der Regel etwa 18 Monate nach Annahme des delegierten Rechtsakts. Die Termine oben sind Richtwerte – die Datenarbeit hinter einem Pass dauert in den meisten Unternehmen aber länger als 18 Monate.',
      },
      { type: 'h2', text: 'Was den Produktpass in der Praxis schwierig macht' },
      {
        type: 'p',
        text: 'Selten ist es die Technik. Es sind die Daten. Spezifikationen liegen im PLM, Stücklisten im ERP, Materialdeklarationen bei Lieferanten und Prüfberichte in Ordnern. Niemand hat das vollständige Bild, und Lieferantendaten kommen oft jedes Mal in einem anderen Format.',
      },
      {
        type: 'p',
        text: 'Dazu kommt eine Zugriffsfrage. Ein Pass mischt öffentliche Angaben mit Daten, die nur bestimmte Beteiligte sehen dürfen, und viele Menschen im Unternehmen und in der Lieferkette tragen dazu bei. Wer welche Felder erfassen, ändern, freigeben und lesen darf, ist eine Aufgabe des Identity und Access Managements – und lässt sich am Anfang leichter gestalten als später reparieren.',
      },
      { type: 'h2', text: 'So bereiten Sie sich jetzt vor' },
      {
        type: 'ol',
        items: [
          'Klären Sie, welche Ihrer Produkte unter die Batterieverordnung oder einen kommenden delegierten Rechtsakt der ESPR fallen.',
          'Wählen Sie ein repräsentatives Produkt und führen Sie Identität, Zusammensetzung, Lieferanten und Nachweise an einem Ort zusammen.',
          'Erkennen Sie die Lücken, vor allem bei Lieferantenerklärungen und Rezyklatanteilen, und fordern Sie diese Daten jetzt an.',
          'Legen Sie fest, wem welcher Teil der Daten gehört und wer einen Pass vor der Veröffentlichung freigibt.',
          'Wählen Sie ein Werkzeug, das einen maschinenlesbaren Pass veröffentlichen und mit dem EU-Register verbinden kann.',
        ],
      },
      {
        type: 'p',
        text: 'Genau für diesen Weg haben wir DPPSpace gebaut: ein Arbeitsbereich für Produkt-, Material-, Lieferanten- und Nachweisdaten, eine Reifeansicht, die zeigt, was noch fehlt, und die Übermittlung berechtigter Pässe an das EU-Register. Wenn Sie DPPSpace mit einem Produkt aus Ihrer Branche sehen möchten, buchen Sie eine Demo.',
      },
    ],
  },
};
