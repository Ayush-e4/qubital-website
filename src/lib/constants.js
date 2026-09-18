export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Mission", path: "/mission" },
  { label: "Why Us", path: "/why-us" },
  { label: "Services", path: "/services" },
  { label: "Careers", path: "/careers" },
  { label: "Contact", path: "/contact" },
];

export const FOOTER_LINKS = {
  company: [
    { key: "about", label: "About", path: "/about" },
    { key: "mission", label: "Mission", path: "/mission" },
    { key: "why_us", label: "Why Us", path: "/why-us" },
    { key: "services", label: "Services", path: "/services" },
    { key: "careers", label: "Careers", path: "/careers" },
    { key: "contact", label: "Contact", path: "/contact" },
  ],
  regulatory: [
    { key: "gdpr", label: "GDPR & Privacy Policy", path: "/privacy-and-gdpr" },
    { key: "impressum", label: "Impressum (§ 5 TMG)", path: "/impressum" },
    { key: "compliance", label: "Information Security Governance", path: "/compliance" },
  ],
};

export const COMPANY_INFO = {
  name: "Qubital",
  fullName: "Qubital Systems GmbH",
  tagline: "Advisory & Systems",
  location: "Herzogenaurach, Bavaria, Germany",
  email: "contact@qubital.eu",
  hours: "Mon – Fri, 08:00 – 18:00 CET",
  copyright: `© ${new Date().getFullYear()} Qubital Systems GmbH. Herzogenaurach, Germany. All rights reserved.`,
  logoUrl: "/logo.png",
};
