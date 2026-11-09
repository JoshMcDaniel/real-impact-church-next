import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { brand, contentMaxWidth } from '../../constants/brand';
import { useGivingConfig } from '../../constants/app-config/app-config-hooks';
import PillButton from '../shared/PillButton';

export const GivingBand = () => {
  const { online_giving } = useGivingConfig();

  return (
    <Box component="section" id="give" aria-labelledby="give-title" sx={{ backgroundColor: brand.red, color: brand.white, px: 3 }}>
      <Box
        sx={{
          maxWidth: contentMaxWidth,
          mx: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 5,
          py: 9,
        }}
      >
        <Box sx={{ flex: '2 1 420px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <Typography
            id="give-title"
            component="h2"
            sx={{ m: 0, fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 800, lineHeight: 1.15 }}
          >
            Make a real impact through giving.
          </Typography>
          <Typography component="p" sx={{ m: 0, fontSize: 17, lineHeight: 1.7, color: brand.redSoft, maxWidth: 620 }}>
            Thank you for supporting our church and its ministries. Give securely online through Tithe.ly, in person on
            Sunday, or by mail.
          </Typography>
        </Box>
        <Box sx={{ flex: '1 1 260px', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: { md: 'flex-end' } }}>
          <PillButton href={online_giving.giving_path} tone="white">
            Give Online
          </PillButton>
          <PillButton href="/giving" tone="ghost">
            Other Ways to Give
          </PillButton>
        </Box>
      </Box>
    </Box>
  );
};

export default GivingBand;
