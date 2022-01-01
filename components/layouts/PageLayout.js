import Head from 'next/head';

import { Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';

import Header from './header/Header';
import Footer from './Footer';
import { COLORS } from 'utils/constants';

const companyName = 'Pengfei Academy';

export default function PageLayout({ children, title, description }) {
  const defaultTitle = `Online Courses - Learn Anything On Your Schedule  | ${companyName}`;
  const defaultDescription =
    'Pengfei Acadamy is an online learning and teaching marketplace. Learn web development, algorithm, programming in general and more.';

  const isDark = useSelector((state) => state.theme.isDark);
  const theme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: {
        main: isDark ? COLORS.dark.primary : COLORS.light.primary,
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
          root: {
            backgroundColor: isDark ? 'inherit' : 'white',
            color: isDark ? 'inherit' : 'rgba(0,0,0,.87)',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>{title ? `${title} | ${companyName}` : defaultTitle}</title>
        <meta
          name="description"
          content={description || defaultDescription}
        ></meta>
      </Head>
      <Header />
      <Container component="main" sx={{ minHeight: '100vh', marginTop: 8 }}>
        {children}
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
