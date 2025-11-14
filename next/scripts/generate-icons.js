const fs = require('fs');
const path = require('path');

// Directories to scan for icon usage
const CONFIG_DIRS = [
  path.join(__dirname, '../src/data/config'),
  path.join(__dirname, '../src/data/config/pages')
];

// Directories to scan for hardcoded icons in components
const COMPONENT_DIRS = [
  path.join(__dirname, '../src/components'),
  path.join(__dirname, '../src/app')
];

// Map icon names to their import names (handling special cases)
const iconNameToImport = {
  'check-circle': 'faCheckCircle',
  'dollar-sign': 'faDollarSign',
  'map-marker-alt': 'faMapMarkerAlt',
  'map-pin': 'faMapPin',
  'tachometer-alt': 'faTachometerAlt',
  'chart-line': 'faChartLine',
  'quote-left': 'faQuoteLeft',
  'arrow-right': 'faArrowRight',
  'paper-plane': 'faPaperPlane',
  'calendar-check': 'faCalendarCheck',
  'file-invoice-dollar': 'faFileInvoiceDollar',
  'info-circle': 'faInfoCircle',
  'exchange-alt': 'faExchangeAlt',
  'network-wired': 'faNetworkWired',
  'shield-alt': 'faShieldAlt'
};

// Convert icon class name to camelCase import name
function getImportName(iconName, isBrand = false) {
  if (iconNameToImport[iconName]) {
    return iconNameToImport[iconName];
  }
  // Convert kebab-case to camelCase and add 'fa' prefix
  const camelCase = iconName.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  return 'fa' + camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}

// Find all icon references in JSON files
function findIconsInJSON(filePath) {
  const icons = new Set();

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(content);

    // Recursively search for icon properties
    function searchObject(obj) {
      if (typeof obj === 'string') {
        // Match FontAwesome class names: "fas fa-icon-name" or "fab fa-icon-name"
        const match = obj.match(/^(fas|fab) fa-([a-z0-9-]+)$/);
        if (match) {
          icons.add(obj);
        }
      } else if (Array.isArray(obj)) {
        obj.forEach(searchObject);
      } else if (obj && typeof obj === 'object') {
        Object.values(obj).forEach(searchObject);
      }
    }

    searchObject(json);
  } catch (error) {
    console.warn(`Warning: Could not parse ${filePath}:`, error.message);
  }

  return icons;
}

// Find all icon references in TSX/JSX files
function findIconsInTSX(filePath) {
  const icons = new Set();

  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // Match icon="fas fa-icon-name" or icon='fas fa-icon-name' or icon={`fas fa-icon-name`}
    const regex = /icon=["'`]((fas|fab) fa-[a-z0-9-]+)["'`]/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
      icons.add(match[1]);
    }
  } catch (error) {
    console.warn(`Warning: Could not read ${filePath}:`, error.message);
  }

  return icons;
}

// Recursively scan directories for JSON and TSX files
function scanDirectory(dir, allIcons, scanType = 'json') {
  if (!fs.existsSync(dir)) {
    return;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.forEach(entry => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Recursively scan subdirectories
      scanDirectory(fullPath, allIcons, scanType);
    } else if (entry.isFile()) {
      let icons = new Set();

      if (scanType === 'json' && entry.name.endsWith('.json')) {
        // Parse JSON file for icons
        icons = findIconsInJSON(fullPath);
      } else if (scanType === 'tsx' && (entry.name.endsWith('.tsx') || entry.name.endsWith('.jsx'))) {
        // Parse TSX/JSX file for icons
        icons = findIconsInTSX(fullPath);
      }

      if (icons.size > 0) {
        icons.forEach(icon => allIcons.add(icon));
        console.log(`  Found ${icons.size} icons in ${entry.name}`);
      }
    }
  });
}

