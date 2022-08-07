import {
  Box,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Paper,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import DynamicHead from '../components/DynamicHead/DynamicHead';
import { ScheduleSummary } from '../components/Home/ScheduleSummary';
import AddressBlock from '../components/shared/AddressBlock';
import SectionIntroImage from '../components/shared/SectionIntroImage';
import { useHomeConfig } from '../constants/app-config/app-config-hooks';
import styles from '../styles/Home.module.css';

type HomeSummaryItem = {
  image: {
    path: string;
    description: string;
  };
  info_text: {
    title: string;
    subtitle: string;
  };
  nav_to_route: string;
};

const Home: NextPage = () => {
  const homeConfig = useHomeConfig();
  const items: HomeSummaryItem[] = homeConfig.home_summary_items;
  const primaryText = homeConfig.intro_section.text.primary;
  const subText = homeConfig.intro_section.text.sub;
  const imagePath = homeConfig.intro_section.images.intro_image.path;
  const isMediumView = useMediaQuery(useTheme().breakpoints.up('md'));

  return (
    <Box>
      <DynamicHead description="Home page" />

      <Box>
        <SectionIntroImage
          imagePath={imagePath}
          primaryText={primaryText}
          subText={subText}
        />
        <Container
          sx={{
            display: 'grid',
            gridTemplateColumns: isMediumView ? '1fr 2fr' : '1fr',
            paddingTop: '24px',
            paddingBottom: '24px',
            gap: '2rem',
            justifyItems: 'center',
          }}
        >
          <Stack component="main" spacing={1} maxWidth="400px">
            <Paper>
              <AddressBlock />
            </Paper>
            <ScheduleSummary />
          </Stack>
          <ImageList
            cols={isMediumView ? 2 : 1}
            rowHeight={250}
            gap={32}
            sx={{
              padding: '0',
              margin: '0',
              maxWidth: isMediumView ? '800px' : '400px',
              width: '100%',
              height: 'fit-content',
            }}
          >
            {items.map((item, index) => (
              <Box boxShadow={3} key={index}>
                <Link href={item.nav_to_route}>
                  <ImageListItem className="full-img-height-container">
                    <Image
                      src={item.image.path}
                      alt={item.image.description}
                      layout="fill"
                      priority={true}
                    />
                    <ImageListItemBar
                      title={item.info_text.title}
                      subtitle={item.info_text.subtitle}
                    />
                  </ImageListItem>
                </Link>
              </Box>
            ))}
          </ImageList>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
