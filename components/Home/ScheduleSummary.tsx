import { Divider, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import ScheduleSummaryService, { Service } from './ScheduleSummaryService';

export const ScheduleSummary = (props: { services: Service[] }) => {
  const { services } = props;
  return (
    <Paper
      component="section"
      sx={{
        padding: '1rem',
        display: 'grid',
        rowGap: '2rem',
        textAlign: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h4">Schedule</Typography>
      {services.length && (
        <Box
          sx={{
            display: 'grid',
            rowGap: '1rem',
          }}
        >
          {services.map((service, index) => (
            <Box
              key={index}
              sx={{
                display: 'grid',
                rowGap: '0.5rem',
                maxWidth: '800px',
              }}
            >
              <ScheduleSummaryService service={service} />
              {index !== services.length - 1 && (
                <Divider
                  sx={{
                    marginTop: '1rem',
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      )}
    </Paper>
  );
};
