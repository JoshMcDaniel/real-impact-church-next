import { type SchemaTypeDefinition } from 'sanity';

import { blockContentType } from './blockContentType';
import { staffType } from './staffType';
import { eventsType } from './eventType';
import { serviceType } from './serviceType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, staffType, eventsType, serviceType],
};
