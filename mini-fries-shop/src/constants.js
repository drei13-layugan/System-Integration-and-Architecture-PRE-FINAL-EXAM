export const LOW_STOCK_THRESHOLD = 5;

// Shown when a product image is missing or fails to load
const fallbackSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">
  <rect width="100%" height="100%" fill="#FFE8A3"/>
  <text x="50%" y="50%" font-size="140" text-anchor="middle" dominant-baseline="central">🍟</text>
</svg>`;

export const FALLBACK_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(fallbackSvg)}`;