import { Metadata } from 'next';
import Hero from '@/components/Hero';
import { loadPageConfig, getGlobalConfig } from '@/lib/config';

export async function generateMetadata(): Promise<Metadata> {
  const config = await loadPageConfig('about');

  return {
    title: config.meta?.title || 'About Us - Interconnecx',
    description: config.meta?.description || 'Learn about Interconnecx',
    keywords: config.meta?.keywords,
  };
}

export default async function AboutPage() {
  const config = await loadPageConfig('about');
  const global = getGlobalConfig();
  const story = config.story as any;

  return (
    <>
      <Hero config={config.hero} backgroundImage="/images/about.jpg" />

      {/* Company Story */}
      {story && (
        <section id="our-story" className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  {story.title}
                </h2>
                {story.content && story.content.map((paragraph: string, index: number) => (
                  <p key={index} className="text-gray-600 dark:text-gray-400 mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="card p-6 text-center">
                  <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">15+</div>
                  <p className="text-gray-600 dark:text-gray-400">Years in Business</p>
                </div>
                <div className="card p-6 text-center">
                  <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">{global.datacenters.length}</div>
                  <p className="text-gray-600 dark:text-gray-400">Data Centers</p>
                </div>
                <div className="card p-6 text-center">
                  <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">{global.network.uptime}</div>
                  <p className="text-gray-600 dark:text-gray-400">Uptime Guarantee</p>
                </div>
                <div className="card p-6 text-center">
                  <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">24/7</div>
                  <p className="text-gray-600 dark:text-gray-400">Support Available</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Mission & Values */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Mission & Values</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We&apos;re committed to providing reliable, high-performance hosting solutions that empower businesses to succeed online.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-shield-alt text-white text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Reliability First</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our infrastructure is built with redundancy at every level, ensuring your services stay online when you need them most.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-users text-white text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Customer Focused</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We believe in building lasting relationships with our clients through exceptional service and support available 24/7/365.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-rocket text-white text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Innovation Driven</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We continuously invest in the latest technology and infrastructure to deliver cutting-edge solutions for modern businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Our Infrastructure</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              State-of-the-art equipment and facilities designed for maximum performance and reliability.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-6">
              <div className="text-4xl mb-4 text-primary-600 dark:text-primary-400">
                <i className="fas fa-server" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Enterprise Hardware</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {global.hardware.defaultBrand} PowerEdge servers with latest Intel Xeon processors
              </p>
            </div>
            <div className="card p-6">
              <div className="text-4xl mb-4 text-primary-600 dark:text-primary-400">
                <i className="fas fa-network-wired" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Premium Network</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {global.network.bandwidth} {global.network.bandwidthType} bandwidth with BGP routing
              </p>
            </div>
            <div className="card p-6">
              <div className="text-4xl mb-4 text-primary-600 dark:text-primary-400">
                <i className="fas fa-shield-alt" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">DDoS Protection</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {global.network.ddosProtection} protection included with all services
              </p>
            </div>
            <div className="card p-6">
              <div className="text-4xl mb-4 text-primary-600 dark:text-primary-400">
                <i className="fas fa-building" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Tier 3 Facilities</h3>
              <p className="text-gray-600 dark:text-gray-400">
                SOC audited data centers with N+1 power and cooling redundancy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Network Partners */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Network Partners</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We partner with leading carriers to ensure optimal connectivity and performance.
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12">
            <div className="text-center">
              <i className="fas fa-globe text-5xl text-gray-400 dark:text-gray-600" />
              <p className="mt-2 text-gray-600 dark:text-gray-400 font-semibold">AT&T</p>
            </div>
            <div className="text-center">
              <i className="fas fa-globe text-5xl text-gray-400 dark:text-gray-600" />
              <p className="mt-2 text-gray-600 dark:text-gray-400 font-semibold">Cogent</p>
            </div>
            <div className="text-center">
              <i className="fas fa-globe text-5xl text-gray-400 dark:text-gray-600" />
              <p className="mt-2 text-gray-600 dark:text-gray-400 font-semibold">Hurricane Electric</p>
            </div>
            <div className="text-center">
              <i className="fas fa-globe text-5xl text-gray-400 dark:text-gray-600" />
              <p className="mt-2 text-gray-600 dark:text-gray-400 font-semibold">Telia</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600 dark:text-gray-400">
              <strong>{global.company.asNumber}</strong> - Fully BGP multihomed network maintained directly by Interconnecx
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Why Choose Interconnecx?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Experience the difference of working with a hosting provider that truly cares about your success.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <i className="fas fa-check-circle text-2xl text-green-500" />
              </div>
              <div>
                <h3 className="font-bold mb-2 text-gray-900 dark:text-white">No Overselling</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We never oversell our resources. What you purchase is exclusively yours.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <i className="fas fa-check-circle text-2xl text-green-500" />
              </div>
              <div>
                <h3 className="font-bold mb-2 text-gray-900 dark:text-white">True 24/7 Support</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Real engineers available around the clock, not just ticket systems.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <i className="fas fa-check-circle text-2xl text-green-500" />
              </div>
              <div>
                <h3 className="font-bold mb-2 text-gray-900 dark:text-white">Month-to-Month Contracts</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  No long-term commitments required. Pay monthly with no setup fees.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <i className="fas fa-check-circle text-2xl text-green-500" />
              </div>
              <div>
                <h3 className="font-bold mb-2 text-gray-900 dark:text-white">Owned Hardware</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We own all our hardware - we&apos;re not resellers, ensuring better prices and control.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <i className="fas fa-check-circle text-2xl text-green-500" />
              </div>
              <div>
                <h3 className="font-bold mb-2 text-gray-900 dark:text-white">Flexible Policies</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  VPN, Tor, and legal content allowed. We believe in internet freedom.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <i className="fas fa-check-circle text-2xl text-green-500" />
              </div>
              <div>
                <h3 className="font-bold mb-2 text-gray-900 dark:text-white">Fast Provisioning</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Servers deployed within 24-48 hours, VPS instantly provisioned.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of satisfied customers who trust Interconnecx for their hosting needs.
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
