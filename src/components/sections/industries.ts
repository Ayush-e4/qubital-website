import {
  Car,
  Factory,
  Landmark,
  Luggage,
  Pill,
  Plane,
  RadioTower,
  ShoppingBag,
  Umbrella,
  type LucideIcon,
} from 'lucide-react';

export type Industry = {
  key: string;
  title: string;
};

// The client's sectors (copy in messages: industries.items)
export const industryIcons: Record<string, LucideIcon> = {
  automotive: Car,
  aviation: Plane,
  banking: Landmark,
  pharma: Pill,
  retail: ShoppingBag,
  telecom: RadioTower,
  tourism: Luggage,
  insurance: Umbrella,
  manufacturing: Factory,
};
