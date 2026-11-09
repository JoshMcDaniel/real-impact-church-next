/** A recurring church service, as stored in Sanity (`service` documents). */
export type Service = {
  title: string;
  dayOfWeek: string;
  time: string;
  description: string;
};
