import { forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from 'store/notification';
import dynamic from 'next/dynamic';

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Notification() {
  const dispatch = useDispatch();
  const { severity, message } = useSelector((state) => state.notification);
  const open = Boolean(message);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(clearNotification());
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default dynamic(() => Promise.resolve(Notification), { ssr: false });
