import appConfig from './app-config/config.json';
import { Service } from './Service';

export type SundayItem = {
  key: string;
  time: string;
  title: string;
  text: string;
};

/**
 * The main weekly service: the first Sunday service in Sanity, else the first service.
 */
export const getPrimaryService = (services: Service[]): Service | undefined =>
  services.find((s) => s.dayOfWeek === 'Sunday') ?? services[0];

/**
 * The Sunday morning schedule (breakfast, Bible study, worship) from config.json,
 * with the worship time kept in sync with the primary service in Sanity.
 */
export const getSundayMorning = (primaryService?: Service): SundayItem[] =>
  appConfig.website.home.sunday_morning.items.map((item) =>
    item.key === 'worship' && primaryService?.time
      ? { ...item, time: primaryService.time }
      : item
  );
