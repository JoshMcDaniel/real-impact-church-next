import { CalendarIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const eventsType = defineType({
  name: 'events',
  title: 'Events',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'This will be used as the URL identifier for this event. Use the Generate button.',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      title: 'Start Date/Time',
      name: 'startDateTime',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'h:mm',
      },
    }),
    defineField({
      title: 'End Date/Time',
      name: 'endDateTime',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'h:mm',
      },
    }),
    defineField({
      name: 'location',
      title: 'Location (optional)',
      description:
        'Only fill this in if the event is NOT at the church. Leave blank to use the church address (35025 Huff Rd., Eustis).',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'name', title: 'Place name', type: 'string', description: 'e.g. "Ferran Park"' }),
        defineField({ name: 'streetAddress', title: 'Street address', type: 'string' }),
        defineField({ name: 'city', type: 'string' }),
        defineField({ name: 'state', type: 'string', initialValue: 'FL' }),
        defineField({ name: 'zipCode', title: 'ZIP code', type: 'string' }),
        defineField({
          name: 'mapLink',
          title: 'Map link (optional)',
          description: 'A Google Maps link. If blank, one is made from the address.',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      description: 'A summary of the event. Keep this short.',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
});
