import Head from 'next/head';
import { useEffect } from 'react';

import { Container, CssBaseline, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { useSelector, useDispatch } from 'react-redux';
import { logoutAsync } from 'store/user-async';

import Header from './header/Header';
import HeaderInstructorView from './header/instructorView/HeaderInstructorView';
import Footer from './Footer';
import { getTheme } from 'utils/theme';
import Snackbar from 'components/UIs/Snackbar';
import HeaderEditCourse from './header/editCourse/HeaderEditCourse';

let logoutTimer;
const companyName = 'Pengfei Academy';

export default function PageLayout({ children, title, description }) {
  const defaultTitle = `Online Courses - Learn Anything On Your Schedule  | ${companyName}`;
  const defaultDescription =
    'Pengfei Acadamy is an online learning and teaching marketplace. Learn web development, algorithm, programming in general and more.';

  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDark);
  const user = useSelector((state) => state.user);
  const { loginExpireAt, isInstructorView, isEditCourse } = user;
  const theme = getTheme(isDark);

  let isContentFullWidth = false;
  if (isInstructorView && isEditCourse) {
    isContentFullWidth = true;
  }

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
      {!isInstructorView && <Header />}
      {isInstructorView && !isEditCourse && <HeaderInstructorView />}
      {isInstructorView && isEditCourse && <HeaderEditCourse />}
      {!isContentFullWidth && (
        <Container component="main" sx={{ minHeight: '100vh', marginTop: 8 }}>
          {children}
        </Container>
      )}
      {isContentFullWidth && (
        <Box component="main" sx={{ minHeight: '100vh', marginTop: 8 }}>
          {children}
        </Box>
      )}
      <Footer />
      <Snackbar />
    </ThemeProvider>
  );
}
