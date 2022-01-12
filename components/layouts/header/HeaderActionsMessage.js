import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Tooltip, IconButton, Badge } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';

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
            <MailIcon />
          </Badge>
        </IconButton>
      </Tooltip>
    </>
  );
}
