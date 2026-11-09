/** A recurring church service, as stored in Sanity (`service` documents). */
export type Service = {
  title: string;
  dayOfWeek: string;
  time: string;
  description: string;
};

/** The latest sermon video pulled from YouTube at build time. */
export type LatestVideo = {
  id: string;
  title: string;
  thumbnailUrl: string;
  publishedAt: string;
};
