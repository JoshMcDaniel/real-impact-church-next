import {
  Box,
  Card,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import axios, { AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect } from 'react';
import DynamicHead from '../../../components/DynamicHead/DynamicHead';
import EventDateTimeCard from '../../../components/Events/EventDateTimeCard';
import EventDetailsCard from '../../../components/Events/EventDetailsCard';
import EventLocationCard from '../../../components/Events/EventLocationCard';
import SelectedEventNotFound from '../../../components/Events/SelectedEventNotFound';
import LoadingIndication from '../../../components/shared/LoadingIndication';
import { useEventsConfig } from '../../../constants/app-config/app-config-hooks';
import { Event } from '../../../constants/Event';

const SelectedEvent = () => {
  const [event, setEvent] = React.useState<Event>();
  const [requestPending, setRequestPending] = React.useState<boolean>(false);

  const { routes } = useEventsConfig();
  const isMediumView = useMediaQuery(useTheme().breakpoints.up('md'));
  const router = useRouter();
  const eventName = router.query.selectedEventName;

  useEffect(() => {
    if (!!eventName && !event) {
      getEvent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventName]);

  const getEvent = () => {
    setRequestPending(true);

    const config: AxiosRequestConfig = {
      params: { route: eventName },
    };

    axios.get(routes.get_event, config).then((res) => {
      if (res.data) {
        setEvent(new Event(res.data));
      }
      setRequestPending(false);
    });
  };

  return (
    <Fragment>
      <DynamicHead title={'Event'} description="Selected Event page" />
      <Box component="main" className="center-container">
        {!requestPending && event ? (
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
        ) : requestPending ? (
          <LoadingIndication loadingText="Retrieving event info..." />
        ) : (
          <SelectedEventNotFound />
        )}
      </Box>
    </Fragment>
  );
};

export default SelectedEvent;
