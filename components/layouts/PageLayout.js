import Head from 'next/head';
import { useEffect } from 'react';

import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { useSelector, useDispatch } from 'react-redux';
import { logoutAsync } from 'store/user-async';

import Header from './header/Header';
import Footer from './Footer';
import { getTheme } from 'utils/theme';
import Snackbar from 'components/UIs/Snackbar';

let logoutTimer;
const companyName = 'Pengfei Academy';

export default function PageLayout({ children, title, description }) {
  const defaultTitle = `Online Courses - Learn Anything On Your Schedule  | ${companyName}`;
  const defaultDescription =
    'Pengfei Acadamy is an online learning and teaching marketplace. Learn web development, algorithm, programming in general and more.';

  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDark);
  const loginExpireAt = useSelector((state) => state.user.expireAt);
  const theme = getTheme(isDark);

  useEffect(() => {
    if (loginExpireAt) {
      const currentTime = new Date().getTime();
      if (currentTime > loginExpireAt) {
        dispatch(logoutAsync());
        clearTimeout(logoutTimer);
      } else {
        logoutTimer = setTimeout(
          () => dispatch(logoutAsync()),
          loginExpireAt - currentTime
        );
      }
    }
  }, [loginExpireAt, dispatch]);

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
      <Snackbar />
    </ThemeProvider>
  );
}
