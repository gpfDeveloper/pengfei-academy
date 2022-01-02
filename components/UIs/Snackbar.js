import { forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearSnackbar } from 'store/snackbar';
import dynamic from 'next/dynamic';

import Stack from '@mui/material/Stack';
import MuiSnackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Snackbar() {
  const dispatch = useDispatch();
  const { severity, message } = useSelector((state) => state.snackbar);
  const open = Boolean(message);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(clearSnackbar());
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <MuiSnackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </MuiSnackbar>
    </Stack>
  );
}

export default dynamic(() => Promise.resolve(Snackbar), { ssr: false });
