import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import axios from 'axios';
import { Fragment } from 'react';
import DynamicHead from '../../components/DynamicHead/DynamicHead';
import { useStaffConfig } from '../../constants/app-config/app-config-hooks';
import BioBlock, { BioBlockSkeleton } from '../../components/shared/BioBlock';
import appConfig from '../../constants/app-config/config.json';

export type StaffPerson = {
  firstName: string;
  lastName: string;
  imgURL: string;
  positionTitle: string;
  description: string;
};

type StaffProps = {
  staff: StaffPerson[];
};

export const Staff = (props: StaffProps) => {
  const { staff } = props;
  const placeholders = new Array(2).fill(null);
  const { header_text } = useStaffConfig();
  const isMediumView = useMediaQuery(useTheme().breakpoints.up('md'));

  return (
    <Fragment>
      <DynamicHead title={'Staff'} description="Staff page" />
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
  const res = await axios.get(appConfig.website.staff.routes.get_all_staff);
  const staff = res.data.staff;

  return {
    props: {
      staff,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 1 hour
    revalidate: 3600, // In seconds
  };
}

export default Staff;
