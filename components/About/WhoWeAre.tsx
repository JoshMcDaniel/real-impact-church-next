import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { brand, contentMaxWidth } from '../../constants/brand';
import { useAboutConfig } from '../../constants/app-config/app-config-hooks';
import { SundayItem } from '../../constants/sunday-schedule';
import { Eyebrow } from '../shared/SectionHeader';

const shortTime = (time: string) => time.replace(/\s?[AP]\.?M\.?$/i, '');

type WhoWeAreProps = { sundayMorning: SundayItem[] };

export const WhoWeAre = ({ sundayMorning }: WhoWeAreProps) => {
  const { who_we_are } = useAboutConfig();

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
            m: '-96px 20px 0',
            backgroundColor: brand.red,
            color: brand.white,
            borderRadius: '20px',
            p: '26px 26px 24px',
            boxShadow: '0 18px 40px rgba(217,4,41,.28)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <Box component="svg" aria-hidden width={34} height={26} viewBox="0 0 34 26" sx={{ fill: brand.white, opacity: 0.5 }}>
            <path d="M0 26V15.6C0 6.9 4.6 1.6 13.4 0l1.4 4.1C10 5.5 7.8 8.4 7.6 12.4H14V26H0zm19 0V15.6C19 6.9 23.6 1.6 32.4 0l1.4 4.1C29 5.5 26.8 8.4 26.6 12.4H33V26H19z" />
          </Box>
          <Typography component="p" sx={{ m: 0, fontSize: 24, fontWeight: 800, lineHeight: 1.25 }}>
            {who_we_are.quote}
          </Typography>
          <Box
            component="ul"
            aria-label="Sunday schedule"
            sx={{
              listStyle: 'none',
              m: 0,
              p: '14px 0 0',
              borderTop: '1px solid rgba(255,255,255,.3)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            {sundayMorning.map((item) => {
              const highlight = item.key === 'worship';
              return (
                <Box
                  component="li"
                  key={item.key}
                  sx={{
                    backgroundColor: highlight ? brand.white : 'rgba(255,255,255,.16)',
                    color: highlight ? brand.charcoal : brand.white,
                    borderRadius: '999px',
                    px: '12px',
                    py: '6px',
                    fontSize: 13,
                    fontWeight: highlight ? 800 : 700,
                  }}
                >
                  {shortTime(item.time)} {item.title.replace(/^Free /, '').replace(/ Service$/, '')}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WhoWeAre;
