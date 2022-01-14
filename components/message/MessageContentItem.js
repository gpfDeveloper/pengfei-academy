import { Card, Typography } from '@mui/material';
import TimeFromNow from 'components/UIs/TimeFromNow';

export default function MessageContentItem({ text, sendTime, isSendByMe }) {
  return (
    <Card
      sx={{
        alignSelf: isSendByMe ? 'flex-end' : 'flex-start',
        padding: 2,
        overflow: 'initial',
        maxWidth: '70%',
      }}
    >
      <TimeFromNow timestamp={sendTime} />
      <Typography mt={1}>{text}</Typography>
    </Card>
  );
}
