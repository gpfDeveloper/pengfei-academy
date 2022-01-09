import React from 'react';
import { MenuItem } from '@mui/material';
import NotificationItem from './NotificationItem';

export default function NotificationList({ notifications }) {
  if (notifications.length === 0) {
    return <MenuItem>No notication found.</MenuItem>;
  }
  return notifications.map((noti) => (
    <MenuItem key={noti.id} sx={{ cursor: 'auto' }}>
      <NotificationItem noti={noti} />
    </MenuItem>
  ));
}
