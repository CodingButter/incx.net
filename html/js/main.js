// ================================
// Main JavaScript for INCX.net
// ================================

document.addEventListener('DOMContentLoaded', function() {

    // ================================
    // Dark Mode Toggle with OS Preference Support
    // ================================
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    let currentTheme;

    if (savedTheme) {
        // User has manually set a preference
        currentTheme = savedTheme;
    } else {
        // Check OS preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        currentTheme = prefersDark ? 'dark' : 'light';
    }

    // Apply the theme
    if (currentTheme === 'dark') {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    // Listen for OS theme changes if no manual preference is set
    if (!savedTheme) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // Only update if user hasn't manually set a preference
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    html.classList.add('dark');
                } else {
                    html.classList.remove('dark');
                }
            }
        });
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            if (html.classList.contains('dark')) {
                html.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            } else {
                html.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // ================================
    // Mobile Navigation Toggle
    // ================================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking on a link
        const navLinks = mobileMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // ================================
    // Smooth Scrolling
    // ================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ================================
    // Sticky Navigation Enhancement
    // ================================
    const navbar = document.querySelector('nav');  // Changed from '.navbar' to 'nav'

    if (navbar) {
        let lastScrollTop = 0;

        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > 100) {
                navbar.classList.add('scrolled');

            // Hide/show navbar on scroll
            if (scrollTop > lastScrollTop && scrollTop > 300) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });
    }

    // ================================
    // Intersection Observer for Animations
    // ================================
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .server-card, .network-feature, .feature');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    entry.target.style.animationDelay = `${Math.random() * 0.2}s`;
                }
            });
        }, {
            threshold: 0.1
        });

        elements.forEach(element => {
            observer.observe(element);
        });
    };

    animateOnScroll();

    // ================================
    // Price Calculator (for dedicated servers)
    // ================================
    const serverCards = document.querySelectorAll('.server-card');

    serverCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add hover effect with slight delay to other cards
            serverCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.style.opacity = '0.7';
                    otherCard.style.transform = 'scale(0.98)';
                }
            });
        });

        card.addEventListener('mouseleave', function() {
            serverCards.forEach(otherCard => {
                otherCard.style.opacity = '';
                otherCard.style.transform = '';
            });
        });
    });

    // ================================
    // Dynamic Year in Footer
    // ================================
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });

    // ================================
    // Loading State for Buttons
    // ================================
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-service');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();

                // Add loading state
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                this.classList.add('loading');
                this.disabled = true;

                // Simulate loading (remove in production)
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.classList.remove('loading');
                    this.disabled = false;

                    // Show demo message
                    showNotification('This is a demo. In production, this would navigate to the appropriate page.');
                }, 2000);
            }
        });
    });

    // ================================
    // Notification System
    // ================================
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-info-circle"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            background: type === 'success' ? '#00d4aa' : '#0066ff',
            color: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            zIndex: '10000',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            minWidth: '300px',
            animation: 'slideIn 0.3s ease'
        });

        document.body.appendChild(notification);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.marginLeft = 'auto';
        closeBtn.style.background = 'none';
        closeBtn.style.border = 'none';
        closeBtn.style.color = 'white';
        closeBtn.style.fontSize = '20px';
        closeBtn.style.cursor = 'pointer';

        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // ================================
    // Network Status Check (Demo)
    // ================================
    function checkNetworkStatus() {
        const statusIndicators = document.querySelectorAll('.network-status');
        statusIndicators.forEach(indicator => {
            // Simulate random network status
            const status = Math.random() > 0.1 ? 'online' : 'maintenance';
            indicator.className = `network-status status-${status}`;
            indicator.textContent = status === 'online' ? 'Operational' : 'Maintenance';
        });
    }

    // Check network status every 30 seconds (demo)
    setInterval(checkNetworkStatus, 30000);

    // ================================
    // Parallax Effect for Hero Section
    // ================================
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }

    // ================================
    // Form Validation (skip for actual login/auth forms)
    // ================================
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        // Check if this is a login/authentication form that should submit normally
        const formAction = form.getAttribute('action');
        const formId = form.getAttribute('id');

        // Skip demo handling for actual login forms
        if (formAction && (
            formAction.includes('clients.incx.net') ||
            formAction.includes('/login') ||
            formAction.includes('/auth') ||
            formAction.includes('dologin') ||
            formAction.includes('password/reset')
        )) {
            // Let these forms submit normally to their actual endpoints
            return;
        }

        // Also skip if form has specific IDs indicating it's a real form
        if (formId && (formId === 'loginForm' || formId === 'login-form')) {
            return;
        }

        // Only apply demo handling to contact/demo forms
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    field.addEventListener('input', function() {
                        this.classList.remove('error');
                    });
                }
            });

            if (isValid) {
                showNotification('Form submitted successfully! (Demo)', 'success');
                form.reset();
            } else {
                showNotification('Please fill in all required fields', 'error');
            }
        });
    });

    // ================================
    // Copy to Clipboard for Server IPs (if needed)
    // ================================
    const copyButtons = document.querySelectorAll('.copy-ip');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const ip = this.dataset.ip;
            navigator.clipboard.writeText(ip).then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            });
        });
    });

});

