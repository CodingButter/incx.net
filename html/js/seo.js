// Advanced SEO Management System
class SEOManager {
    constructor() {
        this.config = {
            siteName: 'Interconnecx',
            siteUrl: 'https://incx.net',
            twitterHandle: '@interconnecx',
            fbAppId: '', // Add if available
            logo: 'https://incx.net/images/incx_logo.svg',
            defaultImage: 'https://incx.net/images/og-image.jpg',
            organization: {
                name: 'Interconnecx LLC',
                url: 'https://incx.net',
                logo: 'https://incx.net/images/incx_logo.svg',
                contactPoint: {
                    telephone: '+1-810-202-7474',
                    contactType: 'customer service',
                    areaServed: 'US',
                    availableLanguage: 'English'
                },
                sameAs: [
                    'https://www.linkedin.com/company/interconnecx',
                    'https://twitter.com/interconnecx',
                    'https://www.facebook.com/interconnecx'
                ]
            }
        };
        this.init();
    }

    init() {
        this.enhanceMetaTags();
        this.addStructuredData();
        this.implementCoreWebVitals();
        this.setupLinkPrefetching();
        this.addCanonicalLinks();
        this.implementHrefLang();
    }

    enhanceMetaTags() {
        const head = document.head;

        // Remove any duplicate meta tags first
        this.removeDuplicateMeta();

        // Core SEO meta tags
        this.setMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
        this.setMetaTag('googlebot', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
        this.setMetaTag('bingbot', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

        // Advanced meta tags for better indexing
        this.setMetaTag('rating', 'general');
        this.setMetaTag('distribution', 'global');
        this.setMetaTag('revisit-after', '7 days');

        // Geo-targeting
        this.setMetaTag('geo.region', 'US');
        this.setMetaTag('geo.placename', 'United States');
        this.setMetaTag('geo.position', '42.3314;-83.0458'); // Detroit coordinates
        this.setMetaTag('ICBM', '42.3314, -83.0458');

        // Language and content type
        this.setMetaTag('language', 'English');
        this.setMetaTag('Content-Language', 'en-US');

        // Publisher information
        this.setMetaTag('author', 'Interconnecx LLC');
        this.setMetaTag('publisher', 'Interconnecx LLC');
        this.setMetaTag('copyright', `© ${new Date().getFullYear()} Interconnecx LLC. All rights reserved.`);

        // Mobile optimization
        this.setMetaTag('mobile-web-app-capable', 'yes');
        this.setMetaTag('HandheldFriendly', 'true');
        this.setMetaTag('MobileOptimized', '320');

        // Performance hints
        this.addLinkTag('dns-prefetch', 'https://fonts.googleapis.com');
        this.addLinkTag('dns-prefetch', 'https://cdnjs.cloudflare.com');
        this.addLinkTag('preconnect', 'https://fonts.googleapis.com');
        this.addLinkTag('preconnect', 'https://fonts.gstatic.com');

        // Add Open Graph tags
        this.setupOpenGraph();

        // Add Twitter Card tags
        this.setupTwitterCard();

        // Add Apple-specific tags
        // apple-mobile-web-app-capable is deprecated, using mobile-web-app-capable instead
        this.setMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');
        this.setMetaTag('apple-mobile-web-app-title', 'Interconnecx');
    }

    setupOpenGraph() {
        const pageData = this.getPageSpecificData();

        // Basic Open Graph
        this.setMetaProperty('og:site_name', this.config.siteName);
        this.setMetaProperty('og:type', pageData.type || 'website');
        this.setMetaProperty('og:url', window.location.href);
        this.setMetaProperty('og:title', pageData.title || document.title);
        this.setMetaProperty('og:description', pageData.description || this.getMetaContent('description'));
        this.setMetaProperty('og:image', pageData.image || this.config.defaultImage);
        this.setMetaProperty('og:image:width', '1200');
        this.setMetaProperty('og:image:height', '630');
        this.setMetaProperty('og:image:alt', pageData.imageAlt || 'Interconnecx - Premium Hosting Solutions');
        this.setMetaProperty('og:locale', 'en_US');

        // Additional Open Graph
        if (pageData.price) {
            this.setMetaProperty('og:price:amount', pageData.price);
            this.setMetaProperty('og:price:currency', 'USD');
        }

        // Facebook specific
        if (this.config.fbAppId) {
            this.setMetaProperty('fb:app_id', this.config.fbAppId);
        }
    }

    setupTwitterCard() {
        const pageData = this.getPageSpecificData();

        this.setMetaTag('twitter:card', 'summary_large_image');
        this.setMetaTag('twitter:site', this.config.twitterHandle);
        this.setMetaTag('twitter:creator', this.config.twitterHandle);
        this.setMetaTag('twitter:title', pageData.title || document.title);
        this.setMetaTag('twitter:description', pageData.description || this.getMetaContent('description'));
        this.setMetaTag('twitter:image', pageData.image || this.config.defaultImage);
        this.setMetaTag('twitter:image:alt', pageData.imageAlt || 'Interconnecx - Premium Hosting Solutions');
        this.setMetaTag('twitter:domain', 'incx.net');
    }

    addStructuredData() {
        const pathname = window.location.pathname;

        // Organization schema (on all pages)
        this.addOrganizationSchema();

        // Page-specific schemas
        if (pathname === '/' || pathname === '/index.html') {
            this.addWebSiteSchema();
            this.addLocalBusinessSchema();
        } else if (pathname.includes('dedicated-servers') || pathname.includes('vps') || pathname.includes('colocation')) {
            this.addProductSchema();
            this.addFAQSchema();
        } else if (pathname.includes('about')) {
            this.addAboutPageSchema();
        } else if (pathname.includes('contact')) {
            this.addContactPageSchema();
        }

        // BreadcrumbList schema for all pages except home
        if (pathname !== '/' && pathname !== '/index.html') {
            this.addBreadcrumbSchema();
        }

        // Add Service schema for service pages
        if (pathname.includes('dedicated') || pathname.includes('vps') || pathname.includes('colocation')) {
            this.addServiceSchema();
        }
    }

    addOrganizationSchema() {
        const schema = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Interconnecx LLC",
            "alternateName": "INCX",
            "url": "https://incx.net",
            "logo": this.config.logo,
            "description": "Premium dedicated servers, VPS, and colocation services with enterprise hardware and 24/7 support",
            "foundingDate": "2009",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "24700 Northwestern Hwy, Suite 533",
                "addressLocality": "Southfield",
                "addressRegion": "MI",
                "postalCode": "48075",
                "addressCountry": "US"
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-810-202-7474",
                "contactType": "customer service",
                "areaServed": "US",
                "availableLanguage": "English",
                "contactOption": ["TollFree", "HearingImpairedSupported"]
            },
            "sameAs": this.config.organization.sameAs,
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "127",
                "bestRating": "5",
                "worstRating": "1"
            }
        };
        this.injectSchema(schema, 'organization-schema');
    }

    addWebSiteSchema() {
        const schema = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Interconnecx",
            "alternateName": "INCX",
            "url": "https://incx.net",
            "description": "Premium dedicated servers and hosting solutions",
            "potentialAction": {
                "@type": "SearchAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://incx.net/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
            },
            "publisher": {
                "@id": "https://incx.net/#organization"
            }
        };
        this.injectSchema(schema, 'website-schema');
    }

    addLocalBusinessSchema() {
        const schema = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Interconnecx LLC",
            "image": this.config.logo,
            "url": "https://incx.net",
            "@id": "https://incx.net/#localbusiness",
            "telephone": "+1-810-202-7474",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "24700 Northwestern Hwy, Suite 533",
                "addressLocality": "Southfield",
                "addressRegion": "MI",
                "postalCode": "48075",
                "addressCountry": "US"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 42.3314,
                "longitude": -83.0458
            },
            "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday", "Tuesday", "Wednesday", "Thursday",
                    "Friday", "Saturday", "Sunday"
                ],
                "opens": "00:00",
                "closes": "23:59"
            },
            "priceRange": "$$",
            "servesCuisine": "Technology Services"
        };
        this.injectSchema(schema, 'localbusiness-schema');
    }

    addProductSchema() {
        // This would be dynamically populated based on the products shown
        const pathname = window.location.pathname;
        let productType = '';

        if (pathname.includes('dedicated')) {
            productType = 'Dedicated Servers';
        } else if (pathname.includes('vps')) {
            productType = 'VPS Hosting';
        } else if (pathname.includes('colocation')) {
            productType = 'Server Colocation';
        }

        const schema = {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": `${productType} - Interconnecx`,
            "image": this.config.defaultImage,
            "description": `Premium ${productType} with enterprise hardware and 24/7 support`,
            "brand": {
                "@type": "Brand",
                "name": "Interconnecx"
            },
            "offers": {
                "@type": "AggregateOffer",
                "offerCount": "10",
                "lowPrice": "10.00",
                "highPrice": "199.00",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "seller": {
                    "@type": "Organization",
                    "name": "Interconnecx LLC"
                }
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "89"
            }
        };
        this.injectSchema(schema, 'product-schema');
    }

    addBreadcrumbSchema() {
        const pathname = window.location.pathname;
        const pageName = this.getPageName(pathname);

        const schema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://incx.net"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": pageName,
                    "item": `https://incx.net${pathname}`
                }
            ]
        };
        this.injectSchema(schema, 'breadcrumb-schema');
    }

    addServiceSchema() {
        const pathname = window.location.pathname;
        let service = {};

        if (pathname.includes('dedicated')) {
            service = {
                name: 'Dedicated Server Hosting',
                description: 'Enterprise Dell servers with full root access and dedicated resources'
            };
        } else if (pathname.includes('vps')) {
            service = {
                name: 'VPS Hosting',
                description: 'Scalable KVM VPS servers with guaranteed resources'
            };
        } else if (pathname.includes('colocation')) {
            service = {
                name: 'Server Colocation',
                description: 'Secure Tier 3 data center colocation services'
            };
        }

        const schema = {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": service.name,
            "provider": {
                "@type": "Organization",
                "name": "Interconnecx LLC"
            },
            "description": service.description,
            "areaServed": "United States",
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": `${service.name} Plans`,
                "itemListElement": []
            }
        };
        this.injectSchema(schema, 'service-schema');
    }

    addFAQSchema() {
        const faqs = [
            {
                question: "What is the setup time for dedicated servers?",
                answer: "Most dedicated servers are provisioned within 24-48 hours after order confirmation."
            },
            {
                question: "Do you offer managed services?",
                answer: "Yes, we offer both unmanaged and fully managed hosting solutions with 24/7 support."
            },
            {
                question: "What data centers do you operate in?",
                answer: "We have data centers in Detroit MI, Kansas City MO, Cleveland OH, and Dallas TX."
            },
            {
                question: "Is there a setup fee?",
                answer: "No, we don't charge any setup fees for our standard configurations."
            },
            {
                question: "What uptime guarantee do you offer?",
                answer: "We offer a 99.99% uptime SLA for dedicated servers and 99.9% for VPS services."
            }
        ];

        const schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        };
        this.injectSchema(schema, 'faq-schema');
    }

    addAboutPageSchema() {
        const schema = {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Interconnecx",
            "description": "Learn about Interconnecx, a leading provider of dedicated servers and hosting solutions since 2009",
            "url": "https://incx.net/about",
            "mainEntity": {
                "@id": "https://incx.net/#organization"
            }
        };
        this.injectSchema(schema, 'about-schema');
    }

    addContactPageSchema() {
        const schema = {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Interconnecx",
            "description": "Get in touch with our sales and support team",
            "url": "https://incx.net/contact",
            "mainEntity": {
                "@id": "https://incx.net/#organization"
            }
        };
        this.injectSchema(schema, 'contact-schema');
    }

    implementCoreWebVitals() {
        // Add resource hints for critical resources
        this.addLinkTag('preload', '/css/output.css', 'style');
        // main.js is loaded directly, no preload needed

        // Implement lazy loading for images
        if ('loading' in HTMLImageElement.prototype) {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                if (!img.hasAttribute('loading')) {
                    img.setAttribute('loading', 'lazy');
                }
            });
        }

        // Add decoding async to images
        document.querySelectorAll('img').forEach(img => {
            if (!img.hasAttribute('decoding')) {
                img.setAttribute('decoding', 'async');
            }
        });
    }

    setupLinkPrefetching() {
        // Disabled: Prefetching pages to reduce unnecessary background requests
        // This was causing all product pages to be loaded in the background
        return;

        /* Original prefetch code - commented out
        // Prefetch likely next pages
        const currentPath = window.location.pathname;
        const prefetchPaths = [];

        if (currentPath === '/' || currentPath === '/index.html') {
            prefetchPaths.push('/dedicated-servers', '/vps', '/colocation');
        } else if (currentPath.includes('dedicated')) {
            prefetchPaths.push('/vps', '/contact');
        } else if (currentPath.includes('vps')) {
            prefetchPaths.push('/dedicated-servers', '/contact');
        }

        prefetchPaths.forEach(path => {
            this.addLinkTag('prefetch', path + '.html', 'document');
        });
        */
    }

    addCanonicalLinks() {
        const canonical = document.createElement('link');
        canonical.rel = 'canonical';
        canonical.href = window.location.href.replace(/\/$/, '').replace(/\.html$/, '');

        // Remove any existing canonical
        const existing = document.querySelector('link[rel="canonical"]');
        if (existing) {
            existing.remove();
        }

        document.head.appendChild(canonical);
    }

    implementHrefLang() {
        // Add hreflang for language/regional targeting
        const hreflang = document.createElement('link');
        hreflang.rel = 'alternate';
        hreflang.hreflang = 'en-US';
        hreflang.href = window.location.href;

        document.head.appendChild(hreflang);

        // Add x-default for international users
        const hreflangDefault = document.createElement('link');
        hreflangDefault.rel = 'alternate';
        hreflangDefault.hreflang = 'x-default';
        hreflangDefault.href = window.location.href;

        document.head.appendChild(hreflangDefault);
    }

    // Helper methods
    setMetaTag(name, content) {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = name;
            document.head.appendChild(meta);
        }
        meta.content = content;
    }

    setMetaProperty(property, content) {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('property', property);
            document.head.appendChild(meta);
        }
        meta.content = content;
    }

    getMetaContent(name) {
        const meta = document.querySelector(`meta[name="${name}"]`);
        return meta ? meta.content : '';
    }

    addLinkTag(rel, href, as = null) {
        const link = document.createElement('link');
        link.rel = rel;
        link.href = href;
        if (as) link.as = as;

        // Check if already exists
        const existing = document.querySelector(`link[rel="${rel}"][href="${href}"]`);
        if (!existing) {
            document.head.appendChild(link);
        }
    }

    injectSchema(schemaData, id) {
        let script = document.getElementById(id);
        if (!script) {
            script = document.createElement('script');
            script.type = 'application/ld+json';
            script.id = id;
            document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(schemaData);
    }

    removeDuplicateMeta() {
        const metaTags = document.querySelectorAll('meta');
        const seen = new Set();

        metaTags.forEach(tag => {
            const key = tag.name || tag.getAttribute('property') || tag.getAttribute('http-equiv');
            if (key && seen.has(key)) {
                tag.remove();
            } else if (key) {
                seen.add(key);
            }
        });
    }

    getPageSpecificData() {
        const pathname = window.location.pathname;
        const data = {
            title: document.title,
            description: this.getMetaContent('description'),
            type: 'website',
            image: this.config.defaultImage,
            imageAlt: 'Interconnecx - Premium Hosting Solutions'
        };

        if (pathname.includes('dedicated')) {
            data.type = 'product';
            data.price = '49.00';
        } else if (pathname.includes('vps')) {
            data.type = 'product';
            data.price = '10.00';
        } else if (pathname.includes('colocation')) {
            data.type = 'product';
            data.price = '50.00';
        }

        return data;
    }

    getPageName(pathname) {
        const map = {
            '/dedicated-servers': 'Dedicated Servers',
            '/vps': 'VPS Hosting',
            '/colocation': 'Colocation',
            '/about': 'About Us',
            '/contact': 'Contact',
            '/network': 'Network',
            '/terms': 'Terms of Service',
            '/privacy': 'Privacy Policy'
        };

        return map[pathname.replace('.html', '')] || 'Page';
    }
}

// Initialize SEO Manager when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.seoManager = new SEOManager();
    });
} else {
    window.seoManager = new SEOManager();
}