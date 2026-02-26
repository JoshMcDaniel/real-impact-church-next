import { CalendarIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const serviceType = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'dayOfWeek',
      type: 'string',
      options: {
        list: [
          { title: 'Sunday', value: 'Sunday' },
          { title: 'Monday', value: 'Monday' },
          { title: 'Tuesday', value: 'Tuesday' },
          { title: 'Wednesday', value: 'Wednesday' },
          { title: 'Thursday', value: 'Thursday' },
          { title: 'Friday', value: 'Friday' },
          { title: 'Saturday', value: 'Saturday' },
        ],
      },
    }),
    defineField({
      name: 'time',
      type: 'string',
      description: 'Enter time as displayed to visitors, e.g. "10:00 AM" or "10:00 AM – 12:00 PM"',
    }),
    defineField({
      name: 'description',
      type: 'string',
    }),
    defineField({
      name: 'displayOrder',
      type: 'number',
      description:
        'Used to determine the order which services appear. Lower numbers are shown first.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'dayOfWeek',
    },
  },
});
