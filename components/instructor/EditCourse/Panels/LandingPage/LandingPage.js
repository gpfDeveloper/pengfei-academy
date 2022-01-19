import { Box, Divider, Typography } from '@mui/material';

export default function LandingPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Typography variant="h4">Course landing page</Typography>
      <Divider />
    </Box>
  );
}
