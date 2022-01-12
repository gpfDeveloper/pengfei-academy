import { Box } from '@mui/material';
import Spinner from 'components/UIs/Spinner';
import MessageContentItems from './MessageContentItems';
import MessageContentHeader from './MessageContentHeader';
import MessageContentInput from './MessageContentInput';

export default function MessageContent({
  userName,
  isLoadingMsgs,
  msgs,
  onSend,
}) {
  return (
    <Box sx={{ position: 'relative', flex: 1, height: 640 }}>
      <MessageContentHeader userName={userName} />
      <Box sx={{ mt: 10 }}>
        {isLoadingMsgs && <Spinner />}
        {!isLoadingMsgs && <MessageContentItems items={msgs} />}
      </Box>
      <MessageContentInput onSend={onSend} />
    </Box>
  );
}
