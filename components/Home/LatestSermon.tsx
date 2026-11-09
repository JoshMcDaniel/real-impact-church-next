import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Image from 'next/image';
import Link from 'next/link';
import { brand, contentMaxWidth } from '../../constants/brand';
import { useMediaConfig } from '../../constants/app-config/app-config-hooks';
import { LatestVideo } from '../../constants/Service';
import PillButton from '../shared/PillButton';
import { Eyebrow } from '../shared/SectionHeader';

type LatestSermonProps = { video: LatestVideo | null };

export const LatestSermon = ({ video }: LatestSermonProps) => {
  const youtube = useMediaConfig().social_media.find((s) => s.platform === 'YOUTUBE');
  const watchHref = video ? `/media/${video.id}` : '/media';

  return (
    <Box
      component="section"
      id="sermons"
      aria-labelledby="sermon-title"
      sx={{ backgroundColor: brand.charcoal, color: brand.white, px: 3, py: { xs: 10, md: 13.75 }, scrollMarginTop: '80px' }}
    >
      <Box
        sx={{ maxWidth: contentMaxWidth, mx: 'auto', display: 'flex', flexWrap: 'wrap', gap: 7, alignItems: 'center' }}
      >
        <Box sx={{ flex: '1 1 360px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Eyebrow color="#ff6b7f">Latest message</Eyebrow>
          <Typography
            id="sermon-title"
            component="h2"
            sx={{ m: 0, fontSize: 'clamp(30px, 3.4vw, 46px)', lineHeight: 1.12, fontWeight: 800 }}
          >
            Can’t make it Sunday? Watch online.
          </Typography>
          <Typography component="p" sx={{ m: 0, fontSize: 17, lineHeight: 1.75, color: '#d6dadd' }}>
            Catch up on recent sermons from Real Impact Church, anytime, anywhere.
          </Typography>
          {video && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px', pt: '18px', borderTop: '1px solid #444' }}>
              <Typography component="p" sx={{ m: 0, fontSize: 13, color: '#b4babe', fontWeight: 600, letterSpacing: '.06em' }}>
                NOW SHOWING
              </Typography>
              <Typography component="h3" sx={{ m: 0, fontSize: 19, fontWeight: 700 }}>
                {video.title}
              </Typography>
            </Box>
          )}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '12px', pt: '4px' }}>
            <PillButton href="/media">All Sermons</PillButton>
            {youtube && (
              <PillButton href={youtube.path} tone="ghost">
                Subscribe on YouTube
              </PillButton>
            )}
          </Box>
        </Box>

        <Box
          component={Link}
          href={watchHref}
          aria-label={video ? `Watch “${video.title}”` : 'Watch our latest sermons'}
          sx={{
            flex: '1.4 1 480px',
            minWidth: 0,
            position: 'relative',
            aspectRatio: '16 / 9',
            borderRadius: '20px',
            overflow: 'hidden',
            backgroundColor: '#1a1a1a',
            display: 'block',
            '&:hover .play': { transform: 'translate(-50%, -50%) scale(1.06)' },
          }}
        >
          <Image
            src={video?.thumbnailUrl ?? '/images/revival.jpg'}
            alt=""
            fill
            sizes="(max-width: 960px) 100vw, 700px"
            style={{ objectFit: 'cover', opacity: 0.6 }}
          />
          <Box
            className="play"
            aria-hidden
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 88,
              height: 88,
              borderRadius: '50%',
              backgroundColor: brand.red,
              color: brand.white,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 12px 40px rgba(0,0,0,.4)',
              transition: 'transform .2s ease',
            }}
          >
            <PlayArrowIcon sx={{ fontSize: 44 }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LatestSermon;
