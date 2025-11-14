import Icon from '@/components/Icon';
import { getGlobalConfig } from '@/lib/config';

export default function WhyChooseSection() {
  const config = getGlobalConfig();

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose {config.company.shortName}?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Trusted by businesses since {config.company.founded}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="card p-8">
            <Icon icon="fas fa-clock" className="text-4xl text-primary-600 dark:text-primary-400 mb-4" />
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
              15+ Years Experience
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Established in 2009, we&apos;ve been providing reliable hosting solutions for over a decade
            </p>
          </div>
          <div className="card p-8">
            <Icon icon="fas fa-users" className="text-4xl text-secondary-600 dark:text-secondary-400 mb-4" />
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
              24/7 US Support
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              USA-based technical support team available around the clock
            </p>
          </div>
          <div className="card p-8">
            <Icon icon="fas fa-lock" className="text-4xl text-purple-600 dark:text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
              SOC Audited
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              All facilities are SOC audited Tier 3 data centers with enterprise security
            </p>
          </div>
          <div className="card p-8">
            <Icon icon="fas fa-rocket" className="text-4xl text-orange-600 dark:text-orange-400 mb-4" />
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
              Instant Deployment
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get your server online in minutes with our automated provisioning
            </p>
          </div>
          <div className="card p-8">
            <Icon icon="fas fa-dollar-sign" className="text-4xl text-green-600 dark:text-green-400 mb-4" />
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
              No Hidden Fees
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Transparent pricing with no setup fees or hidden charges
            </p>
          </div>
          <div className="card p-8">
            <Icon icon="fas fa-check-circle" className="text-4xl text-blue-600 dark:text-blue-400 mb-4" />
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
              Flexible Terms
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              VPN, Tor, and content seeding allowed on all servers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
