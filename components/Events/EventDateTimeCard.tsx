import { Box, Divider, Paper, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import styles from '../../styles/Events.module.css';
import { Event } from '../../constants/Event';
import EventDate from './EventDate';

const EventDateTimeCard = (props: { event: Event }) => {
  const event = props.event;
  return (
    <Paper className={styles.editContainer}>
      <EventDate event={event} />
      <Divider />
      <Box className={styles.edtSectionContainer}>
        <AccessTimeIcon />
        <Box>
          <Typography variant="caption">Begins</Typography>
          <Typography>{event.startTime}</Typography>
        </Box>
        <Box>
          <Typography variant="caption">Ends</Typography>
          <Typography>{event.endTime}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default EventDateTimeCard;
