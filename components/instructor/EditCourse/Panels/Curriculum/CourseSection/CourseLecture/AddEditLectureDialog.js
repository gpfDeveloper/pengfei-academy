import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
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

const Input = styled('input')({
  display: 'none',
});

export default function AddEditLectureDialog({
  isOpen,
  onSave,
  onCancel,
  title,
  contentType,
  article,
}) {
  const isEdit = Boolean(title);
  const dialogTitle = isEdit ? 'Edit Lecture' : 'Create Lecture';
  const [loading, setLoading] = useState(false);
  const {
    formState: { errors },
    handleSubmit,
    watch,
    control,
  } = useForm();

  const [inputContentType] = watch(['contentType']);

  const saveHandler = ({ title, contentType, article }) => {
    onSave({ title, contentType, article });
  };

  const cancelHandler = () => {
    onCancel();
  };

  const uploadVideoHandler = async () => {
    setLoading(true);
    console.log('uploading...');
  };

  let showArticleInput = false;
  if (inputContentType === 'article') {
    showArticleInput = true;
  }
  if (!inputContentType && contentType === 'article') {
    showArticleInput = true;
  }

  let showVideoInput = false;
  if (inputContentType === 'video') {
    showVideoInput = true;
  }
  if (!inputContentType && contentType === 'video') {
    showVideoInput = true;
  }

  return (
    <Dialog open={isOpen} onClose={onCancel} fullWidth fullScreen={isEdit}>
      <Box component="form" onSubmit={handleSubmit(saveHandler)}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <Controller
            name="title"
            defaultValue={title || ''}
            control={control}
            rules={{ required: true, maxLength: 80 }}
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                label="Lecture title"
                fullWidth
                variant="standard"
                error={Boolean(errors.title)}
                placeholder="Enter a lecture title"
                helperText={
                  errors.title &&
                  (errors.title.type === 'required'
                    ? 'Please enter a lecutre title'
                    : `Lecture title at most have 80 charactors.`)
                }
                {...field}
              />
            )}
          />
          <Box display={isEdit ? 'block' : 'none'}>
            <FormControl sx={{ mt: 2, width: 200 }}>
              <InputLabel id="content-type">Content type</InputLabel>

              <Controller
                name="contentType"
                defaultValue={contentType || ''}
                control={control}
                render={({ field }) => (
                  <Select
                    labelId="content-type"
                    label="Content type"
                    {...field}
                  >
                    {contentTypes.map((t) => (
                      <MenuItem key={t} value={t}>
                        {COURSE_CONTENT_TYPE[t]}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
            <Box
              sx={{
                mt: 2,
                display: showArticleInput ? 'block' : 'none',
              }}
            >
              <Controller
                name="article"
                defaultValue={article || ''}
                control={control}
                rules={{ maxLength: 6000 }}
                render={({ field }) => (
                  <TextField
                    autoFocus
                    multiline
                    minRows={4}
                    label="article"
                    fullWidth
                    error={Boolean(errors.article)}
                    helperText={
                      errors.article &&
                      `Article title at most have 6000 charactors.`
                    }
                    {...field}
                  />
                )}
              />
            </Box>
            <Box
              sx={{
                display: showVideoInput ? 'flex' : 'none',
                flexDirection: 'column',
                gap: 1,
                mt: 2,
              }}
            >
              <TextField
                name="video"
                label="Video"
                defaultValue=""
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
                    onClick={uploadVideoHandler}
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
                  sx={{ alignSelf: 'flex-start' }}
                >
                  Upload Video
                </LoadingButton>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelHandler}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
