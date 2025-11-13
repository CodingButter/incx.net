import { Metadata } from 'next';
import { loadAUP } from '@/lib/markdown';
import MarkdownContent from '@/components/MarkdownContent';
import { getGlobalConfig } from '@/lib/config';

const config = getGlobalConfig();

export const metadata: Metadata = {
  title: `Acceptable Use Policy - ${config.company.name}`,
  description: 'Our Acceptable Use Policy defines the permitted and prohibited uses of our hosting services',
  keywords: 'acceptable use policy, AUP, terms of use, prohibited activities, hosting policy',
};

export default function AUPPage() {
  const content = loadAUP();

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-600 to-primary-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Acceptable Use Policy</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Guidelines for responsible use of our hosting services
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 md:p-12">
            <MarkdownContent content={content} />
          </div>
        </div>
      </section>
    </>
  );
}
