import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Stack, Typography, Divider } from '@mui/material';

import { useSelector } from 'react-redux';
import Spinner from 'components/UIs/Spinner';
import PageLayout from 'components/layouts/PageLayout';
import MessageContentFullView from 'components/message/MessageContentFullView';

function Conversation() {
  const router = useRouter();
  const isLogin = useSelector((state) => state.user.isLogin);
  const { conversationId } = router.query;
  useEffect(() => {
    if (!isLogin) {
      router.replace('/login');
    }
  }, [isLogin, router]);

  return (
    <PageLayout>
      {!isLogin && <Spinner />}
      {isLogin && conversationId && (
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
          <MessageContentFullView convId={conversationId} />
        </Stack>
      )}
    </PageLayout>
  );
}

export default dynamic(() => Promise.resolve(Conversation), { ssr: false });
