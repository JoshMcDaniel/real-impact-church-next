import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { brand, contentMaxWidth } from '../../constants/brand';
import { formatDuration, formatDurationWords, formatVideoDate, formatViews, Video } from '../../constants/video';
import PillButton from '../shared/PillButton';

/** First paragraph of a description, shortened. */
const intro = (text: string, max = 220) => {
  const first = text.split(/\n\s*\n/)[0].trim();
  return first.length > max ? `${first.slice(0, max).replace(/\s+\S*$/, '')}…` : first;
};

const Chip = ({ icon, children }: { icon: ReactNode; children: ReactNode }) => (
  <Box
    component="li"
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 1,
      backgroundColor: 'rgba(255,255,255,.1)',
      borderRadius: '999px',
      px: '12px',
      py: '7px',
      fontSize: 14,
      fontWeight: 600,
      '& svg': { fontSize: 16, color: '#ff6b7f' },
    }}
  >
    {icon}
    {children}
  </Box>
);

type LatestSermonFeatureProps = {
  video: Video;
  /** Shows a "NEW" badge; decided at build time so server and browser match. */
  isNew: boolean;
};

/** Dark feature card for the newest sermon (matches the subscribe card's style). */
export const LatestSermonFeature = ({ video, isNew }: LatestSermonFeatureProps) => {
  const duration = formatDuration(video.duration);
  const durationWords = formatDurationWords(video.duration);
  const views = formatViews(video.viewCount);
  const summary = intro(video.description);
  const href = `/media/${video.id}`;

  return (
    <Box component="section" aria-labelledby="latest-title" sx={{ maxWidth: contentMaxWidth, mx: 'auto', px: 3, pt: { xs: 7, md: 9 }, pb: 5 }}>
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: brand.footer,
          color: brand.white,
          borderRadius: '28px',
          display: 'flex',
          // Video first on top when stacked, text first on the left when side by side.
          flexWrap: 'wrap-reverse',
          alignItems: 'center',
        }}
      >
        <Box aria-hidden sx={{ position: 'absolute', left: -140, bottom: -160, width: 440, height: 440, borderRadius: '50%', backgroundColor: brand.red, opacity: 0.16 }} />

        <Box sx={{ position: 'relative', flex: '1 1 380px', minWidth: 0, p: 'clamp(32px, 5vw, 56px)', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <Box
            component="span"
            sx={{
              alignSelf: 'flex-start',
              backgroundColor: brand.red,
              borderRadius: '999px',
              px: 2,
              py: '7px',
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: '.08em',
              textTransform: 'uppercase',
            }}
          >
            Latest sermon
          </Box>
          <Typography id="latest-title" component="h2" sx={{ m: 0, fontSize: 'clamp(30px, 3.6vw, 46px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.01em' }}>
            {video.title}
          </Typography>
          <Box component="ul" aria-label="Sermon details" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {video.publishedAt && (
              <Chip icon={<CalendarTodayOutlinedIcon />}>
                <time dateTime={video.publishedAt}>{formatVideoDate(video.publishedAt)}</time>
              </Chip>
            )}
            {durationWords && <Chip icon={<AccessTimeIcon />}>{durationWords}</Chip>}
            {views && <Chip icon={<VisibilityOutlinedIcon />}>{views}</Chip>}
          </Box>
          {summary && (
            <Typography component="p" sx={{ m: 0, fontSize: 16, lineHeight: 1.7, color: '#d6dadd' }}>
              {summary}
            </Typography>
          )}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', pt: 1 }}>
            <PillButton href={href} startIcon={<PlayArrowIcon />} sx={{ minHeight: 56, px: { xs: '24px', sm: '30px' }, fontSize: 17 }}>
              Watch Now
            </PillButton>
            <PillButton href="#recent-title" tone="ghost" sx={{ minHeight: 56 }}>
              More Sermons
            </PillButton>
          </Box>
        </Box>

        <Box sx={{ position: 'relative', flex: '1.35 1 480px', minWidth: 0, p: 'clamp(24px, 4vw, 48px) clamp(24px, 4vw, 48px) 0' }}>
          <Box
            component={Link}
            href={href}
            aria-label={`Watch “${video.title}”`}
            sx={{
              position: 'relative',
              display: 'block',
              aspectRatio: '16 / 9',
              borderRadius: '18px',
              overflow: 'hidden',
              border: `3px solid ${brand.white}`,
              boxShadow: '0 24px 60px rgba(0,0,0,.5)',
              transform: 'rotate(1.5deg)',
              backgroundColor: '#000',
              transition: 'transform .25s ease',
              '&:hover, &:focus-visible': { transform: 'rotate(0deg) scale(1.01)' },
            }}
          >
            <Image src={video.thumbnailUrl} alt="" fill priority sizes="(max-width: 900px) 100vw, 640px" style={{ objectFit: 'cover', opacity: 0.9 }} />
            <Box
              aria-hidden
              sx={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: 84,
                height: 58,
                borderRadius: '16px',
                backgroundColor: brand.red,
                color: brand.white,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 12px 30px rgba(0,0,0,.45)',
              }}
            >
              <PlayArrowIcon sx={{ fontSize: 34 }} />
            </Box>
            {isNew && (
              <Box component="span" sx={{ position: 'absolute', left: 14, top: 14, backgroundColor: brand.white, color: brand.charcoal, fontSize: 12, fontWeight: 800, letterSpacing: '.1em', borderRadius: '999px', px: '10px', py: '5px' }}>
                NEW
              </Box>
            )}
            {duration && (
              <Box component="span" sx={{ position: 'absolute', right: 14, bottom: 14, backgroundColor: 'rgba(0,0,0,.78)', color: brand.white, fontSize: 13, fontWeight: 700, borderRadius: '8px', px: 1, py: '4px' }}>
                {duration}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LatestSermonFeature;
