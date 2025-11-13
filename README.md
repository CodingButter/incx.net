# Interconnecx Website

Premium hosting solutions website with enterprise-grade SEO optimization and modern web standards.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build CSS for production
npm run build

# Watch CSS changes during development
npm run build-css
```

The server will run on **http://localhost:8080**

## 📁 Project Structure

```
incx.net/
├── html/                 # All website files
│   ├── *.html           # HTML pages
│   ├── css/             # Stylesheets
│   ├── js/              # JavaScript files
│   ├── images/          # Image assets
│   ├── config/          # Configuration files (products.json, site.json)
│   ├── components/      # Reusable components
│   ├── fonts/           # Web fonts
│   ├── sitemap.xml      # Search engine sitemap
│   ├── robots.txt       # Crawler instructions
│   ├── manifest.json    # PWA manifest
│   └── .htaccess        # Apache configuration
├── node_modules/        # Dependencies
├── server.js           # Express server
├── package.json        # Node configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## 🎯 Features

### Advanced SEO Implementation

- **Structured Data**: Comprehensive JSON-LD schemas for rich snippets
  - Organization schema
  - Product schemas with pricing
  - Service schemas
  - FAQ schemas
  - BreadcrumbList navigation
  - LocalBusiness information

- **Meta Tags Optimization**:
  - Open Graph tags for social sharing
  - Twitter Card implementation
  - Canonical URLs
  - Hreflang tags for international SEO
  - Geo-targeting meta tags

- **Technical SEO**:
  - XML Sitemap with image support
  - Optimized robots.txt
  - PWA manifest for mobile
  - Core Web Vitals optimization
  - Lazy loading images
  - Resource prefetching

- **Performance Optimization**:
  - Browser caching rules
  - Gzip compression
  - Image optimization
  - Minified CSS/JS
  - Keep-alive connections

### Product Management

- Dynamic product loading from JSON
- Three product categories:
  - Dedicated Servers
  - VPS Hosting
  - Colocation Services
- Automatic price handling with discount support
- Location-based availability

### Modern Web Standards

- Responsive design with Tailwind CSS
- Dark mode support
- Accessibility compliance
- PWA ready
- Mobile-first approach

## 🔧 Configuration

### Site Configuration
Edit `html/config/site.json` to update:
- Company information
- Contact details
- Data center locations
- Network specifications

### Products Configuration
Edit `html/config/products.json` to manage:
- Product listings
- Pricing
- Specifications
- Features

### SEO Configuration
The SEO manager (`html/js/seo.js`) automatically:
- Generates meta tags
- Creates structured data
- Implements tracking codes
- Manages canonical URLs

## 🚦 Server Configuration

The Express server (`server.js`) serves the website from the `html` directory with:
- Clean URLs (no .html extension needed)
- 404 error handling
- Static file serving
- SEO-friendly routing

## 📈 SEO Best Practices Implemented

1. **Search Engine Visibility**
   - Comprehensive sitemap.xml
   - Optimized robots.txt with crawl delays
   - Meta descriptions on all pages
   - Schema markup for rich snippets

2. **Social Media Integration**
   - Open Graph protocol
   - Twitter Cards
   - Social sharing optimization

3. **Technical Excellence**
   - HTTPS enforcement (.htaccess)
   - Clean URL structure
   - Fast page load times
   - Mobile responsiveness

4. **Content Optimization**
   - Semantic HTML5 structure
   - Proper heading hierarchy
   - Alt text for images
   - Internal linking structure

## 🛠️ Development

### Adding New Pages

1. Create HTML file in `html/` directory
2. Add to sitemap.xml
3. Update navigation in components
4. SEO script will automatically handle meta tags

### Updating Products

1. Edit `html/config/products.json`
2. Products will automatically appear on respective pages
3. No code changes needed

### Customizing SEO

1. Edit `html/js/seo.js` for global SEO rules
2. Page-specific SEO is handled automatically
3. Structured data updates dynamically

## 📊 Monitoring

- Check Google Search Console for indexing status
- Monitor Core Web Vitals scores
- Track social sharing metrics
- Review server logs for 404 errors

## 🔒 Security

- Security headers in .htaccess
- Content Security Policy
- XSS protection
- HTTPS enforcement
- Directory browsing disabled

## 📝 License

© 2025 Interconnecx LLC. All rights reserved.

---

Built with modern web technologies for maximum performance and search engine visibility.