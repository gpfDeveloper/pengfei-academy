import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { Box, Tooltip, IconButton, Stack, Button } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import { useSelector, useDispatch } from 'react-redux';
import { setDark, setLight } from 'store/theme';

import HeaderActionsAccount from '../HeaderActionsAccount';
import HeaderActionsNotification from '../HeaderActionsNotification';
import HeaderActionsMessage from '../HeaderActionsMessage';

function HeaderActionsInstructorView() {
  const router = useRouter();
  const isDark = useSelector((state) => state.theme.isDark);
  const dispatch = useDispatch();
  const studentViewHandler = () => {
    router.push('/');
  };
  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      <Tooltip title="Switch to the student view here - get back to the courses you’re taking.">
        <Button onClick={studentViewHandler} sx={{ color: 'text.primary' }}>
          Student
        </Button>
      </Tooltip>
      {!isDark && (
        <Tooltip title="Dark mode">
          <IconButton
            size="large"
            color="inherit"
            onClick={() => dispatch(setDark())}
          >
            <DarkModeIcon />
          </IconButton>
        </Tooltip>
      )}
      {isDark && (
        <Tooltip title="Light mode">
          <IconButton
            size="large"
            color="inherit"
            onClick={() => dispatch(setLight())}
          >
            <LightModeIcon />
          </IconButton>
        </Tooltip>
      )}

      <Stack sx={{ flexDirection: 'row' }}>
        <HeaderActionsNotification />
        <HeaderActionsMessage />
      </Stack>

      <HeaderActionsAccount />
    </Box>
  );
}
export default dynamic(() => Promise.resolve(HeaderActionsInstructorView), {
  ssr: false,
});
