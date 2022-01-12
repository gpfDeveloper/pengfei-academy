import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { Box } from '@mui/material';

import ConversationItems from './ConversationItems';

export default function MessageLayout() {
  const { token } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [isLoadingConvs, setIsLoadingConvs] = useState(false);
  const [current, setCurrent] = useState(null);
  const selectConversationHandler = (newValue) => {
    setCurrent(newValue);
  };
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setIsLoadingConvs(true);
        const data = await axios.get('/api/message/conversation', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setConversations(data.data.conversations);
        setIsLoadingConvs(false);
        setCurrent(data.data?.conversations[0]?.id);
      } catch (err) {
        setIsLoadingConvs(false);
      }
    };
    fetchConversations();
  }, [token]);
  return (
    <Box sx={{ display: 'flex' }}>
      <ConversationItems
        isLoading={isLoadingConvs}
        current={current}
        onSelectItem={selectConversationHandler}
        items={conversations}
      />
    </Box>
  );
}
