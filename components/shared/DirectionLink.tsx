import { Send } from '@mui/icons-material';
import { Link, Typography } from '@mui/material';

const DirectionLink = (props: { href: string; text?: string }) => {
  const { href, text = props.text ? props.text : 'Directions' } = props;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      underline="none"
      sx={{
        display: 'grid',
        gridAutoFlow: 'row',
        rowGap: '5px',
        justifyItems: 'center',
      }}
    >
      <Send />
      <Typography color="secondary" variant="caption" fontSize="75%">
        {text}
      </Typography>
    </Link>
  );
};

export default DirectionLink;
