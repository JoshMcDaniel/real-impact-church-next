import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { GetStaticProps } from 'next';
import DynamicHead from '../../components/DynamicHead/DynamicHead';
import LatestSermonFeature from '../../components/Media/LatestSermonFeature';
import SubscribeCta from '../../components/Media/SubscribeCta';
import VideoCard from '../../components/Media/VideoCard';
import PageHero from '../../components/shared/PageHero';
import { Eyebrow } from '../../components/shared/SectionHeader';
import appConfig from '../../constants/app-config/config.json';
import { useMediaConfig } from '../../constants/app-config/app-config-hooks';
import { brand, contentMaxWidth } from '../../constants/brand';
import { breadcrumbJsonLd } from '../../constants/structured-data';
import { channelUrl, Video } from '../../constants/video';
import { getPopularVideos, getRecentVideos } from '../../constants/youtube';

type MediaProps = {
  recent: Video[];
  popular: Video[];
  /** Latest sermon was posted in the last 8 days (decided at build time). */
  latestIsNew: boolean;
};

const gridSx = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, max(260px, calc((100% - 48px) / 3))), 1fr))',
  gap: '28px 24px',
};

export const Media = ({ recent, popular, latestIsNew }: MediaProps) => {
  const { media_page } = useMediaConfig();
  const [latest, ...more] = recent;

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
          <LatestSermonFeature video={latest} isNew={latestIsNew} />
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
          <Box component="section" aria-labelledby="recent-title" sx={{ scrollMarginTop: '96px', maxWidth: contentMaxWidth, mx: 'auto', px: 3, pt: 5, pb: { xs: 8, md: 11.25 }, display: 'flex', flexDirection: 'column', gap: 3.5 }}>
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

        <SubscribeCta videos={recent} />
      </Box>
    </Box>
  );
};

export const getStaticProps: GetStaticProps<MediaProps> = async () => {
  const { recent_count, popular_count } = appConfig.website.media.media_page.youtube;
  const [recent, popular] = await Promise.all([getRecentVideos(recent_count), getPopularVideos(popular_count)]);

  return {
    props: {
      recent,
      popular,
      latestIsNew: !!recent[0]?.publishedAt && Date.now() - new Date(recent[0].publishedAt).getTime() < 8 * 24 * 60 * 60 * 1000,
    },
    // Hourly keeps the "popular" search (100 quota units) well under YouTube's daily limit.
    revalidate: 3600,
  };
};

export default Media;
