import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { brand, contentMaxWidth } from '../../constants/brand';
import { Event, EventType } from '../../constants/Event';
import { SundayItem } from '../../constants/sunday-schedule';
import {
  useMediaConfig,
  useOrganizationConfig,
} from '../../constants/app-config/app-config-hooks';
import PillButton from '../shared/PillButton';
import SectionHeader from '../shared/SectionHeader';
import { PLAN_VISIT_HREF } from '../Layout/SiteHeader';

const EventCard = ({ event }: { event: Event }) => {
  const start = event.startTime ? dayjs(event.startTime) : null;
  return (
    <Box
      component={Link}
      href={`/events/${event.route}`}
      sx={{
        backgroundColor: brand.white,
        border: `1px solid ${brand.line}`,
        borderRadius: '20px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'transform .2s ease, box-shadow .2s ease',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 18px 40px rgba(43,43,43,.14)' },
      }}
    >
      <Box component="article" sx={{ display: 'contents' }}>
        <Box sx={{ position: 'relative', height: 190, backgroundColor: brand.mist }}>
          <Image src={event.imageUrl} alt="" fill sizes="(max-width: 700px) 100vw, 400px" style={{ objectFit: 'cover' }} />
          {start && (
            <Box
              sx={{
                position: 'absolute',
                left: 16,
                top: 16,
                backgroundColor: brand.white,
                borderRadius: '12px',
                p: '8px 14px',
                textAlign: 'center',
                boxShadow: '0 6px 18px rgba(0,0,0,.12)',
              }}
            >
              <Typography component="p" sx={{ m: 0, fontSize: 12, fontWeight: 800, color: brand.red, letterSpacing: '.1em' }}>
                {start.format('MMM').toUpperCase()}
              </Typography>
              <Typography component="p" sx={{ m: 0, fontSize: 24, fontWeight: 800, color: brand.charcoal, lineHeight: 1.1 }}>
                {start.format('D')}
              </Typography>
            </Box>
          )}
        </Box>
        <Box sx={{ p: '24px 24px 28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Typography component="h3" sx={{ m: 0, fontSize: 20, fontWeight: 800, color: brand.charcoal }}>
            {event.name}
          </Typography>
          {start && (
            <Typography component="p" sx={{ m: 0, fontSize: 14, fontWeight: 600, color: brand.muted }}>
              <time dateTime={event.startTime}>{start.format('dddd · h:mm A')}</time>
            </Typography>
          )}
          {event.summary && (
            <Typography component="p" sx={{ m: 0, fontSize: 15, lineHeight: 1.6 }}>
              {event.summary}
            </Typography>
          )}
          <Typography component="span" sx={{ fontWeight: 700, fontSize: 15, color: brand.red, pt: '6px' }}>
            Event details →
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const NoUpcomingEvents = ({ sundayMorning }: { sundayMorning: SundayItem[] }) => {
  const { full_name } = useOrganizationConfig();
  const socials = useMediaConfig().social_media.filter(
    (s) => s.platform === 'FACEBOOK' || s.platform === 'INSTAGRAM'
  );

  return (
    <Box
      sx={{
        backgroundColor: brand.white,
        border: `1px solid ${brand.line}`,
        borderRadius: '24px',
        p: { xs: '28px 20px', sm: '44px' },
        display: 'flex',
        flexWrap: 'wrap',
        gap: 5,
        alignItems: 'center',
      }}
    >
      <Box sx={{ flex: '1 1 360px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box
          aria-hidden
          sx={{
            width: 56,
            height: 56,
            borderRadius: '16px',
            backgroundColor: brand.redTint,
            color: brand.red,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CalendarMonthOutlinedIcon />
        </Box>
        <Typography
          component="h3"
          sx={{ m: 0, fontSize: 'clamp(22px, 2.2vw, 28px)', lineHeight: 1.25, fontWeight: 800, color: brand.charcoal }}
        >
          No special events on the calendar right now — but we gather every Sunday.
        </Typography>
        <Typography component="p" sx={{ m: 0, fontSize: 16, lineHeight: 1.7, maxWidth: 520 }}>
          Come for breakfast, stay for Bible study and worship. Follow us on social media to be the first to hear about
          upcoming events.
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', pt: '6px' }}>
          <PillButton href={PLAN_VISIT_HREF}>Plan Your Visit</PillButton>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            {socials.map((s) => {
              const label = s.platform.charAt(0) + s.platform.slice(1).toLowerCase();
              return (
                <Box
                  key={s.platform}
                  component="a"
                  href={s.path}
                  rel="noopener"
                  aria-label={`Follow ${full_name} on ${label}`}
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    border: '1px solid #cfd6da',
                    color: brand.charcoal,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': { backgroundColor: brand.charcoal, color: brand.white, borderColor: brand.charcoal },
                  }}
                >
                  {s.platform === 'FACEBOOK' ? <FacebookIcon fontSize="small" /> : <InstagramIcon fontSize="small" />}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>

      <Box
        component="ol"
        aria-label="Every Sunday"
        sx={{ flex: '1 1 340px', minWidth: 0, listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}
      >
        {sundayMorning.map((item) => {
          const highlight = item.key === 'worship';
          return (
            <Box
              component="li"
              key={item.key}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '18px',
                backgroundColor: highlight ? brand.red : brand.mist,
                color: highlight ? brand.white : brand.charcoal,
                borderRadius: '16px',
                p: '18px 20px',
              }}
            >
              <Typography component="p" sx={{ m: 0, flex: 'none', width: 104, fontSize: 18, fontWeight: 800 }}>
                <time>{item.time}</time>
              </Typography>
              <Box sx={{ minWidth: 0 }}>
                <Typography component="p" sx={{ m: 0, fontSize: 16, fontWeight: 800 }}>
                  {item.title}
                </Typography>
                <Typography component="p" sx={{ m: '2px 0 0', fontSize: 14, color: highlight ? brand.redSoft : brand.muted }}>
                  Every Sunday
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

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
