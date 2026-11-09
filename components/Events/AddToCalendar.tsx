import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import { MouseEvent } from 'react';
import { Event } from '../../constants/Event';
import { googleCalendarUrl, icsDataUrl } from '../../constants/event-calendar';
import PillButton from '../shared/PillButton';

/**
 * One "Add to Calendar" button.
 * - By default it downloads an .ics file, which opens in Apple Calendar (iPhone, Mac),
 *   Outlook and most calendar apps.
 * - On Android, where .ics files aren't handled reliably, it opens Google Calendar
 *   with the event filled in instead.
 * The server always renders the .ics link; the Android switch happens on click,
 * so server and browser render the same markup.
 */
export const AddToCalendar = ({ event, size = 'small' }: { event: Event; size?: 'small' | 'medium' }) => {
  const handleClick = (e: MouseEvent) => {
    if (/Android/i.test(navigator.userAgent)) {
      e.preventDefault();
      window.open(googleCalendarUrl(event), '_blank', 'noopener');
    }
  };

  return (
    <PillButton
      href={icsDataUrl(event)}
      download={`${event.route}.ics`}
      size={size}
      tone="outline"
      startIcon={<EventAvailableOutlinedIcon />}
      onClick={handleClick}
      aria-label={`Add ${event.name} to your calendar`}
    >
      Add to Calendar
    </PillButton>
  );
};

export default AddToCalendar;
