import { Metadata } from 'next';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import { loadPageConfig, getProducts } from '@/lib/config';

export async function generateMetadata(): Promise<Metadata> {
  const config = await loadPageConfig('colocation');

  return {
    title: config.meta?.title || 'Server Colocation - Interconnecx',
    description: config.meta?.description || 'Enterprise colocation services',
    keywords: config.meta?.keywords,
  };
}

export default async function ColocationPage() {
  const config = await loadPageConfig('colocation');
  const products = getProducts('colocation');

  return (
    <>
      <Hero config={config.hero} backgroundImage="/images/colocation-hero.webp" />

      <section id="products" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Colocation Packages
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
                No colocation packages available at this time.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
