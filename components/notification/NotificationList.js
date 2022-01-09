import React from 'react';
import { List, ListItem } from '@mui/material';
import NotificationItem from './NotificationItem';

export default function NotificationList({ notifications, onDeleteSingle }) {
  if (notifications.length === 0) {
    return <ListItem>No notication found.</ListItem>;
  }
  return (
    <List>
      {notifications.map((noti) => (
        <ListItem key={noti.id}>
          <NotificationItem
            onDelete={onDeleteSingle.bind(null, noti.id)}
            noti={noti}
          />
        </ListItem>
      ))}
    </List>
  );
}
