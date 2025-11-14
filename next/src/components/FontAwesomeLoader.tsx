'use client';

import { config } from '@fortawesome/fontawesome-svg-core';
// Import icons module to ensure icons are loaded
import '@/lib/icons';

// Prevent FontAwesome from adding its CSS since we'll use SVG
config.autoAddCss = false;

export default function FontAwesomeLoader() {
  return null;
}
