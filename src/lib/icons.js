import { createElement } from 'react';
import {
  Activity,
  BadgeCheck,
  Bot,
  ChartLine,
  Circle,
  Cloud,
  Compass,
  Cpu,
  CreditCard,
  Gavel,
  GraduationCap,
  Headset,
  Layers,
  Network,
  Scale,
  Search,
  Server,
  Shield,
  ShieldCheck,
  Terminal,
  Wrench,
} from 'lucide-react';

/**
 * Resolves icon names that come from data rather than JSX.
 *
 * The dictionaries in src/lib/i18n/locales carry an `icon` field on cards,
 * pillars and methodology steps, and those names historically identified
 * Material Symbols glyphs. They are now identifiers this module maps onto the
 * Lucide set, so the glyph font is no longer a runtime dependency.
 */
const ICONS = {
  analytics: ChartLine,
  architecture: Compass,
  build_circle: Wrench,
  cloud: Cloud,
  dns: Server,
  hub: Network,
  layers: Layers,
  monitoring: Activity,
  search_insights: Search,
  security: Shield,
  shield: Shield,
  shield_locked: ShieldCheck,
  smart_toy: Bot,
  support_agent: Headset,
  terminal: Terminal,
  verified: BadgeCheck,
  verified_user: ShieldCheck,
  // Icon names used by local data rather than the dictionaries.
  payments: CreditCard,
  school: GraduationCap,
  developer_board: Cpu,
  balance: Scale,
  account_tree: Network,
  layers_clear: Layers,
  gavel: Gavel,
};

/** @param {string} name @returns {import('react').ComponentType<{ className?: string }>} */
export function iconFor(name) {
  return ICONS[name] ?? Circle;
}

/**
 * Renders the icon named by `name`, for the places where the name comes from a
 * dictionary entry rather than from the JSX.
 *
 * `createElement` rather than JSX: resolving a component inside render trips
 * react-hooks/static-components, even though the value comes from the frozen
 * map above.
 *
 * @param {{ name: string, className?: string }} props
 */
export function DynamicIcon({ name, className }) {
  return createElement(iconFor(name), { className });
}
