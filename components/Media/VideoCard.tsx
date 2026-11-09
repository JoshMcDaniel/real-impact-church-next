import Box from '@mui/material/Box';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Image from 'next/image';
import Link from 'next/link';
import { brand } from '../../constants/brand';
import { formatDuration, formatVideoDate, formatViews, Video } from '../../constants/video';

type VideoCardProps = {
  video: Video;
  /** Dark variant for use on charcoal backgrounds. */
  dark?: boolean;
  /** Shows a numbered badge (used for "Popular messages"). */
  rank?: number;
  headingLevel?: 'h3' | 'h4';
};

/** Thumbnail + title card linking to the sermon's page on this site. */
export const VideoCard = ({ video, dark = false, rank, headingLevel = 'h3' }: VideoCardProps) => {
  const duration = formatDuration(video.duration);
  const meta = rank
    ? [formatViews(video.viewCount), formatVideoDate(video.publishedAt)].filter(Boolean).join(' · ')
    : formatVideoDate(video.publishedAt);

  return (
    <Box
      component={Link}
      href={`/media/${video.id}`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        color: dark ? brand.white : brand.text,
        textDecoration: 'none',
        borderRadius: '16px',
        '&:hover .thumb img': { transform: 'scale(1.04)' },
        '&:hover .title': { color: dark ? '#ffd0d7' : brand.red },
      }}
    >
      <Box
        className="thumb"
        sx={{
          position: 'relative',
          aspectRatio: '16 / 9',
          borderRadius: rank ? '14px' : '16px',
          overflow: 'hidden',
          backgroundColor: dark ? '#1a1a1a' : '#dfe6ea',
          '& img': { transition: 'transform .4s ease' },
        }}
      >
        <Image src={video.thumbnailUrl} alt="" fill sizes="(max-width: 700px) 100vw, 400px" style={{ objectFit: 'cover' }} />
        {rank ? (
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              left: 10,
              top: 10,
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: brand.red,
              color: brand.white,
              fontSize: 14,
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {rank}
          </Box>
        ) : (
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 52,
              height: 52,
              borderRadius: '50%',
              backgroundColor: 'rgba(20,20,20,.7)',
              color: brand.white,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PlayArrowIcon />
          </Box>
        )}
        {duration && (
          <Box
            component="span"
            aria-label={`Length ${duration}`}
            sx={{
              position: 'absolute',
              right: 10,
              bottom: 10,
              backgroundColor: 'rgba(0,0,0,.75)',
              color: brand.white,
              fontSize: 12,
              fontWeight: 700,
              borderRadius: '6px',
              px: '7px',
              py: '3px',
            }}
          >
            {duration}
          </Box>
        )}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', px: '4px', pb: '4px' }}>
        <Box
          component={headingLevel}
          className="title"
          sx={{ m: 0, fontSize: rank ? 16 : 17, fontWeight: 800, color: dark ? brand.white : brand.charcoal, lineHeight: 1.35, transition: 'color .15s ease' }}
        >
          {video.title}
        </Box>
        {meta && (
          <Box component="span" sx={{ fontSize: rank ? 13 : 14, fontWeight: 600, color: dark ? '#b4babe' : brand.muted }}>
            {meta}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default VideoCard;
