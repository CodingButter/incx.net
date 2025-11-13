import { Metadata } from 'next';
import Hero from '@/components/Hero';
import ServicesSection from '@/components/ServicesSection';
import DedicatedServersSection from '@/components/DedicatedServersSection';
import NetworkSection from '@/components/NetworkSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import CTASection from '@/components/CTASection';
import TestimonialsSection from '@/components/TestimonialsSection';
import { loadPageConfig } from '@/lib/config';

export async function generateMetadata(): Promise<Metadata> {
  const config = await loadPageConfig('home');

  return {
    title: config.meta?.title || 'Interconnecx - Premium Hosting Solutions',
    description: config.meta?.description || 'Enterprise-grade hosting infrastructure',
    keywords: config.meta?.keywords,
  };
}

export default async function HomePage() {
  const config = await loadPageConfig('home');

  return (
    <>
      <Hero
        config={config.hero}
        backgroundImage="/images/dedicated-servers-hero.jpg"
      />
      <ServicesSection />
      <DedicatedServersSection />
      <NetworkSection />
      <WhyChooseSection />
      <CTASection />
      <TestimonialsSection />
    </>
  );
}
