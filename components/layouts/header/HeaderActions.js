import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { Box, Tooltip, IconButton, Badge, Button, Stack } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useSelector, useDispatch } from 'react-redux';
import { setDark, setLight } from 'store/theme';

import HeaderActionsAccount from './HeaderActionsAccount';
import HeaderActionsNotification from './HeaderActionsNotification';
import HeaderActionsMessage from './HeaderActionsMessage';

function HeaderActions() {
  const router = useRouter();
  const isDark = useSelector((state) => state.theme.isDark);
  const user = useSelector((state) => state.user);
  const { isLogin, wishlist, cart } = user;
  const dispatch = useDispatch();
  const clickWishlistHandler = () => {
    router.push('/my-course/wishlist');
  };
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
          <Badge badgeContent={cart.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      {!isLogin && (
        <Stack sx={{ flexDirection: 'row', gap: 2, marginLeft: 2 }}>
          <Button variant="outlined" onClick={() => router.push('/login')}>
            Log in
          </Button>

          <Button variant="contained" onClick={() => router.push('/register')}>
            Sign up
          </Button>
        </Stack>
      )}
      {isLogin && (
        <Stack sx={{ flexDirection: 'row' }}>
          <Tooltip title="Wishlist">
            <IconButton
              size="large"
              color="inherit"
              onClick={clickWishlistHandler}
            >
              <Badge badgeContent={wishlist.length} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <HeaderActionsNotification />
          <HeaderActionsMessage />
        </Stack>
      )}
      {isLogin && <HeaderActionsAccount />}
    </Box>
  );
}
export default dynamic(() => Promise.resolve(HeaderActions), { ssr: false });
