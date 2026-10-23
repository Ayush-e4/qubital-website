import { useTranslations } from 'next-intl';

// Round seals for the footer. They describe what we do (GDPR-aligned processing,
// NIS2 readiness work, an EU base), not a certification: there is no official
// GDPR or NIS2 logo, and seal wording must never say "certified" or "approved".
// The ECSO "Cybersecurity Made in Europe" label can only be shown, with its own
// artwork, once it has been awarded.
const sealKeys = ['gdpr', 'nis2', 'eu'] as const;

export function ComplianceSeals() {
  const t = useTranslations('footer.seals');

  return (
    <div className="flex flex-col gap-6 border-t border-line py-10 sm:flex-row sm:items-center sm:gap-10">
      <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-faint">{t('title')}</h3>
      <ul className="flex flex-wrap gap-4 sm:gap-5">
        {sealKeys.map((key) => (
          <li key={key}>
            <Seal
              id={key}
              label={t(`${key}.label`)}
              top={t(`${key}.top`)}
              mark={t(`${key}.mark`)}
              sub={t(`${key}.sub`)}
              bottom={t(`${key}.bottom`)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Seal({
  id,
  label,
  top,
  mark,
  sub,
  bottom,
}: {
  id: string;
  label: string;
  top: string;
  mark: string;
  sub: string;
  bottom: string;
}) {
  // One footer per page, so the key alone keeps the path ids unique.
  const topArc = `seal-${id}-top`;
  const bottomArc = `seal-${id}-bottom`;

  return (
    <svg
      viewBox="0 0 150 150"
      role="img"
      aria-label={label}
      className="size-[100px] uppercase sm:size-36"
    >
      <defs>
        <path id={topArc} d="M 22 75 A 53 53 0 0 1 128 75" />
        <path id={bottomArc} d="M 18 75 A 57 57 0 0 0 132 75" />
      </defs>
      <circle cx="75" cy="75" r="72" className="fill-surface stroke-violet" strokeWidth="2" />
      <circle
        cx="75"
        cy="75"
        r="66"
        fill="none"
        className="stroke-violet"
        strokeWidth="0.75"
        strokeDasharray="1.5 3"
      />
      <text className="fill-muted font-mono" fontSize="9" letterSpacing="1.4">
        <textPath href={`#${topArc}`} startOffset="50%" textAnchor="middle">
          {top}
        </textPath>
      </text>
      <text
        className="fill-muted font-mono"
        fontSize="8"
        letterSpacing="1"
        dominantBaseline="hanging"
      >
        <textPath href={`#${bottomArc}`} startOffset="50%" textAnchor="middle">
          {bottom}
        </textPath>
      </text>
      <circle cx="21" cy="75" r="1.8" className="fill-violet" />
      <circle cx="129" cy="75" r="1.8" className="fill-violet" />
      <text
        x="75"
        y="81"
        textAnchor="middle"
        className="fill-fg font-sans"
        fontSize="28"
        fontWeight="500"
      >
        {mark}
      </text>
      <text
        x="75"
        y="97"
        textAnchor="middle"
        className="fill-violet font-mono"
        fontSize="7"
        letterSpacing="0.8"
      >
        {sub}
      </text>
    </svg>
  );
}
