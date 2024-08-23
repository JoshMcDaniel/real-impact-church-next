import { type SchemaTypeDefinition } from 'sanity';

import { blockContentType } from './blockContentType';
import { staffType } from './staffType';
import { eventsType } from './eventType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, staffType, eventsType],
};
