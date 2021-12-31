import NextLink from 'next/link';
import { Typography, Stack, Divider, Link } from '@mui/material';

import PageLayout from 'components/layouts/PageLayout';
import LoginForm from 'components/layouts/form/LoginForm';

export default function Login() {
  return (
    <PageLayout title="Log In to Your Pengfei Academy Account!">
      <Stack
        sx={{ maxWidth: 600, gap: 4, margin: '8rem auto', textAlign: 'center' }}
      >
        <Typography component="h1" variant="h4">
          Log In to Your Pengfei Academy Account!
        </Typography>
        <Divider />
        <LoginForm />
        <Divider />
        <Stack direction="row" gap={2}>
          <Typography>Don&rsquo;t have an account? </Typography>
          <NextLink href="/register" passHref>
            <Link>
              <Typography>Sign up</Typography>
            </Link>
          </NextLink>
        </Stack>
      </Stack>
    </PageLayout>
  );
}
