/**
 * Unified Product Card Component
 * A reusable component for displaying product cards consistently across all pages
 */

class ProductCard {
    /**
     * Create a product card element
     * @param {Object} product - Product data object
     * @param {Object} options - Display options
     * @returns {HTMLElement} Product card DOM element
     */
    static create(product, options = {}) {
        const defaults = {
            showSpecs: true,
            showFeatures: true,
            showLocations: true,
            showSupport: true,
            maxFeatures: 4,
            variant: 'default' // 'default', 'compact', 'detailed'
        };

        const settings = { ...defaults, ...options };

        const card = document.createElement('div');
        card.className = 'product-card card p-6 hover:scale-105 transition-all duration-300 flex flex-col relative h-full';

        // Add featured border if applicable
        if (product.featured) {
            card.classList.add('border-2', 'border-primary-500');
        }

        // Build card HTML
        card.innerHTML = this.buildCardHTML(product, settings);

        return card;
    }

    static buildCardHTML(product, settings) {
        const parts = [];

        // Badge (always at top-left corner for consistency)
        if (product.badge) {
            parts.push(this.buildBadge(product.badge, product.badgeColor));
        }

        // Card content wrapper (with padding to account for badge)
        parts.push('<div class="flex flex-col h-full">');

        // Title and description
        parts.push(this.buildHeader(product));

        // Price
        parts.push(this.buildPrice(product));

        // Locations
        if (settings.showLocations && product.locations) {
            parts.push(this.buildLocations(product.locations));
        }

        // Specifications
        if (settings.showSpecs && product.specifications) {
            parts.push(this.buildSpecifications(product.specifications));
        }

        // Features
        if (settings.showFeatures && product.features) {
            parts.push(this.buildFeatures(product.features, settings.maxFeatures));
        }

        // CTA Buttons
        parts.push(this.buildCTA(product, settings.showSupport));

        parts.push('</div>'); // Close content wrapper

        return parts.join('');
    }

    static buildBadge(badge, badgeColor) {
        // Determine badge styling
        let badgeClass = 'bg-primary-600 text-white';
        let iconClass = 'fas fa-star';

        // Badge color/icon logic
        if (badge === 'Most Popular' || badge === 'Best Value') {
            badgeClass = 'bg-primary-600 text-white';
            iconClass = 'fas fa-star';
        } else if (badge.includes('Save') || badge.includes('%')) {
            badgeClass = 'bg-green-700 text-white';
            iconClass = 'fas fa-tag';
        } else if (badge === 'Enterprise' || badge === 'Premium') {
            badgeClass = 'bg-amber-600 text-white';
            iconClass = 'fas fa-crown';
        } else if (badge === 'Custom' || badge === 'Custom Quote') {
            badgeClass = 'bg-purple-600 text-white';
            iconClass = 'fas fa-handshake';
        } else if (badge === 'New') {
            badgeClass = 'bg-blue-600 text-white';
            iconClass = 'fas fa-sparkles';
        }

        // Override with custom color if provided
        if (badgeColor) {
            const colorMap = {
                'primary': 'bg-blue-600 text-white',
                'green': 'bg-green-700 text-white',
                'purple': 'bg-purple-600 text-white',
                'amber': 'bg-amber-600 text-white',
                'red': 'bg-red-600 text-white'
            };
            badgeClass = colorMap[badgeColor] || badgeClass;
        }

        // Position at top-right corner of the card
        return `
            <div class="absolute top-4 right-4 z-10">
                <div class="${badgeClass} px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 text-xs font-semibold">
                    <i class="${iconClass} text-[10px]"></i>
                    <span>${badge}</span>
                </div>
            </div>
        `;
    }

    static buildHeader(product) {
        return `
            <div class="mb-4">
                <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">${product.name}</h3>
                ${product.description ?
                    `<p class="text-sm text-gray-600 dark:text-gray-400">${product.description}</p>` :
                    ''}
            </div>
        `;
    }

