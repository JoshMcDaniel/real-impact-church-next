import Box from '@mui/material/Box';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useGivingConfig } from '../../constants/app-config/app-config-hooks';
import DarkCtaCard from '../shared/DarkCtaCard';
import PillButton from '../shared/PillButton';

/** Home page giving call to action (dark card; Give Online stays red). */
export const GivingBand = () => {
  const { online_giving } = useGivingConfig();

  // Pull up so the gap after the tiles above matches normal section spacing.
  return (
    <Box sx={{ mt: { xs: -8, md: -11.25 } }}>
    <DarkCtaCard
      sectionId="give"
      id="give-title"
      label="Giving"
      title="Make a real impact through giving."
      text="Thank you for supporting our church and its ministries. Give securely online through Tithe.ly, in person on Sunday, or by mail."
      actions={
        <>
          <PillButton
            href={online_giving.giving_path}
            target="_blank"
            startIcon={<FavoriteBorderIcon />}
            aria-label="Give online through Tithe.ly (opens in a new tab)"
            sx={{ minHeight: 52 }}
          >
            Give Online
          </PillButton>
          <PillButton href="/giving" tone="ghost" sx={{ minHeight: 52 }}>
            Other Ways to Give
          </PillButton>
        </>
      }
    />
    </Box>
  );
};

export default GivingBand;
