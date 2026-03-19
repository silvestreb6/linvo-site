'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const locale = pathname.startsWith('/en') ? 'en' : 'pt';
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLanding = pathname === `/${locale}/` || pathname === `/${locale}`;

  const navLinks = isLanding
    ? [
        { label: t('features'), href: '#features' },
        { label: t('how_it_works'), href: '#how-it-works' },
        { label: t('faq'), href: '#faq' },
      ]
    : [];

  const pageLinks = [
    { label: t('about'), href: `/${locale}/${locale === 'pt' ? 'sobre' : 'about'}/` },
    { label: t('contact'), href: `/${locale}/${locale === 'pt' ? 'contato' : 'contact'}/` },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-surface/95 backdrop-blur-md shadow-sm border-b border-border/30'
            : 'bg-surface'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <a href={`/${locale}/`} className="flex items-center gap-2">
            <img
              src="/images/logo-linvo-horizontal.png"
              alt="Linvo"
              className="h-8"
              width="120"
              height="32"
            />
          </a>

          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            {pageLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <LanguageSwitcher />
            {isLanding && (
              <a
                href="#waitlist"
                className="rounded-full bg-accent-dark px-5 py-2 text-sm font-semibold text-text-on-accent shadow-sm hover:opacity-90 transition-opacity"
              >
                {t('waitlist_cta')}
              </a>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 text-text-primary cursor-pointer"
            aria-label="Menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={navLinks}
        pageLinks={pageLinks}
        locale={locale}
        ctaLabel={t('waitlist_cta')}
        isLanding={isLanding}
      />

      <div className="h-14" />
    </>
  );
}
