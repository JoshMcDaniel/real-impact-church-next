import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';
import { brand } from '../../constants/brand';

type EyebrowProps = { children: ReactNode; color?: string };

/** Small uppercase label shown above section headings. */
export const Eyebrow = ({ children, color = brand.red }: EyebrowProps) => (
  <Typography
    component="p"
    sx={{
      m: 0,
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: '.24em',
      textTransform: 'uppercase',
      color,
    }}
  >
    {children}
  </Typography>
);

type SectionHeaderProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  /** Optional content shown on the right (or below on small screens). */
  aside?: ReactNode;
  titleColor?: string;
  eyebrowColor?: string;
};

/** Eyebrow + H2 heading row used at the top of home page sections. */
export const SectionHeader = ({
  id,
  eyebrow,
  title,
  aside,
  titleColor = brand.charcoal,
  eyebrowColor,
}: SectionHeaderProps) => (
  <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: '20px 24px',
    }}
  >
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: 680 }}>
      <Eyebrow color={eyebrowColor}>{eyebrow}</Eyebrow>
      <Typography
        id={id}
        component="h2"
        sx={{
          m: 0,
          fontSize: 'clamp(30px, 3.4vw, 44px)',
          lineHeight: 1.15,
          fontWeight: 800,
          color: titleColor,
        }}
      >
        {title}
      </Typography>
    </Box>
    {aside}
  </Box>
);

export default SectionHeader;
