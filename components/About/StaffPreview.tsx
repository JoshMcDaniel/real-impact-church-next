import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Image from 'next/image';
import { brand, contentMaxWidth } from '../../constants/brand';
import { useAboutConfig } from '../../constants/app-config/app-config-hooks';
import { urlFor } from '../../src/sanity/lib/image';
import PillButton from '../shared/PillButton';
import SectionHeader from '../shared/SectionHeader';
import type { Image as SanityImage } from 'sanity';

export type StaffPreviewPerson = {
  _id: string;
  name: string;
  position: string;
  image?: SanityImage | null;
};

type StaffPreviewProps = { staff: StaffPreviewPerson[] };

/** First few staff members from Sanity, linking to the full Staff page. */
export const StaffPreview = ({ staff }: StaffPreviewProps) => {
  const { staff_preview } = useAboutConfig();
  if (staff.length === 0) return null;

  return (
    <Box component="section" aria-labelledby="staff-title" sx={{ backgroundColor: brand.mist, px: 3, py: { xs: 9, md: 12.5 } }}>
      <Box sx={{ maxWidth: contentMaxWidth, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 5.5 }}>
        <SectionHeader
          id="staff-title"
          eyebrow="Our staff"
          eyebrowTone="dark"
          title={staff_preview.title}
          aside={
            <PillButton href="/staff" tone="dark">
              Meet the Staff
            </PillButton>
          }
        />
        <Box
          component="ul"
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, max(220px, calc((100% - 72px) / 4))), 1fr))',
            gap: 3,
          }}
        >
          {staff.map((person) => (
            <Box
              component="li"
              key={person._id}
              sx={{ backgroundColor: brand.white, borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            >
              <Box
                sx={{
                  position: 'relative',
                  aspectRatio: '1 / 1',
                  backgroundColor: '#dfe6ea',
                  color: '#8a9297',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {person.image?.asset ? (
                  <Image
                    src={urlFor(person.image).width(600).height(600).fit('crop').url()}
                    alt={`${person.name}, ${person.position}`}
                    fill
                    sizes="(max-width: 600px) 100vw, 300px"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <PersonOutlineIcon aria-hidden sx={{ fontSize: 56 }} />
                )}
              </Box>
              <Box sx={{ p: '20px 22px 24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <Typography component="h3" sx={{ m: 0, fontSize: 18, fontWeight: 800, color: brand.charcoal }}>
                  {person.name}
                </Typography>
                <Typography component="p" sx={{ m: 0, fontSize: 14, fontWeight: 600, color: brand.red }}>
                  {person.position}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default StaffPreview;
