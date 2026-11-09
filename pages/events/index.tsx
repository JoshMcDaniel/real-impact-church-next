import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { GetStaticProps } from 'next';
import { groq } from 'next-sanity';
import DynamicHead from '../../components/DynamicHead/DynamicHead';
import EventCard from '../../components/Events/EventCard';
import FeaturedEvent from '../../components/Events/FeaturedEvent';
import NoUpcomingEvents from '../../components/Events/NoUpcomingEvents';
import StayInTheLoop from '../../components/Events/StayInTheLoop';
import WeeklySchedule from '../../components/Events/WeeklySchedule';
import PageHero from '../../components/shared/PageHero';
import { Eyebrow } from '../../components/shared/SectionHeader';
import { useEventsConfig } from '../../constants/app-config/app-config-hooks';
import { brand, contentMaxWidth } from '../../constants/brand';
import { Event, EVENT_FIELDS, EventType, UPCOMING_FILTER } from '../../constants/Event';
import { Service } from '../../constants/Service';
import { breadcrumbJsonLd } from '../../constants/structured-data';
import { getPrimaryService, getSundayMorning } from '../../constants/sunday-schedule';
import { sanityFetch } from '../../src/sanity/lib/client';

type EventsProps = {
  events: EventType[];
  services: Service[];
};

export const Events = ({ events, services }: EventsProps) => {
  const eventsConfig = useEventsConfig();
  const sundayMorning = getSundayMorning(getPrimaryService(services));
  const [featured, ...rest] = events.map((e) => new Event(e));

  return (
    <Box sx={{ backgroundColor: brand.paper, color: brand.text }}>
      <DynamicHead
        fullTitle={eventsConfig.header.title}
        description={eventsConfig.header.description}
        image={eventsConfig.hero.image.path}
        imageAlt={eventsConfig.hero.image.description}
        jsonLd={[breadcrumbJsonLd([{ name: 'Events', path: '/events' }])]}
      />
      <Box component="main">
        <PageHero
          eyebrow={eventsConfig.hero.eyebrow}
          title={eventsConfig.hero.title}
          text={eventsConfig.hero.text}
          image={eventsConfig.hero.image}
          overlay={0.62}
        />

        <Box sx={{ maxWidth: contentMaxWidth, mx: 'auto', px: 3, pt: { xs: 7, md: 10 }, pb: { xs: 8, md: 12.5 }, display: 'flex', flexDirection: 'column', gap: 5 }}>
          {featured ? (
            <>
              <Box component="section" aria-label="Next event" sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
                <Eyebrow>Next up</Eyebrow>
                <FeaturedEvent event={featured} />
              </Box>
              {rest.length > 0 && (
                <Box component="section" aria-labelledby="more-title" sx={{ display: 'flex', flexDirection: 'column', gap: 3.5, pt: 3 }}>
                  <Typography id="more-title" component="h2" sx={{ m: 0, fontSize: 'clamp(26px, 2.6vw, 34px)', fontWeight: 800, color: brand.charcoal }}>
                    More upcoming events
                  </Typography>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, max(280px, calc((100% - 48px) / 3))), 1fr))',
                      gap: 3,
                    }}
                  >
                    {rest.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </Box>
                </Box>
              )}
            </>
          ) : (
            <NoUpcomingEvents sundayMorning={sundayMorning} />
          )}
        </Box>

        {featured && <WeeklySchedule sundayMorning={sundayMorning} />}
        <StayInTheLoop />
      </Box>
    </Box>
  );
};

export const getStaticProps: GetStaticProps<EventsProps> = async () => {
  const [events, services] = await Promise.all([
    sanityFetch<EventType[]>({
      query: groq`*[${UPCOMING_FILTER}] | order(startDateTime asc) { ${EVENT_FIELDS} }`,
      tags: ['events'],
    }),
    sanityFetch<Service[]>({
      query: groq`*[_type == "service"] | order(displayOrder asc) { title, dayOfWeek, time, description }`,
      tags: ['service'],
    }),
  ]);

  return {
    props: { events: events ?? [], services: services ?? [] },
    // Past events drop off within 15 minutes of ending.
    revalidate: 900,
  };
};

export default Events;
