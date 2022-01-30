import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Button, Stack, Typography } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import axios from 'axios';

export default function PublishingReviewing() {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const { name, token } = user;
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
    <Stack sx={{ maxWidth: 800, margin: '0 auto', gap: '4rem' }}>
      <Typography component="h3" variant="h6">
        {`Hi ${name}, this is Pengfei and your course is under review. Feel free to message me if you have any question.`}
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
  );
}
