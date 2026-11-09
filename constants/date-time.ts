import dayjs, { Dayjs } from 'dayjs';

export const weekdays: string[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const getWeekDayName = (date: Dayjs | null): string => {
  if (!date) {
    return '';
  }
  return weekdays[dayjs(date).day()];
};

/** The church's local time zone. Dates are always shown in this zone. */
export const CHURCH_TIME_ZONE = 'America/New_York';

/**
 * Formats an ISO date in the church's time zone. Gives the same result on the
 * server (UTC) and in every visitor's browser, which avoids hydration mismatches.
 */
export const formatChurchDate = (
  iso: string,
  options: Intl.DateTimeFormatOptions
): string =>
  new Intl.DateTimeFormat('en-US', { timeZone: CHURCH_TIME_ZONE, ...options }).format(
    new Date(iso)
  );
