import { Box, Divider, Typography } from '@mui/material';
import CourseMsgForm from './CourseMsgForm';

export default function CourseMsg() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Typography variant="h4">Course messages</Typography>
      <Divider />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Typography color="text.secondary">
          Write messages to your students (optional) that will be sent
          automatically when they join your course to encourage students to
          engage with course content. If you do not wish to send a welcome
          message, leave the text box blank.
        </Typography>
        <CourseMsgForm />
      </Box>
    </Box>
  );
}
