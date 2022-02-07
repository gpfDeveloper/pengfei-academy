import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import PageLayout from 'components/layouts/PageLayout';
import axios from 'axios';
import Spinner from 'components/UIs/Spinner';
import CourseLearningItems from 'components/course/learning/CourseLearningItems';

function MyCoursesLearningPage() {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const { isLogin, token } = user;
  const [courseItems, setCourseItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchLearningList = async () => {
      const data = await axios.get('/api/user/getLearningList', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourseItems(data.data.courseItems);
    };
    if (!isLogin) {
      router.replace('/login');
    } else {
      setLoading(true);
      fetchLearningList();
      setLoading(false);
    }
  }, [isLogin, router, token]);
  const browseCourseHandler = () => {
    router.push('/course');
  };

  return (
    <PageLayout>
      {isLogin && (
        <Box sx={{ mt: 12 }}>
          {loading && <Spinner />}
          {!loading && (
            <Stack sx={{ gap: 4, alignItems: 'center' }}>
              <Typography variant="h3">My learning</Typography>
              <Divider sx={{ alignSelf: 'stretch' }} />
              <>
                {courseItems.length === 0 && (
                  <>
                    <Typography>
                      When you enroll in a course, it will appear here.
                    </Typography>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={browseCourseHandler}
                    >
                      Browse course now
                    </Button>
                  </>
                )}
                {courseItems.length !== 0 && (
                  <CourseLearningItems items={courseItems} />
                )}
              </>
            </Stack>
          )}
        </Box>
      )}
    </PageLayout>
  );
}

export default dynamic(() => Promise.resolve(MyCoursesLearningPage), {
  ssr: false,
});
