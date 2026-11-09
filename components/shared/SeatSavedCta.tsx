import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';
import Image from 'next/image';
import { brand, contentMaxWidth } from '../../constants/brand';
import {
  useAboutConfig,
  useOrganizationConfig,
} from '../../constants/app-config/app-config-hooks';
import { SundayItem } from '../../constants/sunday-schedule';
import PillButton from './PillButton';
import { PLAN_VISIT_HREF } from '../Layout/SiteHeader';

const splitTime = (time: string): [string, string] => {
  const match = time.trim().match(/^(.*?)\s*([AP]\.?M\.?)$/i);
  return match ? [match[1], match[2].toUpperCase()] : [time, ''];
};

type SeatSavedCtaProps = { sundayMorning: SundayItem[] };

/** "Your seat is saved this Sunday." photo band with the Sunday morning steps. */
export const SeatSavedCta = ({ sundayMorning }: SeatSavedCtaProps) => {
  const { cta } = useAboutConfig();
  const { contact } = useOrganizationConfig();
  const steps = cta.steps as Record<string, { title: string; text: string }>;

  return (
    <Box
      component="section"
      aria-labelledby="seat-saved-title"
      sx={{ position: 'relative', overflow: 'hidden', backgroundColor: brand.charcoal, color: brand.white }}
    >
      <Image src="/images/revival.jpg" alt="" fill sizes="100vw" style={{ objectFit: 'cover' }} />
      <Box aria-hidden sx={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(20,20,20,0.72)' }} />
      <Box
        sx={{
          position: 'relative',
          maxWidth: contentMaxWidth,
          mx: 'auto',
          px: 3,
          py: { xs: 10, md: 13.75 },
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: 760 }}>
          <Typography
            component="p"
            sx={{
              m: 0,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '.24em',
              textTransform: 'uppercase',
            }}
          >
            <Box component="span" aria-hidden sx={{ width: 36, height: 3, backgroundColor: brand.red }} />
            Come and see
          </Typography>
          <Typography
            id="seat-saved-title"
            component="h2"
            sx={{ m: 0, fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.05, fontWeight: 800, letterSpacing: '-0.02em' }}
          >
            {cta.title}
          </Typography>
          <Box component="ul" aria-label="Good to know" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {cta.reassurances.map((item) => (
              <Box
                component="li"
                key={item}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  backgroundColor: 'rgba(255,255,255,.14)',
                  borderRadius: '999px',
                  px: '14px',
                  py: 1,
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                <CheckIcon aria-hidden sx={{ fontSize: 16 }} />
                {item}
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          component="ol"
          aria-label="Your Sunday morning"
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
            gap: 2,
          }}
        >
          {sundayMorning.map((item) => {
            const highlight = item.key === 'worship';
            const [clock, period] = splitTime(item.time);
            const step = steps[item.key] ?? { title: item.title, text: item.text };
            const sub = highlight ? brand.redSoft : '#d6dadd';
            return (
              <Box
                component="li"
                key={item.key}
                sx={{
                  backgroundColor: highlight ? brand.red : 'rgba(255,255,255,.1)',
                  border: highlight ? 'none' : '1px solid rgba(255,255,255,.22)',
                  borderRadius: '20px',
                  p: '26px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Typography component="p" sx={{ m: 0, fontSize: 'clamp(34px, 3.6vw, 46px)', lineHeight: 1, fontWeight: 800, letterSpacing: '-0.02em' }}>
                  <time>
                    {clock}
                    {period && (
                      <Box component="span" sx={{ fontSize: 15, fontWeight: 700, letterSpacing: 0, color: sub }}>
                        {' '}
                        {period}
                      </Box>
                    )}
                  </time>
                </Typography>
                <Typography component="h3" sx={{ m: '6px 0 0', fontSize: 19, fontWeight: 800 }}>
                  {step.title}
                </Typography>
                <Typography component="p" sx={{ m: 0, fontSize: 15, lineHeight: 1.6, color: sub }}>
                  {step.text}
                </Typography>
              </Box>
            );
          })}
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
          <PillButton href={PLAN_VISIT_HREF} endIcon={<ArrowForwardIcon />}>
            Plan Your Visit
          </PillButton>
          <PillButton href={contact.google_maps_link} tone="ghost">
            Get Directions
          </PillButton>
          <Typography component="p" sx={{ m: 0, fontSize: 15, color: '#d6dadd' }}>
            {contact.full_address}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SeatSavedCta;
