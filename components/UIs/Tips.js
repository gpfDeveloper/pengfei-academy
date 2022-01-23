import { useState } from 'react';
import { Alert, AlertTitle } from '@mui/material';

export default function Tips({ content }) {
  const [show, setShow] = useState(true);
  return (
    <>
      {!show && <></>}
      {show && (
        <Alert severity="info" color="primary" onClose={() => setShow(false)}>
          <AlertTitle>Tips</AlertTitle>
          {content}
        </Alert>
      )}
    </>
  );
}
