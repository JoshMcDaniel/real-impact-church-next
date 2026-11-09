import Box from '@mui/material/Box';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import { brand, contentMaxWidth } from '../../constants/brand';
import { Event, EventType } from '../../constants/Event';
import { SundayItem } from '../../constants/sunday-schedule';
import EventCard from '../Events/EventCard';
import NoUpcomingEvents from '../Events/NoUpcomingEvents';
import SectionHeader from '../shared/SectionHeader';

type UpcomingEventsProps = { events: EventType[]; sundayMorning: SundayItem[] };

export const UpcomingEvents = ({ events, sundayMorning }: UpcomingEventsProps) => {
  const hasEvents = events.length > 0;

  return (
    <Box
      component="section"
      id="events"
      aria-labelledby="events-title"
      sx={{
        maxWidth: contentMaxWidth,
        mx: 'auto',
        px: 3,
        pt: { xs: 10, md: 13.75 },
        pb: { xs: 8, md: 11.25 },
        display: 'flex',
        flexDirection: 'column',
        gap: 5.5,
      }}
    >
      <SectionHeader
        id="events-title"
        eyebrow="Happening soon"
        title="Upcoming events"
        aside={
          hasEvents && (
            <Box
              component={Link}
              href="/events"
              sx={{
                fontWeight: 700,
                fontSize: 16,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                minHeight: 44,
                color: brand.red,
                textDecoration: 'none',
                '&:hover': { color: brand.redDark },
              }}
            >
              View all events <ArrowForwardIcon fontSize="small" />
            </Box>
          )
        }
      />
      {hasEvents ? (
        <Box
          sx={{
            display: 'grid',
            // At most 3 columns; each card stays one column wide (≥280px) even when
            // there are only one or two events, instead of stretching across the row.
            gridTemplateColumns:
              'repeat(auto-fill, minmax(min(100%, max(280px, calc((100% - 48px) / 3))), 1fr))',
            gap: 3,
          }}
        >
          {events.map((e) => (
            <EventCard key={e._id} event={new Event(e)} />
          ))}
        </Box>
      ) : (
        <NoUpcomingEvents sundayMorning={sundayMorning} />
      )}
    </Box>
  );
};

export default UpcomingEvents;
