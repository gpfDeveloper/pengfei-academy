import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { PAGES_INSTRUCTOR_VIEW } from 'utils/constants';

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
      {PAGES_INSTRUCTOR_VIEW.map((item) => (
        <Button
          key={item.path}
          color={item.path === pathname ? 'primary' : 'inherit'}
          onClick={() => router.push(item.path)}
        >
          {item.label}
        </Button>
      ))}
    </Box>
  );
}

export default dynamic(() => Promise.resolve(HeaderNavsInstructorView), {
  ssr: false,
});
