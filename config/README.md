# Configuration System Documentation

This directory contains all configuration files for the INCX website template. The configuration system allows you to update content, settings, and data without modifying HTML files directly.

## Quick Start

After making any changes to configuration files:

1. **Update the version** in `global.json` (e.g., `"version": "1.0.1"` → `"version": "1.0.2"`)
2. **Run the update script**:
   ```bash
   cd config
   ./update.sh
   ```
3. **Test your changes** - Clear browser cache with Ctrl+Shift+R

This ensures all files use the new version for proper cache busting.

## Directory Structure

```
config/
├── update.sh             # Script to update all files with current version
├── global.json           # Global settings used across all pages
├── products.json         # Product catalog for all services
├── testimonials.json     # Customer testimonials
└── pages/                # Page-specific configurations
    ├── home.json
    ├── about.json
    ├── contact.json
    ├── dedicated-servers.json
    ├── vps.json
    ├── colocation.json
    ├── network.json
    └── testimonials.json
```

## How the Configuration System Works

1. **Loading Process**: When a page loads, `config-loader.js` automatically loads:
   - `global.json` - Always loaded on every page
   - The specific page config from `pages/` directory (if it exists)
   - Additional configs as needed (products.json, testimonials.json)

2. **Template Variables**: You can use template variables in any config file:
   - Format: `{{path.to.value}}`
   - Example: `{{company.name}}` will be replaced with the company name from global.json
   - Works in any string value in page configs

3. **Dynamic Content**: JavaScript automatically updates page content from configs:
   - Hero sections (titles, subtitles, images)
   - Stats and features
   - Product listings
   - Testimonials
   - Meta tags for SEO

## Configuration Files

### 1. global.json
Contains site-wide settings and data used across all pages.

```json
{
  "version": "1.0.0",
  "company": {
    "name": "Interconnecx LLC",
    "shortName": "INCX",
    "founded": "2009",
    "phone": "810-202-7474",
    "email": "support@incx.net"
  },
  "features": {
    "support": {
      "availability": "24/7/365",
      "responseTime": "< 15 minutes"
    },
    "network": {
      "uptime": "99.99%",
      "ddosProtection": "500Gbps"
    }
  },
  "network": {
    "bandwidth": "100Gbps",
    "uptime": "99.99%"
  },
  "datacenters": [
    {
      "id": "dtw",
      "city": "Detroit",
      "state": "Michigan",
      "stateCode": "MI",
      "tier": 3
    }
  ]
}
```

**Key Sections to Update:**
- `version`: Cache busting version (increment when making changes)
- `company`: Business information
- `features`: Key selling points and features
- `network`: Network specifications
- `datacenters`: List of datacenter locations (automatically displayed on home page)
- `socials`: Social media links

#### Cache Busting with Version Control

The `version` field in `global.json` controls cache busting for all JavaScript and CSS files. When you make changes to configuration or code:

1. **Update the version number** in `global.json`:
   - Patch changes (bug fixes): `1.0.0` → `1.0.1`
   - Minor changes (new features): `1.0.0` → `1.1.0`
   - Major changes (breaking changes): `1.0.0` → `2.0.0`

2. **Run the update script** (from the config directory):
   ```bash
   cd config
   ./update.sh
   ```
   This script will:
   - Read the version from `global.json`
   - Update all HTML files to use the new version
   - Update CSS and JavaScript file references
   - Show progress and confirmation

3. **How it works**:
   - All JavaScript and CSS files are loaded with `?v=1.0.1` parameter
   - JSON configuration files are loaded with the same version
   - When you update the version, browsers will fetch fresh copies

4. **Example workflow**:
   ```bash
   # 1. Make your changes to configs or code
   # 2. Update version in global.json
   nano config/global.json  # Change "version": "1.0.1" to "1.0.2"

   # 3. Run the update script from config directory
   cd config
   ./update.sh

   # 4. Test your changes
   # 5. Commit to version control
   ```

5. **Benefits**:
   - Controlled cache invalidation
   - No more random timestamps
   - Better performance (files cached between deployments)
   - Easy rollback (just change version number back)
   - Automated updates with the script

### 2. products.json
Contains all product categories and their items.

```json
{
  "categories": {
    "dedicated-servers": {
      "name": "Dedicated Servers",
      "products": [
        {
          "id": "dell-r440",
          "name": "Dell PowerEdge R440",
          "price": 149,
          "specs": {
            "cpu": "2x Intel Xeon Silver 4214",
            "cores": "24 Cores / 48 Threads",
            "ram": "64GB DDR4 ECC",
            "storage": "2x 1TB NVMe SSD"
          },
          "features": ["Full Root Access", "100TB Bandwidth"],
          "badge": "Most Popular",
          "badgeColor": "primary",
          "featured": true
        }
      ]
    }
  }
}
```

**How to Add/Update Products:**
1. Find the appropriate category (`dedicated-servers`, `vps`, `colocation`)
2. Add/edit products in the `products` array
3. Set `featured: true` for products to show on home page
4. Add `badge` and `badgeColor` for special labels

