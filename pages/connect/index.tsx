import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import axios from 'axios';
import React, { Fragment, useState } from 'react';
import ConnectMainForm, {
  ConnectMainFormContent,
} from '../../components/Connect/ConnectMainForm';
import DynamicHead from '../../components/DynamicHead/DynamicHead';
import CommonSnackbar, {
  CommonSnackbarState,
  initialCommonSnackbarState,
} from '../../components/shared/CommonSnackbar';
import LoadingIndication from '../../components/shared/LoadingIndication';
import { useConnectConfig } from '../../constants/app-config/app-config-hooks';

const connectReasons = [
  {
    icon: <PeopleIcon fontSize="large" sx={{ color: '#d90429' }} />,
    title: 'Join Our Family',
    description:
      'Experience genuine community with people who will love, encourage, and walk alongside you.',
  },
  {
    icon: <FavoriteIcon fontSize="large" sx={{ color: '#d90429' }} />,
    title: 'Let Us Pray for You',
    description:
      "Share what's on your heart and let our church family lift you up in prayer.",
  },
  {
    icon: <MenuBookIcon fontSize="large" sx={{ color: '#d90429' }} />,
    title: 'Grow in Your Faith',
    description:
      'Discover Bible studies, small groups, and resources to help you go deeper in your walk with God.',
  },
  {
    icon: <VolunteerActivismIcon fontSize="large" sx={{ color: '#d90429' }} />,
    title: 'Make a Real Impact',
    description:
      'Find your place to serve and use your gifts to make a difference in our community and beyond.',
  },
];

export const Connect = () => {
  const { snackbar, header } = useConnectConfig();
  const theme = useTheme();
  const isMediumView = useMediaQuery(theme.breakpoints.up('md'));

  const [requestPending, setRequestPending] = useState<boolean>(false);
  const [snackbarState, setSnackbarState] = useState<CommonSnackbarState>(
    initialCommonSnackbarState
  );

  const handleOnSubmit = (form: ConnectMainFormContent): void => {
    if (!requestPending && !!form) {
      submitConnectionForm(form);
    }
  };

  const submitConnectionForm = (form: ConnectMainFormContent): void => {
    setRequestPending(true);

    axios
      .post('/api/connect', form)
      .then(() => {
        setSnackbarState({
          open: true,
          success: true,
          message: snackbar.success_message,
        });
      })
      .catch(() => {
        setSnackbarState({
          open: true,
          success: false,
          message: snackbar.fail_message,
        });
      })
      .finally(() => {
        setRequestPending(false);
      });
  };

  return (
    <Fragment>
      <DynamicHead title={header.title} description={header.description} />

      {/* Hero */}
      <Box
        sx={{
          backgroundColor: '#2b2b2b',
          color: '#ffffff',
          textAlign: 'center',
          padding: isMediumView ? '4rem 2rem' : '3rem 1.5rem',
        }}
      >
        <Typography
          variant={isMediumView ? 'h3' : 'h4'}
          component="h1"
          fontWeight="bold"
          gutterBottom
        >
          We&rsquo;d Love to Meet You
        </Typography>
        <Typography
          variant={isMediumView ? 'h6' : 'body1'}
          sx={{ color: '#d90429', fontWeight: 600 }}
          gutterBottom
        >
          Real Impact Church is saving a place just for you
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: '#cccccc', maxWidth: '560px', margin: '0.75rem auto 0' }}
        >
          Whether you&rsquo;re new to faith or looking for a church home, we
          want to connect with you. Fill out the form below and someone from our
          team will reach out personally.
        </Typography>
      </Box>

      {/* Body */}
      <Container maxWidth="lg" sx={{ py: isMediumView ? '4rem' : '2rem' }}>
        <Box
          display="grid"
          gridTemplateColumns={isMediumView ? '1fr 1.4fr' : '1fr'}
          gap="3rem"
          alignItems="start"
        >
          {/* Left — reasons to connect */}
          <Stack spacing={3}>
            <Typography variant="h5" fontWeight="bold" color="text.primary">
              Why Connect?
            </Typography>
            {connectReasons.map((reason) => (
              <Box key={reason.title} display="flex" gap="1rem" alignItems="flex-start">
                <Box sx={{ mt: '2px', flexShrink: 0 }}>{reason.icon}</Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                    {reason.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                    {reason.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>

          {/* Right — form */}
          <Paper
            elevation={3}
            sx={{
              padding: isMediumView ? '2.5rem' : '1.5rem',
              borderRadius: '12px',
              borderTop: '4px solid #d90429',
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Get in Touch
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: '1.5rem' }}>
              We&rsquo;ll reach out to you soon after you submit.
            </Typography>
            <ConnectMainForm onSubmit={handleOnSubmit} disabled={requestPending} />
          </Paper>
        </Box>
      </Container>

      {requestPending && <LoadingIndication loadingText="Submitting form..." />}

      <CommonSnackbar
        open={snackbarState.open}
        onClose={() => setSnackbarState(initialCommonSnackbarState)}
        message={snackbarState.message}
        severity={snackbarState.success ? 'success' : 'error'}
      />
    </Fragment>
  );
};

export default Connect;
