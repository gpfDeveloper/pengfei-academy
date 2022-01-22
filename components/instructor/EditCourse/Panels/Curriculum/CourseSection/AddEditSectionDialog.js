import { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const TITLE_MAX_LENGTH = 80;

export default function AddEditSectionDialog({
  isOpen,
  onSave,
  onCancel,
  title,
}) {
  const dialogTitle = title ? 'Edit Section' : 'Create Section';
  const [hasError, setHasError] = useState(false);
  const [inputTitle, setInputTitle] = useState(title || '');
  const saveHandler = () => {
    if (inputTitle && !hasError) {
      onSave(inputTitle);
    }
  };
  const cancelHandler = () => {
    setHasError(false);
    setInputTitle(title || '');
    onCancel();
  };
  useEffect(() => {
    if (inputTitle.length > TITLE_MAX_LENGTH) {
      setHasError(true);
    }
    if (hasError && inputTitle.length < TITLE_MAX_LENGTH) {
      setHasError(false);
    }
  }, [inputTitle, hasError]);

  return (
    <Dialog open={isOpen} onClose={onCancel} fullWidth>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>Please enter a section title</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Section title"
          fullWidth
          variant="standard"
          error={hasError}
          helperText={
            hasError &&
            `Section title at most have ${TITLE_MAX_LENGTH} charactors.`
          }
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelHandler}>Cancel</Button>
        <Button onClick={saveHandler}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
