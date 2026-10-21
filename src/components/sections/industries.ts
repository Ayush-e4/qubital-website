import type { StaticImageData } from 'next/image';
import automotive from '@/assets/industries/automotive.jpg';
import aviation from '@/assets/industries/aviation.jpg';
import banking from '@/assets/industries/banking.jpg';
import insurance from '@/assets/industries/insurance.jpg';
import manufacturing from '@/assets/industries/manufacturing.jpg';
import pharma from '@/assets/industries/pharma.jpg';
import retail from '@/assets/industries/retail.jpg';
import telecom from '@/assets/industries/telecom.jpg';
import tourism from '@/assets/industries/tourism.jpg';
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

// Bright photos for the industry cards (Unsplash, free licence; see README)
export const industryImages: Record<string, StaticImageData> = {
  automotive,
  aviation,
  banking,
  pharma,
  retail,
  telecom,
  tourism,
  insurance,
  manufacturing,
};
