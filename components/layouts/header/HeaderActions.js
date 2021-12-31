import { useRouter } from 'next/router';

import { Box, Tooltip, IconButton, Badge, Button, Stack } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useSelector, useDispatch } from 'react-redux';
import { setDark, setLight } from 'store/theme';
import { login } from 'store/auth';

import HeaderActionsAccount from './HeaderActionsAccount';

export default function HeaderActions() {
  const router = useRouter();
  const isDark = useSelector((state) => state.theme.isDark);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();
  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
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
      <Tooltip title="Cart">
        <IconButton size="large" color="inherit">
          <Badge badgeContent={17} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      {!isLogin && (
        <Stack sx={{ flexDirection: 'row', gap: 2, marginLeft: 2 }}>
          <Button variant="outlined" onClick={() => dispatch(login())}>
            Log in
          </Button>

          <Button variant="contained" onClick={() => router.push('/register')}>
            Sign up
          </Button>
        </Stack>
      )}
      {isLogin && (
        <Tooltip title="Wishlist">
          <IconButton size="large" color="inherit">
            <Badge badgeContent={4} color="error">
              <FavoriteIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      )}
      {isLogin && <HeaderActionsAccount />}
    </Box>
  );
}
