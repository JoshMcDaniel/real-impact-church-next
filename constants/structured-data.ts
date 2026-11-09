import appConfig from './app-config/config.json';
import { absoluteUrl, siteUrl } from './site';
import { FaqItem } from '../components/Home/PlanVisit';
import { Event } from './Event';
import type { Video } from './video';

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

/** schema.org BreadcrumbList, starting from Home. Paths are site-relative. */
export const breadcrumbJsonLd = (crumbs: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', path: '/' }, ...crumbs].map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path),
  })),
});

/** schema.org Event data so events can appear in Google's event results. */
export const eventJsonLd = (event: Event) => {
  const loc = event.location;
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    ...(event.summary && { description: event.summary }),
    startDate: event.startTime,
    endDate: event.endTime,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: [absoluteUrl(event.imageUrl(1200))],
    url: absoluteUrl(event.href),
    location: {
      '@type': 'Place',
      name: loc.name,
      address: loc.isChurch
        ? {
            '@type': 'PostalAddress',
            streetAddress: org.contact.street.replace(/\.$/, ''),
            addressLocality: org.contact.city,
            addressRegion: org.contact.state,
            postalCode: org.contact.zip_code,
            addressCountry: 'US',
          }
        : loc.full,
    },
    organizer: {
      '@type': 'Organization',
      name: org.full_name,
      url: absoluteUrl('/'),
    },
  };
};

/** schema.org VideoObject so sermons can appear in Google's video results. */
export const videoJsonLd = (video: Video, pagePath: string) => ({
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: video.title,
  description: video.description.trim() || `${video.title} — a sermon from ${org.full_name} in Eustis, Florida.`,
  thumbnailUrl: [video.thumbnailUrl],
  uploadDate: video.publishedAt,
  ...(video.duration && { duration: video.duration }),
  embedUrl: `https://www.youtube.com/embed/${video.id}`,
  url: absoluteUrl(pagePath),
  ...(video.viewCount != null && {
    interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: { '@type': 'WatchAction' },
      userInteractionCount: video.viewCount,
    },
  }),
  publisher: { '@type': 'Organization', name: org.full_name, url: absoluteUrl('/') },
});
