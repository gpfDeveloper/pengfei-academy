import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import Spinner from 'components/UIs/Spinner';
import MessageContentItems from './MessageContentItems';
import MessageContentInput from './MessageContentInput';
import axios from 'axios';
import MessageContentFullViewHeader from './MessageContentFullViewHeader';

export default function MessageContentFullView({ convId }) {
  const user = useSelector((state) => state.user);
  const { token, id: myId } = user;
  const [isLoadingMsgs, setIsLoadingMsgs] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [targetUser, setTargetUser] = useState({});
  useEffect(() => {
    const fetchMsgs = async () => {
      try {
        setIsLoadingMsgs(true);
        const data = await axios.get(`/api/message/conversation/${convId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const member1 = data.data.member1;
        const member2 = data.data.member2;
        if (member1.id === myId) {
          setTargetUser({ ...member2 });
        } else {
          setTargetUser({ ...member1 });
        }
        setMsgs(
          data.data.messages.map((msg) => ({
            ...msg,
            isSendByMe: myId === msg.senderId,
          }))
        );
        setIsLoadingMsgs(false);
      } catch (err) {
        setIsLoadingMsgs(false);
      }
    };
    fetchMsgs();
  }, [convId, myId, token]);
  const sendMsgHandler = async (text) => {
    const receiverId = targetUser.id;
    const data = await axios.post(
      '/api/message',
      { receiverId, text },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const msg = data.data.message;
    setMsgs((prev) => {
      return [...prev, { ...msg, isSendByMe: true }];
    });
  };
  return (
    <Box sx={{ position: 'relative', height: 680 }}>
      {isLoadingMsgs && <Spinner />}
      {!isLoadingMsgs && (
        <>
          <MessageContentFullViewHeader
            userName={targetUser.name}
            userId={targetUser.id}
          />
          <Box sx={{ mt: 10 }}>
            <MessageContentItems items={msgs} />
          </Box>
          <MessageContentInput onSend={sendMsgHandler} />
        </>
      )}
    </Box>
  );
}
