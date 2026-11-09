import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';
import { brand } from '../../constants/brand';
import PillLabel from './PillLabel';

type EyebrowProps = { children: ReactNode; tone?: 'red' | 'dark' };

/** Section label shown above headings: a small red (or dark) pill. */
export const Eyebrow = ({ children, tone = 'red' }: EyebrowProps) => <PillLabel tone={tone}>{children}</PillLabel>;

/** Shared section heading style (sizes match across pages). */
export const sectionTitleSx = {
  m: 0,
  fontSize: 'clamp(30px, 3.4vw, 44px)',
  lineHeight: 1.1,
  fontWeight: 800,
  letterSpacing: '-0.01em',
};

type SectionHeaderProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  /** Optional content shown on the right (or below on small screens). */
  aside?: ReactNode;
  titleColor?: string;
  eyebrowTone?: 'red' | 'dark';
};

/** Pill label + H2 heading row used at the top of page sections. */
export const SectionHeader = ({ id, eyebrow, title, aside, titleColor = brand.charcoal, eyebrowTone = 'red' }: SectionHeaderProps) => (
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
      <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>
      <Typography id={id} component="h2" sx={{ ...sectionTitleSx, color: titleColor }}>
        {title}
      </Typography>
    </Box>
    {aside}
  </Box>
);

export default SectionHeader;
