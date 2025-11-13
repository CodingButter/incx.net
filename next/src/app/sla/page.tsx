import { Metadata } from 'next';
import { loadSLA } from '@/lib/markdown';
import MarkdownContent from '@/components/MarkdownContent';

export const metadata: Metadata = {
  title: 'Service Level Agreement (SLA) - Interconnecx',
  description: 'Our service level agreement guarantees and commitments for network uptime and service availability',
  keywords: 'SLA, service level agreement, uptime guarantee, network availability',
};

export default function SLAPage() {
  const content = loadSLA();

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-600 to-primary-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Service Level Agreement</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Our commitment to delivering reliable, high-performance services
            </p>
          </div>
        </div>
      </section>

      {/* SLA Overview */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">99.9%</div>
              <p className="text-xl text-gray-900 dark:text-white font-semibold">Network Uptime</p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Guaranteed availability</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">24/7</div>
              <p className="text-xl text-gray-900 dark:text-white font-semibold">Support Access</p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Always available</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">&lt;60min</div>
              <p className="text-xl text-gray-900 dark:text-white font-semibold">Response Time</p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">For critical issues</p>
            </div>
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Experience Our Reliable Service
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of customers who trust our 99.9% uptime guarantee
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/dedicated-servers" className="btn bg-white text-primary-600 hover:bg-gray-100">
              View Services
            </a>
            <a href="/contact" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600">
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
