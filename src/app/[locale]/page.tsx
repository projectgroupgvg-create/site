import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';
import PracticesGrid from '@/components/PracticesGrid';
import AIConsultation from '@/components/AIConsultation';
import BlogPreview from '@/components/BlogPreview';
import ContactSection from '@/components/ContactSection';
import { routing } from '@/i18n/routing';

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
      <Hero />
      <PracticesGrid />
      <AIConsultation />
      <BlogPreview />
      <ContactSection />
    </main>
  );
}
