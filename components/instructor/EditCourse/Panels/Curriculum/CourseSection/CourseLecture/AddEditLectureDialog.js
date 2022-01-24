import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Box,
  Select,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import VideocamIcon from '@mui/icons-material/Videocam';

import { COURSE_CONTENT_TYPE } from 'utils/constants';
const contentTypes = Object.keys(COURSE_CONTENT_TYPE);

const TITLE_MAX_LENGTH = 80;

const Input = styled('input')({
  display: 'none',
});

export default function AddEditLectureDialog({
  isOpen,
  onSave,
  onCancel,
  title,
  contentType,
}) {
  const isEdit = Boolean(title);
  const dialogTitle = isEdit ? 'Edit Lecture' : 'Create Lecture';
  const [hasError, setHasError] = useState(false);
  const [inputTitle, setInputTitle] = useState(title || '');
  const [inputContentType, setInputContentType] = useState(contentType || '');
  const [loading, setLoading] = useState(false);
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
        <TextField
          autoFocus
          margin="dense"
          label="Lecture title"
          fullWidth
          variant="standard"
          error={hasError}
          placeholder="Enter a title"
          helperText={
            hasError &&
            `Lecture title at most have ${TITLE_MAX_LENGTH} charactors.`
          }
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
        />
        <Box display={isEdit ? 'block' : 'none'}>
          <FormControl sx={{ mt: 2, width: 200 }}>
            <InputLabel id="content-type">Content type</InputLabel>
            <Select
              labelId="content-type"
              label="Content type"
              value={inputContentType}
              onChange={(e) => setInputContentType(e.target.value)}
            >
              {contentTypes.map((t) => (
                <MenuItem key={t} value={t}>
                  {COURSE_CONTENT_TYPE[t]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box
            sx={{
              mt: 2,
              display: inputContentType === 'article' ? 'block' : 'none',
            }}
          >
            <TextField
              autoFocus
              multiline
              rows={4}
              label="article"
              fullWidth
              error={hasError}
              helperText={
                hasError &&
                `Lecture title at most have ${TITLE_MAX_LENGTH} charactors.`
              }
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: inputContentType === 'video' ? 'flex' : 'none',
              flexDirection: 'column',
              gap: 1,
              mt: 2,
            }}
          >
            <TextField
              name="video"
              label="Video"
              variant="filled"
              // value={imageURL}
              disabled
            />
            <label htmlFor="contained-button-file">
              <Input
                // onChange={uploadHandler}
                id="contained-button-file"
                accept="image/*"
                type="file"
                // disabled={loading}
              />
              {!loading && (
                <Button
                  variant="contained"
                  size="large"
                  component="span"
                  startIcon={<VideocamIcon />}
                >
                  Upload Video
                </Button>
              )}
            </label>
            {loading && (
              <LoadingButton
                startIcon={<VideocamIcon />}
                loading
                loadingPosition="start"
                variant="outlined"
                size="large"
              >
                Upload Video
              </LoadingButton>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelHandler}>Cancel</Button>
        <Button onClick={saveHandler}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
