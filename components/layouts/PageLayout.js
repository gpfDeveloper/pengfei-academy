import Head from 'next/head';

import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';

import Header from './header/Header';
import Footer from './Footer';
import { getTheme } from 'utils/theme';
import Notification from 'components/UIs/Notification';

const companyName = 'Pengfei Academy';

export default function PageLayout({ children, title, description }) {
  const defaultTitle = `Online Courses - Learn Anything On Your Schedule  | ${companyName}`;
  const defaultDescription =
    'Pengfei Acadamy is an online learning and teaching marketplace. Learn web development, algorithm, programming in general and more.';

  const isDark = useSelector((state) => state.theme.isDark);
  const theme = getTheme(isDark);

  const notification = useSelector((state) => state.notification);

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
      <Notification
        severity={notification.severity}
        message={notification.message}
      />
    </ThemeProvider>
  );
}
