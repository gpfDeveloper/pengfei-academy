import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackbar } from 'store/snackbar';
import { styled } from '@mui/material/styles';
import { Card, CardMedia, Box, Stack, Button, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import ImageIcon from '@mui/icons-material/Image';
import axios from 'axios';

const IMAGE_WIDTH = 750;
const IMAGE_HEIGHT = 422;

const Input = styled('input')({ display: 'none' });

export default function LandingPageCourseImg() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const course = useSelector((state) => state.course);
  const { id: courseId } = course;
  const { token } = user;
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [courseImageUrl, setCourseImageUrl] = useState(null);

  useEffect(() => {
    const fetchCourseImageUrl = async () => {
      const data = await axios.get(
        `/api/instructor/course/${courseId}/courseImageUrl`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCourseImageUrl(data.data.url);
    };
    fetchCourseImageUrl();
  }, []);

  const uploadHandler = async (e) => {
    setLoading(true);
    setErrorMsg('');
    let file = e.target.files[0];
    if (!file) {
      setLoading(false);
      setErrorMsg('');
      return;
    }
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function () {
      if (this.width !== IMAGE_WIDTH || this.height !== IMAGE_HEIGHT) {
        setErrorMsg(
          `Image width should be ${IMAGE_WIDTH} pixels, and height should be ${IMAGE_HEIGHT} pixels`
        );
        setLoading(false);
      } else {
        const formData = new FormData();
        formData.append('image', file);
        axios
          .put(
            `/api/instructor/course/${courseId}/uploadCourseImage`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((data) => {
            setCourseImageUrl(data.data.url);
            setLoading(false);
            dispatch(
              setSnackbar({
                severity: 'success',
                message: 'Update image success.',
              })
            );
          })
          .catch((err) => {
            console.log(err);
            dispatch(
              setSnackbar({
                severity: 'error',
                message: 'Update image failed, please try again later',
              })
            );
            setLoading(false);
          });
      }
      URL.revokeObjectURL(url);
      return true;
    };
  };

  return (
    <Stack sx={{ gap: 2 }}>
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Course image
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Upload your course image here. 750*422 pixels;.jpg, .jpeg,. gif, or
          .png.
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
        <CardMedia
          sx={{ height: '100%', width: '100%' }}
          component="img"
          image={courseImageUrl ? courseImageUrl : '/image-placeholder.svg'}
          // alt={item.title}
        />
      </Card>
      {errorMsg && <Typography color="error">{errorMsg}</Typography>}
      <Box>
        <label htmlFor="contained-button-file-course-img">
          <Input
            onChange={uploadHandler}
            id="contained-button-file-course-img"
            accept="image/jpg,image/jpeg,image/gif,image/png"
            type="file"
            disabled={loading}
          />
          {!loading && (
            <Button
              variant="contained"
              size="large"
              component="span"
              startIcon={<ImageIcon />}
            >
              Upload Image
            </Button>
          )}
        </label>
        {loading && (
          <LoadingButton
            startIcon={<ImageIcon />}
            loading
            loadingPosition="start"
            variant="outlined"
            size="large"
          >
            Upload Image
          </LoadingButton>
        )}
      </Box>
    </Stack>
  );
}
