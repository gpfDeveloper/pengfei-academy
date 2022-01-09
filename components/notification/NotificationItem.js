import { Divider } from '@mui/material';
import React from 'react';

export default function NotificationItem({ noti }) {
  return (
    <>
      {noti.message}
      <Divider />
    </>
  );
}
