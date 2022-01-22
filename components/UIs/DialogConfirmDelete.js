import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

export default function DialogConfirmDelete({
  isOpen,
  onClose,
  onDelete,
  title,
  content,
}) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose} autoFocus>
          No
        </Button>
        <Button variant="outlined" color="error" onClick={onDelete}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
