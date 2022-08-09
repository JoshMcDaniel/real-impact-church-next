import { CircularProgress, Stack, Typography } from '@mui/material';

type LoadingIndicationProps = {
  loadingText?: string;
  size?: string;
};

export const LoadingIndication = (props: LoadingIndicationProps) => {
  return (
    <Stack
      spacing={2}
      direction="row"
      sx={{
        display: 'grid',
        gap: '2rem',
        position: 'absolute',
        top: '33%;',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        justifyItems: 'center',
        textAlign: 'center',
        width: 'fit-content',
      }}
    >
      <Typography variant={'h5'}>{props?.loadingText}</Typography>
      <CircularProgress size={props?.size || '5rem'} color="secondary" />
    </Stack>
  );
};

export default LoadingIndication;
