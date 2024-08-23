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
      <Box
        className={styles.edtSectionContainer}
        display={'grid'}
        gridAutoFlow={'column'}
        gap={'1rem'}
        justifyContent={'start'}
        alignItems={'center'}
      >
        <AccessTimeIcon />
        <Box>
          <Typography variant="caption">Begins</Typography>
          <Typography>
            {event.dateAsDateObj(event.startTime)?.format('h:mm a')}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption">Ends</Typography>
          <Typography>
            {event.dateAsDateObj(event.endTime)?.format('h:mm a')}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default EventDateTimeCard;
