import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Stack, Typography, Divider } from '@mui/material';

import { useSelector } from 'react-redux';
import Spinner from 'components/UIs/Spinner';
import PageLayout from 'components/layouts/PageLayout';
import AdminPanel from 'components/admin/AdminPanel';

function Admin() {
  const router = useRouter();
  const isAdmin = useSelector((state) => state.user.isAdmin);
  useEffect(() => {
    if (!isAdmin) {
      router.replace('/login');
    }
  }, [isAdmin, router]);
  return (
    <PageLayout>
      {!isAdmin && <Spinner />}
      {isAdmin && (
        <Stack
          sx={{
            gap: 4,
            margin: '8rem auto',
          }}
        >
          <Typography component="h1" variant="h4">
            Admin Dashboard
          </Typography>
          <Divider />
          <AdminPanel />
        </Stack>
      )}
    </PageLayout>
  );
}

export default dynamic(() => Promise.resolve(Admin), { ssr: false });