**Badge Colors:**
- `primary` - Blue
- `secondary` - Gray
- `success` - Green
- `warning` - Yellow
- `danger` - Red

### 3. testimonials.json
Contains customer testimonials and reviews.

```json
{
  "testimonials": [
    {
      "id": "test-001",
      "name": "John Doe",
      "company": "Tech Corp",
      "rating": 5,
      "service": "Dedicated Servers",
      "featured": true,
      "verified": true,
      "title": "Excellent Service",
      "content": "Great hosting experience..."
    }
  ]
}
```

**Managing Testimonials:**
- Set `featured: true` to show on home page (max 3)
- `verified: true` adds a verified badge
- `rating` should be 1-5
- `service` should match product categories

### 4. Page Configurations (pages/*.json)

Each page can have its own configuration file with:

```json
{
  "meta": {
    "title": "Page Title - Interconnecx",
    "description": "SEO description",
    "keywords": "keyword1, keyword2"
  },
  "hero": {
    "title": "Hero Title",
    "subtitle": "Hero subtitle with {{template.variables}}",
    "image": "/images/hero-image.jpg",
    "price": "Starting at $49/mo"
  },
  "features": [
    "Feature 1",
    "Feature 2"
  ],
  "stats": {
    "enabled": true,
    "items": [
      {
        "label": "Customers",
        "value": "2,500+",
        "icon": "fas fa-users"
      }
    ]
  }
}
```

**Page-Specific Features:**
- `meta`: SEO metadata
- `hero`: Hero section content
- `features`: Feature highlights (varies by page)
- `stats`: Statistical displays with icons

## How to Update Content

### Quick Updates

1. **Change Company Info:**
   - Edit `global.json` → `company` section
   - Changes appear site-wide

2. **Update Product Prices:**
   - Edit `products.json` → find product → change `price`
   - Refresh page to see changes

3. **Add New Testimonial:**
   - Edit `testimonials.json` → add new object to `testimonials` array
   - Set `featured: true` for home page display

4. **Change Hero Text:**
   - Edit `pages/[pagename].json` → `hero` section
   - Update `title` and `subtitle`

5. **Update Datacenter Locations:**
   - Edit `global.json` → `datacenters` array
   - Add/remove datacenter objects
   - Home page automatically updates

### Template Variables Reference

Common variables you can use in page configs and markdown files:

#### Global Config Variables

```
{{company.name}}                    - Company full name
{{company.shortName}}               - Company short name (INCX)
{{company.founded}}                 - Year founded
{{company.phone}}                   - Phone number
{{company.email}}                   - Email address

{{network.bandwidth}}               - Network bandwidth (100Gbps)
{{network.uptime}}                  - Uptime guarantee (99.99%)
{{network.ddosProtection}}          - DDoS protection level

{{features.support.availability}}   - Support availability (24/7/365)
{{features.support.responseTime}}   - Support response time
{{features.billing.setupFee}}       - Setup fee information
{{features.guarantees.uptime}}      - Uptime guarantee

{{datacenters.length}}              - Number of datacenters (auto-calculated)
{{datacenters.count}}               - Same as above
```

#### Build Variables (Auto-Generated)

These variables are automatically generated at build time and are perfect for "Last Updated" dates:

**Date Components:**
```
{{build.year}}                      - Year (e.g., 2025)
{{build.month}}                     - Month name (e.g., November)
{{build.monthNumber}}               - Month number (e.g., 11)
{{build.day}}                       - Day of month (e.g., 13)
```

**Formatted Dates:**
```
{{build.date}}                      - Full date (e.g., November 13, 2025)
{{build.dateShort}}                 - Short date (e.g., 11/13/2025)
```

**Time & Metadata:**
```
{{build.time}}                      - Build time (e.g., 14:30:45)
{{build.timestamp}}                 - ISO timestamp (e.g., 2025-11-13T14:30:45.123Z)
{{build.version}}                   - Current version from global.json
{{build.environment}}               - Build environment (production/development)
```

**Usage Examples:**

In markdown files:
```markdown
**Effective Date:** {{build.date}}
*Last Updated: {{build.month}} {{build.year}}*
```

In page configs:
```json
{
  "subtitle": "Updated {{build.date}} - Version {{build.version}}"
}
```

### Advanced Updates

1. **Using Template Variables:**
```json
{
  "subtitle": "Serving businesses since {{company.founded}} with {{network.bandwidth}} network"
}
```

2. **Adding New Datacenter:**
```json
{
  "id": "chi",
  "city": "Chicago",
  "state": "Illinois",
  "stateCode": "IL",
  "tier": 3,
  "available": true
}
```

3. **Creating Product with Badge:**
```json
{
  "id": "product-id",
  "name": "Product Name",
  "price": 99,
  "badge": "Limited Offer",
  "badgeColor": "danger",
  "featured": true,
  "specs": {...}
}
```

## Important Notes

1. **JSON Syntax**: Ensure valid JSON syntax (use jsonlint.com to validate)
2. **Image Paths**: Use absolute paths starting with `/images/`
3. **Cache Busting**: Clear browser cache (Ctrl+Shift+R) after updates
4. **Template Variables**: Only work in page configs, not in global.json
5. **Loading Order**: Global config loads first, then page-specific
6. **File Names**: Page config names must match HTML file names

