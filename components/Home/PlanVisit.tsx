import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { brand, contentMaxWidth } from '../../constants/brand';
import { useOrganizationConfig } from '../../constants/app-config/app-config-hooks';
import PillButton from '../shared/PillButton';
import { SectionHeader } from '../shared/SectionHeader';

export type FaqItem = { question: string; answer: string };

const labelSx = {
  m: 0,
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: '.16em',
  textTransform: 'uppercase' as const,
  color: brand.muted,
};

type PlanVisitProps = { faq: FaqItem[] };

export const PlanVisit = ({ faq }: PlanVisitProps) => {
  const { contact } = useOrganizationConfig();
  const mapQuery = encodeURIComponent(contact.full_address);

  return (
    <Box
      component="section"
      id="visit"
      aria-labelledby="visit-title"
      sx={{
        maxWidth: contentMaxWidth,
        mx: 'auto',
        px: 3,
        py: { xs: 10, md: 13.75 },
        display: 'flex',
        flexWrap: 'wrap',
        gap: 7,
        scrollMarginTop: '80px',
      }}
    >
      <Box sx={{ flex: '1 1 440px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '22px' }}>
        <SectionHeader id="visit-title" eyebrow="Plan your visit" title="We’re saving a place just for you." />
        <Box
          sx={{
            position: 'relative',
            height: 300,
            borderRadius: '20px',
            overflow: 'hidden',
            backgroundColor: '#dfe6ea',
          }}
        >
          <Box
            component="iframe"
            title={`Map to ${contact.full_address}`}
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            sx={{ border: 0, width: '100%', height: '100%', display: 'block' }}
          />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Typography component="h3" sx={labelSx}>
              Address
            </Typography>
            <Box component="address" sx={{ fontStyle: 'normal', fontSize: 16, fontWeight: 600, color: brand.charcoal, lineHeight: 1.5 }}>
              {contact.street}
              <br />
              {contact.city}, {contact.state} {contact.zip_code}
            </Box>
            <Box
              component="a"
              href={contact.google_maps_link}
              rel="noopener"
              sx={{ fontSize: 15, fontWeight: 700, color: brand.red, width: 'fit-content', minHeight: 32, pt: '4px' }}
            >
              Get directions
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Typography component="h3" sx={labelSx}>
              Email
            </Typography>
            <Box
              component="a"
              href={`mailto:${contact.email.primary}`}
              sx={{ fontSize: 16, fontWeight: 600, color: brand.red, wordBreak: 'break-all' }}
            >
              {contact.email.primary}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ flex: '1 1 440px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '22px' }}>
        <Typography component="h2" sx={{ m: 0, fontSize: 24, fontWeight: 800, color: brand.charcoal }}>
          Frequently asked questions
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faq.map((item, index) => (
            <Accordion
              key={item.question}
              defaultExpanded={index === 0}
              disableGutters
              elevation={0}
              sx={{
                backgroundColor: brand.white,
                border: `1px solid ${brand.line}`,
                borderRadius: '16px !important',
                '&::before': { display: 'none' },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ px: 3, py: '6px', minHeight: 56, '& .MuiAccordionSummary-content': { my: '12px' } }}
              >
                <Typography component="h3" sx={{ m: 0, fontSize: 17, fontWeight: 700, color: brand.charcoal }}>
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 3, pt: 0, pb: 2.5 }}>
                <Typography component="p" sx={{ m: 0, fontSize: 15, lineHeight: 1.7 }}>
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
        <PillButton href="/connect" tone="dark" sx={{ alignSelf: 'flex-start' }}>
          Get Connected
        </PillButton>
      </Box>
    </Box>
  );
};

export default PlanVisit;
