// ================================
// Universal Footer Component
// ================================

class FooterComponent {
    constructor() {
        this.init();
    }

    async init() {
        // Wait for ConfigManager to load if it exists
        if (window.configManager) {
            // Wait a bit for configs to load
            setTimeout(() => this.render(), 100);
        } else {
            this.render();
        }
    }

    render() {
        const footers = document.querySelectorAll('footer');
        footers.forEach(footer => {
            footer.innerHTML = this.getFooterHTML();
        });

        // Update with config data if available
        if (window.configManager) {
            this.updateFromConfig();
        }
    }

    getFooterHTML() {
        return `
        <div class="bg-gray-900 dark:bg-black text-gray-300">
            <div class="max-w-7xl mx-auto px-4 py-12">
                <div class="grid md:grid-cols-4 gap-8">
                    <div>
                        <div class="flex items-baseline mb-4">
                            <span class="text-2xl font-bold text-white">INCX</span>
                            <span class="text-2xl text-gray-400">.net</span>
                        </div>
                        <p class="text-gray-400 mb-4">Enterprise hosting solutions since 2009. Dedicated servers, VPS, and colocation services.</p>
                        <div class="flex space-x-4" id="footer-social-links">
                            <a href="https://www.facebook.com/InterConnecX/" target="_blank" rel="noopener noreferrer" class="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors" aria-label="Visit our Facebook page">
                                <i class="fab fa-facebook-f" aria-hidden="true"></i>
                            </a>
                            <a href="https://twitter.com/interconnecx" target="_blank" rel="noopener noreferrer" class="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors" aria-label="Follow us on Twitter">
                                <i class="fab fa-twitter" aria-hidden="true"></i>
                            </a>
                            <a href="https://www.linkedin.com/company/interconnecx" target="_blank" rel="noopener noreferrer" class="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors" aria-label="Connect with us on LinkedIn">
                                <i class="fab fa-linkedin-in" aria-hidden="true"></i>
                            </a>
                            <a href="https://github.com/interconnecx" target="_blank" rel="noopener noreferrer" class="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors" aria-label="View our GitHub profile">
                                <i class="fab fa-github" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 class="font-semibold text-white mb-4">Services</h4>
                        <ul class="space-y-2">
                            <li><a href="/dedicated-servers" class="hover:text-white transition-colors">Dedicated Servers</a></li>
                            <li><a href="/vps" class="hover:text-white transition-colors">VPS Hosting</a></li>
                            <li><a href="/colocation" class="hover:text-white transition-colors">Colocation</a></li>
                            <li><a href="/network" class="hover:text-white transition-colors">Network</a></li>
                            <li><a href="/testimonials" class="hover:text-white transition-colors">Testimonials</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-white mb-4">Company</h4>
                        <ul class="space-y-2">
                            <li><a href="/about" class="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="/contact" class="hover:text-white transition-colors">Contact</a></li>
                            <li><a href="/knowledge-base" class="hover:text-white transition-colors">Knowledge Base</a></li>
                            <li><a href="/network-status" class="hover:text-white transition-colors">Network Status</a></li>
                            <li><a href="/client-portal" class="hover:text-white transition-colors">Client Portal</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-white mb-4">Contact</h4>
                        <ul class="space-y-2 text-gray-400">
                            <li class="flex items-center gap-2">
                                <i class="fas fa-phone text-primary-400"></i>
                                <span>(810) 202-7474</span>
                            </li>
                            <li class="flex items-center gap-2">
                                <i class="fas fa-envelope text-primary-400"></i>
                                <span>sales@incx.net</span>
                            </li>
                            <li class="flex items-center gap-2">
                                <i class="fas fa-map-marker-alt text-primary-400"></i>
                                <span>Southfield, MI 48075</span>
                            </li>
                            <li class="flex items-center gap-2">
                                <i class="fas fa-clock text-primary-400"></i>
                                <span>24/7/365 Support</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="border-t border-gray-800 mt-8 pt-8">
                    <div class="flex flex-col md:flex-row justify-between items-center">
                        <p class="text-center md:text-left mb-4 md:mb-0">© 2024 Interconnecx, LLC. All rights reserved. | AS13737</p>
                        <div class="flex gap-4 text-sm">
                            <a href="/privacy" class="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="/terms" class="hover:text-white transition-colors">Terms of Service</a>
                            <a href="/sla" class="hover:text-white transition-colors">SLA</a>
                        </div>
                    </div>
                    <div class="text-center mt-6 text-sm text-gray-400">
                        Powered by <a href="https://codingbutter.com" target="_blank" rel="noopener noreferrer" class="text-primary-400 hover:text-primary-300 transition-colors">CodingButter LLC</a>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    updateFromConfig() {
        // Update social links from config
        const socials = window.configManager?.getConfig('socials');
        if (socials && socials.enabled) {
            const socialContainer = document.getElementById('footer-social-links');
            if (socialContainer) {
                socialContainer.innerHTML = '';
                socials.platforms.forEach(platform => {
                    if (platform.enabled && platform.url) {
                        const link = document.createElement('a');
                        link.href = platform.url;
                        link.target = '_blank';
                        link.rel = 'noopener noreferrer';
                        link.className = 'w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors';

                        // Add aria-label for accessibility
                        const platformName = platform.name || platform.icon.split('-').pop();
                        link.setAttribute('aria-label', `Visit our ${platformName} page`);

                        // Create icon with aria-hidden
                        const icon = document.createElement('i');
                        icon.className = platform.icon;
                        icon.setAttribute('aria-hidden', 'true');
                        link.appendChild(icon);

                        socialContainer.appendChild(link);
                    }
                });
            }
        }

        // Update contact info from config
        const site = window.configManager?.getConfig('site');
        if (site && site.contact) {
            // Update phone
            const phoneElements = document.querySelectorAll('footer .fa-phone').forEach(icon => {
                const span = icon.nextElementSibling;
                if (span) span.textContent = site.contact.phone;
            });

            // Update email
            const emailElements = document.querySelectorAll('footer .fa-envelope').forEach(icon => {
                const span = icon.nextElementSibling;
                if (span) span.textContent = site.contact.email.sales;
            });
        }
    }
}

// Initialize footer when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.footerComponent = new FooterComponent();
});

// Re-render footer when configs are loaded
window.addEventListener('configsLoaded', function() {
    if (window.footerComponent) {
        window.footerComponent.updateFromConfig();
    }
});