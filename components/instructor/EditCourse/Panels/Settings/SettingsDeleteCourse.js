import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMyCourseAsync } from 'store/course-async';

import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export default function SettingsDeleteCourse() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const course = useSelector((state) => state.course);
  const { id: courseId } = course;
  const user = useSelector((state) => state.user);
  const { token } = user;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteCourseHandler = async () => {
    setOpen(false);
    const isOk = await dispatch(deleteMyCourseAsync({ courseId, token }));
    if (isOk) {
      router.replace('/instructor');
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Button
          variant="outlined"
          color="error"
          size="large"
          sx={{ flex: '0 0 100px', height: 48 }}
          onClick={handleClickOpen}
        >
          Delete
        </Button>
        <Typography>
          We promise students lifetime access, so courses cannot be deleted
          after students have enrolled.
        </Typography>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{'Delete Your Course?'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this course? This is permanent and
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} autoFocus>
            No
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={deleteCourseHandler}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
