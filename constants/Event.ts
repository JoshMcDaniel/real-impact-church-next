import dayjs from 'dayjs';
import { getWeekDayName } from './date-time';
import { ArraySchemaType, BlockSchemaType, Image } from 'sanity';
import { urlFor } from '../src/sanity/lib/image';

export type EventTypeLocation = {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: number;
  mapLink: string;
};

export type EventType = {
  _id: string;
  name: string;
  slug: string;
  summary: string;
  description: ArraySchemaType<BlockSchemaType>;
  image: Image;
  startDateTime: string;
  endDateTime: string;
  // location: EventTypeLocation;
};

export class Event {
  constructor(private event: EventType) {
    console.log({ event });
  }

  get id(): string {
    return this.event._id;
  }

  get name(): string {
    return this.event.name;
  }

  get route(): string {
    return this.event.slug;
  }

  get summary(): string {
    return this.event.summary;
  }

  get description(): ArraySchemaType<BlockSchemaType> {
    return this.event.description;
  }

  get imageUrl(): string {
    return `${urlFor(this.event.image).url()}`;
  }

  // get date(): string {
  //   return this.event.date;
  // }

  dateAsDateObj(dateTime: string): dayjs.Dayjs | null {
    if (!!dateTime) {
      return dayjs(dateTime);
    }
    return null;
  }

  get startDayOfWeek(): string {
    if (this.dateAsDateObj(this.event.startDateTime)) {
      return getWeekDayName(this.dateAsDateObj(this.event.startDateTime));
    }
    return '';
  }

  get endDayOfWeek(): string {
    if (this.dateAsDateObj(this.event.endDateTime)) {
      return getWeekDayName(this.dateAsDateObj(this.event.endDateTime));
    }
    return '';
  }

  get startTime(): string {
    return this.event.startDateTime;
  }

  get endTime(): string {
    return this.event.endDateTime;
  }

  // get location(): EventTypeLocation {
  //   return this.event.location;
  // }
}
