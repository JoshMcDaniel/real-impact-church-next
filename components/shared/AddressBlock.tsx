import { Box, Divider, Typography } from '@mui/material';
import { useOrganizationConfig } from '../../constants/app-config/app-config-hooks';
import NavToLocationBtn from './NavToLocationBtn';

export const AddressBlock = () => {
  const { full_address } = useOrganizationConfig().contact;
  return (
    <Box
      component="section"
      padding="1rem"
      display="grid"
      gap="1rem"
      justifyContent="center"
      textAlign="center"
    >
      <Typography variant="h4">Address</Typography>
      <Typography>{full_address}</Typography>
      <Divider />
      <NavToLocationBtn label={'Take me to church!'} />
    </Box>
  );
};

export default AddressBlock;
