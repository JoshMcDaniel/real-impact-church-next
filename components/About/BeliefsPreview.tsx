import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import { brand, contentMaxWidth } from '../../constants/brand';
import { useAboutConfig } from '../../constants/app-config/app-config-hooks';
import { beliefSlug, beliefs, excerpt } from '../../constants/beliefs';
import BreakableTitle from '../shared/BreakableTitle';
import SectionHeader from '../shared/SectionHeader';

const cardHover = {
  transition: 'transform .2s ease, box-shadow .2s ease',
  '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 18px 40px rgba(43,43,43,.14)' },
};

export const BeliefsPreview = () => {
  const { beliefs_preview } = useAboutConfig();
  const featured = beliefs.filter((b) => beliefs_preview.featured.includes(b.title));
  const remaining = beliefs.filter((b) => !beliefs_preview.featured.includes(b.title));

  return (
    <Box
      component="section"
      aria-labelledby="beliefs-title"
      sx={{
        maxWidth: contentMaxWidth,
        mx: 'auto',
        px: 3,
        pt: { xs: 10, md: 13.75 },
        pb: { xs: 9, md: 11.25 },
        display: 'flex',
        flexDirection: 'column',
        gap: 5.5,
      }}
    >
      <SectionHeader
        id="beliefs-title"
        eyebrow="What we believe"
        title={beliefs_preview.title}
        aside={
          <Box
            component={Link}
            href="/beliefs"
            sx={{
              fontWeight: 700,
              fontSize: 16,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              minHeight: 44,
              color: brand.red,
              textDecoration: 'none',
              '&:hover': { color: brand.redDark },
            }}
          >
            Read all our beliefs <ArrowForwardIcon fontSize="small" />
          </Box>
        }
      />
      <Typography component="p" sx={{ m: '-24px 0 0', fontSize: 17, lineHeight: 1.7, maxWidth: 680 }}>
        {beliefs_preview.text}
      </Typography>

      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          m: 0,
          p: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, max(260px, calc((100% - 48px) / 3))), 1fr))',
          gap: 3,
        }}
      >
        {featured.map((belief, index) => (
          <Box component="li" key={belief.title} sx={{ display: 'flex' }}>
            <Box
              component={Link}
              href={`/beliefs#${beliefSlug(belief.title)}`}
              sx={{
                flex: 1,
                backgroundColor: brand.white,
                border: `1px solid ${brand.line}`,
                borderRadius: '20px',
                p: '28px 26px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                color: brand.text,
                textDecoration: 'none',
                ...cardHover,
              }}
            >
              <Box component="span" aria-hidden sx={{ fontSize: 14, fontWeight: 800, letterSpacing: '.12em', color: brand.red }}>
                {String(index + 1).padStart(2, '0')}
              </Box>
              <Typography component="h3" sx={{ m: 0, fontSize: 20, fontWeight: 800, color: brand.charcoal }}>
                <BreakableTitle text={belief.title} />
              </Typography>
              <Box component="span" sx={{ fontSize: 15, lineHeight: 1.65 }}>
                {excerpt(belief.text)}
              </Box>
            </Box>
          </Box>
        ))}

        {remaining.length > 0 && (
          <Box component="li" sx={{ display: 'flex' }}>
            <Box
              component={Link}
              href="/beliefs"
              sx={{
                flex: 1,
                backgroundColor: brand.charcoal,
                borderRadius: '20px',
                p: '28px 26px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                color: brand.white,
                textDecoration: 'none',
                ...cardHover,
              }}
            >
              <Box component="span" sx={{ fontSize: 14, fontWeight: 800, letterSpacing: '.12em', color: '#ff6b7f' }}>
                +{remaining.length} MORE
              </Box>
              <Typography component="h3" sx={{ m: 0, fontSize: 20, fontWeight: 800 }}>
                See all {beliefs.length} beliefs
              </Typography>
              <Box component="span" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, color: '#e6e9eb' }}>
                {remaining.map((belief) => (
                  <Box
                    component="span"
                    key={belief.title}
                    sx={{ backgroundColor: 'rgba(255,255,255,.12)', borderRadius: '999px', px: '12px', py: '6px', fontSize: 13, fontWeight: 600 }}
                  >
                    {belief.title}
                  </Box>
                ))}
              </Box>
              <Box component="span" sx={{ mt: 'auto', display: 'inline-flex', alignItems: 'center', gap: 1, fontWeight: 700, fontSize: 15 }}>
                Read our full statement of faith <ArrowForwardIcon fontSize="small" />
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default BeliefsPreview;
