import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { getAlternates } from '@/i18n/navigation';
import { AboutPageContent } from '@/components/pages/AboutPageContent';

export function generateStaticParams() {
  return [{ locale: 'pt' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const alternates = getAlternates('/pt/sobre/');

  return {
    title: t('about.title'),
    description: t('about.description'),
    alternates,
  };
}

export default async function SobrePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutPageContent locale={locale} />;
}
