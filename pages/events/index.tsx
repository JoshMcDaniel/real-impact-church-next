import { Link, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import React, { Fragment } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEventsConfig } from '../../constants/app-config/app-config-hooks';
import { Event, EventType } from '../../constants/Event';
import { useRouter } from 'next/router';
import EventCard from '../../components/Events/EventCard';
import NoEvents from '../../components/Events/NoEvents';
import DynamicHead from '../../components/DynamicHead/DynamicHead';
import { sanityFetch } from '../../src/sanity/lib/client';
import { groq } from 'next-sanity';

export const Events = (props: { events: EventType[] }) => {
  const { events } = props;
  const eventsConfig = useEventsConfig();
  const activeRoute = useRouter().pathname;
  const isMediumView = useMediaQuery(useTheme().breakpoints.up('md'));

  return (
    <Fragment>
      <DynamicHead
        title={eventsConfig.header.title}
        description={eventsConfig.header.description}
      />
      <Box
        component="main"
        display="grid"
        margin="auto"
        gap="2rem"
        padding={isMediumView ? '2rem' : '1rem'}
      >
        <Typography variant="h4">{eventsConfig.header_text}</Typography>
        {events.length < 1 ? (
          <NoEvents />
        ) : (
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
            gap="2rem"
          >
            {events
              .map((e) => new Event(e))
              .map((event, index) => (
                <Link
                  key={event?.route || index}
                  href={`${activeRoute}/${event?.route || '#'}`}
                  style={{ textDecoration: 'none' }}
                >
                  <EventCard event={event} />
                </Link>
              ))}
          </Box>
        )}
      </Box>
    </Fragment>
  );
};

export async function getStaticProps() {
  // const res = await axios.get(appConfig.website.events.routes.get_all_events);
  // const events = res.data.events;

  const events: EventType[] = await sanityFetch({
    query: groq`*[_type == "events"] {
    _id,
    name,
    "slug": slug.current,
    image,
    startDateTime,
    endDateTime,
    summary,
    description
    }`,
    tags: ['staff'],
  });

  return {
    props: {
      events,
    },
    revalidate: 30, // In seconds
  };
}

export default Events;
