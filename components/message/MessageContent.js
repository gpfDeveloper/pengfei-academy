import { Box } from '@mui/material';
import Spinner from 'components/UIs/Spinner';
import MessageContentItems from './MessageContentItems';
import MessageContentHeader from './MessageContentHeader';
import MessageContentInput from './MessageContentInput';

export default function MessageContent({
  userName,
  userId,
  isLoadingMsgs,
  msgs,
  onSend,
}) {
  return (
    <Box sx={{ position: 'relative', flex: 1, height: 680 }}>
      <MessageContentHeader userName={userName} userId={userId} />
      <Box sx={{ mt: 10 }}>
        {isLoadingMsgs && <Spinner />}
        {!isLoadingMsgs && <MessageContentItems items={msgs} />}
      </Box>
      <MessageContentInput onSend={onSend} />
    </Box>
  );
}
