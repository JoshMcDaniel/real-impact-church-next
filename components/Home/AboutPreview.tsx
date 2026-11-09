import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { brand, contentMaxWidth } from '../../constants/brand';
import {
  useAboutConfig,
  useHomeConfig,
} from '../../constants/app-config/app-config-hooks';
import PillButton from '../shared/PillButton';
import { Eyebrow } from '../shared/SectionHeader';

export const AboutPreview = () => {
  const { about_preview } = useHomeConfig();
  const descriptions = useAboutConfig().about_description.descriptions;
  const mission = descriptions.find((d) => d.title_text === 'Our Mission');
  const vision = descriptions.find((d) => d.title_text === 'Our Vision');

  return (
    <Box
      component="section"
      id="about"
      aria-labelledby="about-title"
      sx={{
        maxWidth: contentMaxWidth,
        mx: 'auto',
        px: 3,
        pt: { xs: 12, md: 15 },
        pb: { xs: 10, md: 12.5 },
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        alignItems: 'center',
      }}
    >
      <Box sx={{ flex: '1 1 440px', minWidth: 0, position: 'relative' }}>
        <Box sx={{ position: 'relative', height: { xs: 340, md: 460 }, borderRadius: '24px', overflow: 'hidden' }}>
          <Image
            src={about_preview.image.path}
            alt={about_preview.image.description}
            fill
            sizes="(max-width: 960px) 100vw, 600px"
            style={{ objectFit: 'cover' }}
          />
        </Box>
        {mission && (
          <Box
            sx={{
              position: 'absolute',
              right: { xs: 12, sm: -16 },
              bottom: -28,
              backgroundColor: brand.red,
              color: brand.white,
              borderRadius: '18px',
              p: '24px 28px',
              maxWidth: 260,
              boxShadow: '0 18px 40px rgba(217,4,41,.28)',
            }}
          >
            <Typography
              component="p"
              sx={{ m: 0, fontSize: 12, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', opacity: 0.9 }}
            >
              {mission.title_text}
            </Typography>
            <Typography component="p" sx={{ m: '8px 0 0', fontSize: 20, fontWeight: 800, lineHeight: 1.3 }}>
              {mission.description}.
            </Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ flex: '1 1 440px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '22px' }}>
        <Eyebrow>Who we are</Eyebrow>
        <Typography
          id="about-title"
          component="h2"
          sx={{
            m: 0,
            fontSize: 'clamp(32px, 3.6vw, 48px)',
            lineHeight: 1.1,
            fontWeight: 800,
            color: brand.charcoal,
            letterSpacing: '-0.01em',
          }}
        >
          {about_preview.title}
        </Typography>
        <Typography component="p" sx={{ m: 0, fontSize: 18, lineHeight: 1.75 }}>
          {about_preview.text}
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
            gap: 2,
            pt: '6px',
          }}
        >
          {vision && (
            <Box sx={{ backgroundColor: brand.mist, borderRadius: '16px', p: '20px 22px' }}>
              <Typography component="h3" sx={{ m: '0 0 6px', fontSize: 15, fontWeight: 800, color: brand.charcoal }}>
                {vision.title_text}
              </Typography>
              <Typography component="p" sx={{ m: 0, fontSize: 15, lineHeight: 1.6 }}>
                {vision.description}.
              </Typography>
            </Box>
          )}
          <Box sx={{ backgroundColor: brand.mist, borderRadius: '16px', p: '20px 22px' }}>
            <Typography component="h3" sx={{ m: '0 0 6px', fontSize: 15, fontWeight: 800, color: brand.charcoal }}>
              What We Believe
            </Typography>
            <Typography component="p" sx={{ m: 0, fontSize: 15, lineHeight: 1.6 }}>
              Bible-centered faith in the Father, Son and Holy Spirit.{' '}
              <Box component={Link} href="/beliefs" sx={{ fontWeight: 700, color: brand.red }}>
                Read our beliefs
              </Box>
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '12px', pt: '6px' }}>
          <PillButton href="/about" tone="dark">
            More About Us
          </PillButton>
          <PillButton href="/staff" tone="outline">
            Meet Our Staff
          </PillButton>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutPreview;
