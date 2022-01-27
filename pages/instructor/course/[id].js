import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetCourse } from 'store/course';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import EditCourseDetailPage from 'components/instructor/EditCourse/EditCourseDetailPage';
import PageLayoutEditCourse from 'components/layouts/PageLayoutEditCourse';

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
    }
  }, [isLogin, router, isInstructor]);

  useEffect(() => {
    const exitingFunction = () => {
      dispatch(resetCourse());
    };

    router.events.on('routeChangeStart', exitingFunction);

    return () => {
      router.events.off('routeChangeStart', exitingFunction);
    };
  }, [dispatch, router.events]);
  return (
    <PageLayoutEditCourse>
      <Box sx={{ margin: '6rem auto' }}>
        {courseId && <EditCourseDetailPage courseId={courseId} />}
      </Box>
    </PageLayoutEditCourse>
  );
}

export default dynamic(() => Promise.resolve(EditCoursePage), { ssr: false });
