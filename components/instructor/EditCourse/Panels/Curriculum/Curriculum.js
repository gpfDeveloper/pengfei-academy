import { Box, Divider, Typography } from '@mui/material';
import CourseSectionItems from './CourseSection/CourseSectionItems';

export default function Curriculum() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Typography variant="h4">Curriculum</Typography>
      <Divider />
      <Typography color="text.secondary">
        Here’s where you add course content—like lectures, course sections.
      </Typography>
      <CourseSectionItems />
    </Box>
  );
}
