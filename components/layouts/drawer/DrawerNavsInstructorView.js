import { useRouter } from 'next/router';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Stack,
  Tooltip,
} from '@mui/material';

import { PAGES_INSTRUCTOR_VIEW } from 'utils/constants';
import Brand from 'components/UIs/Brand';

export default function DrawerNavsInstructorView({ onClose }) {
  const router = useRouter();
  const pathName = router.pathname;
  const studentViewHandler = () => {
    router.push('/');
  };
  return (
    <Box sx={{ width: 250 }} onClick={onClose} onKeyDown={onClose}>
      <Stack sx={{ padding: 2 }}>
        <Brand />
      </Stack>
      <Divider />
      <List>
        {PAGES_INSTRUCTOR_VIEW.map((page) => (
          <ListItemButton
            key={page.label}
            onClick={() => router.push(page.path)}
            selected={pathName === page.path}
          >
            <ListItemText primary={page.label} />
          </ListItemButton>
        ))}
        <Divider />
        <Tooltip title="Switch to the student view here - get back to the courses you’re taking.">
          <ListItemButton onClick={studentViewHandler}>
            Student view
          </ListItemButton>
        </Tooltip>
      </List>
    </Box>
  );
}
