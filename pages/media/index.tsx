import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import DynamicHead from '../../components/DynamicHead/DynamicHead';
import VideoCard from '../../components/Media/VideoCard';
import PageHero from '../../components/shared/PageHero';
import PillButton from '../../components/shared/PillButton';
import { Eyebrow } from '../../components/shared/SectionHeader';
import appConfig from '../../constants/app-config/config.json';
import { useMediaConfig } from '../../constants/app-config/app-config-hooks';
import { brand, contentMaxWidth } from '../../constants/brand';
import { breadcrumbJsonLd } from '../../constants/structured-data';
import { channelUrl, formatDuration, formatVideoDate, Video } from '../../constants/video';
import { getPopularVideos, getRecentVideos } from '../../constants/youtube';

type MediaProps = {
  recent: Video[];
  popular: Video[];
};

/** First paragraph of a description, shortened. */
const intro = (text: string, max = 220) => {
  const first = text.split(/\n\s*\n/)[0].trim();
  return first.length > max ? `${first.slice(0, max).replace(/\s+\S*$/, '')}…` : first;
};

const gridSx = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, max(260px, calc((100% - 48px) / 3))), 1fr))',
  gap: '28px 24px',
};

export const Media = ({ recent, popular }: MediaProps) => {
  const { media_page } = useMediaConfig();
  const [latest, ...more] = recent;
  const latestDuration = latest ? formatDuration(latest.duration) : null;

  return (
    <Box sx={{ backgroundColor: brand.paper, color: brand.text }}>
      <DynamicHead
        fullTitle={media_page.header.title}
        description={media_page.header.description}
        image={latest?.thumbnailUrl ?? media_page.hero.image.path}
        imageAlt={latest?.title ?? media_page.hero.image.description}
        jsonLd={[breadcrumbJsonLd([{ name: 'Sermons & Media', path: '/media' }])]}
      />
      <Box component="main">
        <PageHero
          eyebrow={media_page.hero.eyebrow}
          title={media_page.hero.title}
          text={media_page.hero.text}
          image={media_page.hero.image}
          overlay={0.62}
        />

        {latest ? (
          <Box component="section" aria-labelledby="latest-title" sx={{ maxWidth: contentMaxWidth, mx: 'auto', px: 3, pt: { xs: 7, md: 9 }, pb: 5, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Eyebrow>Latest sermon</Eyebrow>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, alignItems: 'center' }}>
              <Box
                component={Link}
                href={`/media/${latest.id}`}
                aria-label={`Watch “${latest.title}”`}
                sx={{
                  flex: '1.6 1 520px',
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
                <Image src={latest.thumbnailUrl} alt="" fill priority sizes="(max-width: 900px) 100vw, 760px" style={{ objectFit: 'cover', opacity: 0.8 }} />
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
                {latestDuration && (
                  <Box component="span" sx={{ position: 'absolute', right: 16, bottom: 16, backgroundColor: 'rgba(0,0,0,.75)', color: brand.white, fontSize: 13, fontWeight: 700, borderRadius: '8px', px: 1, py: '4px' }}>
                    {latestDuration}
                  </Box>
                )}
              </Box>
              <Box sx={{ flex: '1 1 340px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <Typography id="latest-title" component="h2" sx={{ m: 0, fontSize: 'clamp(26px, 2.8vw, 36px)', fontWeight: 800, color: brand.charcoal, lineHeight: 1.2 }}>
                  {latest.title}
                </Typography>
                <Typography component="p" sx={{ m: 0, fontSize: 15, fontWeight: 600, color: brand.muted }}>
                  <time dateTime={latest.publishedAt}>{formatVideoDate(latest.publishedAt)}</time>
                </Typography>
                {intro(latest.description) && (
                  <Typography component="p" sx={{ m: 0, fontSize: 16, lineHeight: 1.7 }}>
                    {intro(latest.description)}
                  </Typography>
                )}
                <Box sx={{ pt: '6px' }}>
                  <PillButton href={`/media/${latest.id}`} startIcon={<PlayArrowIcon />}>
                    Watch Now
                  </PillButton>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box sx={{ maxWidth: contentMaxWidth, mx: 'auto', px: 3, py: 9 }}>
            <Typography component="p" sx={{ m: 0, fontSize: 18 }}>
              Sermons are temporarily unavailable here.{' '}
              <Box component="a" href={channelUrl} sx={{ color: brand.red, fontWeight: 700 }}>
                Watch them on our YouTube channel
              </Box>
              .
            </Typography>
          </Box>
        )}

        {more.length > 0 && (
          <Box component="section" aria-labelledby="recent-title" sx={{ maxWidth: contentMaxWidth, mx: 'auto', px: 3, pt: 5, pb: { xs: 8, md: 11.25 }, display: 'flex', flexDirection: 'column', gap: 3.5 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 2 }}>
              <Typography id="recent-title" component="h2" sx={{ m: 0, fontSize: 'clamp(26px, 2.6vw, 34px)', fontWeight: 800, color: brand.charcoal }}>
                Recent sermons
              </Typography>
              <Box
                component="a"
                href={channelUrl}
                rel="noopener"
                sx={{ fontWeight: 700, fontSize: 16, display: 'inline-flex', alignItems: 'center', gap: 1, minHeight: 44, color: brand.red, textDecoration: 'none' }}
              >
                All videos on YouTube <ArrowForwardIcon fontSize="small" />
              </Box>
            </Box>
            <Box sx={gridSx}>
              {more.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </Box>
          </Box>
        )}

        {popular.length > 0 && (
          <Box component="section" aria-labelledby="popular-title" sx={{ backgroundColor: brand.charcoal, color: brand.white, px: 3, py: { xs: 8, md: 11.25 } }}>
            <Box sx={{ maxWidth: contentMaxWidth, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3.5 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Eyebrow color="#ff6b7f">Most watched</Eyebrow>
                <Typography id="popular-title" component="h2" sx={{ m: 0, fontSize: 'clamp(26px, 2.6vw, 34px)', fontWeight: 800 }}>
                  Popular messages
                </Typography>
              </Box>
              <Box
                component="ol"
                sx={{
                  listStyle: 'none',
                  m: 0,
                  p: 0,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, max(220px, calc((100% - 72px) / 4))), 1fr))',
                  gap: 3,
                }}
              >
                {popular.map((video, index) => (
                  <li key={video.id}>
                    <VideoCard video={video} dark rank={index + 1} />
                  </li>
                ))}
              </Box>
            </Box>
          </Box>
        )}

        <Box component="section" aria-labelledby="subscribe-title" sx={{ maxWidth: contentMaxWidth, mx: 'auto', px: 3, py: { xs: 8, md: 11.25 } }}>
          <Box
            sx={{
              backgroundColor: brand.red,
              color: brand.white,
              borderRadius: '28px',
              p: 'clamp(32px, 5vw, 56px)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 3.5,
            }}
          >
            <Box sx={{ flex: '2 1 420px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Typography id="subscribe-title" component="h2" sx={{ m: 0, fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 800, lineHeight: 1.15 }}>
                Never miss a message.
              </Typography>
              <Typography component="p" sx={{ m: 0, fontSize: 17, lineHeight: 1.7, color: brand.redSoft }}>
                Subscribe on YouTube to get new sermons as soon as they’re posted.
              </Typography>
            </Box>
            <PillButton href={`${channelUrl}?sub_confirmation=1`} tone="white" startIcon={<YouTubeIcon />}>
              Subscribe on YouTube
            </PillButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const getStaticProps: GetStaticProps<MediaProps> = async () => {
  const { recent_count, popular_count } = appConfig.website.media.media_page.youtube;
  const [recent, popular] = await Promise.all([getRecentVideos(recent_count), getPopularVideos(popular_count)]);

  return {
    props: { recent, popular },
    // Hourly keeps the "popular" search (100 quota units) well under YouTube's daily limit.
    revalidate: 3600,
  };
};

export default Media;
