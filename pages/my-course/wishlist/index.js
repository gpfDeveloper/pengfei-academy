import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Box, Divider, Stack, Typography } from '@mui/material';
import PageLayout from 'components/layouts/PageLayout';
import CourseItems from 'components/course/items/CourseItems';
import axios from 'axios';
import Spinner from 'components/UIs/Spinner';

function WishlistPage() {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const { isLogin, token } = user;
  const [courseItems, setCourseItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchWishlist = async () => {
      const data = await axios.get('/api/user/getWishlist', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourseItems(data.data.courseItems);
    };
    if (!isLogin) {
      router.replace('/login');
    } else {
      setLoading(true);
      fetchWishlist();
      setLoading(false);
    }
  }, [isLogin, router, token]);

  return (
    <PageLayout>
      {isLogin && (
        <Box sx={{ mt: 12 }}>
          {loading && <Spinner />}
          {!loading && (
            <Stack sx={{ gap: 4 }}>
              <Typography variant="h4">Wishlist</Typography>
              <Divider />
              <CourseItems items={courseItems} />
            </Stack>
          )}
        </Box>
      )}
    </PageLayout>
  );
}

export default dynamic(() => Promise.resolve(WishlistPage), { ssr: false });
