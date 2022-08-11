import { Box, Skeleton, Typography } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import styles from '../../styles/Events.module.css';
import { Event } from '../../constants/Event';

const EventDate = (props: { event: Event }) => {
  const event = props.event;

  return (
    <Box className={styles.editSectionContainer}>
      <EventIcon />
      <Box>
        <Typography>
          {event?.dayOfWeek ? event.dayOfWeek : <Skeleton width="80px" />}
        </Typography>
        <Typography fontWeight="bolder">
          {event?.dateAsDateObj?.format('MMM, DD') || <Skeleton width="80px" />}
        </Typography>
      </Box>
    </Box>
  );
};

export default EventDate;
