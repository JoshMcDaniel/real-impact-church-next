import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Manage - Real Impact Church')
    .items([
      S.documentTypeListItem('staff').title('Staff'),
      S.documentTypeListItem('events').title('Events'),
      S.documentTypeListItem('service').title('Services'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !['staff', 'events', 'service'].includes(item.getId()!)
      ),
    ]);
