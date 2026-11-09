import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { GetStaticPaths, GetStaticProps } from 'next';
import { groq } from 'next-sanity';
import Link from 'next/link';
import DynamicHead from '../../../components/DynamicHead/DynamicHead';
import GlowLayer from '../../../components/shared/GlowLayer';
import CopyLinkButton from '../../../components/Media/CopyLinkButton';
import LinkifiedText from '../../../components/Media/LinkifiedText';
import LitePlayer from '../../../components/Media/LitePlayer';
import SermonCard from '../../../components/Media/SermonCard';
import { MetaChip } from '../../../components/Media/SermonParts';
import PillButton from '../../../components/shared/PillButton';
import PillLabel from '../../../components/shared/PillLabel';
import { PLAN_VISIT_HREF } from '../../../components/Layout/SiteHeader';
import { brand, contentMaxWidth } from '../../../constants/brand';
import { Service } from '../../../constants/Service';
import { absoluteUrl } from '../../../constants/site';
import { breadcrumbJsonLd, videoJsonLd } from '../../../constants/structured-data';
import { getPrimaryService, getSundayMorning, shortScheduleLabel } from '../../../constants/sunday-schedule';
import { formatDurationWords, formatVideoDate, formatViews, Video, watchUrl } from '../../../constants/video';
import { getRecentVideos, getVideo } from '../../../constants/youtube';
import { sanityFetch } from '../../../src/sanity/lib/client';

type SelectedMediaProps = {
  video: Video;
  moreVideos: Video[];
  services: Service[];
};

/** Meta description: the start of the YouTube description, or a sensible default. */
const metaDescription = (video: Video) => {
  const text = video.description.replace(/\s+/g, ' ').trim();
  if (!text) return `Watch “${video.title}”, a sermon from Real Impact Church in Eustis, Florida.`;
  return text.length > 155 ? `${text.slice(0, 155).replace(/\s+\S*$/, '')}…` : text;
};

