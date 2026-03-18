import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';

export function HowItWorks() {
  const t = useTranslations('how_it_works');

  return (
    <Section id="how-it-works" bg="surface">
      <h2 className="text-center text-3xl font-heading font-bold text-text-primary md:text-4xl">
        {t('title')}
      </h2>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-text-on-primary font-heading font-bold text-lg">
              {i + 1}
            </div>
            <h3 className="mt-4 font-heading font-semibold text-text-primary text-lg">
              {t(`steps.${i}.title`)}
            </h3>
            <p className="mt-2 text-text-secondary text-sm leading-relaxed">
              {t(`steps.${i}.description`)}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-text-muted italic">
        {t('note')}
      </p>
    </Section>
  );
}
