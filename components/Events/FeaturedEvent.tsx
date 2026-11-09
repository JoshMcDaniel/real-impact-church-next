import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import Image from 'next/image';
import { ReactNode } from 'react';
import { brand } from '../../constants/brand';
import { Event } from '../../constants/Event';
import PillButton from '../shared/PillButton';
import AddToCalendar from './AddToCalendar';
import { DateBadge } from './EventCard';

const Detail = ({ icon, children }: { icon: ReactNode; children: ReactNode }) => (
  <Box component="li" sx={{ display: 'flex', alignItems: 'center', gap: '10px', '& svg': { color: brand.red, fontSize: 20 } }}>
    {icon}
    <span>{children}</span>
  </Box>
);

/** Large card for the next upcoming event. */
export const FeaturedEvent = ({ event }: { event: Event }) => (
  <Box
    component="article"
    aria-labelledby="featured-event-title"
    sx={{
      backgroundColor: brand.white,
      border: `1px solid ${brand.line}`,
      borderRadius: '24px',
      overflow: 'hidden',
      display: 'flex',
      flexWrap: 'wrap',
    }}
  >
    <Box sx={{ flex: '1.2 1 420px', minWidth: 0, position: 'relative', minHeight: 300, backgroundColor: brand.mist }}>
      <Image src={event.imageUrl(1200)} alt="" fill priority sizes="(max-width: 900px) 100vw, 680px" style={{ objectFit: 'cover' }} />
      <DateBadge event={event} size="large" />
    </Box>
    <Box
      sx={{
        flex: '1 1 380px',
        minWidth: 0,
        p: 'clamp(28px, 4vw, 44px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        justifyContent: 'center',
      }}
    >
      <Typography
        id="featured-event-title"
        component="h2"
        sx={{ m: 0, fontSize: 'clamp(26px, 2.8vw, 36px)', fontWeight: 800, color: brand.charcoal, lineHeight: 1.15 }}
      >
        {event.name}
      </Typography>
      <Box
        component="ul"
        sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: 15, fontWeight: 600, color: brand.charcoal }}
      >
        <Detail icon={<CalendarTodayOutlinedIcon />}>
          <time dateTime={event.startTime}>{event.fullDate}</time>
        </Detail>
        <Detail icon={<AccessTimeIcon />}>{event.timeRange}</Detail>
        <Detail icon={<PlaceOutlinedIcon />}>
          {event.location.name}
          {event.location.full && ` · ${event.location.street || event.location.full}`}
        </Detail>
      </Box>
      {event.summary && (
        <Typography component="p" sx={{ m: 0, fontSize: 16, lineHeight: 1.7 }}>
          {event.summary}
        </Typography>
      )}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', pt: '4px' }}>
        <PillButton href={event.href} size="small">
          Event Details
        </PillButton>
      </Box>
      <AddToCalendar event={event} />
    </Box>
  </Box>
);

export default FeaturedEvent;
