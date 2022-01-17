import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { Box, Button } from '@mui/material';

function HeaderNavsInstructorView() {
  const router = useRouter();
  const { pathname } = router;
  return (
    <Box
      sx={{
        display: { lg: 'flex', md: 'none', xs: 'none', gap: 2 },
      }}
    >
      <Button
        color={'/instructor' === pathname ? 'primary' : 'inherit'}
        onClick={() => router.push('/instructor')}
      >
        My Courses
      </Button>
      <Button
        color={'/instructor/support' === pathname ? 'primary' : 'inherit'}
        onClick={() => router.push('/instructor/support')}
      >
        Support
      </Button>
    </Box>
  );
}

export default dynamic(() => Promise.resolve(HeaderNavsInstructorView), {
  ssr: false,
});
