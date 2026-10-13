import { cn } from '@/lib/cn';
import { wordmark } from '../logo-data';

// The wordmark as a black-on-transparent SVG, used as a CSS mask: whatever
// background the element has shows through in the shape of the logo.
const { zero, one, letters, viewBox } = wordmark;
const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">` +
  `<ellipse cx="${zero.cx}" cy="${zero.cy}" rx="${zero.rx}" ry="${zero.ry}" fill="none" stroke="#000" stroke-width="${zero.stroke}"/>` +
  `<path d="${one.d}" fill="none" stroke="#000" stroke-width="${one.stroke}" stroke-linecap="round" stroke-linejoin="round"/>` +
  `<path d="${letters}"/>` +
  `</svg>`;
const MASK = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

/**
 * The Qubital wordmark filled with a slowly drifting aurora gradient (after
 * Magic UI's Aurora Text, which only works on live text; this is the logo).
 * Decorative: keep it faint with an opacity class.
 */
export function AuroraWordmark({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn('bg-aurora animate-aurora aspect-[3259/869]', className)}
      style={{
        maskImage: MASK,
        WebkitMaskImage: MASK,
        maskSize: '100% 100%',
        WebkitMaskSize: '100% 100%',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
      }}
    />
  );
}
