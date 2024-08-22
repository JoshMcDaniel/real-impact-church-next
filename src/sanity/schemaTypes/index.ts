import { type SchemaTypeDefinition } from 'sanity';

import { blockContentType } from './blockContentType';
import { staffType } from './staffType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, staffType],
};
