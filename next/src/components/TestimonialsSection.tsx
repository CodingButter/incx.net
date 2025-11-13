import Link from 'next/link';

export default function TestimonialsSection() {
  const testimonials = [
    {
      text: "Interconnecx has been our hosting provider for 5+ years. Their network quality and support are unmatched.",
      author: "John Smith",
      company: "Tech Solutions Inc"
    },
    {
      text: "We migrated from AWS to Interconnecx and cut our hosting costs by 60% while improving performance.",
      author: "Sarah Johnson",
      company: "Digital Media Group"
    },
    {
      text: "The instant deployment and 24/7 support make Interconnecx the best choice for our infrastructure needs.",
      author: "Michael Chen",
      company: "Cloud Services Pro"
    }
  ];

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
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card p-6">
              <div className="mb-4">
                <i className="fas fa-quote-left text-2xl text-primary-600 dark:text-primary-400"></i>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {testimonial.text}
              </p>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {testimonial.author}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {testimonial.company}
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
