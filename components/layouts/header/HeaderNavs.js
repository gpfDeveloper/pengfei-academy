import { useRouter } from 'next/router';

import { Box, Button } from '@mui/material';

import { PAGES } from 'utils/constants';

export default function HeaderNavs() {
  const router = useRouter();
  const { pathname } = router;
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: { lg: 'flex', md: 'none', xs: 'none', gap: 2 },
        }}
      >
        {PAGES.map((page) => (
          <Button
            color={page.path === pathname ? 'primary' : 'inherit'}
            key={page.label}
            onClick={() => router.push(page.path)}
          >
            {page.label}
          </Button>
        ))}
      </Box>
      <Box sx={{ flexGrow: 1, display: { md: 'block', lg: 'none' } }}></Box>
    </>
  );
}
