import Box from '@mui/material/Box';
import { brand } from '../../constants/brand';

export type Glow = {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  size: number;
  opacity: number;
};

/**
 * Decorative red glow circles for dark cards and sections.
 *
 * The circles overflow their container, so they're clipped inside their own
 * absolutely positioned layer. The card itself must NOT use overflow: hidden:
 * when a focusable element inside such a card gets focus, browsers scroll the
 * card sideways toward the overflowing glow and the content shifts out of view.
 */
export const GlowLayer = ({ glows }: { glows: Glow[] }) => (
  <Box
    aria-hidden
    sx={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 'inherit', pointerEvents: 'none' }}
  >
    {glows.map(({ size, opacity, ...pos }, index) => (
      <Box
        key={index}
        sx={{ position: 'absolute', ...pos, width: size, height: size, borderRadius: '50%', backgroundColor: brand.red, opacity }}
      />
    ))}
  </Box>
);

export default GlowLayer;
