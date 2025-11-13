import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Client Portal - Interconnecx',
  description: 'Access your hosting account, manage services, and view invoices',
  keywords: 'client portal, login, account management, hosting dashboard',
};

export default function ClientPortalPage() {
  return (
    <>
      {/* Hero Section with Login Form */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Info */}
            <div className="text-white space-y-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                  Client Portal
                </h1>
                <p className="text-xl text-primary-100">
                  Access your hosting dashboard
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-server text-white"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Manage Services</h3>
                    <p className="text-primary-100">View and control all your hosting services</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-file-invoice-dollar text-white"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">View Invoices</h3>
                    <p className="text-primary-100">Access billing history and make payments</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-headset text-white"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Get Support</h3>
                    <p className="text-primary-100">Open tickets and track support requests</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-primary-100 text-sm">
                  Need help? Contact our 24/7 support team at{' '}
                  <a href="mailto:support@incx.net" className="text-white hover:underline font-semibold">
                    support@incx.net
                  </a>
                </p>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-10">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Sign In
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Enter your credentials to access your account
                </p>
              </div>

              <form
                method="post"
                action="https://clients.incx.net/index.php?rp=/login"
                className="space-y-6"
              >
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="inputEmail"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="username"
                    id="inputEmail"
                    placeholder="Enter your email"
                    autoFocus
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="inputPassword"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="inputPassword"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                  />
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberme"
                    id="rememberme"
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <label
                    htmlFor="rememberme"
                    className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <button
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    Sign In
                  </button>

                  <a
                    href="https://clients.incx.net/index.php?rp=/password/reset"
                    className="block w-full text-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-4 rounded-lg transition-colors"
                  >
                    Forgot Password?
                  </a>
                </div>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                      New to Interconnecx?
                    </span>
                  </div>
                </div>

                {/* Register Link */}
                <div className="text-center">
                  <a
                    href="https://clients.incx.net/index.php?rp=/register"
                    className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-semibold transition-colors"
                  >
                    Create an Account
                  </a>
                </div>
              </form>

              {/* Security Notice */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <i className="fas fa-shield-alt text-green-600"></i>
                  <span>Secured with SSL encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Quick Access
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <a
              href="https://clients.incx.net/index.php?rp=/announcements"
              className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                <i className="fas fa-bullhorn text-primary-600 dark:text-primary-400 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Announcements
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Stay updated with the latest news and service updates
              </p>
            </a>

            <a
              href="https://incx.tawk.help/"
              className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                <i className="fas fa-book text-primary-600 dark:text-primary-400 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Knowledge Base
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Find answers to common questions and tutorials
              </p>
            </a>

            <a
              href="/network-status"
              className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                <i className="fas fa-chart-line text-primary-600 dark:text-primary-400 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Network Status
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Check real-time network status and uptime
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Need Assistance?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Our support team is available 24/7 to help you
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              <i className="fas fa-envelope"></i>
              Contact Support
            </a>
            <a
              href="tel:+13135050000"
              className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              <i className="fas fa-phone"></i>
              (313) 505-0000
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
