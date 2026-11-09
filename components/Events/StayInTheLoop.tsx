import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { ReactNode } from 'react';
import { brand, contentMaxWidth } from '../../constants/brand';
import { useMediaConfig } from '../../constants/app-config/app-config-hooks';
import PillButton from '../shared/PillButton';

const icons: Record<string, { icon: ReactNode; label: string }> = {
  FACEBOOK: { icon: <FacebookIcon />, label: 'Facebook' },
  INSTAGRAM: { icon: <InstagramIcon />, label: 'Instagram' },
};

/** Prompt to follow the church on social media for event announcements. */
export const StayInTheLoop = () => {
  const socials = useMediaConfig().social_media.filter((s) => icons[s.platform]);

  return (
    <Box
      component="section"
      aria-labelledby="loop-title"
      sx={{
        maxWidth: contentMaxWidth,
        mx: 'auto',
        px: 3,
        py: { xs: 8, md: 11.25 },
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 3.5,
      }}
    >
      <Box sx={{ flex: '2 1 420px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Typography id="loop-title" component="h2" sx={{ m: 0, fontSize: 'clamp(26px, 2.6vw, 34px)', fontWeight: 800, color: brand.charcoal }}>
          Stay in the loop
        </Typography>
        <Typography component="p" sx={{ m: 0, fontSize: 17, lineHeight: 1.7 }}>
          New events are announced on Facebook and Instagram first. Follow along so you never miss one.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {socials.map((s) => (
          <PillButton key={s.platform} href={s.path} tone="outline" startIcon={icons[s.platform].icon}>
            {icons[s.platform].label}
          </PillButton>
        ))}
      </Box>
    </Box>
  );
};

export default StayInTheLoop;
