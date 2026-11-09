import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { brand } from '../../constants/brand';
import { Event } from '../../constants/Event';

export const DateBadge = ({ event, size = 'medium' }: { event: Event; size?: 'medium' | 'large' }) => (
  <Box
    aria-hidden
    sx={{
      position: 'absolute',
      left: size === 'large' ? 20 : 16,
      top: size === 'large' ? 20 : 16,
      backgroundColor: brand.white,
      borderRadius: size === 'large' ? '14px' : '12px',
      p: size === 'large' ? '10px 16px' : '8px 14px',
      textAlign: 'center',
      boxShadow: '0 6px 18px rgba(0,0,0,.12)',
    }}
  >
    <Box component="span" sx={{ display: 'block', fontSize: size === 'large' ? 13 : 12, fontWeight: 800, color: brand.red, letterSpacing: '.1em' }}>
      {event.monthShort}
    </Box>
    <Box component="span" sx={{ display: 'block', fontSize: size === 'large' ? 30 : 24, fontWeight: 800, color: brand.charcoal, lineHeight: 1.1 }}>
      {event.dayOfMonth}
    </Box>
  </Box>
);

export const cardHoverSx = {
  transition: 'transform .2s ease, box-shadow .2s ease',
  '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 18px 40px rgba(43,43,43,.14)' },
};

type EventCardProps = {
  event: Event;
  /** Show the summary text (used on the Home and Events pages). */
  showSummary?: boolean;
  headingLevel?: 'h2' | 'h3';
  bordered?: boolean;
};

/** Event preview card linking to the event's page. */
export const EventCard = ({ event, showSummary = true, headingLevel = 'h3', bordered = true }: EventCardProps) => (
  <Box
    component={Link}
    href={event.href}
    sx={{
      backgroundColor: brand.white,
      border: bordered ? `1px solid ${brand.line}` : 'none',
      borderRadius: '20px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      textDecoration: 'none',
      color: brand.text,
      ...cardHoverSx,
    }}
  >
    <Box sx={{ position: 'relative', height: 190, backgroundColor: brand.mist }}>
      <Image src={event.imageUrl(800)} alt="" fill sizes="(max-width: 700px) 100vw, 400px" style={{ objectFit: 'cover' }} />
      <DateBadge event={event} />
    </Box>
    <Box sx={{ p: '24px 24px 28px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
      <Typography component={headingLevel} sx={{ m: 0, fontSize: 20, fontWeight: 800, color: brand.charcoal }}>
        {event.name}
      </Typography>
      <Typography component="p" sx={{ m: 0, fontSize: 14, fontWeight: 600, color: brand.muted }}>
        <time dateTime={event.startTime}>
          {event.weekday} · {event.startClock}
        </time>
        {!event.location.isChurch && ` · ${event.location.name}`}
      </Typography>
      {showSummary && event.summary && (
        <Typography component="p" sx={{ m: 0, fontSize: 15, lineHeight: 1.6 }}>
          {event.summary}
        </Typography>
      )}
      <Typography component="span" sx={{ fontWeight: 700, fontSize: 15, color: brand.red, pt: '6px', mt: 'auto' }}>
        Event details →
      </Typography>
    </Box>
  </Box>
);

export default EventCard;
