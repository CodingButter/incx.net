import Icon from '@/components/Icon';
export default function NetworkSection() {
  const datacenters = [
    { city: 'Detroit', stateCode: 'MI', tier: 3 },
    { city: 'Kansas City', stateCode: 'MO', tier: 3 },
    { city: 'Cleveland', stateCode: 'OH', tier: 3 },
  ];

  return (
    <section id="network" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Premium Network Infrastructure
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            BGP multihomed network with multiple tier 1 providers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon icon="fas fa-globe" className="text-3xl text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Global Connectivity</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Direct peering with AT&T, Cogent, Hurricane Electric, and Telia
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-secondary-100 dark:bg-secondary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon icon="fas fa-shield-alt" className="text-3xl text-secondary-600 dark:text-secondary-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">DDoS Protection</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Advanced DDoS mitigation included with all services
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon icon="fas fa-chart-line" className="text-3xl text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">100% Uptime SLA</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Guaranteed network availability with redundant connections
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon icon="fas fa-tachometer-alt" className="text-3xl text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Low Latency</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Strategic locations for optimal performance across the USA
            </p>
          </div>
        </div>

        {/* Data Center Locations */}
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Data Center Locations
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center max-w-4xl mx-auto">
            {datacenters.map((location, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center hover:shadow-lg transition-shadow w-full max-w-xs"
              >
                <Icon icon="fas fa-map-pin" className="text-2xl text-primary-600 dark:text-primary-400 mb-3" />
                <h4 className="font-bold text-gray-900 dark:text-white">
                  {location.city}, {location.stateCode}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Tier {location.tier} Facility
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
