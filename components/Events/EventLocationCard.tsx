import { Box, Paper, Typography } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import styles from '../../styles/Events.module.css';
import { EventTypeLocation } from '../../constants/Event';
import DirectionLink from '../shared/DirectionLink';

export const EventLocationCard = (props: {
  eventLocation: EventTypeLocation;
}) => {
  const { streetAddress, city, state, zipCode, mapLink } = props.eventLocation;

  return (
    <Paper
      className={styles.elcContainer}
      sx={{
        padding: '1rem',
        height: 'fit-content',
        justifyContent: 'space-between',
      }}
    >
      <Box
        className={styles.elcContainer}
        sx={{
          width: 'fit-content',
        }}
      >
        <MapIcon />
        <Typography>
          {streetAddress} {city}
          <br />
          {state} {zipCode}
        </Typography>
      </Box>
      <DirectionLink href={mapLink} />
    </Paper>
  );
};

export default EventLocationCard;
