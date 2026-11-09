import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { brand, contentMaxWidth } from '../../constants/brand';
import { SundayItem } from '../../constants/sunday-schedule';
import GlowLayer from '../shared/GlowLayer';
import PillButton from '../shared/PillButton';
import { Eyebrow } from '../shared/SectionHeader';
import { PLAN_VISIT_HREF } from '../Layout/SiteHeader';

const splitTime = (time: string): [string, string] => {
  const match = time.trim().match(/^(.*?)\s*([AP]\.?M\.?)$/i);
  return match ? [match[1], match[2].toUpperCase()] : [time, ''];
};

/** Dark band with the recurring Sunday morning schedule. */
export const WeeklySchedule = ({ sundayMorning }: { sundayMorning: SundayItem[] }) => (
  <Box component="section" aria-labelledby="weekly-title" sx={{ position: 'relative', backgroundColor: brand.footer, color: brand.white, px: 3, py: { xs: 8, md: 11.25 } }}>
    <GlowLayer glows={[{ right: -160, top: -200, size: 520, opacity: 0.16 }]} />
    <Box sx={{ position: 'relative', maxWidth: contentMaxWidth, mx: 'auto', display: 'flex', flexWrap: 'wrap', gap: 5, alignItems: 'center' }}>
      <Box sx={{ flex: '1 1 340px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <Eyebrow>Every week</Eyebrow>
        <Typography id="weekly-title" component="h2" sx={{ m: 0, fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 800, lineHeight: 1.15 }}>
          Sunday mornings at Real Impact
        </Typography>
        <Typography component="p" sx={{ m: 0, fontSize: 17, lineHeight: 1.7, color: '#d6dadd' }}>
          No sign-up needed. Come early for breakfast, stay for Bible study and worship.
        </Typography>
        <Box sx={{ pt: '6px' }}>
          <PillButton href={PLAN_VISIT_HREF}>Plan Your Visit</PillButton>
        </Box>
      </Box>
      <Box
        component="ol"
        aria-label="Sunday schedule"
        sx={{
          flex: '1.4 1 480px',
          minWidth: 0,
          listStyle: 'none',
          m: 0,
          p: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(160px, 100%), 1fr))',
          gap: '14px',
        }}
      >
        {sundayMorning.map((item) => {
          const highlight = item.key === 'worship';
          const [clock, period] = splitTime(item.time);
          return (
            <Box
              component="li"
              key={item.key}
              sx={{ backgroundColor: highlight ? brand.red : '#383838', borderRadius: '18px', p: '22px', display: 'flex', flexDirection: 'column', gap: '6px' }}
            >
              <Typography component="p" sx={{ m: 0, fontSize: 28, fontWeight: 800 }}>
                <time>
                  {clock}
                  {period && (
                    <Box component="span" sx={{ fontSize: 14, color: highlight ? brand.redSoft : '#b4babe' }}>
                      {' '}
                      {period}
                    </Box>
                  )}
                </time>
              </Typography>
              <Typography component="h3" sx={{ m: 0, fontSize: 16, fontWeight: 800 }}>
                {item.title}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  </Box>
);

export default WeeklySchedule;
