import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Tooltip, IconButton, Badge } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';

export default function HeaderActionsMessage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const clickButtonHandler = () => {
    router.push('/message');
    // dispatch(clearUnReadNotificationCountAsync(token));
    // setAnchorEl(e.currentTarget);
  };

  return (
    <>
      <Tooltip title="Messages">
        <IconButton size="large" color={'inherit'} onClick={clickButtonHandler}>
          <Badge badgeContent={2} color="error">
            <MessageIcon />
          </Badge>
        </IconButton>
      </Tooltip>
    </>
  );
}
