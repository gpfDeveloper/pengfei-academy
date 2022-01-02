import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { Typography, Stack, Divider, Link } from '@mui/material';

import { useSelector } from 'react-redux';

import RegisterForm from 'components/layouts/form/RegisterForm';
import PageLayout from 'components/layouts/PageLayout';
import Spinner from 'components/UIs/Spinner';

export default function Register() {
  const router = useRouter();
  const isLogin = useSelector((state) => state.auth.isLogin);
  useEffect(() => {
    if (isLogin) {
      router.push('/');
    }
  }, [isLogin]);
  return (
    <PageLayout title="Sign up and start learning">
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
            Sign Up and start learning
          </Typography>
          <Divider />
          <RegisterForm />
          <Divider />
          <Stack direction="row" gap={2}>
            <Typography>Already have an account? </Typography>
            <NextLink href="/login" passHref>
              <Link>
                <Typography>Login</Typography>
              </Link>
            </NextLink>
          </Stack>
        </Stack>
      )}
    </PageLayout>
  );
}
