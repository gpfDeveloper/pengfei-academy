import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import CreateCourseTitleInput from 'components/instructor/CreateCourseTitleInput';
import PageLayoutInstructor from 'components/layouts/PageLayoutInstructor';

function CreateCoursePage() {
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
      <Box sx={{ margin: '8rem auto', maxWidth: '800px' }}>
        <CreateCourseTitleInput />
      </Box>
    </PageLayoutInstructor>
  );
}

export default dynamic(() => Promise.resolve(CreateCoursePage), { ssr: false });
