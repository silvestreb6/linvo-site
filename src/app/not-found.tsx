'use client';

import { useEffect, useState } from 'react';

export default function NotFound() {
  const [isEn, setIsEn] = useState(false);

  useEffect(() => {
    setIsEn(window.location.pathname.startsWith('/en/'));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-6 text-center">
      <img
        src="/images/logo-icon.png"
        alt="Linvo"
        className="w-16 h-16 mb-6"
        width="64"
        height="64"
      />
      <h1 className="text-3xl font-bold text-text-primary font-heading">
        {isEn ? 'Page not found' : 'Página não encontrada'}
      </h1>
      <p className="mt-4 text-lg text-text-secondary font-body max-w-md">
        {isEn
          ? "The page you're looking for doesn't exist or has been moved."
          : 'A página que você procura não existe ou foi movida.'}
      </p>
      <a
        href={isEn ? '/en/' : '/pt/'}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-dark px-6 py-3 text-text-on-accent font-semibold hover:opacity-90 transition-opacity"
      >
        {isEn ? '← Back to home' : '← Voltar para o início'}
      </a>
    </div>
  );
}
