import {
  Box,
  Card,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import axios, { AxiosRequestConfig } from 'axios';
import React, { Fragment } from 'react';
import DynamicHead from '../../../components/DynamicHead/DynamicHead';
import EventDateTimeCard from '../../../components/Events/EventDateTimeCard';
import EventDetailsCard from '../../../components/Events/EventDetailsCard';
import EventLocationCard from '../../../components/Events/EventLocationCard';
import { Event, EventType } from '../../../constants/Event';
import appConfig from '../../../constants/app-config/config.json';
import { GetStaticPaths, GetStaticProps } from 'next';
import LoadingIndication from '../../../components/shared/LoadingIndication';
import { useRouter } from 'next/router';
import SelectedEventNotFound from '../../../components/Events/SelectedEventNotFound';

const SelectedEvent = (props: { event: EventType }) => {
  const isMediumView = useMediaQuery(useTheme().breakpoints.up('md'));

  const router = useRouter();
  if (router.isFallback) {
    return <LoadingIndication loadingText="Retrieving event info..." />;
  }
  if (!props.event) {
    return <SelectedEventNotFound />;
  }

  const event = new Event(props.event);

  return (
    <Fragment>
      <DynamicHead title={'Event'} description="Selected Event page" />
      <Box component="main" className="center-container">
        <Box>
          <Card raised>
            <CardMedia
              component="img"
              image={event.imageUrl}
              alt={event.name}
            />
          </Card>
          <Box
            display="grid"
            gap="2rem"
            padding={isMediumView ? '2rem' : '1rem'}
          >
            <Typography variant="h4" component="h1" fontWeight="bolder">
              {event.name}
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gap: '1rem',
                gridTemplateColumns: isMediumView ? '1fr 1fr' : '1fr',
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gap: '1rem',
                  gridAutoFlow: 'row',
                }}
              >
                <EventDateTimeCard event={event} />
                <EventLocationCard eventLocation={event.location} />
              </Box>
              <EventDetailsCard event={event} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get(appConfig.website.events.routes.get_all_events);
  const events: EventType[] = res.data.events;
  return {
    fallback: true,
    paths: events.map((event) => ({
      params: {
        selectedEventName: event.name,
      },
    })),
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const eventName = context?.params?.selectedEventName;
  const config: AxiosRequestConfig = {
    params: { route: eventName },
  };
  const url = appConfig.website.events.routes.get_event;
  const res = await axios.get(url, config);
  const event = res.data.event;

  return {
    props: {
      event,
    },
    revalidate: 30, // In seconds
  };
};

export default SelectedEvent;
