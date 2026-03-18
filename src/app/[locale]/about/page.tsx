import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { getAlternates } from '@/i18n/navigation';
import { AboutPageContent } from '@/components/pages/AboutPageContent';

export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const alternates = getAlternates('/en/about/');

  return {
    title: t('about.title'),
    description: t('about.description'),
    alternates,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutPageContent locale={locale} />;
}
