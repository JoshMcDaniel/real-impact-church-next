import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Fragment } from 'react';
import DynamicHead from '../../components/DynamicHead/DynamicHead';
import ChipsArray, { LabelLink } from '../../components/shared/ChipsArray';
import { useBeliefsConfig } from '../../constants/app-config/app-config-hooks';

export type DoctrineBelief = {
  title: string;
  text: string;
  verses: LabelLink[];
};

export type BeliefsDoctrineContainer = {
  title: string;
  beliefs: DoctrineBelief[];
};

export type BeliefsContainer = {
  doctrine: BeliefsDoctrineContainer;
};

export const Beliefs = () => {
  const beliefsConfig: BeliefsContainer = useBeliefsConfig();
  const isMediumView = useMediaQuery(useTheme().breakpoints.up('md'));

  return (
    <Fragment>
      <DynamicHead title={'Beliefs'} description="Beliefs page" />
      <Box
        display="grid"
        gap="2rem"
        padding={isMediumView ? '2rem 6rem' : '2rem'}
      >
        <Typography variant="h4">{beliefsConfig.doctrine.title}</Typography>
        {beliefsConfig.doctrine.beliefs.map((belief, index) => (
          <Box key={index} display="grid" gap="1rem">
            <Typography variant="h5">{belief.title}</Typography>
            <Typography>{belief.text}</Typography>
            <ChipsArray data={belief.verses}></ChipsArray>
          </Box>
        ))}
      </Box>
    </Fragment>
  );
};

export default Beliefs;