// Scan all JSON and TSX files in directories (recursive)
function scanForIcons() {
  const allIcons = new Set();

  // Scan JSON config files
  console.log('Scanning JSON config files...');
  CONFIG_DIRS.forEach(dir => {
    if (!fs.existsSync(dir)) {
      console.warn(`Warning: Directory ${dir} does not exist`);
      return;
    }

    console.log(`  Scanning ${dir}...`);
    scanDirectory(dir, allIcons, 'json');
  });

  // Scan TSX/JSX component files for hardcoded icons
  console.log('\nScanning component files for hardcoded icons...');
  COMPONENT_DIRS.forEach(dir => {
    if (!fs.existsSync(dir)) {
      console.warn(`Warning: Directory ${dir} does not exist`);
      return;
    }

    console.log(`  Scanning ${dir}...`);
    scanDirectory(dir, allIcons, 'tsx');
  });

  return Array.from(allIcons).sort();
}

// Generate the icons.ts file
function generateIconsFile(icons) {
  const solidIcons = icons.filter(i => i.startsWith('fas '));
  const brandIcons = icons.filter(i => i.startsWith('fab '));

  // Extract icon names and create import names
  const solidIconData = solidIcons.map(icon => {
    const iconName = icon.replace('fas fa-', '');
    return {
      className: icon,
      iconName,
      importName: getImportName(iconName)
    };
  });

  const brandIconData = brandIcons.map(icon => {
    const iconName = icon.replace('fab fa-', '');
    return {
      className: icon,
      iconName,
      importName: getImportName(iconName, true)
    };
  });

  // Generate imports
  const solidImports = solidIconData.map(d => d.importName).join(',\n  ');
  const brandImports = brandIconData.map(d => d.importName).join(',\n  ');

  // Generate library.add calls
  const solidLibraryAdds = solidIconData.map(d => d.importName).join(',\n    ');
  const brandLibraryAdds = brandIconData.map(d => d.importName).join(',\n    ');

  // Generate iconMap entries
  const solidMappings = solidIconData.map(d =>
    `  '${d.className}': '${d.iconName}'`
  ).join(',\n');

  const brandMappings = brandIconData.map(d =>
    `  '${d.className}': ['fab', '${d.iconName}']`
  ).join(',\n');

  const fileContent = `// This file is auto-generated by scripts/generate-icons.js
// Do not edit manually - changes will be overwritten on next build

import { library } from '@fortawesome/fontawesome-svg-core';

${solidIconData.length > 0 ? `// Solid icons
import {
  ${solidImports}
} from '@fortawesome/free-solid-svg-icons';` : ''}

${brandIconData.length > 0 ? `
// Brand icons
import {
  ${brandImports}
} from '@fortawesome/free-brands-svg-icons';` : ''}

// Add all icons to the library at module level (prevents tree-shaking)
library.add(
${solidIconData.length > 0 ? `  // Solid icons
  ${solidLibraryAdds}${brandIconData.length > 0 ? ',' : ''}` : ''}
${brandIconData.length > 0 ? `  // Brand icons
  ${brandLibraryAdds}` : ''}
);

// Map legacy FontAwesome class names to icon names
export const iconMap = {
${solidMappings}${brandIconData.length > 0 && solidIconData.length > 0 ? ',' : ''}
${brandMappings}
} as const;
`;

  const outputPath = path.join(__dirname, '../src/lib/icons.ts');
  fs.writeFileSync(outputPath, fileContent, 'utf8');

  console.log(`✓ Generated icons.ts with ${icons.length} icons:`);
  console.log(`  - ${solidIcons.length} solid icons`);
  console.log(`  - ${brandIcons.length} brand icons`);
}

// Main execution
console.log('Scanning for FontAwesome icons...\n');
const icons = scanForIcons();

if (icons.length === 0) {
  console.warn('Warning: No FontAwesome icons found in config files');
  process.exit(1);
}

generateIconsFile(icons);
console.log('✓ Icon generation complete');
