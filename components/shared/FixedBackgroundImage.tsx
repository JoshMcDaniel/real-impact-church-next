import { Box } from '@mui/material';
import { centerFixedBackgroundImage } from '../../constants/style-generators';

export const fixedBackgroundImageId = 'fixedBackgroundImage';

export type FixedBackgroundImageProps = {
  height: string;
  width: string;
  imgPath?: string;
};

export const FixedBackgroundImage = (props: FixedBackgroundImageProps) => {
  return (
    <Box
      style={centerFixedBackgroundImage(props)}
      sx={{
        backgroundImage: `url(${props.imgPath})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'absolute',
        zIndex: '-1',
      }}
    ></Box>
  );
};

export default FixedBackgroundImage;
