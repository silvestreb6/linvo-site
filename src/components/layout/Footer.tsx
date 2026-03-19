import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations('footer');
  const aboutHref = `/${locale}/${locale === 'pt' ? 'sobre' : 'about'}/`;
  const contactHref = `/${locale}/${locale === 'pt' ? 'contato' : 'contact'}/`;
  const privacyHref = `/${locale}/${locale === 'pt' ? 'privacidade' : 'privacy'}/`;

  return (
    <footer className="bg-primary-dark text-text-on-primary">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <img
              src="/images/logo-linvo-horizontal.png"
              alt="Linvo"
              className="h-8"
              style={{ filter: 'brightness(0) invert(1)' }}
              width="120"
              height="32"
            />
            <p className="mt-3 text-sm text-white/60 max-w-xs">
              {t('tagline')}
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-1">
              {locale === 'pt' ? 'Links' : 'Links'}
            </span>
            <a href={aboutHref} className="text-white/70 hover:text-white transition-colors w-fit">
              {locale === 'pt' ? 'Sobre' : 'About'}
            </a>
            <a href={contactHref} className="text-white/70 hover:text-white transition-colors w-fit">
              {locale === 'pt' ? 'Contato' : 'Contact'}
            </a>
            <a href={privacyHref} className="text-white/70 hover:text-white transition-colors w-fit">
              {locale === 'pt' ? 'Privacidade & Termos' : 'Privacy & Terms'}
            </a>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <LanguageSwitcher />
            <p className="text-sm text-white/40">USA</p>
            <a
              href="https://azebratech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/30 hover:text-white/50 transition-colors"
            >
              {locale === 'pt' ? 'Desenvolvido por AzebraTech' : 'Built by AzebraTech'}
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/30">
          {t('copyright')}
        </div>
      </div>
    </footer>
  );
}
