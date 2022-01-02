import { createTheme } from '@mui/material/styles';

export const COLORS = {
  light: {
    primary: '#8651E2',
  },
  dark: {
    primary: '#BF9CFA',
  },
};

export const getTheme = (isDark = true) => {
  let appBarStyle;
  if (!isDark) {
    appBarStyle = {
      backgroundColor: 'white',
      color: 'rgba(0,0,0,.87)',
    };
  }
  const mode = isDark ? 'dark' : 'light';
  const primaryColor = isDark ? COLORS.dark.primary : COLORS.light.primary;
  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: primaryColor,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: { ...appBarStyle },
        },
      },
    },
  });
  return theme;
};
