import { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import {
  Box,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Typography,
  ListItemIcon,
  Divider,
} from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LoginIcon from '@mui/icons-material/Login';
import EditIcon from '@mui/icons-material/Edit';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import HistoryIcon from '@mui/icons-material/History';

import { useSelector, useDispatch } from 'react-redux';
import { logoutAsync } from 'store/user-async';
import { setDark, setLight } from 'store/theme';
import HeaderActionsNotificationMobile from './HeaderActionsNotificationMobile';
import HeaderActionsMessageMobile from './HeaderActionsMessageMobile';

function HeaderActionsMobile() {
  const isDark = useSelector((state) => state.theme.isDark);
  const isLogin = useSelector((state) => state.user.isLogin);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const { wishlist, isAdmin, id } = user;
  const dispatch = useDispatch();
  const router = useRouter();

  const mobileMenuId = 'menu-mobile';
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const editProfileHandler = () => {
    router.push('/profile');
  };
  const publicProfileHandler = () => {
    router.push(`/user/${id}`);
  };

  const purchaseHistoryHandler = () => {
    router.push('/purchase-history');
  };

  const clickWishlistHandler = () => {
    router.push('/my-course/wishlist');
  };
  const clickCartHandler = () => {
    router.push('/cart');
  };
  const adminHandler = () => {
    router.push('/admin');
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {isAdmin && [
        <MenuItem key={1} onClick={adminHandler}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <Typography>Admin</Typography>
        </MenuItem>,
        <Divider key={2} />,
      ]}
      <MenuItem onClick={clickCartHandler}>
        <ListItemIcon>
          <Badge
            badgeContent={cart.items.length}
            color="error"
            fontSize="small"
          >
            <ShoppingCartIcon fontSize="small" />
          </Badge>
        </ListItemIcon>
        <Typography variant="inherit">Cart</Typography>
      </MenuItem>
      {isLogin && (
        <MenuItem onClick={clickWishlistHandler}>
          <ListItemIcon>
            <Badge
              badgeContent={wishlist?.length}
              color="error"
              fontSize="small"
            >
              <FavoriteIcon fontSize="small" />
            </Badge>
          </ListItemIcon>
          <Typography variant="inherit">Wishlist</Typography>
        </MenuItem>
      )}
      <Divider />
      {!isDark && (
        <MenuItem onClick={() => dispatch(setDark())}>
          <ListItemIcon>
            <DarkModeIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Dark mode</Typography>
        </MenuItem>
      )}
      {isDark && (
        <MenuItem onClick={() => dispatch(setLight())}>
          <ListItemIcon>
            <LightModeIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Light mode</Typography>
        </MenuItem>
      )}
      <Divider />
      {isLogin && (
        <>
          <HeaderActionsNotificationMobile />
          <HeaderActionsMessageMobile />
          <Divider />
        </>
      )}
      {!isLogin && (
        <>
          <MenuItem onClick={() => router.push('/login')}>
            <ListItemIcon>
              <LoginIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Log in</Typography>
          </MenuItem>
          <MenuItem onClick={() => router.push('/register')}>
            <ListItemIcon>
              <AppRegistrationIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Sign up</Typography>
          </MenuItem>
        </>
      )}
      {isLogin && (
        <>
          <MenuItem onClick={editProfileHandler}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Eidt profile</Typography>
          </MenuItem>
          <MenuItem onClick={publicProfileHandler}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Public profile</Typography>
          </MenuItem>
          <Divider />
        </>
      )}
      {isLogin && (
        <>
          <MenuItem onClick={purchaseHistoryHandler}>
            <ListItemIcon>
              <HistoryIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Purchase history</Typography>
          </MenuItem>
          <Divider />
        </>
      )}
      {isLogin && (
        <MenuItem onClick={() => dispatch(logoutAsync())}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Logout</Typography>
        </MenuItem>
      )}
    </Menu>
  );
  return (
    <>
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <Tooltip title="Show more">
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Tooltip>
      </Box>
      {renderMobileMenu}
    </>
  );
}

export default dynamic(() => Promise.resolve(HeaderActionsMobile), {
  ssr: false,
});
