import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';
import { getAlternates } from '@/i18n/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const currentPath = `/${locale}/`;
  const alternates = getAlternates(currentPath);

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

  return <LandingStub />;
}

function LandingStub() {
  const t = useTranslations('hero');

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="max-w-2xl px-6 text-center">
        <h1 className="text-4xl font-heading font-bold text-text-primary md:text-5xl">
          {t('headline')}
        </h1>
        <p className="mt-6 text-lg font-body text-text-secondary">
          {t('subtitle')}
        </p>
        <div className="mt-8">
          <a
            href="#waitlist"
            className="inline-block rounded-lg bg-accent-dark px-6 py-3 text-text-on-accent font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            {t('cta_primary')}
          </a>
        </div>
      </div>
    </div>
  );
}
