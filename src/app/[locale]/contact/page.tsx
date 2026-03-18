import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { getAlternates } from '@/i18n/navigation';
import { ContactPageContent } from '@/components/pages/ContactPageContent';

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
  const alternates = getAlternates('/en/contact/');

  return {
    title: t('contact.title'),
    description: t('contact.description'),
    alternates,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactPageContent />;
}
