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

export const getWeekDayName = (date: Dayjs): string => {
  if (!date) {
    return '';
  }
  return weekdays[dayjs(date).day()];
};
