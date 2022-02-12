import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Typography, Stack, Divider } from '@mui/material';

import PageLayout from 'components/layouts/PageLayout';
import Spinner from 'components/UIs/Spinner';
import ResetPasswordForm from 'components/layouts/form/ResetPasswordForm';

export default function ResetPasswordPage() {
  const router = useRouter();
  const redirect = router.query?.redirect;
  const token = router.query?.token;
  const isLogin = useSelector((state) => state.user.isLogin);
  useEffect(() => {
    if (isLogin) {
      if (redirect) {
        router.replace(redirect);
      } else {
        router.replace('/');
      }
    } else if (token && token.length != 32) {
      router.replace('/');
    }
  }, [isLogin, redirect, router, token]);
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
            Reset Password
          </Typography>
          <Divider />
          <ResetPasswordForm />
          <Divider />
        </Stack>
      )}
    </PageLayout>
  );
}
