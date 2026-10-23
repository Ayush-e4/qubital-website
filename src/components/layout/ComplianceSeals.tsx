import { Box, Check, Lock, type LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

// Monochrome badges for the footer: a ring of twelve stars around a short mark
// and an icon. They describe what we do (European company, GDPR-aligned
// processing, NIS2 readiness work), not a certification: there is no official
// GDPR or NIS2 logo, and badge wording must never say "certified" or
// "approved". The ECSO "Cybersecurity Made in Europe" label is a separate,
// awarded mark and can only be shown, with its own artwork, once awarded.
const seals: { key: 'europe' | 'gdpr' | 'nis2'; icon: LucideIcon }[] = [
  { key: 'europe', icon: Box },
  { key: 'gdpr', icon: Check },
  { key: 'nis2', icon: Lock },
];

// A five-pointed star centred on the origin, outer radius 5.
const STAR = Array.from({ length: 10 }, (_, i) => {
  const r = i % 2 === 0 ? 5 : 2.1;
  const a = (Math.PI / 5) * i - Math.PI / 2;
  return `${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`;
}).join(' ');

// Twelve stars on a circle, like the European flag.
const RING = Array.from({ length: 12 }, (_, i) => {
  const a = (Math.PI / 6) * i - Math.PI / 2;
  return { x: 60 + 46 * Math.cos(a), y: 60 + 46 * Math.sin(a) };
});

export function ComplianceSeals() {
  const t = useTranslations('footer.seals');

  return (
    <div className="border-t border-line py-10">
      <ul aria-label={t('title')} className="flex flex-wrap items-center gap-6 sm:gap-10">
        {seals.map(({ key, icon }) => (
          <li key={key}>
            <Seal label={t(`${key}.label`)} lines={t(`${key}.mark`).split('\n')} icon={icon} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Seal({ label, lines, icon: Icon }: { label: string; lines: string[]; icon: LucideIcon }) {
  // One line is a big mark (GDPR, NIS2); two lines are small caps (Made in / Europe).
  const big = lines.length === 1;

  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label={label}
      className="size-20 fill-fg text-fg uppercase sm:size-24"
    >
      {RING.map(({ x, y }, i) => (
        <polygon key={i} points={STAR} transform={`translate(${x.toFixed(2)} ${y.toFixed(2)})`} />
      ))}
      {big ? (
        <>
          <text
            x="60"
            y="61"
            textAnchor="middle"
            fontSize="19"
            fontWeight="700"
            letterSpacing="0.5"
          >
            {lines[0]}
          </text>
          <Icon x="51" y="66" width="18" height="18" strokeWidth={3} fill="none" />
        </>
      ) : (
        <>
          <Icon x="52" y="34" width="16" height="16" strokeWidth={2.25} fill="none" />
          {lines.map((line, i) => (
            <text
              key={line}
              x="60"
              y={64 + i * 13}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              letterSpacing="0.3"
            >
              {line}
            </text>
          ))}
        </>
      )}
    </svg>
  );
}
