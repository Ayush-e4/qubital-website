import { ArrowUpRight } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary';

const base =
  'group inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200';

const variants: Record<Variant, string> = {
  primary: 'bg-fg text-bg hover:bg-fg/85 shadow-[0_6px_20px_-10px_rgb(139_123_255/0.45)]',
  secondary:
    'border border-line-strong bg-fg/[0.03] text-fg backdrop-blur hover:border-fg/25 hover:bg-fg/[0.07]',
};

// Shared hover for arrow buttons: the arrow turns 45° to point right
export const arrowRotate =
  'size-4 transition-transform duration-500 ease-out-expo group-hover:rotate-45';

function Inner({ children, variant }: { children: ReactNode; variant: Variant }) {
  return (
    <>
      <span>{children}</span>
      <span
        className={cn(
          'flex size-9 items-center justify-center rounded-full',
          variant === 'primary' ? 'bg-bg text-fg' : 'bg-gradient-to-br from-violet to-cyan text-bg'
        )}
      >
        <ArrowUpRight className={arrowRotate} />
      </span>
    </>
  );
}

type LinkHref = ComponentProps<typeof Link>['href'];

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  className,
}: {
  href: LinkHref;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      <Inner variant={variant}>{children}</Inner>
    </Link>
  );
}

export function ButtonAnchor({
  href,
  children,
  variant = 'primary',
  className,
  ...props
}: ComponentProps<'a'> & { variant?: Variant }) {
  return (
    <a href={href} className={cn(base, variants[variant], className)} {...props}>
      <Inner variant={variant}>{children}</Inner>
    </a>
  );
}