// ================================
// Add CSS for animations dynamically
// ================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .navbar {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .navbar.scrolled {
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .animated {
        animation: fadeIn 0.6s ease-out forwards;
    }

    .error {
        border-color: #ff3333 !important;
    }

    .loading {
        pointer-events: none;
        opacity: 0.7;
    }
`;
document.head.appendChild(style);

// ================================
// Configuration Management System
// ================================
class ConfigManager {
    constructor() {
        this.configs = {};
        // Disabled - now using new config-loader.js system
        // this.loadAllConfigs();
    }

    async loadAllConfigs() {
        // Disabled - now using new config-loader.js system
        // The new config loader will handle all configuration loading
        return;
    }

    init() {
        // Update site-wide elements with config data
        this.updateSiteElements();
        this.updateSocialLinks();
        this.updateFooter();
    }

    updateSiteElements() {
        const site = this.configs.site;
        const content = this.configs.content;

        if (!site || !content) return;

        // Update hero section if on homepage
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle && content.hero) {
            const titleParts = heroTitle.innerHTML.split('<span');
            if (titleParts[0]) {
                heroTitle.innerHTML = content.hero.title +
                    `<span class="block text-2xl sm:text-3xl lg:text-4xl text-blue-400 mt-4">${content.hero.subtitle}</span>`;
            }
        }

        const heroDescription = document.querySelector('.hero p.text-lg');
        if (heroDescription && content.hero) {
            heroDescription.textContent = content.hero.description;
        }

        // Update company phone numbers
        document.querySelectorAll('a[href^="tel:"]').forEach(link => {
            if (site.contact && site.contact.phone) {
                link.href = `tel:${site.contact.phone.replace(/[^0-9]/g, '')}`;
                if (link.textContent.includes('(')) {
                    link.textContent = site.contact.phone;
                }
            }
        });
    }

    updateSocialLinks() {
        const socials = this.configs.socials;
        if (!socials || !socials.enabled) {
            // Hide all social links if disabled
            document.querySelectorAll('.social-links, [class*="fa-facebook"], [class*="fa-twitter"], [class*="fa-linkedin"], [class*="fa-github"]')
                .forEach(el => {
                    const parent = el.closest('a');
                    if (parent && parent.href.includes('facebook.com') ||
                        parent && parent.href.includes('twitter.com') ||
                        parent && parent.href.includes('linkedin.com') ||
                        parent && parent.href.includes('github.com')) {
                        parent.style.display = 'none';
                    }
                });
            return;
        }

        // Update social links in footer
        const socialContainers = document.querySelectorAll('footer .flex.justify-center.gap-4');
        socialContainers.forEach(container => {
            container.innerHTML = '';
            socials.platforms.forEach(platform => {
                if (platform.enabled && platform.url) {
                    const link = document.createElement('a');
                    link.href = platform.url;
                    link.className = 'bg-gray-800 hover:bg-primary-600 transition-colors p-3 rounded-lg';
                    if (socials.display.openInNewTab) {
                        link.target = '_blank';
                        link.rel = 'noopener noreferrer';
                    }
                    link.innerHTML = `<i class="${platform.icon} text-white"></i>`;
                    container.appendChild(link);
                }
            });
        });
    }

    updateFooter() {
        const site = this.configs.site;
        const content = this.configs.content;

        if (!site || !content) return;

        // Update copyright
        const copyrightElements = document.querySelectorAll('footer p:first-child');
        copyrightElements.forEach(el => {
            if (el.textContent.includes('©')) {
                el.textContent = content.footer.copyright;
            }
        });

        // Update powered by badge
        const poweredByElements = document.querySelectorAll('.text-center.text-sm.text-gray-500');
        poweredByElements.forEach(el => {
            if (el.textContent.includes('Powered by')) {
                el.innerHTML = `${site.branding.poweredBy.text} <a href="${site.branding.poweredBy.url}" target="_blank" rel="noopener noreferrer" class="text-primary-400 hover:text-primary-300 transition-colors">${site.branding.poweredBy.company}</a>`;
            }
        });
    }

    getConfig(name) {
        return this.configs[name];
    }
}

// ================================
// Product Management System
// ================================
class ProductManager {
    constructor() {
        this.products = null;
        this.loadProducts();
    }

    async loadProducts() {
        // Now handled by config-loader.js
        return;
    }

    init() {
        // Only render products on homepage
        // Product pages use products.js instead
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        if (currentPage === 'index.html' || currentPage === '') {
            this.renderHomePageProducts();
        }
    }

    renderHomePageProducts() {
        // Render featured products on homepage
        const servicesSection = document.getElementById('services-grid');
        if (!servicesSection) return;

        servicesSection.innerHTML = '';

        // Get one featured product from each category for homepage
        Object.keys(this.products.categories).forEach(categoryKey => {
            const category = this.products.categories[categoryKey];
            const featuredProduct = category.products.find(p => p.featured) || category.products[0];

            if (featuredProduct) {
                const card = this.createHomeProductCard(categoryKey, category, featuredProduct);
                servicesSection.innerHTML += card;
            }
        });
    }

    createHomeProductCard(categoryKey, category, product) {
        const price = this.formatPrice(product);
        const features = product.features.slice(0, 4).map(f =>
            `<li class="flex items-start gap-2">
                <i class="fas fa-check text-green-500 mt-1"></i>
                <span class="text-gray-700 dark:text-gray-300">${f}</span>
            </li>`
        ).join('');

        return `
            <div class="card p-8 hover:scale-105 transform transition-all duration-300 flex flex-col">
                <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-6">
                    <i class="${category.icon} text-white text-2xl"></i>
                </div>
                <h3 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">${category.name}</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-6">${category.description}</p>
                <ul class="space-y-3 mb-8 flex-grow">
                    ${features}
                </ul>
                <div class="mt-auto">
                    <div class="mb-6">
                        <span class="text-gray-500 dark:text-gray-400">From</span>
                        <div class="flex items-baseline gap-1">
                            ${price}
                        </div>
                    </div>
                    <a href="/${categoryKey}" class="btn btn-primary w-full">View Options</a>
                </div>
            </div>
        `;
    }

    renderCategoryProducts(categoryKey) {
        const container = document.getElementById('products-container');
        if (!container) return;

        const category = this.products.categories[categoryKey];
        if (!category) return;

        // Use the unified ProductCard component if available
        if (window.ProductCard) {
            window.ProductCard.renderProducts(category.products, 'products-container', {
                showSpecs: true,
                showFeatures: true,
                showLocations: true,
                showSupport: true,
                maxFeatures: 4
            });
        } else {
            // Fallback to old method
            container.innerHTML = '';
            category.products.forEach(product => {
                const card = this.createDetailedProductCard(product);
                container.innerHTML += card;
            });
        }
    }

    createDetailedProductCard(product) {
        const price = this.formatPrice(product);
        // Fixed badge colors for better visibility
        const badgeColors = {
            'primary': 'bg-blue-600 text-white',
            'green': 'bg-green-700 text-white',
            'purple': 'bg-purple-600 text-white',
            'red': 'bg-red-600 text-white'
        };
        const badgeClass = badgeColors[product.badgeColor] || badgeColors['primary'];
        const badge = product.badge ? `<span class="absolute top-4 right-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${badgeClass} shadow-lg">${product.badge}</span>` : '';

        const specs = Object.entries(product.specifications).map(([key, value]) =>
            `<div class="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <span class="text-gray-600 dark:text-gray-400 text-sm">${this.formatSpecKey(key)}</span>
                <span class="text-gray-900 dark:text-white font-medium text-sm">${value}</span>
            </div>`
        ).join('');

        const features = product.features.map(f =>
            `<li class="flex items-start gap-2">
                <i class="fas fa-check-circle text-green-500 flex-shrink-0 mt-0.5"></i>
                <span class="text-sm">${f}</span>
            </li>`
        ).join('');

        const locations = product.locations ?
            `<div class="mb-6">
                <span class="text-sm text-gray-600 dark:text-gray-400 font-medium">Available Locations:</span>
                <div class="flex flex-wrap gap-2 mt-2">
                    ${product.locations.map(loc => `<span class="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">${loc}</span>`).join('')}
                </div>
            </div>` : '';

        return `
            <div class="card p-6 ${product.featured ? 'border-2 border-primary-500' : ''} relative flex flex-col h-full">
                ${badge}
                <div class="flex-grow">
                    <h3 class="text-2xl font-bold mb-2 text-gray-900 dark:text-white ${product.badge ? 'pr-24' : ''}">${product.name}</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-6">${product.description}</p>

                    <div class="mb-6">
                        <h4 class="font-semibold mb-3 text-gray-900 dark:text-white">Specifications</h4>
                        <div class="space-y-1">
                            ${specs}
                        </div>
                    </div>

                    <div class="mb-6">
                        <h4 class="font-semibold mb-3 text-gray-900 dark:text-white">Features</h4>
                        <ul class="space-y-2 text-gray-700 dark:text-gray-300">
                            ${features}
                        </ul>
                    </div>

                    ${locations}
                </div>

                <div class="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div class="flex justify-between items-end mb-4">
                        <div>
                            <span class="text-gray-500 dark:text-gray-400 text-sm block">Price</span>
                            <div class="flex items-baseline gap-1">
                                ${price}
                            </div>
                        </div>
                        ${product.setupTime ? `
                            <div class="text-right">
                                <span class="text-gray-500 dark:text-gray-400 text-sm block">Setup</span>
                                <div class="text-gray-900 dark:text-white font-medium">${product.setupTime}</div>
                            </div>
                        ` : ''}
                    </div>
                    <a href="${product.ctaLink}" class="btn btn-primary w-full text-center block">${product.ctaText}</a>
                </div>
            </div>
        `;
    }

    formatPrice(product) {
        if (!product.price) {
            return '<span class="text-2xl font-bold text-gray-900 dark:text-white">Contact Sales</span>';
        }

        const settings = this.products.settings;
        const symbol = settings.currencySymbol;

        if (product.discountPrice && settings.showDiscounts) {
            return `
                <span class="text-gray-500 line-through">${symbol}${product.price}</span>
                <span class="text-3xl font-bold text-gray-900 dark:text-white">${symbol}${product.discountPrice}</span>
                <span class="text-gray-500 dark:text-gray-400">/${product.billingCycle}</span>
            `;
        }

        return `
            <span class="text-3xl font-bold text-gray-900 dark:text-white">${symbol}${product.price}</span>
            <span class="text-gray-500 dark:text-gray-400">/${product.billingCycle}</span>
        `;
    }

    formatSpecKey(key) {
        const labels = {
            cpu: 'CPU',
            cores: 'Cores',
            ram: 'RAM',
            storage: 'Storage',
            bandwidth: 'Bandwidth',
            ipv4: 'IPv4',
            ipv6: 'IPv6',
            space: 'Rack Space',
            power: 'Power',
            port: 'Port Speed',
            uplink: 'Uplink'
        };
        return labels[key] || key.charAt(0).toUpperCase() + key.slice(1);
    }
}

// ================================
// Testimonials Management System
// ================================
class TestimonialsManager {
    constructor() {
        this.testimonials = [];
        this.waitForConfig();
    }

    async waitForConfig() {
        // Wait for configs to be loaded
        window.addEventListener('configsLoaded', (event) => {
            const config = window.configLoader;
            console.log('TestimonialsManager received config event, testimonials:', config?.testimonials?.length);
            if (config && config.testimonials) {
                this.testimonials = config.testimonials;
                this.init();
            }
        });
    }

    init() {
        // Check if we're on homepage or testimonials page
        const testimonialsSection = document.getElementById('testimonials-section');
        const testimonialsGrid = document.getElementById('testimonials-grid');

        console.log('TestimonialsManager init - section:', !!testimonialsSection, 'grid:', !!testimonialsGrid);

        if (testimonialsSection) {
            this.renderHomepageTestimonials();
        }

        if (testimonialsGrid) {
            this.renderAllTestimonials();
        }
    }

    renderHomepageTestimonials() {
        const container = document.getElementById('testimonials-carousel');
        if (!container) {
            console.log('No testimonials-carousel element found');
            return;
        }

        // Get only featured testimonials for homepage
        const featured = this.testimonials.filter(t => t.featured).slice(0, 3);
        console.log('Rendering featured testimonials:', featured.length);

        container.innerHTML = featured.map(testimonial =>
            this.createTestimonialCard(testimonial)
        ).join('');
    }

    renderAllTestimonials() {
        const container = document.getElementById('testimonials-grid');
        if (!container) {
            console.log('No testimonials-grid element found');
            return;
        }

        console.log('Rendering all testimonials:', this.testimonials.length);
        container.innerHTML = this.testimonials.map(testimonial =>
            this.createDetailedTestimonialCard(testimonial)
        ).join('');
    }

    createTestimonialCard(testimonial) {
        const stars = this.createStarRating(testimonial.rating);

        return `
            <div class="card p-6 h-full flex flex-col">
                <div class="flex items-start justify-between mb-4">
                    <div class="flex gap-1">${stars}</div>
                    ${testimonial.verified ? '<span class="inline-flex items-center gap-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0"><i class="fas fa-check-circle flex-shrink-0"></i><span class="flex-shrink-0">Verified</span></span>' : ''}
                </div>
                <blockquote class="flex-grow">
                    <p class="text-gray-700 dark:text-gray-300 mb-4 italic">"${testimonial.content}"</p>
                </blockquote>
                <div class="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div class="flex items-center gap-3">
                        <div class="testimonial-avatar shrink-0 w-10 h-10 aspect-square bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white font-semibold" style="min-width: 40px; max-width: 40px; min-height: 40px; max-height: 40px;">
                            ${testimonial.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div class="min-w-0">
                            <p class="font-semibold text-gray-900 dark:text-white truncate">${testimonial.name}</p>
                            <p class="text-sm text-gray-600 dark:text-gray-400 truncate">${testimonial.company} • ${testimonial.service}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createDetailedTestimonialCard(testimonial) {
        const stars = this.createStarRating(testimonial.rating);
        const date = new Date(testimonial.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        return `
            <div class="card p-6 h-full flex flex-col">
                <div class="mb-4">
                    <div class="flex items-start justify-between mb-2">
                        <h3 class="font-bold text-lg text-gray-900 dark:text-white">${testimonial.title}</h3>
                        ${testimonial.verified ? '<span class="verified-badge inline-flex items-center gap-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0"><i class="fas fa-check-circle flex-shrink-0"></i><span class="flex-shrink-0">Verified</span></span>' : ''}
                    </div>
                    <div class="flex items-center gap-2 mb-3">
                        <div class="flex gap-1">${stars}</div>
                        <span class="text-sm text-gray-600 dark:text-gray-400">${date}</span>
                    </div>
                </div>

                <blockquote class="flex-grow mb-4">
                    <p class="text-gray-700 dark:text-gray-300">${testimonial.content}</p>
                </blockquote>

                ${testimonial.highlights ? `
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${testimonial.highlights.map(h => `<span class="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded">${h}</span>`).join('')}
                    </div>
                ` : ''}

                <div class="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="testimonial-avatar shrink-0 w-10 h-10 aspect-square bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white font-semibold text-sm" style="min-width: 40px; max-width: 40px; min-height: 40px; max-height: 40px;">
                                ${testimonial.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div class="min-w-0">
                                <p class="font-semibold text-gray-900 dark:text-white truncate">${testimonial.name}</p>
                                <p class="text-sm text-gray-600 dark:text-gray-400 truncate">${testimonial.position} • ${testimonial.company}</p>
                            </div>
                        </div>
                        <span class="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">${testimonial.service}</span>
                    </div>
                </div>
            </div>
        `;
    }

    createStarRating(rating) {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push('<i class="fas fa-star text-yellow-500"></i>');
            } else {
                stars.push('<i class="far fa-star text-gray-300 dark:text-gray-600"></i>');
            }
        }
        return stars.join('');
    }
}

// Initialize Managers when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Disabled - now using config-loader.js
    // window.configManager = new ConfigManager();
    // window.productManager = new ProductManager();
    window.testimonialsManager = new TestimonialsManager();
});

console.log('INCX.net website initialized successfully!');