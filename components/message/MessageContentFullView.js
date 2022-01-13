import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import Spinner from 'components/UIs/Spinner';
import MessageContentItems from './MessageContentItems';
import MessageContentInput from './MessageContentInput';
import axios from 'axios';
import MessageContentHeaderFullView from './MessageContentHeaderFullView';

export default function MessageContentFullView({ convId }) {
  const user = useSelector((state) => state.user);
  const { token, id: myId } = user;
  const [isLoadingMsgs, setIsLoadingMsgs] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [targetUserName, setTargetUserName] = useState(null);
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
          setTargetUserName(member2.name);
        } else {
          setTargetUserName(member1.name);
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
  console.log(msgs);
  return (
    <Box sx={{ position: 'relative', height: 680 }}>
      {isLoadingMsgs && <Spinner />}
      {!isLoadingMsgs && (
        <>
          <MessageContentHeaderFullView userName={targetUserName} />
        </>
      )}
      {/* <MessageContentHeader userName={userName} />
      <Box sx={{ mt: 10 }}>
        {isLoadingMsgs && <Spinner />}
        {!isLoadingMsgs && <MessageContentItems items={msgs} />}
      </Box>
      <MessageContentInput onSend={onSend} /> */}
    </Box>
  );
}
