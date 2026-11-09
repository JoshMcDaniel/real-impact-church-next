import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { brand } from '../../constants/brand';
import { SundayItem } from '../../constants/sunday-schedule';
import {
  useMediaConfig,
  useOrganizationConfig,
} from '../../constants/app-config/app-config-hooks';
import PillButton from '../shared/PillButton';
import { PLAN_VISIT_HREF } from '../Layout/SiteHeader';

/** Shown instead of event cards when nothing is scheduled: promotes Sunday mornings. */
export const NoUpcomingEvents = ({ sundayMorning }: { sundayMorning: SundayItem[] }) => {
  const { full_name } = useOrganizationConfig();
  const socials = useMediaConfig().social_media.filter(
    (s) => s.platform === 'FACEBOOK' || s.platform === 'INSTAGRAM'
  );

  return (
    <Box
      sx={{
        backgroundColor: brand.white,
        border: `1px solid ${brand.line}`,
        borderRadius: '24px',
        p: { xs: '28px 20px', sm: '44px' },
        display: 'flex',
        flexWrap: 'wrap',
        gap: 5,
        alignItems: 'center',
      }}
    >
      <Box sx={{ flex: '1 1 360px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box
          aria-hidden
          sx={{
            width: 56,
            height: 56,
            borderRadius: '16px',
            backgroundColor: brand.redTint,
            color: brand.red,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CalendarMonthOutlinedIcon />
        </Box>
        <Typography
          component="h3"
          sx={{ m: 0, fontSize: 'clamp(22px, 2.2vw, 28px)', lineHeight: 1.25, fontWeight: 800, color: brand.charcoal }}
        >
          No special events on the calendar right now — but we gather every Sunday.
        </Typography>
        <Typography component="p" sx={{ m: 0, fontSize: 16, lineHeight: 1.7, maxWidth: 520 }}>
          Come for breakfast, stay for Bible study and worship. Follow us on social media to be the first to hear about
          upcoming events.
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', pt: '6px' }}>
          <PillButton href={PLAN_VISIT_HREF}>Plan Your Visit</PillButton>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            {socials.map((s) => {
              const label = s.platform.charAt(0) + s.platform.slice(1).toLowerCase();
              return (
                <Box
                  key={s.platform}
                  component="a"
                  href={s.path}
                  rel="noopener"
                  aria-label={`Follow ${full_name} on ${label}`}
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    border: '1px solid #cfd6da',
                    color: brand.charcoal,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': { backgroundColor: brand.charcoal, color: brand.white, borderColor: brand.charcoal },
                  }}
                >
                  {s.platform === 'FACEBOOK' ? <FacebookIcon fontSize="small" /> : <InstagramIcon fontSize="small" />}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>

      <Box
        component="ol"
        aria-label="Every Sunday"
        sx={{ flex: '1 1 340px', minWidth: 0, listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}
      >
        {sundayMorning.map((item) => {
          const highlight = item.key === 'worship';
          return (
            <Box
              component="li"
              key={item.key}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '18px',
                backgroundColor: highlight ? brand.red : brand.mist,
                color: highlight ? brand.white : brand.charcoal,
                borderRadius: '16px',
                p: '18px 20px',
              }}
            >
              <Typography component="p" sx={{ m: 0, flex: 'none', width: 104, fontSize: 18, fontWeight: 800 }}>
                <time>{item.time}</time>
              </Typography>
              <Box sx={{ minWidth: 0 }}>
                <Typography component="p" sx={{ m: 0, fontSize: 16, fontWeight: 800 }}>
                  {item.title}
                </Typography>
                <Typography component="p" sx={{ m: '2px 0 0', fontSize: 14, color: highlight ? brand.redSoft : brand.muted }}>
                  Every Sunday
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default NoUpcomingEvents;
