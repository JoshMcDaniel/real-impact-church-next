import Box from '@mui/material/Box';
import { GetStaticProps } from 'next';
import { groq } from 'next-sanity';
import BeliefsPreview from '../../components/About/BeliefsPreview';
import MissionVision from '../../components/About/MissionVision';
import StaffPreview, { StaffPreviewPerson } from '../../components/About/StaffPreview';
import WhoWeAre from '../../components/About/WhoWeAre';
import DynamicHead from '../../components/DynamicHead/DynamicHead';
import PageHero from '../../components/shared/PageHero';
import SeatSavedCta from '../../components/shared/SeatSavedCta';
import appConfig from '../../constants/app-config/config.json';
import { useAboutConfig } from '../../constants/app-config/app-config-hooks';
import { brand } from '../../constants/brand';
import { Service } from '../../constants/Service';
import { breadcrumbJsonLd } from '../../constants/structured-data';
import { getPrimaryService, getSundayMorning } from '../../constants/sunday-schedule';
import { sanityFetch } from '../../src/sanity/lib/client';

type AboutProps = {
  services: Service[];
  staff: StaffPreviewPerson[];
};

export const About = ({ services, staff }: AboutProps) => {
  const aboutConfig = useAboutConfig();
  const sundayMorning = getSundayMorning(getPrimaryService(services));

  return (
    <Box sx={{ backgroundColor: brand.paper, color: brand.text }}>
      <DynamicHead
        fullTitle={aboutConfig.header.title}
        description={aboutConfig.header.description}
        image={aboutConfig.hero.image.path}
        imageAlt={aboutConfig.hero.image.description}
        jsonLd={[breadcrumbJsonLd([{ name: 'About', path: '/about' }])]}
      />
      <Box component="main">
        <PageHero
          eyebrow={aboutConfig.hero.eyebrow}
          title={aboutConfig.hero.title}
          text={aboutConfig.hero.text}
          image={aboutConfig.hero.image}
        />
        <WhoWeAre sundayMorning={sundayMorning} />
        <MissionVision />
        <BeliefsPreview />
        <StaffPreview staff={staff} />
        <SeatSavedCta sundayMorning={sundayMorning} />
      </Box>
    </Box>
  );
};

export const getStaticProps: GetStaticProps<AboutProps> = async () => {
  const count = appConfig.website.about.staff_preview.count;
  const [services, staff] = await Promise.all([
    sanityFetch<Service[]>({
      query: groq`*[_type == "service"] | order(displayOrder asc) { title, dayOfWeek, time, description }`,
      tags: ['service'],
    }),
    sanityFetch<StaffPreviewPerson[]>({
      query: groq`*[_type == "staff"] | order(displayOrder asc)[0...$count] { _id, name, position, image }`,
      qParams: { count },
      tags: ['staff'],
    }),
  ]);

  return {
    props: { services: services ?? [], staff: staff ?? [] },
    revalidate: 900,
  };
};

export default About;