    static buildPrice(product) {
        if (product.price === null || product.price === undefined) {
            return `
                <div class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                    Contact for Quote
                </div>
            `;
        }

        const displayPrice = product.discountPrice || product.price;
        const billingCycle = product.billingCycle || 'mo';

        return `
            <div class="mb-4">
                ${product.discountPrice ?
                    `<span class="line-through text-gray-400 text-xl mr-2">$${product.price.toFixed(2)}</span>` :
                    ''}
                <span class="text-3xl font-bold text-primary-600 dark:text-primary-400">
                    $${displayPrice.toFixed(2)}
                </span>
                <span class="text-lg font-normal text-gray-600 dark:text-gray-400">/${billingCycle}</span>
            </div>
        `;
    }

    static buildLocations(locations) {
        if (!locations || locations.length === 0) return '';

        return `
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <i class="fas fa-map-marker-alt mr-1 text-primary-500"></i>
                ${locations.join(', ')}
            </div>
        `;
    }

    static buildSpecifications(specs) {
        const specIcons = {
            cpu: 'fas fa-microchip',
            cores: 'fas fa-tachometer-alt',
            ram: 'fas fa-memory',
            storage: 'fas fa-hdd',
            bandwidth: 'fas fa-network-wired',
            power: 'fas fa-bolt',
            ipv4: 'fas fa-globe',
            raid: 'fas fa-shield-alt'
        };

        const specItems = [];
        for (const [key, value] of Object.entries(specs)) {
            if (value) {
                const icon = specIcons[key] || 'fas fa-circle';
                const label = key.charAt(0).toUpperCase() + key.slice(1);
                specItems.push(`
                    <p class="text-sm text-gray-700 dark:text-gray-300">
                        <i class="${icon} mr-2 text-primary-500 w-4 text-center"></i>
                        ${value}
                    </p>
                `);
            }
        }

        if (specItems.length === 0) return '';

        return `
            <div class="space-y-1 mb-4">
                ${specItems.join('')}
            </div>
        `;
    }

    static buildFeatures(features, maxFeatures) {
        if (!features || features.length === 0) return '';

        const displayFeatures = features.slice(0, maxFeatures);
        const featureItems = displayFeatures.map(feature => `
            <li class="flex items-start">
                <i class="fas fa-check text-green-500 mr-2 mt-1 flex-shrink-0"></i>
                <span class="text-sm">${feature}</span>
            </li>
        `).join('');

        return `
            <ul class="space-y-1 mb-6 flex-grow text-gray-700 dark:text-gray-300">
                ${featureItems}
            </ul>
        `;
    }

    static buildCTA(product, showSupport) {
        const orderLink = product.ctaLink || '#';
        const orderText = product.ctaText || 'Order Now';

        return `
            <div class="space-y-3 mt-auto">
                <a href="${orderLink}"
                   ${orderLink.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}
                   class="btn btn-primary w-full flex items-center justify-center gap-2">
                    <i class="fas fa-shopping-cart"></i>
                    ${orderText}
                </a>
                ${showSupport ? `
                    <a href="/contact" class="btn btn-outline w-full flex items-center justify-center gap-2">
                        <i class="fas fa-headset"></i>
                        Get Support
                    </a>
                ` : ''}
            </div>
        `;
    }

    /**
     * Create a compact product card (for grid displays)
     */
    static createCompact(product) {
        return this.create(product, {
            showSpecs: true,
            showFeatures: true,
            showLocations: false,
            showSupport: false,
            maxFeatures: 3,
            variant: 'compact'
        });
    }

    /**
     * Create a detailed product card (for featured products)
     */
    static createDetailed(product) {
        return this.create(product, {
            showSpecs: true,
            showFeatures: true,
            showLocations: true,
            showSupport: true,
            maxFeatures: 6,
            variant: 'detailed'
        });
    }

    /**
     * Create multiple product cards and append to container
     */
    static renderProducts(products, containerId, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container with ID '${containerId}' not found`);
            return;
        }

        // Clear existing content
        container.innerHTML = '';

        if (!products || products.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <p class="text-gray-600 dark:text-gray-400">No products available at this time.</p>
                </div>
            `;
            return;
        }

        // Create and append product cards
        products.forEach(product => {
            try {
                const card = this.create(product, options);
                container.appendChild(card);
            } catch (error) {
                console.error('Error creating product card:', error, product);
            }
        });
    }
}

// Export for use in other scripts
window.ProductCard = ProductCard;