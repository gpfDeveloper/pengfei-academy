import { Box, Divider, Typography } from '@mui/material';
import LearningObjective from './LearningObjective';

export default function IntendedLearner() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Typography variant="h4">Intended learners</Typography>
      <Divider />
      <Typography>
        The following descriptions will be publicly visible on your Course
        Landing Page and will have a direct impact on your course performance.
        These descriptions will help learners decide if your course is right for
        them.
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Typography variant="h6">
          What will students learn in your course?
        </Typography>
        <Typography>
          You must enter 4 learning objectives or outcomes that learners can
          expect to achieve after completing your course.
        </Typography>
        <LearningObjective />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Typography variant="h6">
          What are the requirements or prerequisites for taking your course?
        </Typography>
        <Typography>
          List the required skills, experience, tools or equipment learners
          should have prior to taking your course. If there are no requirements,
          use this space as an opportunity to lower the barrier for beginners.
        </Typography>
        <LearningObjective />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Typography variant="h6">Who is this course for?</Typography>
        <Typography>
          Write a clear description of the intended learners for your course who
          will find your course content valuable. This will help you attract the
          right learners to your course.
        </Typography>
        <LearningObjective />
      </Box>
    </Box>
  );
}
