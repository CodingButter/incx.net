import globalConfig from '@config/global.json';
import productsConfig from '@config/products.json';
import testimonialsConfig from '@config/testimonials.json';

// Types
export interface GlobalConfig {
  version?: string;
  company: {
    name: string;
    shortName: string;
    tagline: string;
    founded: string;
    ein: string;
    asNumber: string;
  };
  contact: {
    phone: string;
    phoneDisplay: string;
    email: string;
    supportEmail: string;
    address: {
      street: string;
      city: string;
      state: string;
      stateCode: string;
      zip: string;
      country: string;
    };
    hours: {
      support: string;
      sales: string;
    };
  };
  network: {
    bandwidth: string;
    bandwidthType: string;
    uptime: string;
    ddosProtection: string;
    carriers: string[];
    ipv4Included: string;
    ipv6Included: string;
  };
  hardware: {
    brands: string[];
    defaultBrand: string;
    management: string[];
  };
  datacenters: Array<{
    id: string;
    city: string;
    state: string;
    stateCode: string;
    tier: number;
    available: boolean;
    primary?: boolean;
  }>;
  features: {
    support: {
      availability: string;
      responseTime: string;
      channels: string[];
    };
    billing: {
      cycles: string[];
      setupFees: boolean;
      contractRequired: boolean;
      paymentMethods: string[];
    };
    guarantees: {
      networkUptime: string;
      powerUptime: string;
      hardwareUptime: string;
    };
  };
  social: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    github?: string;
  };
  navigation: {
    mainMenu: Array<{
      label: string;
      href: string;
    }>;
    clientPortalText: string;
    clientPortalLink: string;
  };
  legal: {
    termsUrl: string;
    privacyUrl: string;
    slaUrl: string;
    aupUrl?: string;
  };
  externalLinks?: {
    knowledgeBase?: string;
    clientPortal?: string;
  };
  branding: {
    primaryColor: string;
    secondaryColor: string;
    logo: string;
    favicon: string;
  };
  analytics?: {
    enabled: boolean;
    googleAnalyticsId?: string;
    googleTagManagerId?: string;
  };
}

