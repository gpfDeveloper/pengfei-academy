import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Menu } from '@mui/material';
import axios from 'axios';
import Spinner from 'components/UIs/Spinner';
import NotificationList from './NotificationList';

export default function NotificationMenu({ anchorEl, isOpen, onClose }) {
  const user = useSelector((state) => state.user);
  const { token } = user;
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const data = await axios.get('/api/user/notification', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLoading(false);
        setNotifications(data.data.notifications.reverse());
      } catch (error) {
        setLoading(false);
      }
    };
    if (isOpen) {
      fetchNotifications();
    }
  }, [token, isOpen]);
  const deleteSingleHandler = async (notiId) => {
    try {
      await axios.delete(`/api/user/notification/item/${notiId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.log(err);
    }
    const newNotis = notifications.filter((noti) => noti.id !== notiId);
    setNotifications(newNotis);
  };
  return (
    <Menu
      anchorEl={anchorEl}
      open={isOpen}
      onClose={onClose}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      PaperProps={{
        sx: {
          width: '300px',
        },
      }}
    >
      {loading && <Spinner />}
      {!loading && (
        <NotificationList
          onDeleteSingle={deleteSingleHandler}
          notifications={notifications}
        />
      )}
    </Menu>
  );
}
