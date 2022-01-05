import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Typography, Stack, Divider, Link } from '@mui/material';

import PageLayout from 'components/layouts/PageLayout';
import LoginForm from 'components/layouts/form/LoginForm';
import Spinner from 'components/UIs/Spinner';

export default function Login() {
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
    <PageLayout title="Log In to Pengfei Academy!">
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
            Log In to Pengfei Academy!
          </Typography>
          <Divider />
          <LoginForm />
          <Divider />
          <Stack direction="row" gap={2}>
            <Typography>Don&rsquo;t have an account? </Typography>
            <NextLink
              href={!redirect ? '/register' : `/register?redirect=${redirect}`}
              passHref
            >
              <Link>
                <Typography>Sign up</Typography>
              </Link>
            </NextLink>
          </Stack>
        </Stack>
      )}
    </PageLayout>
  );
}
