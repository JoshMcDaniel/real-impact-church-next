import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';
import { brand, contentMaxWidth } from '../../constants/brand';

type DarkCtaCardProps = {
  id: string;
  title: string;
  text: string;
  /** Buttons shown on the right (below on narrow screens). */
  actions: ReactNode;
};

/** Dark rounded call-to-action card with a soft red glow. */
export const DarkCtaCard = ({ id, title, text, actions }: DarkCtaCardProps) => (
  <Box component="section" aria-labelledby={id} sx={{ maxWidth: contentMaxWidth, mx: 'auto', px: 3, py: { xs: 8, md: 11.25 } }}>
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: brand.footer,
        color: brand.white,
        borderRadius: '28px',
        p: 'clamp(32px, 5vw, 56px)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 3.5,
      }}
    >
      <Box aria-hidden sx={{ position: 'absolute', right: -120, top: -120, width: 380, height: 380, borderRadius: '50%', backgroundColor: brand.red, opacity: 0.18 }} />
      <Box sx={{ position: 'relative', flex: '2 1 420px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Typography id={id} component="h2" sx={{ m: 0, fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 800, lineHeight: 1.15 }}>
          {title}
        </Typography>
        <Typography component="p" sx={{ m: 0, fontSize: 17, lineHeight: 1.7, color: '#d6dadd' }}>
          {text}
        </Typography>
      </Box>
      <Box sx={{ position: 'relative', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>{actions}</Box>
    </Box>
  </Box>
);

export default DarkCtaCard;
