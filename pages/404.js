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
        <Typography variant="h3" component="h1">
          We can&rsquo;t find the page your&rsquo;re looking for
        </Typography>
      </Stack>
    </PageLayout>
  );
}
