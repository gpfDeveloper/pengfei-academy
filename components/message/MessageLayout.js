import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { Box } from '@mui/material';

import ConversationItems from './ConversationItems';
import MessageContent from './MessageContent';

export default function MessageLayout() {
  const { token, id: myId } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [isLoadingConvs, setIsLoadingConvs] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [isLoadingMsgs, setIsLoadingMsgs] = useState(false);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setIsLoadingConvs(true);
        const data = await axios.get('/api/message/conversation', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setConversations(data.data.conversations);
        setIsLoadingConvs(false);
      } catch (err) {
        setIsLoadingConvs(false);
      }
    };
    fetchConversations();
  }, [token]);

  const selectConversationHandler = (convId) => {
    const current = conversations.find((item) => item.id === convId);
    setCurrent(current);
    const fetchMsgs = async () => {
      try {
        setIsLoadingMsgs(true);
        const data = await axios.get(`/api/message/conversation/${convId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
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
  };

  const sendMsgHandler = async (text) => {
    const receiverId = current.userId;
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
    <Box sx={{ display: 'flex' }}>
      <ConversationItems
        isLoading={isLoadingConvs}
        current={current}
        onSelectItem={selectConversationHandler}
        items={conversations}
      />
      {current && (
        <MessageContent
          userName={current.userName}
          isLoadingMsgs={isLoadingMsgs}
          msgs={msgs}
          onSend={sendMsgHandler}
        />
      )}
    </Box>
  );
}
