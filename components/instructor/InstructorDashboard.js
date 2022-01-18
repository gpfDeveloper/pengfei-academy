import { Box, Divider } from '@mui/material';
import CreateCourseBtn from './CreateCourseBtn';
import InstructorCourseItems from './InstructorCourseItems';

export default function InstructorDashboard() {
  return (
    <Box
      sx={{
        margin: '8rem 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '4rem',
      }}
    >
      <CreateCourseBtn />
      <Divider />
      <InstructorCourseItems />
    </Box>
  );
}
