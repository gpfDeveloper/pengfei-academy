import { Box, Divider, Typography } from '@mui/material';

export default function Pricing() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Typography variant="h4">Pricing</Typography>
      <Divider />
    </Box>
  );
}
