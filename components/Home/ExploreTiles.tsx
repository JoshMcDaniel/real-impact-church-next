import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { brand, contentMaxWidth } from '../../constants/brand';
import { useHomeConfig } from '../../constants/app-config/app-config-hooks';

/** Image tiles linking to the main areas of the site. */
export const ExploreTiles = () => {
  const items = useHomeConfig().home_summary_items;

  return (
    <Box
      component="section"
      aria-labelledby="explore-title"
      sx={{
        maxWidth: contentMaxWidth,
        mx: 'auto',
        px: 3,
        pt: 2.5,
        pb: { xs: 10, md: 13.75 },
        display: 'flex',
        flexDirection: 'column',
        gap: 4.5,
      }}
    >
      <Typography
        id="explore-title"
        component="h2"
        sx={{ m: 0, fontSize: 'clamp(26px, 2.6vw, 34px)', fontWeight: 800, color: brand.charcoal }}
      >
        Find your next step
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
          gap: 2.5,
        }}
      >
        {items.map((item) => (
          <Box
            key={item.nav_to_route}
            component={Link}
            href={item.nav_to_route}
            sx={{
              position: 'relative',
              display: 'block',
              height: 300,
              borderRadius: '20px',
              overflow: 'hidden',
              backgroundColor: brand.charcoal,
              color: brand.white,
              textDecoration: 'none',
              '& img': { transition: 'transform .5s ease' },
              '&:hover img': { transform: 'scale(1.05)' },
            }}
          >
            <Image
              src={item.image.path}
              alt={item.image.description}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 33vw, 250px"
              style={{ objectFit: 'cover', opacity: 0.6 }}
            />
            <Box
              component="span"
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                p: '26px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                backgroundColor: 'rgba(20,20,20,.55)',
              }}
            >
              <Box component="span" sx={{ fontSize: 22, fontWeight: 800 }}>
                {item.info_text.title}
              </Box>
              <Box component="span" sx={{ fontSize: 15, color: '#e6e9eb' }}>
                {item.info_text.subtitle}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ExploreTiles;
