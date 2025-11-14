import Link from 'next/link';
import Icon from '@/components/Icon';
import type { Product } from '@/lib/config';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className={`card p-6 flex flex-col h-full relative ${product.featured ? 'ring-2 ring-primary-600' : ''}`}>
      {product.featured && (
        <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 bg-primary-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-lg z-10 whitespace-nowrap">
          Popular
        </div>
      )}

      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 mt-2">
        {product.name}
      </h3>

      <p className="text-gray-600 dark:text-gray-400 mb-4">
        {product.description}
      </p>

      <div className="mb-6">
        {/* Check if product has a price */}
        {product.price && product.price > 0 ? (
          <>
            {/* Show discount pricing if discountPrice exists */}
            {product.discountPrice && product.discountPrice > 0 && (
              <div className="mb-1">
                <span className="text-2xl font-semibold text-gray-400 dark:text-gray-500 line-through">
                  ${product.discountPrice}
                </span>
              </div>
            )}
            {/* Current/Sale price - always blue */}
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                ${product.price}
              </span>
              <span className="text-gray-600 dark:text-gray-400 ml-2">
                /{product.billingCycle}
              </span>
            </div>
          </>
        ) : (
          /* No price - show Request Quote */
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            Request Quote
          </div>
        )}
      </div>

      {/* Specifications */}
      <div className="space-y-2 mb-6">
        {Object.entries(product.specifications).map(([key, value]) => (
          <div key={key} className="flex items-start text-sm">
            <Icon icon="fas fa-check" className="text-primary-600 dark:text-primary-400 mt-1 mr-2" />
            <div>
              <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>{' '}
              <span className="text-gray-600 dark:text-gray-400">{value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="space-y-2 mb-6">
        {product.features.map((feature, index) => (
          <div key={index} className="flex items-start text-sm">
            <Icon icon="fas fa-check-circle" className="text-primary-600 dark:text-primary-400 mt-1 mr-2" />
            <span className="text-gray-600 dark:text-gray-400">{feature}</span>
          </div>
        ))}
      </div>

      {/* Locations */}
      {product.locations && product.locations.length > 0 && (
        <div className="mb-6">
          <div className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Available Locations:
          </div>
          <div className="flex flex-wrap gap-2">
            {product.locations.map((location, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
              >
                {location}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto pt-4">
        <Link
          href={product.ctaLink}
          className="btn btn-primary w-full"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon="fas fa-shopping-cart" className="mr-2" />
          {product.ctaText}
        </Link>
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
          Setup time: {product.setupTime}
        </div>
      </div>
    </div>
  );
}
