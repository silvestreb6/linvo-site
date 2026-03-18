import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { getAlternates } from '@/i18n/navigation';
import { PrivacyPageContent } from '@/components/pages/PrivacyPageContent';

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
  const alternates = getAlternates('/pt/privacidade/');

  return {
    title: t('privacy.title'),
    description: t('privacy.description'),
    alternates,
  };
}

export default async function PrivacidadePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PrivacyPageContent locale={locale} />;
}
