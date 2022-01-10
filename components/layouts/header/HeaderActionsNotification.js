import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearUnReadNotificationCountAsync,
  getUnReadNotificationCountAsync,
} from 'store/user-async';
import { Tooltip, IconButton, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationMenu from 'components/notification/NotificationMenu';

export default function HeaderActionsNotification() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { unReadNotificationCount, token } = user;

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  useEffect(() => {
    dispatch(getUnReadNotificationCountAsync(token));
  }, [token, dispatch]);

  const clickButtonHandler = (e) => {
    dispatch(clearUnReadNotificationCountAsync(token));
    setAnchorEl(e.currentTarget);
  };

  const closeHandler = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          size="large"
          color={isOpen ? 'primary' : 'inherit'}
          onClick={clickButtonHandler}
        >
          <Badge badgeContent={unReadNotificationCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <NotificationMenu
        anchorEl={anchorEl}
        isOpen={isOpen}
        onClose={closeHandler}
      />
    </>
  );
}
