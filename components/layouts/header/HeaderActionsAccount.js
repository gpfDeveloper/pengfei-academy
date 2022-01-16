import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  Avatar,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAsync } from 'store/user-async';

export default function HeaderActionsAccount() {
  const router = useRouter();
  const { isAdmin, name, id } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const editProfileHandler = () => {
    setAnchorEl(null);
    router.push('/profile');
  };
  const publicProfileHandler = () => {
    setAnchorEl(null);
    router.push(`/user/${id}`);
  };

  const adminHandler = () => {
    setAnchorEl(null);
    router.push('/admin');
  };

  const dispatch = useDispatch();

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isAdmin && [
        <MenuItem key={1} onClick={adminHandler}>
          Admin
        </MenuItem>,
        <Divider key={2} />,
      ]}
      {[
        <MenuItem key={1} onClick={editProfileHandler}>
          Edit profile
        </MenuItem>,
        <MenuItem key={2} onClick={publicProfileHandler}>
          Public profile
        </MenuItem>,
        <Divider key={3} />,
      ]}
      <MenuItem
        onClick={() => {
          dispatch(logoutAsync());
          handleMenuClose();
          router.replace('/');
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Tooltip title="Account">
        <IconButton
          size="large"
          edge="end"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <Avatar alt={name} src="/" sx={{ backgroundColor: 'primary.main' }} />
        </IconButton>
      </Tooltip>
      {renderMenu}
    </>
  );
}
