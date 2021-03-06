import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uploadVideoLecture } from 'store/course';
import { setSnackbar } from 'store/snackbar';
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
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import VideocamIcon from '@mui/icons-material/Videocam';

import { COURSE_CONTENT_TYPE } from 'utils/constants';
import axios from 'axios';
import LinearProgressWithLabel from 'components/UIs/LinearProgressWithLabel';
const contentTypes = Object.keys(COURSE_CONTENT_TYPE);

const Input = styled('input')({
  display: 'none',
});

// 1G
const MAX_VIDEO_SIZE = 1024 * 1024 * 1024;

export default function AddEditLectureDialog({
  isOpen,
  onSave,
  onCancel,
  title,
  courseId,
  _videoFileName,
  sectionId,
  lectureId,
  contentType,
  article,
}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { token } = user;
  const isEdit = Boolean(title);
  const dialogTitle = isEdit ? 'Edit Lecture' : 'Create Lecture';
  const [videoFileName, setVideoFileName] = useState(_videoFileName);
  const [isVidoeTooBig, setIsVideoTooBig] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
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

  const uploadVideoHandler = async (e) => {
    setLoading(true);
    setIsVideoTooBig(false);
    const file = e.target.files[0];
    if (!file) {
      setLoading(false);
      setIsVideoTooBig(false);
      return;
    }
    if (file.size > MAX_VIDEO_SIZE) {
      setLoading(false);
      setIsVideoTooBig(true);
      return;
    }
    setVideoFileName(file.name);
    const formData = new FormData();
    formData.append('lectureVideo', file);
    try {
      await axios.put(
        `/api/instructor/course/${courseId}/section/${sectionId}/lecture/${lectureId}/uploadVideo`,
        formData,
        {
          onUploadProgress: (e) => {
            setUploadProgress((e.loaded / e.total) * 100 - 1);
          },
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUploadProgress(100);
      setLoading(false);
      dispatch(
        setSnackbar({ severity: 'success', message: 'Upload success.' })
      );
      dispatch(
        uploadVideoLecture({ sectionId, lectureId, videoFileName: file.name })
      );
    } catch (err) {
      dispatch(
        setSnackbar({
          severity: 'error',
          message: 'Upload failed, please try again later.',
        })
      );
      setLoading(false);
    }
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
                variant="filled"
                value={videoFileName || ''}
                disabled
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6">Note:</Typography>
                <Typography>
                  All files should be in .mp4 format and at least 720p and less
                  than 1.0 GB.
                </Typography>
              </Box>
              {isVidoeTooBig && (
                <Typography color="error">
                  Video file must less than 1.0 GB
                </Typography>
              )}
              {Boolean(uploadProgress) && (
                <Box sx={{ mt: 1, mb: 1 }}>
                  <LinearProgressWithLabel value={uploadProgress} />
                </Box>
              )}
              <label htmlFor="contained-button-file">
                <Input
                  onChange={uploadVideoHandler}
                  id="contained-button-file"
                  accept="video/mp4"
                  type="file"
                  disabled={loading}
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
                  sx={{ alignSelf: 'flex-start' }}
                >
                  Upload Video
                </LoadingButton>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelHandler} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            Save
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
