import { Box, Typography, Button } from '@mui/material';
import CourseItems from 'components/course/items/CourseItems';
import { useRouter } from 'next/router';

export default function FeaturedCourses({ items }) {
  const router = useRouter();
  const viewAllCourseHandler = () => {
    router.push('/course');
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">Featured Courses</Typography>
      <CourseItems items={items} />
      <Button
        onClick={viewAllCourseHandler}
        sx={{ alignSelf: 'flex-start' }}
        variant="outlined"
        size="large"
      >
        View All Courses
      </Button>
    </Box>
  );
}
