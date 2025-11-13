const express = require('express');
const compression = require('compression');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;
const HTML_DIR = path.join(__dirname, 'html');

// Enable gzip/brotli compression for all responses
app.use(compression({
    level: 6, // Compression level (0-9, 6 is default)
    threshold: 1024, // Only compress responses larger than 1KB
    filter: (req, res) => {
        // Compress all text-based content types
        if (req.headers['x-no-compression']) {
            return false;
        }
        return compression.filter(req, res);
    }
}));

// Security Headers
app.use((req, res, next) => {
    // Strict Transport Security (HTTPS only)
    if (process.env.NODE_ENV === 'production') {
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    }

    // Content Security Policy with frame-ancestors for clickjacking protection
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com data:; frame-ancestors 'none'");

    // Other security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

    next();
});

// HTTPS Redirect (for production)
if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https') {
            res.redirect(`https://${req.header('host')}${req.url}`);
        } else {
            next();
        }
    });
}

// Cache Control for Static Assets
app.use(express.static(HTML_DIR, {
    maxAge: '1d', // Default cache for 1 day
    setHeaders: (res, filepath) => {
        // Images - cache for 1 year
        if (filepath.match(/\.(jpg|jpeg|png|gif|svg|webp|ico)$/)) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
        // CSS and JS - cache for 1 year (use versioning)
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
        // JSON - cache for 5 minutes
        else if (filepath.match(/\.json$/)) {
            res.setHeader('Cache-Control', 'public, max-age=300');
        }
    }
}));

// Serve index.html for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(HTML_DIR, 'index.html'));
});

// Handle all other routes by serving the corresponding HTML file
app.get('/:page', (req, res) => {
    const pageName = req.params.page;

    // If the request already includes .html, serve it directly
    if (pageName.endsWith('.html')) {
        const filePath = path.join(HTML_DIR, pageName);
        if (fs.existsSync(filePath)) {
            res.sendFile(filePath);
        } else {
            // Try to serve 404.html if it exists
            const notFoundPath = path.join(HTML_DIR, '404.html');
            if (fs.existsSync(notFoundPath)) {
                res.status(404).sendFile(notFoundPath);
            } else {
                res.status(404).send('Page not found');
            }
        }
    } else {
        // Try to serve the HTML file
        const filePath = path.join(HTML_DIR, `${pageName}.html`);
        if (fs.existsSync(filePath)) {
            res.sendFile(filePath);
        } else {
            // Try to serve 404.html if it exists
            const notFoundPath = path.join(HTML_DIR, '404.html');
            if (fs.existsSync(notFoundPath)) {
                res.status(404).sendFile(notFoundPath);
            } else {
                res.status(404).send('Page not found');
            }
        }
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`\n🚀 Server is running at http://localhost:${PORT}`);
    console.log('\nAvailable pages:');
    console.log('  Home:              http://localhost:' + PORT);
    console.log('  VPS:               http://localhost:' + PORT + '/vps');
    console.log('  Dedicated Servers: http://localhost:' + PORT + '/dedicated-servers');
    console.log('  Colocation:        http://localhost:' + PORT + '/colocation');
    console.log('  About:             http://localhost:' + PORT + '/about');
    console.log('  Contact:           http://localhost:' + PORT + '/contact');
    console.log('  Network:           http://localhost:' + PORT + '/network');
    console.log('  Test Products:     http://localhost:' + PORT + '/test-products');
    console.log('\nPress Ctrl+C to stop the server\n');
});