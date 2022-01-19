import { Box, Divider, TextField, Typography } from '@mui/material';

export default function CourseMsg() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Typography variant="h4">Course messages</Typography>
      <Divider />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Typography>
          Write messages to your students (optional) that will be sent
          automatically when they join or complete your course to encourage
          students to engage with course content. If you do not wish to send a
          welcome or congratulations message, leave the text box blank.
        </Typography>
        <Box>
          <Typography>Welcome Message</Typography>
          <TextField fullWidth multiline rows={4} />
        </Box>
        <Box>
          <Typography>Congratulation Message</Typography>
          <TextField fullWidth multiline rows={4} />
        </Box>
      </Box>
    </Box>
  );
}
