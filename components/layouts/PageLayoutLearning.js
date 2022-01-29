import Head from 'next/head';
import { useEffect } from 'react';

import { CssBaseline, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { useSelector, useDispatch } from 'react-redux';
import { logoutAsync } from 'store/user-async';

import Footer from './Footer';
import { getTheme } from 'utils/theme';
import Snackbar from 'components/UIs/Snackbar';
import HeaderLearning from './header/learning/HeaderLearning';

let logoutTimer;
const companyName = 'Pengfei Academy';

export default function PageLayoutLearning({
  children,
  course,
  isPreview = false,
}) {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDark);
  const user = useSelector((state) => state.user);
  const { loginExpireAt } = user;
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
        <title>
          {course?.title} | {companyName}
        </title>
        <meta name="description" content={course?.subtitle}></meta>
      </Head>
      <HeaderLearning course={course} isPreview={isPreview} />
      <Box component="main" sx={{ minHeight: '100vh', marginTop: 8 }}>
        {children}
      </Box>
      <Footer />
      <Snackbar />
    </ThemeProvider>
  );
}
