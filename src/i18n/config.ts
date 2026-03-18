export const locales = ['pt', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pt';

export const localizedSlugs = {
  about: { pt: 'sobre', en: 'about' },
  contact: { pt: 'contato', en: 'contact' },
  privacy: { pt: 'privacidade', en: 'privacy' },
} as const;
