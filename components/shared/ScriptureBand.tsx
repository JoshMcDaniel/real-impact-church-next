import Box from '@mui/material/Box';
import { brand } from '../../constants/brand';

/** Large centered scripture quote on a light gray band. */
export const ScriptureBand = ({ text, reference }: { text: string; reference: string }) => (
  <Box component="section" aria-label="Scripture" sx={{ backgroundColor: brand.mist, px: 3, py: { xs: 8, md: 11.25 } }}>
    <Box component="figure" sx={{ maxWidth: 860, mx: 'auto', my: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px', textAlign: 'center' }}>
      <Box component="svg" aria-hidden width={44} height={34} viewBox="0 0 34 26" sx={{ fill: brand.red }}>
        <path d="M0 26V15.6C0 6.9 4.6 1.6 13.4 0l1.4 4.1C10 5.5 7.8 8.4 7.6 12.4H14V26H0zm19 0V15.6C19 6.9 23.6 1.6 32.4 0l1.4 4.1C29 5.5 26.8 8.4 26.6 12.4H33V26H19z" />
      </Box>
      <Box component="blockquote" sx={{ m: 0, fontSize: 'clamp(22px, 2.6vw, 32px)', fontWeight: 800, lineHeight: 1.35, color: brand.charcoal }}>
        {text}
      </Box>
      <Box component="figcaption" sx={{ fontSize: 15, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: brand.red }}>
        {reference}
      </Box>
    </Box>
  </Box>
);

export default ScriptureBand;
