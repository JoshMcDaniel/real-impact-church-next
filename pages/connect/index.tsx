import Box from '@mui/material/Box';
import GlowLayer from '../../components/shared/GlowLayer';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import axios from 'axios';
import { GetStaticProps } from 'next';
import { groq } from 'next-sanity';
import { ReactNode, useState } from 'react';
import ConnectMainForm, { ConnectMainFormContent } from '../../components/Connect/ConnectMainForm';
import DynamicHead from '../../components/DynamicHead/DynamicHead';
import CommonSnackbar, { CommonSnackbarState, initialCommonSnackbarState } from '../../components/shared/CommonSnackbar';
import PageHero from '../../components/shared/PageHero';
import PillButton from '../../components/shared/PillButton';
import PillLabel from '../../components/shared/PillLabel';
import {
  useConnectConfig,
  useMediaConfig,
  useOrganizationConfig,
} from '../../constants/app-config/app-config-hooks';
import { brand, contentMaxWidth } from '../../constants/brand';
import { Service } from '../../constants/Service';
import { breadcrumbJsonLd } from '../../constants/structured-data';
import { getPrimaryService, getSundayMorning, shortScheduleLabel } from '../../constants/sunday-schedule';
import { sanityFetch } from '../../src/sanity/lib/client';

const connectReasons = [
  {
    icon: <GroupsOutlinedIcon />,
    title: 'Join our family',
    description: 'Experience genuine community with people who will love, encourage, and walk alongside you.',
  },
  {
    icon: <FavoriteBorderIcon />,
    title: 'Let us pray for you',
    description: 'Share what’s on your heart and let our church family lift you up in prayer.',
  },
  {
    icon: <MenuBookOutlinedIcon />,
    title: 'Grow in your faith',
    description: 'Discover Bible studies, small groups, and resources to help you go deeper in your walk with God.',
  },
  {
    icon: <VolunteerActivismOutlinedIcon />,
    title: 'Make a real impact',
    description: 'Find your place to serve and use your gifts to make a difference in our community and beyond.',
  },
];

const socialLabels: Record<string, string> = { FACEBOOK: 'Facebook', INSTAGRAM: 'Instagram', YOUTUBE: 'YouTube' };

