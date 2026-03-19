import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { Accordion } from '@/components/ui/Accordion';

export function FAQ() {
  const t = useTranslations('faq');
  const items = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({
    question: t(`items.${i}.question`),
    answer: t(`items.${i}.answer`),
  }));

  return (
    <Section id="faq" bg="surface">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-heading font-bold text-text-primary md:text-4xl">
          {t('title')}
        </h2>
        <div className="mt-12">
          <Accordion items={items} />
        </div>
      </div>
    </Section>
  );
}
