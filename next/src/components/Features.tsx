import Icon from '@/components/Icon';
import type { PageConfig } from '@/lib/config';

interface FeaturesProps {
  config: PageConfig['features'];
}

export default function Features({ config }: FeaturesProps) {
  if (!config || !config.items) return null;

  // Define gradient colors for each feature card
  const gradientColors = [
    'from-blue-500 to-blue-600',
    'from-green-500 to-green-600',
    'from-purple-500 to-purple-600',
    'from-orange-500 to-orange-600',
    'from-red-500 to-red-600',
    'from-indigo-500 to-indigo-600',
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(config.headline || config.subheadline) && (
          <div className="text-center mb-16">
            {config.headline && (
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                {config.headline}
              </h2>
            )}
            {config.subheadline && (
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {config.subheadline}
              </p>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {config.items.map((feature, index) => (
            <div key={index} className="card p-8">
              {feature.icon && (
                <div className={`w-16 h-16 bg-gradient-to-br ${gradientColors[index % gradientColors.length]} rounded-xl flex items-center justify-center mb-6`}>
                  <Icon icon={feature.icon} className="text-white text-2xl" />
                </div>
              )}
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
