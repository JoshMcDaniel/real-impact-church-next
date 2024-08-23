import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { Fragment } from 'react';
import DynamicHead from '../../../components/DynamicHead/DynamicHead';
import EventDateTimeCard from '../../../components/Events/EventDateTimeCard';
import EventDetailsCard from '../../../components/Events/EventDetailsCard';
import { Event, EventType } from '../../../constants/Event';
import { GetStaticPaths, GetStaticProps } from 'next';
import LoadingIndication from '../../../components/shared/LoadingIndication';
import { useRouter } from 'next/router';
import SelectedEventNotFound from '../../../components/Events/SelectedEventNotFound';
import { client, sanityFetch } from '../../../src/sanity/lib/client';
import FixedBackgroundImage from '../../../components/shared/FixedBackgroundImage';
import { groq } from 'next-sanity';

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
      <DynamicHead title={event.name} description={event.summary} />
      <Box component="main">
        <Box>
          <Box
            component="section"
            sx={{
              position: 'relative',
              height: '60vh',
            }}
          >
            <FixedBackgroundImage
              imgPath={event.imageUrl}
              height="100%"
              width="100%"
            />
            <Box
              display="grid"
              alignContent={'center'}
              padding={'1rem 2rem'}
              bgcolor={'rgba(0, 0, 0, 0.5)'}
              position={'absolute'}
              bottom={'0'}
              color={'white'}
              width={'100%'}
            >
              <Typography
                variant={isMediumView ? 'h4' : 'h5'}
                component="h1"
                fontWeight="bolder"
                textAlign={isMediumView ? 'center' : 'left'}
              >
                {event.name}
              </Typography>
            </Box>
          </Box>
          <Box
            display="grid"
            gap="2rem"
            padding={isMediumView ? '2rem' : '1rem'}
          >
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
  // const res = await axios.get(appConfig.website.events.routes.get_all_events);
  // const events: EventType[] = res.data.events;
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
    fallback: true,
    paths: events.map((event) => ({
      params: {
        selectedEventName: event.name,
      },
    })),
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context?.params?.selectedEventName;
  // const config: AxiosRequestConfig = {
  //   params: { route: slug },
  // };
  // const url = appConfig.website.events.routes.get_event;
  // const res = await axios.get(url, config);
  // const event = res.data.event;

  const query = `*[_type == "events" && slug.current == $slug][0] {
    _id,
    name,
    image,
    startDateTime,
    endDateTime,
    summary,
    description
  }`;

  const params = { slug };
  const event = await client.fetch(query, params);

  return {
    props: {
      event,
    },
    revalidate: 30, // In seconds
  };
};

export default SelectedEvent;
