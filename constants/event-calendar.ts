import { Event } from './Event';
import { absoluteUrl } from './site';

/** "2026-11-15T23:30:00.000Z" -> "20261115T233000Z" */
const toCalendarUtc = (iso: string) =>
  new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');

const details = (event: Event) =>
  [event.summary, `Details: ${absoluteUrl(event.href)}`].filter(Boolean).join('\n\n');

/** Link that opens Google Calendar with the event filled in. */
export const googleCalendarUrl = (event: Event): string => {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.name,
    dates: `${toCalendarUtc(event.startTime)}/${toCalendarUtc(event.endTime)}`,
    details: details(event),
    location: `${event.location.name}, ${event.location.full}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

/** Escapes text for an iCalendar property value. */
const icsText = (value: string) =>
  value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

/**
 * A data: URL for an .ics file (Apple Calendar, Outlook, etc.).
 * Deterministic so it renders the same on the server and in the browser.
 */
export const icsDataUrl = (event: Event): string => {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Real Impact Church//Events//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${event.route}@realimpactchurch.com`,
    `DTSTAMP:${toCalendarUtc(event.startTime)}`,
    `DTSTART:${toCalendarUtc(event.startTime)}`,
    `DTEND:${toCalendarUtc(event.endTime)}`,
    `SUMMARY:${icsText(event.name)}`,
    `DESCRIPTION:${icsText(details(event))}`,
    `LOCATION:${icsText(`${event.location.name}, ${event.location.full}`)}`,
    `URL:${absoluteUrl(event.href)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join('\r\n'))}`;
};
