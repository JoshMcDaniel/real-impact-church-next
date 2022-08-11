import { Link, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import axios from 'axios';
import React, { Fragment, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { NextPage } from 'next';
import { useEventsConfig } from '../../constants/app-config/app-config-hooks';
import { Event, EventType } from '../../constants/Event';
import { useRouter } from 'next/router';
import EventCard from '../../components/Events/EventCard';
import NoEvents from '../../components/Events/NoEvents';
import DynamicHead from '../../components/DynamicHead/DynamicHead';

export const Events: NextPage = () => {
  const [events, setEvents] = React.useState<Event[]>([]);
  const [requestPending, setRequestPending] = React.useState<boolean>(false);

  const eventsConfig = useEventsConfig();
  const activeRoute = useRouter().pathname;
  const isMediumView = useMediaQuery(useTheme().breakpoints.up('md'));

  useEffect(() => {
    if (!events.length) {
      getAllEvents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllEvents = () => {
    setRequestPending(true);

    axios.get(eventsConfig.routes.get_all_events).then((res) => {
      const events = res.data.map((e: EventType) => new Event(e));
      setEvents(events);
      setRequestPending(false);
    });
  };

  return (
    <Fragment>
      <DynamicHead title={'Events'} description="Events page" />
      <Box
        component="main"
        display="grid"
        margin="auto"
        gap="2rem"
        padding={isMediumView ? '2rem' : '1rem'}
      >
        <Typography variant="h4">{eventsConfig.header_text}</Typography>
        {!requestPending && events.length < 1 ? (
          <NoEvents />
        ) : (
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
            gap="2rem"
          >
            {(events.length > 0 ? events : Array.from(new Array(3))).map(
              (event, index) => (
                <Link
                  key={event?.route || index}
                  href={`${activeRoute}/${event?.route || '#'}`}
                  style={{ textDecoration: 'none' }}
                >
                  <EventCard event={event} />
                </Link>
              )
            )}
          </Box>
        )}
      </Box>
    </Fragment>
  );
};

export default Events;
