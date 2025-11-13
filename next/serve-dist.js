const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = 8080;
const DIST_DIR = path.join(__dirname, '..', process.env.WEB_ROOT || 'www');

// Enable gzip compression
app.use(compression());

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Serve static files from dist directory
app.use(express.static(DIST_DIR, {
  maxAge: '1d',
  setHeaders: (res, filepath) => {
    // Images - cache for 1 year
    if (filepath.match(/\.(jpg|jpeg|png|gif|svg|webp|ico)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
    // CSS and JS - cache for 1 year
    else if (filepath.match(/\.(css|js)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
    // Fonts - cache for 1 year
    else if (filepath.match(/\.(woff|woff2|ttf|eot)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
    // HTML - cache for 1 hour, must revalidate
    else if (filepath.match(/\.html$/)) {
      res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
    }
  }
}));

// Handle 404 - no fallback needed for static export

app.listen(PORT, () => {
  console.log(`\n🚀 Next.js Static Site running at http://localhost:${PORT}`);
  console.log(`📂 Serving files from: ${DIST_DIR}`);
  console.log('\n✨ All pages available:');
  console.log('  Homepage:          http://localhost:' + PORT);
  console.log('  VPS:               http://localhost:' + PORT + '/vps');
  console.log('  Dedicated Servers: http://localhost:' + PORT + '/dedicated-servers');
  console.log('  Colocation:        http://localhost:' + PORT + '/colocation');
  console.log('  About:             http://localhost:' + PORT + '/about');
  console.log('  Contact:           http://localhost:' + PORT + '/contact');
  console.log('  Network:           http://localhost:' + PORT + '/network');
  console.log('  Testimonials:      http://localhost:' + PORT + '/testimonials');
  console.log('\n📊 Performance: Static HTML (no server-side rendering)');
  console.log('⚡ Load Time: Instant (pre-rendered at build time)');
  console.log('\nPress Ctrl+C to stop the server\n');
});
