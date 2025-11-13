import { Metadata } from 'next';
import { loadTermsOfService } from '@/lib/markdown';
import MarkdownContent from '@/components/MarkdownContent';

export const metadata: Metadata = {
  title: 'Terms of Service - Interconnecx',
  description: 'Terms and conditions for using Interconnecx hosting services',
  keywords: 'terms of service, terms, conditions, legal, agreement',
};

export default function TermsPage() {
  const content = loadTermsOfService();

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-600 to-primary-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Important legal agreements for our services
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
