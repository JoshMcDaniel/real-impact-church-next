import { Box, Paper, Typography } from '@mui/material';
import { Event } from '../../constants/Event';

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
        <Typography>{event.description}</Typography>
      </Box>
    </Paper>
  );
};

export default EventDetailsCard;
