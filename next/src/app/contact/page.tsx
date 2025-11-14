import { Metadata } from 'next';
import Icon from '@/components/Icon';
import Hero from '@/components/Hero';
import { loadPageConfig, getGlobalConfig } from '@/lib/config';

export async function generateMetadata(): Promise<Metadata> {
  const config = await loadPageConfig('contact');

  return {
    title: config.meta?.title || 'Contact Us - Interconnecx',
    description: config.meta?.description || 'Get in touch with us',
    keywords: config.meta?.keywords,
  };
}

export default async function ContactPage() {
  const config = await loadPageConfig('contact');
  const global = getGlobalConfig();

  return (
    <>
      <Hero config={config.hero} />

      {/* Contact Section */}
      <section id="contact-form" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send Us a Message</h2>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">First Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all shadow-sm hover:border-gray-400 dark:hover:border-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Last Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Doe"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all shadow-sm hover:border-gray-400 dark:hover:border-gray-500"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all shadow-sm hover:border-gray-400 dark:hover:border-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="(555) 123-4567"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all shadow-sm hover:border-gray-400 dark:hover:border-gray-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Department *</label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all shadow-sm hover:border-gray-400 dark:hover:border-gray-500 cursor-pointer"
                    >
                      <option value="" className="text-gray-400">Select Department</option>
                      <option value="sales">Sales</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing</option>
                      <option value="abuse">Abuse</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Subject *</label>
                    <input
                      type="text"
                      required
                      placeholder="How can we help you?"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all shadow-sm hover:border-gray-400 dark:hover:border-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Message *</label>
                    <textarea
                      rows={6}
                      required
                      placeholder="Please provide details about your inquiry..."
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all shadow-sm hover:border-gray-400 dark:hover:border-gray-500 resize-none"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="newsletter"
                      className="w-4 h-4 mr-3 text-primary-600 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 cursor-pointer"
                    />
                    <label htmlFor="newsletter" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer select-none">
                      Subscribe to our newsletter for updates and promotions
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary w-full py-3 text-lg">
                    <Icon icon="fas fa-paper-plane" className="mr-2" /> Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Quick Contact Card */}
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Quick Contact</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon icon="fas fa-phone" className="text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Phone</p>
                      <p className="text-gray-600 dark:text-gray-400">{global.contact.phoneDisplay}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon icon="fas fa-envelope" className="text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Email</p>
                      <p className="text-gray-600 dark:text-gray-400">{global.contact.email}</p>
                      <p className="text-gray-600 dark:text-gray-400">{global.contact.supportEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon icon="fas fa-headset" className="text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Support</p>
                      <p className="text-gray-600 dark:text-gray-400">24/7/365 Available</p>
                      <p className="text-green-600 dark:text-green-400 text-sm">Always Online</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Location Card */}
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Office Location</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon icon="fas fa-building" className="text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Headquarters</p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {global.contact.address.street}<br />
                        Suite 533<br />
                        {global.contact.address.city}, {global.contact.address.stateCode} {global.contact.address.zip}<br />
                        {global.contact.address.country}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Center Locations */}
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Data Center Locations</h3>
                <div className="space-y-3">
                  {global.datacenters.map((dc, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Icon icon="fas fa-server" className="text-primary-600 dark:text-primary-400" />
                      <span className="text-gray-700 dark:text-gray-300">{dc.city}, {dc.state}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Contact Options */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="card p-6 text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon icon="fas fa-ticket-alt" className="text-white text-2xl" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Support Ticket</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Open a ticket for technical assistance</p>
              <a href="https://clients.incx.net" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">Open Ticket →</a>
            </div>
            <div className="card p-6 text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon icon="fas fa-comments" className="text-white text-2xl" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Live Chat</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Chat with our support team instantly</p>
              <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">Start Chat →</a>
            </div>
            <div className="card p-6 text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon icon="fas fa-book" className="text-white text-2xl" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Knowledge Base</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Find answers in our documentation</p>
              <a href="/knowledge-base" className="text-primary-600 dark:text-primary-400 hover:underline">Browse Articles →</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
