import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { brand, contentMaxWidth } from '../../constants/brand';
import { useAboutConfig } from '../../constants/app-config/app-config-hooks';
import { SundayItem } from '../../constants/sunday-schedule';
import Link from 'next/link';
import GlowLayer from '../shared/GlowLayer';
import { PLAN_VISIT_HREF } from '../Layout/SiteHeader';
import { Eyebrow } from '../shared/SectionHeader';

const shortTime = (time: string) => time.replace(/\s?[AP]\.?M\.?$/i, '');

type WhoWeAreProps = { sundayMorning: SundayItem[] };

export const WhoWeAre = ({ sundayMorning }: WhoWeAreProps) => {
  const { who_we_are } = useAboutConfig();
  // Highlight the end of the quote ("just for you!") when present.
  const [quoteLead, quoteEnd] = who_we_are.quote.includes('just for you')
    ? [who_we_are.quote.slice(0, who_we_are.quote.indexOf('just for you')), who_we_are.quote.slice(who_we_are.quote.indexOf('just for you'))]
    : [who_we_are.quote, ''];

  return (
    <Box
      component="section"
      aria-labelledby="who-title"
      sx={{
        maxWidth: contentMaxWidth,
        mx: 'auto',
        px: 3,
        pt: { xs: 10, md: 13.75 },
        pb: { xs: 10, md: 12.5 },
        display: 'flex',
        flexWrap: 'wrap',
        gap: 7,
        alignItems: 'flex-start',
      }}
    >
      <Box sx={{ flex: '1.3 1 480px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '22px' }}>
        <Eyebrow>Who we are</Eyebrow>
        <Typography
          id="who-title"
          component="h2"
          sx={{ m: 0, fontSize: 'clamp(30px, 3.4vw, 44px)', lineHeight: 1.15, fontWeight: 800, color: brand.charcoal }}
        >
          {who_we_are.title}
        </Typography>
        {who_we_are.paragraphs.map((paragraph) => (
          <Typography key={paragraph.slice(0, 24)} component="p" sx={{ m: 0, fontSize: 18, lineHeight: 1.8 }}>
            {paragraph}
          </Typography>
        ))}
      </Box>

      <Box component="aside" sx={{ flex: '1 1 340px', minWidth: 0, position: 'relative', pb: 1 }}>
        <Box component="figure" sx={{ m: 0, position: 'relative', height: 380, borderRadius: '24px', overflow: 'hidden' }}>
          <Image
            src={who_we_are.image.path}
            alt={who_we_are.image.description}
            fill
            sizes="(max-width: 900px) 100vw, 480px"
            style={{ objectFit: 'cover' }}
          />
        </Box>
        <Box
          component="blockquote"
          sx={{
            position: 'relative',
            m: '-110px 16px 0',
            backgroundColor: brand.footer,
            color: brand.white,
            border: `3px solid ${brand.white}`,
            borderRadius: '22px',
            p: '28px 26px 24px',
            boxShadow: '0 24px 50px rgba(20,20,20,.35)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <GlowLayer glows={[{ right: -90, top: -110, size: 240, opacity: 0.28 }]} />
          <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <Box component="svg" aria-hidden width={38} height={29} viewBox="0 0 34 26" sx={{ fill: brand.red }}>
              <path d="M0 26V15.6C0 6.9 4.6 1.6 13.4 0l1.4 4.1C10 5.5 7.8 8.4 7.6 12.4H14V26H0zm19 0V15.6C19 6.9 23.6 1.6 32.4 0l1.4 4.1C29 5.5 26.8 8.4 26.6 12.4H33V26H19z" />
            </Box>
            <Box
              component="span"
              sx={{ backgroundColor: brand.red, borderRadius: '999px', px: '12px', py: '6px', fontSize: 12, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase' }}
            >
              This Sunday
            </Box>
          </Box>
          <Typography component="p" sx={{ position: 'relative', m: 0, fontSize: 'clamp(24px, 2.4vw, 28px)', fontWeight: 800, lineHeight: 1.2 }}>
            {quoteLead}
            {quoteEnd && (
              <Box component="span" sx={{ color: '#ff8a9a' }}>
                {quoteEnd}
              </Box>
            )}
          </Typography>
          <Box
            component="ol"
            aria-label="Sunday schedule"
            sx={{ position: 'relative', listStyle: 'none', m: 0, p: '14px 0 0', borderTop: '1px solid rgba(255,255,255,.18)', display: 'flex', flexDirection: 'column', gap: 1 }}
          >
            {sundayMorning.map((item) => {
              const highlight = item.key === 'worship';
              return (
                <Box component="li" key={item.key} sx={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: 15 }}>
                  <Box component="span" sx={{ flex: 'none', width: 58, fontWeight: 800, color: highlight ? '#ff8a9a' : brand.white }}>
                    {shortTime(item.time)}
                  </Box>
                  <Box component="span" sx={{ color: highlight ? brand.white : '#d6dadd', fontWeight: highlight ? 800 : 400 }}>
                    {item.title.charAt(0) + item.title.slice(1).toLowerCase()}
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Box
            component={Link}
            href={PLAN_VISIT_HREF}
            sx={{
              position: 'relative',
              alignSelf: 'flex-start',
              color: brand.white,
              fontWeight: 700,
              fontSize: 15,
              minHeight: 36,
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: 'none',
              borderBottom: `2px solid ${brand.red}`,
              '&:hover': { color: '#ff8a9a' },
            }}
          >
            Plan your visit →
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WhoWeAre;
