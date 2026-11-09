/**
 * Public site origin for canonical URLs, Open Graph tags and the sitemap.
 * Defaults to the production domain so preview deployments also point search
 * engines at the live site. Override with NEXT_PUBLIC_SITE_URL if the domain changes.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://realimpactchurch.com';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SITE_URL: siteUrl,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
};

module.exports = nextConfig;
