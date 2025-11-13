/**
 * Configuration Loader
 * Loads and manages all site configuration from JSON files
 * Now with simplified structure and template variable replacement
 */

class ConfigLoader {
    constructor() {
        this.global = {};
        this.pages = {};
        this.products = {};
        this.testimonials = [];
        this.loaded = false;
        this.version = null; // Will be set from global.json
    }

    /**
     * Replace template variables in a string
     * E.g., "{{network.bandwidth}}" becomes "100Gbps"
     */
    replaceVariables(text, context = {}) {
        if (typeof text !== 'string') return text;

        return text.replace(/\{\{([^}]+)\}\}/g, (match, path) => {
            let trimmedPath = path.trim();

            // Use context if provided, otherwise use global
            // Context already contains global when passed from processTemplates
            const data = Object.keys(context).length > 0 ? context : this.global;

            // Handle common shortcuts - map them to their full paths
            const pathMappings = {
                'support.availability': 'features.support.availability',
                'support.responseTime': 'features.support.responseTime',
                'support.channels': 'features.support.channels',
                'billing.cycles': 'features.billing.cycles',
                'billing.setupFees': 'features.billing.setupFees',
                'billing.contractRequired': 'features.billing.contractRequired',
                'billing.paymentMethods': 'features.billing.paymentMethods',
                'guarantees.networkUptime': 'features.guarantees.networkUptime',
                'guarantees.powerUptime': 'features.guarantees.powerUptime',
                'guarantees.hardwareUptime': 'features.guarantees.hardwareUptime'
            };

            // Apply path mapping if exists
            if (pathMappings[trimmedPath]) {
                trimmedPath = pathMappings[trimmedPath];
            }

            // General path resolution
            const keys = trimmedPath.split('.');
            let value = data;

            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];

                // Handle array notation like management[0]
                const arrayMatch = key.match(/^(.+)\[(\d+)\]$/);
                if (arrayMatch) {
                    const [, arrayName, index] = arrayMatch;
                    value = value[arrayName];
                    if (Array.isArray(value)) {
                        value = value[parseInt(index)];
                    }
                } else if ((key === 'length' || key === 'count') && Array.isArray(value)) {
                    // Handle .length and .count properties for arrays
                    value = value.length;
                } else {
                    value = value ? value[key] : undefined;
                }

                if (value === undefined || value === null) {
                    console.warn(`Template variable not found: ${path}`);
                    return match;
                }
            }

