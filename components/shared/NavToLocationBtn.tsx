import { Fab } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';
import { useOrganizationConfig } from '../../constants/app-config/app-config-hooks';

type NavToLocationBtnProps = {
  label: string;
};

export const NavToLocationBtn = (props: NavToLocationBtnProps) => {
  const { google_maps_link } = useOrganizationConfig().contact;
  return (
    <Fab
      variant="extended"
      size="medium"
      color="secondary"
      aria-label="Navigation button"
      sx={{
        width: 'fit-content',
        justifySelf: 'center',
      }}
      href={google_maps_link}
    >
      <NavigationIcon sx={{ mr: 1 }} />
      {props.label || "Let's Go!"}
    </Fab>
  );
};

export default NavToLocationBtn;
