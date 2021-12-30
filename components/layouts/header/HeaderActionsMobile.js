import { useState } from 'react';
import {
  Box,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Typography,
  ListItemIcon,
} from '@mui/material';

import MoreIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from 'store/auth';
import { setDark, setLight } from 'store/theme';

export default function HeaderActionsMobile() {
  const isDark = useSelector((state) => state.theme.isDark);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();

  const mobileMenuId = 'menu-mobile';
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
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
      {!isLogin && (
        <MenuItem onClick={() => dispatch(login())}>
          <ListItemIcon>
            <LoginIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Log in</Typography>
        </MenuItem>
      )}
      {!isLogin && (
        <MenuItem onClick={() => dispatch(login())}>
          <ListItemIcon>
            <AppRegistrationIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Sign up</Typography>
        </MenuItem>
      )}
      {isLogin && (
        <MenuItem>
          <ListItemIcon>
            <Badge badgeContent={4} color="error" fontSize="small">
              <FavoriteIcon fontSize="small" />
            </Badge>
          </ListItemIcon>
          <Typography variant="inherit">Wishlist</Typography>
        </MenuItem>
      )}
      <MenuItem>
        <ListItemIcon>
          <Badge badgeContent={17} color="error" fontSize="small">
            <ShoppingCartIcon fontSize="small" />
          </Badge>
        </ListItemIcon>
        <Typography variant="inherit">Cart</Typography>
      </MenuItem>
      {isLogin && (
        <MenuItem>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Profile</Typography>
        </MenuItem>
      )}
      {isLogin && (
        <MenuItem onClick={() => dispatch(logout())}>
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
