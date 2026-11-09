import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { brand, contentMaxWidth } from '../../constants/brand';

export type Crumb = { label: string; href?: string };

type PageHeroProps = {
  title: ReactNode;
  text?: string;
  image: { path: string; description: string };
  /** Small label above the title (ignored when breadcrumbs are given). */
  eyebrow?: string;
  breadcrumbs?: Crumb[];
  overlay?: number;
};

/** Photo header for inner pages: one H1, optional eyebrow or breadcrumb trail. */
export const PageHero = ({ title, text, image, eyebrow, breadcrumbs, overlay = 0.58 }: PageHeroProps) => (
  <Box
    component="section"
    aria-labelledby="page-title"
    sx={{
      position: 'relative',
      minHeight: { xs: 380, md: 460 },
      display: 'flex',
      alignItems: 'flex-end',
      overflow: 'hidden',
      backgroundColor: brand.charcoal,
    }}
  >
    <Image src={image.path} alt={image.description} fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
    <Box aria-hidden sx={{ position: 'absolute', inset: 0, backgroundColor: `rgba(20,20,20,${overlay})` }} />
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: contentMaxWidth,
        mx: 'auto',
        px: 3,
        pt: { xs: 12, md: 14 },
        pb: { xs: 7, md: 9 },
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        color: brand.white,
      }}
    >
      {breadcrumbs ? (
        <Box component="nav" aria-label="Breadcrumb" sx={{ fontSize: 14, fontWeight: 600, color: '#d6dadd' }}>
          {breadcrumbs.map((crumb, index) => (
            <Box component="span" key={crumb.label}>
              {index > 0 && (
                <Box component="span" aria-hidden sx={{ px: 1 }}>
                  /
                </Box>
              )}
              {crumb.href ? (
                <Box
                  component={Link}
                  href={crumb.href}
                  sx={{ color: brand.white, textDecoration: 'underline', textUnderlineOffset: '3px' }}
                >
                  {crumb.label}
                </Box>
              ) : (
                <span aria-current="page">{crumb.label}</span>
              )}
            </Box>
          ))}
        </Box>
      ) : (
        eyebrow && (
          <Typography
            component="p"
            sx={{
              m: 0,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '.24em',
              textTransform: 'uppercase',
            }}
          >
            <Box component="span" aria-hidden sx={{ width: 36, height: 3, backgroundColor: brand.red, flex: 'none' }} />
            {eyebrow}
          </Typography>
        )
      )}
      <Typography
        id="page-title"
        component="h1"
        sx={{
          m: 0,
          fontSize: 'clamp(38px, 5.4vw, 68px)',
          lineHeight: 1.05,
          fontWeight: 800,
          letterSpacing: '-0.02em',
          maxWidth: 840,
        }}
      >
        {title}
      </Typography>
      {text && (
        <Typography
          component="p"
          sx={{ m: 0, fontSize: 'clamp(16px, 1.5vw, 20px)', lineHeight: 1.6, maxWidth: 640, color: '#eef1f3' }}
        >
          {text}
        </Typography>
      )}
    </Box>
  </Box>
);

export default PageHero;
