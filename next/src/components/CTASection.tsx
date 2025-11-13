import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
        <p className="text-xl text-primary-100 mb-8">
          Deploy your server today and experience premium hosting performance
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dedicated-servers"
            className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg"
          >
            View All Plans
          </Link>
          <a
            href="tel:8102027474"
            className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg"
          >
            <i className="fas fa-phone mr-2"></i> (810) 202-7474
          </a>
        </div>
      </div>
    </section>
  );
}