const IconTile = ({ children, size = 48 }: { children: ReactNode; size?: number }) => (
  <Box
    aria-hidden
    sx={{
      flex: 'none',
      width: size,
      height: size,
      borderRadius: size > 50 ? '16px' : '14px',
      backgroundColor: brand.redTint,
      color: brand.red,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {children}
  </Box>
);

const cardSx = {
  backgroundColor: brand.white,
  border: `1px solid ${brand.line}`,
  borderRadius: '24px',
};

type ConnectProps = { services: Service[] };

export const Connect = ({ services }: ConnectProps) => {
  const { snackbar, header, hero } = useConnectConfig();
  const org = useOrganizationConfig();
  const { social_media } = useMediaConfig();
  const sundayMorning = getSundayMorning(getPrimaryService(services));
  const { contact } = org;

  const [requestPending, setRequestPending] = useState(false);
  const [snackbarState, setSnackbarState] = useState<CommonSnackbarState>(initialCommonSnackbarState);

  /** Sends the form; resolves true on success so the form can clear itself. */
  const handleOnSubmit = async (form: ConnectMainFormContent): Promise<boolean> => {
    if (requestPending) return false;
    setRequestPending(true);
    try {
      await axios.post('/api/connect', form);
      setSnackbarState({ open: true, success: true, message: snackbar.success_message });
      return true;
    } catch {
      setSnackbarState({ open: true, success: false, message: snackbar.fail_message });
      return false;
    } finally {
      setRequestPending(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: brand.paper, color: brand.text }}>
      <DynamicHead
        fullTitle={header.title}
        description={header.description}
        image={hero.image.path}
        imageAlt={hero.image.description}
        jsonLd={[breadcrumbJsonLd([{ name: 'Connect', path: '/connect' }])]}
      />
      <Box component="main">
        <PageHero eyebrow={hero.eyebrow} title={hero.title} text={hero.text} image={hero.image} overlay={0.6} />

        {/* Form + Why connect. Form comes first on phones (wrap-reverse). */}
        <Box
          component="section"
          aria-label="Connect with us"
          sx={{
            maxWidth: contentMaxWidth,
            mx: 'auto',
            px: 3,
            pt: { xs: 7, md: 9 },
            pb: { xs: 8, md: 11.25 },
            display: 'flex',
            flexWrap: 'wrap-reverse',
            gap: 5,
            alignItems: 'flex-start',
          }}
        >
          <Box sx={{ flex: '1 1 340px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <PillLabel tone="dark">Why connect?</PillLabel>
              <Typography component="h2" sx={{ m: 0, fontSize: 'clamp(28px, 3vw, 38px)', fontWeight: 800, color: brand.charcoal, lineHeight: 1.12 }}>
                There’s a place for you here.
              </Typography>
            </Box>
            <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {connectReasons.map((reason) => (
                <Box component="li" key={reason.title} sx={{ ...cardSx, borderRadius: '20px', p: '20px', display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <IconTile>{reason.icon}</IconTile>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <Typography component="h3" sx={{ m: 0, fontSize: 17, fontWeight: 800, color: brand.charcoal }}>
                      {reason.title}
                    </Typography>
                    <Typography component="p" sx={{ m: 0, fontSize: 15, lineHeight: 1.65 }}>
                      {reason.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              flex: '1.4 1 480px',
              minWidth: 0,
              position: 'relative',
              backgroundColor: brand.footer,
              color: brand.white,
              borderRadius: '28px',
              p: 'clamp(24px, 4vw, 48px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '22px',
              boxShadow: '0 24px 60px rgba(20,20,20,.18)',
            }}
          >
            <GlowLayer glows={[{ right: -120, top: -140, size: 380, opacity: 0.18 }]} />
            <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <PillLabel>Get in touch</PillLabel>
              <Typography component="h2" sx={{ m: 0, fontSize: 'clamp(28px, 3.2vw, 40px)', fontWeight: 800, lineHeight: 1.1 }}>
                Send us a message
              </Typography>
              <Typography component="p" sx={{ m: 0, fontSize: 15, lineHeight: 1.6, color: '#d6dadd' }}>
                We’ll reach out to you soon after you submit.
              </Typography>
            </Box>
            <Box sx={{ position: 'relative' }}>
              <ConnectMainForm onSubmit={handleOnSubmit} disabled={requestPending} />
            </Box>
          </Box>
        </Box>

        {/* Other ways to connect */}
        <Box component="section" aria-labelledby="other-title" sx={{ backgroundColor: brand.mist, px: 3, py: { xs: 8, md: 11.25 } }}>
          <Box sx={{ maxWidth: contentMaxWidth, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <PillLabel>Other ways to connect</PillLabel>
              <Typography id="other-title" component="h2" sx={{ m: 0, fontSize: 'clamp(30px, 3.4vw, 44px)', fontWeight: 800, color: brand.charcoal, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
                Come by, write, or follow along
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'grid',
                // At most two columns: Visit spans both rows on the left, Email and Follow stack on the right.
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, max(360px, calc((100% - 24px) / 2))), 1fr))',
                gap: 3,
              }}
            >
              <Box component="article" sx={{ ...cardSx, gridRow: 'span 2', p: 4, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <IconTile size={52}>
                  <PlaceOutlinedIcon />
                </IconTile>
                <Typography component="h3" sx={{ m: 0, fontSize: 21, fontWeight: 800, color: brand.charcoal }}>
                  Visit on Sunday
                </Typography>
                <Box component="address" sx={{ fontStyle: 'normal', fontSize: 15, lineHeight: 1.6 }}>
                  {contact.street}
                  <br />
                  {contact.city}, {contact.state} {contact.zip_code}
                </Box>
                <Box component="ul" aria-label="Sunday schedule" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {sundayMorning.map((item) => {
                    const highlight = item.key === 'worship';
                    return (
                      <Box
                        component="li"
                        key={item.key}
                        sx={{
                          backgroundColor: highlight ? brand.red : brand.mist,
                          color: highlight ? brand.white : brand.charcoal,
                          borderRadius: '999px',
                          px: '12px',
                          py: '6px',
                          fontSize: 13,
                          fontWeight: highlight ? 800 : 700,
                        }}
                      >
                        {shortScheduleLabel(item)}
                      </Box>
                    );
                  })}
                </Box>
                <Box
                  component="a"
                  href={contact.google_maps_link}
                  rel="noopener"
                  sx={{ mt: 'auto', color: brand.red, fontWeight: 700, fontSize: 15, minHeight: 32, display: 'inline-flex', alignItems: 'center', width: 'fit-content' }}
                >
                  Get directions →
                </Box>
              </Box>

              <Box component="article" sx={{ ...cardSx, p: '24px 28px', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: '16px 20px' }}>
                <IconTile size={52}>
                  <MailOutlineIcon />
                </IconTile>
                <Box sx={{ flex: '1 1 220px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <Typography component="h3" sx={{ m: 0, fontSize: 21, fontWeight: 800, color: brand.charcoal }}>
                    Email us
                  </Typography>
                  <Typography component="p" sx={{ m: 0, fontSize: 15, lineHeight: 1.6 }}>
                    Prefer email? Write to us anytime.
                  </Typography>
                  <Box
                    component="a"
                    href={`mailto:${contact.email.primary}`}
                    sx={{ color: brand.red, fontWeight: 700, fontSize: 16, wordBreak: 'break-all', minHeight: 32, display: 'inline-flex', alignItems: 'center' }}
                  >
                    {contact.email.primary}
                  </Box>
                </Box>
              </Box>

              <Box component="article" sx={{ ...cardSx, p: '24px 28px', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: '16px 20px' }}>
                <IconTile size={52}>
                  <ShareOutlinedIcon />
                </IconTile>
                <Box sx={{ flex: '1 1 220px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <Typography component="h3" sx={{ m: 0, fontSize: 21, fontWeight: 800, color: brand.charcoal }}>
                    Follow along
                  </Typography>
                  <Typography component="p" sx={{ m: 0, fontSize: 15, lineHeight: 1.6 }}>
                    Announcements, events and photos from our church family.
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', pt: '6px' }}>
                    {social_media.map((s) => (
                      <PillButton key={s.platform} href={s.path} tone="outline" size="small">
                        {socialLabels[s.platform] ?? s.platform}
                      </PillButton>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <CommonSnackbar
        open={snackbarState.open}
        onClose={() => setSnackbarState(initialCommonSnackbarState)}
        message={snackbarState.message}
        severity={snackbarState.success ? 'success' : 'error'}
      />
    </Box>
  );
};

export const getStaticProps: GetStaticProps<ConnectProps> = async () => {
  const services = await sanityFetch<Service[]>({
    query: groq`*[_type == "service"] | order(displayOrder asc) { title, dayOfWeek, time, description }`,
    tags: ['service'],
  });
  return { props: { services: services ?? [] }, revalidate: 3600 };
};

export default Connect;
