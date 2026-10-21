import { Bot, IdCard, KeyRound, UserCheck, UsersRound, type LucideIcon } from 'lucide-react';

// The client's five identity areas
// Order set by the client: IGA, Non-Human Identity, PAM, CIAM, workforce identity
export const serviceKeys = ['iga', 'ai', 'pam', 'ciam', 'wiam'] as const;

export type ServiceKey = (typeof serviceKeys)[number];

export const serviceIcons: Record<ServiceKey, LucideIcon> = {
  pam: KeyRound,
  iga: UserCheck,
  ciam: UsersRound,
  wiam: IdCard,
  ai: Bot,
};