## Troubleshooting

### Content Not Updating:
- Increment version in `global.json` (e.g., `1.0.0` → `1.0.1`)
- Clear browser cache (Ctrl+Shift+R)
- Check browser console for errors (F12)
- Validate JSON syntax at jsonlint.com
- Ensure config file name matches page name
- Verify version number is being used in URLs (check Network tab)

### Images Not Loading:
- Verify image exists in `/images/` folder
- Check path starts with `/images/`
- Ensure filename matches exactly (case-sensitive)
- Check image file extension (.jpg, .png, etc.)

### Template Variables Not Working:
- Verify path exists in global.json
- Check for typos in variable name
- Ensure using double curly braces `{{}}`
- Variables only work in page configs, not global

### Products Not Showing:
- Set `featured: true` for home page display
- Check category name matches exactly
- Verify product has all required fields
- Ensure products.json is valid JSON

### Testimonials Not Appearing:
- Set `featured: true` for homepage (max 3)
- Check testimonials.json is valid
- Verify `service` field matches product categories
- Ensure rating is between 1-5

## Best Practices

1. **Backup Before Changes**: Keep copies of working configs
2. **Test Locally**: Test changes in development first
3. **Incremental Updates**: Make small changes and test
4. **Consistent Naming**: Use consistent IDs and naming
5. **SEO Optimization**: Always update meta tags for new pages
6. **Use Templates**: Use template variables for repeated content
7. **Validate JSON**: Always validate JSON before saving
8. **Document Changes**: Keep notes of significant changes

## Examples

### Example: Update Network Speed from 100Gbps to 200Gbps
1. Open `global.json`
2. Find `"network": { "bandwidth": "100Gbps"`
3. Change to `"bandwidth": "200Gbps"`
4. Save file
5. Clear browser cache and refresh

### Example: Add New Product
1. Open `products.json`
2. Find appropriate category
3. Add to products array:
```json
{
  "id": "new-server",
  "name": "New Server Model",
  "price": 199,
  "featured": true,
  "badge": "New",
  "badgeColor": "success",
  "specs": {
    "cpu": "Intel Xeon Gold",
    "ram": "128GB DDR4",
    "storage": "4x 2TB NVMe"
  },
  "features": ["Full Root Access", "Unlimited Bandwidth"]
}
```

### Example: Update Hero Title
1. Open `pages/home.json`
2. Find `"hero": { "headline":`
3. Update text
4. Can use variables: `"headline": "Premium Hosting with {{network.bandwidth}} Network"`

## Support

For issues or questions about the configuration system:
- Check browser console for error messages
- Validate JSON at jsonlint.com
- Review this documentation
- Archive old configs before major changes

## Legal Documents (Markdown)

Legal documents are stored as markdown files in this directory and automatically converted to HTML during the build process. This makes them easy to edit while maintaining a professional appearance.

### Available Legal Documents

- **privacy-policy.md** - Privacy Policy
- **terms-of-service.md** - Terms of Service

### How to Update Legal Documents

1. Edit the markdown file in this directory (e.g., `config/privacy-policy.md`)
2. Save your changes
3. Run the build script from the root: `./build.sh`
4. The updated content will be automatically converted to HTML and deployed

### Using Template Variables in Legal Documents

You can use template variables in your markdown files to automatically insert values from `global.json`. This ensures consistency across your site.

**Example Usage:**

```markdown
# Privacy Policy

{{company.name}} ("we," "us," or "our") is committed to protecting your privacy.

## Contact Information

If you have questions, please contact us at:
- Email: {{contact.email}}
- Phone: {{contact.phoneDisplay}}
- Address: {{contact.address.city}}, {{contact.address.stateCode}} {{contact.address.zip}}
```

All template variables from the "Template Variables Reference" section above are available in markdown files.

### Markdown Syntax

Legal documents support full markdown syntax:

- **Headers**: `# H1`, `## H2`, `### H3`
- **Bold**: `**bold text**`
- **Lists**: Use `-` or `*` for bullets, `1.` for numbered
- **Links**: `[text](url)`
- **Paragraphs**: Separate with blank lines

### Benefits of Markdown-Based Legal Documents

1. **Easy to Edit** - Simple text format, no HTML knowledge required
2. **Version Control Friendly** - Track changes easily in git
3. **Template Variables** - Automatically stay in sync with global config
4. **Professional Output** - Automatically styled to match your website
5. **Portable** - Can be used in other systems if needed

## External Links Configuration

The `externalLinks` section in `global.json` controls links to external services:

```json
{
  "externalLinks": {
    "knowledgeBase": "https://incx.tawk.help/",
    "clientPortal": "https://clients.incx.net"
  }
}
```

**Usage:**
- The `/knowledge-base` page automatically redirects to the configured knowledge base URL
- Update these URLs to point to your actual external services
- Ensures consistency across the site

---

Last Updated: November 2024
Version: 2.0