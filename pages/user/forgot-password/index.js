import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Typography, Stack, Divider, Link } from '@mui/material';

import PageLayout from 'components/layouts/PageLayout';
import Spinner from 'components/UIs/Spinner';
import ForgotPasswordForm from 'components/layouts/form/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const redirect = router.query?.redirect;
  const isLogin = useSelector((state) => state.user.isLogin);
  useEffect(() => {
    if (isLogin) {
      if (redirect) {
        router.replace(redirect);
      } else {
        router.replace('/');
      }
    }
  }, [isLogin, redirect, router]);
  return (
    <PageLayout title="Forgot password">
      {isLogin && <Spinner />}
      {!isLogin && (
        <Stack
          sx={{
            maxWidth: 600,
            gap: 4,
            margin: '8rem auto',
            textAlign: 'center',
          }}
        >
          <Typography component="h1" variant="h4">
            Forgot password
          </Typography>
          <Divider />
          <ForgotPasswordForm />
          <Divider />
          <Typography sx={{ alignSelf: 'flex-start' }}>
            <NextLink href="/login" passHref>
              <Link>Log in</Link>
            </NextLink>
          </Typography>
        </Stack>
      )}
    </PageLayout>
  );
}
