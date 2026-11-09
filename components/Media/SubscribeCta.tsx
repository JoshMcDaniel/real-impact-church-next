import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Image from 'next/image';
import { brand, contentMaxWidth } from '../../constants/brand';
import { channelUrl, Video } from '../../constants/video';
import PillButton from '../shared/PillButton';

const benefits = ['New sermons posted every week', 'Watch on your phone, TV or computer', 'Free — just tap Subscribe'];

/** Positions for the stacked thumbnail previews. */
const stack = [
  { left: '4%', top: '6%', width: '62%', rotate: '-6deg' },
  { right: 0, top: '30%', width: '58%', rotate: '5deg' },
  { left: '16%', bottom: 0, width: '60%', rotate: '-1deg' },
];

/** Dark YouTube subscribe card with a fan of recent sermon thumbnails. */
export const SubscribeCta = ({ videos }: { videos: Video[] }) => {
  const thumbs = videos.slice(0, 3);

  return (
    <Box component="section" aria-labelledby="subscribe-title" sx={{ maxWidth: contentMaxWidth, mx: 'auto', px: 3, py: { xs: 8, md: 11.25 } }}>
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: brand.footer,
          color: brand.white,
          borderRadius: '28px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <Box aria-hidden sx={{ position: 'absolute', right: -120, top: -120, width: 420, height: 420, borderRadius: '50%', backgroundColor: brand.red, opacity: 0.18 }} />

        <Box sx={{ position: 'relative', flex: '1.2 1 420px', minWidth: 0, p: 'clamp(32px, 5vw, 60px)', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontSize: 14, fontWeight: 800, letterSpacing: '.04em' }}>
            <Box aria-hidden sx={{ width: 52, height: 36, borderRadius: '10px', backgroundColor: brand.red, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PlayArrowIcon />
            </Box>
            Real Impact Church on YouTube
          </Box>
          <Typography id="subscribe-title" component="h2" sx={{ m: 0, fontSize: 'clamp(30px, 3.8vw, 48px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.01em' }}>
            Never miss a Sunday message.
          </Typography>
          <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: 16, color: '#e6e9eb' }}>
            {benefits.map((benefit) => (
              <Box component="li" key={benefit} sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckIcon aria-hidden sx={{ color: '#ff6b7f', fontSize: 20 }} />
                {benefit}
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px', pt: 1 }}>
            <PillButton
              href={`${channelUrl}?sub_confirmation=1`}
              startIcon={<NotificationsNoneIcon />}
              sx={{ minHeight: 56, px: { xs: '20px', sm: '30px' }, fontSize: { xs: 16, sm: 17 }, whiteSpace: 'nowrap' }}
            >
              Subscribe on YouTube
            </PillButton>
            <Typography component="span" sx={{ fontSize: 14, color: '#b4babe' }}>
              Tap the bell to get notified.
            </Typography>
          </Box>
        </Box>

        {thumbs.length > 0 && (
          <Box
            aria-hidden
            sx={{
              position: 'relative',
              flex: '1 1 360px',
              minWidth: 0,
              mx: 'clamp(24px, 4vw, 48px)',
              mb: 'clamp(32px, 4vw, 48px)',
            }}
          >
            {/* Side by side: fill the column. Stacked (narrow screens): keep the fan compact and centered. */}
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: 320,
                '@media (max-width: 860px)': { height: 'auto', maxWidth: 460, aspectRatio: '460 / 330', mx: 'auto' },
              }}
            >
            {thumbs.map((video, index) => {
              const pos = stack[index];
              return (
                <Box
                  key={video.id}
                  sx={{
                    position: 'absolute',
                    left: pos.left,
                    right: pos.right,
                    top: pos.top,
                    bottom: pos.bottom,
                    width: pos.width,
                    aspectRatio: '16 / 9',
                    transform: `rotate(${pos.rotate})`,
                    borderRadius: '14px',
                    overflow: 'hidden',
                    border: `3px solid ${brand.white}`,
                    boxShadow: '0 18px 40px rgba(0,0,0,.45)',
                    backgroundColor: '#1a1a1a',
                  }}
                >
                  <Image src={video.thumbnailUrl} alt="" fill sizes="300px" style={{ objectFit: 'cover' }} />
                  <Box
                    sx={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 40,
                      height: 28,
                      borderRadius: '8px',
                      backgroundColor: brand.red,
                      color: brand.white,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <PlayArrowIcon sx={{ fontSize: 18 }} />
                  </Box>
                </Box>
              );
            })}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SubscribeCta;
