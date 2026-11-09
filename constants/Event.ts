import type { PortableTextBlock } from 'next-sanity';
import type { Image } from 'sanity';
import appConfig from './app-config/config.json';
import { formatChurchDate } from './date-time';
import { urlFor } from '../src/sanity/lib/image';

/** Optional off-site location entered in Sanity. */
export type EventTypeLocation = {
  name?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  mapLink?: string;
};

/** An event document as returned by the GROQ queries. */
export type EventType = {
  _id: string;
  name: string;
  slug: string;
  summary?: string | null;
  description?: PortableTextBlock[] | null;
  image?: Image | null;
  startDateTime: string;
  endDateTime?: string | null;
  location?: EventTypeLocation | null;
};

/** GROQ projection shared by every event query. */
export const EVENT_FIELDS = `
  _id,
  name,
  "slug": slug.current,
  image,
  startDateTime,
  endDateTime,
  summary,
  location
`;

/** GROQ filter for events that haven't ended yet. */
export const UPCOMING_FILTER = `_type == "events" && defined(slug.current) && coalesce(endDateTime, startDateTime) >= now()`;

const DEFAULT_IMAGE = '/images/real_impact_church_about_intro.jpg';
const ONE_HOUR = 60 * 60 * 1000;

export type ResolvedLocation = {
  name: string;
  street: string;
  cityLine: string;
  /** One-line address for calendars and maps. */
  full: string;
  mapLink: string;
  isChurch: boolean;
};

/**
 * Wraps an event with display helpers. All dates are shown in Eastern time.
 * Nothing here depends on the current time, so server and browser render the same text.
 */
export class Event {
  constructor(private event: EventType) {}

  get id(): string {
    return this.event._id;
  }

  get name(): string {
    return this.event.name;
  }

  get route(): string {
    return this.event.slug;
  }

  get href(): string {
    return `/events/${this.event.slug}`;
  }

  get summary(): string {
    return this.event.summary ?? '';
  }

  get description(): PortableTextBlock[] {
    return this.event.description ?? [];
  }

  get hasImage(): boolean {
    return !!this.event.image?.asset;
  }

  /** Image URL; events without an image fall back to a default church photo. */
  imageUrl(width = 1200, height?: number): string {
    if (!this.event.image?.asset) return DEFAULT_IMAGE;
    const builder = urlFor(this.event.image).width(width).auto('format');
    return (height ? builder.height(height).fit('crop') : builder).url();
  }

  get startTime(): string {
    return this.event.startDateTime;
  }

  /** End time, or one hour after the start when none was entered. */
  get endTime(): string {
    return (
      this.event.endDateTime ||
      new Date(new Date(this.event.startDateTime).getTime() + ONE_HOUR).toISOString()
    );
  }

  get hasEndTime(): boolean {
    return !!this.event.endDateTime;
  }

  get monthShort(): string {
    return formatChurchDate(this.startTime, { month: 'short' }).toUpperCase();
  }

  get dayOfMonth(): string {
    return formatChurchDate(this.startTime, { day: 'numeric' });
  }

  get weekday(): string {
    return formatChurchDate(this.startTime, { weekday: 'long' });
  }

  /** e.g. "Saturday, November 15, 2026" (always includes the year). */
  get fullDate(): string {
    return formatChurchDate(this.startTime, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  }

  get startClock(): string {
    return formatChurchDate(this.startTime, { hour: 'numeric', minute: '2-digit' });
  }

  /** e.g. "6:00 PM – 8:00 PM", or just the start time when no end was entered. */
  get timeRange(): string {
    if (!this.hasEndTime) return this.startClock;
    const end = formatChurchDate(this.endTime, { hour: 'numeric', minute: '2-digit' });
    const sameDay =
      formatChurchDate(this.startTime, { dateStyle: 'short' }) === formatChurchDate(this.endTime, { dateStyle: 'short' });
    return sameDay
      ? `${this.startClock} – ${end}`
      : `${this.startClock} – ${formatChurchDate(this.endTime, { weekday: 'short', month: 'short', day: 'numeric' })}, ${end}`;
  }

  /** The event's own location when one was entered, otherwise the church. */
  get location(): ResolvedLocation {
    const loc = this.event.location;
    const hasOwn = !!(loc && (loc.name || loc.streetAddress));
    if (!hasOwn) {
      const c = appConfig.organization.contact;
      return {
        name: appConfig.organization.full_name,
        street: c.street,
        cityLine: `${c.city}, ${c.state} ${c.zip_code}`,
        full: c.full_address,
        mapLink: c.google_maps_link,
        isChurch: true,
      };
    }
    const cityLine = [loc!.city, [loc!.state, loc!.zipCode].filter(Boolean).join(' ')]
      .filter(Boolean)
      .join(', ');
    const full = [loc!.streetAddress, cityLine].filter(Boolean).join(', ');
    const query = encodeURIComponent([loc!.name, full].filter(Boolean).join(', '));
    return {
      name: loc!.name || loc!.streetAddress || '',
      street: loc!.name ? loc!.streetAddress ?? '' : '',
      cityLine,
      full: full || loc!.name || '',
      mapLink: loc!.mapLink || `https://www.google.com/maps/search/?api=1&query=${query}`,
      isChurch: false,
    };
  }
}
