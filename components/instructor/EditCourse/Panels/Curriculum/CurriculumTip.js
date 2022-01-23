import { useState } from 'react';
import { Alert, AlertTitle } from '@mui/material';

export default function CurriculumTip() {
  const [show, setShow] = useState(true);
  return (
    <>
      {!show && <></>}
      {show && (
        <Alert severity="info" color="primary" onClose={() => setShow(false)}>
          <AlertTitle>Tips</AlertTitle>
          You can <strong>Drag and Drop</strong> to reorder the sections and
          lectures.
        </Alert>
      )}
    </>
  );
}
