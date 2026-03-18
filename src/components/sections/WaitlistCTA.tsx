'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';

type Step = 'form' | 'extra' | 'done';

export function WaitlistCTA() {
  const t = useTranslations('waitlist');
  const pathname = usePathname();
  const locale = pathname.startsWith('/en') ? 'en' : 'pt';
  const [step, setStep] = useState<Step>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', profile: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (formData.name.length < 2) errs.name = t('errors.name_too_short');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = t('errors.email_invalid');
    if (!formData.profile) errs.profile = t('errors.required');
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleStep1 = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('https://formspree.io/f/xbljazbk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          profile: formData.profile,
          source: `waitlist-homepage-${locale}`,
          step: '1',
        }),
      });
      if (!res.ok) throw new Error();
      setStep('extra');
    } catch {
      setError(t('errors.submit_failed'));
    } finally {
      setLoading(false);
    }
  };

  const handleStep2 = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target as HTMLFormElement);
    form.append('email', formData.email);
    form.append('source', `waitlist-extra-${locale}`);
    form.append('step', '2');

    try {
      const res = await fetch('https://formspree.io/f/xbljazbk', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: form,
      });
      if (!res.ok) throw new Error();
    } catch {
      // Silent fail for optional step
    } finally {
      setStep('done');
      setLoading(false);
    }
  };

  return (
    <section
      id="waitlist"
      className="bg-gradient-to-br from-primary to-primary-light py-16 md:py-24"
    >
      <div className="mx-auto max-w-xl px-6 text-center">
        <h2 className="text-3xl font-heading font-bold text-text-on-primary md:text-4xl">
          {t('title')}
        </h2>
        <p className="mt-4 text-text-on-primary/80">{t('subtitle')}</p>

        <div className="mt-8 rounded-xl bg-surface p-6 md:p-8 text-left shadow-lg">
          {step === 'form' && (
            <form onSubmit={handleStep1} noValidate>
              {error && (
                <div className="mb-4 rounded-lg bg-urgent-bg p-3 text-sm text-urgent">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder={t('step1.name_placeholder')}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onBlur={() => formData.name && validate()}
                    className={`w-full rounded-lg border px-4 py-3 text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent ${errors.name ? 'border-urgent' : 'border-border'}`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-urgent">{errors.name}</p>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    placeholder={t('step1.email_placeholder')}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onBlur={() => formData.email && validate()}
                    className={`w-full rounded-lg border px-4 py-3 text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent ${errors.email ? 'border-urgent' : 'border-border'}`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-urgent">{errors.email}</p>
                  )}
                </div>

                <div>
                  <select
                    value={formData.profile}
                    onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
                    className={`w-full rounded-lg border px-4 py-3 text-text-primary outline-none transition-colors focus:border-accent cursor-pointer ${!formData.profile ? 'text-text-muted' : ''} ${errors.profile ? 'border-urgent' : 'border-border'}`}
                  >
                    <option value="">{t('step1.profile_placeholder')}</option>
                    <option value="sindico_profissional">{t('profiles.sindico_profissional')}</option>
                    <option value="sindico_morador">{t('profiles.sindico_morador')}</option>
                    <option value="administradora">{t('profiles.administradora')}</option>
                    <option value="outro">{t('profiles.outro')}</option>
                  </select>
                  {errors.profile && (
                    <p className="mt-1 text-sm text-urgent">{errors.profile}</p>
                  )}
                </div>
              </div>

              <Button type="submit" loading={loading} className="mt-6 w-full">
                {loading ? t('step1.submitting') : t('step1.submit')}
              </Button>
            </form>
          )}

          {step === 'extra' && (
            <form onSubmit={handleStep2}>
              <p className="mb-4 text-text-primary font-medium">
                {t('step2.thank_you', { name: formData.name.split(' ')[0] })}
              </p>

              <div className="space-y-4">
                <input
                  type="tel"
                  name="phone"
                  placeholder={t('step2.phone_placeholder')}
                  className="w-full rounded-lg border border-border px-4 py-3 text-text-primary placeholder:text-text-muted outline-none focus:border-accent"
                />
                <input
                  type="text"
                  name="building"
                  placeholder={t('step2.building_placeholder')}
                  className="w-full rounded-lg border border-border px-4 py-3 text-text-primary placeholder:text-text-muted outline-none focus:border-accent"
                />
                <select
                  name="units"
                  className="w-full rounded-lg border border-border px-4 py-3 text-text-muted outline-none focus:border-accent cursor-pointer"
                >
                  <option value="">{t('step2.units_placeholder')}</option>
                  <option value="ate_30">{t('units.ate_30')}</option>
                  <option value="31_100">{t('units.31_100')}</option>
                  <option value="101_300">{t('units.101_300')}</option>
                  <option value="mais_300">{t('units.mais_300')}</option>
                </select>
              </div>

              <Button type="submit" loading={loading} className="mt-6 w-full">
                {t('step2.submit')}
              </Button>
              <button
                type="button"
                onClick={() => setStep('done')}
                className="mt-3 w-full text-center text-sm text-text-muted hover:text-text-secondary transition-colors cursor-pointer"
              >
                {t('step2.skip')} →
              </button>
            </form>
          )}

          {step === 'done' && (
            <div className="py-6 text-center">
              <svg className="mx-auto h-12 w-12 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <path d="M22 4L12 14.01l-3-3" />
              </svg>
              <p className="mt-4 text-lg font-semibold text-text-primary">{t('success')}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
