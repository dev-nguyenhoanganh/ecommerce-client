import React from 'react';
import { useMemo } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import '@fontsource/public-sans';

import palette from './palette';
import shadows from './shadows';
import typography from './typography';
import GlobalStyles from './globalStyles';
import customShadows from './customShadows';
import componentsOverride from './overrides';
import { Theme } from '../interface';

// ----------------------------------------------------------------------

interface ThemeProps {
  children: JSX.Element | JSX.Element[];
}

export default function ThemeProvider({ children }: ThemeProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(() => {
    // prettier-ignore
    const appTheme = createTheme({
      palette: palette(prefersDarkMode),
      shape: { borderRadius: 6 },
      typography,
      shadows: shadows(),
    }, {
      customShadows: customShadows(prefersDarkMode)
    }) as Theme;

    appTheme.components = componentsOverride(appTheme);
    return appTheme;
  }, [prefersDarkMode]);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
