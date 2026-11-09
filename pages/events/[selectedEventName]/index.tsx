import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { GetStaticPaths, GetStaticProps } from 'next';
import { groq } from 'next-sanity';
import Link from 'next/link';
import DynamicHead from '../../../components/DynamicHead/DynamicHead';
import AddToCalendar from '../../../components/Events/AddToCalendar';
import EventCard from '../../../components/Events/EventCard';
import PageHero from '../../../components/shared/PageHero';
import RichText from '../../../components/shared/RichText';
import { brand, contentMaxWidth } from '../../../constants/brand';
import { Event, EVENT_FIELDS, EventType, UPCOMING_FILTER } from '../../../constants/Event';
import { breadcrumbJsonLd, eventJsonLd } from '../../../constants/structured-data';
import { sanityFetch } from '../../../src/sanity/lib/client';

type SelectedEventProps = {
  event: EventType;
  /** Decided at build/regeneration time so server and browser render the same. */
  isPast: boolean;
  moreEvents: EventType[];
};

const labelSx = {
  m: 0,
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: '.16em',
  textTransform: 'uppercase' as const,
  color: brand.muted,
};

const SelectedEvent = ({ event: eventData, isPast, moreEvents }: SelectedEventProps) => {
  const event = new Event(eventData);
  const more = moreEvents.map((e) => new Event(e));
  const location = event.location;
  const description =
    event.summary ||
    `${event.name} at ${location.name} on ${event.fullDate}, ${event.timeRange}.`;

  return (
    <Box sx={{ backgroundColor: brand.paper, color: brand.text }}>
      <DynamicHead
        fullTitle={`${event.name} | Real Impact Church Events`}
        description={description}
        image={event.imageUrl(1200, 630)}
        imageAlt={event.name}
        noindex={isPast}
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'Events', path: '/events' },
            { name: event.name, path: event.href },
          ]),
          ...(isPast ? [] : [eventJsonLd(event)]),
        ]}
      />
      <Box component="main">
        <PageHero
          breadcrumbs={[{ label: 'Events', href: '/events' }, { label: event.name }]}
          title={event.name}
          text={`${event.fullDate} · ${event.timeRange}`}
          image={{ path: event.imageUrl(1920), description: '' }}
          overlay={0.6}
        />

        {isPast && (
          <Box sx={{ maxWidth: contentMaxWidth, mx: 'auto', px: 3, pt: 5 }}>
            <Box
              role="status"
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px 16px',
                backgroundColor: brand.redTint,
                color: brand.charcoal,
                borderRadius: '16px',
                p: '16px 20px',
                fontWeight: 600,
              }}
            >
              <InfoOutlinedIcon sx={{ color: brand.red }} />
              This event has already happened.
              <Box component={Link} href="/events" sx={{ color: brand.red, fontWeight: 700 }}>
                See upcoming events
              </Box>
            </Box>
          </Box>
        )}

        <Box
          component="section"
          aria-label="Event details"
          sx={{
            maxWidth: contentMaxWidth,
            mx: 'auto',
            px: 3,
            pt: { xs: 6, md: 9 },
            pb: { xs: 8, md: 11.25 },
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
            alignItems: 'flex-start',
          }}
        >
          <Box component="article" sx={{ flex: '999 1 560px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Typography
              component="h2"
              sx={{
                alignSelf: 'flex-start',
                m: 0,
                backgroundColor: brand.red,
                color: brand.white,
                borderRadius: '999px',
                px: 2,
                py: '7px',
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: '.08em',
                textTransform: 'uppercase',
              }}
            >
              About this event
            </Typography>
            {event.summary && (
              <Typography component="p" sx={{ m: 0, fontSize: 22, fontWeight: 700, lineHeight: 1.5, color: brand.charcoal }}>
                {event.summary}
              </Typography>
            )}
            {event.description.length > 0 ? (
              <RichText value={event.description} />
            ) : (
              !event.summary && (
                <Typography component="p" sx={{ m: 0, fontSize: 17, lineHeight: 1.8 }}>
                  More details coming soon. Questions? Reach out on our Connect page.
                </Typography>
              )
            )}
          </Box>

          <Box
            component="aside"
            aria-label="When and where"
            sx={{
              flex: '1 1 340px',
              minWidth: 0,
              // When the columns stack (below ~996px), show When/Where above the description.
              '@media (max-width: 995px)': { order: -1 },
              backgroundColor: brand.white,
              border: `1px solid ${brand.line}`,
              borderRadius: '24px',
              p: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '22px',
              boxShadow: '0 18px 40px rgba(43,43,43,.08)',
            }}
          >
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <Box aria-hidden sx={{ flex: 'none', width: 56, borderRadius: '14px', overflow: 'hidden', textAlign: 'center', border: `1px solid ${brand.line}` }}>
                <Box sx={{ backgroundColor: brand.red, color: brand.white, fontSize: 12, fontWeight: 800, letterSpacing: '.1em', py: '4px' }}>
                  {event.monthShort}
                </Box>
                <Box sx={{ fontSize: 24, fontWeight: 800, color: brand.charcoal, py: '6px' }}>{event.dayOfMonth}</Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <Typography component="h3" sx={labelSx}>
                  When
                </Typography>
                <Typography component="p" sx={{ m: 0, fontSize: 17, fontWeight: 700, color: brand.charcoal }}>
                  <time dateTime={event.startTime}>{event.fullDate}</time>
                </Typography>
                <Typography component="p" sx={{ m: 0, fontSize: 15 }}>
                  {event.timeRange}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', pt: '22px', borderTop: `1px solid ${brand.line}` }}>
              <Box
                aria-hidden
                sx={{
                  flex: 'none',
                  width: 56,
                  height: 56,
                  borderRadius: '14px',
                  backgroundColor: brand.redTint,
                  color: brand.red,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PlaceOutlinedIcon />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}>
                <Typography component="h3" sx={labelSx}>
                  Where
                </Typography>
                <Typography component="p" sx={{ m: 0, fontSize: 17, fontWeight: 700, color: brand.charcoal }}>
                  {location.name}
                </Typography>
                {(location.street || location.cityLine) && (
                  <Box component="address" sx={{ fontStyle: 'normal', fontSize: 15, lineHeight: 1.5 }}>
                    {location.street}
                    {location.street && location.cityLine && <br />}
                    {location.cityLine}
                  </Box>
                )}
                <Box
                  component="a"
                  href={location.mapLink}
                  rel="noopener"
                  sx={{ color: brand.red, fontWeight: 700, fontSize: 15, pt: '4px', minHeight: 32, width: 'fit-content' }}
                >
                  Get directions
                </Box>
              </Box>
            </Box>

            {!isPast && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', pt: '22px', borderTop: `1px solid ${brand.line}` }}>
                <Typography component="h3" sx={labelSx}>
                  Add to your calendar
                </Typography>
                <AddToCalendar event={event} />
              </Box>
            )}
          </Box>
        </Box>

        {more.length > 0 && (
          <Box component="section" aria-labelledby="more-events-title" sx={{ backgroundColor: brand.mist, px: 3, py: { xs: 8, md: 11.25 } }}>
            <Box sx={{ maxWidth: contentMaxWidth, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3.5 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 2 }}>
                <Typography id="more-events-title" component="h2" sx={{ m: 0, fontSize: 'clamp(26px, 2.6vw, 34px)', fontWeight: 800, color: brand.charcoal }}>
                  More upcoming events
                </Typography>
                <Box
                  component={Link}
                  href="/events"
                  sx={{ fontWeight: 700, fontSize: 16, display: 'inline-flex', alignItems: 'center', gap: 1, minHeight: 44, color: brand.red, textDecoration: 'none' }}
                >
                  All events <ArrowForwardIcon fontSize="small" />
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, max(280px, calc((100% - 48px) / 3))), 1fr))',
                  gap: 3,
                }}
              >
                {more.map((e) => (
                  <EventCard key={e.id} event={e} showSummary={false} bordered={false} />
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Pre-build upcoming events; any other event page is built on first visit.
  const slugs = await sanityFetch<string[]>({
    query: groq`*[${UPCOMING_FILTER}].slug.current`,
    tags: ['events'],
  });

  return {
    paths: (slugs ?? []).map((slug) => ({ params: { selectedEventName: slug } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<SelectedEventProps> = async (context) => {
  const slug = context.params?.selectedEventName;
  if (typeof slug !== 'string') return { notFound: true, revalidate: 60 };

  const [event, moreEvents] = await Promise.all([
    sanityFetch<EventType | null>({
      query: groq`*[_type == "events" && slug.current == $slug][0] { ${EVENT_FIELDS}, description }`,
      qParams: { slug },
      tags: ['events'],
    }),
    sanityFetch<EventType[]>({
      query: groq`*[${UPCOMING_FILTER} && slug.current != $slug] | order(startDateTime asc)[0...3] { ${EVENT_FIELDS} }`,
      qParams: { slug },
      tags: ['events'],
    }),
  ]);

  if (!event) return { notFound: true, revalidate: 60 };

  const end = event.endDateTime || event.startDateTime;
  return {
    props: {
      event,
      isPast: new Date(end).getTime() < Date.now(),
      moreEvents: moreEvents ?? [],
    },
    revalidate: 900,
  };
};

export default SelectedEvent;
