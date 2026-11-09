import Box from '@mui/material/Box';
import { ReactNode } from 'react';
import { brand } from '../../constants/brand';

/** Small uppercase pill used as a section label ("Recent sermons", "Most watched"). */
export const PillLabel = ({ children, tone = 'red' }: { children: ReactNode; tone?: 'red' | 'dark' }) => (
  <Box
    component="span"
    sx={{
      alignSelf: 'flex-start',
      backgroundColor: tone === 'red' ? brand.red : brand.charcoal,
      color: brand.white,
      borderRadius: '999px',
      px: 2,
      py: '7px',
      fontSize: 13,
      fontWeight: 800,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
    }}
  >
    {children}
  </Box>
);

export default PillLabel;
