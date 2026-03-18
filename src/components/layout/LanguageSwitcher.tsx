'use client';

import { usePathname } from 'next/navigation';
import { getAlternateLocaleUrl } from '@/i18n/navigation';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const isEn = pathname.startsWith('/en');
  const targetLocale = isEn ? 'pt' : 'en';
  const targetPath = getAlternateLocaleUrl(pathname, targetLocale);
  const flagCode = isEn ? 'br' : 'us';
  const label = isEn ? 'Português' : 'English';

  const handleClick = () => {
    localStorage.setItem('linvo-lang', targetLocale);
  };

  return (
    <a
      href={targetPath}
      onClick={handleClick}
      className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
      title={label}
    >
      <img
        src={`https://flagcdn.com/24x18/${flagCode}.png`}
        srcSet={`https://flagcdn.com/48x36/${flagCode}.png 2x`}
        width="24"
        height="18"
        alt={label}
      />
      <span className="hidden md:inline">{label}</span>
    </a>
  );
}
