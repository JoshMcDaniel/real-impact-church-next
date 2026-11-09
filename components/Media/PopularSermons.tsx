import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Image from 'next/image';
import Link from 'next/link';
import { brand, contentMaxWidth } from '../../constants/brand';
import { formatDuration, formatVideoDate, formatViews, Video } from '../../constants/video';
import PillLabel from '../shared/PillLabel';
import { cardLiftSx, DurationTag, MetaChip, PlayBadge } from './SermonParts';

/** Breakpoint below which the ranked rows put the number on the thumbnail. */
const SMALL = '@media (max-width: 480px)';

const shortDate = (iso: string) => formatVideoDate(iso).replace(/^(\w{3})\w*/, '$1');

const RankCircle = ({ rank, overlay = false }: { rank: number; overlay?: boolean }) => (
  <Box
    component="span"
    aria-hidden={overlay || undefined}
    aria-label={overlay ? undefined : `Number ${rank}`}
    sx={{
      flex: 'none',
      width: overlay ? 26 : 34,
      height: overlay ? 26 : 34,
      borderRadius: '50%',
      backgroundColor: brand.red,
      color: brand.white,
      fontSize: overlay ? 13 : 15,
      fontWeight: 800,
      alignItems: 'center',
      justifyContent: 'center',
      ...(overlay
        ? { position: 'absolute', left: 6, top: 6, zIndex: 1, display: 'none', [SMALL]: { display: 'flex' } }
        : { display: 'flex', ml: '6px', [SMALL]: { display: 'none' } }),
    }}
  >
    {rank}
  </Box>
);

/** The #1 most-watched sermon as a large card. */
const TopSermon = ({ video }: { video: Video }) => {
  const duration = formatDuration(video.duration);
  const views = formatViews(video.viewCount);

  return (
    <Box
      component={Link}
      href={`/media/${video.id}`}
      sx={{
        flex: 1,
        backgroundColor: brand.white,
        border: `1px solid ${brand.line}`,
        borderRadius: '24px',
        p: '12px 12px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        color: brand.text,
        textDecoration: 'none',
        boxShadow: '0 10px 30px rgba(43,43,43,.06)',
        ...cardLiftSx,
      }}
    >
      <Box sx={{ position: 'relative', aspectRatio: '16 / 9', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#dfe6ea' }}>
        <Image src={video.thumbnailUrl} alt="" fill sizes="(max-width: 900px) 100vw, 640px" style={{ objectFit: 'cover' }} />
        <Box
          component="span"
          sx={{
            position: 'absolute',
            left: 14,
            top: 14,
            zIndex: 1,
            backgroundColor: brand.red,
            color: brand.white,
            borderRadius: '999px',
            px: '14px',
            py: '6px',
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: '.06em',
            boxShadow: '0 4px 12px rgba(0,0,0,.25)',
            [SMALL]: { left: 10, top: 10, px: '10px', py: '4px', fontSize: 11 },
          }}
        >
          #1 MOST WATCHED
        </Box>
        <PlayBadge size="large" sx={{ [SMALL]: { width: 52, height: 36, borderRadius: '10px', '& svg': { fontSize: 18 } } }} />
        {duration && <DurationTag>{duration}</DurationTag>}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px', px: '12px' }}>
        <Box component="h3" sx={{ m: 0, fontSize: 'clamp(22px, 2.2vw, 28px)', fontWeight: 800, color: brand.charcoal, lineHeight: 1.2 }}>
          {video.title}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {views && <MetaChip icon={<VisibilityOutlinedIcon />}>{views}</MetaChip>}
          {video.publishedAt && (
            <MetaChip icon={<CalendarTodayOutlinedIcon />}>
              <time dateTime={video.publishedAt}>{shortDate(video.publishedAt)}</time>
            </MetaChip>
          )}
        </Box>
      </Box>
    </Box>
  );
};

/** A ranked row (#2–#4) with the number, a small thumbnail, title and views. */
const RankedSermon = ({ video, rank }: { video: Video; rank: number }) => {
  const duration = formatDuration(video.duration);
  const views = formatViews(video.viewCount);

  return (
    <Box
      component={Link}
      href={`/media/${video.id}`}
      sx={{
        backgroundColor: brand.white,
        border: `1px solid ${brand.line}`,
        borderRadius: '20px',
        p: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        color: brand.text,
        textDecoration: 'none',
        ...cardLiftSx,
      }}
    >
      <RankCircle rank={rank} />
      <Box
        sx={{
          flex: 'none',
          position: 'relative',
          width: 'clamp(110px, 30%, 168px)',
          aspectRatio: '16 / 9',
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: '#dfe6ea',
          [SMALL]: { width: '42%' },
        }}
      >
        <RankCircle rank={rank} overlay />
        <Image src={video.thumbnailUrl} alt="" fill sizes="200px" style={{ objectFit: 'cover' }} />
        {duration && <DurationTag small>{duration}</DurationTag>}
      </Box>
      <Box sx={{ flex: '1 1 auto', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1, pr: 1 }}>
        <Box component="h3" sx={{ m: 0, fontSize: 16, fontWeight: 800, color: brand.charcoal, lineHeight: 1.3 }}>
          {video.title}
        </Box>
        {views && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            <MetaChip icon={<VisibilityOutlinedIcon />}>{views}</MetaChip>
          </Box>
        )}
      </Box>
    </Box>
  );
};

/** "Popular messages": #1 as a large card, #2–#4 as ranked rows. */
export const PopularSermons = ({ videos }: { videos: Video[] }) => {
  const [top, ...rest] = videos;
  if (!top) return null;

  return (
    <Box component="section" aria-labelledby="popular-title" sx={{ backgroundColor: brand.mist, px: 3, py: { xs: 8, md: 11.25 } }}>
      <Box sx={{ maxWidth: contentMaxWidth, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <PillLabel>Most watched</PillLabel>
          <Typography id="popular-title" component="h2" sx={{ m: 0, fontSize: 'clamp(30px, 3.4vw, 44px)', fontWeight: 800, color: brand.charcoal, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
            Popular messages
          </Typography>
        </Box>
        <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'stretch' }}>
          <Box component="li" sx={{ flex: '1.15 1 420px', minWidth: 0, display: 'flex' }}>
            <TopSermon video={top} />
          </Box>
          {rest.length > 0 && (
            <Box
              component="li"
              sx={{ flex: '1 1 380px', minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 2 }}
            >
              {rest.map((video, index) => (
                <RankedSermon key={video.id} video={video} rank={index + 2} />
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PopularSermons;
