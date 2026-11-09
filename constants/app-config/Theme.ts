import { createTheme, ThemeOptions } from '@mui/material';
import themeConfig from './theme.json';

/**
 * The custom application theme.
 * Montserrat is self-hosted with next/font/local in `_app.tsx` and exposed as `--font-montserrat`.
 */
export const theme = createTheme({
  ...(themeConfig as ThemeOptions),
  typography: {
    ...themeConfig.typography,
    fontFamily: "var(--font-montserrat), 'Montserrat', 'Open Sans', sans-serif",
  },
});
