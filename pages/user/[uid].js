import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Stack, Typography, Divider } from '@mui/material';

import Spinner from 'components/UIs/Spinner';
import PageLayout from 'components/layouts/PageLayout';

export default function PublicProfile() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  console.log(router.params);
  useEffect(() => {
    setLoading(true);
    const fetchProfile = async () => {};
    fetchProfile();
  }, []);
  return (
    <PageLayout>
      {loading && <Spinner />}
      {!loading && (
        <Stack
          sx={{
            gap: 4,
            margin: '8rem auto',
          }}
        >
          <Typography component="h1" variant="h4">
            User Public Profile
          </Typography>
          <Divider />
        </Stack>
      )}
    </PageLayout>
  );
}
