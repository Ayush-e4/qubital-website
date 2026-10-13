import { useTranslations } from 'next-intl';
import { Marquee } from '../ui/Marquee';

// Vendor-neutral standards and practices (no product names until the client confirms platforms)
const rowA = [
  'Zero Trust',
  'Least Privilege',
  'Just-in-Time Access',
  'Passkeys',
  'FIDO2',
  'Single Sign-On',
  'MFA',
  'Access Reviews',
  'RBAC / ABAC',
];
const rowB = [
  'SAML 2.0',
  'OpenID Connect',
  'OAuth 2.0',
  'SCIM',
  'LDAP',
  'Kerberos',
  'NIS2',
  'DORA',
  'ISO 27001',
];

function Item({ label, i }: { label: string; i: number }) {
  return (
    <span className="flex items-center gap-8 px-4 sm:gap-12 sm:px-6">
      <span className="text-2xl font-medium tracking-tight text-fg/40 transition-colors hover:text-fg sm:text-4xl">
        {label}
      </span>
      <span className="font-mono text-sm text-gradient">{i % 2 ? '1' : '0'}</span>
    </span>
  );
}

export function TechMarquee() {
  const t = useTranslations('home');
  return (
    <section className="border-y border-line py-10 sm:py-14">
      <p className="mb-8 text-center font-mono text-xs uppercase tracking-[0.2em] text-faint">
        {t('marquee')}
      </p>
      <div className="flex flex-col gap-4">
        <Marquee duration={50}>
          {rowA.map((l, i) => (
            <Item key={l} label={l} i={i} />
          ))}
        </Marquee>
        <Marquee duration={55} reverse>
          {rowB.map((l, i) => (
            <Item key={l} label={l} i={i + 1} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
