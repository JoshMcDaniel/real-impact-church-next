import { Box, Paper } from '@mui/material';
import { NextPage } from 'next';
import DynamicHead from '../../components/DynamicHead/DynamicHead';
import OnlineGiving from '../../components/Giving/OnlineGiving';
import OtherGiving from '../../components/Giving/OtherGiving';
import SectionIntroImage from '../../components/shared/SectionIntroImage';
import { useGivingConfig } from '../../constants/app-config/app-config-hooks';

export const Giving: NextPage = () => {
  const { intro_section, online_giving } = useGivingConfig();
  const introImage = intro_section.images.intro_image;
  const introText = intro_section.text;

  return (
    <Box>
      <DynamicHead title={'Giving'} description="Giving page" />

      <SectionIntroImage
        imagePath={introImage?.path}
        primaryText={introText?.primary}
        subText={introText?.sub}
      />
      <Box display="grid" gap="2rem">
        <Paper
          sx={{
            width: '100%',
            padding: '2rem 1rem',
          }}
        >
          <OnlineGiving
            description={online_giving.description}
            furtherInfo={online_giving.further_info}
            givingPath={online_giving.giving_path}
          />
        </Paper>
        <Box
          sx={{
            width: '100%',
            padding: '2rem 1rem',
          }}
        >
          <OtherGiving />
        </Box>
      </Box>
    </Box>
  );
};

export default Giving;
