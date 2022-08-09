import { Box, Icon, Link } from '@mui/material';
import React from 'react';

type Props = {
  route: string;
  linkText: string;
  openInNewTab?: boolean;
};

const ArrowLink = (props: Props) => {
  return (
    <Box display="grid" gap="0.5rem" gridAutoFlow="column" width="fit-content">
      <Link
        href={props.route}
        target={props.openInNewTab ? '_blank' : ''}
        color="secondary"
        fontWeight="bold"
      >
        {props.linkText}
      </Link>
      <Icon color="secondary">arrow_forward</Icon>
    </Box>
  );
};

export default ArrowLink;
