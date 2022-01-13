import { useRouter } from 'next/router';
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

export default function ConversationItemMobile({
  userName,
  lastMsgTime,
  isSendByMe,
  lastMsg,
  id,
}) {
  const router = useRouter();
  const clickHandler = () => {
    router.push(`/message/${id}`);
  };
  return (
    <>
      <ListItemButton alignItems="flex-start" onClick={clickHandler}>
        <ListItemAvatar>
          <Avatar alt={userName} src="/" />
        </ListItemAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography>{sliceText(userName, 32)}</Typography>
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
              {sliceText(lastMsg, 64)}
            </Typography>
          </Box>
        </Box>
      </ListItemButton>
      <Divider variant="inset" component="li" />
    </>
  );
}
