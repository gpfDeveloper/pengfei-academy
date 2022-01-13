import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Stack, Typography, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useSelector } from 'react-redux';
import Spinner from 'components/UIs/Spinner';
import PageLayout from 'components/layouts/PageLayout';
import MessageLayout from 'components/message/MessageLayout';
import MessageLayoutMobile from 'components/message/MessageLayoutMobile';

function Message() {
  const router = useRouter();
  const isLogin = useSelector((state) => state.user.isLogin);
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
  useEffect(() => {
    if (!isLogin) {
      router.replace('/login');
    }
  }, [isLogin, router]);
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
            Messages
          </Typography>
          <Divider />
          {!isBelowMd && <MessageLayout />}
          {isBelowMd && <MessageLayoutMobile />}
        </Stack>
      )}
    </PageLayout>
  );
}

export default dynamic(() => Promise.resolve(Message), { ssr: false });
