import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInstructorView, setIsEditCourse } from 'store/user';
import { resetCourse } from 'store/course';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import PageLayout from 'components/layouts/PageLayout';
import EditCourseDetailPage from 'components/instructor/EditCourse/EditCourseDetailPage';

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
      dispatch(setIsEditCourse(true));
    }
  }, [isLogin, router, isInstructor, dispatch]);

  useEffect(() => {
    const exitingFunction = () => {
      dispatch(setIsEditCourse(false));
      dispatch(resetCourse());
    };

    router.events.on('routeChangeStart', exitingFunction);

    return () => {
      router.events.off('routeChangeStart', exitingFunction);
    };
  }, [dispatch, router.events]);
  return (
    <PageLayout>
      <Box sx={{ margin: '6rem auto', maxWidth: '1200px' }}>
        {courseId && <EditCourseDetailPage courseId={courseId} />}
      </Box>
    </PageLayout>
  );
}

export default dynamic(() => Promise.resolve(EditCoursePage), { ssr: false });
