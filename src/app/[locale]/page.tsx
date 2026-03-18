import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { getAlternates } from '@/i18n/navigation';
import { Hero } from '@/components/sections/Hero';
import { Problem } from '@/components/sections/Problem';
import { Solution } from '@/components/sections/Solution';
import { Features } from '@/components/sections/Features';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { SocialProof } from '@/components/sections/SocialProof';
import { FAQ } from '@/components/sections/FAQ';
import { WaitlistCTA } from '@/components/sections/WaitlistCTA';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const alternates = getAlternates(`/${locale}/`);

  return {
    title: t('home.title'),
    description: t('home.description'),
    keywords: t('home.keywords'),
    openGraph: {
      title: t('home.og_title'),
      description: t('home.og_description'),
      url: `https://linvo.one/${locale}/`,
      siteName: 'Linvo',
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('home.og_title'),
      description: t('home.og_description'),
    },
    alternates,
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <Features />
      <HowItWorks />
      <SocialProof />
      <FAQ />
      <WaitlistCTA />
    </>
  );
}
