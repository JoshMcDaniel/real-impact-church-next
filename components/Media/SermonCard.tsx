import Box from '@mui/material/Box';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import Image from 'next/image';
import Link from 'next/link';
import { brand } from '../../constants/brand';
import { formatDuration, formatDurationWords, formatVideoDate, Video } from '../../constants/video';
import { cardLiftSx, DurationTag, MetaChip, PlayBadge } from './SermonParts';

/** Short date for chips, e.g. "Nov 1, 2026". */
const shortDate = (iso: string) => formatVideoDate(iso).replace(/^(\w{3})\w*/, '$1');

/** White card with framed thumbnail, title, and date/length chips (Recent sermons). */
export const SermonCard = ({ video }: { video: Video }) => {
  const duration = formatDuration(video.duration);
  const durationWords = formatDurationWords(video.duration);

  return (
    <Box
      component={Link}
      href={`/media/${video.id}`}
      sx={{
        backgroundColor: brand.white,
        border: `1px solid ${brand.line}`,
        borderRadius: '22px',
        p: '10px 10px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        color: brand.text,
        textDecoration: 'none',
        boxShadow: '0 10px 30px rgba(43,43,43,.06)',
        ...cardLiftSx,
      }}
    >
      <Box sx={{ position: 'relative', aspectRatio: '16 / 9', borderRadius: '15px', overflow: 'hidden', backgroundColor: '#dfe6ea' }}>
        <Image src={video.thumbnailUrl} alt="" fill sizes="(max-width: 700px) 100vw, 400px" style={{ objectFit: 'cover' }} />
        <PlayBadge />
        {duration && <DurationTag>{duration}</DurationTag>}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px', px: '10px' }}>
        <Box component="h3" sx={{ m: 0, fontSize: 19, fontWeight: 800, color: brand.charcoal, lineHeight: 1.3 }}>
          {video.title}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {video.publishedAt && (
            <MetaChip icon={<CalendarTodayOutlinedIcon />}>
              <time dateTime={video.publishedAt}>{shortDate(video.publishedAt)}</time>
            </MetaChip>
          )}
          {durationWords && <MetaChip icon={<AccessTimeIcon />}>{durationWords}</MetaChip>}
        </Box>
      </Box>
    </Box>
  );
};

export default SermonCard;
