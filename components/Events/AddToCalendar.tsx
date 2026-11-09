import Box from '@mui/material/Box';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import { Event } from '../../constants/Event';
import { googleCalendarUrl, icsDataUrl } from '../../constants/event-calendar';
import PillButton from '../shared/PillButton';

/** "Google Calendar" and "Apple / Outlook" (.ics download) buttons. */
export const AddToCalendar = ({ event, size = 'small' }: { event: Event; size?: 'small' | 'medium' }) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
    <PillButton
      href={googleCalendarUrl(event)}
      size={size}
      startIcon={<EventAvailableOutlinedIcon />}
      target="_blank"
      aria-label={`Add ${event.name} to Google Calendar (opens in a new tab)`}
    >
      Google Calendar
    </PillButton>
    <PillButton
      href={icsDataUrl(event)}
      size={size}
      tone="outline"
      download={`${event.route}.ics`}
      aria-label={`Download ${event.name} for Apple Calendar or Outlook`}
    >
      Apple / Outlook
    </PillButton>
  </Box>
);

export default AddToCalendar;
