import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInstructorView } from 'store/user';
import { useRouter } from 'next/router';
import { Stack, Button, Typography } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import dynamic from 'next/dynamic';
import PageLayout from 'components/layouts/PageLayout';

function InstructorSupportPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { isLogin, isInstructor, name, token } = user;
  useEffect(() => {
    if (!isLogin) {
      router.replace('/login');
    } else if (!isInstructor) {
      router.replace('/');
    } else {
      dispatch(setInstructorView());
    }
  }, [isLogin, router, isInstructor, dispatch]);
  const [convId, setConvId] = useState(null);

  useEffect(() => {
    const fetchConvId = async () => {
      const data = await axios.get('/api/user/conversationWithAdmin', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConvId(data?.data?.conversationWithAdmin);
    };
    if (token) {
      fetchConvId();
    }
  }, [convId, token]);
  const messageHandler = () => {
    router.push(`/message/${convId}`);
  };
  return (
    <PageLayout>
      {isLogin && isInstructor && (
        <Stack sx={{ maxWidth: 800, margin: '10rem auto', gap: '4rem' }}>
          <Typography component="h3" variant="h6">
            {`Hi ${name}, this is Pengfei, Feel free to message me if you have any question. I will contact you back as soon as I'm available`}
          </Typography>
          {convId && (
            <Button
              startIcon={<MailIcon />}
              variant="contained"
              size="large"
              fullWidth
              onClick={messageHandler}
            >
              Message Pengfei
            </Button>
          )}
        </Stack>
      )}
    </PageLayout>
  );
}

export default dynamic(() => Promise.resolve(InstructorSupportPage), {
  ssr: false,
});
