import { Box, Divider, Typography } from '@mui/material';

export default function Curriculum() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Typography variant="h4">Curriculum</Typography>
      <Divider />
      <Typography>
        Here’s where you add course content—like lectures, course sections,
        assignments, and more. Click a + icon on the left to get started.
      </Typography>
    </Box>
  );
}