            return value;
        });
    }

    /**
     * Process an object/array recursively to replace all template variables
     */
    processTemplates(obj, context = {}) {
        if (typeof obj === 'string') {
            return this.replaceVariables(obj, context);
        }

        if (Array.isArray(obj)) {
            return obj.map(item => this.processTemplates(item, context));
        }

        if (typeof obj === 'object' && obj !== null) {
            const processed = {};
            for (const [key, value] of Object.entries(obj)) {
                processed[key] = this.processTemplates(value, context);
            }
            return processed;
        }

        return obj;
    }

    /**
     * Determine the current page name from URL
     */
    getCurrentPageName() {
        const path = window.location.pathname;
        const filename = path.split('/').pop().replace('.html', '');

        // Map common filenames to page names
        const pageMappings = {
            '': 'home',
            'index': 'home',
            'dedicated-servers': 'dedicated-servers',
            'vps': 'vps',
            'colocation': 'colocation',
            'network': 'network',
            'about': 'about',
            'contact': 'contact'
        };

        return pageMappings[filename] || filename;
    }

    async loadConfig(path, optional = false) {
        try {
            // Use version for cache busting if available, otherwise check window.SITE_VERSION, then fallback to timestamp
            const version = this.version || window.SITE_VERSION || null;
            const cacheBuster = version ? `v=${version}` : `t=${Date.now()}`;
            const response = await fetch(path + '?' + cacheBuster);
            if (!response.ok) {
                if (optional && response.status === 404) {
                    // Silently ignore missing optional configs
                    return null;
                }
                throw new Error(`Failed to load ${path}`);
            }
            return await response.json();
        } catch (error) {
            if (!optional) {
                console.error(`Error loading ${path}:`, error);
            }
            return null;
        }
    }

    async loadAllConfigs() {
        // Load global config first (always needed) - use timestamp for initial load only
        const response = await fetch('/config/global.json?v=1.0.1');
        this.global = await response.json() || {};

        // Extract version from global config for subsequent cache busting
        if (this.global.version) {
            this.version = this.global.version;
            console.log('Using config version:', this.version);
        }

        // Determine current page from URL
        const currentPage = this.getCurrentPageName();
        console.log('Current page detected as:', currentPage);

        // Load only the current page config (only for pages that have configs)
        const pagesWithConfigs = ['home', 'dedicated-servers', 'vps', 'colocation', 'network', 'about', 'contact', 'testimonials'];
        if (currentPage && pagesWithConfigs.includes(currentPage)) {
            const pageConfig = await this.loadConfig(`/config/pages/${currentPage}.json`);
            if (pageConfig) {
                // Process templates in page config, passing global config as context
                this.pages[currentPage] = this.processTemplates(pageConfig, this.global);
            }
        }

        // Load products only on pages that need them
        const pagesNeedingProducts = ['home', 'dedicated-servers', 'vps', 'colocation'];
        if (pagesNeedingProducts.includes(currentPage)) {
            const productsConfig = await this.loadConfig('/config/products.json') || {};
            this.products = this.processTemplates(productsConfig, this.global);
            console.log('Loaded products config:', this.products);
        }

        // Load testimonials only on pages that need them
        const pagesNeedingTestimonials = ['home', 'about', 'testimonials'];
        if (pagesNeedingTestimonials.includes(currentPage)) {
            const testimonialsConfig = await this.loadConfig('/config/testimonials.json') || {};
            const processedTestimonials = this.processTemplates(testimonialsConfig, this.global);
            this.testimonials = processedTestimonials.testimonials || [];
            console.log('Loaded testimonials:', this.testimonials.length, 'items');
        }

        this.loaded = true;
        return {
            global: this.global,
            currentPage: currentPage,
            pageConfig: this.pages[currentPage] || null,
            products: this.products,
            testimonials: this.testimonials
        };
    }

    /**
     * Get a value from configuration
     * @param {string} type - 'global', 'page', 'products'
     * @param {string} path - Dot notation path (e.g., 'network.bandwidth')
     */
    get(type, path = '') {
        if (!this.loaded) {
            console.warn('Configs not loaded yet');
            return null;
        }

        let value;

        switch(type) {
            case 'global':
                value = this.global;
                break;
            case 'page':
            case 'pages':
                value = this.pages;
                break;
            case 'products':
                value = this.products;
                break;
            case 'testimonials':
                return this.testimonials;
            default:
                console.warn(`Unknown config type: ${type}`);
                return null;
        }

        // If path is provided, navigate to nested property
        if (path) {
            const parts = path.split('.');
            for (const part of parts) {
                value = value[part];
                if (value === undefined) return null;
            }
        }

        return value;
    }

    /**
     * Get page configuration for current page
     */
    getCurrentPageConfig() {
        const pageName = this.getCurrentPageName();
        return this.pages[pageName] || {};
    }

    /**
     * Get the current config version for cache busting
     */
    getVersion() {
        return this.version || '1.0.0';
    }

    // Render homepage hero section from config
    renderHero() {
        const pageConfig = this.getCurrentPageConfig();
        const hero = pageConfig.hero;
        if (!hero) return '';

        return `
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                ${hero.headline || hero.title || ''}
                <span class="block text-2xl sm:text-3xl lg:text-4xl text-blue-400 mt-4">Starting at $49/mo</span>
            </h1>
            <p class="text-lg sm:text-xl text-gray-200 mb-10 max-w-3xl mx-auto">
                ${hero.description || hero.subheadline || hero.subtitle || ''}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                ${hero.primaryCTA ? `
                    <a href="${hero.primaryCTA.link}" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
                        ${hero.primaryCTA.icon ? `<i class="${hero.primaryCTA.icon} mr-2"></i>` : ''}
                        ${hero.primaryCTA.text}
                    </a>
                ` : ''}
                ${hero.secondaryCTA ? `
                    <a href="${hero.secondaryCTA.link}" class="inline-block border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
                        ${hero.secondaryCTA.icon ? `<i class="${hero.secondaryCTA.icon} mr-2"></i>` : ''}
                        ${hero.secondaryCTA.text}
                    </a>
                ` : ''}
            </div>

            <!-- Feature badges -->
            ${hero.bullets ? `
                <div class="flex flex-wrap justify-center gap-4 sm:gap-6">
                    ${hero.bullets.map((bullet, index) => {
                        // Choose icon based on content
                        let icon = 'fa-check';
                        if (bullet.toLowerCase().includes('bandwidth') || bullet.toLowerCase().includes('gbps')) {
                            icon = 'fa-tachometer-alt';
                        } else if (bullet.toLowerCase().includes('uptime') || bullet.toLowerCase().includes('sla')) {
                            icon = 'fa-shield-alt';
                        } else if (bullet.toLowerCase().includes('support')) {
                            icon = 'fa-headset';
                        } else if (bullet.toLowerCase().includes('data center') || bullet.toLowerCase().includes('hardware')) {
                            icon = 'fa-server';
                        }

                        return `
                            <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                                <i class="fas ${icon} text-blue-400"></i>
                                <span class="text-white font-medium">${bullet}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            ` : ''}
        `;
    }

    // Get company info
    getCompanyInfo() {
        return this.global.company || {};
    }

    // Get contact info
    getContactInfo() {
        return this.global.contact || {};
    }

    // Get network features
    getNetworkFeatures() {
        return this.global.network || {};
    }

    // Update page meta tags from config
    updateMetaTags(pageName = null) {
        const pageConfig = pageName ? this.pages[pageName.toLowerCase().replace(' ', '-')] : this.getCurrentPageConfig();

        if (!pageConfig || !pageConfig.meta) return;

        const meta = pageConfig.meta;

        // Update title
        const titleTag = document.querySelector('title');
        if (titleTag && meta.title) {
            titleTag.textContent = meta.title;
        }

        // Update description
        let descTag = document.querySelector('meta[name="description"]');
        if (!descTag) {
            descTag = document.createElement('meta');
            descTag.name = 'description';
            document.head.appendChild(descTag);
        }
        if (meta.description) {
            descTag.content = meta.description;
        }

        // Update keywords
        let keywordsTag = document.querySelector('meta[name="keywords"]');
        if (!keywordsTag) {
            keywordsTag = document.createElement('meta');
            keywordsTag.name = 'keywords';
            document.head.appendChild(keywordsTag);
        }
        if (meta.keywords) {
            keywordsTag.content = meta.keywords;
        }
    }
}

// Create global config loader instance
window.configLoader = new ConfigLoader();

// Load configs on page load
document.addEventListener('DOMContentLoaded', async () => {
    await window.configLoader.loadAllConfigs();

    // Fire custom event when configs are loaded
    window.dispatchEvent(new CustomEvent('configsLoaded', {
        detail: {
            global: window.configLoader.global,
            pages: window.configLoader.pages,
            products: window.configLoader.products
        }
    }));
});