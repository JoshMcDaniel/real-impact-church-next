import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import DynamicHead from '../../components/DynamicHead/DynamicHead';
import { useStaffConfig } from '../../constants/app-config/app-config-hooks';
import BioBlock, { BioBlockSkeleton } from '../../components/shared/BioBlock';

export const Staff = () => {
  const placeholders = new Array(2).fill(null);
  const [staff, setStaff] = useState([]);

  const { routes, header_text } = useStaffConfig();
  const isMediumView = useMediaQuery(useTheme().breakpoints.up('md'));

  useEffect(() => {
    if (!staff.length) {
      getAllStaff();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllStaff = () => {
    axios.get(routes.get_all_staff).then((res) => {
      setStaff(res.data);
    });
  };

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

export default Staff;
