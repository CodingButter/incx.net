import Link from 'next/link';
import Icon from '@/components/Icon';
import { getGlobalConfig } from '@/lib/config';

export default function Footer() {
  const config = getGlobalConfig();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info with Social Links */}
          <div>
            <div className="flex items-baseline mb-4">
              <span className="text-2xl font-bold text-white">{config.company.shortName}</span>
              <span className="text-2xl text-gray-400">.net</span>
            </div>
            <p className="text-gray-400 mb-4">
              {config.company.tagline} since {config.company.founded}.
            </p>
            <div className="flex space-x-4">
              {config.social.facebook && (
                <a
                  href={config.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Visit our Facebook page"
                >
                  <Icon icon="fab fa-facebook-f" />
                </a>
              )}
              {config.social.twitter && (
                <a
                  href={config.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Follow us on Twitter"
                >
                  <Icon icon="fab fa-twitter" />
                </a>
              )}
              {config.social.linkedin && (
                <a
                  href={config.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Connect with us on LinkedIn"
                >
                  <Icon icon="fab fa-linkedin-in" />
                </a>
              )}
              {config.social.github && (
                <a
                  href={config.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="View our GitHub profile"
                >
                  <Icon icon="fab fa-github" />
                </a>
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/dedicated-servers" className="hover:text-white transition-colors">Dedicated Servers</Link></li>
              <li><Link href="/vps" className="hover:text-white transition-colors">VPS Hosting</Link></li>
              <li><Link href="/colocation" className="hover:text-white transition-colors">Colocation</Link></li>
              <li><Link href="/network" className="hover:text-white transition-colors">Network</Link></li>
              <li><Link href="/testimonials" className="hover:text-white transition-colors">Testimonials</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/knowledge-base" className="hover:text-white transition-colors">Knowledge Base</Link></li>
              <li><Link href="/network-status" className="hover:text-white transition-colors">Network Status</Link></li>
              <li><Link href="/client-portal" className="hover:text-white transition-colors">Client Portal</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <Icon icon="fas fa-phone" className="text-primary-400" />
                <span>{config.contact.phoneDisplay}</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon icon="fas fa-envelope" className="text-primary-400" />
                <span>{config.contact.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon icon="fas fa-map-marker-alt" className="text-primary-400" />
                <span>{config.contact.address.city}, {config.contact.address.stateCode} {config.contact.address.zip}</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon icon="fas fa-clock" className="text-primary-400" />
                <span>{config.features.support.availability} Support</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-center md:text-left mb-4 md:mb-0">
              © {currentYear} {config.company.name}. All rights reserved. | {config.company.asNumber}
            </p>
            <div className="flex gap-4 text-sm">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/sla" className="hover:text-white transition-colors">SLA</Link>
              <Link href="/aup" className="hover:text-white transition-colors">AUP</Link>
            </div>
          </div>
          <div className="text-center mt-6 text-sm text-gray-400">
            Powered by <a href="https://codingbutter.com" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 transition-colors">CodingButter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
