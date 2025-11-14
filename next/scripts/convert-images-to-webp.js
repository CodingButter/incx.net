#!/usr/bin/env node

/**
 * Convert images to WebP format for better performance
 * Requires: npm install --save-dev sharp
 */

const fs = require('fs');
const path = require('path');

async function convertToWebP() {
  try {
    const sharp = require('sharp');

    const publicDir = path.join(__dirname, '../public/images');
    const images = [
      'dedicated-servers-hero.jpg',
      'vps-hero.jpg',
      'colocation-hero.jpg',
      'about.jpg',
      'testimonials.jpg',
      'contact.jpg',
      'networking.jpg',
    ];

    console.log('Converting images to WebP...\n');

    for (const imageName of images) {
      const inputPath = path.join(publicDir, imageName);
      const outputPath = path.join(publicDir, imageName.replace(/\.(jpg|jpeg|png)$/i, '.webp'));

      if (!fs.existsSync(inputPath)) {
        console.log(`⚠️  Skipping ${imageName} (not found)`);
        continue;
      }

      const inputStats = fs.statSync(inputPath);
      console.log(`Converting ${imageName} (${(inputStats.size / 1024).toFixed(2)} KB)...`);

      await sharp(inputPath)
        .webp({ quality: 80, effort: 6 })
        .toFile(outputPath);

      const outputStats = fs.statSync(outputPath);
      const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

      console.log(`✓ Created ${path.basename(outputPath)} (${(outputStats.size / 1024).toFixed(2)} KB)`);
      console.log(`  Savings: ${savings}% (${((inputStats.size - outputStats.size) / 1024).toFixed(2)} KB)\n`);
    }

    console.log('✓ Conversion complete!');
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      console.error('\n❌ Error: sharp is not installed');
      console.error('Please run: npm install --save-dev sharp\n');
      process.exit(1);
    } else {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }
  }
}

convertToWebP();
