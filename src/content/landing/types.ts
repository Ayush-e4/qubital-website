export type LinkData = { label: string; href: string };
type Item = { title: string; text: string };

export type LandingSection =
  | { id: string; type: 'text'; heading: string; paragraphs: string[]; intro?: string }
  | {
      id: string;
      type: 'table';
      heading: string;
      columns: string[];
      rows: string[][];
      after?: string;
      intro?: string;
    }
  | {
      id: string;
      type: 'steps';
      heading: string;
      intro?: string;
      items: (Item & { duration: string })[];
    }
  | {
      id: string;
      type: 'checklist' | 'features';
      heading: string;
      intro?: string;
      items: Item[];
      link?: LinkData;
    }
  | {
      id: string;
      type: 'proof';
      heading: string;
      /** Hidden while null: only real, approved project examples go here. */
      content: { text: string; quote?: string; source?: string } | null;
      placeholder?: string;
    }
  | { id: string; type: 'faq'; heading: string; items: { q: string; a: string }[] }
  | {
      id: string;
      type: 'cta';
      heading: string;
      text: string;
      cta: LinkData;
      secondary: LinkData;
    };

export type LandingContent = {
  locale: string;
  /** Public path including the locale prefix, e.g. /de/sap-idm-abloesung. */
  path: string;
  alternates: Record<string, string>;
  meta: { title: string; description: string; ogImageAlt: string };
  service: { serviceType: string; ogImage: string };
  breadcrumb: { name: string; href: string }[];
  hero: {
    eyebrow: string;
    h1: string;
    lead: string;
    cta: LinkData;
    secondaryCta: LinkData;
    facts: { value: string; label: string }[];
  };
  sections: LandingSection[];
};
