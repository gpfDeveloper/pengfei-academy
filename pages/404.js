import { Stack, Typography } from '@mui/material';
import PageLayout from 'components/layouts/PageLayout';

export default function NotFound() {
  return (
    <PageLayout>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ marginTop: '8rem' }}
      >
        <Typography variant="h1" component="h1">
          Page Not Found.
        </Typography>
      </Stack>
    </PageLayout>
  );
}
