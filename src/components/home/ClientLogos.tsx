import { useTranslations } from 'next-intl';
import { cn } from '@/lib/cn';
import { rich } from '@/lib/rich';
import { Container } from '../ui/Container';
import { Stagger, StaggerItem } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

// Organisations Qubital has worked with (per the client). The logos are the
// companies' own, in public/logos/clients. Heights are tuned per logo so a
// round mark and a wide wordmark look about the same size. Belgacom is shown
// under that name (it has traded as Proximus since 2015) because that is what
// it was called when Qubital worked with it.
const CLIENTS = [
  { file: 'bmw', name: 'BMW', size: 'h-14' },
  { file: 'luxair', name: 'Luxair', size: 'h-6' },
  { file: 'mizuho', name: 'Mizuho', size: 'h-9' },
  { file: 'novo-nordisk', name: 'Novo Nordisk', size: 'h-9' },
  { file: 'intersnack', name: 'Intersnack', size: 'h-12' },
  { file: 'ahold-delhaize', name: 'Ahold Delhaize', size: 'h-10' },
  { file: 'currys', name: 'Currys', size: 'h-14' },
  { file: 'belgacom', name: 'Belgacom', size: 'h-7' },
];

/** Logo wall with its own heading; used on Home, About and Industries. */
export function ClientLogos() {
  const t = useTranslations('clients');

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          align="center"
          title={t.rich('title', rich)}
          description={t('description')}
        />
        <Stagger
          className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
          stagger={0.05}
        >
          {CLIENTS.map((client) => (
            <StaggerItem key={client.file}>
              <div className="logo-plate flex h-28 items-center justify-center rounded-2xl px-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/logos/clients/${client.file}.svg`}
                  alt={client.name}
                  className={cn('w-auto max-w-full object-contain', client.size)}
                  loading="lazy"
                />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
