import { useRouter } from 'next/router';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Stack,
} from '@mui/material';

import { PAGES } from 'utils/constants';
import Brand from 'components/UIs/Brand';

export default function DrawerNavs({ onClose }) {
  const router = useRouter();
  const pathName = router.pathname;
  return (
    <Box sx={{ width: 250 }} onClick={onClose} onKeyDown={onClose}>
      <Stack sx={{ padding: 2 }}>
        <Brand />
      </Stack>
      <Divider />
      <List>
        {PAGES.map((page) => (
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
