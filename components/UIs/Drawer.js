import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';

export default function Drawer() {
  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="open drawer"
      sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
    >
      <MenuIcon />
    </IconButton>
  );
}
