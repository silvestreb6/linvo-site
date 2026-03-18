import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';

export function Solution() {
  const t = useTranslations('solution');

  return (
    <Section bg="surface">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-heading font-bold text-text-primary md:text-4xl">
          {t('title')}
        </h2>
        <p className="mt-6 text-lg text-text-secondary leading-relaxed">
          {t('description')}
        </p>
      </div>
    </Section>
  );
}
