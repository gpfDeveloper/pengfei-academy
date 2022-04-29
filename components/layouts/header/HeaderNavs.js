import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { Box, Button } from '@mui/material';

import { useSelector } from 'react-redux';

import { PAGES, PAGES_INSTRUCTOR } from 'utils/constants';

function HeaderNavs() {
  const router = useRouter();
  const { pathname } = router;
  const isInstructor = useSelector((state) => state.user?.isInstructor);
  const navs = isInstructor ? PAGES_INSTRUCTOR : PAGES;
  return (
    <>
      <Box
        sx={{
          // flexGrow: 1,
          display: { lg: 'flex', md: 'none', xs: 'none', gap: 2 },
        }}
      >
        {navs.map((page) => (
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

export default dynamic(() => Promise.resolve(HeaderNavs), { ssr: false });
