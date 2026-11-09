import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import DynamicHead from '../../../components/DynamicHead/DynamicHead';
import CopyLinkButton from '../../../components/Media/CopyLinkButton';
import LinkifiedText from '../../../components/Media/LinkifiedText';
import LitePlayer from '../../../components/Media/LitePlayer';
import VideoCard from '../../../components/Media/VideoCard';
import PillButton from '../../../components/shared/PillButton';
import { PLAN_VISIT_HREF } from '../../../components/Layout/SiteHeader';
import { brand, contentMaxWidth } from '../../../constants/brand';
import { absoluteUrl } from '../../../constants/site';
import { breadcrumbJsonLd, videoJsonLd } from '../../../constants/structured-data';
import { formatDurationWords, formatVideoDate, formatViews, Video, watchUrl } from '../../../constants/video';
import { getRecentVideos, getVideo } from '../../../constants/youtube';

type SelectedMediaProps = {
  video: Video;
  moreVideos: Video[];
};

/** Meta description: the start of the YouTube description, or a sensible default. */
const metaDescription = (video: Video) => {
  const text = video.description.replace(/\s+/g, ' ').trim();
  if (!text) return `Watch “${video.title}”, a sermon from Real Impact Church in Eustis, Florida.`;
  return text.length > 155 ? `${text.slice(0, 155).replace(/\s+\S*$/, '')}…` : text;
};

const SelectedMedia = ({ video, moreVideos }: SelectedMediaProps) => {
  const path = `/media/${video.id}`;
  const meta = [
    formatVideoDate(video.publishedAt),
    formatDurationWords(video.duration),
    formatViews(video.viewCount),
  ].filter(Boolean) as string[];

  return (
    <Box sx={{ backgroundColor: brand.paper, color: brand.text }}>
      <DynamicHead
        fullTitle={`${video.title} | Real Impact Church Sermons`}
        description={metaDescription(video)}
        image={video.thumbnailUrl}
        imageAlt={video.title}
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'Sermons & Media', path: '/media' },
            { name: video.title, path },
          ]),
          videoJsonLd(video, path),
        ]}
      />
      <Box component="main">
        <Box component="section" aria-label="Video player" sx={{ backgroundColor: brand.footer, px: 3, pt: 4, pb: 5 }}>
          <Box sx={{ maxWidth: 1100, mx: 'auto', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <Box component="nav" aria-label="Breadcrumb" sx={{ fontSize: 14, fontWeight: 600, color: '#b4babe' }}>
              <Box component={Link} href="/media" sx={{ color: brand.white, textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                Sermons
              </Box>
              <Box component="span" aria-hidden sx={{ px: 1 }}>
                /
              </Box>
              <span aria-current="page">{video.title}</span>
            </Box>
            <LitePlayer video={video} />
          </Box>
        </Box>

        <Box
          component="section"
          aria-label="Sermon details"
          sx={{ maxWidth: 1100, mx: 'auto', px: 3, pt: 6, pb: { xs: 8, md: 10 }, display: 'flex', flexWrap: 'wrap', gap: 5, alignItems: 'flex-start' }}
        >
          <Box component="article" sx={{ flex: '999 1 560px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography component="h1" sx={{ m: 0, fontSize: 'clamp(28px, 3.4vw, 42px)', fontWeight: 800, color: brand.charcoal, lineHeight: 1.15 }}>
              {video.title}
            </Typography>
            {meta.length > 0 && (
              <Typography component="p" sx={{ m: 0, display: 'flex', flexWrap: 'wrap', gap: '6px 16px', fontSize: 15, fontWeight: 600, color: brand.muted }}>
                {meta.map((item, index) => (
                  <Box component="span" key={item} sx={{ display: 'inline-flex', gap: 2 }}>
                    {index > 0 && <span aria-hidden>·</span>}
                    {index === 0 ? <time dateTime={video.publishedAt}>{item}</time> : item}
                  </Box>
                ))}
              </Typography>
            )}
            {video.description.trim() && (
              <Typography component="p" sx={{ m: 0, fontSize: 17, lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                <LinkifiedText text={video.description.trim()} />
              </Typography>
            )}
          </Box>

          <Box
            component="aside"
            aria-label="Watch and share"
            sx={{
              flex: '1 1 280px',
              minWidth: 0,
              backgroundColor: brand.white,
              border: `1px solid ${brand.line}`,
              borderRadius: '20px',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <Typography component="h2" sx={{ m: 0, fontSize: 13, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: brand.muted }}>
              Watch &amp; share
            </Typography>
            <PillButton href={watchUrl(video.id)} size="small" startIcon={<YouTubeIcon />}>
              Watch on YouTube
            </PillButton>
            <CopyLinkButton url={absoluteUrl(path)} />
            <Typography component="p" sx={{ m: '6px 0 0', fontSize: 14, lineHeight: 1.6 }}>
              Want to hear it in person?{' '}
              <Box component={Link} href={PLAN_VISIT_HREF} sx={{ color: brand.red, fontWeight: 700 }}>
                Join us this Sunday
              </Box>
              .
            </Typography>
          </Box>
        </Box>

        {moreVideos.length > 0 && (
          <Box component="section" aria-labelledby="more-sermons-title" sx={{ backgroundColor: brand.mist, px: 3, py: { xs: 8, md: 10 } }}>
            <Box sx={{ maxWidth: contentMaxWidth, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3.5 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 2 }}>
                <Typography id="more-sermons-title" component="h2" sx={{ m: 0, fontSize: 'clamp(26px, 2.6vw, 34px)', fontWeight: 800, color: brand.charcoal }}>
                  More sermons
                </Typography>
                <Box
                  component={Link}
                  href="/media"
                  sx={{ fontWeight: 700, fontSize: 16, display: 'inline-flex', alignItems: 'center', gap: 1, minHeight: 44, color: brand.red, textDecoration: 'none' }}
                >
                  All sermons <ArrowForwardIcon fontSize="small" />
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, max(260px, calc((100% - 48px) / 3))), 1fr))',
                  gap: 3,
                }}
              >
                {moreVideos.map((v) => (
                  <VideoCard key={v.id} video={v} />
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Pre-build the latest sermons; older ones are built on first visit.
  const recent = await getRecentVideos(10);
  return {
    paths: recent.map((v) => ({ params: { selectedId: v.id } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<SelectedMediaProps> = async (context) => {
  const id = context.params?.selectedId;
  if (typeof id !== 'string') return { notFound: true, revalidate: 300 };

  const [video, recent] = await Promise.all([getVideo(id), getRecentVideos(4)]);
  if (!video) return { notFound: true, revalidate: 300 };

  return {
    props: {
      video,
      moreVideos: recent.filter((v) => v.id !== id).slice(0, 3),
    },
    // Daily is plenty for titles/descriptions and keeps API use tiny.
    revalidate: 86400,
  };
};

export default SelectedMedia;
