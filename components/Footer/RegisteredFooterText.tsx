import { Typography } from '@mui/material';
import * as React from 'react';
import { useOrganizationConfig } from '../../constants/app-config/app-config-hooks';

export const RegisteredFooterText = (props: { color: string }) => {
  const { registration_year, full_name } = useOrganizationConfig();
  return (
    <Typography variant="caption" color={props.color}>
      &reg; {registration_year} {full_name}
    </Typography>
  );
};
