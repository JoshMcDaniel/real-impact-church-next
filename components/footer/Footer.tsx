import { Container, Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import styles from '../../styles/Footer.module.css';
import {
  useMediaConfig,
  useOrganizationConfig,
} from '../../constants/app-config/app-config-hooks';
import { TitleLogoImage } from '../shared/TitleLogoImage';
import SocialIcons from '../shared/SocialIcons';
import { RegisteredFooterText } from './RegisteredFooterText';
import WebsiteAuthor from '../shared/WebsiteAuthor';

export const Footer = () => {
  const { social_media } = useMediaConfig();
  const { email, full_address } = useOrganizationConfig().contact;

  return (
    <Container
      maxWidth={false}
      component="footer"
      className={styles.footerContainer}
      sx={{
        display: 'grid',
        rowGap: '1rem',
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: 'grid',
          gridAutoFlow: {
            sm: 'row',
            md: 'column',
          },
          rowGap: {
            sm: '1rem',
            md: '0',
          },
          justifyContent: {
            sm: 'start',
            md: 'space-evenly',
          },
        }}
      >
        <Box padding="0 1rem">
          <TitleLogoImage />
        </Box>
        <Container>
          <Typography variant="body1" color="secondary">
            Follow Us
          </Typography>
          <SocialIcons platforms={social_media} />
        </Container>
        <Container
          sx={{
            display: 'grid',
            rowGap: '0.5rem',
          }}
        >
          <Typography variant="body1" color="secondary">
            Contact Us
          </Typography>
          <Typography variant="body2" color={'white'}>
            {email.primary}
          </Typography>
          <Typography variant="body2" color={'white'}>
            {full_address}
          </Typography>
        </Container>
      </Box>
      <Container
        sx={{
          display: 'grid',
          gridAutoFlow: { sm: 'row', md: 'column' },
          rowGap: '0.5rem',
          columnGap: '0.5rem',
          width: { sm: '100%', md: 'fit-content' },
        }}
      >
        <RegisteredFooterText color={'white'} />
        <Divider
          orientation="vertical"
          style={{ background: 'white' }}
          sx={{
            display: { sm: 'none', md: 'flex' },
            width: '1px',
          }}
        />
        <Divider
          orientation="horizontal"
          variant="fullWidth"
          style={{ background: 'white' }}
          sx={{
            display: { sm: 'flex', md: 'none' },
          }}
        />
        <WebsiteAuthor color={'white'} />
      </Container>
    </Container>
  );
};
