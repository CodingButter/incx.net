# INCX Website Builder

**No coding required!** Configure your website using simple JSON files and build with one command.

Built with Next.js for maximum performance, SEO optimization, and lightning-fast load times.

---

## 🚀 Quick Start (3 Steps)

### Step 1: Edit Your Configuration

Open the JSON files in the `config/` folder and update your content:

```bash
config/
├── global.json         # Your company info, contact, network specs
├── products.json       # VPS, Servers, Colocation offerings
├── testimonials.json   # Customer reviews
└── pages/              # Individual page content
    ├── home.json
    ├── vps.json
    ├── dedicated-servers.json
    └── ...
```

### Step 2: Build Your Website

Run the build script from the project root:

```bash
./build.sh
```

**That's it!** The script will:
- ✅ Check for Node.js and npm (installs them if missing)
- ✅ Install all required dependencies
- ✅ Build your static website
- ✅ Output to the `www/` folder

### Step 3: Deploy

Upload the contents of the `www/` folder to your web server. Done! 🎉

---

## 🎯 Build Script Usage

### Default Build

Builds to the `www/` folder:

```bash
./build.sh
```

### Custom Output Directory (WEB_ROOT)

**IMPORTANT:** Most web servers use different output directories (like `html/`, `public_html/`, `htdocs/`). Set the `WEB_ROOT` environment variable to build directly to your server's document root.

**Option 1: Set Permanently (RECOMMENDED)**

Add to your shell configuration file so you never have to think about it again:

```bash
# Add to ~/.bashrc (or ~/.zshrc for zsh)
echo 'export WEB_ROOT=html' >> ~/.bashrc

# Reload your configuration
source ~/.bashrc

# Now just run the build script - it will always use the custom directory
./build.sh
```

**Option 2: Set Per Build**

Set it just for one build:

```bash
# One-time build to custom directory
WEB_ROOT=html ./build.sh
```

**Option 3: Set for Current Session**

Set it for your current terminal session:

```bash
export WEB_ROOT=html
./build.sh
# All builds in this session will use 'html' directory
```

### Common WEB_ROOT Examples

```bash
# For Apache default document root
WEB_ROOT=html ./build.sh

# For public_html (shared hosting)
WEB_ROOT=public_html ./build.sh

# For specific deployment paths
WEB_ROOT=/var/www/html ./build.sh

# For htdocs (some servers)
WEB_ROOT=htdocs ./build.sh
```

### What the Build Script Does

1. **Checks for Node.js and npm**
   - If not installed, offers to install them automatically
   - Supports Ubuntu/Debian, CentOS/RHEL, and macOS

2. **Installs/Updates Dependencies**
   - Runs `npm install` in the `next/` folder
   - Ensures all packages are up to date

3. **Builds Static Website**
   - Compiles your configuration into static HTML
   - Optimizes images and assets
   - Generates SEO-friendly pages

4. **Outputs to WEB_ROOT**
   - Default: `www/` folder
   - Custom: Whatever you set via `WEB_ROOT`
   - Ready to deploy immediately

### Running Without Prompts

The build script automatically detects non-interactive environments (like deployment scripts) and installs dependencies without prompting.

For interactive use, just run as your regular user:

```bash
./build.sh
```

