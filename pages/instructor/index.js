import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInstructorView } from 'store/user';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import PageLayout from 'components/layouts/PageLayout';
import InstructorDashboard from 'components/instructor/InstructorDashboard';

function InstructorPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { isLogin, isInstructor } = user;
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
      {isLogin && isInstructor && <InstructorDashboard />}
    </PageLayout>
  );
}

export default dynamic(() => Promise.resolve(InstructorPage), { ssr: false });
