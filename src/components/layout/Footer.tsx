import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations('footer');
  const aboutHref = `/${locale}/${locale === 'pt' ? 'sobre' : 'about'}/`;
  const contactHref = `/${locale}/${locale === 'pt' ? 'contato' : 'contact'}/`;
  const privacyHref = `/${locale}/${locale === 'pt' ? 'privacidade' : 'privacy'}/`;

  return (
    <footer className="bg-primary-dark text-text-on-primary">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <span className="text-xl font-heading font-bold">Linvo</span>
            <p className="mt-2 text-sm opacity-70">{t('tagline')}</p>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <a href={aboutHref} className="opacity-70 hover:opacity-100 transition-opacity">
              {locale === 'pt' ? 'Sobre' : 'About'}
            </a>
            <a href={contactHref} className="opacity-70 hover:opacity-100 transition-opacity">
              {locale === 'pt' ? 'Contato' : 'Contact'}
            </a>
            <a href={privacyHref} className="opacity-70 hover:opacity-100 transition-opacity">
              {locale === 'pt' ? 'Privacidade & Termos' : 'Privacy & Terms'}
            </a>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <LanguageSwitcher />
          </div>
        </div>

        <div className="mt-8 border-t border-white/20 pt-6 text-center text-sm opacity-60">
          {t('copyright')}
        </div>
      </div>
    </footer>
  );
}
