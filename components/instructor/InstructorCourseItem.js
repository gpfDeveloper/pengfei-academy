import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from '@mui/material';

const reviewStatusMap = {
  Reviewing: 'Change in review',
  Approved: '',
  'Needs Fixes': 'Needs Fixes',
};

export default function InstructorCourseItem({ item }) {
  const {
    id,
    title,
    thumbnail,
    isPublished,
    reviewStatus,
    price,
    numOfStudents,
  } = item;
  const theme = useTheme();
  const isBelowSm = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const clickHandler = () => {
    router.push(`/instructor/course/${id}`);
  };
  return (
    <Card>
      <CardActionArea onClick={clickHandler}>
        <Box
          sx={{ display: 'flex', flexDirection: isBelowSm ? 'column' : 'row' }}
        >
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
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {isPublished ? 'PUBLISHED' : 'DRAFT'}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textTransform: 'uppercase' }}
              >
                {reviewStatusMap[reviewStatus]}
              </Typography>
              {numOfStudents !== 0 && (
                <Typography variant="body2" color="text.secondary">
                  {numOfStudents} students
                </Typography>
              )}
            </Box>
          </CardContent>
          {price !== undefined && (
            <Typography variant="h6" sx={{ padding: 2 }}>
              {price === 0 ? 'Free' : `$${price}`}
            </Typography>
          )}
        </Box>
      </CardActionArea>
    </Card>
  );
}
