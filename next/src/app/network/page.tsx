import { Metadata } from 'next';
import Icon from '@/components/Icon';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import { loadPageConfig, getGlobalConfig } from '@/lib/config';

export async function generateMetadata(): Promise<Metadata> {
  const config = await loadPageConfig('network');

  return {
    title: config.meta?.title || 'Network Infrastructure - Interconnecx',
    description: config.meta?.description || 'Our network infrastructure',
    keywords: config.meta?.keywords,
  };
}

export default async function NetworkPage() {
  const config = await loadPageConfig('network');
  const global = getGlobalConfig();
  const stats = config.stats as any;
  const carriers = config.carriers as any[];
  const speedtest = config.speedtest as any;
  const lookingGlass = config.lookingGlass as any;
  const datacenters = global.datacenters;

  return (
    <>
      <Hero config={config.hero} />

      {/* Network Stats */}
      {stats && (
        <section className="py-12 bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stats.uptime}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Network Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stats.capacity}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Network Capacity</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stats.asNumber}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Autonomous System</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stats.carriers}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Tier 1 Carriers</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Network Features */}
      {config.features && <Features config={config.features} />}

      {/* Network Providers */}
      {carriers && carriers.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Tier 1 Network Carriers
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Direct peering with major backbone providers
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {carriers.map((carrier, index) => (
                <div key={index} className="card p-6 text-center">
                  <Icon icon="fas fa-globe" className="text-5xl text-primary-600 dark:text-primary-400 mb-4" />
                  <h3 className="font-bold text-gray-900 dark:text-white">{carrier.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{carrier.type}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 px-6 py-3 rounded-lg">
                <Icon icon="fas fa-info-circle" className="text-primary-600 dark:text-primary-400" />
                <span className="text-gray-900 dark:text-white font-semibold">
                  {global.company.asNumber} - Autonomous System Number
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Test Our Network */}
      {(speedtest || lookingGlass) && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Test Our Network
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Experience the speed and reliability firsthand
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Speed Test Files */}
              {speedtest && (
                <div className="card p-8">
                  <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                    <Icon icon="fas fa-download" className="text-primary-600 dark:text-primary-400 mr-2" />
                    {speedtest.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {speedtest.description}
                  </p>
                  <div className="space-y-4">
                    {speedtest.files?.map((file: any, index: number) => (
                      <a
                        key={index}
                        href={file.url}
                        className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {file.label}
                            </div>
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                              {file.description}
                            </div>
                          </div>
                          <Icon icon="fas fa-download" className="text-primary-600 dark:text-primary-400" />
                        </div>
                      </a>
                    ))}
                  </div>
                  {speedtest.note && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">
                      {speedtest.note}
                    </p>
                  )}
                </div>
              )}

              {/* Looking Glass */}
              {lookingGlass && (
                <div className="card p-8">
                  <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                    <Icon icon="fas fa-search" className="text-primary-600 dark:text-primary-400 mr-2" />
                    {lookingGlass.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {lookingGlass.description}
                  </p>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder={lookingGlass.placeholder}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                      <option value="">{lookingGlass.defaultOption}</option>
                      {lookingGlass.testTypes?.map((type: string, index: number) => (
                        <option key={index} value={type.toLowerCase()}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <button className="btn btn-primary w-full">
                      {lookingGlass.buttonText}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Data Centers */}
      {datacenters && datacenters.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Data Center Locations
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Strategic locations across the United States
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {datacenters.map((dc, index) => (
                <div key={dc.id} className="card p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {dc.city}, {dc.stateCode}
                    </h3>
                    <p className="text-sm text-primary-600 dark:text-primary-400 font-semibold">
                      {dc.primary ? 'Primary Location' : `Tier ${dc.tier} Facility`}
                    </p>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-center">
                      <Icon icon="fas fa-check-circle" className="text-green-600 dark:text-green-400 mr-2" />
                      Tier {dc.tier} Facility
                    </li>
                    <li className="flex items-center">
                      <Icon icon="fas fa-check-circle" className="text-green-600 dark:text-green-400 mr-2" />
                      24/7 Security
                    </li>
                    <li className="flex items-center">
                      <Icon icon="fas fa-check-circle" className="text-green-600 dark:text-green-400 mr-2" />
                      N+1 Redundancy
                    </li>
                    <li className="flex items-center">
                      <Icon icon="fas fa-check-circle" className="text-green-600 dark:text-green-400 mr-2" />
                      {dc.available ? 'Available Now' : 'Coming Soon'}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
