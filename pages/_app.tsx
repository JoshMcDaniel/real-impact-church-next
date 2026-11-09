import '../styles/globals.css';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '../constants/app-config/Theme';
import ScrollToTop from '../components/shared/ScrollToTop';
import SiteHeader from '../components/Layout/SiteHeader';
import SiteFooter from '../components/Layout/SiteFooter';

// Self-hosted from the repo (variable font, latin subset, weights 400-800).
const montserrat = localFont({
  src: '../styles/fonts/Montserrat-latin-variable.woff2',
  weight: '400 800',
  style: 'normal',
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
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
