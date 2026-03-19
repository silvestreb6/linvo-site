import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';

export function Solution() {
  const t = useTranslations('solution');
  const hero = useTranslations('hero');

  return (
    <Section bg="surface">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-heading font-bold text-text-primary md:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-5 text-lg text-text-secondary leading-relaxed">
            {t('description')}
          </p>
          <a
            href="#waitlist"
            className="mt-6 inline-flex items-center gap-1 text-accent-dark font-semibold hover:gap-2 transition-all"
          >
            {hero('cta_primary')} →
          </a>
        </div>
        <div className="flex justify-center">
          <img
            src="/images/logo-app-icon.png"
            alt="Linvo App"
            className="w-48 md:w-56 drop-shadow-xl"
            width="224"
            height="224"
            loading="lazy"
          />
        </div>
      </div>
    </Section>
  );
}
