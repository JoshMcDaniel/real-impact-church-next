import { Box, Typography } from '@mui/material';
import Link from 'next/link';

const SelectedEventNotFound = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        justifyItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        gap: '1rem',
        padding: '1rem',
        marginTop: '3rem',
      }}
    >
      <Typography variant="h4">Event not found</Typography>
      <Typography>The event may have expired or been removed.</Typography>
      <Link href={'/events'}>See current Events</Link>
    </Box>
  );
};

export default SelectedEventNotFound;
