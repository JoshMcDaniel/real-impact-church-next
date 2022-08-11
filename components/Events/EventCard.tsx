import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Skeleton,
  Box,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Event } from '../../constants/Event';
import EventDate from './EventDate';

export const EventCard = (props: { event: Event }) => {
  const event = props.event;

  return (
    <Card raised>
      <CardActionArea>
        {!!event ? (
          <CardMedia
            component="img"
            height="200"
            image={event?.imageUrl}
            alt={event?.name}
          />
        ) : (
          <Skeleton variant="rectangular" height={200} />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {!!event?.name ? event.name : <Skeleton width="50%" />}
          </Typography>
          <Box
            display="grid"
            gridAutoFlow="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <EventDate event={event} />
            <Box display="grid" gridAutoFlow="column" columnGap="1rem">
              <AccessTimeIcon />
              <Typography>
                {event?.startTime ? event.startTime : <Skeleton width="80px" />}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EventCard;
