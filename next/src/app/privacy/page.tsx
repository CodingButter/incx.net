import { Metadata } from 'next';
import { loadPrivacyPolicy } from '@/lib/markdown';
import MarkdownContent from '@/components/MarkdownContent';

export const metadata: Metadata = {
  title: 'Privacy Policy - Interconnecx',
  description: 'Our privacy policy outlines how we collect, use, and protect your personal information',
  keywords: 'privacy policy, data protection, privacy, terms',
};

export default function PrivacyPage() {
  const content = loadPrivacyPolicy();

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-600 to-primary-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Your privacy and data security are our top priorities
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
