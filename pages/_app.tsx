import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '../constants/app-config/Theme';
import { Fragment } from 'react';
import { Footer } from '../components/Footer/Footer';
import ScrollToTop from '../components/shared/ScrollToTop';
import ResponsiveAppBar from '../components/AppBar/ResponsiveAppBar';

function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <ScrollToTop />
        <ResponsiveAppBar />
        <Box className="content-container">
          <Component {...pageProps} />
        </Box>
        <Footer />
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
