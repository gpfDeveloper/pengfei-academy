import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Stack,
} from '@mui/material';

import { PAGES, PAGES_INSTRUCTOR } from 'utils/constants';
import Brand from 'components/UIs/Brand';

export default function DrawerNavs({ onClose }) {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const { isInstructor } = user;
  const pathName = router.pathname;
  let pages = PAGES;
  if (isInstructor) {
    pages = PAGES_INSTRUCTOR;
  }
  return (
    <Box sx={{ width: 250 }} onClick={onClose} onKeyDown={onClose}>
      <Stack sx={{ padding: 2 }}>
        <Brand />
      </Stack>
      <Divider />
      <List>
        {pages.map((page) => (
          <ListItemButton
            key={page.label}
            onClick={() => router.push(page.path)}
            selected={pathName === page.path}
          >
            <ListItemText primary={page.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
