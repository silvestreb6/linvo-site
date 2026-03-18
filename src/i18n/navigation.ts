const routeMap: Record<string, Record<string, string>> = {
  '/pt/': { en: '/en/' },
  '/en/': { pt: '/pt/' },
  '/pt/sobre/': { en: '/en/about/' },
  '/en/about/': { pt: '/pt/sobre/' },
  '/pt/contato/': { en: '/en/contact/' },
  '/en/contact/': { pt: '/pt/contato/' },
  '/pt/privacidade/': { en: '/en/privacy/' },
  '/en/privacy/': { pt: '/pt/privacidade/' },
};

export function getAlternateLocaleUrl(
  currentPath: string,
  targetLocale: string,
): string {
  const entry = routeMap[currentPath];
  if (entry && entry[targetLocale]) {
    return entry[targetLocale];
  }
  // Fallback: swap locale prefix
  if (currentPath.startsWith('/pt/')) {
    return '/en/' + currentPath.slice(4);
  }
  if (currentPath.startsWith('/en/')) {
    return '/pt/' + currentPath.slice(4);
  }
  return `/${targetLocale}/`;
}

export function getAlternates(currentPath: string) {
  const entry = routeMap[currentPath];
  if (!entry) return {};

  const ptPath = currentPath.startsWith('/pt/')
    ? currentPath
    : (entry.pt ?? currentPath);
  const enPath = currentPath.startsWith('/en/')
    ? currentPath
    : (entry.en ?? currentPath);

  return {
    canonical: `https://linvo.one${currentPath}`,
    languages: {
      'pt-BR': `https://linvo.one${ptPath}`,
      en: `https://linvo.one${enPath}`,
    },
  };
}

export { routeMap };
