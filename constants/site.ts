/**
 * The site's public origin (no trailing slash), used for canonical URLs,
 * Open Graph tags, structured data and the sitemap.
 *
 * Set NEXT_PUBLIC_SITE_URL (e.g. https://www.example.org) in the Vercel project.
 * If it's missing, next.config.js falls back to Vercel's production domain.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || '').replace(/\/$/, '');

/** Turns a site-relative path into an absolute URL when the site origin is known. */
export const absoluteUrl = (path: string): string =>
  /^https?:\/\//.test(path) ? path : `${siteUrl}${path.startsWith('/') ? '' : '/'}${path}`;
