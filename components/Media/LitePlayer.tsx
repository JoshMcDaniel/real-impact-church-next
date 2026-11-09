import Box from '@mui/material/Box';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Image from 'next/image';
import { useState } from 'react';
import { brand } from '../../constants/brand';
import { Video } from '../../constants/video';

/**
 * Shows the video's thumbnail with a play button and only loads the YouTube
 * player when it's pressed. Keeps the page fast (no YouTube scripts up front).
 */
export const LitePlayer = ({ video }: { video: Video }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <Box sx={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: '20px', overflow: 'hidden', backgroundColor: '#000' }}>
      {playing ? (
        <Box
          component="iframe"
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
        />
      ) : (
        <Box
          component="button"
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play “${video.title}”`}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            p: 0,
            border: 0,
            cursor: 'pointer',
            backgroundColor: 'transparent',
            '&:hover .play, &:focus-visible .play': { transform: 'translate(-50%, -50%) scale(1.06)' },
          }}
        >
          <Image src={video.thumbnailUrl} alt="" fill priority sizes="(max-width: 1100px) 100vw, 1100px" style={{ objectFit: 'cover', opacity: 0.85 }} />
          <Box
            className="play"
            aria-hidden
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: 72, sm: 96 },
              height: { xs: 72, sm: 96 },
              borderRadius: '50%',
              backgroundColor: brand.red,
              color: brand.white,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 12px 40px rgba(0,0,0,.5)',
              transition: 'transform .2s ease',
            }}
          >
            <PlayArrowIcon sx={{ fontSize: { xs: 36, sm: 48 } }} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default LitePlayer;
