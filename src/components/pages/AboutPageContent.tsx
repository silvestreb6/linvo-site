import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';

export function AboutPageContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const waitlistHref = `/${locale}/#waitlist`;

  return (
    <>
      <Section bg="background">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-heading font-bold text-text-primary md:text-4xl">
            {locale === 'pt' ? 'Sobre a Linvo' : 'About Linvo'}
          </h1>
          <p className="mt-4 text-lg text-text-secondary">
            {locale === 'pt'
              ? 'Conheça a história e a missão por trás da plataforma.'
              : 'Learn the story and mission behind the platform.'}
          </p>
        </div>
      </Section>

      <Section bg="surface">
        <div className="mx-auto max-w-3xl space-y-10">
          <div>
            <h2 className="text-2xl font-heading font-bold text-text-primary">
              {locale === 'pt' ? 'Nossa Missão' : 'Our Mission'}
            </h2>
            <p className="mt-3 text-text-secondary leading-relaxed">
              {locale === 'pt'
                ? 'Transformar a experiência de viver em comunidade. Acreditamos que a gestão condominial pode ser moderna, transparente e acessível para todos.'
                : 'Transform the experience of community living. We believe building management can be modern, transparent, and accessible for everyone.'}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-heading font-bold text-text-primary">
              {locale === 'pt' ? 'Nossa Visão' : 'Our Vision'}
            </h2>
            <p className="mt-3 text-text-secondary leading-relaxed">
              {locale === 'pt'
                ? 'Ser a plataforma referência para comunidades residenciais no Brasil, conectando síndicos, administradoras e moradores em uma experiência integrada.'
                : 'Be the reference platform for residential communities in Brazil, connecting managers, administrators, and residents in an integrated experience.'}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-heading font-bold text-text-primary">
              {locale === 'pt' ? 'Nossos Valores' : 'Our Values'}
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {(locale === 'pt'
                ? ['Transparência', 'Simplicidade', 'Comunidade', 'Inovação']
                : ['Transparency', 'Simplicity', 'Community', 'Innovation']
              ).map((v) => (
                <div key={v} className="flex items-center gap-3 rounded-lg border border-border p-4">
                  <svg className="h-5 w-5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  <span className="font-medium text-text-primary">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center pt-6">
            <a
              href={waitlistHref}
              className="inline-block rounded-lg bg-accent-dark px-6 py-3 font-semibold text-text-on-accent hover:opacity-90 transition-opacity"
            >
              {t('hero.cta_primary')}
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
