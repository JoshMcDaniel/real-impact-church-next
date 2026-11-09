/**
 * Server-side YouTube data for the Media pages and Home.
 *
 * Uses the YouTube Data API when YOUTUBE_API_KEY is set (falls back to the
 * older NEXT_PUBLIC_YOUTUBE_API_KEY), and the channel's public RSS feed when
 * there's no key or the API fails. SERVER ONLY: import this file only from
 * getStaticProps / getStaticPaths / getServerSideProps code, never from a
 * component, or Next.js would bundle NEXT_PUBLIC_YOUTUBE_API_KEY for the browser.
 * Browser-safe types and formatting live in ./video.ts.
 *
 * Quota (10,000 units/day free): playlistItems and videos lookups cost 1 unit
 * each; the "popular" search costs 100 units.
 */
import appConfig from './app-config/config.json';

export type { Video } from './video';
import type { Video } from './video';

const CHANNEL_ID = appConfig.organization.social_media.youtube.channel_id;
const API = 'https://www.googleapis.com/youtube/v3';
const TIMEOUT = 8000;

const apiKey = () => process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || '';

/** A channel's uploads playlist id is its channel id with "UC" swapped for "UU". */
const uploadsPlaylistId = () => CHANNEL_ID.replace(/^UC/, 'UU');

const getJson = async (url: string): Promise<any | null> => {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
};

const bestThumbnail = (thumbs: any, id: string): string =>
  (thumbs?.maxres ?? thumbs?.standard ?? thumbs?.high ?? thumbs?.medium ?? thumbs?.default)?.url ??
  `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/** Full details for up to 50 video ids (1 quota unit). Keeps the given order. */
const fetchVideoDetails = async (ids: string[]): Promise<Video[] | null> => {
  const key = apiKey();
  if (!key || ids.length === 0) return ids.length === 0 ? [] : null;
  const data = await getJson(
    `${API}/videos?part=snippet,contentDetails,statistics&id=${ids.join(',')}&key=${key}`
  );
  if (!data?.items) return null;
  const byId = new Map<string, Video>();
  for (const item of data.items) {
    // Only this church's videos can be shown on the site.
    if (item.snippet?.channelId !== CHANNEL_ID) continue;
    byId.set(item.id, {
      id: item.id,
      title: item.snippet.title ?? '',
      description: item.snippet.description ?? '',
      publishedAt: item.snippet.publishedAt ?? '',
      thumbnailUrl: bestThumbnail(item.snippet.thumbnails, item.id),
      duration: item.contentDetails?.duration ?? null,
      viewCount: item.statistics?.viewCount != null ? Number(item.statistics.viewCount) : null,
    });
  }
  return ids.map((id) => byId.get(id)).filter((v): v is Video => !!v);
};

const decodeXml = (text: string) =>
  text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

/** Latest ~15 uploads from the public RSS feed (no key, no quota). */
const fetchFromRss = async (): Promise<Video[]> => {
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`, {
      signal: AbortSignal.timeout(TIMEOUT),
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return Array.from(xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g))
      .map(([, entry]) => {
        const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ?? '';
        const views = entry.match(/<media:statistics views="(\d+)"/)?.[1];
        return {
          id,
          title: decodeXml(entry.match(/<title>([^<]*)<\/title>/)?.[1] ?? ''),
          description: decodeXml(entry.match(/<media:description>([\s\S]*?)<\/media:description>/)?.[1] ?? ''),
          publishedAt: entry.match(/<published>([^<]+)<\/published>/)?.[1] ?? '',
          thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
          duration: null,
          viewCount: views ? Number(views) : null,
        };
      })
      .filter((v) => v.id);
  } catch {
    return [];
  }
};

/** Newest uploads, newest first (2 quota units, or the RSS feed without a key). */
export const getRecentVideos = async (count: number): Promise<Video[]> => {
  const key = apiKey();
  if (key) {
    const list = await getJson(
      `${API}/playlistItems?part=contentDetails&playlistId=${uploadsPlaylistId()}&maxResults=${Math.min(count, 50)}&key=${key}`
    );
    const ids: string[] = (list?.items ?? []).map((i: any) => i.contentDetails?.videoId).filter(Boolean);
    const videos = await fetchVideoDetails(ids);
    if (videos && videos.length) {
      return videos.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, count);
    }
  }
  return (await fetchFromRss()).slice(0, count);
};

/** Most-viewed videos on the channel (101 quota units). Empty without a key. */
export const getPopularVideos = async (count: number): Promise<Video[]> => {
  const key = apiKey();
  if (!key) return [];
  const search = await getJson(
    `${API}/search?part=id&channelId=${CHANNEL_ID}&order=viewCount&type=video&maxResults=${Math.min(count, 50)}&key=${key}`
  );
  const ids: string[] = (search?.items ?? []).map((i: any) => i.id?.videoId).filter(Boolean);
  return (await fetchVideoDetails(ids)) ?? [];
};

/** One video by id, or null if it doesn't exist or isn't this church's video. */
export const getVideo = async (id: string): Promise<Video | null> => {
  if (!/^[\w-]{6,20}$/.test(id)) return null;
  const videos = await fetchVideoDetails([id]);
  if (videos) return videos[0] ?? null;
  // No key or API failure: only recent videos can be found via RSS.
  return (await fetchFromRss()).find((v) => v.id === id) ?? null;
};
