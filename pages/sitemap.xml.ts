import { GetServerSideProps } from 'next';
import { groq } from 'next-sanity';
import { UPCOMING_FILTER } from '../constants/Event';
import { siteUrl } from '../constants/site';
import { sanityFetch } from '../src/sanity/lib/client';

const STATIC_ROUTES = ['/', '/about', '/beliefs', '/staff', '/media', '/events', '/giving', '/connect'];

const escapeXml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** XML sitemap listing the main pages plus each event page from Sanity. */
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const origin = siteUrl || `https://${req.headers.host}`;

  let eventSlugs: string[] = [];
  try {
    eventSlugs = await sanityFetch<string[]>({
      // Only upcoming events: past event pages are marked noindex.
      query: groq`*[${UPCOMING_FILTER}].slug.current`,
      tags: ['events'],
    });
  } catch {
    // Still serve the static routes if Sanity is unavailable.
  }

  const urls = [...STATIC_ROUTES, ...eventSlugs.map((slug) => `/events/${slug}`)];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url><loc>${escapeXml(`${origin}${path}`)}</loc></url>`).join('\n')}
</urlset>
`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(body);
  res.end();
  return { props: {} };
};

const Sitemap = () => null;
export default Sitemap;
