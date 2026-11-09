import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import type { PortableTextBlock } from 'next-sanity';
import Image from 'next/image';
import type { Image as SanityImage } from 'sanity';
import { brand } from '../../constants/brand';
import { urlFor } from '../../src/sanity/lib/image';
import PillLabel from '../shared/PillLabel';
import RichText from '../shared/RichText';

export type StaffPerson = {
  _id: string;
  name: string;
  position?: string | null;
  image?: SanityImage | null;
  description?: PortableTextBlock[] | null;
};

type StaffCardProps = {
  person: StaffPerson;
  /** Puts the photo on the right on wide screens (alternating layout). */
  reverse?: boolean;
};

/** Large staff bio card: framed photo, position pill, name and bio. */
export const StaffCard = ({ person, reverse = false }: StaffCardProps) => (
  <Box
    component="article"
    aria-labelledby={`staff-${person._id}`}
    sx={{
      backgroundColor: brand.white,
      border: `1px solid ${brand.line}`,
      borderRadius: '28px',
      p: 'clamp(20px, 3vw, 32px)',
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: reverse ? 'row-reverse' : 'row',
      gap: 'clamp(24px, 4vw, 48px)',
      alignItems: 'center',
      boxShadow: '0 10px 30px rgba(43,43,43,.06)',
    }}
  >
    <Box sx={{ flex: '0 1 300px', minWidth: 0, mx: 'auto' }}>
      <Box
        sx={{
          position: 'relative',
          aspectRatio: '1 / 1',
          width: '100%',
          maxWidth: 300,
          borderRadius: '22px',
          overflow: 'hidden',
          backgroundColor: '#dfe6ea',
          color: '#8a9297',
          border: `3px solid ${brand.white}`,
          boxShadow: '0 18px 40px rgba(43,43,43,.18)',
          transform: `rotate(${reverse ? '-1.5deg' : '1.5deg'})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {person.image?.asset ? (
          <Image
            src={urlFor(person.image).width(600).height(600).fit('crop').auto('format').url()}
            alt={person.name}
            fill
            sizes="300px"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <PersonOutlineIcon aria-hidden sx={{ fontSize: 72 }} />
        )}
      </Box>
    </Box>
    <Box sx={{ flex: '1 1 420px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {person.position && <PillLabel>{person.position}</PillLabel>}
      <Typography id={`staff-${person._id}`} component="h2" sx={{ m: 0, fontSize: 'clamp(28px, 3vw, 38px)', fontWeight: 800, color: brand.charcoal, lineHeight: 1.1 }}>
        {person.name}
      </Typography>
      {person.description && person.description.length > 0 && <RichText value={person.description} gap={2} />}
    </Box>
  </Box>
);

export default StaffCard;
