import Link from 'next/link';
import Image from 'next/image';
import type { PageConfig } from '@/lib/config';
import { getHeroBlurDataURL } from '@/lib/image-blur';

interface HeroProps {
  config: PageConfig['hero'];
  backgroundImage?: string;
}

export default function Hero({ config, backgroundImage }: HeroProps) {
  if (!config) return null;

  // Determine which title and subtitle to use
  const title = config.headline || config.title || 'Welcome';
  const subtitle = config.subheadline || config.subtitle || config.description || '';

  // Determine hero height based on content
  const hasCTAs = config.primaryCTA || config.secondaryCTA;
  const hasFeatures = (config.bullets && config.bullets.length > 0) || (config.features && config.features.length > 0);
  const hasRichContent = hasCTAs || hasFeatures;

  // Full height for rich content, shorter for title+subtitle only
  const heightClasses = hasRichContent
    ? "min-h-[600px] lg:min-h-[700px]"
    : "min-h-[400px] lg:min-h-[500px]";

  return (
    <section className={`relative ${heightClasses} overflow-hidden bg-gray-900`}>
      {/* Background Image with Overlay */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt="Data Center Infrastructure"
            fill
            className="object-cover"
            priority
            quality={60}
            sizes="100vw"
            fetchPriority="high"
            placeholder="blur"
            blurDataURL={getHeroBlurDataURL()}
          />
          {/* Single strong dark overlay for text readability */}
          <div className="absolute inset-0 bg-black opacity-75" />
          {/* Gradient overlay for visual interest */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900/80" />
        </div>
      )}

      {/* Content */}
      <div className={`relative z-10 flex items-center justify-center ${heightClasses}`}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${hasRichContent ? 'py-24' : 'py-16'}`}>
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-200 mb-10 max-w-3xl mx-auto">
            {subtitle}
          </p>

          {/* CTAs */}
          {(config.primaryCTA || config.secondaryCTA) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {config.primaryCTA && (
                <Link
                  href={config.primaryCTA.link}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  {config.primaryCTA.icon && <i className={`${config.primaryCTA.icon} mr-2`} aria-hidden="true" />}
                  {config.primaryCTA.text}
                </Link>
              )}
              {config.secondaryCTA && (
                <Link
                  href={config.secondaryCTA.link}
                  className="inline-block border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  {config.secondaryCTA.icon && <i className={`${config.secondaryCTA.icon} mr-2`} aria-hidden="true" />}
                  {config.secondaryCTA.text}
                </Link>
              )}
            </div>
          )}

          {/* Feature badges */}
          {(config.bullets || config.features) && (
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {(config.bullets || config.features)?.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-white font-semibold text-sm sm:text-base"
                >
                  {feature}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
