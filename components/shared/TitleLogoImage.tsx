import { Container } from '@mui/material';
import { useOrganizationConfig } from '../../constants/app-config/app-config-hooks';
import Image from 'next/image';

type TitleLogoImageProps = {
  height: number;
  width: number;
};

export const TitleLogoImage = (props: TitleLogoImageProps) => {
  const { path, description } = useOrganizationConfig().logos.title_logo;

  return (
    <Container
      component="figure"
      sx={{
        display: 'grid',
        alignItems: 'center',
        margin: '0',
        padding: '0',
        width: 'fit-content',
      }}
    >
      <Image
        src={path}
        alt={description}
        height={props.height}
        width={props.width}
      />
    </Container>
  );
};

TitleLogoImage.defaultProps = {
  height: 50,
  width: 150,
};
