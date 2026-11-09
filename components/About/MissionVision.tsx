import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { brand, contentMaxWidth } from '../../constants/brand';
import { useAboutConfig } from '../../constants/app-config/app-config-hooks';

const withPeriod = (text: string) => (/[.!?]$/.test(text) ? text : `${text}.`);

export const MissionVision = () => {
  const descriptions = useAboutConfig().about_description.descriptions;
  const items = [
    { item: descriptions.find((d) => d.title_text === 'Our Mission'), line: brand.red, label: '#ff6b7f' },
    { item: descriptions.find((d) => d.title_text === 'Our Vision'), line: brand.white, label: '#b4babe' },
  ].filter((entry) => entry.item);

  return (
    <Box
      component="section"
      aria-label="Mission and vision"
      sx={{ backgroundColor: brand.charcoal, color: brand.white, px: 3, py: { xs: 9, md: 12.5 } }}
    >
      <Box
        sx={{
          maxWidth: contentMaxWidth,
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))',
          gap: 7,
        }}
      >
        {items.map(({ item, line, label }) => (
          <Box
            key={item!.title_text}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '28px', borderTop: `3px solid ${line}` }}
          >
            <Typography
              component="h2"
              sx={{ m: 0, fontSize: 13, fontWeight: 700, letterSpacing: '.24em', textTransform: 'uppercase', color: label }}
            >
              {item!.title_text}
            </Typography>
            <Typography component="p" sx={{ m: 0, fontSize: 'clamp(28px, 3.2vw, 42px)', fontWeight: 800, lineHeight: 1.15 }}>
              {withPeriod(item!.description)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MissionVision;
