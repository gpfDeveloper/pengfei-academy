import {
  ListItemButton,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import TimeFromNow from 'components/UIs/TimeFromNow';
import { sliceText } from 'utils';

export default function ConversationItem({
  userName,
  userAvatar,
  lastMsgTime,
  isSendByMe,
  lastMsg,
  onClick,
  current,
  id,
}) {
  return (
    <>
      <ListItemButton
        alignItems="flex-start"
        onClick={onClick.bind(null, id)}
        selected={id === current?.id}
      >
        <ListItemAvatar>
          <Avatar alt={userName} src={userAvatar || '/'} />
        </ListItemAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography>{sliceText(userName, 16)}</Typography>
            <TimeFromNow timestamp={lastMsgTime} />
          </Box>
          <Box>
            {isSendByMe && (
              <Typography
                component="span"
                variant="body2"
                sx={{ fontWeight: 'bold' }}
              >
                Me - &nbsp;
              </Typography>
            )}
            <Typography component="span" variant="body2" color="text.secondary">
              {sliceText(lastMsg, 32)}
            </Typography>
          </Box>
        </Box>
      </ListItemButton>
      <Divider variant="inset" component="li" />
    </>
  );
}
