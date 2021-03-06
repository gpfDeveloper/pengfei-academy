import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Divider, Stack, Typography } from '@mui/material';

import { useSelector } from 'react-redux';
import PageLayout from 'components/layouts/PageLayout';
import TeachingStepper from 'components/teaching/TeachingStepper';

function Teaching() {
  const router = useRouter();
  const isInstructor = useSelector((state) => state.user.isInstructor);
  useEffect(() => {
    if (isInstructor) {
      router.replace('/');
    }
  }, [isInstructor, router]);
  return (
    <PageLayout>
      <Stack
        sx={{
          gap: 4,
          margin: '8rem auto',
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" component="h1">
          Teaching on Pengfei Academy
        </Typography>
        <Typography variant="h6" component="h6">
          Become an instructor and change lives — including your own
        </Typography>
        <Divider />
        <TeachingStepper />
      </Stack>
    </PageLayout>
  );
}

export default dynamic(() => Promise.resolve(Teaching), { ssr: false });
