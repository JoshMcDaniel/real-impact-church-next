import { GetServerSideProps } from 'next';
import { siteUrl } from '../constants/site';

/** robots.txt: allow everything except the Sanity Studio, and point to the sitemap. */
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const origin = siteUrl || `https://${req.headers.host}`;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400');
  res.write(`User-agent: *\nAllow: /\nDisallow: /manage\nDisallow: /api/\n\nSitemap: ${origin}/sitemap.xml\n`);
  res.end();
  return { props: {} };
};

const Robots = () => null;
export default Robots;
