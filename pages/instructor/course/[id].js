import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInstructorView } from 'store/user';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import PageLayout from 'components/layouts/PageLayout';

function EditCoursePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { isLogin, isInstructor } = user;
  const { id: courseId } = router.query;
  useEffect(() => {
    if (!isLogin) {
      router.replace('/login');
    } else if (!isInstructor) {
      router.replace('/');
    } else {
      dispatch(setInstructorView());
    }
  }, [isLogin, router, isInstructor, dispatch]);
  return (
    <PageLayout>
      <Box sx={{ margin: '8rem auto', maxWidth: '800px' }}>{courseId}</Box>
    </PageLayout>
  );
}

export default dynamic(() => Promise.resolve(EditCoursePage), { ssr: false });