The script will use `sudo` internally when needed (you'll be prompted for your password only when installing Node.js).

---

## 📝 Configuration Guide

All content is managed through JSON files in the `config/` folder. No coding required!

### Quick Configuration Workflow

After making any changes to configuration files:

1. **Edit your JSON files** in the `config/` folder
2. **Run the build script**: `./build.sh` (from the project root)
3. **Deploy** the `www/` folder to your web server

That's it! You never need to go into the `next/` folder - the build script handles everything automatically.

### Main Configuration: `config/global.json`

This file contains your company information and settings that are reused throughout the site.

#### Structure Overview

```json
{
  "company": { ... },      // Company name, tagline, AS number
  "contact": { ... },      // Phone, email, address, hours
  "network": { ... },      // Bandwidth, uptime, DDoS protection
  "hardware": { ... },     // Server brands, management tools
  "datacenters": [ ... ],  // Your datacenter locations
  "features": { ... },     // Support, billing, guarantees
  "social": { ... },       // Social media links
  "legal": { ... },        // Terms, privacy, SLA URLs
  "externalLinks": { ... },// Knowledge base, client portal
  "branding": { ... }      // Colors, logo, favicon
}
```

#### Editing Examples

**Update company information:**
```json
{
  "company": {
    "name": "Your Company LLC",
    "shortName": "YourCo",
    "tagline": "Your Awesome Tagline",
    "founded": "2024",
    "asNumber": "AS12345"
  }
}
```

**Update contact information:**
```json
{
  "contact": {
    "phone": "+1-555-123-4567",
    "phoneDisplay": "(555) 123-4567",
    "email": "sales@yourcompany.com",
    "supportEmail": "support@yourcompany.com",
    "address": {
      "street": "123 Main St",
      "city": "Your City",
      "state": "Your State",
      "zip": "12345"
    }
  }
}
```

**Update network specs:**
```json
{
  "network": {
    "bandwidth": "100Gbps",
    "uptime": "99.99%",
    "ddosProtection": "500Gbps",
    "carriers": ["Level3", "Cogent", "NTT"]
  }
}
```

### Products Configuration: `config/products.json`

Define your VPS plans, dedicated servers, and colocation offerings.

Products are organized by categories:
- `dedicated-servers` - Dedicated server offerings
- `vps` - Virtual Private Server plans
- `colocation` - Colocation services

**Example VPS Plan:**
```json
{
  "id": "vps-small",
  "name": "VPS Starter",
  "price": 9.99,
  "billingCycle": "month",
  "featured": false,
  "specs": {
    "cpu": "2 vCPU",
    "ram": "4GB RAM",
    "storage": "50GB SSD",
    "bandwidth": "5TB Transfer"
  },
  "features": [
    "Full Root Access",
    "24/7 Support",
    "99.99% Uptime SLA"
  ]
}
```

**Example Dedicated Server with Badge:**
```json
{
  "id": "server-e3",
  "name": "Intel Xeon E3",
  "price": 99.99,
  "billingCycle": "month",
  "featured": true,
  "badge": "Most Popular",
  "badgeColor": "primary",
  "specs": {
    "cpu": "Intel Xeon E3-1270v6",
    "ram": "32GB DDR4 ECC",
    "storage": "2x 1TB SSD",
    "bandwidth": "20TB @ 1Gbps",
    "network": "1Gbps Unmetered"
  },
  "features": [
    "Free IPMI Access",
    "DDoS Protection Included",
    "Free Remote Hands"
  ]
}
```

#### Product Badge Colors

Add visual badges to highlight special products:

**Available Badge Colors:**
- `primary` - Blue badge (for popular/recommended items)
- `secondary` - Gray badge (for standard items)
- `success` - Green badge (for best value/deals)
- `warning` - Yellow badge (for limited time offers)
- `danger` - Red badge (for urgent/hot deals)

**Example with Badges:**
```json
{
  "products": [
    {
      "id": "vps-promo",
      "name": "VPS Special",
      "price": 4.99,
      "badge": "Limited Offer",
      "badgeColor": "warning",
      "featured": true
    },
    {
      "id": "server-popular",
      "name": "E3-1270",
      "price": 99,
      "badge": "Most Popular",
      "badgeColor": "primary",
      "featured": true
    },
    {
      "id": "server-value",
      "name": "E5-2650",
      "price": 149,
      "badge": "Best Value",
      "badgeColor": "success",
      "featured": true
    }
  ]
}
```

#### Product Management Tips

1. **Set `featured: true`** to display products on the home page
2. **Use unique IDs** for each product (e.g., `vps-starter`, `server-e3-1270`)
3. **Add badges** to highlight special offerings
4. **Keep pricing current** by updating the `price` field
5. **Update specs** as hardware changes

### Testimonials: `config/testimonials.json`

Add customer reviews and ratings to build trust with potential customers.

**Example Testimonial:**
```json
{
  "id": "review-1",
  "author": "John Smith",
  "company": "Tech Startup Inc",
  "rating": 5,
  "date": "2024-01-15",
  "text": "Excellent service and support. Our servers have been rock solid!",
  "service": "Dedicated Servers",
  "featured": true,
  "verified": true
}
```

#### Testimonial Fields

- `id` - Unique identifier (required)
- `author` - Customer name (required)
- `company` - Customer's company/organization (optional)
- `rating` - Star rating 1-5 (required)
- `date` - Review date in YYYY-MM-DD format (required)
- `text` - Review content (required)
- `service` - Which service they used (should match product category)
- `featured` - Set to `true` to show on home page (max 3 recommended)
- `verified` - Set to `true` to add a verified badge

#### Managing Testimonials

1. **Featured testimonials** (`featured: true`) appear on the home page
2. **Limit to 3 featured** testimonials for best display
3. **Verified badge** (`verified: true`) adds credibility
4. **Match service names** to your product categories for filtering
5. **Keep dates current** to show active customer base

**Example with Multiple Testimonials:**
```json
{
  "testimonials": [
    {
      "id": "review-1",
      "author": "Sarah Johnson",
      "company": "E-Commerce Solutions LLC",
      "rating": 5,
      "date": "2025-01-10",
      "service": "VPS",
      "text": "Fast, reliable VPS hosting. Great value for the price!",
      "featured": true,
      "verified": true
    },
    {
      "id": "review-2",
      "author": "Mike Chen",
      "company": "DataFlow Inc",
      "rating": 5,
      "date": "2024-12-15",
      "service": "Dedicated Servers",
      "text": "Outstanding performance and support. Highly recommended!",
      "featured": true,
      "verified": true
    }
  ]
}
```

### Page Configuration: `config/pages/*.json`

Each page has its own configuration file where you can customize content.

**Example: `config/pages/home.json`**
```json
{
  "hero": {
    "title": "Enterprise Infrastructure Solutions",
    "subtitle": "Premium hosting with {{network.uptime}} uptime guarantee",
    "cta": {
      "text": "View Plans",
      "link": "/vps"
    }
  },
  "sections": [
    {
      "title": "Why Choose Us?",
      "content": "We've been providing reliable hosting since {{company.founded}}..."
    }
  ],
  "stats": {
    "enabled": true,
    "items": [
      {
        "label": "Customers",
        "value": "2,500+",
        "icon": "fas fa-users"
      },
      {
        "label": "Uptime",
        "value": "99.99%",
        "icon": "fas fa-chart-line"
      }
    ]
  }
}
```

### Datacenter Configuration

Datacenters are configured in `config/global.json` under the `datacenters` array. They automatically appear on your homepage and network page.

**Example Datacenter Configuration:**
```json
{
  "datacenters": [
    {
      "id": "dtw",
      "city": "Detroit",
      "state": "Michigan",
      "stateCode": "MI",
      "tier": 3,
      "available": true
    },
    {
      "id": "chi",
      "city": "Chicago",
      "state": "Illinois",
      "stateCode": "IL",
      "tier": 3,
      "available": true
    }
  ]
}
```

**Datacenter Fields:**
- `id` - Unique identifier (e.g., airport code or city abbreviation)
- `city` - City name
- `state` - Full state name
- `stateCode` - Two-letter state code
- `tier` - Datacenter tier level (1, 2, 3, or 4)
- `available` - Set to `true` to show, `false` to hide

**Dynamic Variable:**
- Use `{{datacenters.count}}` or `{{datacenters.length}}` to show the number of datacenters

### External Links Configuration

Configure external services in `config/global.json`:

```json
{
  "externalLinks": {
    "knowledgeBase": "https://support.yourcompany.com",
    "clientPortal": "https://portal.yourcompany.com"
  }
}
```

These links are used throughout the site:
- `/knowledge-base` page redirects to your knowledge base URL
- `/client-portal` page redirects to your client portal URL
- Navigation menus automatically use these URLs

### JSON Validation Best Practices

**Always validate your JSON before building!**

Common JSON mistakes to avoid:

1. **Missing Commas:**
   ```json
   // ❌ Wrong
   {
     "name": "value"
     "other": "value"
   }

   // ✅ Correct
   {
     "name": "value",
     "other": "value"
   }
   ```

2. **Trailing Commas (not allowed in JSON):**
   ```json
   // ❌ Wrong
   {
     "items": [
       "item1",
       "item2",
     ]
   }

   // ✅ Correct
   {
     "items": [
       "item1",
       "item2"
     ]
   }
   ```

3. **Single Quotes (must use double quotes):**
   ```json
   // ❌ Wrong
   {
     'name': 'value'
   }

   // ✅ Correct
   {
     "name": "value"
   }
   ```

**Validation Tools:**
- **Online:** https://jsonlint.com/
- **VS Code:** Install "JSON Tools" extension
- **Command Line:** `cat config/global.json | jq` (if jq is installed)

**Tip:** Most modern code editors (VS Code, Sublime Text, etc.) will highlight JSON errors automatically!

### Google Analytics Configuration

Enable Google Analytics tracking by editing the `analytics` section in `config/global.json`:

**Disable Analytics (Default):**
```json
{
  "analytics": {
    "enabled": false,
    "googleAnalyticsId": "",
    "googleTagManagerId": ""
  }
}
```

**Enable Google Analytics 4 (GA4):**
```json
{
  "analytics": {
    "enabled": true,
    "googleAnalyticsId": "G-XXXXXXXXXX",
    "googleTagManagerId": ""
  }
}
```

**Enable Google Tag Manager:**
```json
{
  "analytics": {
    "enabled": true,
    "googleAnalyticsId": "",
    "googleTagManagerId": "GTM-XXXXXXX"
  }
}
```

**Enable Both:**
```json
{
  "analytics": {
    "enabled": true,
    "googleAnalyticsId": "G-XXXXXXXXXX",
    "googleTagManagerId": "GTM-XXXXXXX"
  }
}
```

**How to get your tracking IDs:**
1. **Google Analytics 4 (GA4):**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a new property or select existing
   - Go to Admin → Data Streams → Your website
   - Copy the Measurement ID (starts with "G-")

2. **Google Tag Manager:**
   - Go to [Google Tag Manager](https://tagmanager.google.com/)
   - Create a container or select existing
   - Copy the Container ID (starts with "GTM-")

**Privacy Note:** Remember to update your Privacy Policy (`config/privacy-policy.md`) when enabling analytics to comply with GDPR, CCPA, and other privacy regulations.

---

## 🎨 Using Font Awesome Icons

Your website supports Font Awesome icons throughout the configuration files. Icons can be used in stats, features, navigation, and more!

### Where to Find Icons

Visit **[Font Awesome Icon Library](https://fontawesome.com/search?o=r&m=free)** to browse thousands of free icons.

**Direct link:** https://fontawesome.com/search?o=r&m=free

### How to Use Icons

1. **Browse the Font Awesome website** for an icon you like
2. **Click on the icon** to see its details
3. **Copy the class name** (e.g., `fa-solid fa-server`, `fa-regular fa-users`, `fa-brands fa-facebook`)
4. **Use in your configuration** by pasting the class name

### Icon Class Format

Font Awesome icons use a two-part class format:

```
[style] [icon-name]
```

**Available Styles:**
- `fa-solid` or `fas` - Solid icons (most common)
- `fa-regular` or `far` - Regular/outlined icons
- `fa-brands` or `fab` - Brand logos (Facebook, Twitter, etc.)

**Examples:**
- `fa-solid fa-server` or `fas fa-server` - Server icon (solid)
- `fa-solid fa-users` or `fas fa-users` - Users icon (solid)
- `fa-brands fa-facebook` or `fab fa-facebook` - Facebook logo
- `fa-regular fa-circle-check` or `far fa-circle-check` - Check circle (outlined)

### Using Icons in Configuration

#### Stats Section (Page Configs)

Add icons to statistics displays in your page configuration files:

```json
{
  "stats": {
    "enabled": true,
    "items": [
      {
        "label": "Active Customers",
        "value": "2,500+",
        "icon": "fas fa-users"
      },
      {
        "label": "Uptime",
        "value": "99.99%",
        "icon": "fas fa-chart-line"
      },
      {
        "label": "Servers Deployed",
        "value": "10,000+",
        "icon": "fas fa-server"
      },
      {
        "label": "Support Response",
        "value": "< 15 min",
        "icon": "fas fa-headset"
      }
    ]
  }
}
```

#### Social Media Links (global.json)

Social media icons are automatically used based on the platform:

```json
{
  "social": {
    "facebook": "https://facebook.com/yourcompany",
    "twitter": "https://twitter.com/yourcompany",
    "linkedin": "https://linkedin.com/company/yourcompany",
    "instagram": "https://instagram.com/yourcompany"
  }
}
```

The website automatically uses:
- Facebook → `fab fa-facebook`
- Twitter → `fab fa-twitter`
- LinkedIn → `fab fa-linkedin`
- Instagram → `fab fa-instagram`
- YouTube → `fab fa-youtube`

#### Features with Icons

Add icons to feature lists for visual appeal:

```json
{
  "features": [
    {
      "title": "24/7 Support",
      "icon": "fas fa-headset",
      "description": "Round-the-clock technical assistance"
    },
    {
      "title": "DDoS Protection",
      "icon": "fas fa-shield-halved",
      "description": "Enterprise-grade security"
    },
    {
      "title": "Fast Deployment",
      "icon": "fas fa-rocket",
      "description": "Instant server provisioning"
    }
  ]
}
```

### Popular Icons for Hosting Websites

Here are commonly used icons for hosting and infrastructure websites:

**Infrastructure & Servers:**
- `fas fa-server` - Server
- `fas fa-database` - Database
- `fas fa-cloud` - Cloud
- `fas fa-network-wired` - Network
- `fas fa-hdd` - Hard drive/Storage

**Performance & Monitoring:**
- `fas fa-gauge-high` - Performance/Speed
- `fas fa-chart-line` - Growth/Statistics
- `fas fa-bolt` - Lightning/Fast
- `fas fa-rocket` - Fast deployment
- `fas fa-diagram-project` - Infrastructure

**Security & Protection:**
- `fas fa-shield-halved` - Security/Shield
- `fas fa-lock` - Secure/Locked
- `fas fa-user-shield` - Protected users
- `fas fa-key` - Access/Security

**Support & Service:**
- `fas fa-headset` - Support/Help
- `fas fa-users` - Customers/Team
- `fas fa-phone` - Phone support
- `fas fa-envelope` - Email contact
- `fas fa-comments` - Communication

**Business & Success:**
- `fas fa-trophy` - Achievement
- `fas fa-star` - Rating/Quality
- `fas fa-circle-check` - Verified/Approved
- `fas fa-award` - Certification
- `fas fa-thumbs-up` - Satisfaction

**Location & Datacenter:**
- `fas fa-building` - Building/Datacenter
- `fas fa-map-marker-alt` - Location
- `fas fa-globe` - Global/World
- `fas fa-map-pin` - Location pin

### Tips for Choosing Icons

1. **Keep it consistent** - Use icons from the same style (all solid or all regular)
2. **Make them relevant** - Choose icons that clearly represent the feature
3. **Don't overuse** - Too many icons can be distracting
4. **Test the look** - Build and preview to ensure icons look good
5. **Use brand icons** for social media only (Facebook, Twitter, etc.)

### Icon Troubleshooting

**Problem:** Icon not showing (shows empty box or nothing)

**Solution:**
1. Check the icon name is spelled correctly
2. Verify the icon exists on Font Awesome (free tier only)
3. Make sure you're using the correct style prefix (`fas`, `far`, `fab`)
4. Rebuild the website: `./build.sh`

**Problem:** Wrong icon appears

**Solution:**
- Double-check the icon class name on the Font Awesome website
- Some icons have similar names but different meanings

---

## 🔧 Template Variables

Use dynamic variables in your configuration files to automatically pull data from `global.json`. This keeps your content consistent and easy to update.

### Company Variables

| Variable | Example Output | Description |
|----------|---------------|-------------|
| `{{company.name}}` | Interconnecx LLC | Full company name |
| `{{company.shortName}}` | INCX | Short company name |
| `{{company.tagline}}` | Enterprise Infrastructure Solutions | Company tagline |
| `{{company.founded}}` | 2009 | Year founded |
| `{{company.ein}}` | 46-4127819 | Tax ID number |
| `{{company.asNumber}}` | AS13737 | Autonomous System Number |

### Contact Variables

| Variable | Example Output |
|----------|---------------|
| `{{contact.phone}}` | +1-313-505-0000 |
| `{{contact.phoneDisplay}}` | (313) 505-0000 |
| `{{contact.email}}` | sales@incx.net |
| `{{contact.supportEmail}}` | support@incx.net |
| `{{contact.address.street}}` | 6855 Middlebelt Rd |
| `{{contact.address.city}}` | Romulus |
| `{{contact.address.state}}` | Michigan |
| `{{contact.address.stateCode}}` | MI |
| `{{contact.address.zip}}` | 48174 |
| `{{contact.address.country}}` | United States |
| `{{contact.hours.support}}` | 24/7/365 |
| `{{contact.hours.sales}}` | Monday-Friday 9AM-6PM EST |

### Network Variables

| Variable | Example Output |
|----------|---------------|
| `{{network.bandwidth}}` | 100Gbps |
| `{{network.bandwidthType}}` | Unmetered |
| `{{network.uptime}}` | 99.99% |
| `{{network.ddosProtection}}` | 500Gbps |
| `{{network.ipv4Included}}` | 5 IPs (/29) |
| `{{network.ipv6Included}}` | /64 |

### Hardware Variables

| Variable | Example Output |
|----------|---------------|
| `{{hardware.defaultBrand}}` | Dell |

### Feature Variables

| Variable | Example Output |
|----------|---------------|
| `{{features.support.availability}}` | 24/7/365 |
| `{{features.support.responseTime}}` | 15 minutes |
| `{{features.guarantees.networkUptime}}` | 99.99% |
| `{{features.guarantees.powerUptime}}` | 100% |

### Social Media Variables

| Variable | Example Output |
|----------|---------------|
| `{{social.twitter}}` | https://twitter.com/interconnecx |
| `{{social.facebook}}` | https://facebook.com/interconnecx |
| `{{social.linkedin}}` | https://linkedin.com/company/interconnecx |

### External Link Variables

| Variable | Example Output |
|----------|---------------|
| `{{externalLinks.knowledgeBase}}` | https://incx.tawk.help/ |
| `{{externalLinks.clientPortal}}` | https://clients.incx.net |

### Legal Variables

| Variable | Example Output |
|----------|---------------|
| `{{legal.termsUrl}}` | /terms |
| `{{legal.privacyUrl}}` | /privacy |
| `{{legal.slaUrl}}` | /sla |
| `{{legal.aupUrl}}` | /aup |

### Branding Variables

| Variable | Example Output |
|----------|---------------|
| `{{branding.primaryColor}}` | #3B82F6 |
| `{{branding.secondaryColor}}` | #10B981 |
| `{{branding.logo}}` | /images/incx_logo.svg |
| `{{branding.favicon}}` | /images/favicon.png |

### Build Variables (Auto-Generated)

These variables are automatically generated at build time:

| Variable | Example Output | Description |
|----------|---------------|-------------|
| `{{build.date}}` | January 13, 2025 | Current date (formatted) |
| `{{build.year}}` | 2025 | Current year |
| `{{build.timestamp}}` | 1705132800000 | Unix timestamp |
| `{{build.version}}` | 1.0.1 | From global.json |

### Using Variables

You can use these variables anywhere in your JSON configuration files or markdown content:

**In JSON files:**
```json
{
  "title": "Welcome to {{company.name}}",
  "description": "Founded in {{company.founded}}, we offer {{network.uptime}} uptime with {{network.bandwidth}} bandwidth.",
  "footer": "© {{build.year}} {{company.name}}. All rights reserved."
}
```

**In Markdown files** (legal pages):
```markdown
# Terms of Service

Last Updated: {{build.date}}

Welcome to {{company.name}}. By using our services, you agree to these terms.

For support, contact us at {{contact.supportEmail}} or call {{contact.phoneDisplay}}.

Our network uptime guarantee is {{network.uptime}}.
```

### Variable Best Practices

1. **Use variables for data that appears multiple times**
   - Company name, contact info, network specs

2. **Update once in global.json, reflects everywhere**
   - Change phone number in one place
   - Updates across all pages automatically

3. **Use build variables for dynamic content**
   - Copyright year auto-updates
   - "Last updated" dates stay current

---

## 📄 Markdown Support for Legal Pages

Legal pages (Terms of Service, Privacy Policy, SLA, AUP) support **Markdown** for easier editing!

### Location

Legal content is stored as Markdown files in the `config/` folder:
- `config/terms-of-service.md`
- `config/privacy-policy.md`
- `config/service-level-agreement.md`
- `config/acceptable-use-policy.md`

### Markdown Features Supported

#### Headings
```markdown
# Main Heading
## Section Heading
### Subsection Heading
```

#### Lists
```markdown
- Unordered list item
- Another item
  - Nested item

1. Ordered list item
2. Another item
```

#### Text Formatting
```markdown
**Bold text**
*Italic text*
`code or technical terms`
```

#### Links
```markdown
[Link text](https://example.com)
[Email us](mailto:{{contact.email}})
```

#### Sections
```markdown
---
(Horizontal rule for section breaks)
```

### Using Variables in Markdown

Template variables work in Markdown files too!

```markdown
# Terms of Service

**Effective Date:** {{build.date}}

Welcome to {{company.name}} ("Company", "we", "our", "us").

## Contact Information

For questions about these terms, contact us:
- Email: {{contact.email}}
- Phone: {{contact.phoneDisplay}}
- Address: {{contact.address.street}}, {{contact.address.city}}, {{contact.address.state}} {{contact.address.zip}}

## Service Level Agreement

We guarantee {{network.uptime}} network uptime as part of our commitment to quality service.

---

© {{build.year}} {{company.name}}. All rights reserved.
```

### Editing Legal Pages

1. Open the Markdown file (e.g., `config/terms-of-service.md`)
2. Edit using any text editor
3. Use Markdown formatting for structure
4. Use template variables for dynamic content
5. Run `./build.sh` to generate the updated pages

**Tip:** Markdown is much easier to read and edit than HTML, making legal documents simpler to maintain!

---

## 🚀 Deployment

Deploy the contents of your build folder to your web server.

### What to Deploy

**Default build:**
- Deploy everything in the `www/` folder

**Custom WEB_ROOT:**
- Deploy everything in your custom folder (e.g., `html/`, `public_html/`)

### Deployment Methods

#### Traditional Web Server (Apache/Nginx)

1. **FTP/SFTP Upload:**
   ```bash
   # Using SCP
   scp -r www/* user@yourserver.com:/var/www/html/

   # Using rsync
   rsync -avz www/ user@yourserver.com:/var/www/html/
   ```

2. **Direct on Server:**
   ```bash
   # SSH into your server
   ssh user@yourserver.com

   # Clone/upload your project
   # Run build with correct WEB_ROOT
   WEB_ROOT=/var/www/html ./build.sh
   ```

#### cPanel / Traditional Hosting

1. Build locally: `./build.sh`
2. Upload `www/` contents via FTP to `public_html` folder
3. Done!

#### Cloud Storage (AWS S3, Google Cloud Storage)

```bash
# AWS S3
aws s3 sync www/ s3://your-bucket-name/ --delete

# With CloudFront invalidation
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

#### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd www
netlify deploy --prod
```

#### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd www
vercel --prod
```

### Post-Deployment Checklist

- ✅ Visit your live site URL
- ✅ Test all navigation links
- ✅ Verify contact information
- ✅ Check forms work (if applicable)
- ✅ Test on mobile devices
- ✅ Verify SSL certificate (HTTPS)

---

## 📊 Performance & SEO

Your website is built for speed and search engine optimization.

### Current Lighthouse Scores

- **Performance:** 100 (Desktop) / 89+ (Mobile)
- **Accessibility:** 96-100
- **Best Practices:** 100
- **SEO:** 100

### Built-In Optimizations

- ✅ Static site generation (no server-side processing)
- ✅ Optimized images with lazy loading
- ✅ Minified CSS and JavaScript
- ✅ Proper semantic HTML5
- ✅ SEO-friendly meta tags on every page
- ✅ Fast page load times (<2 seconds)
- ✅ Mobile-responsive design
- ✅ Core Web Vitals optimized

### SEO Features

- Automatic meta descriptions from page config
- Open Graph tags for social sharing
- Proper heading hierarchy (H1, H2, H3)
- Descriptive alt text on images
- Clean, semantic URLs
- XML sitemap (auto-generated)

---

## 🔍 Troubleshooting

### Build Script Issues

**Problem:** `./build.sh: Permission denied`

**Solution:**
```bash
chmod +x build.sh
./build.sh
```

---

**Problem:** "Node.js not found"

**Solution:** Run `./build.sh` and answer "yes" when prompted to install Node.js. The script will install it automatically for:
- Ubuntu/Debian (via apt)
- CentOS/RHEL (via yum)
- macOS (via Homebrew)

---

**Problem:** "npm install failed"

**Solution:**

First, try running the build script again - it handles most issues automatically:
```bash
./build.sh
```

If the problem persists, try clearing the npm cache:
```bash
cd next
rm -rf node_modules package-lock.json
npm cache clean --force
cd ..

# Then run build script again
./build.sh
```

---

### Configuration Issues

**Problem:** Changes not showing after rebuild

**Solution:**
1. Make sure you edited files in the `config/` folder (not in `next/src/`)
2. Run `./build.sh` to rebuild completely
3. Re-deploy the `www/` folder (or your WEB_ROOT) to your web server
4. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
5. Check browser console (F12) for any JavaScript errors
6. Verify JSON files are valid using https://jsonlint.com/

---

**Problem:** Variable not working (shows `{{variable.name}}` on page)

**Solution:**
1. Check variable name matches exactly (case-sensitive)
2. Verify the variable exists in `global.json`
3. Rebuild: `./build.sh`
4. For nested variables, use dot notation: `{{contact.address.city}}`

---

**Problem:** JSON syntax error when building

**Solution:**
1. Check for missing commas between items
2. Check for trailing commas (not allowed in JSON)
3. Verify all quotes are double quotes `"`
4. Use a JSON validator: https://jsonlint.com/
5. Common mistakes:
   ```json
   // ❌ Wrong
   {
     "name": "value"
     "other": "value"  // Missing comma
   }

   // ✅ Correct
   {
     "name": "value",
     "other": "value"
   }
   ```

---

**Problem:** Products not showing on home page

**Solution:**
1. Set `"featured": true` in the product configuration
2. Verify the product is in the correct category in `products.json`
3. Check that `products.json` is valid JSON
4. Rebuild: `./build.sh`
5. Clear browser cache

---

**Problem:** Testimonials not appearing

**Solution:**
1. Set `"featured": true` for testimonials to show on homepage
2. Limit to 3 featured testimonials for best display
3. Verify `rating` is between 1-5
4. Check `testimonials.json` is valid JSON
5. Ensure `service` field matches your product categories
6. Rebuild and clear cache

---

### Deployment Issues

**Problem:** Site shows blank page after deployment

**Solution:**
1. Check that you uploaded ALL files from `www/` folder (including hidden files like `.htaccess`)
2. Verify file permissions (typically 644 for files, 755 for folders)
3. Check server error logs

---

**Problem:** Images not loading

**Solution:**
1. Verify images exist in `next/public/images/`
2. Check image paths in config files start with `/images/`
3. Rebuild and redeploy
4. Check file names match exactly (case-sensitive on Linux servers)

---

**Problem:** 404 errors on page navigation

**Solution:**

For Apache, create/update `.htaccess` in your web root:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [L]
</IfModule>
```

For Nginx, update your config:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

---

## 📚 Project Structure

Understanding the project layout:

```
incx.net/
│
├── build.sh                      # Main build script - RUN THIS!
│
├── config/                       # 👈 EDIT THESE FILES
│   ├── global.json              # Company info, contact, network
│   ├── products.json            # VPS, servers, colocation plans
│   ├── testimonials.json        # Customer reviews
│   ├── terms-of-service.md      # Legal: Terms (Markdown)
│   ├── privacy-policy.md        # Legal: Privacy (Markdown)
│   ├── service-level-agreement.md  # Legal: SLA (Markdown)
│   ├── acceptable-use-policy.md # Legal: AUP (Markdown)
│   └── pages/                   # Individual page configurations
│       ├── home.json
│       ├── vps.json
│       ├── dedicated-servers.json
│       ├── colocation.json
│       ├── about.json
│       ├── contact.json
│       ├── network.json
│       └── testimonials.json
│
├── next/                        # Next.js application (don't edit)
│   ├── src/                     # Source code
│   │   ├── app/                # Page components
│   │   ├── components/         # Reusable components
│   │   └── lib/                # Config loader & utilities
│   ├── public/                  # Static assets
│   │   ├── images/             # Logo, photos, icons
│   │   └── fonts/              # Web fonts
│   └── package.json            # Dependencies
│
└── www/                         # 👈 DEPLOY THIS FOLDER
    └── (Built website files - auto-generated)
```

### Key Directories

**`config/`** - Your content lives here
- Edit JSON and Markdown files
- No coding knowledge required
- This is where you make all changes

**`next/`** - The application code
- **DO NOT EDIT** - Leave this folder alone
- Only for advanced developers
- The build script manages everything in here automatically
- You never need to cd into this folder

**`www/`** (or your custom `WEB_ROOT`)
- Auto-generated when you run `./build.sh`
- Contains your ready-to-deploy website
- Upload this folder to your web server

### Simple Workflow

1. Edit files in `config/` folder only
2. Run `./build.sh` from project root
3. Deploy `www/` folder
4. Done!

**You never need to touch the `next/` folder!**

---

## ⚠️ Important Notes

### File Editing Guidelines

1. **ONLY edit files in the `config/` folder**
   - Never modify files in `next/src/` directly
   - All content changes should be made in JSON or Markdown files

2. **Always validate JSON before building**
   - Use https://jsonlint.com/ to check for errors
   - Most code editors highlight JSON errors automatically

3. **Use template variables for repeated content**
   - Company name, phone, email should use variables
   - Update once in `global.json`, reflects everywhere

4. **Image paths must start with `/images/`**
   - Correct: `/images/logo.svg`
   - Wrong: `images/logo.svg` or `./images/logo.svg`

5. **Keep unique IDs for all items**
   - Product IDs: `vps-starter`, `server-e3-1270`
   - Testimonial IDs: `review-001`, `review-002`
   - Datacenter IDs: `dtw`, `chi`, `nyc`

### Build & Deploy Workflow

1. **Make changes** to files in `config/` folder
2. **Validate JSON** using jsonlint.com or your editor
3. **Run build**: `./build.sh` (from project root)
4. **Deploy** the `www/` folder (or your WEB_ROOT) to your web server

That's it! Simple and straightforward.

### Configuration Best Practices

1. **Backup before major changes**
   - Keep copies of working configuration files
   - Use git for version control

2. **Test incrementally**
   - Make small changes and test
   - Don't change multiple things at once

3. **Clear browser cache after builds**
   - Use Ctrl+Shift+R (Windows/Linux)
   - Use Cmd+Shift+R (Mac)

4. **Keep documentation updated**
   - Document custom changes you make
   - Note any special configuration

5. **Use consistent naming**
   - Follow existing naming patterns
   - Use lowercase with hyphens for IDs

### SEO & Performance Tips

1. **Always fill out meta tags** in page configs
   - Title, description, keywords for each page

2. **Optimize images before uploading**
   - Use WebP format when possible
   - Compress images to reduce file size

3. **Keep content fresh**
   - Update dates in legal documents
   - Add new testimonials regularly
   - Update product offerings

4. **Use descriptive alt text** for images
   - Helps with accessibility and SEO

## 💡 Common Workflows

### Updating Prices

1. Open `config/products.json`
2. Find the product by `id`
3. Update the `price` field
4. Run `./build.sh`
5. Deploy the updated `www/` folder

### Adding a New Product

1. Open `config/products.json`
2. Copy an existing product block
3. Change the `id` to be unique
4. Update name, price, specs, features
5. Run `./build.sh`
6. Deploy

### Changing Contact Information

1. Open `config/global.json`
2. Update the `contact` section
3. Run `./build.sh`
4. All pages automatically update with new contact info!

### Adding a Customer Testimonial

1. Open `config/testimonials.json`
2. Add a new testimonial object:
   ```json
   {
     "id": "review-new",
     "author": "Jane Doe",
     "company": "Example Corp",
     "rating": 5,
     "date": "2025-01-15",
     "text": "Outstanding service!",
     "featured": true
   }
   ```
3. Run `./build.sh`
4. Deploy

### Updating Legal Documents

1. Open the Markdown file (e.g., `config/terms-of-service.md`)
2. Edit using Markdown formatting
3. Use template variables for dynamic content
4. Run `./build.sh`
5. Deploy

### Preparing for Deployment

1. Make all your configuration changes
2. Run `./build.sh` (or `WEB_ROOT=html ./build.sh` for custom output)
3. Deploy the `www/` folder (or your custom WEB_ROOT) to your server

---

## 🎓 Tips & Best Practices

### Configuration Tips

1. **Always validate JSON before building**
   - Use an online JSON validator if unsure
   - Most editors can highlight JSON errors

2. **Use template variables consistently**
   - Avoid hardcoding company name, phone, etc.
   - Update once in `global.json`, reflects everywhere

3. **Keep IDs unique**
   - Product IDs, testimonial IDs, datacenter IDs
   - Use descriptive names: `vps-starter`, `server-e3-1270`

4. **Test after every change**
   - Build and test locally before deploying
   - Catch errors early

### Build Tips

1. **Set WEB_ROOT permanently if needed**
   - Saves time if you always deploy to same folder
   - Add to `~/.bashrc` or `~/.zshrc`

2. **Build script is smart**
   - Automatically handles dependencies
   - Safe to run multiple times
   - Can run on any Linux server

3. **Version control your config**
   - Keep backups of your JSON files
   - Track changes over time

### Deployment Tips

1. **Keep a backup**
   - Save your current live site before uploading new version
   - Easy to rollback if needed

2. **Deploy during low traffic**
   - Minimize impact on users
   - Usually late evening or early morning

3. **Clear CDN cache if using one**
   - Cloudflare, CloudFront, etc.
   - Ensures users see the latest version

4. **Test on production**
   - After deploying, visit your live site
   - Check all pages and functionality
   - Clear browser cache to see latest changes

---

## 🆘 Getting Help

### Self-Service Resources

1. **This README**
   - Complete configuration reference
   - Troubleshooting guide
   - Common workflows

2. **JSON Configuration Files**
   - Examples in every file
   - Well-structured and commented

3. **Template Variable Reference**
   - See "Template Variables" section above
   - Complete list with examples

### Still Need Help?

Contact your development team with:
- Description of what you're trying to do
- Error messages (if any)
- Which configuration file you're editing
- Your operating system

---

## ⚙️ Technical Details

### Requirements

- **Node.js:** 18.x or higher
- **npm:** 9.x or higher (included with Node.js)
- **Operating System:** Linux, macOS, or Windows

**Don't have these?** The `build.sh` script will install them automatically on:
- Ubuntu/Debian
- CentOS/RHEL
- macOS (requires Homebrew)

### Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Rendering:** Static Site Generation (SSG)
- **Markdown:** react-markdown with Tailwind components
- **Build Tool:** Next.js compiler (Turbopack)
- **Output:** 100% static HTML/CSS/JS (no server required)

### Build Process

1. Loads configuration from `config/` folder
2. Processes template variables
3. Renders Markdown content to HTML
4. Generates static pages
5. Optimizes assets (images, CSS, JS)
6. Outputs to `WEB_ROOT` folder (default: `www/`)

### Performance Features

- Static site generation (no database, no server processing)
- Lazy loading for images
- Code splitting for faster initial load
- Minified and compressed assets
- Optimized fonts and images
- Critical CSS inlining

---

## 📄 License

© 2025 Interconnecx LLC. All rights reserved.

---

## 🎉 You're Ready!

You now have everything you need to manage your website:

1. ✅ Edit JSON files in `config/` folder
2. ✅ Run `./build.sh` to build
3. ✅ Deploy `www/` folder (or your WEB_ROOT) to your server

**No coding required. No complex tools. Just edit, build, and deploy!**

**Pro Tip:** Set `WEB_ROOT` in your `~/.bashrc` to build directly to your server's document root every time!

---

*Built with modern web technologies for maximum performance, security, and search engine visibility.*
