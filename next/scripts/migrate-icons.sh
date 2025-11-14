#!/bin/bash

# Icon Migration Script
# Automatically converts FontAwesome <i> tags to <Icon> components

echo "🔄 Starting FontAwesome Icon Migration..."
echo ""

# Find all TypeScript/TSX files with FontAwesome icons
FILES=$(grep -rl 'className="fa[sb]' src/ --include="*.tsx" --include="*.ts" 2>/dev/null)

if [ -z "$FILES" ]; then
  echo "✅ No files found with old icon syntax!"
  exit 0
fi

CONVERTED_COUNT=0

for FILE in $FILES; do
  echo "Processing: $FILE"

  # Check if Icon import already exists
  if ! grep -q "import Icon from '@/components/Icon'" "$FILE"; then
    # Add Icon import after the first import statement
    sed -i "1,/^import/s/^import/import Icon from '@\/components\/Icon';\nimport/" "$FILE"

    # If no imports, add at the top (after 'use client' if present)
    if ! grep -q "^import" "$FILE"; then
      if grep -q "'use client'" "$FILE"; then
        sed -i "/'use client'/a\\import Icon from '@/components/Icon';" "$FILE"
      else
        sed -i "1iimport Icon from '@/components/Icon';" "$FILE"
      fi
    fi
  fi

  # Convert icon tags to Icon components
  # Pattern 1: <i className="fas fa-icon"></i> or <i className="fab fa-icon"></i>
  sed -i -E 's/<i className="(fa[sb] fa-[a-z-]+)"[^>]*><\/i>/<Icon icon="\1" \/>/g' "$FILE"

  # Pattern 2: <i className="fas fa-icon text-..." ...></i>
  sed -i -E 's/<i className="(fa[sb] fa-[a-z-]+) ([^"]+)"[^>]*><\/i>/<Icon icon="\1" className="\2" \/>/g' "$FILE"

  # Pattern 3: <i className="fas fa-icon" aria-hidden="true"></i>
  sed -i -E 's/<Icon icon="([^"]+)" className="([^"]*)" \/> aria-hidden="true"/<Icon icon="\1" className="\2" aria-hidden={true} \/>/g' "$FILE"
  sed -i -E 's/<Icon icon="([^"]+)" \/> aria-hidden="true"/<Icon icon="\1" aria-hidden={true} \/>/g' "$FILE"

  # Pattern 4: Self-closing <i /> tags
  sed -i -E 's/<i className="(fa[sb] fa-[a-z-]+) ([^"]+)"[^>]*\/>/<Icon icon="\1" className="\2" \/>/g' "$FILE"
  sed -i -E 's/<i className="(fa[sb] fa-[a-z-]+)"[^>]*\/>/<Icon icon="\1" \/>/g' "$FILE"

  CONVERTED_COUNT=$((CONVERTED_COUNT + 1))
done

echo ""
echo "✅ Migration Complete!"
echo "   Converted $CONVERTED_COUNT files"
echo ""
echo "📝 Next steps:"
echo "   1. Review changes: git diff"
echo "   2. Test the application: npm run dev"
echo "   3. Build: npm run build"
echo "   4. Check for any console warnings about missing icons"
echo ""
