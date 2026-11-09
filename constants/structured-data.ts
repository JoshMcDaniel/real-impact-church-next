import appConfig from './app-config/config.json';
import { absoluteUrl, siteUrl } from './site';
import { FaqItem } from '../components/Home/PlanVisit';

const org = appConfig.organization;

/** schema.org Church data for the home page (helps search engines understand the address and links). */
export const churchJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Church',
  name: org.full_name,
  description: appConfig.website.home.header.description,
  ...(siteUrl && {
    '@id': `${siteUrl}/#church`,
    url: `${siteUrl}/`,
    logo: absoluteUrl(org.logos.simple_logo.path),
    image: absoluteUrl(appConfig.website.home.hero.image.path),
  }),
  email: org.contact.email.primary,
  foundingDate: org.registration_year,
  address: {
    '@type': 'PostalAddress',
    streetAddress: org.contact.street.replace(/\.$/, ''),
    addressLocality: org.contact.city,
    addressRegion: org.contact.state,
    postalCode: org.contact.zip_code,
    addressCountry: 'US',
  },
  hasMap: org.contact.google_maps_link,
  sameAs: appConfig.website.media.social_media.map((s) => s.path),
});

/** schema.org FAQPage data. The questions must match the FAQ visible on the page. */
export const faqJsonLd = (faq: FaqItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
});
