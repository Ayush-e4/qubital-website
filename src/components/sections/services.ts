import { Bot, IdCard, KeyRound, UserCheck, UsersRound, type LucideIcon } from 'lucide-react';

// The client's five identity areas
export const serviceKeys = ['pam', 'iga', 'ciam', 'wiam', 'ai'] as const;

export type ServiceKey = (typeof serviceKeys)[number];

export const serviceIcons: Record<ServiceKey, LucideIcon> = {
  pam: KeyRound,
  iga: UserCheck,
  ciam: UsersRound,
  wiam: IdCard,
  ai: Bot,
};
