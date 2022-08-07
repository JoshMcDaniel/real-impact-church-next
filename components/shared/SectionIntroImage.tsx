import { Box, Container, Typography } from '@mui/material';
import FixedBackgroundImage from './FixedBackgroundImage';

type SectionIntroImageProps = {
  imagePath: string;
  primaryText: string;
  subText: string;
};

export const SectionIntroImage = (props: SectionIntroImageProps) => {
  const centerStyle = {
    display: 'grid',
    justifyContent: 'center',
  };
  const height = '50vh';

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        display: 'grid',
        justifyContent: 'center',
        alignContent: 'center',
        color: '#FFFFFF',
      }}
      height={height}
    >
      <FixedBackgroundImage
        imgPath={props.imagePath}
        height="100%"
        width="100%"
      />
      <Container>
        <Typography
          variant="h4"
          component="h1"
          display={{ xs: 'block', md: 'none' }}
        >
          {props.primaryText}
        </Typography>
        <Typography
          variant="h3"
          component="h1"
          display={{ xs: 'none', md: 'block' }}
        >
          {props.primaryText}
        </Typography>
      </Container>
      <Container style={centerStyle}>
        <Typography
          variant="subtitle1"
          component="p"
          textAlign="center"
          display={{ xs: 'block', md: 'none' }}
        >
          {props.subText}
        </Typography>
        <Typography
          variant="h5"
          component="p"
          textAlign="center"
          display={{ xs: 'none', md: 'block' }}
        >
          {props.subText}
        </Typography>
      </Container>
    </Box>
  );
};

export default SectionIntroImage;
