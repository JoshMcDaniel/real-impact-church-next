import { Box, Paper, useMediaQuery, useTheme } from '@mui/material';
import React, { Fragment, useState } from 'react';
import AboutDescription, {
  AboutDescriptionContainer,
} from '../../components/About/AboutDescription';
import DynamicHead from '../../components/DynamicHead/DynamicHead';
import NavTile, { NavTileProps } from '../../components/shared/NavTile';
import SectionIntroImage from '../../components/shared/SectionIntroImage';
import { useAboutConfig } from '../../constants/app-config/app-config-hooks';

export const About = () => {
  const aboutConfig = useAboutConfig();
  const aboutDescription: AboutDescriptionContainer =
    aboutConfig.about_description;
  const primaryText = aboutConfig.intro_section.text.primary;
  const subText = aboutConfig.intro_section.text.sub;
  const imagePath = aboutConfig.intro_section.images.intro_image.path;
  const tiles: NavTileProps[] = aboutConfig.nav_tiles.tiles;

  const isMediumView = useMediaQuery(useTheme().breakpoints.up('md'));

  return (
    <Fragment>
      <DynamicHead title={'About'} description="About us page" />
      <Box component="section">
        <SectionIntroImage
          imagePath={imagePath}
          primaryText={primaryText}
          subText={subText}
        />
        <Box
          component={'main'}
          sx={{
            display: 'grid',
            padding: isMediumView ? '2rem 4rem' : '2rem',
            gap: '2rem',
            justifyItems: 'center',
          }}
        >
          <Box display="grid" rowGap="1rem">
            {aboutDescription.descriptions.map((item, index) => (
              <AboutDescription
                key={index}
                title_text={item.title_text}
                description={item.description}
              />
            ))}
          </Box>
        </Box>
        <Paper
          sx={{
            padding: isMediumView ? '2rem' : '2rem 1rem',
            display: 'grid',
            gridAutoFlow: isMediumView ? 'column' : 'row',
            gap: '2rem',
            justifyContent: 'space-evenly',
            width: '100%',
          }}
          component="section"
        >
          {tiles.map((tile, index) => (
            <NavTile
              key={index}
              title={tile.title}
              summary={tile.summary}
              link_text={tile.link_text}
              route={tile.route}
            />
          ))}
        </Paper>
      </Box>
    </Fragment>
  );
};

export default About;
