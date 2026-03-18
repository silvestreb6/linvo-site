import { useTranslations } from 'next-intl';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-light py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-heading font-bold text-text-on-primary md:text-5xl lg:text-6xl leading-tight">
            {t('headline')}
          </h1>
          <p className="mt-6 text-lg text-text-on-primary/80 md:text-xl leading-relaxed">
            {t('subtitle')}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#waitlist"
              className="inline-block rounded-lg bg-accent-dark px-6 py-3 text-center font-semibold text-text-on-accent hover:opacity-90 transition-opacity"
            >
              {t('cta_primary')}
            </a>
            <a
              href="#problem"
              className="inline-block rounded-lg border border-white/30 px-6 py-3 text-center font-semibold text-text-on-primary hover:bg-white/10 transition-colors"
            >
              {t('cta_secondary')} ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
