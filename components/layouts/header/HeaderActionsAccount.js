import { useState } from 'react';
import { useRouter } from 'next/router';
import { IconButton, Tooltip, Menu, MenuItem, Divider } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from 'store/user';

export default function HeaderActionsAccount() {
  const router = useRouter();
  const { isAdmin } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = 'account-menu';
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const profileHandler = () => {
    setAnchorEl(null);
    router.push('/profile');
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
      id={menuId}
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
      <MenuItem onClick={profileHandler}>Account</MenuItem>
      <MenuItem
        onClick={() => {
          dispatch(logout());
          handleMenuClose();
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
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </Tooltip>
      {renderMenu}
    </>
  );
}
