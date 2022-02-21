import { useSelector, useDispatch } from 'react-redux';
import { clearUnReadMsgCountAsync } from 'store/user-async';
import { useRouter } from 'next/router';
import { Badge, MenuItem, ListItemIcon, Typography } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';

export default function HeaderActionsMessageMobile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { unReadMsgCount, token } = user;
  const router = useRouter();

  const clickButtonHandler = () => {
    router.push('/message');
    dispatch(clearUnReadMsgCountAsync(token));
  };

  return (
    <MenuItem onClick={clickButtonHandler}>
      <ListItemIcon>
        <Badge badgeContent={unReadMsgCount} color="error" fontSize="small">
          <MailIcon />
        </Badge>
      </ListItemIcon>
      <Typography variant="inherit">Message</Typography>
    </MenuItem>
  );
}
