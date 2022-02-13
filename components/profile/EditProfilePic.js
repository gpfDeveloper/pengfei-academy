import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackbar } from 'store/snackbar';
import { styled } from '@mui/material/styles';
import { Avatar, Box, Stack, Button, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      200,
      200,
      'JPEG',
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      'base64'
    );
  });

const MAX_PIC_SIZE = 1024 * 1024 * 1;

const Input = styled('input')({ display: 'none' });

export default function EditProfilePic() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { token } = user;
  const [loading, setLoading] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imgBase64, setImgBase64] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const previewHandler = async (e) => {
    setErrorMsg('');
    setPreviewUrl(null);
    setLoading(true);
    let pic = e.target.files[0];
    if (!pic) return;
    if (pic.size > MAX_PIC_SIZE) {
      setErrorMsg(`${pic.name} is too large, maximum file size is 1.0MB.`);
      setLoading(false);
      return;
    }

    const picUrl = URL.createObjectURL(pic);
    pic = await resizeFile(pic);
    setImgBase64(pic);
    setPreviewUrl(picUrl);
    setCanSave(true);
    setLoading(false);
  };
  const saveHandler = async () => {
    if (!imgBase64) {
      return;
    }
    setLoading(true);
    try {
      await axios.put(
        '/api/profile/avatar',
        { imgBase64 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(
        setSnackbar({ severity: 'success', message: 'Update image success.' })
      );
      setLoading(false);
    } catch (err) {
      dispatch(
        setSnackbar({
          severity: 'error',
          message: 'Update image failed, please try again later',
        })
      );
      setLoading(false);
    }
  };
  return (
    <Stack sx={{ gap: 2 }}>
      <Box>
        <Typography fontWeight="bold" sx={{ mb: 1 }}>
          Image preview
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Maximum size 1MB
        </Typography>
      </Box>
      <Box
        sx={{
          padding: 2,
          border: '1px solid',
          borderColor: 'text.disabled',
          maxWidth: 600,
          height: 200,
        }}
      >
        <Avatar
          src={previewUrl}
          sx={{ height: 160, width: 160, margin: '0 auto' }}
        />
      </Box>
      {errorMsg && <Typography color="error">{errorMsg}</Typography>}
      <Box>
        <label htmlFor="contained-button-file">
          <Input
            onChange={previewHandler}
            id="contained-button-file"
            accept="image/*"
            type="file"
            disabled={loading}
          />
          {!loading && (
            <Button
              variant="contained"
              size="large"
              component="span"
              startIcon={<PhotoCameraIcon />}
            >
              Upload Image
            </Button>
          )}
        </label>
        {loading && (
          <LoadingButton
            startIcon={<PhotoCameraIcon />}
            loading
            loadingPosition="start"
            variant="outlined"
            size="large"
          >
            Upload Image
          </LoadingButton>
        )}
      </Box>
      <Box sx={{ mt: 4 }}>
        {!loading && (
          <Button
            variant="contained"
            size="large"
            onClick={saveHandler}
            disabled={!canSave}
          >
            Save
          </Button>
        )}
        {loading && (
          <LoadingButton
            startIcon={<PhotoCameraIcon />}
            loading
            loadingPosition="start"
            variant="outlined"
            size="large"
          >
            Saving
          </LoadingButton>
        )}
      </Box>
    </Stack>
  );
}
