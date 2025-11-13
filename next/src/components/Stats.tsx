import type { PageConfig } from '@/lib/config';

interface StatsProps {
  config: PageConfig['stats'];
}

export default function Stats({ config }: StatsProps) {
  if (!config || !config.enabled || !config.items) return null;

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {config.items.map((stat, index) => (
            <div key={index} className="text-center">
              {stat.icon && (
                <i className={`${stat.icon} text-4xl text-primary-600 dark:text-primary-400 mb-4`} />
              )}
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
