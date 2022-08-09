import { SlideProps, Slide, Alert, Snackbar, AlertColor } from '@mui/material';

export interface CommonSnackbarState {
  open: boolean;
  success: boolean;
  message: string;
}

export const initialCommonSnackbarState: CommonSnackbarState = {
  open: false,
  success: false,
  message: '',
};

type Props = {
  open: boolean;
  onClose: () => any;
  message: string;
  severity: AlertColor;
};

const CommonSnackbar = (props: Props) => {
  function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
  }

  return (
    <Snackbar
      open={props.open}
      onClose={() => props.onClose()}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      TransitionComponent={SlideTransition}
    >
      <Alert severity={props.severity} variant="filled" sx={{ width: '100%' }}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default CommonSnackbar;
