import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Image from 'next/image';
import { brand, contentMaxWidth } from '../../constants/brand';
import { useHomeConfig } from '../../constants/app-config/app-config-hooks';
import PillButton from '../shared/PillButton';
import { PLAN_VISIT_HREF } from '../Layout/SiteHeader';

export const HomeHero = () => {
  const { hero } = useHomeConfig();

  return (
    <Box
      component="section"
      aria-labelledby="hero-title"
      sx={{
        position: 'relative',
        minHeight: { xs: 560, md: 680 },
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
        backgroundColor: brand.charcoal,
      }}
    >
      <Image
        src={hero.image.path}
        alt={hero.image.description}
        fill
        priority
        sizes="100vw"
        style={{ objectFit: 'cover' }}
      />
      <Box aria-hidden sx={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(20,20,20,0.55)' }} />
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: contentMaxWidth,
          mx: 'auto',
          px: 3,
          pt: { xs: 12, md: 15 },
          pb: { xs: 16, md: 17.5 },
          display: 'flex',
          flexDirection: 'column',
          gap: '26px',
          color: brand.white,
        }}
      >
        <Typography
          id="hero-title"
          component="h1"
          sx={{ m: 0, display: 'flex', flexDirection: 'column', gap: '22px' }}
        >
          <Box
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '.24em',
              textTransform: 'uppercase',
            }}
          >
            <Box component="span" aria-hidden sx={{ width: 36, height: 3, backgroundColor: brand.red, flex: 'none' }} />
            {hero.eyebrow}
          </Box>
          <Box
            component="span"
            sx={{
              display: 'block',
              fontSize: 'clamp(44px, 7vw, 92px)',
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              maxWidth: 900,
            }}
          >
            {hero.title_lines.map((line) => (
              <Box component="span" key={line} sx={{ display: 'block' }}>
                {line}
              </Box>
            ))}
          </Box>
        </Typography>
        <Typography
          component="p"
          sx={{ m: 0, fontSize: 'clamp(17px, 1.6vw, 21px)', lineHeight: 1.6, maxWidth: 620, color: '#eef1f3' }}
        >
          {hero.text}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '14px', pt: '6px' }}>
          <PillButton href={PLAN_VISIT_HREF} endIcon={<ArrowForwardIcon />}>
            Plan Your Visit
          </PillButton>
          <PillButton href="/media" tone="ghost" startIcon={<PlayCircleOutlineIcon />}>
            Watch Latest Sermon
          </PillButton>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeHero;
