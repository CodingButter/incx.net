import Link from 'next/link';

export default function DedicatedServersSection() {
  return (
    <section id="dedicated" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Instant Dedicated Servers
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Deploy powerful bare metal servers in minutes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Entry Server */}
          <div className="card p-8 relative">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Entry Server</h3>
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">$149</span>
                <span className="text-gray-500 dark:text-gray-400">/mo</span>
              </div>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <i className="fas fa-microchip text-primary-500 w-5"></i>
                <span className="text-gray-700 dark:text-gray-300">Intel Xeon E3-1270v3</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-memory text-primary-500 w-5"></i>
                <span className="text-gray-700 dark:text-gray-300">32GB DDR3 RAM</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-hdd text-primary-500 w-5"></i>
                <span className="text-gray-700 dark:text-gray-300">2x1TB SATA HDD</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-network-wired text-primary-500 w-5"></i>
                <span className="text-gray-700 dark:text-gray-300">1Gbps Unmetered</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-exchange-alt text-primary-500 w-5"></i>
                <span className="text-gray-700 dark:text-gray-300">33TB Transfer</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-map-marker-alt text-primary-500 w-5"></i>
                <span className="text-gray-700 dark:text-gray-300">Detroit / Kansas City</span>
              </div>
            </div>
            <Link href="/dedicated-servers" className="btn btn-primary w-full">
              Order Now
            </Link>
          </div>

          {/* Professional Server */}
          <div className="card p-8 relative border-2 border-primary-500 transform scale-105">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Professional Server</h3>
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">$249</span>
                <span className="text-gray-500 dark:text-gray-400">/mo</span>
              </div>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <i className="fas fa-microchip text-primary-500 w-5"></i>
                <span className="text-gray-700 dark:text-gray-300">Intel Xeon E5-2680v4</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-memory text-primary-500 w-5"></i>
                <span className="text-gray-700 dark:text-gray-300">64GB DDR4 RAM</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-hdd text-primary-500 w-5"></i>
                <span className="text-gray-700 dark:text-gray-300">2x2TB SSD</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-network-wired text-primary-500 w-5"></i>
                <span className="text-gray-700 dark:text-gray-300">1Gbps Unmetered</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-exchange-alt text-primary-500 w-5"></i>
                <span className="text-gray-700 dark:text-gray-300">33TB Transfer</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-map-marker-alt text-primary-500 w-5"></i>
                <span className="text-gray-700 dark:text-gray-300">All Locations</span>
              </div>
            </div>
            <Link href="/dedicated-servers" className="btn btn-primary w-full">
              Order Now
            </Link>
          </div>

          {/* Enterprise Server */}
          <div className="card p-8 relative">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Enterprise Server</h3>
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">$449</span>
                <span className="text-gray-500 dark:text-gray-400">/mo</span>
              </div>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <i className="fas fa-microchip text-primary-500 w-5"></i>
                <span className="text-gray-700 dark:text-gray-300">Dual Xeon Gold 6140</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-memory text-primary-500 w-5"></i>
                <span className="text-gray-700 dark:text-gray-300">128GB DDR4 RAM</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-hdd text-primary-500 w-5"></i>
                <span className="text-gray-700 dark:text-gray-300">4x4TB NVMe SSD</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-network-wired text-primary-500 w-5"></i>
                <span className="text-gray-700 dark:text-gray-300">10Gbps Network</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-exchange-alt text-primary-500 w-5"></i>
                <span className="text-gray-700 dark:text-gray-300">Unlimited Transfer</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-map-marker-alt text-primary-500 w-5"></i>
                <span className="text-gray-700 dark:text-gray-300">All Locations</span>
              </div>
            </div>
            <Link href="/dedicated-servers" className="btn btn-primary w-full">
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
