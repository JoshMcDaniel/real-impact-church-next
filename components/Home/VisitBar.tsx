import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { ReactNode } from 'react';
import { brand, contentMaxWidth } from '../../constants/brand';
import {
  useHomeConfig,
  useOrganizationConfig,
} from '../../constants/app-config/app-config-hooks';
import { Service } from '../../constants/Service';
import PillButton from '../shared/PillButton';
import { PLAN_VISIT_HREF } from '../Layout/SiteHeader';

const labelSx = {
  m: 0,
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: '.16em',
  textTransform: 'uppercase' as const,
  color: brand.muted,
};

const IconBadge = ({ children }: { children: ReactNode }) => (
  <Box
    aria-hidden
    sx={{
      flex: 'none',
      width: 48,
      height: 48,
      borderRadius: '14px',
      backgroundColor: brand.redTint,
      color: brand.red,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {children}
  </Box>
);

type VisitBarProps = {
  /** The main weekly service (first Sanity service), if one exists. */
  primaryService?: Service;
};

/**
 * Service time + location strip that overlaps the bottom of the hero.
 * 3 columns on wide screens, 2 + full-width CTA on medium, stacked on phones.
 */
export const VisitBar = ({ primaryService }: VisitBarProps) => {
  const { contact } = useOrganizationConfig();
  const sunday = useHomeConfig().sunday_morning.items;
  const worship = sunday.find((item) => item.key === 'worship');
  const beforeService = sunday.filter((item) => item.key !== 'worship');

  const serviceTitle = primaryService
    ? `${primaryService.dayOfWeek} ${primaryService.title}`
    : `Sunday ${worship?.title ?? 'Worship'}`;
  const serviceTime = primaryService?.time ?? worship?.time;

  return (
    <Box
      component="section"
      aria-label="Service times and location"
      sx={{ position: 'relative', zIndex: 2, maxWidth: contentMaxWidth, mx: 'auto', mt: '-72px', px: 3 }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1.15fr',
          gap: '1px',
          backgroundColor: brand.line,
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(43,43,43,.16)',
          '& > *': { backgroundColor: brand.white },
          '@media (max-width: 1040px)': { gridTemplateColumns: '1fr 1fr' },
          '@media (max-width: 640px)': { gridTemplateColumns: '1fr' },
        }}
      >
        <Box sx={{ p: '30px 32px', display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
          <IconBadge>
            <AccessTimeIcon />
          </IconBadge>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Typography component="h2" sx={labelSx}>
              {serviceTitle}
            </Typography>
            <Typography component="p" sx={{ m: 0, fontSize: 22, fontWeight: 800, color: brand.charcoal }}>
              <time>{serviceTime}</time>
            </Typography>
            {beforeService.length > 0 && (
              <Typography component="p" sx={{ m: 0, fontSize: 14, lineHeight: 1.5, color: brand.muted }}>
                {beforeService.map((item) => `${item.title} ${item.time.replace(/\s?[AP]M$/i, '')}`).join(' · ')}
              </Typography>
            )}
          </Box>
        </Box>

        <Box sx={{ p: '30px 32px', display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
          <IconBadge>
            <PlaceOutlinedIcon />
          </IconBadge>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Typography component="h2" sx={labelSx}>
              Location
            </Typography>
            <Box
              component="address"
              sx={{ fontStyle: 'normal', fontSize: 18, fontWeight: 700, color: brand.charcoal, lineHeight: 1.4 }}
            >
              {contact.street}
              <br />
              {contact.city}, {contact.state} {contact.zip_code}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            p: '30px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '14px',
            backgroundColor: `${brand.charcoal} !important`,
            '@media (max-width: 1040px)': {
              gridColumn: '1 / -1',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            },
            '@media (max-width: 640px)': { flexDirection: 'column', alignItems: 'flex-start' },
          }}
        >
          <Typography component="p" sx={{ m: 0, color: brand.white, fontSize: 17, fontWeight: 700 }}>
            First time? We’d love to meet you.
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <PillButton href={contact.google_maps_link} size="small">
              Get Directions
            </PillButton>
            <PillButton href={PLAN_VISIT_HREF} tone="ghost" size="small">
              Plan Your Visit
            </PillButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VisitBar;
