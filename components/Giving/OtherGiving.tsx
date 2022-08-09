import { Box, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useOrganizationConfig } from '../../constants/app-config/app-config-hooks';
import GiveInPersonIcon from '../../constants/icons/GiveInPersonIcon';
import GiveByMailIcon from '../../constants/icons/GiveByMailIcon';

const OtherGiving = () => {
  const org = useOrganizationConfig();
  const { street, city, state, zip_code } = org.contact;
  const theme = useTheme();
  const isMediumView = useMediaQuery(theme.breakpoints.up('md'));
  const isSmallView = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box display="grid" textAlign="center" justifyItems="center">
      <Typography variant="h4">More Ways to Give</Typography>
      <Box
        sx={{
          padding: isMediumView ? '2rem' : '2rem 1rem',
          display: 'grid',
          gridAutoFlow: isMediumView ? 'column' : 'row',
          gap: '2rem',
          justifyContent: 'space-evenly',
          width: '100%',
        }}
        component="section"
      >
        <Paper
          sx={{
            padding: isSmallView ? '2rem' : '1rem',
            textAlign: 'left',
            width: isSmallView ? '400px' : '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 3fr',
            gap: isSmallView ? '2rem' : '1rem',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <GiveInPersonIcon />
          <Box display="grid" gridAutoFlow="row" gap="1rem">
            <Typography variant="h6" fontWeight="bolder">
              Give in person
            </Typography>
            <Typography>
              Want to give in person? Feel free to give in person during one of
              our services.
            </Typography>
          </Box>
        </Paper>
        <Paper
          sx={{
            padding: isSmallView ? '2rem' : '1rem',
            textAlign: 'left',
            width: isSmallView ? '400px' : '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 3fr',
            gap: isSmallView ? '2rem' : '1rem',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <GiveByMailIcon />
          <Box display="grid" gridAutoFlow="row" gap="1rem">
            <Typography variant="h6" fontWeight="bolder">
              Give by mail
            </Typography>
            <Typography>
              {org.full_name}
              <br />
              {street} {city},
              <br />
              {state} {zip_code}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default OtherGiving;
