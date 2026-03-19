import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';

const icons = [
  <svg key="0" className="h-5 w-5 text-urgent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /><path d="M9 8l6 6M15 8l-6 6" /></svg>,
  <svg key="1" className="h-5 w-5 text-urgent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M9.5 12.5l5 5M14.5 12.5l-5 5" /></svg>,
  <svg key="2" className="h-5 w-5 text-urgent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18M10 14l4 4M14 14l-4 4" /></svg>,
  <svg key="3" className="h-5 w-5 text-urgent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" /><path d="M1 1l22 22" /></svg>,
];

export function Problem() {
  const t = useTranslations('problem');

  return (
    <Section id="problem" bg="background">
      <h2 className="text-center text-3xl font-heading font-bold text-text-primary md:text-4xl">
        {t('title')}
      </h2>
      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4 rounded-xl border border-border/50 bg-surface p-5 shadow-sm">
            <div className="shrink-0 w-10 h-10 rounded-full bg-urgent-bg flex items-center justify-center">
              {icons[i]}
            </div>
            <div>
              <h3 className="font-heading font-bold text-text-primary text-lg">
                {t(`items.${i}.title`)}
              </h3>
              <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                {t(`items.${i}.description`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
