import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { brand, contentMaxWidth } from '../../constants/brand';
import { useOrganizationConfig } from '../../constants/app-config/app-config-hooks';
import PillButton from '../shared/PillButton';

export const navItems: { label: string; href: string; also?: string[] }[] = [
  { label: 'About', href: '/about', also: ['/beliefs', '/staff'] },
  { label: 'Media', href: '/media' },
  { label: 'Events', href: '/events' },
  { label: 'Giving', href: '/giving' },
  { label: 'Connect', href: '/connect' },
];

export const PLAN_VISIT_HREF = '/#visit';

/** Below this width the nav collapses into the menu button. */
const DESKTOP_NAV_BREAKPOINT = 900;
const mobileOnly = `@media (min-width: ${DESKTOP_NAV_BREAKPOINT + 1}px)`;
const desktopOnly = `@media (max-width: ${DESKTOP_NAV_BREAKPOINT}px)`;

export const SiteHeader = () => {
  const { logos, full_name } = useOrganizationConfig();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu whenever navigation happens.
  useEffect(() => {
    const close = () => setMenuOpen(false);
    router.events.on('routeChangeStart', close);
    router.events.on('hashChangeStart', close);
    return () => {
      router.events.off('routeChangeStart', close);
      router.events.off('hashChangeStart', close);
    };
  }, [router.events]);

  const isActive = (href: string) => {
    const item = navItems.find((nav) => nav.href === href);
    return [href, ...(item?.also ?? [])].some(
      (path) => router.pathname === path || router.pathname.startsWith(`${path}/`)
    );
  };

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        backgroundColor: 'rgba(247,252,255,0.96)',
        backdropFilter: 'saturate(180%) blur(8px)',
        borderBottom: `1px solid ${brand.lineStrong}`,
      }}
    >
      <Box
        sx={{
          maxWidth: contentMaxWidth,
          mx: 'auto',
          px: { xs: 2, sm: 3 },
          py: '14px',
          display: 'flex',
          flexWrap: 'nowrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <Box
          component={Link}
          href="/"
          aria-label={`${full_name} home`}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            minHeight: 44,
            minWidth: 0,
            textDecoration: 'none',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flex: 'none',
              '@media (max-width: 420px)': { display: 'none' },
            }}
          >
            <Image
              src={logos.simple_logo.path}
              alt=""
              width={44}
              height={44}
              priority
              style={{ objectFit: 'contain', mixBlendMode: 'multiply' }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0 }}>
            <Image
              src={logos.title_logo.path}
              alt={full_name}
              width={133}
              height={26}
              priority
              style={{ height: 26, width: 'auto' }}
            />
            <Typography
              component="span"
              sx={{
                fontWeight: 600,
                fontSize: 10,
                letterSpacing: '.3em',
                color: brand.muted,
                whiteSpace: 'nowrap',
              }}
            >
              CHURCH · EUSTIS, FL
            </Typography>
          </Box>
        </Box>

        <Box
          component="nav"
          aria-label="Primary"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px 22px',
            [desktopOnly]: { display: 'none' },
          }}
        >
          {navItems.map((item) => (
            <Box
              key={item.href}
              component={Link}
              href={item.href}
              aria-current={router.pathname === item.href ? 'page' : undefined}
              sx={{
                color: isActive(item.href) ? brand.red : brand.charcoal,
                fontWeight: 600,
                fontSize: 15,
                py: '10px',
                px: '4px',
                textDecoration: 'none',
                '&:hover': { color: brand.red },
              }}
            >
              {item.label}
            </Box>
          ))}
          <PillButton href={PLAN_VISIT_HREF} size="small">
            Plan a Visit
          </PillButton>
        </Box>

        <IconButton
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
          sx={{
            flex: 'none',
            width: 48,
            height: 48,
            borderRadius: '12px',
            backgroundColor: brand.charcoal,
            color: brand.white,
            '&:hover': { backgroundColor: '#000000' },
            [mobileOnly]: { display: 'none' },
          }}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Collapse in={menuOpen} timeout="auto" unmountOnExit sx={{ [mobileOnly]: { display: 'none' } }}>
        <Box
          component="nav"
          id="mobile-menu"
          aria-label="Mobile"
          sx={{
            borderTop: `1px solid ${brand.line}`,
            backgroundColor: brand.paper,
            px: 3,
            pt: 1,
            pb: 3,
          }}
        >
          {navItems.map((item) => (
            <Box
              key={item.href}
              component={Link}
              href={item.href}
              aria-current={router.pathname === item.href ? 'page' : undefined}
              sx={{
                display: 'flex',
                alignItems: 'center',
                minHeight: 52,
                px: '4px',
                fontSize: 17,
                fontWeight: 700,
                color: isActive(item.href) ? brand.red : brand.charcoal,
                borderBottom: `1px solid ${brand.line}`,
                textDecoration: 'none',
                '&:hover': { color: brand.red },
              }}
            >
              {item.label}
            </Box>
          ))}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', pt: '20px' }}>
            <PillButton href={PLAN_VISIT_HREF}>Plan a Visit</PillButton>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

export default SiteHeader;
