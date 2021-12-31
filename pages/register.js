import NextLink from 'next/link';
import { Typography, Stack, Divider, Link } from '@mui/material';

import RegisterForm from 'components/layouts/form/RegisterForm';
import PageLayout from 'components/layouts/PageLayout';

export default function Register() {
  return (
    <PageLayout title="Sign up and start learning">
      <Stack
        sx={{ maxWidth: 600, gap: 4, margin: '8rem auto', textAlign: 'center' }}
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
    </PageLayout>
  );
}
