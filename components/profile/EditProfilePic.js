import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Avatar, Box, Stack, Button, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const MAX_PIC_SIZE = 1024 * 1024;

const Input = styled('input')({ display: 'none' });

export default function EditProfilePic() {
  const [loading, setLoading] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const previewHandler = (e) => {
    setErrorMsg('');
    setPreviewUrl(null);
    setLoading(true);
    const pic = e.target.files[0];
    if (pic.size > MAX_PIC_SIZE) {
      setErrorMsg(`${pic.name} is too large, maximum file size is 1.0MB.`);
      setLoading(false);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
      setCanSave(true);
      setLoading(false);
    };
    fileReader.readAsDataURL(pic);
  };
  const saveHandler = () => {};
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
