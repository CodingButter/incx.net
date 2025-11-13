// Product Page Dynamic Content Loader
class ProductPageManager {
    constructor(productType) {
        this.productType = productType;
        this.init();
    }

    async init() {
        try {
            const timestamp = Date.now(); // Cache busting timestamp
            const response = await fetch(`/config/products.json?t=${timestamp}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Filter products based on type
            let products = [];
            let category = null;

            if (this.productType === 'dedicated') {
                category = data.categories['dedicated-servers'];
            } else if (this.productType === 'vps') {
                category = data.categories['vps'];
            } else if (this.productType === 'colocation') {
                category = data.categories['colocation'];
            }

            if (category && category.products) {
                products = category.products;
            }

            this.displayProducts(products);
        } catch (error) {
            console.error('Failed to load products:', error);
            // Show error message in the container
            const container = document.getElementById('products-container');
            if (container) {
                container.innerHTML = `
                    <div class="col-span-full text-center py-12">
                        <p class="text-red-600 dark:text-red-400">Error loading products. Please try refreshing the page.</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">${error.message}</p>
                    </div>
                `;
            }
        }
    }

    displayProducts(products) {
        const container = document.getElementById('products-container');

        if (!container) {
            return;
        }

        // Use the unified ProductCard component if available
        if (window.ProductCard) {
            window.ProductCard.renderProducts(products, 'products-container', {
                showSpecs: true,
                showFeatures: true,
                showLocations: true,
                showSupport: true,
                maxFeatures: 4
            });
        } else {
            // Fallback to old method if ProductCard not loaded
            container.innerHTML = '';

            if (!products || products.length === 0) {
                container.innerHTML = `
                    <div class="col-span-full text-center py-12">
                        <p class="text-gray-600 dark:text-gray-400">No products available at this time.</p>
                    </div>
                `;
                return;
            }

            products.forEach((product) => {
                try {
                    const productCard = this.createProductCard(product);
                    container.appendChild(productCard);
                } catch (error) {
                    console.error('Error creating product card for', product.name, ':', error);
                }
            });
        }
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'card p-6 hover:scale-105 transition-all duration-300 flex flex-col relative';

        // Badge HTML - positioned absolutely at top right
        let badgeHtml = '';
        if (product.badge) {
            let badgeClass = 'bg-primary-600 text-white';
            let iconClass = 'fas fa-star';

            if (product.badge === 'Most Popular' || product.badge === 'Best Value') {
                badgeClass = 'bg-primary-600 text-white';
                iconClass = 'fas fa-star';
            } else if (product.badge.includes('Save')) {
                badgeClass = 'bg-green-700 text-white';
                iconClass = 'fas fa-tag';
            } else if (product.badge === 'Enterprise') {
                badgeClass = 'bg-amber-600 text-white';
                iconClass = 'fas fa-crown';
            } else if (product.badge === 'Custom Quote') {
                badgeClass = 'bg-purple-600 text-white';
                iconClass = 'fas fa-handshake';
            }

            badgeHtml = `
                <div class="absolute top-4 right-4 z-10">
                    <div class="${badgeClass} px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 text-xs font-semibold">
                        <i class="${iconClass} text-[10px]"></i>
                        <span>${product.badge}</span>
                    </div>
                </div>
            `;
        }

        // Specifications HTML (for dedicated servers and VPS)
        let specificationsHtml = '';
        if (product.specifications) {
            const specs = product.specifications;
            specificationsHtml = `
                <div class="space-y-1 mb-4">
                    ${specs.cpu ? `<p class="text-sm text-gray-700 dark:text-gray-300"><i class="fas fa-microchip mr-2 text-primary-500"></i>${specs.cpu}</p>` : ''}
                    ${specs.cores ? `<p class="text-sm text-gray-700 dark:text-gray-300"><i class="fas fa-tachometer-alt mr-2 text-primary-500"></i>${specs.cores}</p>` : ''}
                    ${specs.ram ? `<p class="text-sm text-gray-700 dark:text-gray-300"><i class="fas fa-memory mr-2 text-primary-500"></i>${specs.ram}</p>` : ''}
                    ${specs.storage ? `<p class="text-sm text-gray-700 dark:text-gray-300"><i class="fas fa-hdd mr-2 text-primary-500"></i>${specs.storage}</p>` : ''}
                    ${specs.bandwidth ? `<p class="text-sm text-gray-700 dark:text-gray-300"><i class="fas fa-network-wired mr-2 text-primary-500"></i>${specs.bandwidth}</p>` : ''}
                </div>
            `;
        }

        // Features HTML
        const featuresHtml = product.features ? product.features.slice(0, 4).map(feature => `
            <li class="flex items-start">
                <i class="fas fa-check text-green-500 mr-2 mt-1 flex-shrink-0"></i>
                <span class="text-sm">${feature}</span>
            </li>
        `).join('') : '';

        // Locations HTML
        let locationsHtml = '';
        if (product.locations && product.locations.length > 0) {
            locationsHtml = `
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <i class="fas fa-map-marker-alt mr-1"></i> ${product.locations.join(', ')}
                </div>
            `;
        }

        // Get the order link and text
        const orderLink = product.ctaLink || '#';
        const orderText = product.ctaText || 'Order Now';

        // Handle price display
        let priceHtml = '';
        if (product.price !== null && product.price !== undefined) {
            const displayPrice = product.discountPrice || product.price;
            priceHtml = `
                <div class="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                    ${product.discountPrice ? `<span class="line-through text-gray-400 text-xl mr-2">$${product.price.toFixed(2)}</span>` : ''}
                    $${displayPrice.toFixed(2)}<span class="text-lg font-normal text-gray-600 dark:text-gray-400">/${product.billingCycle || 'mo'}</span>
                </div>
            `;
        } else {
            priceHtml = `
                <div class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                    Contact for Quote
                </div>
            `;
        }

        card.innerHTML = `
            ${badgeHtml}
            <div class="mt-2">
                <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white pr-8">${product.name}</h3>
                ${product.description ? `<p class="text-sm text-gray-600 dark:text-gray-400 mb-4">${product.description}</p>` : ''}
                ${priceHtml}
                ${locationsHtml}
                ${specificationsHtml}
                ${featuresHtml ? `<ul class="space-y-1 mb-6 flex-grow text-gray-700 dark:text-gray-300">${featuresHtml}</ul>` : ''}
                <div class="space-y-3 mt-auto">
                    <a href="${orderLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary w-full">
                        ${orderText}
                    </a>
                    <a href="/contact" class="btn btn-outline w-full">
                        Get Support
                    </a>
                </div>
            </div>
        `;

        return card;
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 flex items-center gap-3 min-w-[300px] animate-slideIn`;

        // Set background color based on type
        if (type === 'success') {
            notification.classList.add('bg-green-500', 'text-white');
        } else if (type === 'error') {
            notification.classList.add('bg-red-500', 'text-white');
        } else {
            notification.classList.add('bg-blue-500', 'text-white');
        }

        notification.innerHTML = `
            <i class="fas fa-info-circle"></i>
            <span>${message}</span>
            <button class="ml-auto hover:opacity-75">
                <i class="fas fa-times"></i>
            </button>
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('animate-slideOut');
            setTimeout(() => notification.remove(), 300);
        }, 5000);

        // Close button functionality
        const closeBtn = notification.querySelector('button');
        closeBtn.addEventListener('click', () => {
            notification.classList.add('animate-slideOut');
            setTimeout(() => notification.remove(), 300);
        });
    }
}

// Determine product type based on page
function initializeProducts() {
    const path = window.location.pathname;
    let productType = null;

    if (path.includes('dedicated-servers')) {
        productType = 'dedicated';
    } else if (path.includes('vps')) {
        productType = 'vps';
    } else if (path.includes('colocation')) {
        productType = 'colocation';
    }

    if (productType) {
        window.productPageManager = new ProductPageManager(productType);
    }
}

// Try multiple initialization methods to ensure it works
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeProducts);
} else {
    // DOM is already loaded
    initializeProducts();
}

// Also add as fallback
window.addEventListener('load', () => {
    // Check if products are already loaded (skeleton loaders have animate-pulse class)
    const container = document.getElementById('products-container');
    if (container) {
        const hasSkeletons = container.querySelector('.animate-pulse');
        if (hasSkeletons) {
            initializeProducts();
        }
    }
});