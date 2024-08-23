import { Box, Paper, Typography } from '@mui/material';
import { Event } from '../../constants/Event';
import BlockContent from '@sanity/block-content-to-react';

type EventDetailsCardProps = {
  event: Event;
};

const EventDetailsCard = (props: EventDetailsCardProps) => {
  const event = props.event;
  return (
    <Paper
      sx={{
        padding: '1rem',
        height: 'fit-content',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gap: '0.25rem',
        }}
      >
        <Typography fontWeight="bolder">Event details</Typography>
        <BlockContent blocks={event.description} />
      </Box>
    </Paper>
  );
};

export default EventDetailsCard;
