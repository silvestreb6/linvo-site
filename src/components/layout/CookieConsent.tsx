'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export function CookieConsent() {
  const t = useTranslations('cookie_consent');
  const pathname = usePathname();
  const locale = pathname.startsWith('/en') ? 'en' : 'pt';
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('linvo-cookies')) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const handleChoice = (choice: 'accepted' | 'declined') => {
    localStorage.setItem('linvo-cookies', choice);
    setVisible(false);
  };

  const privacyHref = `/${locale}/${locale === 'pt' ? 'privacidade' : 'privacy'}/`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-surface px-6 py-4 shadow-lg">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-text-secondary">
          {t('message')}{' '}
          <a href={privacyHref} className="underline hover:text-primary">
            {t('policy_link')}
          </a>
          .
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => handleChoice('declined')}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-secondary hover:bg-background transition-colors cursor-pointer"
          >
            {t('decline')}
          </button>
          <button
            onClick={() => handleChoice('accepted')}
            className="rounded-lg bg-accent-dark px-4 py-2 text-sm font-semibold text-text-on-accent hover:opacity-90 transition-opacity cursor-pointer"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
