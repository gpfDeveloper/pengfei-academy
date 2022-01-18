import { useRouter } from 'next/router';

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from '@mui/material';

import { CREATE_COURSE_STATUS_REVERSE } from 'utils/constants';

export default function InstructorCourseItem({ item }) {
  const { id, title, thumbnail, status } = item;
  const router = useRouter();
  const clickHandler = () => {
    router.push(`/instructor/course/${id}`);
  };
  return (
    <Card sx={{ height: 140 }}>
      <CardActionArea onClick={clickHandler}>
        <Box sx={{ display: 'flex' }}>
          <CardMedia
            sx={{ flex: '0 0', height: 140, width: 140 }}
            component="img"
            // height="140"
            image={thumbnail ? thumbnail : '/image-placeholder.svg'}
            alt={title}
          />
          <CardContent sx={{ flex: '1 1' }}>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {CREATE_COURSE_STATUS_REVERSE[status]}
            </Typography>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
}
