#!/bin/bash

# Script to apply performance optimizations to all HTML pages

echo "Starting optimization of all HTML pages..."

# List of HTML files to optimize (excluding index.html which is already done)
files=(
    "about.html"
    "client-portal.html"
    "colocation.html"
    "contact.html"
    "debug-products.html"
    "dedicated-servers.html"
    "homepage.html"
    "knowledge-base.html"
    "network-status.html"
    "network.html"
    "privacy.html"
    "sla.html"
    "terms.html"
    "testimonials.html"
    "vps.html"
)

# Process each file
for file in "${files[@]}"; do
    filepath="/home/codingbutter/incx.net/html/$file"

    if [ -f "$filepath" ]; then
        echo "Optimizing $file..."

        # Create a backup
        cp "$filepath" "$filepath.backup"

        # Apply optimizations using sed

        # 1. Add preload and prefetch tags after <link rel="apple-touch-icon"
        sed -i '/<link rel="apple-touch-icon"/a\
\
    <!-- Critical Resource Preloading -->\
    <link rel="preload" href="css/output.css?v=1.0.1" as="style">\
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" as="style">\
\
    <!-- DNS Prefetch & Preconnect -->\
    <link rel="dns-prefetch" href="https://fonts.googleapis.com">\
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">\
    <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">\
    <link rel="dns-prefetch" href="https://images.unsplash.com">\
    <link rel="preconnect" href="https://fonts.googleapis.com">\
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\
    <link rel="preconnect" href="https://cdnjs.cloudflare.com">\
    <link rel="preconnect" href="https://images.unsplash.com">\
\
    <!-- Preload critical scripts -->\
    <link rel="preload" href="js/config-loader.js?v=1.0.1" as="script">' "$filepath"

        # 2. Make Font Awesome async
        sed -i 's|<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/[^"]*">|<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" media="print" onload="this.media='"'"'all'"'"'">|g' "$filepath"

        # 3. Add defer to all script tags at the bottom
        sed -i 's|<script src="js/\([^"]*\)"></script>|<script src="js/\1" defer></script>|g' "$filepath"
        sed -i 's|<script src="js/\([^"]*\)" async></script>|<script src="js/\1" defer></script>|g' "$filepath"

        # 4. Fix button accessibility - dark mode toggle
        sed -i 's|<button id="darkModeToggle" class="\([^"]*\)">|<button id="darkModeToggle" class="\1" aria-label="Toggle dark mode" title="Toggle dark mode">|g' "$filepath"

        # 5. Fix button accessibility - mobile menu
        sed -i 's|<button id="mobileMenuToggle" class="\([^"]*\)">|<button id="mobileMenuToggle" class="\1" aria-label="Toggle mobile menu" aria-expanded="false">|g' "$filepath"

        # 6. Add aria-hidden to SVG icons in buttons
        sed -i 's|<svg class="\([^"]*\)" fill="\([^"]*\)" viewBox="\([^"]*\)">|<svg class="\1" fill="\2" viewBox="\3" aria-hidden="true">|g' "$filepath"

        # 7. Add dimensions to logo image
        sed -i 's|<img src="/images/incx_logo.svg" alt="INCX Logo" class="h-10 w-auto">|<img src="/images/incx_logo.svg" alt="INCX Logo" class="h-10 w-auto" width="120" height="40">|g' "$filepath"

        # 8. Add fetchpriority to hero/main images (if they exist)
        sed -i 's|<img src="https://images.unsplash.com/\([^"]*\)" alt="\([^"]*\)" class="w-full h-full object-cover">|<img src="https://images.unsplash.com/\1" alt="\2" class="w-full h-full object-cover" width="1932" height="1288" fetchpriority="high" decoding="async">|g' "$filepath"

        echo "✓ Completed optimization of $file"
    else
        echo "⚠ File $file not found, skipping..."
    fi
done

echo ""
echo "Optimization complete! All HTML files have been updated."
echo "Backups created with .backup extension"