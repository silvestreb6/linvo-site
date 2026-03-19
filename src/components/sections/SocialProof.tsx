import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';

export function SocialProof() {
  const t = useTranslations('social_proof');

  return (
    <Section bg="primary-bg">
      <div className="mx-auto max-w-2xl text-center">
        {/* Invite text with gradient */}
        <h2 className="text-2xl font-heading font-bold md:text-3xl text-gradient">
          {t('invite_text')}
        </h2>

        {/* Founder card */}
        <div className="mt-10 rounded-2xl border border-border/30 bg-surface p-8 shadow-md text-center">
          <div className="mx-auto h-20 w-20 rounded-full bg-accent/15 border-2 border-accent/40 flex items-center justify-center">
            <span className="text-2xl font-bold text-accent">
              {t('founder.name').charAt(0)}
            </span>
          </div>
          <p className="mt-4 font-heading font-bold text-text-primary text-lg">
            {t('founder.name')}
          </p>
          <p className="text-sm text-text-secondary">{t('founder.role')}</p>
          <p className="mt-3 text-sm text-text-muted">{t('founder.bio')}</p>
        </div>

        {/* Badge */}
        <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/25 px-5 py-2.5">
          <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L4 7v5c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V7l-8-5z" />
          </svg>
          <span className="font-semibold text-accent text-sm">{t('badge')}</span>
        </div>
      </div>
    </Section>
  );
}
