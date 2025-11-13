/**
 * Image blur placeholder utilities for Next.js Image component
 * Provides LQIP (Low Quality Image Placeholder) for better perceived performance
 */

/**
 * Generate a simple blur placeholder data URL
 * This creates a tiny blurred version for the placeholder effect
 *
 * @param width - Width of the placeholder (default: 10)
 * @param height - Height of the placeholder (default: 10)
 * @returns Base64 encoded SVG blur data URL
 */
export function getBlurDataURL(width: number = 10, height: number = 10): string {
  // Create a simple blurred gradient SVG as placeholder
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
      <filter id="blur" x="0" y="0" width="100%" height="100%">
        <feGaussianBlur stdDeviation="2"/>
      </filter>
      <rect width="${width}" height="${height}" fill="#1f2937" filter="url(#blur)"/>
    </svg>
  `;

  // Convert to base64
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Get blur data URL for hero images
 * Uses a darker color that matches our gray-900 background
 */
export function getHeroBlurDataURL(): string {
  return getBlurDataURL(20, 10); // Wider aspect ratio for hero images
}

/**
 * Shimmer effect placeholder - creates an animated loading effect
 * This is a more sophisticated placeholder with shimmer animation
 */
export function getShimmerDataURL(w: number = 700, h: number = 475): string {
  const shimmer = (w: number, h: number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#1f2937" offset="0%" />
          <stop stop-color="#374151" offset="50%" />
          <stop stop-color="#1f2937" offset="100%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#1f2937" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite" />
    </svg>
  `;

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);

  return `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;
}

/**
 * Color blur placeholder - creates a placeholder with a specific color
 * Useful for images where you know the dominant color
 */
export function getColorBlurDataURL(color: string = '#1f2937'): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
      <filter id="blur">
        <feGaussianBlur stdDeviation="2"/>
      </filter>
      <rect width="10" height="10" fill="${color}" filter="url(#blur)"/>
    </svg>
  `;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}
