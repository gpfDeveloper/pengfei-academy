import { useState } from 'react';
import { IconButton, SwipeableDrawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DrawerNavs from './DrawerNavs';
import DrawerNavsInstructorView from './DrawerNavsInstructorView';

export default function Drawer({ isInstructorView = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const drawerCloseHandler = () => setIsOpen(false);
  const drawerOpenHandler = () => setIsOpen(true);
  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={drawerOpenHandler}
        sx={{ mr: 2, display: { md: 'block', lg: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={isOpen}
        onOpen={drawerOpenHandler}
        onClose={drawerCloseHandler}
      >
        {!isInstructorView && <DrawerNavs onClose={drawerCloseHandler} />}
        {isInstructorView && (
          <DrawerNavsInstructorView onClose={drawerCloseHandler} />
        )}
      </SwipeableDrawer>
    </>
  );
}
