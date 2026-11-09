import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Montserrat } from 'next/font/google';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '../constants/app-config/Theme';
import ScrollToTop from '../components/shared/ScrollToTop';
import SiteHeader from '../components/Layout/SiteHeader';
import SiteFooter from '../components/Layout/SiteFooter';

// Self-hosted by Next.js: no render-blocking request to Google Fonts.
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-montserrat: ${montserrat.style.fontFamily};
        }
      `}</style>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <ScrollToTop />
        <SiteHeader />
        <Box className="content-container">
          <Component {...pageProps} />
        </Box>
        <SiteFooter />
      </ThemeProvider>
    </>
  );
}

export default App;
