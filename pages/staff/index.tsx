import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Fragment } from 'react';
import DynamicHead from '../../components/DynamicHead/DynamicHead';
import { useStaffConfig } from '../../constants/app-config/app-config-hooks';
import BioBlock, { BioBlockSkeleton } from '../../components/shared/BioBlock';
import { sanityFetch } from '../../src/sanity/lib/client';
import { groq } from 'next-sanity';
import { ArraySchemaType, BlockSchemaType, Image } from 'sanity';

export type StaffPerson = {
  name: string;
  image: Image;
  position: string;
  description: ArraySchemaType<BlockSchemaType>;
  displayOrder: number;
};

type StaffProps = {
  staff: StaffPerson[];
};

export const Staff = (props: StaffProps) => {
  const { staff } = props;
  const placeholders = new Array(2).fill(null);
  const { header_text, header } = useStaffConfig();
  const isMediumView = useMediaQuery(useTheme().breakpoints.up('md'));

  return (
    <Fragment>
      <DynamicHead title={header.title} description={header.description} />
      <Box
        component="main"
        className="center-container"
        gap="2rem"
        padding={isMediumView ? '2rem' : '1rem'}
      >
        <Typography variant="h4" component="h1" fontWeight="bolder">
          {header_text}
        </Typography>
        {staff.length > 0
          ? staff.map((person, index) => (
              <BioBlock key={index} person={person} />
            ))
          : placeholders.map((_, index) => <BioBlockSkeleton key={index} />)}
      </Box>
    </Fragment>
  );
};

// This function gets called at build time on server-side.
export async function getStaticProps() {
  // const res = await axios.get(appConfig.website.staff.routes.get_all_staff);
  // const staff = res.data.staff;
  const staff: StaffPerson[] = await sanityFetch({
    query: groq`*[_type == "staff"] {
    _id,
    name,
    position,
    image,
    description,
    displayOrder
    }`,
    tags: ['staff'],
  });

  staff.sort((a, b) => a.displayOrder - b.displayOrder);

  return {
    props: {
      staff,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 1 minute
    revalidate: 60, // In seconds
  };
}

export default Staff;
