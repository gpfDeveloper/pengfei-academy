import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Stack } from '@mui/material';

import Spinner from 'components/UIs/Spinner';
import PageLayout from 'components/layouts/PageLayout';
import PublicProfile from 'components/profile/PublicProfile';
import axios from 'axios';

export default function UserProfile() {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();
  const { uid } = router.query;
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await axios.get(`/api/profile/public/${uid}`);
        setUserInfo({ ...data?.data });
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    if (uid) {
      fetchProfile();
    }
  }, [uid]);
  return (
    <PageLayout>
      {loading && <Spinner />}
      {!loading && (
        <Stack
          sx={{
            gap: 4,
            margin: '8rem auto',
            maxWidth: '960px',
          }}
        >
          <PublicProfile userInfo={userInfo} />
        </Stack>
      )}
    </PageLayout>
  );
}
