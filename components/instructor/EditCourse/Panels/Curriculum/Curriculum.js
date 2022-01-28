import NextLink from 'next/link';
import { useSelector } from 'react-redux';
import { Box, Button, Divider, Typography } from '@mui/material';
import Tips from 'components/UIs/Tips';
import CourseSectionItems from './CourseSection/CourseSectionItems';

export default function Curriculum() {
  const course = useSelector((state) => state.course);
  const { id: courseId } = course;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Typography variant="h4">Curriculum</Typography>
      <Divider />
      <Typography color="text.secondary">
        Here’s where you add course content—like lectures, course sections.
      </Typography>
      <Tips
        content={
          <>
            You can <strong>Drag and Drop</strong> to reorder the sections and
            lectures.
          </>
        }
      />

      <CourseSectionItems />
      <NextLink
        href={{
          pathname: '/course/draft/[courseId]/learn',
          query: { courseId },
        }}
        passHref
      >
        <a target="_blank">
          <Button
            variant="outlined"
            sx={{ alignSelf: 'flex-start' }}
            size="large"
          >
            Preview
          </Button>
        </a>
      </NextLink>
    </Box>
  );
}
