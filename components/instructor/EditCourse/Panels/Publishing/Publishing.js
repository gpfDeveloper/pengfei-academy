import { Box, Divider, Typography } from '@mui/material';
import PublishingSubmitForReview from './PublishingSubmitForReview';

export default function Publishing() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Typography variant="h4">Publishing</Typography>
      <Divider />
      <PublishingSubmitForReview />
    </Box>
  );
}
