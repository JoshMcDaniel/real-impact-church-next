/**
 * Browser-safe video type and formatting helpers.
 * (Data fetching lives in ./youtube.ts, which is server-only.)
 */
import appConfig from './app-config/config.json';
import { formatChurchDate } from './date-time';

export type Video = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  /** ISO 8601 duration, e.g. "PT42M15S" (API only). */
  duration: string | null;
  viewCount: number | null;
};

const durationParts = (iso: string | null) => {
  const m = iso?.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!m) return null;
  return { h: Number(m[1] ?? 0), m: Number(m[2] ?? 0), s: Number(m[3] ?? 0) };
};

/** "PT42M15S" -> "42:15", "PT1H2M3S" -> "1:02:03". */
export const formatDuration = (iso: string | null): string | null => {
  const d = durationParts(iso);
  if (!d || d.h + d.m + d.s === 0) return null;
  const pad = (n: number) => String(n).padStart(2, '0');
  return d.h ? `${d.h}:${pad(d.m)}:${pad(d.s)}` : `${d.m}:${pad(d.s)}`;
};

/** "PT42M15S" -> "42 min", "PT1H5M" -> "1 hr 5 min". */
export const formatDurationWords = (iso: string | null): string | null => {
  const d = durationParts(iso);
  if (!d || d.h + d.m + d.s === 0) return null;
  const minutes = d.m + (d.s >= 30 ? 1 : 0);
  return d.h ? `${d.h} hr${minutes ? ` ${minutes} min` : ''}` : `${Math.max(minutes, 1)} min`;
};

/** 1234 -> "1.2K views". */
export const formatViews = (count: number | null): string | null =>
  count == null
    ? null
    : `${new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(count)} view${count === 1 ? '' : 's'}`;

export const formatVideoDate = (iso: string): string =>
  iso ? formatChurchDate(iso, { month: 'long', day: 'numeric', year: 'numeric' }) : '';

export const watchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
export const channelUrl = `https://www.youtube.com/channel/${appConfig.organization.social_media.youtube.channel_id}`;
