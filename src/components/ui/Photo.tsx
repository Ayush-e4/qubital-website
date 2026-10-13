import Image, { type StaticImageData } from 'next/image';
import { cn } from '@/lib/cn';

/** A rounded photo with an optional caption laid over its bottom edge. */
export function Photo({
  src,
  alt,
  caption,
  sizes,
  priority,
  className,
}: {
  src: StaticImageData;
  alt: string;
  caption?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={cn('relative overflow-hidden rounded-[2rem] border border-line', className)}>
      <Image
        src={src}
        alt={alt}
        sizes={sizes}
        placeholder="blur"
        priority={priority}
        className="size-full object-cover"
      />
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-6 pb-5 pt-16 text-sm text-white">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
