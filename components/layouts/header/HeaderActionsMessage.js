import { useSelector, useDispatch } from 'react-redux';
import { clearUnReadMsgCountAsync } from 'store/user-async';
import { useRouter } from 'next/router';
import { Tooltip, IconButton, Badge } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';

export default function HeaderActionsMessage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { unReadMsgCount, token } = user;
  const router = useRouter();

  const clickButtonHandler = () => {
    router.push('/message');
    dispatch(clearUnReadMsgCountAsync(token));
  };

  return (
    <>
      <Tooltip title="Messages">
        <IconButton size="large" color={'inherit'} onClick={clickButtonHandler}>
          <Badge badgeContent={unReadMsgCount} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
      </Tooltip>
    </>
  );
}
