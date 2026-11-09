import Box from '@mui/material/Box';
import { GetStaticProps } from 'next';
import { groq } from 'next-sanity';
import DynamicHead from '../components/DynamicHead/DynamicHead';
import AboutPreview from '../components/Home/AboutPreview';
import ExploreTiles from '../components/Home/ExploreTiles';
import GivingBand from '../components/Home/GivingBand';
import HomeHero from '../components/Home/HomeHero';
import LatestSermon from '../components/Home/LatestSermon';
import PlanVisit, { FaqItem } from '../components/Home/PlanVisit';
import UpcomingEvents from '../components/Home/UpcomingEvents';
import VisitBar from '../components/Home/VisitBar';
import WhatToExpect from '../components/Home/WhatToExpect';
import appConfig from '../constants/app-config/config.json';
import { useHomeConfig } from '../constants/app-config/app-config-hooks';
import { brand } from '../constants/brand';
import { EVENT_FIELDS, EventType, UPCOMING_FILTER } from '../constants/Event';
import { LatestVideo, Service } from '../constants/Service';
import {
  getPrimaryService,
  getSundayMorning,
  SundayItem,
} from '../constants/sunday-schedule';
import { churchJsonLd, faqJsonLd } from '../constants/structured-data';
import { sanityFetch } from '../src/sanity/lib/client';

type HomeProps = {
  services: Service[];
  events: EventType[];
  latestVideo: LatestVideo | null;
};

/** "Our worship service is Sundays at 10:30 AM. Come early for free breakfast at 9:00 AM and Bible study at 9:30 AM." */
const serviceTimesAnswer = (sunday: SundayItem[]): string => {
  const worship = sunday.find((i) => i.key === 'worship');
  const before = sunday.filter((i) => i.key !== 'worship');
  const main = worship ? `Our worship service is Sundays at ${worship.time}.` : '';
  const extras = before.length
    ? ` Come early for ${before
        .map((i) => `${i.title.toLowerCase()} at ${i.time}`)
        .join(' and ')}.`
    : '';
  return `${main}${extras}`.trim();
};

const Home = ({ services, events, latestVideo }: HomeProps) => {
  const homeConfig = useHomeConfig();
  const primaryService = getPrimaryService(services);
  const sundayMorning = getSundayMorning(primaryService);

  const faq: FaqItem[] = [
    {
      question: `What time are services at ${appConfig.organization.full_name}?`,
      answer: serviceTimesAnswer(sundayMorning),
    },
    ...homeConfig.faq,
  ];

  return (
    <Box sx={{ backgroundColor: brand.paper, color: brand.text }}>
      <DynamicHead
        fullTitle={homeConfig.header.title}
        description={homeConfig.header.description}
        image={homeConfig.hero.image.path}
        imageAlt={homeConfig.hero.image.description}
        jsonLd={[churchJsonLd(), faqJsonLd(faq)]}
      />
      <Box component="main">
        <HomeHero />
        <VisitBar primaryService={primaryService} />
        <AboutPreview />
        <WhatToExpect sundayMorning={sundayMorning} />
        <LatestSermon video={latestVideo} />
        <UpcomingEvents events={events} sundayMorning={sundayMorning} />
        <ExploreTiles />
        <GivingBand />
        <PlanVisit faq={faq} />
      </Box>
    </Box>
  );
};

const decodeXml = (text: string) =>
  text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

/**
 * Fetches the channel's newest video from YouTube's public RSS feed
 * (no API key or quota needed). Returns null if the request fails.
 */
const fetchLatestVideo = async (): Promise<LatestVideo | null> => {
  const { channel_id } = appConfig.organization.social_media.youtube;
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channel_id}`, {
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const xml = await res.text();
    const entry = xml.match(/<entry>([\s\S]*?)<\/entry>/)?.[1];
    const id = entry?.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    if (!entry || !id) return null;
    return {
      id,
      title: decodeXml(entry.match(/<title>([^<]*)<\/title>/)?.[1] ?? 'Latest sermon'),
      thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      publishedAt: entry.match(/<published>([^<]+)<\/published>/)?.[1] ?? '',
    };
  } catch {
    return null;
  }
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const [services, events, latestVideo] = await Promise.all([
    sanityFetch<Service[]>({
      query: groq`*[_type == "service"] | order(displayOrder asc) {
        title,
        dayOfWeek,
        time,
        description
      }`,
      tags: ['service'],
    }),
    sanityFetch<EventType[]>({
      query: groq`*[${UPCOMING_FILTER}] | order(startDateTime asc)[0...3] { ${EVENT_FIELDS} }`,
      tags: ['events'],
    }),
    fetchLatestVideo(),
  ]);

  return {
    props: {
      services: services ?? [],
      events: events ?? [],
      latestVideo,
    },
    // Regenerate at most every 15 minutes so new events and sermons show up quickly.
    revalidate: 900,
  };
};

export default Home;
