import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import DynamicHead from '../../components/DynamicHead/DynamicHead';
import BreakableTitle from '../../components/shared/BreakableTitle';
import DarkCtaCard from '../../components/shared/DarkCtaCard';
import PageHero from '../../components/shared/PageHero';
import PillButton from '../../components/shared/PillButton';
import { PLAN_VISIT_HREF } from '../../components/Layout/SiteHeader';
import { useBeliefsConfig } from '../../constants/app-config/app-config-hooks';
import { beliefSlug, beliefs } from '../../constants/beliefs';
import { brand, contentMaxWidth } from '../../constants/brand';
import { breadcrumbJsonLd } from '../../constants/structured-data';

export const Beliefs = () => {
  const beliefsConfig = useBeliefsConfig();

  return (
    <Box sx={{ backgroundColor: brand.paper, color: brand.text }}>
      <DynamicHead
        fullTitle={beliefsConfig.header.title}
        description={beliefsConfig.header.description}
        image={beliefsConfig.hero.image.path}
        imageAlt={beliefsConfig.hero.image.description}
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'About', path: '/about' },
            { name: 'What We Believe', path: '/beliefs' },
          ]),
        ]}
      />
      <Box component="main">
        <PageHero
          breadcrumbs={[{ label: 'About', href: '/about' }, { label: 'What We Believe' }]}
          title={beliefsConfig.hero.title}
          text={beliefsConfig.hero.text}
          image={beliefsConfig.hero.image}
          overlay={0.6}
        />

        <Box
          component="nav"
          aria-labelledby="jump-title"
          sx={{ maxWidth: contentMaxWidth, mx: 'auto', px: 3, pt: 8, pb: 1, display: 'flex', flexDirection: 'column', gap: '18px' }}
        >
          <Typography
            id="jump-title"
            component="h2"
            sx={{ m: 0, fontSize: 13, fontWeight: 700, letterSpacing: '.24em', textTransform: 'uppercase', color: brand.muted }}
          >
            Jump to a belief
          </Typography>
          <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {beliefs.map((belief) => (
              <li key={belief.title}>
                <Box
                  component={Link}
                  href={`#${beliefSlug(belief.title)}`}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    minHeight: 44,
                    px: '18px',
                    borderRadius: '999px',
                    backgroundColor: brand.white,
                    border: `1px solid ${brand.lineStrong}`,
                    color: brand.charcoal,
                    fontWeight: 600,
                    fontSize: 14,
                    textDecoration: 'none',
                    '&:hover': { borderColor: brand.charcoal, backgroundColor: brand.mist },
                  }}
                >
                  <BreakableTitle text={belief.title} />
                </Box>
              </li>
            ))}
          </Box>
        </Box>

        <Box component="section" aria-label="Statement of faith" sx={{ maxWidth: contentMaxWidth, mx: 'auto', px: 3, pt: 5, pb: { xs: 9, md: 12.5 } }}>
          <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0, maxWidth: 900, display: 'flex', flexDirection: 'column' }}>
            {beliefs.map((belief, index) => (
              <Box
                component="li"
                key={belief.title}
                id={beliefSlug(belief.title)}
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px 32px',
                  py: 5,
                  borderTop: `1px solid ${brand.lineStrong}`,
                  scrollMarginTop: '96px',
                }}
              >
                <Typography aria-hidden component="p" sx={{ m: 0, flex: '0 0 64px', fontSize: 28, fontWeight: 800, color: brand.red, lineHeight: 1.2 }}>
                  {String(index + 1).padStart(2, '0')}
                </Typography>
                <Box sx={{ flex: '1 1 480px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <Typography component="h2" sx={{ m: 0, fontSize: 'clamp(24px, 2.4vw, 30px)', fontWeight: 800, color: brand.charcoal, lineHeight: 1.2 }}>
                    <BreakableTitle text={belief.title} />
                  </Typography>
                  <Typography component="p" sx={{ m: 0, fontSize: 17, lineHeight: 1.8 }}>
                    {belief.text}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, pt: '4px' }}>
                    <Typography
                      component="span"
                      sx={{ fontSize: 12, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: brand.muted, pr: '4px' }}
                    >
                      Scripture
                    </Typography>
                    {belief.verses.map((verse) => (
                      <Box
                        key={verse.label}
                        component="a"
                        href={verse.link}
                        target="_blank"
                        rel="noopener"
                        aria-label={`${verse.label} (opens Bible.com in a new tab)`}
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          minHeight: 36,
                          px: '14px',
                          borderRadius: '999px',
                          backgroundColor: brand.redTint,
                          color: '#a3031f',
                          fontWeight: 700,
                          fontSize: 13,
                          textDecoration: 'none',
                          '&:hover': { backgroundColor: brand.red, color: brand.white },
                        }}
                      >
                        {verse.label}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ mt: { xs: -8, md: -12.5 } }}>
          <DarkCtaCard
            id="beliefs-cta-title"
            title="Have questions about faith?"
            text="We’d love to talk with you. Reach out anytime, or join us Sunday morning for Bible study."
            actions={
              <>
                <PillButton href="/connect" sx={{ minHeight: 52 }}>
                  Ask Us a Question
                </PillButton>
                <PillButton href={PLAN_VISIT_HREF} tone="ghost" sx={{ minHeight: 52 }}>
                  Plan Your Visit
                </PillButton>
              </>
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

// Static content from config; pre-render at build time.
export const getStaticProps: GetStaticProps = async () => ({ props: {} });

export default Beliefs;
