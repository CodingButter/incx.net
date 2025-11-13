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

Build to a different folder using the `WEB_ROOT` environment variable:

```bash
# One-time custom build
WEB_ROOT=html ./build.sh

# Or set it for your session
export WEB_ROOT=html
./build.sh
```

**Make it permanent** for your server:

```bash
# Add to your shell configuration
echo 'export WEB_ROOT=html' >> ~/.bashrc

# Reload configuration
source ~/.bashrc

# Now all builds use the custom directory
./build.sh
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

**Example Dedicated Server:**
```json
{
  "id": "server-e3",
  "name": "Intel Xeon E3",
  "price": 99.99,
  "billingCycle": "month",
  "featured": true,
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

### Testimonials: `config/testimonials.json`

Add customer reviews and ratings.

```json
{
  "id": "review-1",
  "author": "John Smith",
  "company": "Tech Startup Inc",
  "rating": 5,
  "date": "2024-01-15",
  "text": "Excellent service and support. Our servers have been rock solid!",
  "featured": true
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
  ]
}
```

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

Legal pages (Terms of Service, Privacy Policy, SLA) support **Markdown** for easier editing!

### Location

Legal content is stored as Markdown files in the `config/` folder:
- `config/terms-of-service.md`
- `config/privacy-policy.md`
- `config/service-level-agreement.md`

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

## 🧪 Testing Locally

After building, test your website on your local machine before deploying.

### Start Local Test Server

```bash
cd next
node serve-dist.js
```

If using a custom `WEB_ROOT`:
```bash
cd next
WEB_ROOT=html node serve-dist.js
```

### View Your Site

Open your browser to: **http://localhost:8080**

### What to Test

- ✅ All pages load correctly
- ✅ Navigation works
- ✅ Contact information is accurate
- ✅ Product prices and features are correct
- ✅ Links work (internal and external)
- ✅ Images display properly
- ✅ Mobile responsive design (resize browser)

### Stop the Test Server

Press `Ctrl+C` in the terminal

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
```bash
# Clear npm cache
cd next
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# Then try build again
cd ..
./build.sh
```

---

### Configuration Issues

**Problem:** Changes not showing after rebuild

**Solution:**
1. Make sure you edited files in the `config/` folder (not in `next/src/`)
2. Run `./build.sh` to rebuild
3. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
4. If testing locally, restart the serve-dist.js server

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

### Local Testing Issues

**Problem:** "Port 8080 already in use"

**Solution:**
```bash
# Kill process on port 8080
# On Linux/Mac:
lsof -ti:8080 | xargs kill

# Or use a different port
cd next
PORT=3000 node serve-dist.js
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
│   ├── package.json            # Dependencies
│   └── serve-dist.js           # Local test server
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
- Leave this folder alone unless you're a developer
- Contains the build tools and components

**`www/`** (or your custom `WEB_ROOT`)
- Auto-generated when you run `./build.sh`
- Contains your ready-to-deploy website
- Upload this folder to your web server

---

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
2. Run `./build.sh` (or `WEB_ROOT=html ./build.sh`)
3. Test locally:
   ```bash
   cd next
   node serve-dist.js
   # Visit http://localhost:8080
   ```
4. If everything looks good, deploy the build folder to your server

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

1. **Always test locally first**
   - Use `node serve-dist.js` to preview
   - Check all pages before going live

2. **Keep a backup**
   - Save your current live site before uploading new version
   - Easy to rollback if needed

3. **Deploy during low traffic**
   - Minimize impact on users
   - Usually late evening or early morning

4. **Clear CDN cache if using one**
   - Cloudflare, CloudFront, etc.
   - Ensures users see the latest version

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
3. ✅ Test with `node serve-dist.js`
4. ✅ Deploy `www/` folder to your server

**No coding required. No complex tools. Just edit, build, and deploy!**

---

*Built with modern web technologies for maximum performance, security, and search engine visibility.*
