import { Typography } from '@mui/material';
import * as React from 'react';
import { useAuthorConfig } from '../../constants/app-config/app-config-hooks';

export const WebsiteAuthor = (props: { color: string }) => {
  const { full_name } = useAuthorConfig();
  return (
    <Typography variant="caption" color={props.color}>
      Developed by {full_name}
    </Typography>
  );
};

export default WebsiteAuthor;
