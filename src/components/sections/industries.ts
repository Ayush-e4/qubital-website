import {
  Briefcase,
  Building,
  Factory,
  HeartPulse,
  Landmark,
  Rocket,
  ShoppingBag,
  Truck,
  type LucideIcon,
} from 'lucide-react';

export type Industry = {
  key: string;
  title: string;
};

export const industryIcons: Record<string, LucideIcon> = {
  manufacturing: Factory,
  logistics: Truck,
  health: HeartPulse,
  finance: Landmark,
  retail: ShoppingBag,
  startups: Rocket,
  services: Briefcase,
  public: Building,
};
