import { Box } from '@mui/material';
import MessageContentItem from './MessageContentItem';

export default function MessageContentItems({ items }) {
  console.log(items);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, ml: 2 }}>
      {items.map((item) => (
        <MessageContentItem
          key={item.id}
          text={item.text}
          sendTime={item.sendTime}
          isSendByMe={item.isSendByMe}
        />
      ))}
    </Box>
  );
}
