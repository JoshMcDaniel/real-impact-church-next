import {
  Avatar,
  Box,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { StaffPerson } from '../../pages/staff';

const bioBlockConfig = {
  avatar: {
    maxHeight: '300px',
    maxWidth: '300px',
    justifySelf: 'center',
  },
};

export const BioBlockSkeleton = () => {
  const isMediumView = useMediaQuery(useTheme().breakpoints.up('md'));

  return (
    <Box
      component="section"
      display="grid"
      gridTemplateColumns={isMediumView ? '300px 1fr' : '1fr'}
      gridTemplateRows={isMediumView ? '1fr' : '300px 1fr'}
      height={isMediumView ? '300px' : 'auto'}
    >
      <Skeleton
        variant="circular"
        sx={{
          justifySelf: bioBlockConfig.avatar.justifySelf,
          maxHeight: bioBlockConfig.avatar.maxHeight,
          maxWidth: bioBlockConfig.avatar.maxWidth,
          height: '100%',
          width: '100%',
        }}
      />
      <Box
        padding={isMediumView ? '2rem' : '1rem'}
        display="grid"
        gap="1rem"
        height="fit-content"
      >
        <Skeleton height="2rem" />
        <Skeleton height="1.5rem" />
        <Skeleton height="8rem" />
      </Box>
    </Box>
  );
};

type BioBlocProps = {
  person: StaffPerson;
};

export const BioBlock = (props: BioBlocProps) => {
  const isMediumView = useMediaQuery(useTheme().breakpoints.up('md'));
  const avatarProps = {
    ...bioBlockConfig.avatar,
    alt: `${props.person.firstName} ${props.person.lastName}`,
    src: props.person.imgURL,
  };

  return (
    <Box
      component="section"
      display="grid"
      gridTemplateColumns={isMediumView ? '300px 1fr' : '1fr'}
      gridTemplateRows={isMediumView ? '1fr' : '300px 1fr'}
      height={isMediumView ? '300px' : 'auto'}
    >
      <Avatar
        alt={avatarProps.alt}
        src={avatarProps.src}
        sx={{
          display: 'grid',
          justifySelf: avatarProps.justifySelf,
          maxHeight: avatarProps.maxHeight,
          maxWidth: avatarProps.maxWidth,
          width: '100%',
          height: '100%',
        }}
      />
      <Box padding={isMediumView ? '2rem' : '2rem 1rem'}>
        <Typography
          variant="h5"
          fontWeight="bold"
        >{`${props.person.firstName} ${props.person.lastName}`}</Typography>
        <Typography variant="subtitle1">
          {props.person.positionTitle}
        </Typography>
        <Typography>{props.person.description}</Typography>
      </Box>
    </Box>
  );
};

export default BioBlock;
