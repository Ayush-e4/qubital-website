import { useTranslations } from 'next-intl';
import phone from '@/assets/photos/phone-verification.jpg';
import securityKey from '@/assets/photos/security-key.jpg';
import team from '@/assets/photos/team-whiteboard.jpg';
import { Container } from '../ui/Container';
import { Photo } from '../ui/Photo';
import { Reveal } from '../ui/Reveal';

// What the work looks like: people in a workshop, a customer sign-in and a
// hardware key for privileged access.
export function PhotoStrip() {
  const t = useTranslations('home.photos');

  return (
    <section className="pb-24 sm:pb-32">
      <Container className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
        <Reveal className="lg:col-span-2 lg:row-span-2">
          <Photo
            src={team}
            alt={t('team.alt')}
            caption={t('team.caption')}
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="aspect-[4/3] lg:aspect-auto lg:h-full"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Photo
            src={phone}
            alt={t('signin.alt')}
            caption={t('signin.caption')}
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="aspect-[3/2]"
          />
        </Reveal>
        <Reveal delay={0.2}>
          <Photo
            src={securityKey}
            alt={t('key.alt')}
            caption={t('key.caption')}
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="aspect-[3/2]"
          />
        </Reveal>
      </Container>
    </section>
  );
}
