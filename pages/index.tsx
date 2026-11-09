import Box from '@mui/material/Box';
import { GetStaticProps } from 'next';
import { groq } from 'next-sanity';
import DynamicHead from '../components/DynamicHead/DynamicHead';
import AboutPreview from '../components/Home/AboutPreview';
import ExploreTiles from '../components/Home/ExploreTiles';
import GivingBand from '../components/Home/GivingBand';
import HomeHero from '../components/Home/HomeHero';
import LatestSermonFeature from '../components/Media/LatestSermonFeature';
import PlanVisit, { FaqItem } from '../components/Home/PlanVisit';
import UpcomingEvents from '../components/Home/UpcomingEvents';
import VisitBar from '../components/Home/VisitBar';
import WhatToExpect from '../components/Home/WhatToExpect';
import appConfig from '../constants/app-config/config.json';
import { useHomeConfig } from '../constants/app-config/app-config-hooks';
import { brand } from '../constants/brand';
import { EVENT_FIELDS, EventType, UPCOMING_FILTER } from '../constants/Event';
import { Service } from '../constants/Service';
import type { Video } from '../constants/video';
import { getRecentVideos } from '../constants/youtube';
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
  latestVideo: Video | null;
  /** Latest sermon was posted in the last 8 days (decided at build time). */
  latestIsNew: boolean;
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

const Home = ({ services, events, latestVideo, latestIsNew }: HomeProps) => {
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
        {latestVideo && (
          <LatestSermonFeature
            id="sermons"
            video={latestVideo}
            isNew={latestIsNew}
            moreHref="/media"
            moreLabel="All Sermons"
            sx={{ pt: { xs: 10, md: 12.5 }, pb: 0 }}
          />
        )}
        <UpcomingEvents events={events} sundayMorning={sundayMorning} />
        <ExploreTiles />
        <GivingBand />
        <PlanVisit faq={faq} />
      </Box>
    </Box>
  );
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
    getRecentVideos(1).then((videos) => videos[0] ?? null),
  ]);

  return {
    props: {
      services: services ?? [],
      events: events ?? [],
      latestVideo,
      latestIsNew:
        !!latestVideo?.publishedAt && Date.now() - new Date(latestVideo.publishedAt).getTime() < 8 * 24 * 60 * 60 * 1000,
    },
    // Regenerate at most every 15 minutes so new events and sermons show up quickly.
    revalidate: 900,
  };
};

export default Home;
