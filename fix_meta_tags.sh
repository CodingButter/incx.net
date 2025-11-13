#!/bin/bash

echo "Fixing meta tags and preload issues in all HTML files..."

for file in html/*.html; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        echo "Processing $filename..."

        # Check if mobile-web-app-capable exists, if not add it after viewport
        if ! grep -q "mobile-web-app-capable" "$file"; then
            sed -i '/<meta name="viewport"/a\    <meta name="mobile-web-app-capable" content="yes">' "$file"
            echo "  Added mobile-web-app-capable to $filename"
        fi

        # Remove any apple-mobile-web-app-capable if it exists
        if grep -q "apple-mobile-web-app-capable" "$file"; then
            sed -i '/apple-mobile-web-app-capable/d' "$file"
            echo "  Removed deprecated apple-mobile-web-app-capable from $filename"
        fi

        # Remove any preload links for main.js (they're not needed since we load it directly)
        if grep -q 'link.*rel="preload".*main\.js' "$file"; then
            sed -i '/link.*rel="preload".*main\.js/d' "$file"
            echo "  Removed main.js preload from $filename"
        fi
    fi
done

echo "Done fixing meta tags!"