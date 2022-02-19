import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackbar } from 'store/snackbar';
import { styled } from '@mui/material/styles';
import { Card, Box, Stack, Button, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import VideocamIcon from '@mui/icons-material/Videocam';
import axios from 'axios';
import LinearProgressWithLabel from 'components/UIs/LinearProgressWithLabel';
import VideoPlayer from 'components/UIs/VideoPlayer';

// 1G
const MAX_VIDEO_SIZE = 1024 * 1024 * 1024;

const Input = styled('input')({ display: 'none' });

export default function LandingPagePromotionVideo() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const course = useSelector((state) => state.course);
  const { id: courseId } = course;
  const { token } = user;
  const [loading, setLoading] = useState(false);
  const [isVidoeTooBig, setIsVideoTooBig] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [coursePromoVideoUrl, setCoursePromoVideoUrl] = useState(null);

  useEffect(() => {
    const fetchCoursePromoVideoUrl = async () => {
      const data = await axios.get(
        `/api/instructor/course/${courseId}/promoVideoUrl`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCoursePromoVideoUrl(data.data.url);
    };
    fetchCoursePromoVideoUrl();
  }, []);

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
    const formData = new FormData();
    formData.append('video', file);
    try {
      const data = await axios.put(
        `/api/instructor/course/${courseId}/uploadPromoVideo`,
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
      setCoursePromoVideoUrl(data.data.url);
      setTimeout(() => setUploadProgress(0), 3000);
    } catch (err) {
      setUploadProgress(0);
      dispatch(
        setSnackbar({
          severity: 'error',
          message: 'Upload failed, please try again later.',
        })
      );
      setLoading(false);
    }
  };

  return (
    <Stack sx={{ gap: 2 }}>
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Promotional video
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Video file should be in .mp4 format and at least 720p and less than
          1.0 GB.
        </Typography>
      </Box>
      <Card
        sx={{
          border: '1px solid',
          borderColor: 'text.disabled',
          width: 375,
          height: 211,
        }}
      >
        <VideoPlayer height="100%" width="100%" url={coursePromoVideoUrl} />
      </Card>
      {isVidoeTooBig && (
        <Typography color="error">Video file must less than 1.0 GB</Typography>
      )}
      {Boolean(uploadProgress) && (
        <Box sx={{ mt: 1, mb: 1 }}>
          <LinearProgressWithLabel value={uploadProgress} />
        </Box>
      )}
      <Box>
        <label htmlFor="contained-button-file-promo-video">
          <Input
            onChange={uploadVideoHandler}
            id="contained-button-file-promo-video"
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
              Upload video
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
            Upload video
          </LoadingButton>
        )}
      </Box>
    </Stack>
  );
}
