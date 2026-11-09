import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PortableText, PortableTextBlock, PortableTextComponents } from 'next-sanity';
import { brand } from '../../constants/brand';

/** Site styles for rich text entered in Sanity (paragraphs, bold, links). */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <Typography component="p" sx={{ m: 0, fontSize: 17, lineHeight: 1.8 }}>
        {children}
      </Typography>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <Box component="a" href={value?.href} rel="noopener" sx={{ color: brand.red, fontWeight: 700 }}>
        {children}
      </Box>
    ),
  },
};

export const RichText = ({ value, gap = 2.5 }: { value: PortableTextBlock[]; gap?: number }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap }}>
    <PortableText value={value} components={components} />
  </Box>
);

export default RichText;
