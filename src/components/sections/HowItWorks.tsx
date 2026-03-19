import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';

export function HowItWorks() {
  const t = useTranslations('how_it_works');

  return (
    <Section id="how-it-works" bg="surface">
      <h2 className="text-center text-3xl font-heading font-bold text-text-primary md:text-4xl">
        {t('title')}
      </h2>

      <div className="relative mt-14">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {[0, 1, 2].map((i) => (
            <div key={i} className="text-center relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-text-on-primary font-heading font-bold text-xl shadow-lg">
                {i + 1}
              </div>
              <h3 className="mt-5 font-heading font-bold text-text-primary text-lg">
                {t(`steps.${i}.title`)}
              </h3>
              <p className="mt-2.5 text-text-secondary text-sm leading-relaxed max-w-xs mx-auto">
                {t(`steps.${i}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 mx-auto max-w-2xl rounded-xl bg-primary-bg p-5 flex items-start gap-3">
        <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
        <p className="text-sm text-primary/80 leading-relaxed">
          {t('note')}
        </p>
      </div>
    </Section>
  );
}
