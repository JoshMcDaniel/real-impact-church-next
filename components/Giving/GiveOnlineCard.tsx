import Box from '@mui/material/Box';
import GlowLayer from '../shared/GlowLayer';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Image from 'next/image';
import { brand, contentMaxWidth } from '../../constants/brand';
import { useGivingConfig } from '../../constants/app-config/app-config-hooks';
import PillButton from '../shared/PillButton';
import PillLabel from '../shared/PillLabel';

/** Dark feature card linking to Tithe.ly online giving. */
export const GiveOnlineCard = () => {
  const { online_giving } = useGivingConfig();

  return (
    <Box component="section" aria-labelledby="online-title" sx={{ maxWidth: contentMaxWidth, mx: 'auto', px: 3, pt: { xs: 7, md: 9 }, pb: 5 }}>
      <Box
        sx={{
          position: 'relative',
          backgroundColor: brand.footer,
          color: brand.white,
          borderRadius: '28px',
          display: 'flex',
          // Photo on top when stacked, text on the left when side by side.
          flexWrap: 'wrap-reverse',
          alignItems: 'center',
        }}
      >
        <GlowLayer glows={[{ left: -140, bottom: -160, size: 440, opacity: 0.16 }]} />

        <Box sx={{ position: 'relative', flex: '1 1 380px', minWidth: 0, p: 'clamp(32px, 5vw, 56px)', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <PillLabel>Give online</PillLabel>
          <Typography id="online-title" component="h2" sx={{ m: 0, fontSize: 'clamp(30px, 3.6vw, 46px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.01em' }}>
            {online_giving.title}
          </Typography>
          <Typography component="p" sx={{ m: 0, fontSize: 16, lineHeight: 1.7, color: '#d6dadd' }}>
            {online_giving.description}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px', pt: 1 }}>
            <PillButton
              href={online_giving.giving_path}
              target="_blank"
              startIcon={<FavoriteBorderIcon />}
              aria-label="Give online through Tithe.ly (opens in a new tab)"
              sx={{ minHeight: 56, px: { xs: '24px', sm: '30px' }, fontSize: 17 }}
            >
              Give Online
            </PillButton>
            <Box
              component="a"
              href={online_giving.further_info.path}
              target="_blank"
              rel="noopener"
              sx={{ color: '#ff8a9a', fontWeight: 700, fontSize: 15, minHeight: 44, display: 'inline-flex', alignItems: 'center', textDecoration: 'none', '&:hover': { color: brand.white } }}
            >
              {online_giving.further_info.text} →
            </Box>
          </Box>
        </Box>

        <Box sx={{ position: 'relative', flex: '1.2 1 440px', minWidth: 0, p: 'clamp(24px, 4vw, 48px) clamp(24px, 4vw, 48px) 0' }}>
          <Box
            sx={{
              position: 'relative',
              aspectRatio: '3 / 2',
              borderRadius: '18px',
              overflow: 'hidden',
              border: `3px solid ${brand.white}`,
              boxShadow: '0 24px 60px rgba(0,0,0,.5)',
              transform: 'rotate(1.5deg)',
            }}
          >
            <Image
              src={online_giving.image.path}
              alt={online_giving.image.description}
              fill
              sizes="(max-width: 900px) 100vw, 640px"
              style={{ objectFit: 'cover' }}
            />
            <Box
              component="span"
              sx={{
                position: 'absolute',
                left: 14,
                top: 14,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: brand.white,
                color: brand.charcoal,
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: '.06em',
                borderRadius: '999px',
                px: '12px',
                py: '6px',
                '& svg': { fontSize: 14, color: brand.red },
              }}
            >
              <LockOutlinedIcon aria-hidden />
              SECURE
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default GiveOnlineCard;
