import Link from 'next/link';
import { getFeaturedTestimonials } from '@/lib/config';

export default function TestimonialsSection() {
  // Get featured testimonials from config (limit to 3 for homepage)
  const testimonials = getFeaturedTestimonials(3);

  return (
    <section id="testimonials-section" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Trusted by thousands of businesses worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="card p-6">
              <div className="mb-4">
                <i className="fas fa-quote-left text-2xl text-primary-600 dark:text-primary-400"></i>
              </div>
              {testimonial.title && (
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {testimonial.title}
                </h3>
              )}
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {testimonial.content}
              </p>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {testimonial.position && `${testimonial.position}, `}{testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/testimonials"
            className="btn btn-secondary inline-flex items-center gap-2"
          >
            View All Testimonials
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
