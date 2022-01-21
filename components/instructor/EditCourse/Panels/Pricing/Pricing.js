import { Box, Divider, Typography } from '@mui/material';
import PricingForm from './PricingForm';

export default function Pricing() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Typography variant="h4">Pricing</Typography>
      <Divider />
      <PricingForm />
    </Box>
  );
}
