import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ChurchOutlinedIcon from '@mui/icons-material/ChurchOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { ReactNode } from 'react';
import { brand, contentMaxWidth } from '../../constants/brand';
import { useOrganizationConfig } from '../../constants/app-config/app-config-hooks';
import { shortScheduleLabel, SundayItem } from '../../constants/sunday-schedule';
import PillLabel from '../shared/PillLabel';

const WayCard = ({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) => (
  <Box
    component="article"
    sx={{
      backgroundColor: brand.white,
      border: `1px solid ${brand.line}`,
      borderRadius: '24px',
      p: 4,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      boxShadow: '0 10px 30px rgba(43,43,43,.06)',
    }}
  >
    <Box
      aria-hidden
      sx={{ width: 56, height: 56, borderRadius: '16px', backgroundColor: brand.redTint, color: brand.red, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {icon}
    </Box>
    <Typography component="h3" sx={{ m: 0, fontSize: 24, fontWeight: 800, color: brand.charcoal }}>
      {title}
    </Typography>
    {children}
  </Box>
);

/** "Give in person" and "Give by mail" cards. */
export const MoreWaysToGive = ({ sundayMorning }: { sundayMorning: SundayItem[] }) => {
  const org = useOrganizationConfig();
  const { street, city, state, zip_code } = org.contact;

  return (
    <Box component="section" aria-labelledby="ways-title" sx={{ maxWidth: contentMaxWidth, mx: 'auto', px: 3, pt: 6, pb: { xs: 8, md: 12.5 }, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <PillLabel tone="dark">More ways to give</PillLabel>
        <Typography id="ways-title" component="h2" sx={{ m: 0, fontSize: 'clamp(30px, 3.4vw, 44px)', fontWeight: 800, color: brand.charcoal, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
          Prefer to give another way?
        </Typography>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: 3 }}>
        <WayCard icon={<ChurchOutlinedIcon />} title="Give in person">
          <Typography component="p" sx={{ m: 0, fontSize: 16, lineHeight: 1.7 }}>
            Give during any of our Sunday gatherings at {street} in {city}.
          </Typography>
          <Box component="ul" aria-label="Sunday schedule" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {sundayMorning.map((item) => {
              const highlight = item.key === 'worship';
              return (
                <Box
                  component="li"
                  key={item.key}
                  sx={{
                    backgroundColor: highlight ? brand.red : brand.mist,
                    color: highlight ? brand.white : brand.charcoal,
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
        </WayCard>
        <WayCard icon={<MailOutlineIcon />} title="Give by mail">
          <Typography component="p" sx={{ m: 0, fontSize: 16, lineHeight: 1.7 }}>
            Mail your gift to:
          </Typography>
          <Box
            component="address"
            sx={{ fontStyle: 'normal', backgroundColor: brand.mist, borderRadius: '16px', p: '16px 20px', fontSize: 16, fontWeight: 700, lineHeight: 1.6, color: brand.charcoal }}
          >
            {org.full_name}
            <br />
            {street}
            <br />
            {city}, {state} {zip_code}
          </Box>
        </WayCard>
      </Box>
    </Box>
  );
};

export default MoreWaysToGive;
