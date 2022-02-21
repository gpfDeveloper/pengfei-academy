import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearUnReadNotificationCountAsync } from 'store/user-async';
import { Badge, MenuItem, ListItemIcon, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationMenu from 'components/notification/NotificationMenu';

export default function HeaderActionsNotificationMobile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { unReadNotificationCount, token } = user;

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const clickButtonHandler = (e) => {
    dispatch(clearUnReadNotificationCountAsync(token));
    setAnchorEl(e.currentTarget);
  };

  const closeHandler = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <MenuItem onClick={clickButtonHandler}>
        <ListItemIcon>
          <Badge
            badgeContent={unReadNotificationCount}
            color="error"
            fontSize="small"
          >
            <NotificationsIcon />
          </Badge>
        </ListItemIcon>
        <Typography variant="inherit">Notification</Typography>
      </MenuItem>
      <NotificationMenu
        anchorEl={anchorEl}
        isOpen={isOpen}
        onClose={closeHandler}
      />
    </>
  );
}
