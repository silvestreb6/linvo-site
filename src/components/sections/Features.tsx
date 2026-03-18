import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';

const icons = [
  // Megaphone
  <svg key="0" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M3 11l18-5v12L3 13v-2z" /><path d="M11.6 16.8a3 3 0 11-5.8-1.6" /></svg>,
  // Vote
  <svg key="1" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M20 12V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h6" /><path d="M9 12l2 2 4-4" /><path d="M16 19h6M19 16v6" /></svg>,
  // CalendarCheck
  <svg key="2" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="M9 16l2 2 4-4" /></svg>,
  // ClipboardList
  <svg key="3" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" /><path d="M12 11h4M12 16h4M8 11h.01M8 16h.01" /></svg>,
  // ShieldCheck
  <svg key="4" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>,
  // Wallet
  <svg key="5" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="6" width="22" height="14" rx="2" /><path d="M1 10h22" /><circle cx="17" cy="14" r="1" /></svg>,
];

export function Features() {
  const t = useTranslations('features');

  return (
    <Section id="features" bg="background">
      <h2 className="text-center text-3xl font-heading font-bold text-text-primary md:text-4xl">
        {t('title')}
      </h2>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-surface p-6 transition-shadow hover:shadow-md"
          >
            <div className="mb-4">{icons[i]}</div>
            <h3 className="font-heading font-semibold text-text-primary text-lg">
              {t(`items.${i}.title`)}
            </h3>
            <p className="mt-2 text-text-secondary text-sm leading-relaxed">
              {t(`items.${i}.description`)}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
