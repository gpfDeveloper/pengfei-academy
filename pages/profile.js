import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Stack, Typography, Divider } from '@mui/material';

import { useSelector } from 'react-redux';
import Spinner from 'components/UIs/Spinner';
import PageLayout from 'components/layouts/PageLayout';
import ProfilePanel from 'components/profile/ProfilePanel';

function Profile() {
  const router = useRouter();
  const isLogin = useSelector((state) => state.user.isLogin);
  useEffect(() => {
    if (!isLogin) {
      router.replace('/login');
    }
  }, [isLogin]);
  return (
    <PageLayout>
      {!isLogin && <Spinner />}
      {isLogin && (
        <Stack
          sx={{
            gap: 4,
            margin: '8rem auto',
          }}
        >
          <Typography component="h1" variant="h4">
            Account &amp; Profile settings
          </Typography>
          <Divider />
          <ProfilePanel />
        </Stack>
      )}
    </PageLayout>
  );
}

export default dynamic(() => Promise.resolve(Profile), { ssr: false });
