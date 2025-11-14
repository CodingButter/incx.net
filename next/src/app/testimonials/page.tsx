import { Metadata } from 'next';
import Icon from '@/components/Icon';
import Hero from '@/components/Hero';
import { loadPageConfig } from '@/lib/config';
import testimonialsData from '@config/testimonials.json';

export async function generateMetadata(): Promise<Metadata> {
  const config = await loadPageConfig('testimonials');

  return {
    title: config.meta?.title || 'Customer Testimonials - Interconnecx',
    description: config.meta?.description || 'What our customers say about us',
    keywords: config.meta?.keywords,
  };
}

interface Testimonial {
  id: string;
  name: string;
  company: string;
  position: string;
  rating: number;
  date: string;
  service: string;
  location: string;
  avatar: string | null;
  featured: boolean;
  verified: boolean;
  title: string;
  content: string;
  highlights: string[];
}

export default async function TestimonialsPage() {
  const config = await loadPageConfig('testimonials');
  const { testimonials = [], stats } = testimonialsData;

  return (
    <>
      <Hero config={config.hero} />

      {/* Stats Section */}
      {stats && (
        <section className="py-12 bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stats.totalReviews}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Total Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stats.averageRating}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stats.verifiedPercentage}%
                </div>
                <div className="text-gray-600 dark:text-gray-400">Verified</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stats.recommendPercentage}%
                </div>
                <div className="text-gray-600 dark:text-gray-400">Recommend</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Customer Reviews
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Hear from businesses that trust us with their critical infrastructure
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial: Testimonial) => (
                <div key={testimonial.id} className="card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h3>
                        {testimonial.verified && (
                          <Icon icon="fas fa-check-circle" className="text-green-600 dark:text-green-400 text-sm" />
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {testimonial.position} at {testimonial.company}
                      </p>
                      <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                        {testimonial.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fas fa-star text-xs ${
                            i < testimonial.rating
                              ? 'text-yellow-400'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                    {testimonial.title}
                  </p>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-4">
                    {testimonial.content}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {testimonial.highlights.slice(0, 2).map((highlight, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 text-xs rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs text-gray-500 dark:text-gray-500 border-t border-gray-200 dark:border-gray-700 pt-3">
                    {testimonial.service} • {new Date(testimonial.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
