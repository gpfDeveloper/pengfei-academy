import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import ConversationItemsMobile from './ConversationItemsMobile';

export default function MessageLayoutMobile() {
  const { token } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [isLoadingConvs, setIsLoadingConvs] = useState(false);

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

  return (
    <ConversationItemsMobile isLoading={isLoadingConvs} items={conversations} />
  );
}
