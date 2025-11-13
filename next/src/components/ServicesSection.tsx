import Link from 'next/link';

export default function ServicesSection() {
  const services = [
    {
      icon: 'fas fa-server',
      title: 'Dedicated Servers',
      description: 'High-performance bare metal servers with full root access and dedicated resources',
      link: '/dedicated-servers',
    },
    {
      icon: 'fas fa-cloud',
      title: 'VPS Hosting',
      description: 'Scalable virtual private servers with SSD storage and instant provisioning',
      link: '/vps',
    },
    {
      icon: 'fas fa-database',
      title: 'Colocation',
      description: 'Secure rack space in our Tier 3 data centers with premium connectivity',
      link: '/colocation',
    },
  ];

  return (
    <section id="hosting" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Hosting Solutions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Choose from our range of high-performance hosting services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {services.map((service, index) => (
            <Link key={index} href={service.link} className="card p-8 text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className={`${service.icon} text-white text-3xl`} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {service.description}
              </p>
              <span className="text-primary-600 dark:text-primary-400 font-semibold">
                Learn More <i className="fas fa-arrow-right ml-2" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
