import { Metadata } from 'next';
import Icon from '@/components/Icon';
import { getGlobalConfig } from '@/lib/config';

const config = getGlobalConfig();

export const metadata: Metadata = {
  title: `Network Status - ${config.company.name}`,
  description: 'Check the real-time status of our network and data centers',
  keywords: 'network status, uptime, data center status, service health',
};

export default function NetworkStatusPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-600 to-primary-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Network Status</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Real-time monitoring of our network infrastructure and services
            </p>
          </div>
        </div>
      </section>

      {/* Overall Status */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Icon icon="fas fa-check-circle" className="text-4xl text-green-500" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">All Systems Operational</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              All services are running normally with no reported issues
            </p>
          </div>
        </div>
      </section>

      {/* Data Centers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            Data Center Status
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {config.datacenters.filter(dc => dc.available).map((datacenter) => (
              <div key={datacenter.id} className="card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      <Icon icon="fas fa-map-marker-alt" className="text-primary-600 dark:text-primary-400 mr-2" />
                      {datacenter.city}, {datacenter.stateCode}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Tier {datacenter.tier} Facility</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold">
                    Operational
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Network</span>
                    <span className="flex items-center gap-2">
                      <Icon icon="fas fa-circle" className="text-green-500 text-xs" />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">Online</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Power</span>
                    <span className="flex items-center gap-2">
                      <Icon icon="fas fa-circle" className="text-green-500 text-xs" />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">Online</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Cooling</span>
                    <span className="flex items-center gap-2">
                      <Icon icon="fas fa-circle" className="text-green-500 text-xs" />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">Online</span>
                    </span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Uptime</span>
                      <span className="text-sm font-bold text-green-600 dark:text-green-400">{config.features.guarantees.networkUptime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Status */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            Service Status
          </h2>
          <div className="space-y-4">
            <div className="card p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Icon icon="fas fa-server" className="text-2xl text-primary-600 dark:text-primary-400" />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Dedicated Servers</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Bare metal server provisioning and management</p>
                </div>
              </div>
              <span className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                <Icon icon="fas fa-check-circle" />
                Operational
              </span>
            </div>

            <div className="card p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Icon icon="fas fa-cloud" className="text-2xl text-primary-600 dark:text-primary-400" />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">VPS Hosting</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Virtual private server provisioning</p>
                </div>
              </div>
              <span className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                <Icon icon="fas fa-check-circle" />
                Operational
              </span>
            </div>

            <div className="card p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Icon icon="fas fa-database" className="text-2xl text-primary-600 dark:text-primary-400" />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Colocation Services</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Rack space and connectivity</p>
                </div>
              </div>
              <span className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                <Icon icon="fas fa-check-circle" />
                Operational
              </span>
            </div>

            <div className="card p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Icon icon="fas fa-network-wired" className="text-2xl text-primary-600 dark:text-primary-400" />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Network Connectivity</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">BGP routing and bandwidth</p>
                </div>
              </div>
              <span className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                <Icon icon="fas fa-check-circle" />
                Operational
              </span>
            </div>

            <div className="card p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Icon icon="fas fa-users" className="text-2xl text-primary-600 dark:text-primary-400" />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Client Portal</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Customer management interface</p>
                </div>
              </div>
              <span className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                <Icon icon="fas fa-check-circle" />
                Operational
              </span>
            </div>

            <div className="card p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Icon icon="fas fa-headset" className="text-2xl text-primary-600 dark:text-primary-400" />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Support Systems</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ticket and chat support</p>
                </div>
              </div>
              <span className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                <Icon icon="fas fa-check-circle" />
                Operational
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Network Performance */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            Network Performance
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="card p-6 text-center">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">{config.network.uptime}</div>
              <p className="text-gray-600 dark:text-gray-400">Network Uptime</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Last 30 days</p>
            </div>
            <div className="card p-6 text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">&lt;15ms</div>
              <p className="text-gray-600 dark:text-gray-400">Avg Latency</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">US East Coast</p>
            </div>
            <div className="card p-6 text-center">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">{config.network.bandwidth}</div>
              <p className="text-gray-600 dark:text-gray-400">Network Capacity</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Per location</p>
            </div>
            <div className="card p-6 text-center">
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">0</div>
              <p className="text-gray-600 dark:text-gray-400">Active Incidents</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Last 7 days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance Schedule */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            Scheduled Maintenance
          </h2>
          <div className="card p-8 text-center">
            <Icon icon="fas fa-calendar-check" className="text-5xl text-gray-400 dark:text-gray-600 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">No Scheduled Maintenance</h3>
            <p className="text-gray-600 dark:text-gray-400">
              There is currently no scheduled maintenance. We will notify all affected customers via email at least 48 hours in advance of any planned maintenance.
            </p>
          </div>
        </div>
      </section>

      {/* Subscribe to Updates */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Stay Informed
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Get notified about network status updates and maintenance schedules
          </p>
          <a href="/contact" className="btn btn-primary">
            <Icon icon="fas fa-bell" className="mr-2" />
            Subscribe to Status Updates
          </a>
        </div>
      </section>
    </>
  );
}
