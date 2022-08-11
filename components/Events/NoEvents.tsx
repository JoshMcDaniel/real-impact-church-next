import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const NoEvents = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        justifyItems: 'center',
        alignContent: 'center',
        gap: '1rem',
      }}
    >
      <Typography variant="h4">No events found</Typography>
      <Typography>Please check again soon!</Typography>
    </Box>
  );
};

export default NoEvents;
