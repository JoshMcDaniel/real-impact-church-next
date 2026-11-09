import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { GetStaticProps } from 'next';
import { groq } from 'next-sanity';
import DynamicHead from '../../components/DynamicHead/DynamicHead';
import StaffCard, { StaffPerson } from '../../components/Staff/StaffCard';
import DarkCtaCard from '../../components/shared/DarkCtaCard';
import PageHero from '../../components/shared/PageHero';
import PillButton from '../../components/shared/PillButton';
import PillLabel from '../../components/shared/PillLabel';
import { PLAN_VISIT_HREF } from '../../components/Layout/SiteHeader';
import { useStaffConfig } from '../../constants/app-config/app-config-hooks';
import { brand, contentMaxWidth } from '../../constants/brand';
import { Service } from '../../constants/Service';
import { breadcrumbJsonLd } from '../../constants/structured-data';
import { getPrimaryService, getSundayMorning, shortScheduleLabel } from '../../constants/sunday-schedule';
import { sanityFetch } from '../../src/sanity/lib/client';

type StaffProps = {
  staff: StaffPerson[];
  services: Service[];
};

export const Staff = ({ staff, services }: StaffProps) => {
  const { header, hero } = useStaffConfig();
  const sundayMorning = getSundayMorning(getPrimaryService(services));

  return (
    <Box sx={{ backgroundColor: brand.paper, color: brand.text }}>
      <DynamicHead
        fullTitle={header.title}
        description={header.description}
        image={hero.image.path}
        imageAlt={hero.image.description}
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'About', path: '/about' },
            { name: 'Our Staff', path: '/staff' },
          ]),
        ]}
      />
      <Box component="main">
        <PageHero
          breadcrumbs={[{ label: 'About', href: '/about' }, { label: 'Our Staff' }]}
          title={hero.title}
          text={hero.text}
          image={hero.image}
          overlay={0.6}
        />

        <Box
          component="section"
          aria-labelledby="team-title"
          sx={{ maxWidth: contentMaxWidth, mx: 'auto', px: 3, pt: { xs: 7, md: 9 }, pb: { xs: 8, md: 11.25 }, display: 'flex', flexDirection: 'column', gap: 4 }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <PillLabel tone="dark">Our team</PillLabel>
            <Typography id="team-title" component="h2" sx={{ m: 0, fontSize: 'clamp(30px, 3.4vw, 44px)', fontWeight: 800, color: brand.charcoal, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
              Serving our church family
            </Typography>
          </Box>
          {staff.length > 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
              {staff.map((person, index) => (
                <StaffCard key={person._id} person={person} reverse={index % 2 === 1} />
              ))}
            </Box>
          ) : (
            <Typography component="p" sx={{ m: 0, fontSize: 17, lineHeight: 1.7 }}>
              Staff profiles are coming soon. In the meantime, we’d love to meet you on Sunday.
            </Typography>
          )}
        </Box>

        <Box sx={{ mt: { xs: -8, md: -11.25 } }}>
          <DarkCtaCard
            id="staff-cta-title"
            title="Come meet us in person."
            text="We’d love to say hello this Sunday."
            extra={
              <Box component="ul" aria-label="Sunday schedule" sx={{ listStyle: 'none', m: '4px 0 0', p: 0, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
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
            }
            actions={
              <>
                <PillButton href={PLAN_VISIT_HREF} sx={{ minHeight: 52 }}>
                  Plan Your Visit
                </PillButton>
                <PillButton href="/connect" tone="ghost" sx={{ minHeight: 52 }}>
                  Get in Touch
                </PillButton>
              </>
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export const getStaticProps: GetStaticProps<StaffProps> = async () => {
  const [staff, services] = await Promise.all([
    sanityFetch<StaffPerson[]>({
      query: groq`*[_type == "staff"] | order(displayOrder asc) { _id, name, position, image, description }`,
      tags: ['staff'],
    }),
    sanityFetch<Service[]>({
      query: groq`*[_type == "service"] | order(displayOrder asc) { title, dayOfWeek, time, description }`,
      tags: ['service'],
    }),
  ]);

  return {
    props: { staff: staff ?? [], services: services ?? [] },
    revalidate: 900,
  };
};

export default Staff;
