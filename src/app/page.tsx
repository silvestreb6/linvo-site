'use client';

import { useEffect } from 'react';

export default function RootRedirect() {
  useEffect(() => {
    const saved = localStorage.getItem('linvo-lang');
    if (saved === 'pt' || saved === 'en') {
      window.location.replace(`/${saved}/`);
      return;
    }

    const browserLang = (navigator.language || '').toLowerCase();
    if (browserLang.startsWith('pt')) {
      window.location.replace('/pt/');
      return;
    }
    if (browserLang.startsWith('en')) {
      window.location.replace('/en/');
      return;
    }

    // Fallback: IP geolocation
    fetch('https://ipapi.co/country_code/')
      .then((r) => r.text())
      .then((code) => {
        const country = (code || '').trim();
        window.location.replace(country === 'BR' ? '/pt/' : '/en/');
      })
      .catch(() => {
        window.location.replace('/pt/');
      });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <img
        src="/images/logo-icon.png"
        alt="Linvo"
        className="w-16 h-16 animate-pulse"
        width="64"
        height="64"
      />
    </div>
  );
}
