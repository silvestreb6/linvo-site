'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export function ContactPageContent() {
  const t = useTranslations();
  const pathname = usePathname();
  const locale = pathname.startsWith('/en') ? 'en' : 'pt';
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const subjects = locale === 'pt'
    ? ['Quero saber mais sobre a Linvo', 'Interesse em parceria', 'Imprensa', 'Outro']
    : ['I want to learn more about Linvo', 'Partnership interest', 'Press', 'Other'];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = new FormData(e.target as HTMLFormElement);
    form.append('source', `contact-${locale}`);

    try {
      const res = await fetch('https://formspree.io/f/xbljazbk', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: form,
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError(t('waitlist.errors.submit_failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-xl px-6">
        <h1 className="text-3xl font-heading font-bold text-text-primary text-center md:text-4xl">
          {locale === 'pt' ? 'Fale conosco' : 'Get in touch'}
        </h1>
        <p className="mt-4 text-center text-text-secondary">
          {locale === 'pt'
            ? 'Tem alguma dúvida ou sugestão? Estamos prontos para ouvir você.'
            : 'Have a question or suggestion? We\'re ready to hear from you.'}
        </p>

        {submitted ? (
          <div className="mt-8 rounded-xl border border-border bg-success-bg p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <path d="M22 4L12 14.01l-3-3" />
            </svg>
            <p className="mt-4 font-semibold text-text-primary">
              {locale === 'pt' ? 'Mensagem enviada!' : 'Message sent!'}
            </p>
            <p className="mt-2 text-sm text-text-secondary">
              {locale === 'pt'
                ? 'Entraremos em contato em breve.'
                : 'We\'ll get back to you soon.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {error && (
              <div className="rounded-lg bg-urgent-bg p-3 text-sm text-urgent">{error}</div>
            )}
            <input
              type="text"
              name="name"
              required
              minLength={2}
              placeholder={locale === 'pt' ? 'Seu nome' : 'Your name'}
              className="w-full rounded-lg border border-border px-4 py-3 text-text-primary placeholder:text-text-muted outline-none focus:border-accent"
            />
            <input
              type="email"
              name="email"
              required
              placeholder={locale === 'pt' ? 'Seu e-mail' : 'Your email'}
              className="w-full rounded-lg border border-border px-4 py-3 text-text-primary placeholder:text-text-muted outline-none focus:border-accent"
            />
            <select
              name="_subject"
              required
              className="w-full rounded-lg border border-border px-4 py-3 text-text-muted outline-none focus:border-accent cursor-pointer"
            >
              <option value="">{locale === 'pt' ? 'Selecione o assunto' : 'Select a subject'}</option>
              {subjects.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <textarea
              name="message"
              required
              minLength={10}
              rows={5}
              placeholder={locale === 'pt' ? 'Sua mensagem' : 'Your message'}
              className="w-full rounded-lg border border-border px-4 py-3 text-text-primary placeholder:text-text-muted outline-none focus:border-accent resize-none"
            />
            <Button type="submit" loading={loading} className="w-full">
              {loading
                ? (locale === 'pt' ? 'Enviando...' : 'Sending...')
                : (locale === 'pt' ? 'Enviar mensagem' : 'Send message')}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
