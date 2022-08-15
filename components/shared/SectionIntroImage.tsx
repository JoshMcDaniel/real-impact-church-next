import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import FixedBackgroundImage from './FixedBackgroundImage';

type SectionIntroImageProps = {
  imagePath: string;
  primaryText: string;
  subText: string;
};

export const SectionIntroImage = (props: SectionIntroImageProps) => {
  const isMediumView = useMediaQuery(useTheme().breakpoints.up('md'));

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        display: 'grid',
        justifyContent: 'center',
        alignContent: 'center',
        color: '#FFFFFF',
        height: '50vh',
        textAlign: 'center',
      }}
    >
      <FixedBackgroundImage
        imgPath={props.imagePath}
        height="100%"
        width="100%"
      />
      <Box
        sx={{
          maxWidth: '90vw',
        }}
      >
        <Typography variant={isMediumView ? 'h3' : 'h4'} component="h1">
          {props.primaryText}
        </Typography>
        <Typography variant={isMediumView ? 'h5' : 'subtitle1'} component="p">
          {props.subText}
        </Typography>
      </Box>
    </Box>
  );
};

export default SectionIntroImage;
