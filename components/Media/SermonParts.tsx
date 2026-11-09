import Box from '@mui/material/Box';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { ReactNode } from 'react';
import { brand } from '../../constants/brand';

/** Light gray pill with a small red icon (date, length, views). */
export const MetaChip = ({ icon, children }: { icon: ReactNode; children: ReactNode }) => (
  <Box
    component="span"
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      backgroundColor: brand.mist,
      borderRadius: '999px',
      px: '10px',
      py: '5px',
      fontSize: 13,
      fontWeight: 600,
      color: brand.charcoal,
      whiteSpace: 'nowrap',
      '& svg': { fontSize: 14, color: brand.red },
    }}
  >
    {icon}
    {children}
  </Box>
);

/** Rounded red play button centered on a thumbnail. */
export const PlayBadge = ({ size = 'medium', sx }: { size?: 'small' | 'medium' | 'large'; sx?: object }) => {
  const dims = { small: [44, 32, 18], medium: [56, 40, 22], large: [72, 50, 28] }[size];
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: dims[0],
        height: dims[1],
        borderRadius: size === 'large' ? '14px' : '12px',
        backgroundColor: brand.red,
        color: brand.white,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 20px rgba(0,0,0,.35)',
        '& svg': { fontSize: dims[2] },
        ...sx,
      }}
    >
      <PlayArrowIcon />
    </Box>
  );
};

/** Dark length tag in a thumbnail's bottom-right corner. */
export const DurationTag = ({ children, small = false }: { children: ReactNode; small?: boolean }) => (
  <Box
    component="span"
    sx={{
      position: 'absolute',
      right: small ? 6 : 10,
      bottom: small ? 6 : 10,
      backgroundColor: 'rgba(0,0,0,.78)',
      color: brand.white,
      fontSize: small ? 11 : 12,
      fontWeight: 700,
      borderRadius: small ? '5px' : '6px',
      px: small ? '6px' : '7px',
      py: small ? '2px' : '3px',
    }}
  >
    {children}
  </Box>
);

export const cardLiftSx = {
  transition: 'transform .2s ease, box-shadow .2s ease',
  '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 18px 40px rgba(43,43,43,.14)' },
};
