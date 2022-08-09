import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import ArrowLink from './ArrowLink';

export type NavTileProps = {
  title: string;
  summary: string;
  route: string;
  link_text: string;
};

export const NavTile = (props: NavTileProps) => {
  return (
    <Box display="grid" gap="1rem" gridAutoFlow="row" maxWidth={300}>
      <Typography variant="h5" fontWeight="bolder">
        {props.title}
      </Typography>
      <Typography>{props.summary}</Typography>
      <ArrowLink route={props.route} linkText={props.link_text} />
    </Box>
  );
};

export default NavTile;