export interface PageConfig {
  meta?: {
    title: string;
    description: string;
    keywords?: string;
  };
  hero?: {
    headline?: string;
    title?: string;
    subheadline?: string;
    subtitle?: string;
    description?: string;
    image?: string;
    bullets?: string[];
    features?: string[];
    primaryCTA?: {
      text: string;
      link: string;
      icon?: string;
    };
    secondaryCTA?: {
      text: string;
      link: string;
      icon?: string;
    };
  };
  stats?: {
    enabled: boolean;
    items: Array<{
      value: string;
      label: string;
      icon: string;
    }>;
  };
  features?: {
    headline?: string;
    subheadline?: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  story?: {
    title: string;
    content: string[];
  };
  [key: string]: any; // Allow any additional properties from config
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number | null;
  billingCycle: string;
  featured: boolean;
  image?: string | null;
  specifications: Record<string, string>;
  features: string[];
  locations: string[];
  available: boolean;
  setupTime: string;
  ctaText: string;
  ctaLink: string;
}

export interface ProductCategory {
  name: string;
  description: string;
  icon: string;
  products: Product[];
}

// Get build-time variables
export function getBuildVariables() {
  const now = new Date();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const year = now.getFullYear();
  const month = monthNames[now.getMonth()];
  const monthNumber = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const global = getGlobalConfig();

  return {
    build: {
      // Date components
      year: String(year),
      month: month,
      monthNumber: monthNumber,
      day: day,

      // Formatted dates
      date: `${month} ${parseInt(day)}, ${year}`,
      dateShort: `${monthNumber}/${day}/${year}`,

      // Time
      time: `${hours}:${minutes}:${seconds}`,
      timestamp: now.toISOString(),

      // Build metadata
      version: global.version || '1.0.0',
      environment: process.env.NODE_ENV || 'production',
    }
  };
}

// Get global config
export function getGlobalConfig(): GlobalConfig {
  return globalConfig as GlobalConfig;
}

// Get products by category
export function getProducts(category: string): Product[] {
  const products = productsConfig as { categories: Record<string, ProductCategory> };
  return products.categories[category]?.products || [];
}

// Get all product categories
export function getProductCategories(): Record<string, ProductCategory> {
  const products = productsConfig as { categories: Record<string, ProductCategory> };
  return products.categories;
}

// Template variable replacement
export function replaceTemplateVars(text: string, config: GlobalConfig, buildVars?: any): string {
  let result = text;

  // Get build variables if not provided
  const build = buildVars || getBuildVariables();

  // Replace company variables
  result = result.replace(/\{\{company\.name\}\}/g, config.company.name);
  result = result.replace(/\{\{company\.shortName\}\}/g, config.company.shortName);
  result = result.replace(/\{\{company\.founded\}\}/g, config.company.founded);
  result = result.replace(/\{\{company\.tagline\}\}/g, config.company.tagline);
  result = result.replace(/\{\{company\.asNumber\}\}/g, config.company.asNumber);

  // Replace network variables
  result = result.replace(/\{\{network\.bandwidth\}\}/g, config.network.bandwidth);
  result = result.replace(/\{\{network\.bandwidthType\}\}/g, config.network.bandwidthType);
  result = result.replace(/\{\{network\.uptime\}\}/g, config.network.uptime);
  result = result.replace(/\{\{network\.ddosProtection\}\}/g, config.network.ddosProtection);
  result = result.replace(/\{\{network\.carriers\.length\}\}/g, config.network.carriers.length.toString());

  // Replace hardware variables
  result = result.replace(/\{\{hardware\.defaultBrand\}\}/g, config.hardware.defaultBrand);
  result = result.replace(/\{\{hardware\.management\[0\]\}\}/g, config.hardware.management[0] || 'IPMI');

  // Replace contact variables
  result = result.replace(/\{\{contact\.phone\}\}/g, config.contact.phone);
  result = result.replace(/\{\{contact\.phoneDisplay\}\}/g, config.contact.phoneDisplay);
  result = result.replace(/\{\{contact\.email\}\}/g, config.contact.email);
  result = result.replace(/\{\{contact\.supportEmail\}\}/g, config.contact.supportEmail);
  result = result.replace(/\{\{contact\.address\.street\}\}/g, config.contact.address.street);
  result = result.replace(/\{\{contact\.address\.city\}\}/g, config.contact.address.city);
  result = result.replace(/\{\{contact\.address\.state\}\}/g, config.contact.address.state);
  result = result.replace(/\{\{contact\.address\.stateCode\}\}/g, config.contact.address.stateCode);
  result = result.replace(/\{\{contact\.address\.zip\}\}/g, config.contact.address.zip);
  result = result.replace(/\{\{contact\.hours\.sales\}\}/g, config.contact.hours.sales);
  result = result.replace(/\{\{contact\.hours\.support\}\}/g, config.contact.hours.support);

  // Replace support variables (aliases)
  result = result.replace(/\{\{support\.availability\}\}/g, config.contact.hours.support);
  result = result.replace(/\{\{support\.responseTime\}\}/g, '15 minutes');

  // Replace datacenter count
  result = result.replace(/\{\{datacenters\.count\}\}/g, config.datacenters.length.toString());

  // Replace build variables
  result = result.replace(/\{\{build\.year\}\}/g, build.build.year);
  result = result.replace(/\{\{build\.month\}\}/g, build.build.month);
  result = result.replace(/\{\{build\.monthNumber\}\}/g, build.build.monthNumber);
  result = result.replace(/\{\{build\.day\}\}/g, build.build.day);
  result = result.replace(/\{\{build\.date\}\}/g, build.build.date);
  result = result.replace(/\{\{build\.dateShort\}\}/g, build.build.dateShort);
  result = result.replace(/\{\{build\.time\}\}/g, build.build.time);
  result = result.replace(/\{\{build\.timestamp\}\}/g, build.build.timestamp);
  result = result.replace(/\{\{build\.version\}\}/g, build.build.version);
  result = result.replace(/\{\{build\.environment\}\}/g, build.build.environment);

  return result;
}

// Recursively process all string values in an object
function processObjectStrings(obj: any, config: GlobalConfig, buildVars?: any): any {
  if (typeof obj === 'string') {
    return replaceTemplateVars(obj, config, buildVars);
  }

  if (Array.isArray(obj)) {
    return obj.map(item => processObjectStrings(item, config, buildVars));
  }

  if (obj && typeof obj === 'object') {
    const result: any = {};
    for (const key in obj) {
      result[key] = processObjectStrings(obj[key], config, buildVars);
    }
    return result;
  }

  return obj;
}

// Process page config with template replacement
export function processPageConfig(pageConfig: PageConfig): PageConfig {
  const global = getGlobalConfig();
  const build = getBuildVariables();
  // Deep clone and process all strings recursively
  return processObjectStrings(pageConfig, global, build);
}

// Load page config
export async function loadPageConfig(pageName: string): Promise<PageConfig> {
  try {
    const config = await import(`@config/pages/${pageName}.json`);
    return processPageConfig(config.default);
  } catch (error) {
    console.error(`Failed to load page config for ${pageName}:`, error);
    return {};
  }
}

// Testimonial interface
export interface Testimonial {
  id: string;
  name: string;
  company: string;
  position?: string;
  rating: number;
  date: string;
  service?: string;
  location?: string;
  avatar?: string | null;
  featured: boolean;
  verified?: boolean;
  title?: string;
  content: string;
  highlights?: string[];
}

// Load testimonials from config
export function getTestimonials(): Testimonial[] {
  const testimonialsData = testimonialsConfig as { testimonials: Testimonial[] };
  return testimonialsData.testimonials || [];
}

// Get featured testimonials
export function getFeaturedTestimonials(limit?: number): Testimonial[] {
  const testimonials = getTestimonials();
  const featured = testimonials.filter(t => t.featured);
  return limit ? featured.slice(0, limit) : featured;
}
