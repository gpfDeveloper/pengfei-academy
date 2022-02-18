import { useSelector } from 'react-redux';
import NextLink from 'next/link';
import { Box, Divider, Typography, Button } from '@mui/material';
import LandingPageBasicInfo from './LandingPageBasicInfo';
import LandingPageCourseImg from './LandingPageCourseImg';

export default function LandingPage() {
  const course = useSelector((state) => state.course);
  const { id: courseId } = course;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <Typography variant="h4">Course landing page</Typography>
      <Divider />
      <LandingPageBasicInfo />
      <LandingPageCourseImg />
      <NextLink
        href={{ pathname: '/course/draft/[courseId]', query: { courseId } }}
        passHref
      >
        <a target="_blank">
          <Button size="large" variant="outlined">
            Preview
          </Button>
        </a>
      </NextLink>
    </Box>
  );
}