const SelectedMedia = ({ video, moreVideos, services }: SelectedMediaProps) => {
  const path = `/media/${video.id}`;
  const durationWords = formatDurationWords(video.duration);
  const views = formatViews(video.viewCount);
  const sundayMorning = getSundayMorning(getPrimaryService(services));

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
        {/* Player */}
        <Box
          component="section"
          aria-label="Video player"
          sx={{ position: 'relative', backgroundColor: brand.footer, px: 3, pt: 4, pb: 7 }}
        >
          <GlowLayer
            glows={[
              { right: -160, top: -200, size: 520, opacity: 0.16 },
              { left: -180, bottom: -260, size: 480, opacity: 0.1 },
            ]}
          />
          <Box sx={{ position: 'relative', maxWidth: 1100, mx: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
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

        {/* Details + Watch & share */}
        <Box
          component="section"
          aria-label="Sermon details"
          sx={{ maxWidth: 1100, mx: 'auto', px: 3, pt: 6, pb: { xs: 8, md: 11.25 }, display: 'flex', flexWrap: 'wrap', gap: 5, alignItems: 'flex-start' }}
        >
          <Box component="article" sx={{ flex: '999 1 560px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <PillLabel>Sermon</PillLabel>
            <Typography component="h1" sx={{ m: 0, fontSize: 'clamp(30px, 3.8vw, 46px)', fontWeight: 800, color: brand.charcoal, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
              {video.title}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {video.publishedAt && (
                <MetaChip large icon={<CalendarTodayOutlinedIcon />}>
                  <time dateTime={video.publishedAt}>{formatVideoDate(video.publishedAt)}</time>
                </MetaChip>
              )}
              {durationWords && (
                <MetaChip large icon={<AccessTimeIcon />}>
                  {durationWords}
                </MetaChip>
              )}
              {views && (
                <MetaChip large icon={<VisibilityOutlinedIcon />}>
                  {views}
                </MetaChip>
              )}
            </Box>
            {video.description.trim() && (
              <Typography component="p" sx={{ m: '6px 0 0', fontSize: 17, lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                <LinkifiedText text={video.description.trim()} />
              </Typography>
            )}
          </Box>

          <Box
            component="aside"
            aria-labelledby="share-title"
            sx={{
              position: 'relative',
              flex: '1 1 300px',
              minWidth: 0,
              backgroundColor: brand.footer,
              color: brand.white,
              borderRadius: '24px',
              p: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <GlowLayer glows={[{ right: -90, top: -90, size: 220, opacity: 0.18 }]} />
            <Typography id="share-title" component="h2" sx={{ position: 'relative', m: 0, fontSize: 22, fontWeight: 800 }}>
              Watch &amp; share
            </Typography>
            <Typography component="p" sx={{ position: 'relative', m: 0, fontSize: 15, lineHeight: 1.6, color: '#d6dadd' }}>
              Pass this message along to someone who needs to hear it.
            </Typography>
            {/* Side by side when the card is wide (stacked layout), stacked when it's a narrow column. */}
            <Box sx={{ position: 'relative', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <PillButton href={watchUrl(video.id)} sx={{ flex: '1 1 190px', maxWidth: 260, minHeight: 48, fontSize: 15 }}>
                Watch on YouTube
              </PillButton>
              <CopyLinkButton url={absoluteUrl(path)} onDark sx={{ flex: '1 1 190px', maxWidth: 260 }} />
            </Box>
            <Box sx={{ position: 'relative', mt: '6px', pt: '18px', borderTop: '1px solid rgba(255,255,255,.18)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Typography component="p" sx={{ m: 0, fontSize: 15, fontWeight: 700 }}>
                Hear it in person this Sunday
              </Typography>
              <Box component="ul" aria-label="Sunday schedule" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {sundayMorning.map((item) => {
                  const highlight = item.key === 'worship';
                  return (
                    <Box
                      component="li"
                      key={item.key}
                      sx={{
                        backgroundColor: highlight ? brand.white : 'rgba(255,255,255,.12)',
                        color: highlight ? brand.charcoal : brand.white,
                        borderRadius: '999px',
                        px: '12px',
                        py: '6px',
                        fontSize: 13,
                        fontWeight: highlight ? 800 : 700,
                      }}
                    >
                      {shortScheduleLabel(item)}
                    </Box>
                  );
                })}
              </Box>
              <Box
                component={Link}
                href={PLAN_VISIT_HREF}
                sx={{ color: '#ff8a9a', fontWeight: 700, fontSize: 15, minHeight: 32, display: 'inline-flex', alignItems: 'center', width: 'fit-content', textDecoration: 'none', '&:hover': { color: brand.white } }}
              >
                Plan your visit →
              </Box>
            </Box>
          </Box>
        </Box>

        {/* More sermons */}
        {moreVideos.length > 0 && (
          <Box component="section" aria-labelledby="more-sermons-title" sx={{ backgroundColor: brand.mist, px: 3, py: { xs: 8, md: 11.25 } }}>
            <Box sx={{ maxWidth: contentMaxWidth, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '18px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <PillLabel tone="dark">More sermons</PillLabel>
                  <Typography id="more-sermons-title" component="h2" sx={{ m: 0, fontSize: 'clamp(30px, 3.4vw, 44px)', fontWeight: 800, color: brand.charcoal, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
                    Keep watching
                  </Typography>
                </Box>
                <PillButton href="/media" tone="outline" endIcon={<ArrowForwardIcon />}>
                  All sermons
                </PillButton>
              </Box>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, max(260px, calc((100% - 48px) / 3))), 1fr))',
                  gap: 3,
                }}
              >
                {moreVideos.map((v) => (
                  <SermonCard key={v.id} video={v} />
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

  const [video, recent, services] = await Promise.all([
    getVideo(id),
    getRecentVideos(4),
    sanityFetch<Service[]>({
      query: groq`*[_type == "service"] | order(displayOrder asc) { title, dayOfWeek, time, description }`,
      tags: ['service'],
    }),
  ]);
  if (!video) return { notFound: true, revalidate: 300 };

  return {
    props: {
      video,
      moreVideos: recent.filter((v) => v.id !== id).slice(0, 3),
      services: services ?? [],
    },
    // Daily is plenty for titles/descriptions and keeps API use tiny.
    revalidate: 86400,
  };
};

export default SelectedMedia;
