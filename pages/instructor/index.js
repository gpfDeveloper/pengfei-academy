import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import InstructorDashboard from 'components/instructor/InstructorDashboard';
import PageLayoutInstructor from 'components/layouts/PageLayoutInstructor';

function InstructorPage() {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const { isLogin, isInstructor } = user;
  useEffect(() => {
    if (!isLogin) {
      router.replace('/login');
    } else if (!isInstructor) {
      router.replace('/');
    }
  }, [isLogin, router, isInstructor]);
  return (
    <PageLayoutInstructor>
      {isLogin && isInstructor && <InstructorDashboard />}
    </PageLayoutInstructor>
  );
}

export default dynamic(() => Promise.resolve(InstructorPage), { ssr: false });
