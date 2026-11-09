import Box from '@mui/material/Box';
import { Fragment } from 'react';
import { brand } from '../../constants/brand';

const URL_PATTERN = /(https?:\/\/[^\s<]+[^\s<.,;:!?)\]'"])/g;

/** Plain text (e.g. a YouTube description) with line breaks kept and URLs made clickable. */
export const LinkifiedText = ({ text }: { text: string }) => (
  <>
    {text.split(URL_PATTERN).map((part, index) =>
      index % 2 === 1 ? (
        <Box
          key={index}
          component="a"
          href={part}
          target="_blank"
          rel="noopener nofollow"
          sx={{ color: brand.red, fontWeight: 700, wordBreak: 'break-all' }}
        >
          {part.replace(/^https?:\/\/(www\.)?/, '')}
        </Box>
      ) : (
        <Fragment key={index}>{part}</Fragment>
      )
    )}
  </>
);

export default LinkifiedText;
