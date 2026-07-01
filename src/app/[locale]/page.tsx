import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';
import CredibilityBar from '@/components/CredibilityBar';
import PracticesGrid from '@/components/PracticesGrid';
import AIConsultation from '@/components/AIConsultation';
import NewsPreview from '@/components/NewsPreview';
import BlogPreview from '@/components/BlogPreview';
import ContactSection from '@/components/ContactSection';
import JsonLd from '@/components/JsonLd';
import { routing } from '@/i18n/routing';
import { buildLegalServiceSchema } from '@/lib/jsonld';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <JsonLd data={buildLegalServiceSchema(locale)} />
      <Hero />
      <CredibilityBar />
      <PracticesGrid />
      <AIConsultation />
      <NewsPreview />
      <BlogPreview />
      <ContactSection />
    </main>
  );
}
