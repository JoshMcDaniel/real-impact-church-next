import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { brand, contentMaxWidth } from '../../constants/brand';
import {
  useHomeConfig,
  useMediaConfig,
  useOrganizationConfig,
} from '../../constants/app-config/app-config-hooks';
import { PLAN_VISIT_HREF } from './SiteHeader';

const socialIcons: Record<string, { icon: ReactNode; label: string }> = {
  FACEBOOK: { icon: <FacebookIcon fontSize="small" />, label: 'Facebook' },
  INSTAGRAM: { icon: <InstagramIcon fontSize="small" />, label: 'Instagram' },
  YOUTUBE: { icon: <YouTubeIcon fontSize="small" />, label: 'YouTube' },
};

const footerLinkSx = {
  color: brand.footerText,
  fontSize: 15,
  textDecoration: 'none',
  width: 'fit-content',
  '&:hover': { color: brand.white },
};

const columnTitleSx = {
  m: '0 0 4px',
  color: brand.white,
  fontWeight: 700,
  fontSize: 14,
  letterSpacing: '.14em',
  textTransform: 'uppercase' as const,
};

const FooterLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <Box component={Link} href={href} sx={footerLinkSx}>
    {children}
  </Box>
);

export const SiteFooter = () => {
  const org = useOrganizationConfig();
  const { social_media } = useMediaConfig();
  const sunday = useHomeConfig().sunday_morning.items;
  const { street, city, state, zip_code, email } = org.contact;

  return (
    <Box
      component="footer"
      sx={{ backgroundColor: brand.footer, color: brand.footerText, px: 3, pt: 9, pb: 4 }}
    >
      <Box
        sx={{
          maxWidth: contentMaxWidth,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
            gap: 5,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  backgroundColor: brand.white,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  flex: 'none',
                }}
              >
                <Image src={org.logos.simple_logo.path} alt="" width={44} height={44} />
              </Box>
              <Typography
                component="p"
                sx={{ m: 0, color: brand.white, fontWeight: 800, fontSize: 18, letterSpacing: '.04em' }}
              >
                {org.full_name.toUpperCase()}
              </Typography>
            </Box>
            <Typography sx={{ m: 0, fontSize: 15, lineHeight: 1.7 }}>
              A local church with a global vision. Know God. Make Him known.
            </Typography>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              {social_media.map((social) => {
                const meta = socialIcons[social.platform];
                if (!meta) return null;
                return (
                  <Box
                    key={social.platform}
                    component="a"
                    href={social.path}
                    rel="noopener"
                    aria-label={`${org.full_name} on ${meta.label}`}
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      border: '1px solid #444',
                      color: brand.white,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&:hover': { backgroundColor: brand.white, color: brand.charcoal },
                    }}
                  >
                    {meta.icon}
                  </Box>
                );
              })}
            </Box>
          </Box>

          <Box component="nav" aria-label="Footer" sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Typography component="p" sx={columnTitleSx}>
              Explore
            </Typography>
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/beliefs">What We Believe</FooterLink>
            <FooterLink href="/staff">Our Staff</FooterLink>
            <FooterLink href="/media">Sermons &amp; Media</FooterLink>
            <FooterLink href="/events">Events</FooterLink>
          </Box>

          <Box component="nav" aria-label="Get involved" sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Typography component="p" sx={columnTitleSx}>
              Get Involved
            </Typography>
            <FooterLink href={PLAN_VISIT_HREF}>Plan a Visit</FooterLink>
            <FooterLink href="/connect">Connect With Us</FooterLink>
            <FooterLink href="/giving">Give Online</FooterLink>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Typography component="p" sx={columnTitleSx}>
              Visit
            </Typography>
            <Box component="address" sx={{ fontStyle: 'normal', fontSize: 15, lineHeight: 1.7 }}>
              {street}
              <br />
              {city}, {state} {zip_code}
            </Box>
            <Box component="a" href={`mailto:${email.primary}`} sx={{ ...footerLinkSx, wordBreak: 'break-all' }}>
              {email.primary}
            </Box>
            <Typography sx={{ m: 0, fontSize: 15, lineHeight: 1.7 }}>
              Sundays
              {sunday.map((item) => (
                <Box component="span" key={item.key} sx={{ display: 'block' }}>
                  {item.time} · {item.title}
                </Box>
              ))}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            borderTop: '1px solid #383838',
            pt: 3,
            fontSize: 13,
            color: '#a7adb1',
          }}
        >
          <Typography component="p" sx={{ m: 0, fontSize: 13 }}>
            © {new Date().getFullYear()} {org.full_name} · Registered {org.registration_year}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SiteFooter;
