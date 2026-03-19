import { useTranslations } from 'next-intl';
import { PhoneMockup } from '@/components/ui/PhoneMockup';
import { DecoCircle } from '@/components/ui/DecoCircle';

export function Hero() {
  const t = useTranslations('hero');
  const badge = useTranslations('social_proof');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-light py-20 md:py-32 lg:py-36">
      {/* Decorative shapes */}
      <DecoCircle className="w-80 h-80 bg-white/5 -top-20 -right-20" />
      <DecoCircle className="w-60 h-60 bg-white/[0.03] bottom-10 -left-16" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Text */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm text-white/90 backdrop-blur-sm mb-6">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L4 7v5c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V7l-8-5z" />
              </svg>
              {badge('badge')}
            </span>

            <h1 className="text-4xl font-heading font-bold text-text-on-primary md:text-5xl lg:text-6xl leading-tight">
              {t('headline')}
            </h1>
            <p className="mt-6 text-lg text-white/75 md:text-xl leading-relaxed max-w-lg">
              {t('subtitle')}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#waitlist"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-dark px-7 py-3.5 font-semibold text-text-on-accent shadow-lg hover:opacity-90 transition-opacity"
              >
                {t('cta_primary')} →
              </a>
              <a
                href="#problem"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 font-semibold text-text-on-primary hover:bg-white/10 transition-colors"
              >
                {t('cta_secondary')} ↓
              </a>
            </div>
          </div>

          {/* Phone mockup */}
          <div className="hidden md:block">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
