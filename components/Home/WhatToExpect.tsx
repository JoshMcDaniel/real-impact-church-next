import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import { ReactNode } from 'react';
import { brand, contentMaxWidth } from '../../constants/brand';
import { useHomeConfig } from '../../constants/app-config/app-config-hooks';
import { SundayItem } from '../../constants/sunday-schedule';
import GlowLayer from '../shared/GlowLayer';
import SectionHeader from '../shared/SectionHeader';

const icons: Record<string, ReactNode> = {
  heart: <FavoriteBorderIcon />,
  book: <MenuBookOutlinedIcon />,
  music: <MusicNoteOutlinedIcon />,
  globe: <PublicOutlinedIcon />,
};

/** Splits "10:30 AM" into ["10:30", "AM"] so the period can be styled smaller. */
const splitTime = (time: string): [string, string] => {
  const match = time.trim().match(/^(.*?)\s*([AP]\.?M\.?)$/i);
  return match ? [match[1], match[2].toUpperCase()] : [time, ''];
};

type WhatToExpectProps = { sundayMorning: SundayItem[] };

export const WhatToExpect = ({ sundayMorning }: WhatToExpectProps) => {
  const { expectations } = useHomeConfig();

  return (
    <Box component="section" aria-labelledby="expect-title" sx={{ backgroundColor: brand.mist, px: 3, py: { xs: 10, md: 12.5 } }}>
      <Box sx={{ maxWidth: contentMaxWidth, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <SectionHeader
          id="expect-title"
          eyebrow="Your first Sunday"
          eyebrowTone="dark"
          title="What to expect when you visit"
          aside={
            <Typography component="p" sx={{ m: 0, maxWidth: 420, fontSize: 17, lineHeight: 1.7 }}>
              New to church, or new to Eustis? Here’s what a Sunday at Real Impact looks like.
            </Typography>
          }
        />

        <Box
          sx={{
            position: 'relative',
            backgroundColor: brand.footer,
            color: brand.white,
            borderRadius: '24px',
            p: { xs: '28px 18px', sm: '36px 36px 32px' },
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
          }}
        >
          <GlowLayer glows={[{ right: -120, top: -140, size: 380, opacity: 0.18 }]} />
          <Box sx={{ position: 'relative', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '8px 24px' }}>
            <Typography component="h3" sx={{ m: 0, fontSize: 24, fontWeight: 800 }}>
              Your Sunday morning
            </Typography>
            <Typography component="p" sx={{ m: 0, fontSize: 15, color: '#d6dadd' }}>
              Come early, stay for it all — everything is free.
            </Typography>
          </Box>
          <Box
            component="ol"
            sx={{
              listStyle: 'none',
              m: 0,
              p: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(230px, 100%), 1fr))',
              gap: 2,
            }}
          >
            {sundayMorning.map((item) => {
              const highlight = item.key === 'worship';
              const [clock, period] = splitTime(item.time);
              return (
                <Box
                  component="li"
                  key={item.key}
                  sx={{
                    position: 'relative',
                    backgroundColor: highlight ? brand.red : 'rgba(255,255,255,.1)',
                    border: highlight ? 'none' : '1px solid rgba(255,255,255,.22)',
                    borderRadius: '18px',
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                  }}
                >
                  <Typography component="p" sx={{ m: 0, fontSize: 30, fontWeight: 800 }}>
                    <time>
                      {clock}
                      {period && (
                        <Box
                          component="span"
                          sx={{ fontSize: 15, fontWeight: 700, color: highlight ? brand.redSoft : '#b4babe' }}
                        >
                          {' '}
                          {period}
                        </Box>
                      )}
                    </time>
                  </Typography>
                  <Typography component="h4" sx={{ m: 0, fontSize: 18, fontWeight: 800 }}>
                    {item.title}
                  </Typography>
                  <Typography
                    component="p"
                    sx={{ m: 0, fontSize: 14, lineHeight: 1.6, color: highlight ? brand.redSoft : '#d6dadd' }}
                  >
                    {item.text}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))',
            gap: '22px',
          }}
        >
          {expectations.map((item) => (
            <Box
              component="article"
              key={item.title}
              sx={{
                backgroundColor: brand.white,
                border: `1px solid ${brand.line}`,
                borderRadius: '22px',
                p: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                transition: 'transform .2s ease, box-shadow .2s ease',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 18px 40px rgba(43,43,43,.14)' },
              }}
            >
              <Box
                aria-hidden
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: '16px',
                  backgroundColor: brand.redTint,
                  color: brand.red,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {icons[item.icon]}
              </Box>
              <Typography component="h3" sx={{ m: 0, fontSize: 20, fontWeight: 800, color: brand.charcoal }}>
                {item.title}
              </Typography>
              <Typography component="p" sx={{ m: 0, fontSize: 15, lineHeight: 1.7 }}>
                {item.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default WhatToExpect;
