import { Box, Fab, Typography } from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';
import ArrowLink from '../shared/ArrowLink';

type Props = {
  description: string;
  furtherInfo: {
    text: string;
    path: string;
  };
  givingPath: string;
};

const OnlineGiving = (props: Props) => {
  return (
    <Box display="grid" gap="0.5rem" textAlign="center" justifyItems="center">
      <Typography variant="h4">Online Giving</Typography>
      <Typography>{props.description}</Typography>
      <ArrowLink
        route={props.furtherInfo?.path}
        linkText={props?.furtherInfo?.text}
        openInNewTab={true}
      />
      <Fab
        variant="extended"
        color="secondary"
        aria-label="Give online button"
        href={props.givingPath}
        target="_blank"
        sx={{
          marginTop: '1.5rem',
        }}
      >
        <PaidIcon
          sx={{
            marginRight: '0.5rem',
          }}
        />
        Give Online
      </Fab>
    </Box>
  );
};

export default OnlineGiving;
