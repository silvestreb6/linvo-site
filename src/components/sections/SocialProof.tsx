import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';

export function SocialProof() {
  const t = useTranslations('social_proof');

  return (
    <Section bg="primary-bg">
      <div className="grid gap-8 md:grid-cols-3 text-center">
        {/* Invite text */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-xl font-heading font-bold text-primary">
            {t('invite_text')}
          </p>
        </div>

        {/* Founder */}
        <div className="flex flex-col items-center">
          <div className="h-24 w-24 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
            <span className="text-2xl font-bold text-accent">
              {t('founder.name').charAt(0)}
            </span>
          </div>
          <p className="mt-3 font-heading font-semibold text-text-primary">
            {t('founder.name')}
          </p>
          <p className="text-sm text-text-secondary">{t('founder.role')}</p>
          <p className="mt-2 text-sm text-text-muted">{t('founder.bio')}</p>
        </div>

        {/* Badge */}
        <div className="flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 rounded-lg bg-primary-bg border border-primary/20 px-4 py-3">
            <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L4 7v5c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V7l-8-5z" />
            </svg>
            <span className="font-semibold text-primary text-sm">{t('badge')}</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
