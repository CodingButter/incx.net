#!/bin/bash

# Update Template Script
# This script reads the version from global.json and updates all HTML files
# to use that version for cache busting on CSS, JS, and image files

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}   INCX Template Version Updater${NC}"
echo -e "${GREEN}======================================${NC}"
echo ""

# Get the directory where this script is located (config folder)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
# Parent directory (main html folder)
PARENT_DIR="$(dirname "$SCRIPT_DIR")"

# Change to parent directory to work with HTML files
cd "$PARENT_DIR"

echo "Working directory: $(pwd)"
echo ""

# Check if jq is installed for JSON parsing
if ! command -v jq &> /dev/null; then
    echo -e "${YELLOW}Warning: 'jq' is not installed. Trying alternative method...${NC}"
    # Try to extract version using grep and sed as fallback
    VERSION=$(grep -o '"version"[[:space:]]*:[[:space:]]*"[^"]*"' "$SCRIPT_DIR/global.json" | sed 's/.*"version"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/')
else
    # Use jq to extract version from global.json
    VERSION=$(jq -r '.version' "$SCRIPT_DIR/global.json")
fi

# Check if version was extracted successfully
if [ -z "$VERSION" ]; then
    echo -e "${RED}Error: Could not extract version from global.json${NC}"
    echo "Please ensure global.json contains a 'version' field"
    exit 1
fi

echo -e "${GREEN}Found version: ${VERSION}${NC}"
echo ""
echo "Updating all HTML files with version ${VERSION}..."
echo ""

# Counter for files processed
FILES_UPDATED=0

# Function to update version in HTML files
update_html_file() {
    local file=$1
    local filename=$(basename "$file")

    echo -n "  Updating $filename... "

    # Create backup
    cp "$file" "$file.bak"

    # Update CSS files (css/*.css)
    sed -i "s|\(href=\"css/[^\"]*\.css\)\(\?v=[^\"]*\)\?\"|\\1?v=$VERSION\"|g" "$file"

    # Update JavaScript files (js/*.js)
    sed -i "s|\(src=\"js/[^\"]*\.js\)\(\?v=[^\"]*\)\?\"|\\1?v=$VERSION\"|g" "$file"
    sed -i "s|\(src=\"/js/[^\"]*\.js\)\(\?v=[^\"]*\)\?\"|\\1?v=$VERSION\"|g" "$file"

    # Update image files (images/*)
    # Only update images that already have version parameters
    sed -i "s|\(src=\"images/[^\"]*\)\(\?v=[^\"]*\)\(\"[^>]*>\)|\1?v=$VERSION\3|g" "$file"
    sed -i "s|\(src=\"/images/[^\"]*\)\(\?v=[^\"]*\)\(\"[^>]*>\)|\1?v=$VERSION\3|g" "$file"

    # Also update background images in style attributes if they have versions
    sed -i "s|\(url(['\"]*/images/[^'\"]*\)\(\?v=[^'\"]*\)\(['\"])\)|\1?v=$VERSION\3|g" "$file"

    # Remove backup if successful
    if [ $? -eq 0 ]; then
        rm "$file.bak"
        echo -e "${GREEN}✓${NC}"
        ((FILES_UPDATED++))
    else
        echo -e "${RED}✗${NC}"
        echo -e "  ${RED}Error updating $filename. Backup saved as $filename.bak${NC}"
    fi
}

# Update all HTML files
for file in *.html; do
    if [ -f "$file" ]; then
        update_html_file "$file"
    fi
done

# Also update HTML files in components directory if it exists
if [ -d "components" ]; then
    echo ""
    echo "Updating component HTML files..."
    for file in components/*.html; do
        if [ -f "$file" ]; then
            update_html_file "$file"
        fi
    done
fi

echo ""
echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}Update Complete!${NC}"
echo -e "${GREEN}Files updated: $FILES_UPDATED${NC}"
echo -e "${GREEN}Version: $VERSION${NC}"
echo -e "${GREEN}======================================${NC}"
echo ""
echo "Next steps:"
echo "1. Test your website to ensure everything loads correctly"
echo "2. Clear your browser cache or use Ctrl+Shift+R to force reload"
echo "3. Commit your changes to version control"
echo ""

# Optional: Update config-loader.js to use the same version internally
echo "Updating config-loader.js to use version $VERSION for JSON files..."
if [ -f "js/config-loader.js" ]; then
    # This ensures config files also use the same version
    sed -i "s/\?t=' + Date\.now()/\?v=$VERSION'/g" js/config-loader.js 2>/dev/null || true
    echo -e "${GREEN}✓${NC} config-loader.js updated"
fi

echo ""
echo -e "${YELLOW}Tip: Run this script after updating the version in config/global.json${NC}"
echo -e "${YELLOW}Example: Change version from '$VERSION' to '1.0.2' and run ./config/update.sh${NC}"