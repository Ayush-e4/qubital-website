import { useTranslations } from 'next-intl';
import { cn } from '@/lib/cn';
import { Container } from '../ui/Container';
import { Stagger, StaggerItem } from '../ui/Reveal';

// Organisations Qubital has worked with (per the client). The logos are the
// companies' own, in public/logos/clients. Heights are tuned per logo so a
// square mark and a wide wordmark look about the same size.
const CLIENTS = [
  { file: 'bmw', name: 'BMW', size: 'h-14' },
  { file: 'luxair', name: 'Luxair', size: 'h-6' },
  { file: 'mizuho', name: 'Mizuho', size: 'h-9' },
  { file: 'novo-nordisk', name: 'Novo Nordisk', size: 'h-9' },
  { file: 'intersnack', name: 'Intersnack', size: 'h-12' },
  { file: 'ahold-delhaize', name: 'Ahold Delhaize', size: 'h-10' },
];

export function ClientLogos() {
  const t = useTranslations('home.clients');

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <p className="text-center text-sm text-muted">{t('title')}</p>
        <Stagger
          className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6"
          stagger={0.05}
        >
          {CLIENTS.map((client) => (
            <StaggerItem key={client.file}>
              <div className="logo-plate flex h-24 items-center justify-center rounded-2xl px-6">
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
