import Box from '@mui/material/Box';
import { GetStaticProps } from 'next';
import { groq } from 'next-sanity';
import DynamicHead from '../../components/DynamicHead/DynamicHead';
import GiveOnlineCard from '../../components/Giving/GiveOnlineCard';
import MoreWaysToGive from '../../components/Giving/MoreWaysToGive';
import DarkCtaCard from '../../components/shared/DarkCtaCard';
import PageHero from '../../components/shared/PageHero';
import PillButton from '../../components/shared/PillButton';
import ScriptureBand from '../../components/shared/ScriptureBand';
import { useGivingConfig, useOrganizationConfig } from '../../constants/app-config/app-config-hooks';
import { brand } from '../../constants/brand';
import { Service } from '../../constants/Service';
import { breadcrumbJsonLd } from '../../constants/structured-data';
import { getPrimaryService, getSundayMorning } from '../../constants/sunday-schedule';
import { sanityFetch } from '../../src/sanity/lib/client';

type GivingProps = { services: Service[] };

export const Giving = ({ services }: GivingProps) => {
  const giving = useGivingConfig();
  const { email } = useOrganizationConfig().contact;
  const sundayMorning = getSundayMorning(getPrimaryService(services));

  return (
    <Box sx={{ backgroundColor: brand.paper, color: brand.text }}>
      <DynamicHead
        fullTitle={giving.header.title}
        description={giving.header.description}
        image={giving.hero.image.path}
        imageAlt={giving.hero.image.description}
        jsonLd={[breadcrumbJsonLd([{ name: 'Giving', path: '/giving' }])]}
      />
      <Box component="main">
        <PageHero eyebrow={giving.hero.eyebrow} title={giving.hero.title} text={giving.hero.text} image={giving.hero.image} overlay={0.6} />
        <GiveOnlineCard />
        <MoreWaysToGive sundayMorning={sundayMorning} />
        <ScriptureBand text={giving.scripture.text} reference={giving.scripture.reference} />
        <DarkCtaCard
          id="giving-questions-title"
          title="Questions about giving?"
          text="We’re happy to help. Reach out and someone from our team will get back to you."
          actions={
            <>
              <PillButton href="/connect" sx={{ minHeight: 52 }}>
                Contact Us
              </PillButton>
              <PillButton href={`mailto:${email.primary}`} tone="ghost" sx={{ minHeight: 52 }}>
                Email the Church
              </PillButton>
            </>
          }
        />
      </Box>
    </Box>
  );
};

export const getStaticProps: GetStaticProps<GivingProps> = async () => {
  const services = await sanityFetch<Service[]>({
    query: groq`*[_type == "service"] | order(displayOrder asc) { title, dayOfWeek, time, description }`,
    tags: ['service'],
  });
  return { props: { services: services ?? [] }, revalidate: 3600 };
};

export default Giving;
