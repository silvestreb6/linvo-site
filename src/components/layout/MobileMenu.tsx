'use client';

import { LanguageSwitcher } from './LanguageSwitcher';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navLinks: { label: string; href: string }[];
  pageLinks: { label: string; href: string }[];
  locale: string;
  ctaLabel: string;
  isLanding: boolean;
}

export function MobileMenu({
  open,
  onClose,
  navLinks,
  pageLinks,
  ctaLabel,
  isLanding,
}: MobileMenuProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-72 bg-surface shadow-xl transition-transform duration-300">
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="p-2 text-text-primary cursor-pointer" aria-label="Close">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="py-3 text-lg font-medium text-text-primary hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          {pageLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="py-3 text-lg font-medium text-text-primary hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}

          <div className="mt-4 border-t border-border pt-4">
            <LanguageSwitcher />
          </div>

          {isLanding && (
            <a
              href="#waitlist"
              onClick={onClose}
              className="mt-4 block rounded-lg bg-accent-dark px-4 py-3 text-center font-semibold text-text-on-accent hover:opacity-90 transition-opacity"
            >
              {ctaLabel}
            </a>
          )}
        </nav>
      </div>
    </div>
  );
}
